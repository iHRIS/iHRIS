<template>
<!--  <div-->
<!--      v-if="!closed && this.data && show"-->
<!--      :class="[this.isQuestionnaire ? 'show' : 'hide']"-->
<!--      style="padding: 0"-->
<!--  >-->
    <v-snackbar
        v-model="snackbar"
        :bottom="bottom"
        :right="bottom"
        :timeout="timeout"
        color="white"
        width="320"
    >
      <div>
        <v-card color="white" elevation="0" height="400" width="320">
          <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title
              class="pa-0 pb-2 pr-2"
          >
            <h4 class="black--text">{{ title }}</h4>
            <v-spacer></v-spacer>
            <v-btn
                class="justify-end"
                color="warning"
                icon
                small
                @click="
                () => {
                  this.closed = true;
                  this.snackbar = false;
                }
              "
            >
              <v-icon>mdi-close-box-multiple-outline</v-icon>
            </v-btn>
          </v-card-title>
          <hr class="dotted-divider"/>
          <br>
          <v-card-title
              class="justify-center"
              style="padding-top: 4px; padding-bottom: 4px"
          >
            <v-avatar v-if="showImage" size="120" tile>
              <img :src="photoURL?photoURL:'/images/Blank-Avatar.jpg'" alt="photo"/>
            </v-avatar>
          </v-card-title>
            <v-simple-table :height="showImage?250:'auto'" light>
              <tbody>
              <tr v-for="[keyName,value] in Object.entries(this.data)" :key="keyName">
                <td class="body-1" style="text-align: left"><strong>{{ keyName }}:</strong></td>
                <td class="subtitle-1">{{ value }}</td>
              </tr>
              </tbody>
            </v-simple-table>
        </v-card>
      </div>
    </v-snackbar>
<!--  </div>-->
</template>

<script>
export default {
  name: "ihris-practitioner-intro",
  props: ["slotProps", "isQuestionnaire","practitionerRole","practitionerData"],
  data: function () {
    return {
      practitioner: {},
      closed: false,
      title: "",
      show: true,
      snackbar: true,
      timeout: -1,
      bottom: true,
      right: true,
      showImage: false,
      photoURL: undefined,
      placeToDisplayHorizontal: "left",
      placeToDisplayVertical: "top",
      data: {},
    };
  },
  components: {},
  watch: {
    slotProps: {
      handler() {
        if (!this.lockWatch) {
          this.setupData();
        }
      },
      deep: true,
    },
  },
  methods: {
    setupData() {
      if (this.slotProps?.source?.data) {
        let practitionerData = this.slotProps.source.data;
        let practitionerRole = this.slotProps.practitionerRole
        if (!practitionerData || practitionerData.resourceType !== 'Practitioner') {
          return
        }
        this.practitioner = practitionerData;
        if (this.practitionerData) {
          this.practitioner = this.practitionerData
        }
        if(practitionerRole){
          this.practitionerRole = practitionerRole
        }
      }
    },
    getParameter() {
      fetch("/auth").then(() => {
        fetch("/config/site").then(response => {
          response.json().then(data => {
            let intro
            if (data.hasOwnProperty("intro")) intro = data.intro
            this.title = intro.title
            let internalData = intro.data
            let keys = Object.keys(internalData)
            for (let key of keys) {
              if (internalData[key]?.path.includes(",")) {
                let paths = internalData[key].path.split(",")

                let finalData = paths.map(path => {
                  let pathData = this.practitioner
                  if(path.startsWith("PractitionerRole")){
                    pathData = this.practitionerRole
                  }
                  return this.$fhirpath.evaluate(pathData, path)
                })
                this.data[internalData[key].text] = finalData.join(",")
              } else {
                 let pathData = this.practitioner
                  if(internalData[key].path.startsWith("PractitionerRole")){
                    pathData = this.practitionerRole
                  }
                let finalData = this.$fhirpath.evaluate(pathData, internalData[key].path)
                if (internalData[key]?.type === "photo") {
                  this.showImage = true
                  if (finalData?.length > 0) {
                    let photo = finalData[0]
                    if (photo.data && photo.contentType) {
                      let dataURL = "data:" + photo.contentType + ";base64," + photo.data;
                      fetch(dataURL)
                          .then((res) => res.blob())
                          .then((blob) => {
                            this.photoURL = URL.createObjectURL(blob);
                          })
                          .catch((e) => {
                            console.log("Failed to get data from base64.", e);
                          });
                    }
                  }
                } else {
                  if (typeof finalData === 'object') {
                    this.data[internalData[key].text] = finalData.join(",")
                  } else {
                    this.data[internalData[key].text] = finalData
                  }
                }
              }
            }
          })
        })
      })
    },
  },
  created() {
    this.getParameter();
  }
}


</script>

<style scoped>
.hide {
  opacity: 0;
}

.show {
  opacity: 1;
}

.v-snack__content {
  padding: 0; /* Set padding to 0 to remove it */
}

.dotted-divider {
  border: none;
  border-top: 4px dotted green;
  height: 2px;
}
</style>
