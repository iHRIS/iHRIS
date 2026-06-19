<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col>
          <h4 class="font-weight-medium">
            <v-icon class="mr-2" color="primary" size="28">mdi-tablet-dashboard</v-icon>
            Dashboard
          </h4>
        </v-col>
        <v-col>
          <v-select
            :items="dashboards"
            v-model="dashboard"
            item-text="title"
            item-value="id"
            label="Other Dashboards"
            @change="$router.push('/dashboard/' + dashboard)"
          ></v-select>
        </v-col>
        <v-col class="ml-2">
          <v-row justify="end">
            <v-switch
                v-model="partOf"
                color="indigo"
            >
              <template #label>
                <h5 class="description">Include Data from Selected District/Facility only</h5>
              </template>
            </v-switch>
            <template #label>
                <h5 class="description">Filter By: </h5>
            </template>
            <fhir-reference-dashboard
                v-if="configLoaded"
                :initialValue="getData.location ? `Location/${getData.location}` : defaultLocation"
                baseMax="1"
                baseMin="0"
                constraints=undefined
                display-type="tree"
                edit=true
                field="partOf"
                label="Region/District/SubCounty/Facility"
                max="1"
                min="0"
                path="Location.partOf"
                readOnlyIfSet:undefined
                sliceName:undefined
                slotProps:Object
                source:Object
                subFields:undefined
                targetResource="Location"
                @selectFacilityForDashboard="onSelectedFacility"
            >
            </fhir-reference-dashboard>
          </v-row>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 90vh">
     <iframe
         v-if="selectedFacility"
          :src="`/dashboards/app/dashboards#/view/${$route.params.id}?embed=true&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,key:ihris-related-group.keyword,negate:!f,params:(query:'${selectedFacility}'),type:phrase),query:(match_phrase:(ihris-related-group:'${selectedFacility}')))))&hide-filter-bar=true`"
          height="100%"
          style="border: none;"
          width="100%"
      >
      </iframe>
      <iframe
         v-if="getData.location && !selectedFacility"
          :src="`/dashboards/app/dashboards#/view/${$route.params.id}?embed=true&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,key:ihris-related-group.keyword,negate:!f,params:(query:'Location/${getData.location}'),type:phrase),query:(match_phrase:(ihris-related-group:'Location/${getData.location}')))))&hide-filter-bar=true`"
          height="100%"
          style="border: none;"
          width="100%"
      ></iframe>
     <iframe
         v-if="!getData.location && !selectedFacility"
          :src="'/dashboards/app/dashboards#/view/'+$route.params.id+'?embed=true'"
          height="100%"
          style="border: none;"
          width="100%"
      ></iframe>
    </v-card-text>
  </v-card>
</template>
<script>
import FhirReferenceDashboard from "@/components/fhir/fhir-reference-dashboard.vue";
import { kibana } from "@/mixins/kibana"

export default {
  name: "dashboard",
  components: {FhirReferenceDashboard},
  props: [ "id" ],
  mixins: [kibana],
  data() {
    return {
      selectedFacility: '',
      facilityName: '',
      dashboard: '',
      // Fallback location-tree root for users with no assigned location,
      // configured in IhrisParameters.fsh as
      // defaults:fields:Location.partOf:initialValue (e.g. "Location/UG").
      defaultLocation: '',
      // Gate the reference tree until the fallback is loaded so the child
      // component mounts with the correct initialValue (it reads it once).
      configLoaded: false
    }
  },
  methods: {
    onSelectedFacility: function (value) {
      this.selectedFacility = value.id
      this.facilityName = value.name
    }
  },
  computed: {
    getData() {
      return this.$store.state.user
    }
  },
  created() {
    this.$store.state.minidrawer = true
    this.dashboard = this.$route.params.id
    fetch("/config/getParameters?key=" + encodeURIComponent("defaults:fields:Location.partOf:initialValue"))
        .then(response => response.json())
        .then(data => {
          if (typeof data === "string") {
            this.defaultLocation = data
          }
          this.configLoaded = true
        })
        .catch(err => {
          console.log(err)
          this.configLoaded = true
        })
  }
}
</script>