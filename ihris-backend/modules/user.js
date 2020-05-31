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
          fhirAxios.expand( "ihris-task-profile" )
        ] ).then( (results) => {
          user.valueSet[ "ihris-task-permission" ] = results[0].map( exp => exp.code )
          user.valueSet[ "ihris-task-profile" ] = results[1].map( exp => exp.code )

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
            let profile = undefined
            let resource = undefined
            let field = undefined
            try {
              permission = task.extension.find( ext => ext.url === "permission" ).valueCode
            } catch( err ) {
              console.error("No permission given for task.  Don't know what to do.")
              continue
            }
            try {
              profile = task.extension.find( ext => ext.url === "profile" ).valueCode
            } catch( err ) {
            }
            try {
              resource = task.extension.find( ext => ext.url === "resource" ).valueReference.reference
            } catch( err ) {
            }
            if ( !profile && !resource ) {
              console.error( "No resource or profile given for task.  Don't know what to do.")
              continue
            }
            if ( profile ) {
              resource = profile
            }
            try {
              field = task.extension.find( ext => ext.url === "field" ).valueString
            } catch( err ) {
            }
            user.addPermission( permissions, permission, resource, field )

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
  addPermission: ( permissions, permission, resource, field ) => {
    if ( !user.tasksLoaded ) {
      console.error("Can't load permissions manually unless the task lists have been loaded for validation.  user.loadTaskList()")
      return false
    }
    if ( !user.valueSet["ihris-task-permission"].includes( permission ) ) {
      console.error( "Invalid permission given "+permission, user.valueSet["ihris-task-permission"] )
      return false
    }
    if ( !resource.includes('/') && !user.valueSet["ihris-task-profile"].includes( resource ) ) {
      console.error( "Invalid profile given "+resource, user.valueSet["ihris-task-profile"] )
      return false
    }
    if ( permission === "delete" && ( resource.includes('/') || field ) ) {
      console.error("Can't add delete permission on a specific resource or by including a field: "+resource+" - "+field)
      return false
    }
    if ( !permissions.hasOwnProperty( permission ) ) {
      permissions[permission] = {}
    }
    if ( field ) {
      if ( !permissions[permission].hasOwnProperty( resource ) ) {
        permissions[permission][resource] = {}
      } 
      if ( isObject( permissions[permission][resource] ) ) {
        permissions[permission][resource][field] = true
      }
    } else {
      permissions[permission][resource] = true
    }
    return true
  }
}

class User {

  #resource = {}
  #permissions = {}

  constructor( resource ) {
    this.#resource = resource
  }
  
  get permissions() {
    return this.#permissions
  }
  get resource() {
    return this.#resource
  }

  async updatePermissions() {
    if ( this.#resource.hasOwnProperty("extension") ) {
      let roles = this.#resource.extension.filter( ext => ext.url === ROLE_EXTENSION )
      for( let role of roles ) {
        try {
          await user.addRole( this.#permissions, role.valueReference.reference )
        } catch( err ) {
          console.error( "Unable to load permissions", role, err )
        }
      }
    }
  }

  addPermission( permission, resource, field ) {
    return user.addPermission( this.#permissions, permission, resource, field )
  }

  /**
   * Gets a specific permission from the permissions object without any additional checking
   */
  __getPermission( permission, resource ) {
    try {
      return this.#permissions[permission][resource]
    } catch( err ) {
      return false
    }
  }
  /**
   * Gets a permission from the permissions object by checking for overriding values.
   */
  getPermission( permission, resource ) {
    let perms = [ "*", permission ]
    let resources = [ "*" ]
    if ( resource.includes( '/' ) ) {
      resources.push( resource.slice( 0, resource.indexOf( '/' ) ) )
    } 
    resources.push( resource )
    let fieldList = {}

    for( let perm of perms ) {
      for( let res of resources ) {
        let allowed = this.__getPermission( perm, res )
        if ( allowed === true ) {
          return true
        } else if ( isObject( allowed ) ) {
          fieldList = { ...fieldList, ...allowed }
        }
      }
    }
    if ( Object.keys(fieldList).length === 0 ) {
      return false
    } else {
      return fieldList
    }
  }

  /**
   * Reset the permissions list
   */
  resetPermissions() {
    this.#permissions = {}
  }

  checkPassword( password ) {
    let details = this.#resource.extension.find( ext => 
      ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password" )
    if ( !details ) {
      console.error( "Password details don't exist in user "+this.#resource.id )
      return false
    }
    let hash = details.extension.find( ext => ext.url === "password" )
    let salt = details.extension.find( ext => ext.url === "salt" )
    if ( !hash || !hash.valueString || !salt || !salt.valueString ) {
      console.error( "Hash or salt doesn't exist in user "+this.#resource.id )
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
    return fhirAxios.update( this.#resource )
  }

}


module.exports = user
