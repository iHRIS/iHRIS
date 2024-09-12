<template>
  <v-container class="py-5">
    <v-card>
      <v-card-title>
        {{ $t("App.hardcoded-texts.search") }} {{$t(`App.fhir-resources-texts.${label}`)}}
        <v-spacer></v-spacer>
        <v-btn v-if="!addLink || !addLink.hide" :class="addLink ? addLink.class || 'primary' : 'primary'" :to="addLink ? addLink.url : '/resource/add/'+page">
          <v-icon v-if="addLink && addLink.icon">{{ addLink.icon }}</v-icon>
          <v-icon v-else>mdi-database-plus</v-icon>
          {{ $t("App.hardcoded-texts.add") }} {{$t(`App.fhir-resources-texts.${label}`)}}
        </v-btn>
      </v-card-title>
      <v-card-title>
        <slot></slot>
      </v-card-title>
      <v-card-subtitle
        v-if="error_message"
        class="white--text error"
      >{{ error_message }}</v-card-subtitle>
      <v-card-text>
        <v-data-table
          style="cursor: pointer"
          :headers="headers"
          :items="results"
          item-key="id"
          :options.sync="options"
          :server-items-length="total"
          :footer-props="{ 'items-per-page-text':$t('App.hardcoded-texts.tableText'), 'items-per-page-options': [5,10,20,50] }"
          :loading="loading"
          class="elevation-1"
          @click:row="clickIt"
        ></v-data-table>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script>
export default {
  name: "ihris-search",
  props: ["profile", "fields", "label", "terms", "page", "resource", "add-link","dateFormat"],
  data: function() {
    return {
      debug: "",
      headers: [],
      results: [],
      options: { itemsPerPage: 10 },
      loading: false,
      total: 0,
      prevPage: -1,
      link: [],
      error_message: null,
      update_again: { rerun: false, restart: false },
      extraTerms: {},
      elements: []
    };
  },
  watch: {
    terms: {
      handler() {
        this.getData(true);
      },
      deep: true
    },
    options: {
      handler() {
        this.getData();
      },
      deep: true
    }
  },
  created: function() {
    if(this.$store.state.user && this.$store.state.user.obj && this.$store.state.user.obj.resource && this.$store.state.user.obj.resource.extension) {
      let location = this.$store.state.user.obj.resource.extension.find((ext) => {
        return ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-user-location"
      })
      if(location) {
        this.extraTerms["related-location"] = location.valueReference.reference + "," + true
      }
    }
    for (let field of this.fields) {
      this.headers.push({ text: this.$t(`App.fhir-resources-texts.${field[0]}`), value: field[1] });
      let element
      if(field[1].startsWith(this.resource)) {
        element = field[1].split(".")[1]
      } else {
        element = field[1].split(".")[0]
      }
      let exists = this.elements.find((el) => {
        return el === element
      })
      if(!exists) {
        this.elements.push(element)
      }
    }
  },
  mounted: function() {
    this.getData(true);
  },
  methods: {
    clickIt: function(record) {
      this.$router.push({
        name: "resource_view",
        params: { page: this.page, id: record.id }
      });
    },
    checkRerun() {
      if ( !this.loading && this.update_again.rerun ) {
        this.getData( this.update_again.restart )
        this.update_again = { rerun: false, restart: false }
      }
    },
    getData(restart) {
      //console.log("getting data",restart)
      if ( this.loading ) {
        this.update_again.rerun = true
        this.update_again.restart = this.update_again.restart || restart
        return
      }
      this.loading = true;
      this.error_message = null;
      let url = "";
      if (restart) this.options.page = 1;
      if (this.options.page > 1) {
        if (this.options.page === this.prevPage - 1) {
          url = this.link.find(link => link.relation === "previous").url;
        } else if (this.options.page === this.prevPage + 1) {
          url = this.link.find(link => link.relation === "next").url;
        }
        url = url.replace("/fhir?","/fhir/"+this.resource+"?")
        url = url.substring(url.indexOf("/fhir/"));

        //some of the hapi instances requires _total=accurate to always be available for them to return total resources
        if(url.indexOf('_total=accurate') === -1) {
          url = url + '&_total=accurate'
        }
        //add profile to url
        if(this.profile){
          url = url + '&_profile=' + this.profile
        }
        if(url.indexOf('_sort=_lastUpdated') === -1) {
          url = url + '&_sort=_lastUpdated'
        }
      }
      if (url === "") {
        let count = this.options.itemsPerPage || 10;
        let sort = "";
        for (let idx in this.options.sortBy) {
          if (sort) {
            sort += ",";
          }
          if (this.options.sortDesc[idx]) {
            sort += "-";
          }
          sort += this.options.sortBy[idx];
        }
        url =
          "/fhir/" +
          this.resource +
          "?_count=" +
          count +
          "&_elements=" + this.elements.join(",") +
          "&_total=accurate&_profile=" +
          this.profile +
          "&_sort=-_lastUpdated";
        let sTerms = Object.keys(this.terms);
        for (let term of sTerms) {
          if ( Array.isArray( this.terms[term] ) ) {
            if ( this.terms[term].length > 0 ) {
              url += "&" + term + "=" + this.terms[term].join(',')
            }
          } else if ( this.terms[term] ) {
            url += "&" + term + "=" + this.terms[term];
          }
        }
        sTerms = Object.keys(this.extraTerms);
        for (let term of sTerms) {
          if ( Array.isArray( this.extraTerms[term] ) ) {
            if ( this.extraTerms[term].length > 0 ) {
              url += "&" + term + "=" + this.extraTerms[term].join(',')
            }
          } else if ( this.extraTerms[term] ) {
            url += "&" + term + "=" + this.extraTerms[term];
          }
        }
        this.debug = url;
      }
      this.prevPage = this.options.page;
      //console.log("fetching",url)
      fetch(url).then(response => {
        response.json().then(async (data) => {
          this.results = [];
          if (data.total > 0) {
            this.link = data.link;
            for (let entry of data.entry) {
              let result = { id: entry.resource.id };
              for (let field of this.fields) {
                let fieldDisplay = this.$fhirpath.evaluate( entry.resource, field[1] );
                 let data = await this.$fhirutils.lookup( fieldDisplay[0], field[2] )
                 const regex = /^\d{4}-\d{2}-\d{2}$/;
                 if (this.dateFormat&&regex.test(fieldDisplay[0])) {
                   result[field[1]] = this.$moment(fieldDisplay[0]).format(this.dateFormat)
                 }else {
                   result[field[1]] = data
                 }
              }
              this.results.push(result);
            }
          }
          this.total = data.total;
          this.loading = false;
          this.checkRerun()
        }).catch(err => {
          this.loading = false;
          this.error_message = "Unable to load results.";
          this.checkRerun()
          console.log(err);
        });
      }).catch(err => {
        this.loading = false;
        this.error_message = "Unable to load results.";
        this.checkRerun()
        console.log(err);
      });
    }
  }
};
</script>
<style>
tbody tr:nth-of-type(even) {
  background-color: #E0F2F1;
}
</style>
