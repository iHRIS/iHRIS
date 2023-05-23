<style>
.highlighted {
  background-color: #5396dc !important;
}
</style>
<template>
  <v-container :key="pageKey" class="my-3">
    <v-form
        ref="form"
        v-model="valid"
    >
      <slot :position="position" :source="source"></slot>
      <v-overlay :value="overlay">
        <v-progress-circular
            color="primary"
            indeterminate
            size="50"
        ></v-progress-circular>
      </v-overlay>

      <v-navigation-drawer
          app
          class="primary darken-1 white--text"
          clipped
          permanent
          right
          style="z-index: 3;"
      >
        <v-list class="white--text">
          <v-list-item v-if="edit">
            <v-btn v-if="edit" class="secondary" dark @click="$router.go(-1)">
              <v-icon light>mdi-close-circle-outline</v-icon>
              <span>{{ $t(`App.hardcoded-texts.Cancel`) }}</span>
            </v-btn>
            <v-spacer></v-spacer>
            <template v-if="edit">
              <v-btn v-if="valid" :disabled="!valid" class="success darken-1" dark @click="processFHIR()">
                <v-icon light>mdi-content-save</v-icon>
                <span>{{ $t(`App.hardcoded-texts.Save`) }}</span>
              </v-btn>
              <v-btn v-else class="warning" dark @click="$refs.form.validate()">
                <v-icon light>mdi-content-save</v-icon>
                <span>{{ $t(`App.hardcoded-texts.Save`) }}</span>
              </v-btn>
            </template>
          </v-list-item>
          <v-divider color="white"></v-divider>
          <template v-if="!edit && links && links.length">
            <v-list-item v-for="(link,idx) in links" :key="link.url">
              <v-btn :key="link.url" :text="!link.button" :to="getLinkUrl(link)" :class="link.linkclass">
                <v-icon v-if="link.icon" light>{{ link.icon }}</v-icon>
                {{ linktext[idx] }}
              </v-btn>
            </v-list-item>
          </template>
          <v-divider color="white"></v-divider>
          <v-subheader v-if="sectionMenu" class="white--text"><h2>{{ $t(`App.hardcoded-texts.Sections`) }}</h2>
          </v-subheader>
          <v-list-item v-for="section in sectionMenu" :href="'#section-'+section.name" :key="section.name">
            <v-list-item-content class="white--text" v-if="!edit || !section.secondary">
              <v-list-item-title class="text-uppercase"><h4>{{ $t(`App.fhir-resources-texts.${section.title}`) }}</h4></v-list-item-title>
              <v-list-item-subtitle class="white--text">{{ $t(`App.fhir-resources-texts.${section.desc}`) }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-navigation-drawer>
      <v-card v-if="!this.edit"
              class="mx-auto mb-4 rounded-lg"
              max-width="700"
              outlined
      >
        <v-card-title class="primary font-weight-bold caption pa-2 white--text justify-center ">Record History
        </v-card-title>
        <v-card-text class="my-3">
          <v-row class="justify-space-between">
            <v-col cols="4"><span class="font-weight-bold">Record Id:</span></v-col>
            <v-col cols="8">{{ this.$data.orig.id }}</v-col>
          </v-row>
          <v-divider/>
          <v-row class="justify-space-between">
            <v-col cols="4"><span class="font-weight-bold">Last Updated:</span></v-col>
            <v-col cols="8">{{ new Date(this.$data.orig.meta.lastUpdated) }}</v-col>
          </v-row>
          <v-divider/>
          <v-row class="justify-space-between">
            <v-col cols="4"><span class="font-weight-bold">Version:</span></v-col>
            <v-col cols="8">{{ this.$data.orig.meta.versionId }} of {{ max }}</v-col>
          </v-row>
          <v-divider/>
          <v-row class="justify-space-between">
            <v-col cols="4"><span class="font-weight-bold">See older version:</span></v-col>
            <v-col cols="8">
              <v-row>
                <v-col class="px-4" cols="2">
                  <v-text-field
                      v-model.number="version"
                      :max="max"
                      :rules="[rules.min, rules.max]"
                      :value="this.$data.orig.meta.versionId"
                      class="mt-0 pt-0"
                      hide-details
                      min="1"
                      single-line
                      style="width: 40px;"
                      type="number"
                  ></v-text-field>
                </v-col>
                <v-col class="px-4">
                  <v-btn
                      :disabled="version>max || version<1"
                      color="primary"
                      icon
                      small
                      @click="changeVersion"
                  >
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-divider/>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>

</template>

<script>
import axios from "axios";

export default {
  name: "ihris-resource",
  props: ["title", "field", "fhir-id", "page", "profile", "section-menu", "edit", "links", "constraints"],
  data: function () {
    return {
      fhir: {},
      orig: {},
      valid: true,
      source: {data: {}, path: ""},
      path: "",
      loading: false,
      overlay: false,
      isEdit: false,
      linktext: [],
      position: "",
      advancedValid: true,
      loadingId: false,
      loadingCv: false,
      version: 1,
      max: 1,
      pageKey: 0,
      rules: {
        min: v => v >= 1 || `The Min is 1`,
        max: v => v <= this.max || `The Max is ${this.max}`
      },
    }
  },
  mounted() {
    if (!this.isQuestionnaire) {
      window.addEventListener("scroll", this.handleScroll);
    } else {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  created: function () {
    if (this.fhirId) {
      this.loading = true
      fetch(
          `/fhir/PractitionerRole?_practitioner=${this.fhirId}`
      )
          .then((response) => {
            response
                .json()
                .then((data) => {
                  if (data.entry) {
                    let role = data.entry[0].resource.code[0].coding[0].display;
                    this.position = role? role : "";
                  }
                })
                .catch((err) => {
                  console.log(this.field, this.fhirId, err);
                });
          })
          .catch((err) => {
            console.log(this.field, this.fhirId, err);
          });
      //console.log("getting",this.field,this.fhirId)
      fetch("/fhir/" + this.field + "/" + this.fhirId).then(response => {
        response.json().then(data => {
          //this.$store.commit('setCurrentResource', data)
          this.max = data.meta.versionId
          this.orig = data
          this.source = {data: data, path: this.field}
          this.setLinkText()
          this.loading = false
        }).catch(err => {
          console.log(this.field, this.fhirId, err)
        })
      }).catch(err => {
        console.log(this.field, this.fhirId, err)
      })
    } else if (this.$route.query) {
      let presets = {
        resourceType: this.field
      }
      let hasPresets = false
      for (let path of Object.keys(this.$route.query)) {
        if (path.startsWith(this.field + ".")) {
          hasPresets = true
          let elements = path.substring(this.field.length + 1).split('.')
          let last = elements.pop()
          let current = presets
          for (let element of elements) {
            if (element.includes('[')) {
              try {
                let parts = element.split('[')
                let name = parts[0]
                let idx = parts[1].slice(0, -1)
                if (!current.hasOwnProperty(name)) {
                  current[name] = []
                }
                if (idx) {
                  let next = {}
                  current[name][parseInt(idx)] = next
                  current = next
                } else {
                  let next = {}
                  current[name].push(next)
                  current = next
                }
              } catch (err) {
                console.log("Unable to process", path)

              }
            } else {
              if (!current.hasOwnProperty(element)) {
                current[element] = {}
                current = current[element]
              }
            }
          }
          if (last.includes('[')) {
            try {
              let parts = last.split('[')
              let name = parts[0]
              let idx = parts[1].slice(0, -1)
              if (!current.hasOwnProperty(name)) {
                current[name] = []
              }
              if (idx) {
                current[name][parseInt(idx)] = this.$route.query[path]
              } else {
                current[name].push(this.$route.query[path])
              }

            } catch (err) {
              console.log("Unable to process", path)

            }
          } else {
            current[last] = this.$route.query[path]
          }
        }
      }
      if (hasPresets) {
        this.source = {data: presets, path: this.field}
      }
    }
  },
  computed: {
    hasFhirId: function () {
      if (this.fhirId == '') {
        return false
      } else if (!this.fhirId) {
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
    handleScroll() {
      this.hasScrolled = window.top.scrollY >= 100;
      this.sectionMenu.map((data) => {
        let divs = document.getElementById(`section-${data.name}`);
        let sectionTop = divs.offsetTop;
        if (pageYOffset >= sectionTop) {
          this.path = `#section-${data.name}`;
        }
      });
    },
    getLinkField: function (field) {
      let content = this.$fhirpath.evaluate(this.source.data, field)
      if (content) {
        return content[0]
      } else {
        return false
      }
    },
    getLinkUrl: function (link) {
      let field
      if (link.field) {
        field = this.getLinkField(link.field)
      }
      if (field) {
        if (field.includes('/')) {
          let ref = field.split('/')
          field = ref[1]
        }
        return link.url.replace("FIELD", field)
      } else {
        return link.url
      }
    },
    setLinkText: function () {
      for (let idx in this.links) {
        let link = this.links[idx]
        if (link.text) {
          this.linktext[idx] = link.text
        } else if (link.field) {
          let field = this.getLinkField(link.field)
          if (field) {
            this.$fhirutils.lookup(field).then(display => {
              this.$set(this.linktext, idx, display)
            })
          }
        }
      }
    },
    processFHIR: async function () {
      this.$refs.form.validate()
      if (!this.valid) return
      this.advancedValid = true
      this.overlay = true
      this.loading = true

      //const processChildren = function( parent, obj, children ) {
      const processChildren = async (parent, obj, children) => {
        //console.log("called on "+parent)

        for (let child of children) {

          let fullField = parent

          let next = obj

          if (child.field && !child.fieldType /* ignore arrays */) {
            //console.log("working on "+parent+" . "+child.field)
            let field
            if (child.sliceName) {
              if (child.field.startsWith("value[x]")) {
                field = child.field.substring(9)
                fullField += "." + field
              } else {
                field = child.field.replace(":" + child.sliceName, "")
                fullField += "." + field
              }
            } else {
              field = child.field
              fullField += "." + field
            }
            if (child.max !== "1" || child.baseMax !== "1") {
              if (!obj.hasOwnProperty(field)) {
                next[field] = []
              }
            } else {
              next[field] = {}
            }
            //console.log(fullField)
            //console.log(child.max, child.baseMax)
            //console.log(child)
            if (child.hasOwnProperty("value")) {
              //console.log( fullField +"="+ child.value )
              if (Array.isArray(next[field])) {
                next[field].push(child.value)
              } else {
                next[field] = child.value
              }
              next = next[field]
            } else {
              if (Array.isArray(next[field])) {
                let sub = {}
                if (child.profile) {
                  sub.url = child.profile
                } else if (field === "extension" && child.sliceName) {
                  sub.url = child.sliceName
                }
                next[field].push(sub)
                next = sub
              } else {
                next = next[field]
              }
            }
          }

          if (child.$children) {
            try {
              await processChildren(fullField, next, child.$children)
            } catch (err) {
              this.advancedValid = false
              console.log(err)
            }
          }
          if (child.constraints) {
            child.errors = []
            try {
              this.advancedValid = this.advancedValid && await this.$fhirutils.checkConstraints(child.constraints,
                  this.constraints, next, child.errors, this.fhirId)
            } catch (err) {
              this.advancedValid = false
              child.errors.push("An unknown error occurred.")
              console.log(err)
            }
          }

        }

      }

      //console.log(this.field)
      this.fhir = {
        resourceType: this.field,
        meta: {
          profile: [this.profile]
        }
      }
      //console.log(this)
      try {
        await processChildren(this.field, this.fhir, this.$children)
      } catch (err) {
        this.advancedValid = false
        console.log(err)
      }
      if (!this.advancedValid) {
        this.overlay = false
        this.loading = false
        this.$store.commit('setMessage', {type: 'error', text: 'There were errors on the form.'})
        return
      }
      console.log("FINISHED PROCESS AND CHECK.")
      let url = "/fhir/" + this.field
      let opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/fhir+json"
        },
        redirect: 'manual',
      }
      if (this.fhirId) {
        this.fhir.id = this.fhirId
        url += "/" + this.fhirId
        opts.method = "PUT"
      }
      opts.body = JSON.stringify(this.fhir)
      fetch(url, opts).then(response => {
        //console.log(response.headers)
        if (response.status === 201 || response.status === 200) {
          response.json().then(data => {
            this.overlay = false
            this.loading = false

            if (this.fhirId) {
              this.$store.commit("setMessage", {
                type: "success",
                text: "Update successful.",
              });
              setTimeout(() => this.$router.go(0), 1000);
            } else {
              this.$router.push({name: "resource_view", params: {page: this.page, id: data.id}})
            }
          })
        }
      })
    },
    changeVersion() {
      fetch("/fhir/vRead" + "/" + this.field + "/" + this.fhirId + "/" + this.version)
          .then((response) => {
            response
                .json()
                .then((data) => {
                  this.orig = data;
                  this.source = {data: data, path: this.field};
                  this.setLinkText();
                  this.loading = false;
                  this.pageKey += 1;
                })
                .catch((err) => {
                  console.log(this.field, this.fhirId, err);
                });
          })
          .catch((err) => {
            console.log(this.field, this.fhirId, err);
          });
    }
  }
}

</script>