<template>
  <div>
  <v-container>
  <Alert ref="manageUserRoleAlert" />
    <v-card>
      <v-card-title>Users</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="users" :items-per-page="10">
          <template v-slot:item.roles="{ item }" >
            <div v-if="item.roles!=null && item.roles=='Admin'">
              <v-chip  :color="adminColor" small class="ma-2" text-color="white" close @click:close="showDeleteModal(item.username)" >
                <v-icon left>mdi-account-circle-outline</v-icon>
                {{ item.roles }}</v-chip>
            </div>
            <div v-if="item.roles!=null && item.roles=='Edit'">
              <v-chip   small class="ma-2" :color="editColor" text-color="white" close @click:close="showDeleteModal(item.username)"  >
                <v-icon left>mdi-account-circle-outline</v-icon>
                {{ item.roles }}</v-chip>
            </div>
             <div v-if="item.roles!=null && item.roles=='View'">
              <v-chip   small class="ma-2" :color="editView" text-color="white" close @click:close="showDeleteModal(item.username)"  >
                <v-icon left>mdi-account-circle-outline</v-icon>
              {{ item.roles }}</v-chip>
            </div>
            <template v-if="item.action!=null" >
              
              <v-btn rounded color="green" text-color="white" dark>+</v-btn>
            </template>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
  <v-dialog
      v-model="openRemoveRoleDialog"
      max-width="350"
    >
      <v-card>
        <v-card-title class="headline">Delete the user's role?</v-card-title>

        <v-card-text>
          This action will delete the user role. Click 'Yes' to delete and 'Cancel' to cancel the action.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="secondary"
            text
            @click="cancelRemoveRole"
          >
            Cancel
          </v-btn>

          <v-btn
            class="primary"
            text
            @click="removeRole"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import axios from "axios";
import Alert from "@/components/Layout/Alert.vue";

// this is needed for date parsing but is picked up by the linter because it's technically not used
// eslint-disable-next-line
import datejs from "datejs";

export default {
  components: {
    Alert
  },
  created() {
    this.config = require("@/config/config.json");

    axios.get(this.config.backend + "/user/list").then(response => {
      if (response.data.entry) {
        response.data.entry.forEach(person => {
          let userDetail={};
          let extensions = person.resource.extension;
          userDetail.id=person.resource.id;
          // find the username value
          for (var i in extensions) {
            if (extensions[i].url.includes("iHRISUserDetails")) {
              let userExtensions = extensions[i].extension;
              let user = {};
              for (var j in userExtensions) {
                if (userExtensions[j].url == "username") {
                  user.username = userExtensions[j].valueString;
                  userDetail.username = userExtensions[j].valueString;
                }

                if (userExtensions[j].url == "created") {
                  let created = Date.parse(userExtensions[j].valueString);
                  user.created = created.toString("yyyy-MM-dd HH:mm:ss");
                  userDetail.created = created.toString("yyyy-MM-dd HH:mm:ss");
                }
                if (userExtensions[j].url == "roles") {
                  let roles = userExtensions[j].valueCoding.code;
                  user.roles=roles;
                  userDetail.roles=roles;
                   user.action=null;
                }
                else
                {
                  user.action="edit";
                }
               //userDetail=user;
                if (userExtensions[j].url == "password") {
                  userDetail.password = userExtensions[j].valueString;
                }
                if (userExtensions[j].url == "salt") {
                  userDetail.salt = userExtensions[j].valueString;
                }
              }//end for 

              if (user) {
                this.users.push(user);
                this.userDetails.push(userDetail);
              }
            }
          }
        });
      }
    });
  },
  data() {
    return {
      config: null,
      adminColor:"blue",
      editColor:"orange",
      editView:"green",
      openRemoveRoleDialog:false,
      editedUserName:null,
      headers: [
        {
          text: "Username",
          align: "left",
          value: "username",
        },
        {
          text: "Created",
          value: "created"
        },
        {
          text: "Roles",
          sortable: false,
          value: "roles"
        }
      ],
      users: [],
      userDetails:[]
    };
  },
  methods:{
    showDeleteModal(username){
      this.editedUserName=username;
      this.openRemoveRoleDialog=true;
    },
    removeRole()
    {
      this.openRemoveRoleDialog=false;
      if(this.editedUserName!=null)
      {
        //console.log("****************** "+this.editedUserName+" *************************");
        var oUserToProcess=this.getUserDetailsByUserName(this.editedUserName);
        var bundle=this.getCorrespondingFhirResourceWithoutRole(oUserToProcess);
        axios
        .post(this.config.backend + "/user/updaterole", bundle)
        .then(response => {
          if (response.status === 201) {
            this.$refs.manageUserRoleAlert.changeMessage(
              "User role removed successfully.",
              "success"
            );
          } else {
            this.$refs.manageUserRoleAlert.changeMessage(
              "There was an error updating this data.",
              "error"
            );
          }
          this.editedUserName=null;
          //Now reload again the list
          this.users=[];
          this.userDetails=[];
          axios.get(this.config.backend + "/user/list").then(response => {
            if (response.data.entry) {
              response.data.entry.forEach(person => {
                let userDetail={};
                let extensions = person.resource.extension;
                userDetail.id=person.resource.id;
                // find the username value
                for (var i in extensions) {
                  if (extensions[i].url.includes("iHRISUserDetails")) {
                    let userExtensions = extensions[i].extension;
                    let user = {};
                    for (var j in userExtensions) {
                      if (userExtensions[j].url == "username") {
                        user.username = userExtensions[j].valueString;
                        userDetail.username = userExtensions[j].valueString;
                      }

                      if (userExtensions[j].url == "created") {
                        let created = Date.parse(userExtensions[j].valueString);
                        user.created = created.toString("yyyy-MM-dd HH:mm:ss");
                        userDetail.created = created.toString("yyyy-MM-dd HH:mm:ss");
                      }
                      if (userExtensions[j].url == "roles") {
                        let roles = userExtensions[j].valueCoding.code;
                        user.roles=roles;
                        userDetail.roles=roles;
                        user.action=null;
                      }
                      else
                      {
                        user.action="edit";
                      }
                    //userDetail=user;
                      if (userExtensions[j].url == "password") {
                        userDetail.password = userExtensions[j].valueString;
                      }
                      if (userExtensions[j].url == "salt") {
                        userDetail.salt = userExtensions[j].valueString;
                      }
                    }//end for 

                    if (user) {
                      this.users.push(user);
                      this.userDetails.push(userDetail);
                    }
                  }
                }
              });
            }
        });//end axios user/list
        })
        .catch(error => {
          this.$refs.manageUserRoleAlert.changeMessage(
            "Data not saved. " + error,
            "error"
          );
        });

      }
      
    },
    cancelRemoveRole(){
      this.openRemoveRoleDialog=false;
      this.editedUserName=null;
      //console.log("****************** "+this.editedUserName+" *************************");
    },
    getUserDetailsByUserName(username){
      var selectedUser=null;
      this.userDetails.forEach(oUser=>{
        if(oUser.username==username)
        {
          selectedUser=oUser;
        }
      })
      //then transform it the the corresponding Person Ressource format
      return selectedUser;
    },
    getCorrespondingFhirResourceWithoutRole(user)
    {
      let bundle = {
      resourceType: "Person",
      id: user.id,
      extension: [
        {
          url: "/StructureDefinition/iHRISUserDetails",
          extension: []
        }
      ]
      };
      //add extension value
      bundle.extension[0].extension.push(
        {
            url: "username",
            valueString: user.username
          }
      );
      bundle.extension[0].extension.push(
        {
            url: "created",
            valueString: user.created
          }
      );
      bundle.extension[0].extension.push(
        {
            url: "password",
            valueString: user.password
          }
      );
      bundle.extension[0].extension.push(
        {
            url: "salt",
            valueString: user.salt
          }
      );
      return bundle;
    }
    
  }
};
</script>
