<template>
  <v-container class="my-3">
    <ihris-practitioner-intro/>
    <v-form id="app" ref="form" v-model="valid">
      <slot :source="source"></slot>
      <v-overlay :value="overlay">
        <v-progress-circular
            color="primary"
            indeterminate
            size="50"
        ></v-progress-circular>
        <v-btn icon @click="overlay = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
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
          <v-list-item>
            <v-btn class="secondary" dark @click="$router.go(-1)">
              <v-icon light>mdi-close-circle-outline</v-icon>
              <span>{{ $t("App.hardcoded-texts.Cancel") }}</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                v-if="valid"
                :disabled="!valid"
                class="success darken-1"
                dark
                @click="processFHIR()"
            >
              <v-icon light>mdi-content-save</v-icon>
              <span>{{ $t("App.hardcoded-texts.Save") }}</span>
            </v-btn>
            <v-btn v-else class="green" dark @click="$refs.form.validate()">
              <v-icon light>mdi-content-save</v-icon>
              <span>{{ $t("App.hardcoded-texts.Save") }}</span>
            </v-btn>
          </v-list-item>
          <v-list-item
              v-if="
              $router.history.current.path ===
                '/questionnaire/ihris-practitioner/practitioner'
            "
          >
            <v-btn
                class="primary"
                dark
                @click="$router.push('/bulk-registration')"
            >
              <v-icon light>mdi-attachment</v-icon>
              <span>{{ $t("App.hardcoded-texts.uploadCSV") }}</span>
            </v-btn>
          </v-list-item>
          <v-list-item
              v-if="
              $router.history.current.path ===
                '/questionnaire/ihris-practitioner/practitioner'
            "
          >
            <v-btn class="primary" dark @click="getCsvTemplate">
              <v-icon light>mdi-download</v-icon>
              <span>{{ $t("App.hardcoded-texts.getCSVTemplate") }}</span>
            </v-btn>
          </v-list-item>
          <v-divider color="white"></v-divider>
          <v-subheader v-if="sectionMenu" class="white--text"
          ><h2>{{ $t("App.hardcoded-texts.Sections") }}</h2></v-subheader
          >
          <v-list-item
              v-for="section in sectionMenu"
              :key="section.id"
              :class="'#section-' + section.id === path ? 'highlighted' : ''"
              :href="'#section-' + section.id"
          >
            <v-list-item-content class="white--text">
              <v-list-item-title class="text-uppercase"
              >
                <h4>{{ $t(`App.fhir-resources-texts.${section.title}`) }}</h4>
              </v-list-item-title
              >
              <v-list-item-subtitle class="white--text">{{
                  $t(`App.fhir-resources-texts.${section.desc}`)
                }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

const querystring = require("querystring");
export default {
  name: "ihris-questionnaire",
  props: [
    "id",
    "url",
    "title",
    "description",
    "purpose",
    "section-menu",
    "view-page",
    "edit",
    "constraints",
    "field",
    "profile",
    "fhir-id",
  ],
  data: function () {
    return {
      fhir: {},
      loading: false,
      overlay: false,
      isEdit: false,
      valid: true,
      advancedValid: true,
      position: "",
      source: {path: "", data: {}},
      introSource: {path: "", data: {}},
      path: "",
    };
  },
  watch: {
    $route: function () {
      this.path = this.$route.hash;
    },
  },
  created: function () {
    if (this.fhirId) {
      this.loading = true
      //console.log("getting",this.field,this.fhirId)
      fetch("/fhir/" + this.field + "/" + this.fhirId).then(response => {
        response.json().then(data => {
          //this.$store.commit('setCurrentResource', data)
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
    }
  },
  methods: {
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
    logout() {
      this.loading = true
      fetch("/auth/logout").then(() => {
        this.loading = false
        this.$store.commit('logout')
        this.$store.commit('setMessage', {type: 'success', text: 'You change your password success fully.'})
        this.$router.push({path: "/"})
      })
    },
    handleScroll() {
      // Any code to be executed when the window is scrolled
      this.hasScrolled = window.top.scrollY >= 100;
      this.sectionMenu.map((data) => {
        let divs = document.getElementById(`section-${data.id}`);
        let sectionTop = divs.offsetTop;
        // let sectionHeight = divs.clientHeight
        if (pageYOffset >= sectionTop) {
          this.path = `#section-${data.id}`;
        }
      });
    },
    getCsvTemplate() {
      axios({
        url: "/config/csvTemplate",
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        let blob = new Blob([response.data], {
          type: "application/vnd.ms-excel",
        });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "User_bulk_registration_template.xlsx";
        link.click();
      });
    },
    processFHIR: async function () {
      this.$refs.form.validate();
      if (!this.valid) return;
      this.advancedValid = true;
      this.overlay = true;
      this.loading = true;
      let editingResources = []
      if (this.fhirId) {
        editingResources.push({
          profile: this.profile,
          id: this.fhirId
        })
      }

      const mergeArrayExtensionFields = (children) => {
        let merged = []
        for (let child of children) {
          for (let child1 of child.$children) {
            if (child1.isExtension) {
              for (let child2 of child1.$children) {
                merged.push(child2)
              }
            }
          }
        }
        return merged
      }

      const processChildren = async (obj, children, itemMap) => {
        if (!itemMap) itemMap = {};

        for (let child of children) {
          let next = obj;
          let myItemMap = {};
          if (child.isArray) {
            //console.log("ARRAY", child.path)
          } else if (child.isQuestionnaireGroup) {
            if (child.resourceId) {
              editingResources.push({
                profile: child.profile,
                id: child.resourceId
              })
            }
            //console.log("GROUP", child.path)
            let section = {linkId: child.path, text: child.label, item: []};
            next.push(section);
            next = section.item;
          } else if (child.qField) {
            let item;
            if (itemMap.hasOwnProperty(child.path)) {
              item = itemMap[child.path];
            } else {
              item = {linkId: child.path, answer: []};
              itemMap[child.path] = item;
              next.push(item);
            }
            let answer = {};
            answer[child.qField] = child.value;
            item.answer.push(answer);
            if (child.constraints) {
              child.errors = [];
              try {
                this.advancedValid =
                    this.advancedValid &&
                    (await this.$fhirutils.checkConstraints(
                        child.constraints,
                        this.constraints,
                        child.value,
                        child.errors
                    ));
              } catch (err) {
                this.advancedValid = false;
                child.errors.push("An unknown error occurred.");
                console.log(err);
              }
            }
          }

          if (child.$children) {
            // console.log("PROCESSING CHILDREN OF",child.path)
            try {
              let children = []
              if (child.isArray) {
                let merged = mergeArrayExtensionFields(child.$children)
                if (merged.length > 0) {
                  children = merged
                }
              }
              if (children.length === 0) {
                children = child.$children
              }
              await processChildren(next, children, myItemMap);
            } catch (err) {
              this.advancedValid = false;
              console.log(err);
            }
          }
          if (child.isQuestionnaireGroup && child.constraints) {
            child.errors = [];
            try {
              this.advancedValid =
                  this.advancedValid &&
                  (await this.$fhirutils.checkConstraints(
                      child.constraints,
                      this.constraints,
                      next,
                      child.errors
                  ));
            } catch (err) {
              this.advancedValid = false;
              child.errors.push("An unknown error occurred.");
              console.log(err);
            }
          }
        }
      };
      this.fhir = {
        resourceType: "QuestionnaireResponse",
        questionnaire: this.url,
        status: "completed",
        item: [],
      };
      try {
        await processChildren(this.fhir.item, this.$children);
      } catch (err) {
        this.advancedValid = false;
        console.log(err);
      }
      if (!this.advancedValid) {
        this.overlay = false;
        this.loading = false;
        this.$store.commit("setMessage", {
          type: "error",
          text: "There were errors on the form.",
        });
        return;
      }
      if (
          this.fhir.item.find((d) => d.linkId === "Practitioner:communication")
      ) {
        this.fhir.item
            .find((d) => d.linkId === "Practitioner:communication")
            .item.map((comm, index) => {
          comm.linkId = `Practitioner:communication[${index}]`;
          comm.item[0].linkId = `Practitioner.communication[${index}]`;
        });
      }
      this.$route.query.editing = false
      if (editingResources.length > 0) {
        this.$route.query.editingResources = JSON.stringify(editingResources)
        this.$route.query.editing = true
      }
      fetch(
          "/fhir/QuestionnaireResponse?" +
          querystring.stringify(this.$route.query),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/fhir+json",
            },
            redirect: "manual",
            body: JSON.stringify(this.fhir),
          }
      )
          .then((response) => {
            if (response.status === 201) {
              response.json().then((data) => {
                this.overlay = false;
                this.loading = false;
                let subject;
                if (this.viewPage) {
                  if (data.meta.tag) {
                    let redirect = data.meta.tag.find(
                        (tag) =>
                            tag.system === "http://ihris.org/fhir/tags/resource"
                    );
                    if (redirect && redirect.code) {
                      subject = redirect.code;
                    }
                  }
                  if (!subject && data.subject && data.subject.reference) {
                    subject = data.subject.reference;
                  }
                  if (subject) {
                    let viewPageId = subject.split("/");
                    if (viewPageId[1]) {
                      viewPageId = viewPageId[1];
                    } else {
                      viewPageId = subject;
                    }
                    if (data.questionnaire === "http://ihris.org/fhir/Questionnaire/ihris-change-password") {
                      this.logout()
                    }
                    this.$router.push({
                      name: "resource_view",
                      params: {page: this.viewPage, id: viewPageId},
                    });
                  }
                }
                if (!subject) {
                  this.$router.push({name: "home"});
                }
              });
              this.$store.commit("setMessage", {
                type: "success",
                text: "Added successfully.",
              });
            } else {
              this.overlay = false;
              this.loading = false;
              response
                  .json()
                  .then((data) => {
                    let errors;
                    if (data.resourceType == "OperationOutcome") {
                      try {
                        errors = Array.from(
                            new Set(data.issue.map((issue) => issue.diagnostics))
                        ).join(", ");
                      } catch (err) {
                        console.log("Unable to retrieve errors from ", data);
                      }
                    } else if (data.message) {
                      errors = data.message
                    } else {
                      errors = "Unknown";
                    }
                    this.$store.commit("setMessage", {
                      type: "error",
                      text:
                          "An error occurred trying to save this record: " + errors,
                    });
                  })
                  .catch((err) => {
                    this.$store.commit("setMessage", {
                      type: "error",
                      text: "An unknown error occurred trying to save this record.",
                    });
                    console.log("Error on retrieving error status", err);
                  });
            }
          })
          .catch((err) => {
            console.log(err);
            this.overlay = false;
            this.loading = false;
            this.$store.commit("setMessage", {
              type: "error",
              text: "Failed to update data.",
            });
          });
    },
  },
  components: {
    "ihris-practitioner-intro": () =>
        import(
            /* webpackChunkName: "fhir-primary" */ "@/components/ihris/ihris-practitioner-intro"
            ),
  },

};
</script>

<style>
.highlighted {
  background-color: #5396dc !important;
}
</style>
