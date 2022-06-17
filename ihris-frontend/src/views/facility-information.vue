<template>
 <v-card v-if="loading" class="pa-16">
   <h2 class="text-center"> <v-progress-circular
      indeterminate
      color="primary"
      class="mr-2"
    ></v-progress-circular>Loading...</h2>
  </v-card>
  <v-card v-else class="pa-2">
    <h3 align="right">Total health workers:
      <v-chip
          class="ma-2"
          color="green"
          small
      >
        <v-icon left small>
          mdi-account-circle-outline
        </v-icon>
        {{ response && response.total ? response.total : 0 }}
      </v-chip>
    </h3>
    <v-row no-gutters>
      <v-col>
        <apexchart
            ref="chart"
            :options="chartOptions"
            :series="series"
            type="bar"
            width="400"
        ></apexchart>
      </v-col>
      <v-col>
        <template>
        <v-data-table
            dense
            :headers="headers"
            :items="desserts"
            class="elevation-1"
            hide-default-footer
            hide-default-header
        ></v-data-table>
      </template>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <apexchart
            ref="genderChart"
            :options="genderChart"
            :series="genderSeries"
            type="donut"
            width="400"
        ></apexchart>
      </v-col>
      <v-col>
        <apexchart
            ref="professionChart"
            :options="professionCategoryOptions"
            :series="professionCategorySeries"
            type="pie"
            width="400"
        ></apexchart>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
import '../plugins/chart'

export default {
  name: "FacilityInformation",
  props: ["id", "name", "partOf","closed"],
  data: function () {
    return {
      loading: true,
      response: undefined,
      series: [],
      genderSeries: [0,0],
      professionCategorySeries: [0,0,0],
      chartOptions: {
        chart: {
          type: "bar",
        },
        grid: {
          row: {
            colors: []
          }
        },
      },
      genderChart: {
        title: {
          text: 'By Gender',
          align: 'center',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#263238'
          },
        },
        labels: ['Male', 'Female'],
        chart: {
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 10
          }
        },
        grid: {
          padding: {
            bottom: -80
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      professionCategoryOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Professional', 'Administrative', 'Academics'],
        title: {
          text: 'By Profession Category',
          align: 'center',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#263238'
          },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {text: 'value', value: 'value'},
      ],
      desserts: [],
    }
  },
  created: function () {
    this.setupData();
  },
  watch: {
    id: function () {
      this.setupData();
    },
    partOf: function () {
      this.loading = true;
      this.setupData();
    },
    closed: function () {
     if(this.closed===false){
       this.response=undefined;
       this.id = undefined;
       this.series= [];
       this.genderSeries= [0,0];
       this.professionCategorySeries= [0,0,0];
     }else{
       this.response=undefined;
       this.series= [];
       this.genderSeries= [0,0];
       this.professionCategorySeries= [0,0,0];
       this.setupData();
     }
    },
  },
  methods: {
    setupData() {
      axios.post(`/config/facilityInformation`, {id: this.id, partOf: this.partOf}).then(res => {
        // this.genderSeries = Object.values(res.data.gender)
        this.desserts = res.data.facilityInformation;
        this.response = res.data
        console.log("response inside setupData",this.response)
        this.loading = false;
        this.buildWithData()
      })
    },
    buildWithData() {
      let series = [
        {name: "By Age", data: Object.values(this.response.ageRange), groupColor: '#33b2df'}
      ];
      let categories = ["20 to 35", "36 to 45", "46 to 55", "56 to 65", ">65"];
      this._buildGraphic(series, categories);
    },
    _buildGraphic(series, categories) {
      this.series = series;
      this.chartOptions = {
        chart: {
          type: "bar",
          height: 300,
          stacked: true,
          events: {
            mounted: (chartContext, config) => {
              setTimeout(() => {
                this.addAnnotations(config, categories, this);
              });
            },
            updated: (chartContext, config) => {
              setTimeout(() => {
                this.addAnnotations(config, categories, this);
              });
            }
          }
        },
        xaxis: {
          labels: {
            rotate: -45 //will rotate if label to long
          },
          categories: categories
        },
        title: {
          text: 'By Age',
          align: 'center',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#263238'
          },
        },
      };
      const colors = series.map((x) => x.groupColor);
      if (colors.length > 0) {
        this.chartOptions.colors = colors;
      }
    },
    addAnnotations(config, categories, vm) {
      const seriesTotals = config.globals.stackedSeriesTotals;
      vm.$refs.genderChart.clearAnnotations();
      this.genderSeries = this.response?Object.values(this.response.gender):[0,0];
      this.professionCategorySeries =this.response? Object.values(this.response.professionCategory):[0,0,0]
      vm.totalAll = 0;
      if (seriesTotals.length > 0) {
        vm.$refs.chart.clearAnnotations();
        categories.forEach((category, index) => {
          if (seriesTotals[index] > 0) {
            vm.totalAll += seriesTotals[index];

            vm.$refs.chart.addPointAnnotation({
              x: category,
              y: seriesTotals[index],
              label: {
                text: `${seriesTotals[index]}`
              }
            });
          }
        });
      }
    },
  }
}
</script>

<style>

</style>