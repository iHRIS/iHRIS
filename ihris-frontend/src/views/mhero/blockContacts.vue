<template>
  <v-container>
    <v-dialog
      persistent
      v-model="statusDialog.enable"
      max-width="400"
    >
      <v-card>
        <v-toolbar
          :color="statusDialog.color"
        >
          <v-toolbar-title color="white">
            <v-icon v-text="statusDialog.icon" dark></v-icon>
            {{statusDialog.title}}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click.native="statusDialog.enable = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <center>
        <v-card-text>
          <b>{{statusDialog.description}}</b>
        </v-card-text>
        </center>
        <v-card-actions>
          <v-spacer />
          <v-btn
            dark
            class="white--font"
            color="primary"
            @click="statusDialog.enable = false"
          >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      persistent
      v-model="confirmBlockingDialog"
      max-width="600"
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          <v-toolbar-title>
            <v-icon>mdi-alert-circle-outline</v-icon>
            Confirmation
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click.native="confirmBlockingDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <b>Are you sure that you want to block {{practitioners.length}} practitioner from receiving messages?</b>
        </v-card-text>
        <v-card-actions>
          <v-btn
            dark
            class="white--font"
            color="error"
            @click="confirmBlockingDialog = false"
          >
          No</v-btn>
          <v-spacer />
          <v-btn
            dark
            class="white--font"
            color="green"
            @click="block"
          >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-img
        src="@/assets/mHero.png"
        width="100"
      ></v-img>
      <ihrisReport report='ihris-es-report-all-practitioners'></ihrisReport>
      <v-card-actions class="secondary">
        <v-spacer></v-spacer>
        <v-btn
          style="white--font"
          :disabled="!canBlock"
          normal
          @click="confirmBlockingDialog = true"
          rounded
        >
          <v-icon left>mdi-form-select</v-icon>
          Block ({{practitioners.length}}) Selected
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import ihrisReport from "@/views/es-report";
import { eventBus } from "@/main";
export default {
  data() {
    return {
      confirmBlockingDialog: false,
      practitioners: [],
      statusDialog: {
        width: '500px',
        enable: false,
        color: 'error',
        icon: 'mdi-alert-circle-outline',
        title: '',
        description: ''
      }
    };
  },
  computed: {
    canBlock() {
      if (this.practitioners.length > 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    block() {
      let data = []
      for(let practitioner of this.practitioners) {
        data.push({
          entitytype: 'Practitioner',
          globalid: practitioner.id
        })
      }
      this.confirmBlockingDialog = false
      let url = "/mhero/optout";
      let opts = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        redirect: "manual"
      };
      this.$store.state.progress.enabled = true
      this.$store.state.progress.title = "Blocking Practitioners..."
      fetch(url, opts).then(response => {
        this.$store.state.progress.enabled = false
        this.statusDialog.enable = true
        console.log(response.status);
        if(response.status >= 200 && response.status <= 299) {
          this.statusDialog.color = 'success'
          this.statusDialog.title = 'Done'
          this.statusDialog.description = 'Practitioner(s) blocked successfully'
        } else {
          this.$store.state.progress.enabled = false
          this.statusDialog.color = 'error'
          this.statusDialog.title = 'Error'
          this.statusDialog.description = 'An error occured while blocking practitioners'
        }
      }).catch(err => {
        console.log(err)
        this.$store.state.progress.enabled = false
        this.statusDialog.enable = true
        this.statusDialog.color = 'error'
        this.statusDialog.title = 'Warning'
        this.statusDialog.description = 'An error occured while blocking practitioners'
      });
    }
  },
  components: {
    ihrisReport: ihrisReport
  },
  created() {
    eventBus.$on("ihris-report-selections", (selections) => {
      this.practitioners = selections;
    });
  }
};
</script>
