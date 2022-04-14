<template>
  <v-sheet min-height="100vh" rounded="lg">
    <v-col cols="6" sm="3" lg="12" class="px-6 py-6">
      <v-row>
        <v-col>
          <!-- first line -->
          <v-row>
            <v-col cols="6">
              <v-card
                id="card-1"
                elevation="4"
                class="mx-4 my-4"
                outlined
                shaped
                color="green"
                height="25%"
              >
                <v-card-title>
                  <p style="color: white">Health Workers</p>
                </v-card-title>
                <v-card-text>
                  <p style="color: white">{{ totalHealthWorkers }}</p>
                </v-card-text>
              </v-card>

              <v-card
                id="card-1"
                elevation="4"
                class="mx-4 my-4"
                outlined
                shaped
                color="blue"
                height="25%"
              >
                <v-card-title>
                  <p style="color: white">Facilities</p>
                </v-card-title>
                <v-card-text>
                  <p style="color: white">{{ totalFacilities }}</p>
                </v-card-text>
              </v-card>

              <v-card
                id="card-1"
                class="mx-4 my-4"
                elevation="4"
                outlined
                shaped
                color="#ff5733"
                height="25%"
              >
                <v-card-title>
                  <p style="color: white">District</p>
                </v-card-title>
                <v-card-text>
                  <p style="color: white">{{ totalDistricts }}</p>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- gender chart -->
            <v-col cols="6">
              <v-card class="mx-auto">
                <highcharts :options="chartGenderOptions"></highcharts>
              </v-card>
            </v-col>
          </v-row>
          <!--  second line -->
          <v-row>
            <!-- cadre chart -->
            <v-col cols="6">
              <v-card class="mx-auto">
                <highcharts :options="chartCadreOptions"></highcharts>
              </v-card>
            </v-col>
            <!--  barchart -->
            <v-col cols="6">
              <v-card class="mx-auto">
                <highcharts :options="barChartOptions"></highcharts>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-sheet>
</template>

<script>
// import VueApexCharts from "vue-apexcharts";

import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      totalHealthWorkers: 0,
      totalFacilities: 0,
      totalDistricts: 0,
      totalFemale: 0,
      totalMale: 0,
      barChartOptions: {
        exporting: {
          buttons: {
            contextButton: {
              menuItems: [
                "viewFullscreen",
                "downloadPNG",
                "downloadJPEG",
                "downloadPDF",
              ],
            },
          },
        },
        chart: {
          type: "column",
        },
        title: {
          text: "Age Distribution",
        },
        subtitle: {
          text: "Source: MoH",
        },
        xAxis: {
          categories: ["Below 30", "30-39", "40-49", "50-59", "60 and Above"],
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: "Age (Number)",
          },
        },

        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: "Below 30",
            data: [20],
          },
          {
            name: "30-39",
            data: [34],
          },
          {
            name: "40-49",
            data: [20],
          },
          {
            name: "50-59",
            data: [10],
          },
          {
            name: "60 and Above",
            data: [4],
          },
        ],
      },
      // all data
      chartOptions: {
        exporting: {
          buttons: {
            contextButton: {
              menuItems: [
                "viewFullscreen",
                "downloadPNG",
                "downloadJPEG",
                "downloadPDF",
              ],
            },
          },
        },
        series: [
          {
            colorByPoint: true,
            data: [
              {
                name: "Health Workers",
                y: 61.41,
                selected: true,
                sliced: true,
              },
              {
                name: "Facilities",
                y: 40,
              },
              {
                name: "Districts",
                y: 30,
              },
            ],
          },
        ],
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          width: 380,
          type: "pie",
        },
        title: {
          text: "General Statistics",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },

        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            },
          },
        },
      },

      // gender data
      chartGenderOptions: {
        exporting: {
          buttons: {
            contextButton: {
              menuItems: [
                "viewFullscreen",
                "downloadPNG",
                "downloadJPEG",
                "downloadPDF",
              ],
            },
          },
        },
        series: [
          {
            name: "Genders",
            colorByPoint: true,
            data: [
              {
                name: "Female",
                y: 61.41,
                selected: true,
                sliced: true,
              },
              {
                name: "Male",
                y: 40,
              },
            ],
          },
        ],
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          width: 380,
          type: "pie",
        },
        title: {
          text: "Gender Distribution",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },

        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            },
          },
        },
      },
      //  cadre data
      chartCadreOptions: {
        exporting: {
          buttons: {
            contextButton: {
              menuItems: [
                "viewFullscreen",
                "downloadPNG",
                "downloadJPEG",
                "downloadPDF",
              ],
            },
          },
        },
        series: [
          {
            name: "Cadres",
            colorByPoint: true,
            data: [
              {
                name: "Medical Doctors",
                y: 61.41,
                selected: true,
                sliced: true,
              },
              {
                name: "Nursing Professionals",
                y: 40,
              },
              {
                name: "Allied Health Professionals",
                y: 30,
              },
              {
                name: "Health Community Workers",
                y: 50,
              },
              {
                name: "Support Staff",
                y: 50,
              },
              {
                name: "Pharmacy Professionals",
                y: 50,
              },
              {
                name: "Non Health Professionals",
                y: 50,
              },
              {
                name: "Midwifrey Professionals",
                y: 50,
              },
              {
                name: "Medical Professionals",
                y: 50,
              },
            ],
          },
        ],

        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          width: 380,
          type: "pie",
        },
        title: {
          text: "Cadre Distribution",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            },
          },
        },
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
        url =
          "/fhir/Location?_profile=http://ihris.org/fhir/StructureDefinition/ihris-facility";
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
