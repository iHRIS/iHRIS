<template>
  <v-container grid-list-md>
    <v-alert v-model="alert" dismissable type="error">
        {{ error }}
    </v-alert>
    <ProfileHeader 
    :practitioner="practitioner"
    :screenSize="screenSize" 
    />

    <v-layout wrap >
      <v-col md="6">
        <v-flex v-for="(element, index, counter) in display" v-bind:key="index">
          <DetailsCard
            :data="element"
            :name="index"
            :ref="'subsection-' + index"
            :screenSize="screenSize"
            v-if="counter % 2 == 0"
          />
        </v-flex>
      </v-col>
      <v-col md="6">
        <v-flex v-for="(element, index, counter) in display" v-bind:key="index">
          <DetailsCard
            :data="element"
            :name="index"
            :screenSize="screenSize"
            :ref="'subsection-' + index"
            v-if="counter % 2 == 1"
          />
        </v-flex>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import DetailsCard from "@/components/People/DetailsCard.vue";
import ProfileHeader from "@/components/People/ProfileHeader.vue";
import SectionsToDisplay from "@/mixins/SectionsToDisplay.js";
import { store } from "@/store.js";

export default {
  created() {
    this.screenSize = this.$vuetify.breakpoint.name;
  },
  data(){
    return{
      screenSize: "",
      alert: false,
      error: ""
    }
  },
  components: {
    DetailsCard,
    ProfileHeader
  },
  mixins: [SectionsToDisplay],
  name: "AddSections"
};
</script>
