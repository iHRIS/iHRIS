<template>
  <v-container class="my-3">
    <ihris-practitioner-intro
        :isQuestionnaire="true"
        :slotProps="source"
    ></ihris-practitioner-intro>
    <v-form id="app" ref="form" v-model="valid">
      <slot></slot>
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
          ><h2>{{ $t("App.hardcoded-texts.Section") }}</h2></v-subheader
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
  components: {
    "ihris-practitioner-intro": () =>
        import(
            /* webpackChunkName: "fhir-primary" */ "@/components/ihris/ihris-practitioner-intro"
            ),
  },
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
      path: "",
    };
  },
  watch: {
    $route: function () {
      this.path = this.$route.hash;
    },
  },
  created: function () {
    let params = this.$route.query;

    let fhirId = params.practitioner;

    if (fhirId) {
      fetch(`/fhir/PractitionerRole?_practitioner=${this.fhirId}`)
          .then((response) => {
            response
                .json()
                .then((data) => {
                  let role = data.entry
                      ? data.entry[0].resource.code[0].coding[0].display
                      : "";
                  this.position = role ? role : "";
                  this.position = role ? role : "";
                })
                .catch((err) => {
                  console.log(this.field, this.fhirId, err);
                });
          })
          .catch((err) => {
            console.log(this.field, this.fhirId, err);
          });
      fetch("/fhir/Practitioner/" + fhirId)
          .then((response) => {
            response
                .json()
                .then((data) => {
                  this.source = {source: {data: data, path: "Practitioner"}};
                })
                .catch((err) => {
                  console.log(err);
                });
          })
          .catch((err) => {
            console.log(err);
          });
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
  methods: {
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
        url: "/fhir/csvTemplate",
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

      const processChildren = async (obj, children, itemMap) => {
        if (!itemMap) itemMap = {};

        for (let child of children) {
          let next = obj;
          let myItemMap = {};

          if (child.isArray) {
            //console.log("ARRAY", child.path)
          } else if (child.isQuestionnaireGroup) {
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
              await processChildren(next, child.$children, myItemMap);
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

};
</script>

<style>
.highlighted {
  background-color: #5396dc !important;
}
</style>
