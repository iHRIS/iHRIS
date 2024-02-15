<template>
  <div
    v-if="!intro.closed && this.intro.fullName"
    style="padding: 0"
    :class="[hasScrolled || this.isQuestionnaire ? 'show' : 'hide']"
  >
    <v-snackbar
      color="white"
      v-model="snackbar"
      :bottom="bottom"
      :right="right"
      :timeout="timeout"
       width="320"
    >
      <div>
        <v-card height="400" elevation="0" color="white" width="320">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title
            style="padding-top: 4px; padding-bottom: 4px"
            class="justify-end"
          >
            <v-btn
              color="deep-purple lighten-2"
              icon
              @click="
                () => {
                  this.intro.closed = true;
                }
              "
            >
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-title
            style="padding-top: 4px; padding-bottom: 4px"
            class="justify-center"
          >
            <v-avatar size="120">
              <img :alt="intro.fullName" :src="intro.photoURL?intro.photoURL:'/images/Blank-Avatar.jpg'" />
            </v-avatar>
          </v-card-title>
          <v-card-title class="justify-center py-0"
            ><span class="black--text">{{ intro.fullName }}</span></v-card-title
          >
          <v-card-text class="black--text">
            <span
              >{{ $t(`App.hardcoded-texts.Job Title`)}}: <strong>{{ intro.jobTitle }}</strong></span
            ><br />
            <span
              >{{ $t(`App.hardcoded-texts.Employee Number`)}}: <strong>{{ intro.employeeID }}</strong></span
            ><br />
            <span
            >{{ $t(`App.hardcoded-texts.Email`)}}: <strong>{{ intro.email }}</strong></span
            ><br />
            <span
            >{{ $t(`App.hardcoded-texts.Phone`)}} : <strong>{{ intro.phone }}</strong></span
            ><br />
            <span
              >{{ $t(`App.hardcoded-texts.Gender`)}} : <strong>{{ intro.gender }}</strong></span
            ><br />
            <span
              >{{ $t(`App.hardcoded-texts.Birth Date`)}} : <strong>{{intro.birthDate}}</strong></span
            ><br />
            <span>
              {{ $t(`App.hardcoded-texts.Age`)}} : <strong>{{ Math.floor((new Date() - new Date(intro.birthDate))/(1000*3600*24*365)) }}</strong></span
            ><br />

          </v-card-text>
        </v-card>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "ihris-practitioner-intro",
  props: ["slotProps", "isQuestionnaire"],
  data: function () {
    return {
      intro: {
        fullName: "",
        jobTitle: "",
        photoURL: "",
        birthDate: "",
        gender: "",
        employeeID: "",
        closed: false,
        emil: "",
        phone: "",
      },
      hasScrolled: false,
      snackbar: true,
      timeout: -1,
      bottom: true,
      right: true,
    };
  },
  components: {},
  mounted() {
    if (!this.isQuestionnaire) {
      window.addEventListener("scroll", this.handleScroll);
    } else {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
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
      if (
        this.slotProps &&
        this.slotProps.source &&
        this.slotProps.source.data
      ) {
        let practitioner = this.slotProps.source.data;
        if(!practitioner || practitioner.resourceType !== 'Practitioner') {
          return
        }
        let title = ""
        if(practitioner && practitioner.name && practitioner.name[0].prefix && practitioner.name[0].prefix && practitioner.name[0]?.prefix.length){
          title = practitioner.name[0].prefix[0]
        }
        this.intro.fullName = `${title} ${practitioner?.name[0]?.family} ${practitioner?.name[0]?.given[0]}`;
        this.intro.email = practitioner?.telecom?.find(
          (x) => x.system === "email"
        )?.value;
        this.intro.phone = practitioner?.telecom?.find(
          (x) => x.system === "phone"
        )?.value;
        this.intro.jobTitle = this.slotProps.position;
        this.intro.gender = practitioner?.gender;
        this.intro.birthDate = practitioner?.birthDate;

        this.intro.employeeID = practitioner?.identifier
          ? practitioner?.identifier[0]?.value
          : "";

        let photo = "";
        if (practitioner.photo) photo = practitioner?.photo[0];

        if (photo.data && photo.contentType) {
          let dataURL = "data:" + photo.contentType + ";base64," + photo.data;
          fetch(dataURL)
            .then((res) => res.blob())
            .then((blob) => {
              this.intro.photoURL = URL.createObjectURL(blob);
              //URL.revokeObjectURL(this.photoURL)
            })
            .catch((e) => {
              console.log("Failed to get data from base64.", e);
            });
        }
      }
    },
    handleScroll() {
      this.hasScrolled = window.top.scrollY >= 100;
    },
  },
};
</script>

<style scoped>
.hide {
  opacity: 0;
}
.show {
  opacity: 1;
}
</style>
