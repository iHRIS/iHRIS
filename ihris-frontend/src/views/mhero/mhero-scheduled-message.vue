<template>
  <v-container>
    <v-dialog
      persistent
      v-model="statusDialog.enable"
      max-width="600"
    >
      <v-card>
        <v-toolbar
          :color="statusDialog.color"
          dark
        >
          <v-toolbar-title>
            <v-icon v-text="statusDialog.icon"></v-icon>
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
        <v-card-text>
          <b>{{statusDialog.description}}</b>
        </v-card-text>
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
      v-model="confirmCancelDialog"
      max-width="600"
    >
      <v-card>
        <v-toolbar
          color="error"
          dark
        >
          <v-toolbar-title>
            <v-icon>mdi-alert-circle-outline</v-icon>
            Confirm
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
        <v-card-text>
          <b>Are you sure you want to cancel selected scheduled messages/workflows?</b>
        </v-card-text>
        <v-card-actions>
          <v-btn
            dark
            class="white--font"
            color="error"
            @click="confirmCancelDialog = false"
          >
          No</v-btn>
          <v-spacer />
          <v-btn
            dark
            class="white--font"
            color="green"
            @click="cancelSchedule"
          >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-img
        src="@/assets/mHero.png"
        width="100"
      ></v-img>
      <ihrisReport report='scheduled-messages'></ihrisReport>
      <v-card-actions class="secondary">
        <v-spacer></v-spacer>
        <v-btn

          style="white--font"
          :disabled="!canCancel"
          normal
          @click="confirmCancelDialog = true"
          rounded
        >Cancel Schedule</v-btn>
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
      schedules: [],
      reportData: {},
      confirmCancelDialog: false,
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
    canCancel() {
      if (this.schedules.length > 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    openConfirmDialog() {
      this.statusDialog.enable = true
      this.statusDialog.description = 'Are you sure you want to cancel selected scheduled messages/workflows?'
      this.statusDialog.title = 'Confirm'
    },
    cancelSchedule() {
      this.confirmCancelDialog = false
      let data = {
        schedules: []
      }
      for(let schedule of this.schedules) {
        data.schedules.push(schedule.scheduledmessages)
      }
      let url = "/mhero/cancel-message-schedule";
      let opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        redirect: "manual"
      };
      fetch(url, opts).then((response) => {
        this.statusDialog.enable = true
        if(response.status >= 200 && response.status <= 299) {
          this.statusDialog.color = 'success'
          this.statusDialog.title = 'Success'
          this.statusDialog.description = 'Schedule Cancelled Successfully'
        } else {
          this.statusDialog.color = 'error'
          this.statusDialog.title = 'Error'
          this.statusDialog.description = 'Failed to Cancel Schedule'
        }
      }).catch(err => {
        this.statusDialog.enable = true
        this.statusDialog.color = 'error'
        this.statusDialog.title = 'Error'
        this.statusDialog.description = 'Failed to Cancel Schedule'
        console.log(err);
      });
    }
  },
  components: {
    ihrisReport: ihrisReport
  },
  created() {
    eventBus.$on("ihris-report-selections", (selections, reportData) => {
      this.schedules = selections;
      this.reportData = reportData;
    });
  }
};
</script>