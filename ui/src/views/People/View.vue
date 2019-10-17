<template>
  <v-container grid-list-md>
    <v-layout row wrap class="pb-5">
      <v-flex xs2 v-if="profilePicture">
        <v-img :src="getProfilePicture(profilePicture)" contain max-height="120" max-width="120" />
      </v-flex>
      <v-flex xs6 class="display-2 text-xs-left">
        {{ name }}
      </v-flex>
    </v-layout>
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

export default {
  components: {
    DetailsCard
  },
  created() {
    axios.get("/practitioner/view/" + this.$route.params.id).then(response => {
      if (response.status === 201) {
        let practitioner = {};

        for (var key in response.data.entry[0].resource) {
          if (key != "id" && key != "resourceType" && key != "active") {
            practitioner[key] = response.data.entry[0].resource[key];
          }
        }

        this.practitioner = practitioner;
        this.updateName();
      }
    });
  },
  data() {
    return {
      name: null,
      practitioner: {},
      profilePicture: null
    };
  },
  methods: {
    getProfilePicture(path) {
      return path;
    },
    updateName() {
      let name = "";
      let practitioner = this.practitioner;

      if (practitioner.name[0]) {
        if (practitioner.name[0].prefix[0]) {
          name += practitioner.name[0].prefix[0] + " ";
        }

        if (practitioner.name[0].given[0]) {
          name += practitioner.name[0].given[0] + " ";
        }

        if (practitioner.name[0].family) {
          name += practitioner.name[0].family + " ";
        }

        if (practitioner.name[0].suffix[0]) {
          name += practitioner.name[0].suffix[0] + " ";
        }
      }

      if (practitioner.photo && practitioner.photo[0].url) {
        this.profilePicture = practitioner.photo[0].url;
      }

      this.name = name.trim();
    }
  },
  name: "AddSections"
};
</script>
