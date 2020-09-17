<template>
  <v-container class="my-3">
        
    <slot :source="source"></slot>
    <v-overlay :value="overlay">
      <v-progress-circular
        size="50"
        color="primary"
        indeterminate
        ></v-progress-circular>
    </v-overlay>

    <v-navigation-drawer
      app
      right
      permanent
      clipped
      class="primary darken-1 white--text"
      style="z-index: 3;"
      >
      <v-list class="white--text">
        <v-list-item>
          <v-btn v-if="!edit" dark class="secondary" @click="$emit('set-edit', !edit)">
          <v-icon light>mdi-pencil</v-icon>
          <span>Edit</span>
          </v-btn>
          <v-btn v-else dark class="secondary" @click="$router.go(0)">
          <v-icon light>mdi-pencil-off</v-icon>
          <span>Cancel</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn dark class="success darken-1" @click="processFHIR()" v-if="edit">
          <v-icon light>mdi-content-save</v-icon>
          <span>Save</span>
          </v-btn>
        </v-list-item>
        <v-divider color="white"></v-divider>
        <v-list-item v-if="!edit && links && links.length">
          <v-btn v-for="(link,idx) in links" :key="link.url" :text="!link.button" :to="getLinkUrl(link)" class="primary">
            <v-icon light v-if="link.icon">{{link.icon}}</v-icon>
            {{ linktext[idx]  }}
          </v-btn>
        </v-list-item>
        <v-subheader v-if="sectionMenu" class="white--text"><h2>Sections</h2></v-subheader>
        <v-list-item v-for="section in sectionMenu" :href="'#section-'+section.name" :key="section.name">
          <v-list-item-content class="white--text" v-if="!edit || !section.secondary">
            <v-list-item-title class="text-uppercase"><h4>{{ section.title }}</h4></v-list-item-title>
            <v-list-item-subtitle class="white--text">{{ section.desc }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </v-container>

</template>

<script>
export default {
  name: "ihris-resource",
  props: ["title","field","fhir-id","page","profile","section-menu","edit","links" ],
  data: function() {
    return {
      fhir: {},
      source: { data: {}, path: "" },
      loading: false,
      overlay: false,
      isEdit: false,
      linktext: [ ]
    }
  },
  created: function() {
    if ( this.fhirId ) {
      this.loading = true
      //console.log("getting",this.field,this.fhirId)
      fetch( "/fhir/"+this.field+"/"+this.fhirId ).then(response => {
        response.json().then(data => {
          //this.$store.commit('setCurrentResource', data)
          this.source = { data: data, path: this.field }
          this.setLinkText()
          this.loading = false
        }).catch(err=> {
          console.log(this.field,this.fhirId,err)
        })
      }).catch(err=> {
        console.log(this.field,this.fhirId,err)
      })
    } else if ( this.$route.query ) {
      console.log( this.$route.query )
      let presets = {
        resourceType: this.field
      }
      let hasPresets = false
      for( let path of Object.keys( this.$route.query ) ) {
        if ( path.startsWith( this.field +"." ) ) {
          hasPresets = true
          let elements = path.substring( this.field.length+1 ).split('.')
          let last = elements.pop()
          let current = presets
          for( let element of elements ) {
            if ( element.includes('[') ) {
              try {
                let parts = element.split('[')
                let name = parts[0]
                let idx = parts[1].slice(0,-1)
                if ( !current.hasOwnProperty(name) ) {
                  current[name] = []
                }
                if ( idx ) {
                  let next = {}
                  current[name][parseInt(idx)] = next
                  current = next
                } else {
                  let next = {}
                  current[name].push( next )
                  current = next
                }
              } catch( err ) {
                console.log("Unable to process",path)
                continue
              }
            } else {
              if ( !current.hasOwnProperty(element) ) {
                current[element] = {}
                current = current[element]
              }
            }
          }
          if ( last.includes('[') ) {
            try {
              let parts = last.split('[')
              let name = parts[0]
              let idx = parts[1].slice(0,-1)
              if ( !current.hasOwnProperty(name) ) {
                current[name] = []
              }
              if ( idx ) {
                current[name][parseInt(idx)] = this.$route.query[path]
              } else {
                current[name].push( this.$route.query[path] )
              }

            } catch( err ) {
              console.log("Unable to process",path)
              continue
            }
          } else {
            current[last] = this.$route.query[path]
          }
        }
      }
      if ( hasPresets ) {
        this.source = { data: presets, path: this.field }
      }
    }
  },
  computed: {
    hasFhirId: function() {
      if ( this.fhirId == '' ) {
        return false
      } else if ( !this.fhirId ) {
        return false
      } else {
        return true
      }
    }
    /*
    source: function() {
      return this.$store.state.fhir
    }
    */
  },
  methods: {
    getLinkField: function(field) {
      let content = this.$fhirpath.evaluate( this.source.data, field )
      if ( content ) {
        return content[0]
      } else {
        return false
      }
    },
    getLinkUrl: function(link) {
      let field
      if ( link.field ) {
        field = this.getLinkField(link.field)
      }
      if ( field ) {
        if ( field.includes('/') ) {
          let ref = field.split('/')
          field = ref[1]
        }
        return link.url.replace("FIELD",field)
      } else {
        return link.url 
      }
    },
    setLinkText: function() {
      for ( let idx in this.links ) {
        let link = this.links[idx]
        if ( link.text ) {
          this.linktext[idx] = link.text
        } else if ( link.field ) {
          let field = this.getLinkField(link.field)
          if ( field ) {
            this.$fhirutils.lookup(field).then( display => {
              this.$set( this.linktext, idx, display )
            } )
          }
        }
      }
    },
    processFHIR: function() {
      this.overlay = true
      this.loading = true
      //console.log(this.field)
      this.fhir = { 
        resourceType: this.field,
        meta: {
          profile: [ this.profile ]
        }
      }
      //console.log(this)
      processChildren( this.field, this.fhir, this.$children )
      let url = "/fhir/"+this.field
      let opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/fhir+json"
        },
        redirect: 'manual',
      } 
      if ( this.fhirId ) {
        this.fhir.id = this.fhirId
        url += "/" + this.fhirId
        opts.method = "PUT"
      }
      opts.body = JSON.stringify(this.fhir)
      console.log("SAVE",url,this.fhir)
      fetch( url, opts ).then(response => {
        //console.log(response)
        //console.log(response.headers)
        if ( response.status === 201 || response.status === 200 ) {
          response.json().then(data => {
            console.log("RESPONSE",data)
            this.overlay = false
            this.loading = false
            if ( this.fhirId ) {
              this.$router.go(0)
            } else {
              this.$router.push({ name:"resource_view", params: {page: this.page, id: data.id } })
            }
          })
        }
      } )
      //console.log(this.fhir)

      /*
      console.log(this.$scopedSlots.default())
      processSlots( this.field, this.$scopedSlots.default() )
      */
    }
  }
}

const processChildren = function( parent, obj, children ) {
  //console.log("called on "+parent)

  children.forEach( child => {

    let fullField = parent

    let next = obj

    if ( child.field && !child.fieldType /* ignore arrays */ ) {
      //console.log("working on "+parent+" . "+child.field)
      let field
      if ( child.sliceName ) {
        if ( child.field.startsWith("value[x]") ) {
          field = child.field.substring(9)
          fullField += "." + field
        } else {
          field = child.field.replace(":"+child.sliceName, "")
          fullField += "." + field
        }
      } else {
        field = child.field
        fullField += "."+field
      }
      if ( child.max !== "1" || child.baseMax !== "1" ) {
        if ( !obj.hasOwnProperty(field) ) {
          next[field] = []
        }
      } else {
        next[field] = {}
      }
      //console.log(fullField)
        //console.log(child.max, child.baseMax)
      //console.log(child)
      if ( child.hasOwnProperty("value") ) {
        //console.log( fullField +"="+ child.value )
        if ( Array.isArray( next[field] ) ) {
          next[field].push( child.value )
        } else {
          next[field] = child.value
        }
        next = next[field]
      } else {
        if ( Array.isArray( next[field] ) ) {
          let sub = {}
          if ( child.profile ) {
            sub.url = child.profile
          } else if ( field === "extension" && child.sliceName ) {
            sub.url = child.sliceName
          }
          next[field].push( sub )
          next = sub
        } else {
          next = next[field]
        }
      }
    }

    if ( child.$children ) {
      processChildren( fullField, next, child.$children )
    } 

  } )

}


</script>
