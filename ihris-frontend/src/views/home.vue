<template>
  <v-sheet min-height="100vh" rounded="lg">
    <v-col cols="6" sm="3" lg="12" class="px-6 py-6">
      <v-row>
        <v-col>
          <!-- first line -->
          <v-row>
            <v-col cols="6">
              <v-card class="mx-auto my-4" color="green">
                <v-card-title>
                  Health Workers {{ totalHealthWorkers }}
                </v-card-title>
                <v-card-subtitle> Number of Health Workers</v-card-subtitle>
              </v-card>
              <v-card class="mx-auto my-4" color="blue">
                <v-card-title> Facilities {{ totalFacilities }} </v-card-title>
                <v-card-subtitle> Number of Facilities</v-card-subtitle>
              </v-card>
              <v-card class="mx-auto my-4" color="#ff5733">
                <v-card-title> District {{ totalDistricts }} </v-card-title>
                <v-card-subtitle> Number of Districts</v-card-subtitle>
              </v-card>
            </v-col>

            <v-col cols="6">
              <v-card class="mx-auto">
                <v-card-title> Health Worker Gender Distribution </v-card-title>
                <apexchart
                  type="pie"
                  width="380"
                  :options="chartGenderOptions"
                  :series="seriesGender"
                ></apexchart>
              </v-card>
            </v-col>
          </v-row>
          <!--  second line -->
          <v-row>
            <v-col cols="6">
              <v-card class="mx-auto">
                <v-card-title> Stats </v-card-title>
                <apexchart
                  type="pie"
                  width="380"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card class="mx-auto">
                <v-card-title> Cadre Distribution </v-card-title>
                <apexchart
                  type="pie"
                  width="380"
                  :options="chartCadreOptions"
                  :series="seriesCadre"
                ></apexchart>
                <!-- <highcharts
                  :options="testOptions"
                ></highcharts> -->
              </v-card>
            </v-col>
          </v-row>

          <v-row></v-row>
          <!-- third line -->
          <v-row>
            <v-col cols="16" lg="12" sm="4">
              <v-card class="mx-auto">
                <v-card-title> Age Distribution</v-card-title>
                <apexchart
                  type="bar"
                  height="430"
                  :options="chartBarOptions"
                  :series="seriesBarChart"
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
// import HighchartsVue from "highcharts-vue";

import axios from "axios";

export default {
  name: "Home",
  components: {
    apexchart: VueApexCharts,
    // highcharts: HighchartsVue,
  },
  data() {
    return {
      totalHealthWorkers: 0,
      totalFacilities: 0,
      totalDistricts: 0,
      totalFemale: 0,
      totalMale: 0,

      // barchart data
      seriesBarChart: [
        {
          data: [40, 35, 41, 25, 20],
        },
      ],
      chartBarOptions: {
        chart: {
          type: "bar",
          height: 430,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },

        xaxis: {
          categories: ["Below 30", "30-39", "40-49", "50-59", "60 and Above"],
        },
      },
      // all data
      series: [],
      chartOptions: {
        chart: {
          width: 480,
          type: "pie",
        },
        labels: ["Health Workers", "Facilities", "Districts"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },

      // gender data
      seriesGender: [],
      chartGenderOptions: {
        chart: {
          width: 480,
          type: "pie",
        },
        labels: ["Female", "Male"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      //  cadre data
      seriesCadre: [20, 34, 45, 56],
      chartCadreOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: [
          "Medical Doctor",
          "Nurse",
          "Allied Health Professional",
          "Pharmacist",
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },

      // test data
      testOptions: {
        series: [
          {
            data: [1, 2, 3], // sample data
          },
        ],
      },
    };
  },
  mounted() {
    this.getTotalHealthWorkers();
    this.getTotalFacilities();
    this.getTotalDistricts();
    this.getTotalFemaleHealthWorkers();
    this.getTotalMaleHealthWorkers();
  },
  methods: {
    getTotalHealthWorkers() {
      // get total health workers
      let url = "";
      // check other pages
      if (url === "") {
        url = "/fhir/Practitioner?_total=accurate";
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
        url = "/fhir/Organisation";
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
        url = "/fhir/Location?_total=accurate";
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

    //  gender data fetch
    getTotalFemaleHealthWorkers() {
      // get total health workers
      let url = "";
      // check other pages
      if (url === "") {
        url = "/fhir/Practitioner?_total=accurate&gender=female";
      }

      axios
        .get(url)
        .then((response) => {
          this.totalFemale = response.data.total;
          this.seriesGender.push(response.data.total);
          console.log("female", this.totalFemale);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    getTotalMaleHealthWorkers() {
      // get total health workers
      let url = "";
      // check other pages
      if (url === "") {
        url = "/fhir/Practitioner?_total=accurate&gender=male";
      }

      axios
        .get(url)
        .then((response) => {
          this.totalMale = response.data.total;
          this.seriesGender.push(response.data.total);
          console.log("male", this.totalMale);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
  },
};
</script>
