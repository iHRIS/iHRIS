<template>
  <v-container grid-list-md>
    <v-alert v-model="alert" dismissable type="error">
        {{ error }}
    </v-alert>
    <ProfileHeader :practitioner="practitioner" />

    <v-layout wrap v-if="allowedToAccess">
      <v-col md="6">
        <v-flex v-for="(element, index, counter) in display" v-bind:key="index">
          <DetailsCard
            :data="element"
            :name="index"
            :ref="'subsection-' + index"
            v-if="counter % 2 == 0"
          />
        </v-flex>
      </v-col>
      <v-col md="6">
        <v-flex v-for="(element, index, counter) in display" v-bind:key="index">
          <DetailsCard
            :data="element"
            :name="index"
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
  data() {
    return {
      alert: false,
      error: "",
      allowedToAccess:true
    }
  },
  created(){
    if(!store.state.allowToAccessTheNextPage)
    {
      this.error = "The user does not have the necessary privileges to access this page ";
      this.alert = true;
      this.allowedToAccess=false;
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
