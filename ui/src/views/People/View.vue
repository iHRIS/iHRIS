<template>
  <v-container grid-list-md>
    <ProfileHeader :practitioner="practitioner" />

    <v-layout wrap>
      <v-flex
        xs6
        v-for="(element, index) in this.practitioner"
        v-bind:key="index"
      >
        <DetailsCard
          :data="element"
          :name="index"
          :ref="'subsection-' + index"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

import DetailsCard from "@/components/People/DetailsCard.vue";
import ProfileHeader from "@/components/People/ProfileHeader.vue";

export default {
  components: {
    DetailsCard,
    ProfileHeader
  },
  created() {
    this.config = require("@/config/config.json");

    axios
      .get(this.config.backend + "/practitioner/view/" + this.$route.params.id)
      .then(response => {
        if (response.status === 201) {
          let practitioner = {};

          for (var key in response.data.entry[0].resource) {
            if (key != "id" && key != "resourceType" && key != "active") {
              practitioner[key] = response.data.entry[0].resource[key];
            }
          }

          this.practitioner = practitioner;
        }
      });
  },
  data() {
    return {
      config: null,
      practitioner: {}
    };
  },
  name: "AddSections"
};
</script>
