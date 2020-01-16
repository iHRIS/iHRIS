<template>
  <div>
  <v-container>
    <Alert ref="manageUserRoleAlert" />
    <v-card >
      <v-card-title>Users</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="users" :items-per-page="10">
          <template v-slot:item.roles="{ item }" >
            <div v-if="item.roles!=null && item.roles=='Admin'">
              <v-chip  label :color="adminColor" small class="ma-0" text-color="white" close @click:close="showDeleteModal(item.username)" >
                <v-icon left>mdi-account-circle-outline</v-icon>
                {{ item.roles }}</v-chip>
            </div>
            <div v-if="item.roles!=null && item.roles=='Edit'">
              <v-chip  label small class="ma-0" :color="editColor" text-color="white" close @click:close="showDeleteModal(item.username)"  >
                <v-icon left>mdi-account-circle-outline</v-icon>
                {{ item.roles }}</v-chip>
            </div>
             <div v-if="item.roles!=null && item.roles=='View'">
              <v-chip label  small class="ma-0" :color="editView" text-color="white" close @click:close="showDeleteModal(item.username)"  >
                <v-icon left>mdi-account-circle-outline</v-icon>
              {{ item.roles }}</v-chip>
            </div>
            <template v-if="item.action!=null" >
              
              <v-btn  small  color="green" text-color="white" dark @click="showAddRoleModal(item.username)">+</v-btn>
            </template>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
  <v-dialog
      v-model="openRemoveRoleDialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline">Remove the user's role from :{{editedUserName}}</v-card-title>

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
  <v-dialog
      v-model="openAddRoleDialog"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">Add a user's role to : {{editedUserName}}</v-card-title>
         <v-container>
          <v-select
              :items="rolesProfiles"
              label="Roles"
              v-model="selectedRole"
              value=""
              @change="diplayValue"
            ></v-select>
          <v-card-text>
           
          This action will add the selected user role. Click 'Yes' to add and 'Cancel' to cancel the action.
          </v-card-text>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="secondary"
            text
            @click="cancelAddRole"
          >
            Cancel
          </v-btn>

          <v-btn
            class="primary"
            text
            @click="addRole"
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
import Code from "@/components/Form/Code.vue";

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
      }//end if
      //now get the roles profiles
      axios.get(this.config.backend + "/user/describe/definition/iHRISUserDetails")
      .then(structureDefinitionResponse => {
        if(structureDefinitionResponse!=null)
        {
          var items=[];
          structureDefinitionResponse.data.type[0].profile.forEach(profile =>{
              items.push(profile);
            }
          );
          this.rolesProfiles=items;
        }
      });//end axios.get 
    });
    //End of axios.get /user/list

  },
  data() {
    return {
      config: null,
      adminColor:"blue",
      editColor:"orange",
      editView:"green",
      openRemoveRoleDialog:false,
      openAddRoleDialog:false,
      editedUserName:null,
      rolesProfiles: [],
      selectedRole:null,
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
      userDetails:[],
      isLoadedDataTable:false
    };
  },
  methods:{
    showDeleteModal(username){
      this.editedUserName=username;
      this.openRemoveRoleDialog=true;
    },
    showAddRoleModal(username){
      this.editedUserName=username;
      this.openAddRoleDialog=true;
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
    addRole()
    {
      this.openAddRoleDialog=false;
      if(this.editedUserName!=null && this.selectedRole!=null)
      {
        var oUserToProcess=this.getUserDetailsByUserName(this.editedUserName);
        var bundle=this.getCorrespondingFhirResourceWithNewRole(oUserToProcess,this.selectedRole);
        axios
        .post(this.config.backend + "/user/updaterole", bundle)
        .then(response => {
          if (response.status === 201) {
            this.$refs.manageUserRoleAlert.changeMessage(
              "User role added successfully.",
              "success"
            );
          } else {
            this.$refs.manageUserRoleAlert.changeMessage(
              "There was an error updating this data.",
              "error"
            );
          }
          this.editedUserName=null;
          this.selectedRole=null;
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
    cancelAddRole(){
      this.openAddRoleDialog=false;
      this.editedUserName=null;
      this.selectedRole=null;
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
    },
    getCorrespondingFhirResourceWithNewRole(user,_selectedRole)
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
      bundle.extension[0].extension.push(
        {
            url: "roles",
            valueCoding: {
              system: "http://terminology.hl7.org/CodeSystem/v2-0615",
              code:_selectedRole
            }
          }
      );
      return bundle;
    },
    diplayValue()
    {
      //console.log("************ "+this.selectedRole+" *******");
    }
  }
};
</script>
