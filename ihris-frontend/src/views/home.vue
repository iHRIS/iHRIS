<template>
  <v-sheet min-height="100vh" rounded="lg">
    <v-col cols="6" sm="3" lg="12" class="px-6 py-6">
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <v-card class="mx-auto my-4" color="green">
                <v-card-title>
                  Health Workers {{ totalHealthWorkers }}
                </v-card-title>
                <v-card-subtitle> Number of Health Workers</v-card-subtitle>
              </v-card>
            </v-col>

            <v-col>
              <v-card class="mx-auto my-4" color="blue">
                <v-card-title> Facilities {{ totalFacilities }} </v-card-title>
                <v-card-subtitle> Number of Facilities</v-card-subtitle>
              </v-card>
            </v-col>

            <v-col>
              <v-card class="mx-auto my-4" color="#ff5733">
                <v-card-title> District {{ totalDistricts }} </v-card-title>
                <v-card-subtitle> Number of Districts</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-card class="mx-auto px-4 py-4">
                <v-card-title> Pie Chart </v-card-title>
                <apexchart
                  type="pie"
                  width="380"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row></v-row>
    </v-col>
  </v-sheet>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import axios from "axios";

export default {
  name: "Home",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      totalHealthWorkers: 0,
      totalFacilities: 0,
      totalDistricts: 0,
      series: [],
      chartOptions: {
        chart: {
          width: 500,
          type: "pie",
        },
        labels: ["Health Workers", "Facilities", "Districts"],
        responsive: [
          {
            breakpoint: 500,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.getTotalHealthWorkers();
    this.getTotalFacilities();
    this.getTotalDistricts();
  },
  methods: {
    getTotalHealthWorkers() {
      // get total health workers
      let url = "";
      // check other pages
      if (url === "") {
        url = "http://localhost:8080/hapi/fhir/Practitioner?_total=accurate";
      }

      axios
        .get(url)
        .then((response) => {
          this.totalHealthWorkers = response.data.total;
          this.series.push(response.data.total);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    getTotalFacilities() {
      // get total health workers
      let url = "";
      // check other pages
      if (url === "") {
        url = "http://localhost:8080/hapi/fhir/Organisation";
      }

      axios
        .get(url)
        .then((response) => {
          this.totalFacilities = response.data.total;
          this.series.push(response.data.total);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    getTotalDistricts() {
      // get total health workers
      let url = "";
      // check other pages
      if (url === "") {
        url = "http://localhost:8080/hapi/fhir/Location";
      }

      axios
        .get(url)
        .then((response) => {
          this.totalDistricts = response.data.total;
          this.series.push(response.data.total);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
  },
};
</script>
