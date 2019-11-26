<template>
  <v-container grid-list-md>
    <ProfileHeader :practitioner="practitioner" />

    <v-layout wrap>
      <v-flex xs6 v-for="(element, index) in display" v-bind:key="index">
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
import DetailsCard from "@/components/People/DetailsCard.vue";
import ProfileHeader from "@/components/People/ProfileHeader.vue";
import SectionsToDisplay from "@/mixins/SectionsToDisplay.js";

export default {
  components: {
    DetailsCard,
    ProfileHeader
  },
  data() {
    return {
      config: null,
      practitioner: {}
    };
  },
  mixins: [SectionsToDisplay],
  name: "AddSections"
};
</script>
