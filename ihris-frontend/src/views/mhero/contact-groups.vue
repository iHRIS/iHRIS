<template>
  <v-container>
    <v-dialog
      persistent
      v-model="statusDialog.enable"
      max-width="330"
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
      v-if="unSubscribeDialog"
      v-model="unSubscribeDialog"
      persistent
      width="850px"
    >
      <v-card>
        <v-toolbar
          color="primary darken-1 white--text"
          height="30"
          dark
        >
          UnSubscribe From Groups
          <v-spacer />
          <v-btn
            icon
            dark
            @click.native="unSubscribeDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          Select Groups To Unsubscribe
          <v-data-table
            style="cursor: pointer"
            :headers="groupHeaders"
            :items="unsubscribingGroups"
            :options.sync="tblOptions"
            :server-items-length="totalUnsubGroups"
            :footer-props="{ 'items-per-page-options': [5,10,20,50] }"
            :loading="loadingUnsubGrps"
            class="elevation-1"
            show-select
            v-model="selectedUnsubGrps"
          ></v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-flex xs2>
            <v-btn
              :disabled="!unsubGroupSelected"
              color="green"
              class="white--text"
              @click="saveUnSubscribe"
              small
            >
              <v-icon left>
                mdi-plus
              </v-icon>Unsubscribe
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
      <v-card>
        <v-card-title>
          Subscribed Members
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="subscribingPractitioners"
          item-key="id"
          class="elevation-1"
        ></v-data-table>
      </v-card>
    </v-dialog>
    <v-dialog
      v-if="subscribeDialog"
      v-model="subscribeDialog"
      persistent
      width="850px"
    >
      <v-card>
        <v-toolbar
          color="primary darken-1 white--text"
          height="30"
          dark
        >
          Subscribe To Groups
          <v-spacer />
          <v-btn
            icon
            dark
            @click.native="subscribeDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <ihrisReport report='ihris-es-report-mhero-groups'></ihrisReport>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-flex xs2>
            <v-btn
              :disabled="!groupSelected"
              color="green"
              class="white--text"
              @click="saveSubscription"
            >
              <v-icon left>
                mdi-plus
              </v-icon>Save
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
      <v-card>
        <v-card-title>
          Subscribing Members
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="subscribingPractitioners"
          item-key="id"
          class="elevation-1"
        ></v-data-table>
      </v-card>
    </v-dialog>
    <v-dialog
      v-if="addGroupDialog"
      v-model="addGroupDialog"
      persistent
      width="550px"
    >
      <v-card>
        <v-toolbar
          color="primary darken-1 white--text"
          height="30"
          dark
        >
          Adding New Group
          <v-spacer />
          <v-btn
            icon
            dark
            @click.native="addGroupDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="grouName"
            label="Name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-flex xs2>
            <v-btn
              :disabled="groupNameBlank"
              color="green"
              class="white--text"
              @click="addGroup"
            >
              <v-icon left>
                mdi-plus
              </v-icon>Save
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-img
        src="@/assets/mHero.png"
        width="100"
      ></v-img>
      <ihrisReport report='ihris-es-report-mhero-send-message'></ihrisReport>
      <v-card-actions class="secondary">
        <v-btn
          color="error"
          style="white--font"
          :disabled="!practitionerSelected"
          normal
          @click="unsubscribe"
          rounded
        >
        UnSubscribe
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          style="white--font"
          :disabled="!practitionerSelected"
          normal
          @click="subscribe"
          rounded
        >
        Subscribe
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="addGroupDialog = true" rounded><v-icon left>mdi-database-plus</v-icon> Add New Group</v-btn>
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
      subscribingPractitioners: [],
      subscribingGroups: [],
      unsubscribingGroups: [],
      selectedUnsubGrps: [],
      totalUnsubGroups: 0,
      reportData: {},
      grouName: '',
      subscribeDialog: false,
      unSubscribeDialog: false,
      loadingUnsubGrps: false,
      addGroupDialog: false,
      groupHeaders: [{
        text: "Name",
        value: "name"
      }],
      tblOptions: { 'itemsPerPage': 5 },
      prevPage: -1,
      link: [],
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
    groupNameBlank() {
      if(!this.grouName) {
        return true
      }
      return false
    },
    practitionerSelected() {
      if (this.subscribingPractitioners.length > 0) {
        return true;
      }
      return false;
    },
    groupSelected() {
      if (this.subscribingGroups.length > 0) {
        return true;
      }
      return false;
    },
    unsubGroupSelected() {
      if (this.selectedUnsubGrps.length > 0) {
        return true;
      }
      return false;
    },
    headers() {
      let headers = []
      for (let field of this.reportData.fieldsDetails) {
        headers.push({ text: field[0], value: field[1] });
      }
      return headers
    }
  },
  watch: {
    tblOptions: {
      handler() {
        this.getMembersGroups();
      },
      deep: true
    }
  },
  methods: {
    addGroup() {
      this.$store.state.progress.enabled = true
      this.$store.state.progress.title = "Adding Group..."
      let data = JSON.stringify({
        name: this.grouName
      });
      let url = "/mhero/add-group";
      let opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data,
        redirect: "manual"
      };
      fetch(url, opts).then((response) => {
        this.$store.state.progress.enabled = false
        if(response.status >= 200 && response.status <= 299) {
          this.addGroupDialog = false
          this.statusDialog.enable = true
          this.statusDialog.color = 'success'
          this.statusDialog.title = 'Success'
          this.statusDialog.description = 'Group Added successfully'
        } else {
          this.statusDialog.enable = true
          this.statusDialog.color = 'error'
          this.statusDialog.title = 'Error'
          this.statusDialog.description = 'Failed To Add Group'
        }
        eventBus.$emit("reload-report")
      }).catch(err => {
        this.$store.state.progress.enabled = false
        this.unSubscribeDialog = false
        this.statusDialog.enable = true
        this.statusDialog.color = 'error'
        this.statusDialog.title = 'Error'
        this.statusDialog.description = 'Failed To Add Group'
        console.log(err);
      });
    },
    getFullEntityIDs(entities) {
      let entityIDs = []
      entities.forEach(practitioner => {
        let entityResTypes = ["mheropractitioner", "practitioner", "patient", "person"]
        let entityID
        for(let resType of entityResTypes) {
          if(practitioner[resType]) {
            entityID = practitioner[resType]
            break
          }
        }
        entityIDs.push(entityID)
      });
      return entityIDs
    },
    subscribe() {
      this.subscribeDialog = true
      this.subscribingGroups = []
    },
    unsubscribe() {
      this.selectedUnsubGrps = []
      this.unsubscribingGroups = []
      this.loadingUnsubGrps = true
      let url = '/fhir/Group?_elements=name,id&member='
      let members = ''
      let entities = this.getFullEntityIDs(this.subscribingPractitioners)
      for(let entityID of entities) {
        if(!members) {
          members += entityID
        } else {
          members += ',' + entityID
        }
      }
      let count = this.tblOptions.itemsPerPage || 5;
      url += members + `&_count=${count}&_total=accurate`
      this.getMembersGroups(url, true)
    },
    getMembersGroups(url, restart) {
      if (restart) this.tblOptions.page = 1;
      if (!url && this.link.length > 0) {
        if (this.tblOptions.page === this.prevPage - 1) {
          url = this.link.find(link => link.relation === "previous").url;
        } else if (this.tblOptions.page === this.prevPage + 1) {
          url = this.link.find(link => link.relation === "next").url;
        }
        if(url) {
          url = url.substring(url.indexOf("/fhir/"));
        }
      }
      if(!url) {
        return
      }
      this.prevPage = this.tblOptions.page;
      fetch(url)
        .then(response => {
          response
            .json()
            .then(data => {
              this.unsubscribingGroups = []
              if(data.total > 0) {
                this.link = data.link;
                this.totalUnsubGroups = data.total
                for(let entry of data.entry) {
                  this.unsubscribingGroups.push({
                    name: entry.resource.name,
                    id: entry.resource.id
                  })
                }
              }
              this.loadingUnsubGrps = false
              this.unSubscribeDialog = true
            })
        }).catch((err) => {
          this.loadingUnsubGrps = false
          this.statusDialog.enable = true
          this.statusDialog.color = 'error'
          this.statusDialog.title = 'Error'
          this.statusDialog.description = 'An error has occured'
          console.log(err);
        })
    },
    saveUnSubscribe() {
      this.$store.state.progress.enabled = true
      this.$store.state.progress.title = "Unsubscribing Practitioners..."
      let members = this.getFullEntityIDs(this.subscribingPractitioners)
      let groups = [];
      this.selectedUnsubGrps.forEach(group => {
        groups.push(group.id);
      });
      let data = {
        members,
        groups
      };
      data = JSON.stringify(data);
      let url = "/mhero/unsubscribe-contact-groups";
      let opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data,
        redirect: "manual"
      };
      fetch(url, opts).then(() => {
        this.$store.state.progress.enabled = false
        this.unSubscribeDialog = false
        this.statusDialog.enable = true
        this.statusDialog.color = 'success'
        this.statusDialog.title = 'Success'
        this.statusDialog.description = 'Contacts UnSubscribed successfully'
        eventBus.$emit("reload-report")
      }).catch(err => {
        this.$store.state.progress.enabled = false
        this.unSubscribeDialog = false
        this.statusDialog.enable = true
        this.statusDialog.color = 'error'
        this.statusDialog.title = 'Error'
        this.statusDialog.description = 'Failed to UnSubscribe contacts'
        console.log(err);
      });
    },
    saveSubscription() {
      this.$store.state.progress.enabled = true
      this.$store.state.progress.title = "Subscribing Practitioners..."
      let members = this.getFullEntityIDs(this.subscribingPractitioners)
      let groups = [];
      this.subscribingGroups.forEach(group => {
        let id = group.group.split('/')[1]
        groups.push(id);
      });
      let data = {
        members,
        groups
      };
      data = JSON.stringify(data);
      let url = "/mhero/subscribe-contact-groups";
      let opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data,
        redirect: "manual"
      };
      fetch(url, opts).then(() => {
        this.$store.state.progress.enabled = false
        this.subscribeDialog = false
        this.statusDialog.enable = true
        this.statusDialog.color = 'success'
        this.statusDialog.title = 'Success'
        this.statusDialog.description = 'Contacts subscribed successfully'
        eventBus.$emit("reload-report")
      }).catch(err => {
        this.$store.state.progress.enabled = false
        this.subscribeDialog = false
        this.statusDialog.enable = true
        this.statusDialog.color = 'error'
        this.statusDialog.title = 'Error'
        this.statusDialog.description = 'Failed to subscribe contacts'
        console.log(err);
      });
    }
  },
  components: {
    ihrisReport: ihrisReport
  },
  created() {
    eventBus.$on("ihris-report-selections", (selections, reportData) => {
      if(reportData.indexName === "group") {
        this.subscribingGroups = selections
      } else {
        this.subscribingPractitioners = selections;
        this.reportData = reportData;
      }
    });
  }
};
</script>