<template>
  <v-layout row wrap class="pb-5">
    <v-flex :class="applyProfileHeaderGridLayout" v-if="practitioner.photo">
      <v-img  :src="getProfilePicture()" 
        contain
        :min-width="applyMinProfilePictureWidth"
       />
    </v-flex>
   
    <v-flex :class="applyGridProfileHeaderEditRecord"  v-if="practitioner.name" >
      <v-row :class="applyGridLayoutTitle">{{ name }}</v-row>
      <v-row :class="applyGridLayoutTitle">
        {{ position }}<span v-if="position && location">,</span> {{ location }}
      </v-row>
      <v-row :class="applyGridLayoutTitle">
        {{ employmentDate }}
      </v-row>
      <v-row>
        <v-chip
          class="ma-2"
          :color="active.color"
          text-color="white"
          @click="changeActive"
        >
          <v-avatar left>
            <v-icon>{{ active.icon }}</v-icon>
          </v-avatar>

          {{ active.text }}
        </v-chip>
      </v-row>
    </v-flex>
    <v-flex xs4 offset-xs1 class="pr-3">
      <Alert ref="alert" />
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";

import Alert from "@/components/Layout/Alert.vue";
import MobileLayout from "@/mixins/MobileLayout.js";

export default {
  mixins: [MobileLayout],
  asyncComputed: {
    async location() {
      let workHistory = this.getCurrentWorkHistory();

      if (workHistory && workHistory.location && workHistory.location[0]) {
        let location = workHistory.location[0].reference;
        let id = location.substring(location.lastIndexOf("/") + 1);

        let result = await axios.get(
          this.config.backend + "/structure-definition/get/Location/" + id
        );

        return result.data.name;
      }

      return "";
    }
  },
  components: {
    Alert
  },
  computed: {
    applyGridLayoutTitle(){
      return this.gridLayoutTitle(this.screenSize);
    },
    applyMinProfilePictureWidth()
    {
        return this.minProfilePictureWidth(this.screenSize);
    },
    applyProfileHeaderGridLayout()
    {
        return this.profileHeaderGridLayout(this.screenSize);
    },
    applyGridProfileHeaderEditRecord(){
      return this.gridProfileHeaderEditRecord(this.screenSize);
    },
    active() {
      // active is defined as active unless it is explicitly set to false per the structure definition
      if (this.practitioner.active === false) {
        return {
          color: "red",
          text: "Inactive",
          icon: "mdi-close-circle-outline"
        };
      }

      return {
        color: "green",
        text: "Active",
        icon: "mdi-checkbox-marked-circle"
      };
    },
    employmentDate() {
      let workHistory = this.getCurrentWorkHistory();

      if (workHistory) {
        let employmentDate = "";

        if (workHistory.period.start) {
          employmentDate += workHistory.period.start + " to ";

          if (workHistory.period.end) {
            employmentDate += workHistory.period.end;
          } else {
            employmentDate += "present";
          }
        }

        return employmentDate;
      }

      return "";
    },
    name() {
      let name = "";

      if (this.practitioner.name[0].prefix) {
        name += this.practitioner.name[0].prefix[0] + " ";
      }

      if (this.practitioner.name[0].given) {
        name += this.practitioner.name[0].given[0] + " ";
      }

      if (this.practitioner.name[0].family) {
        name += this.practitioner.name[0].family + " ";
      }

      if (this.practitioner.name[0].suffix) {
        name += this.practitioner.name[0].suffix[0] + " ";
      }

      return name;
    },
    position() {
      let workHistory = this.getCurrentWorkHistory();

      if (workHistory && workHistory.code && workHistory.code[0]) {
        return workHistory.code[0].text;
      }

      return "";
    }
  },
  created() {
    this.config = require("@/config/config.json");
  },
  data() {
    return {
      config: null
    };
  },
  methods: {
    changeActive() {
      if (this.edit) {
        this.practitioner.active = !this.practitioner.active;

        axios
          .post(this.config.backend + "/practitioner/edit", this.practitioner)
          .then(response => {
            if (response.status == 201) {
              this.$emit("changePractitioner", this.practitioner);
            }
          });
      }
    },
    changeMessage(message, type) {
      this.$refs.alert.changeMessage(message, type);
    },
    getCurrentWorkHistory() {
      if (this.practitioner.workHistory) {
        for (var i in this.practitioner.workHistory) {
          let workHistory = this.practitioner.workHistory[i];

          if (workHistory.active) {
            return workHistory;
          }
        }
      }

      return false;
    },
    getProfilePicture() {
      return this.practitioner.photo[0].url;
    },
    reset() {
      this.$refs.alert.reset();
    }
  },
  props: ["edit", "practitioner","screenSize"]
};
</script>
