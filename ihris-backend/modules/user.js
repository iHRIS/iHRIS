const nconf = require('./config')
const fhirAxios = nconf.fhirAxios
const crypto = require('crypto')

const ROLE_EXTENSION = "http://ihris.org/fhir/StructureDefinition/ihris-assign-role"
const TASK_EXTENSION = "http://ihris.org/fhir/StructureDefinition/ihris-task"

function isObject(obj) {
  return (!!obj) && (obj.constructor === Object)
}

const user = {
  __testUser: () => {
    return new User( {} )
  },
  lookup: ( query ) => {
    return new Promise( (resolve, reject) => {
      fhirAxios.search( "Person", query ).then( async(response) => {
        if ( response.total === 0 ) {
          resolve( false )
        } else if ( response.total > 1 ) {
          console.error("Too many users found for "+JSON.stringify(query))
          resolve( false )
        } else {
          let userObj = new User( response.entry[0].resource )
          await userObj.updatePermissions()
          resolve( userObj )
        }
      } ).catch( (err) => {
        console.error(err)
        reject( err )
      } )
    } )
  },
  lookupByEmail: ( email ) => {
    return user.lookup( { telecom: "email|" + email } )
  },
  lookupByProvider: ( provider, id ) => {
    return user.lookup( { identifier: provider + "|" + id } )
  },
  find: ( id ) => {
    return new Promise( (resolve, reject) => {
      fhirAxios.read( "Person", id ).then( async(response) => {
        let userObj = new User( response )
        await userObj.updatePermissions()
        resolve( userObj )
      } ).catch( (err) => {
        console.error(err)
        reject( err )
      } )
    } )
  },
  hashPassword: ( password, salt ) => {
    if ( !salt ) {
      salt = crypto.randomBytes(16).toString('hex')
    }
    let hash = crypto.pbkdf2Sync( password, salt, 1000, 64, 'sha512' ).toString('hex')
    return { hash: hash, salt: salt }
  },
  tasksLoaded: false,
  tasksLoading: false,
  valueSet: {},
  loadTaskList: ( refresh ) => {
    return new Promise( (resolve, reject) => {
      if ( user.tasksLoading ) {
        let interval = setInterval( () => {
          if ( user.tasksLoaded && !user.tasksLoading ) {
            clearInterval( interval )
            resolve()
          }
        }, 500 )
      } else if ( user.tasksLoaded && !refresh ) {
        resolve()
      } else {
        user.tasksLoading = true
        user.tasksLoaded = false

        Promise.all( [
          fhirAxios.expand( "ihris-task-permission" ),
          fhirAxios.expand( "ihris-task-resource" )
        ] ).then( (results) => {
          user.valueSet[ "ihris-task-permission" ] = results[0].map( exp => exp.code )
          user.valueSet[ "ihris-task-resource" ] = results[1].map( exp => exp.code )

          user.tasksLoading = false
          user.tasksLoaded = true
          resolve()
        } ).catch( (err) => {
          reject( err )
        } )


      }

    } )
  },
  addRole: ( permissions, roleStr ) => {
    return new Promise( (resolve, reject) => {
      const role = roleStr.split( '/' )
      if ( role.length !== 2 ) {
        console.error( "Invalid role passed to addRole: " +roleStr )
        resolve()
      } else {
        fhirAxios.read( role[0], role[1] ).then ( async(response) => {
          await user.loadTaskList()
          let tasks = response.extension.filter( ext => ext.url === TASK_EXTENSION )
          for( let task of tasks ) {

            let permission = undefined
            let resource = undefined
            let id = undefined
            let constraint = undefined
            let field = undefined
            try {
              permission = task.extension.find( ext => ext.url === "permission" ).valueCode
            } catch( err ) {
              console.error("No permission given for task.  Don't know what to do.")
              continue
            }
            try {
              resource = task.extension.find( ext => ext.url === "resource" ).valueCode
            } catch( err ) {
              console.error("No resource given for task.  Don't know what to do.")
              continue
            }
            try {
              id = task.extension.find( ext => ext.url === "id" ).valueId
            } catch( err ) {
              // id takes precedence and only one can be set
              try {
                constraint = task.extension.find( ext => ext.url === "constraint" ).valueString
              } catch( err ) {
              }
            }
            try {
              field = task.extension.find( ext => ext.url === "field" ).valueString
            } catch( err ) {
            }
            user.addPermission( permissions, permission, resource, id, constraint, field )

          }

          let roles = response.extension.filter( ext => ext.url === ROLE_EXTENSION )
          for( let role of roles ) {
            await user.addRole( permissions, role.valueReference.reference )
          }
          resolve()
        } ).catch( (err) => {
          console.error( err )
          reject( err )
        } )
      }
    } )
  },
  addPermission: ( permissions, permission, resource, id, constraint, field ) => {
    if ( !user.tasksLoaded ) {
      console.error("Can't load permissions directly unless the task lists have been loaded for validation.  call user.loadTaskList() first.")
      return false
    }
    if ( !user.valueSet["ihris-task-permission"].includes( permission ) ) {
      console.error( "Invalid permission given "+permission, user.valueSet["ihris-task-permission"] )
      return false
    }
    if ( !user.valueSet["ihris-task-resource"].includes( resource ) ) {
      console.error( "Invalid resource given "+resource, user.valueSet["ihris-task-resource"] )
      return false
    }
    // Can't have an id when it's all resources
    if ( resource === "*" && ( id || field ) ) {
      console.error("Can't add global resource permissions on a specific id or by including a field: "+id+" - "+field)
      return false
    }

    if ( ( permission === "*" || permission === "delete" ) && ( id || field ) ) {
      console.error("Can't add delete permission on a specific id or by including a field: "+id+" - "+field)
      return false
    }
    if ( !permissions.hasOwnProperty( permission ) ) {
      permissions[permission] = {}
    }
    if ( !field && !id && !constraint ) {
      permissions[permission][resource] = true
    } else if ( permissions[permission][resource] !== true ) {
      if ( !permissions[permission].hasOwnProperty( resource ) ) {
        permissions[permission][resource] = {}
      }
      if ( id ) {
        if ( !permissions[permission][resource].hasOwnProperty( "id" ) ) {
          permissions[permission][resource].id = {}
        }
        if ( field ) {
          if ( !permissions[permission][resource].id.hasOwnProperty( id ) ) {
            permissions[permission][resource].id[id] = { }
          } 
          if ( isObject( permissions[permission][resource].id[id] ) ) {
            permissions[permission][resource].id[id][field] = true
          }
        } else {
          permissions[permission][resource].id[id] = true
        }
      } else if ( constraint ) {
        if ( !permissions[permission][resource].hasOwnProperty( "constraint" ) ) {
          permissions[permission][resource].constraint = {}
        }
        if ( field ) {
          if ( !permissions[permission][resource].constraint.hasOwnProperty( constraint ) ) {
            permissions[permission][resource].constraint[constraint] = {}
          } 
          if ( isObject( permissions[permission][resource].constraint[constraint] ) ) {
            permissions[permission][resource].constraint[constraint][field] = true
          }
        } else {
          permissions[permission][resource].constraint[constraint] = true
        }
      } else {
        if ( !permissions[permission][resource].hasOwnProperty( "*" ) ) {
          permissions[permission][resource]["*"] = {}
        } 
        permissions[permission][resource]["*"][field] = true
      }
    }

    return true
  }
}

class User {

  resource = {}
  permissions = {}

  constructor( resource ) {
    this.resource = resource
  }
  

  async updatePermissions() {
    if ( this.resource.hasOwnProperty("extension") ) {
      let roles = this.resource.extension.filter( ext => ext.url === ROLE_EXTENSION )
      for( let role of roles ) {
        try {
          await user.addRole( this.permissions, role.valueReference.reference )
        } catch( err ) {
          console.error( "Unable to load permissions", role, err )
        }
      }
    }
  }

  addPermission( permission, resource, id, constraint, field ) {
    return user.addPermission( this.permissions, permission, resource, id, constraint, field )
  }

  /**
   * Gets a specific permission from the permissions object without any additional checking
   */
  __hasPermission( permission, resource ) {
    try {
      return this.permissions[permission][resource]
    } catch( err ) {
      return false
    }
  }
  /**
   * Gets a permission from the permissions object by checking for overriding values.
   */
  hasPermission( permission, resource, id ) {
    let perms = [ "*" ]
    if ( permission !== "*" )
      perms.push( permission )
    let resources = [ "*" ]
    if ( resource !== "*" )
      resources.push( resource )

    let results = {}

    for( let perm of perms ) {
      for( let res of resources ) {
        let allowed = this.__hasPermission( perm, res )
        if ( allowed === true ) {
          return true
        } else {
          // override with most precise
          results = allowed
        }
      }
    }
    if ( Object.keys(results).length === 0 ) {
      return false
    } else {
      if ( id ) {
        if ( results.hasOwnProperty( "id" ) && results.id.hasOwnProperty( id ) ) {
          return results.id[id]
        }
        if ( results.hasOwnProperty( "*" ) ) {
          return results["*"]
        }
      }
      return results
    }
  }

  /**
   * Reset the permissions list
   */
  resetPermissions() {
    this.permissions = {}
  }

  checkPassword( password ) {
    let details = this.resource.extension.find( ext => 
      ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password" )
    if ( !details ) {
      console.error( "Password details don't exist in user "+this.resource.id )
      return false
    }
    let hash = details.extension.find( ext => ext.url === "password" )
    let salt = details.extension.find( ext => ext.url === "salt" )
    if ( !hash || !hash.valueString || !salt || !salt.valueString ) {
      console.error( "Hash or salt doesn't exist in user "+this.resource.id )
      return false
    }
    let compare = user.hashPassword( password, salt.valueString )
    if ( compare.hash === hash.valueString ) {
      return true
    } else {
      return false
    }
  }

  update() {
    return fhirAxios.update( this.resource )
  }

}


module.exports = user
