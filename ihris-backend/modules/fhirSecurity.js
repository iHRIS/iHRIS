const nconf = require('./config')
const fhirAxios = nconf.fhirAxios
const winston = require('winston')
const { v5: uuidv5 } = require('uuid')

const FHIR_UPDATE_NAMESPACE = nconf.get("fhir:uuid:namespace") || "e91c9519-eccb-48a8-a506-6659b8c22518"

const fhirSecurityLocation = {
  system: "http://ihris.org/fhir/security/location",
  oldSecurity: {},
  /**
   * get the location hierarchy for a given location
   */
  getLocationHierarchy: (location) => {
    // http://antiquity:8080/hapi/fhir/Location?_id=Location/TF.S.NYS&status=active&_include:iterate=Location:partof
    return new Promise( (resolve, reject) => {
      fhirAxios.search( "Location", 
        { _id: location, status: "active", "_include:iterate": "Location:partof" } ).then( (bundle) => {
          let locations = []
          for( let entry of bundle.entry ) {
            locations.push( "Location/" + entry.resource.id )
          }
          resolve( locations )
        } ).catch( (err) => {
          winston.error("Unable to get hierarchy for "+location)
          reject( err )
        } )
    } )
  },
  /**
   * remove and update security with given locations on the resource
   */
  resetLocationSecurityOnResource: (resource, locations) => {
    if ( !resource.meta ) {
      resource.meta = {}
    }
    if ( !resource.meta.security ) {
      resource.meta.security = []
    }
    resource.meta.security = resource.meta.security.filter( security => security.system !== fhirSecurityLocation.system )

    let security = locations.map( location => { return { system: fhirSecurityLocation.system, code: location } } )
    resource.meta.security = resource.meta.security.concat( security )

  },
  /** 
   * determine if a security update is required for this resource
   */
  updateRequired: (resource, previous) => {
    if ( resource.resourceType === "Location" ) {
      if ( !previous ) {
        return true
      } else {
        if ( resource.partOf.reference !== previous.partOf.reference ||
          resource.status !== previous.status ) {
          return true
        } else {
          return false
        }
      }
    } else {
      return false
    }
  },
  /**
   * Remove oldSecurity and add newSecurity on the resource
   */
  replaceSecurityOnResource: (resource, oldArray, newSecurity) => {
    resource.meta.security = resource.meta.security.filter( sec => !oldArray.includes( sec.system + "|" + sec.code ) )
    resource.meta.security = resource.meta.security.concat( newSecurity )
  },
   /**
   * Remove oldSecurity and add newSecurity to any Locations with the given location tag
   */
  replaceSecurityOnLocation: (location, oldSecurity, newSecurity) => {
    let oldArray = oldSecurity.map( sec => sec.system + "|" + sec.code )
    const processLocationSecurity = (bundle) => {
      if ( bundle.entry ) {
        for( let entry of bundle.entry ) {
          // preProcess already handled it for the given location
          if ( location === "Location/" + entry.resource.id ) continue
          fhirSecurityLocation.replaceSecurityOnResource( entry.resource, oldArray, newSecurity )
          fhirAxios.update( entry.resource ).catch( (err) => {
            winston.error("Failed to update "+entry.resource.resourceType+"/"+entry.resource.id+" security for location "
              +location+" "+err.message)
          } )
           
        } 
      }
      if ( bundle.link ) {
        let next = bundle.link.find( link => link.relation === "next" )
        if ( next && next.url ) {
          fhirAxios.searchLink( next.url ).then( (nextBundle) => {
            processLocationSecurity( nextBundle )
          } ).catch( (err) => {
            winston.error("Failed to get search link for "+next.url+" "+err.message)
          } )
        }
      }
    }

    fhirAxios.search( "Location", { _security: fhirSecurityLocation.system + "|" + location } ).then( (bundle) => {
      processLocationSecurity( bundle )
    } ).catch( (err) => {
      winston.error("Failed to get security for location "+location+" "+err.message)
    } )
  },
  /** 
   * set security metadata on the given resource
   * used to set the security metadata on this resource for locations
   */
  preProcess: (uuid, resource, previous) => {
    return new Promise( ( resolve, reject ) => {
      if ( !previous ) {
        if ( resource.partOf && resource.partOf.reference ) {
          fhirSecurityLocation.getLocationHierarchy( resource.partOf.reference ).then( (locations) => {
            fhirSecurityLocation.resetLocationSecurityOnResource( resource, locations )
            return resolve( true )
          } ).catch( (err) => {
            winston.error("Failed to get location hierarchy for "+resource.partOf.reference+" "+err.message)
            return reject( err )
          } )
        } else {
          return resolve( true )
        }
      } else {
        fhirSecurityLocation.oldSecurity[uuid] = previous.meta.security
        if ( resource.partOf && resource.partOf.reference ) {
          fhirSecurityLocation.getLocationHierarchy( resource.partOf.reference ).then( (locations) => {
            locations.push( "Location/"+resource.id )
            fhirSecurityLocation.resetLocationSecurityOnResource( resource, locations )
            return resolve( true )
          } ).catch( (err) => {
            winston.error("Failed to get location hierarchy for "+resource.partOf.reference+" "+err.message)
            return reject( err )
          } )
        } else {
          fhirSecurityLocation.resetLocationSecurityOnResource( resource, [ "Location/"+resource.id ] )
          return resolve( true )
        }
      }
    } )
  },
  /**
   * set security metadata and updated necessary linked resources
   * after the resource has been saved.
   */
  postProcess: (uuid, resource) => {
    return new Promise( ( resolve, reject ) => {
      if ( resource.meta.versionId === "1" ) {
        resource.meta.security.push( { system: fhirSecurityLocation.system, code: "Location/"+resource.id } )
        fhirAxios.update( resource ).then( (resource) => {
          return resolve( true )
        } ).catch( (err) => {
          winston.error("Failed to update security metadata on Location/"+resource.id)
          return reject(err)
        } )
      } else {
        fhirSecurityLocation.replaceSecurityOnLocation( "Location/"+resource.id, fhirSecurityLocation.oldSecurity[uuid], resource.meta.security )
        delete fhirSecurityLocation.oldSecurity[uuid]
        fhirSecurityPractitioner.resetLocationSecurityByLocation("Location/"+resource.id)
        return resolve( true )
      }
    } )
  },
  /*
  replaceSecurity: (resource, newLocations, oldLocations) => {
    if ( !resource.meta ) {
      resource.meta = {}
    }
    if ( !resource.meta.security ) {
      resource.meta.security = []
    }
    let security = locations.map( location => { return { system: fhirSecurityLocation.system: code: location } } )
    if ( oldLocations === true ) {
      resource.meta.security = resource.meta.security.filter( security => security.system !== fhirSecurityLocation.system )
    } else if ( oldLocations ) {
      for( let oldLoc in oldLocations ) {
       resource.meta.security = resource.meta.security.filter( security => security.system === fhirSecurityLocation.system ? security.code !== oldLoc : true )
      }
    }
    resource.meta.security = resource.meta.security.concat( security )
  },
  setSecurity: (resource, previous) => {
    return new Promise( (resolve, reject) => {
      if ( previous ) {
        fhirSecurityLocation.getLocationHierarchy( previous.partOf.reference ).then( (oldLocations) => {
          fhirSecurityLocation.getLocationHierarchy( resource.partOf.reference ).then( (newLocations) => {
            fhirSecurityLocation.replaceSecurity( resource, newLocations, oldLocations )
            fhirSecurityLocation.updateMatching( resource.id, oldLocations, newLocations )
          } ).catch( (err) => {
            winston.error("Unable to get location hierarchy for "+resource.id+" "+err.message)
            reject(err)
          } )
        } ).catch( (err) => {
          winston.error("Unable to get old location hierarchy for "+resource.id+" "+err.message)
          reject(err)
        } )
      } else {
        fhirSecurityLocation.getLocationHierarchy( resource.partOf.reference ).then( (newLocations) => {
          fhirSecurityLocation.replaceSecurity( resource, newLocations )
        } ).catch( (err) => {
          winston.error("Unable to get location hierarchy for new Location "+err.message)
          reject(err)
        } )
      }
    } )
  },
  updateMatching: (location, oldLocations, newLocations) => {
    const processLocationSecurity = ( bundle, oldLocations, newLocations, resourceId ) => {
      if ( bundle.entry ) {
        bundle.entry.forEach( (other) => {
          if ( !(resourceType === "Location" && other.id === resourceId) ) {
            fhirSecurityLocation.replaceSecurity( other, newLocations, oldLocations )
            fhirAxios.update( other ).catch( (err) => {
              winston.error("Failed to update "+resourceType+"/"+other.id+" security for location "
                +location+" "+err.message)
            } )
          }
        } )
      }
      if ( bundle.link ) {
        let next = bundle.link.find( link => link.relation === "next" )
        if ( next && next.url ) {
          fhirAxios.searchLink( next.url ).then( (nextBundle) => {
            processLocationSecurity( nextBundle, oldLocations, newLocations, resourceId )
          } ).catch( (err) => {
            winston.error("Failed to get search link for "+next.url+" "+err.message)
          } )
        }
      }
    }

    fhirSecurityLocation.resourceTypes.forEach( (resourceType) => {
      fhirAxios.search( resourceType, { _security: fhirSecurityLocation.system + "|Location/" + location } ).then( (bundle) => {
        processLocationSecurity( bundle, oldLocations, newLocations, location ) )
      } ).catch( (err) => {
        winston.error("Failed to get "+resourceType+" security for practitioner "+practitioner+" "+err.message)
      } )
    } )
  }
  */
}

const fhirSecurityPractitioner = {
  system: "http://ihris.org/fhir/security/practitioner",
  resourceTypes: [ "Practitioner", "PractitionerRole", "Basic" ],
  /*
  resourceSearch: {
    "Practitioner": "_id",
    "PractitionerRole": "practitioner",
    "Basic" : "practitioner"
  },
  */
  /**
   * return list of location tags based on the practitioner
   * return array
   */
  getLocationsForPractitioner: (practitioner) => {
    return new Promise( (resolve, reject) => {
      let now = new Date()
      let nowsplit = now.toISOString().split('T')
      let params = new URLSearchParams()
      params.append( "practitioner", practitioner )
      params.append( "date", "ge"+nowsplit[0] )
      params.append( "active", "true" )
      params.append( "_include", "PractitionerRole:location" )
      params.append( "_include:iterate", "Location:partof" )

      fhirAxios.search( "PractitionerRole", params ).then ( (bundle) => {
        if ( bundle.entry ) {
          let locations = []
          for( let entry of bundle.entry ) {
            if ( entry.resource.resourceType === "Location" ) {
              locations.push( "Location/" + entry.resource.id )
            }
          } 
          resolve( locations )
        }
      } ).catch( (err) => {
        winston.error("Failed to update matching practitioners "+practitioner+" "+err.message)
        reject( err )
      } )
    } )
  },
  /**
   * return the practitioner reference set on this resource
   */
  getPractitionerReference: (resource) => {
    let reference 
    if ( resource.resourceType === "Practitioner" && resource.id ) {
      reference = "Practitioner/"+resource.id
    } else if ( resource.resourceType === "PractitionerRole" ) {
      reference = resource.practitioner.reference
    } else if ( resource.resourceType === "Basic" ) {
      try {
        reference = resource.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference" ).valueReference.reference
      } catch( err ) {
        winston.error("Failed to get practitioner extension reference from Basic/"+resource.id)
        return undefined
      }
    } else {
      winston.error("Invalid resource type passed to fhirSecurityPractitioner.setSecurity: "+resource.resourceType)
      return undefined
    }
    return reference
  },
  /** 
   * set security metadata on the given resource
   * used to set the security metadata on this resource based on 
   * loaded modules
   */
  resetPractitionerSecurityOnResource: (resource) => {
    let securityValue = fhirSecurityPractitioner.getPractitionerReference( resource )
    if ( !securityValue ) return
    resource.meta.security = resource.meta.security.filter( security => security.system !== fhirSecurityPractitioner.system )
    resource.meta.security.push( { system: fhirSecurityPractitioner.system, code: securityValue } )
  },
  /**
   * reset location security for all resources matching the practitioner security metadata
   */
  resetLocationSecurityByPractitioner: (practitioner) => {
    const processPractitionerSecurity = ( bundle, locations ) => {
      if ( bundle.entry ) {
        bundle.entry.forEach( (other) => {
          fhirSecurityLocation.resetLocationSecurityOnResource( other.resource, locations )
          fhirAxios.update( other.resource ).catch( (err) => {
            winston.error("Failed to update "+other.resource.resourceType+"/"+other.resource.id+" security for practitioner "
              +practitioner+" "+err.message)
          } )
        } )
      }
      if ( bundle.link ) {
        let next = bundle.link.find( link => link.relation === "next" )
        if ( next && next.url ) {
          fhirAxios.searchLink( next.url ).then( (nextBundle) => {
            processPractitionerSecurity( nextBundle, locations )
          } ).catch( (err) => {
            winston.error("Failed to get search link for "+next.url+" "+err.message)
          } )
        }
      }
    }
    fhirSecurityPractitioner.getLocationsForPractitioner( practitioner ).then( (locations) => {
      fhirSecurityPractitioner.resourceTypes.forEach( (resourceType) => {
        fhirAxios.search( resourceType, { _security: fhirSecurityPractitioner.system + "|" + practitioner } ).then( (bundle) => {
          processPractitionerSecurity( bundle, locations )
        } ).catch( (err) => {
          winston.error("Failed to get "+resourceType+" security for practitioner "+practitioner+" "+err.message)
        } )
      } )
    } ).catch( (err) => {
      winston.error("Failed to get locations for "+practitioner+" "+err.message)
    } )
  },
  /**
   * reset location security for all resources with the location security metadata
   */
  resetLocationSecurityByLocation: (location) => {
    let practitionerList = {}
    const processPractitionerList = () => {
      for( let practitioner of Object.keys(practitionerList) ) {
        fhirSecurityPractitioner.resetLocationSecurityByPractitioner( practitioner )
      }
    }
    const processLocationSecurity = (bundle) => {
      if ( bundle.entry ) {
        for( let entry of bundle.entry ) {
          try {
            let practitioner = entry.resource.meta.security.find( security => security.system === fhirSecurityPractitioner.system ).code
            practitionerList[ practitioner ] = true
          } catch (err) { }
        } 
      }
      if ( bundle.link ) {
        let next = bundle.link.find( link => link.relation === "next" )
        if ( next && next.url ) {
          fhirAxios.searchLink( next.url ).then( (nextBundle) => {
            processLocationSecurity( nextBundle )
          } ).catch( (err) => {
            winston.error("Failed to get search link for "+next.url+" "+err.message)
          } )
        } else {
          processPractitionerList()
        }
      } else {
        processPractitionerList()
      }
    }

    fhirSecurityPractitioner.resourceTypes.forEach( (resourceType) => {
      fhirAxios.search( resourceType, { _security: fhirSecurityLocation.system + "|" + location } ).then( (bundle) => {
        processLocationSecurity( bundle )
      } ).catch( (err) => {
        winston.error("Failed to get "+resourceType+" security for location "+location+" "+err.message)
      } )
    } )
  },
  /**
   * pre-process bundle to check for locations and set location security tags
   */
  setLocationSecurityOnBundle: (bundle) => {
    return new Promise( (resolve, reject) => {
      let roles = bundle.entry.filter( entry => entry.resource.resourceType === "PractitionerRole" )
      let promises = []
      for( let role of roles ) {
        if ( role.resource.location ) {
          promises.push( fhirSecurityLocation.getLocationHierarchy( role.resource.location.reference ) )
        }
      }
      Promise.all( promises ).then( (locationLists) => {
        let locations = []
        for( let list of locationLists ) {
          locations.concat( list )
        }
        for( let entry of bundle.entry ) {
          if ( fhirSecurityPractitioner.resourceTypes.includes( entry.resource.resourceType ) ) {
            fhirSecurityLocation.resetLocationSecurityOnResource(entry.resource, locations) 
          }
        }
        resolve(true)
      } ).catch( (err) => {
        winston.error("Failed to get location lists for bundle "+err.message)
        reject( err )
      } )
    } )
  },
  /**
   * post process a transaction-response bundle to make sure all the correct tags are set
   * after creating resources
   */
  addPractitionerSecurityOnBundleResponse: (bundle) => {
    let locationCache = {}
    for( let entry of bundle.entry ) {
      if ( entry.response && entry.response.location ) {
        let parts = entry.response.location.split('/')
        if ( parts.length < 2 ) {
          winston.error("Invalid location returned from response "+entry.response.location)
        } else {
          if ( fhirSecurityPractitioner.resourceTypes.includes( parts[0] ) ) {

            fhirAxios.read( parts[0], parts[1] ).then( async (resource) => {
              let practitioner = fhirSecurityPractitioner.getPractitionerReference( resource )
              fhirSecurityPractitioner.setPractitionerSecurityOnResource( resource )
              if ( !locationCache.hasOwnProperty( practitioner ) ) {
                try {
                  locationCache[practitioner] = await fhirSecurityPractitioner.getLocationsForPractitioner(practitioner)
                } catch ( err ) {
                  winston.error("Failed to get locations for "+practitioner+" "+err.message)
                  locationCache[practitioner] = []
                }
              }
              fhirSecurityLocation.resetLocationSecurityOnResource( resource, locationCache[practitioner] )
              fhirAxios.update( resource ).catch( (err) => {
                winston.error("Failed to update "+resource.resourceType+"/"+resource.id+" security for practitioner "
                  +practitioner+" "+err.message)
              } )
            } )
          }
        }
      } else {
        winston.error("Failed to get response in transaction response for setPractitionerSecurityOnBundleResponse.")
      }
    }
  },
  /**
   * copy security tags from the matching Practitioner resource
   * on the resource
   */
  copyPractitionerSecurity: (resource) => {
    return new Promise( (resolve, reject) => {
      let pracRef = fhirSecurityPractitioner.getPractitionerReference( resource )
      let parts = pracRef.split('/')
      let pracId
      if ( parts.length >= 2 ) {
        pracId = parts[1]
      } else {
        pracId = parts[0]
      }
      fhirAxios.read("Practitioner", pracId).then( (practitioner) => {
        if ( !resource.meta ) {
          resource.meta = {}
        }
        resource.meta.security = practitioner.meta.security
        resolve(true)
      } ).catch( (err) => {
        winston.error("Failed to get practitioner "+pracId+" "+err.message)
        reject(err)
      } )
    } )
  },
  /** 
   * check to see if the security metadata needs to be updated
   * returns boolean
   */
  updateRequired: (resource, previous) => {
    if ( !previous ) {
      if ( resource.resourceType === "Practitioner" 
        || resource.resourceType === "PractitionerRole" ) {
        return true
      } else if ( resource.resourceType === "Basic" 
        && resource.extension.find( 
          ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference" 
        ) ) { 
        return true
      } else {
        return false
      }
    } else {
      if ( resource.resourceType === "PractitionerRole" ) {
        if ( resource.practitioner.reference !== previous.practitioner.reference 
          || resource.location.reference !== previous.location.reference
          || resource.active !== previous.active
          || (resource.period && resource.period.end)
        ) {
          return true
        } else {
          return false
        }
      } else if ( resource.resourceType === "Basic" ) {
        try {
          let newPractitioner = resource.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference" ).valueReference.reference
          let oldPractitioner = previous.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference" ).valueReference.reference
          if ( newPractitioner !== oldPractitioner ) {
            return true
          } else {
            return false
          }
        } catch( err ) {
          return false
        }
      } else if ( resource.resourceType === "Bundle" && resource.type === "transaction" ) {
        if ( resource.entry && resource.entry.find( entry => entry.resource.resourceType === "Practitioner" || entry.resource.resourceType === "PractitionerRole" ) ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  /** 
   * set security metadata on the given resource
   * used to set the security metadata on this resource for practitioners
   */
  preProcess: (uuid, resource, previous) => {
    return new Promise( (resolve, reject) => {
      if ( resource.resourceType === "Practitioner" ) {
        return resolve( true )
      } else if ( resource.resourceType == "PractitionerRole" ) {
        if ( !previous ) {
          fhirSecurityPractitioner.resetPractitionerSecurityOnResource( resource )
          if ( resource.location && resource.location.reference ) {
            fhirSecurityLocation.getLocationHierarchy( resource.location.reference ).then( (locations) => {
              fhirSecurityLocation.resetLocationSecurityOnResource( resource, locations )
              return resolve( true )
            } ).catch( (err) => {
              winston.error("Failed to get location hierarchy for "+resource.location.reference+" "+err.message)
              return reject( err )
            } )
          } else {
            return resolve( true )
          }
        } else {
          fhirSecurityPractitioner.resetPractitionerSecurityOnResource( resource )
          if ( resource.location && resource.location.reference ) {
            fhirSecurityLocation.getLocationHierarchy( resource.location.reference ).then( (locations) => {
              fhirSecurityLocation.resetLocationSecurityOnResource( resource, locations )
              return resolve( true )
            } ).catch( (err) => {
              winston.error("Failed to get location hierarchy for "+resource.location.reference+" "+err.message)
              return reject( err )
            } )
          } else {
            fhirSecurityLocation.resetLocationSecurityOnResource( resource, [] )
            return resolve( true )
          }
        }
      } else if ( resource.resourceType === "Basic" ) {
        fhirSecurityPractitioner.copyPractitionerSecurity(resource).then( (results) => {
          return resolve( true )
        } ).catch( (err) => {
          winston.error("Failed to copy practitioner security for basic resource "+resource.id+" "+err.message)
          return reject(err)
        } )
      } else if ( resource.resourceType === "Bundle" ) {
        fhirSecurityPractitioner.setLocationSecurityOnBundle(resource).then( (results) => {
          return resolve( true )
        } ).catch( (err) => {
          winston.error("Failed to preprocess bundle "+err.message)
          return reject(err)
        } )
      } else {
        return resolve( true )
      }
      //let securityValue = fhirSecurityPractitioner.getPractitionerReference( resource )
      /*
      if ( !securityValue ) {
        winston.error("Invalid resource type passed to fhirSecurityPractitioner.setSecurity: "+resource.resourceType)
        return reject(new Error("Invalid resource type passed to fhirSecurityPractitioner.setSecurity"))
      }
      */
      /*
      if ( securityValue ) {
        fhirSecurityPractitioner.resetPractitionerSecurityOnResource( resource )
      }
      */
      // Add location security metadata if needed
      /*
      if ( resource.resourceType === "PractitionerRole" ) {
        if ( previous && ( previous.practitioner.reference !== resource.practitioner.reference 
          || previous.active !== resource.active ) ) {
          fhirSecurityPractitioner.updateMatching( previous.practitioner.reference )
        }
        fhirSecurityPractitioner.updateMatching( resource.practitioner.reference, resource )
      }
      */
      //resolve( true )
    } )
  },

  /**
   * set security metadata and updated necessary linked resources
   * after the resource has been saved.
   */
  postProcess: (uuid, resource) => {
    return new Promise( ( resolve, reject ) => {
      if ( resource.resourceType === "Practitioner" ) {
        if ( resource.meta.versionId === "1" ) {
          fhirSecurityPractitioner.resetPractitionerSecurityOnResource( resource )
          fhirAxios.update( resource ).then( (resource) => {
            return resolve( true )
          } ).catch( (err) => {
            winston.error("Failed to update security metadata on Practitioner/"+resource.id)
            return reject(err)
          } )
        }
      } else if ( resource.resourceType === "PractitionerRole" ) {
        fhirSecurityPractitioner.resetLocationSecurityByPractitioner(resource.practitioner.reference)
        return resolve( true )
      } else if ( resource.resourceType === "Bundle" ) {
        fhirSecurityPractitioner.addPractitionerSecurityOnBundleResponse(bundle)
        return resolve( true )
      } else {
        return resolve( true )
      }
    } )
  },

  /**
   * update resources that match this practitioner
   * and add to given resource if available
   */
  /*
  updateMatching: (practitioner, resource) => {
    // http://antiquity:8080/hapi/fhir/PractitionerRole?practitioner=P10004&_include=PractitionerRole:practitioner&date=ge2020-11-06&_include=PractitionerRole:location&_include:iterate=Location:partof
    const processPractitionerSecurity = ( bundle, resourceType, resourceId ) => {
      if ( bundle.entry ) {
        bundle.entry.forEach( (other) => {
          if ( !(resourceType === resource.resourceType && other.id === resourceId) ) {
            fhirSecurityLocation.replaceSecurity( other, locations, true )
            fhirAxios.update( other ).catch( (err) => {
              winston.error("Failed to update "+resourceType+"/"+other.id+" security for practitioner "
                +practitioner+" "+err.message)
            } )
          }
        } )
      }
      if ( bundle.link ) {
        let next = bundle.link.find( link => link.relation === "next" )
        if ( next && next.url ) {
          fhirAxios.searchLink( next.url ).then( (nextBundle) => {
            processPractitionerSecurity( nextBundle, resourceType, resourceId )
          } ).catch( (err) => {
            winston.error("Failed to get search link for "+next.url+" "+err.message)
          } )
        }
      }
    }

    let now = new Date()
    let nowsplit = now.toISOString().split('T')
    let params = new URLSearchParams()
    params.append( "practitioner", practitioner )
    params.append( "date", "ge"+nowsplit[0] )
    params.append( "active", "true" )
    params.append( "_include", "PractitionerRole:location" )
    params.append( "_include:iterate", "Location:partof" )

    fhirAxios.search( "PractitionerRole", params ).then ( (bundle) => {
      if ( bundle.entry ) {
        let locations = []
        for( let entry of bundle.entry ) {
          if ( entry.resource.resourceType === "Location" ) {
            locations.push( "Location/" + entry.resource.id )
          }
        } 
        if ( resource ) {
          fhirSecurityLocation.replaceSecurity( resource, locations, true )
        }
        fhirSecurityPractitioner.resourceTypes.forEach( (resourceType) => {
          fhirAxios.search( resourceType, { _security: fhirSecurityPractitioner.system + "|" + practitioner } ).then( (bundle) => {
            processPractitionerSecurity( bundle, (resource ? resource.resourceType : undefined), (resource ? resource.id : undefined) )
          } ).catch( (err) => {
            winston.error("Failed to get "+resourceType+" security for practitioner "+practitioner+" "+err.message)
          } )
        } )
      }
    } ).catch( (err) => {
      winston.error("Failed to update matching practitioners "+practitioner+" "+resource.id+" "+err.message)
    } )
  }
  */
}

const fhirSecurity = {

  modules: { fhirSecurityPractitioner, fhirSecurityLocation },
  updateRequiredCache: { "fhirSecurityPractitioner" : {}, "fhirSecurityLocation": {} },
  updateCount: 1,
  /** 
   * replace security with previous security metadata 
   * used when nothing triggers an update to security metadata
   * This is to be sure that no one tried to set security content 
   * when submitting resources
   * This should only be called before the resource has been saved
   */
  replaceSecurity: (resource, security) => {
    resource.meta.security = security
  },
  /**
   * pre process the given resource to add necessary security tags
   */
  preProcess: (resource) => {
    if ( !resource.meta ) {
      resource.meta = {}
    }
    if ( !resource.meta.security ) {
      resource.meta.security = []
    }
    let uuid = uuidv5( "UPDATE_REQUIRED_"+(fhirSecurity.updateCount++), FHIR_UPDATE_NAMESPACE )

    return new Promise( async (resolve, reject) => {
      let promises = []
      if ( resource.id && ( !resource.meta.versionId || resource.meta.versionId !== "1" ) ) {
        fhirSecurity.replaceSecurity( resource, [] )
        try {
          let previous = await fhirAxios.read( resource.resourceType, resource.id )
          for( let modName of Object.keys(fhirSecurity.modules) ) {
            let module = fhirSecurity.modules[modName]
            if ( module.updateRequired( resource, previous ) ) {
              fhirSecurity.updateRequiredCache[ modName ][ uuid ] = true
              promises.push( module.preProcess( uuid, resource, previous ) )
            } else {
              if ( previous.meta && previous.meta.security ) {
                fhirSecurity.replaceSecurity( resource, previous.meta.security )
              }
            }
          }
        } catch(err) {
          reject(err)
        } 
      } else {
        for( let modName of Object.keys(fhirSecurity.modules) ) {
          let module = fhirSecurity.modules[modName]
          if ( module.updateRequired( resource ) ) {
            fhirSecurity.updateRequiredCache[ modName ][ uuid ] = true
            promises.push( module.preProcess( uuid, resource ) )
          }
        }
      }
      Promise.all( promises ).then( (results) => {
         resolve( uuid )
       } ).catch( (err) => {
         reject( err )
       } )
    } )

    
  },

  /**
   * set security metadata on the given resource after it has been saved.
   */
  postProcess: (resource, uuid) => {
    return new Promise( (resolve, reject) => {
      let promises = []
      for( let modName of Object.keys(fhirSecurity.modules) ) {
        let module = fhirSecurity.modules[modName]
        if ( fhirSecurity.updateRequiredCache[modName].hasOwnProperty( uuid ) 
          && fhirSecurity.updateRequiredCache[modName][uuid] ) {

          promises.push( module.postProcess( uuid, resource ) )
          delete fhirSecurity.updateRequiredCache[modName][uuid]

        }
      }
      Promise.all( promises ).then( (results) => {
         resolve( results )
       } ).catch( (err) => {
         reject( err )
       } )
    } )

  },

  /** 
   * check to see if the security metadata needs to be updated
   * returns boolean
   */
  /*
  updateRequired: (resource) => {
  },
  */
  /** 
   * set security metadata on the given resource
   * used to set the security metadata on this resource based on 
   * loaded modules
   */
  /*
  setSecurity: (resource) => {

    if ( !resource.meta ) {
      resource.meta = {}
    }
    if ( !resource.meta.security ) {
      resource.meta.security = []
    }

    return new Promise( (resolve, reject) => {
      let promises = []
      if ( resource.id && resource.meta.versionId !== "1" ) {
        previous = fhirAxios.read( resource.resourceType, resource.id ).then( (previous) => {
          for( let module of fhirSecurity.modules ) {
            if ( module.updateRequired( resource, previous ) ) {
              promises.push( module.setSecurity( resource, previous ) )
            } else {
              if ( previous.meta && previous.meta.security ) {
                fhirSecurity.addSecurity( resource, previous.meta.security )
              }
            }
          }
        } ).catch( (err) => {
          reject(err)
        } )
      } else {
        for( let module of fhirSecurity.modules ) {
          if ( module.updateRequired( resource ) ) {
            promises.push( module.setSecurity( resource ) )
          }
        }
      }
      Promise.all( promises ).then( (results) => {
         resolve( results )
       } ).catch( (err) => {
         reject( err )
       } )
    } )

  }
  */

  /*
    // will add from current or set up meta
    fhirSecurity.addSecurity( req.body )
    // http://antiquity:8080/hapi/fhir/PractitionerRole?practitioner=P10004&_include=PractitionerRole:practitioner&date=ge2020-11-06&_include=PractitionerRole:location&_include:iterate=Location:partof

    // all this should be in module so it can be handled with bundles
    if ( req.params.resource === "Practitioner ) {
      // need to figure out how to handle this after saving to FHIR.
      // Same for Location
    } else if ( req.body.hasOwnProperty("practitioner") && req.body.practitioner ) {
      req.body.meta.security.push( { system: "http://ihris.org/fhir/security/practitioner", code: req.body.practitioner )
    } else if ( req.body.extension && let practitioner = req.body.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference" ) {
      req.body.meta.security.push( { system: "http://ihris.org/fhir/security/practitioner", code: practitioner.valueReference.reference} )
    }

      next()

    } )
    */

}

module.exports = fhirSecurity
