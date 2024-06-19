<template>
  <v-container class="py-5">
    <v-card>
      <v-card-title>
        {{ $t(`App.fhir-resources-texts.${label}`) }}
        <v-spacer></v-spacer>
        <slot></slot>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t(`App.hardcoded-texts.search`)"
          single-line
          hide-details
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          :class="addLink ? addLink.class || 'primary' : 'primary'"
          :to="addLink ? addLink.url : '/resource/add/' + page"
        >
          <v-icon v-if="addLink && addLink.icon">{{ addLink.icon }}</v-icon>
          <v-icon v-else>mdi-database-plus</v-icon>
          {{ $t(`App.hardcoded-texts.add`) }}
          {{ $t(`App.fhir-resources-texts.${label}`) }}
        </v-btn>
      </v-card-title>
      <v-card-subtitle v-if="error_message" class="white--text error">{{
        error_message
      }}</v-card-subtitle>
      <v-data-table
        style="cursor: pointer; z-index: -1"
        :headers="headers"
        :items="results"
        item-key="code"
        :search="search"
        :options.sync="options"
        :footer-props="{
          'items-per-page-text': $t('App.hardcoded-texts.tableText'),
          'items-per-page-options': [5, 10, 20, 50],
        }"
        :loading="loading"
        class="elevation-1"
        @click:row="clickIt"
      >
        <template v-slot:item.isActive="{ item }">
          <v-btn
            small
            v-if="!item.code.includes('(deactivated)')"
            color="secondary"
            class="white--text text-none"
            @click.stop="changeStatus(item)"
          >
            <v-icon right dark class="mr-2"> mdi-close-octagon-outline </v-icon>
            {{ $t(`App.hardcoded-texts.disable`) }}
          </v-btn>
          <v-btn
            v-else
            small
            color="green"
            class="white--text text-none"
            @click.stop="changeStatus(item)"
          >
            <v-icon right dark class="mr-2">
              mdi-checkbox-marked-circle-outline
            </v-icon>
            {{ $t(`App.hardcoded-texts.enable`) }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ihris-search-code",
  props: [
    "profile",
    "fields",
    "label",
    "terms",
    "page",
    "resource",
    "add-link",
  ],
  data: function () {
    return {
      debug: "",
      search: "",
      headers: [],
      results: [],
      options: { itemsPerPage: 10 },
      loading: false,
      total: 0,
      error_message: null,
    };
  },
  watch: {
    /*
    terms: {
      handler() {
        this.getData(true)
      },
      deep: true
    },
    options: {
      handler() {
        this.getData()
      },
      deep: true
    }
    */
  },
  created: function () {
    for (let field of this.fields) {
      this.headers.push({
        text: this.$t(`App.fhir-resources-texts.${field[0]}`),
        value: field[1],
      });
    }
    this.headers.push({ text: this.$t(`App.fhir-resources-texts.Status`), value: "isActive" });
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    changeStatus: function(item) {
      let url =
        "/fhir/CodeSystem" +
        this.profile.substring(this.profile.lastIndexOf("/"));
      fetch(url)
        .then((response) => {
          if (response.ok) {
            response
              .json()
              .then(async (data) => {
                let updated = data.concept.find(
                  (value) => value.code === item.code
                );
                if (updated.code.includes("(deactivated)")) {
                  updated.code = updated.code.replace("(deactivated)", "");
                  let version = data.version.split(".");
                  ++version[version.length - 1];
                  data.version = version.join(".");
                } else {
                  if(data.version) {
                    updated.code = `${updated.code}(deactivated)`;
                    let version = data.version.split(".");
                    ++version[version.length - 1];
                    data.version = version.join(".");
                  }
                }

                try {
                  await fetch(url, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/fhir+json",
                    },
                    body: JSON.stringify(data),
                  });
                  fetch(`/fhir/ValueSet?reference=${data.url}`)
                    .then((response) => {
                      if (response.ok) {
                        response
                          .json()
                          .then(async (res) => {
                            if (res.entry.length > 0) {
                              let data = res.entry[0].resource;
                              if(data.version) {
                                let version = data.version.split(".");
                                ++version[version.length - 1];
                                data.version = version.join(".");
                              }
                              try {
                                let response = await fetch(
                                  `/fhir/ValueSet/${data.id}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/fhir+json",
                                    },
                                    body: JSON.stringify(data),
                                  }
                                )
                                console.log(response.json())
                                this.$router.go();
                              } catch (error) {
                                console.log(error);
                              }
                            }
                          })
                          .catch((err) => {
                            this.loading = false;
                            this.error_message = "Unable to load results.";
                            console.log(err);
                          });
                      } else {
                        this.loading = false;
                        this.error_message = "Unable to load results.";
                        console.log("Invalid response", response);
                        response
                          .text()
                          .then((body) => {
                            console.log("body text:", body);
                          })
                          .catch((err) => {
                            console.log("Failed to get text:", err);
                          });
                      }
                    })
                    .catch((err) => {
                      this.loading = false;
                      this.error_message = "Unable to load results.";
                      console.log(err);
                    });
                } catch (error) {
                  console.log(error);
                }
              })
              .catch((err) => {
                this.loading = false;
                this.error_message = "Unable to load results.";
                console.log(err);
              });
          } else {
            this.loading = false;
            this.error_message = "Unable to load results.";
            console.log("Invalid response", response);
            response
              .text()
              .then((body) => {
                console.log("body text:", body);
              })
              .catch((err) => {
                console.log("Failed to get text:", err);
              });
          }
        })
        .catch((err) => {
          this.loading = false;
          this.error_message = "Unable to load results.";
          console.log(err);
        });
    },
    clickIt: function (record) {
      this.$router.push({
        name: "resource_view",
        params: { page: this.page, id: record.code },
      });
    },
    getData: function () {
      //console.log("getting data",restart)
      this.loading = true;
      this.error_message = null;
      let url =
        "/fhir/CodeSystem" +
        this.profile.substring(this.profile.lastIndexOf("/"));

      fetch(url)
        .then((response) => {
          if (response.ok) {
            response
              .json()
              .then(async (data) => {
                this.results = [];
                if (data.concept && data.concept.length > 0) {
                  for (let entry of data.concept) {
                    let result = {
                      code: entry.code,
                      display: entry.display,
                      definition: entry.definition,
                    };
                    if (entry.property && data.property) {
                      for (let prop of data.property) {
                        let property = entry.property.find(
                          (conceptProp) => conceptProp.code === prop.code
                        );
                        if (property) {
                          if (prop.type === "code") {
                            if (property.valueCode) {
                              result[prop.code] =
                                await this.$fhirutils.codeLookup(
                                  prop.uri,
                                  property.valueCode
                                );
                            } else {
                              result[prop.code] = "";
                            }
                          } else if (prop.type === "Coding") {
                            if (property.valueCoding) {
                              result[prop.code] =
                                await this.$fhirutils.codeLookup(
                                  property.valueCoding.system,
                                  property.valueCoding.code,
                                  prop.uri
                                );
                            } else {
                              result[prop.code] = "";
                            }
                          } else {
                            result[prop.code] =
                              property[
                                "value" +
                                  prop.type.charAt(0).toUpperCase() +
                                  prop.type.slice(1)
                              ];
                          }
                        }
                        //result[field[1]] = this.$fhirpath.evaluate(entry.resource, field[1])
                      }
                    }
                    this.results.push(result);
                  }
                }
                this.total = data.concept.length;
                this.loading = false;
              })
              .catch((err) => {
                this.loading = false;
                this.error_message = "Unable to load results.";
                console.log(err);
              });
          } else {
            this.loading = false;
            this.error_message = "Unable to load results.";
            console.log("Invalid response", response);
            response
              .text()
              .then((body) => {
                console.log("body text:", body);
              })
              .catch((err) => {
                console.log("Failed to get text:", err);
              });
          }
        })
        .catch((err) => {
          this.loading = false;
          this.error_message = "Unable to load results.";
          console.log(err);
        });
    },
  },
};
</script>

<style>
tbody tr:nth-of-type(even) {
  background-color: #E0F2F1;
}
</style>
