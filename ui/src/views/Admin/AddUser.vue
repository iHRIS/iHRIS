<template>
  <v-container >
    <Alert ref="addUserAlert" />
    <v-card v-if="isLoaded">
      <v-card-title>Add User</v-card-title>
      <v-card-text>
      
        <DynamicForm 
          :fields="this.fields"
          name="addUser"
          v-on:cancel="cancel"
          v-on:successfulSubmit="submit"
          v-on:failedSubmit="showFailedSubmit"
          ref="addUserForm"
          key="addUser"
          submitLabel="Add"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

import Alert from "@/components/Layout/Alert.vue";
import DynamicForm from "@/components/Form/DynamicForm.vue";
export default {
  components: {
    Alert,
    DynamicForm
  },
  created () {
    NProgress.start();
    this.config = require("@/config/config.json");
    this.tempFlields=[{
              id: "username",
              max: 1,
              name: "username",
              required: true,
              type: "string"
            },
            {
              id: "password",
              max: 1,
              name: "password",
              required: true,
              type: "password",
              matching: false
            },
            {
              id: "passwordRepeat",
              max: 1,
              name: "password",
              required: true,
              type: "password",
              matching: true
            }];
    axios
      .get(this.config.backend + "/user/describe/definition/iHRISUserDetails")
      .then(structureDefinitionResponse => {
        if(structureDefinitionResponse!=null)
        {
          
          this.isLoaded=true;
          var fiedlName=structureDefinitionResponse.data.id.split(":")[1].split(".")[0];
          var _type=structureDefinitionResponse.data.type[0].code;
          var items=[];
          structureDefinitionResponse.data.type[0].profile.forEach(profile =>{
              items.push(profile);
            }
          );
          var oField={
            id:fiedlName,
            name:fiedlName,
            max: 1,
            required:true,
            type:_type,
            options:items,
            label:fiedlName
          };
          
          this.tempFlields.push(oField);
          this.fields=this.tempFlields;
        }  
        NProgress.done();
      })
      .catch(error => {
        NProgress.done();
        this.$refs.addUserAlert.changeMessage(
            "Data not saved. " + error,
            "error"
          );
      });
      
  },
  data() {
    return {
      config: null,
      fields: [],
      tempFlields:[],
      inputs: [
        "username",
        "password",
        "passwordRepeat",
        "roles"
      ],
      isLoaded:false
    };
  },
  methods: {
    cancel() {
      this.$refs.addUserForm.reset();
    },
    showFailedSubmit() {
      this.$refs.addUserAlert.changeMessage("Could not add new user", "error");
    },
    submit(data) {
      axios
        .post(this.config.backend + "/user/add", data)
        .then(response => {
          if (response.status === 201) {
            this.$refs.addUserAlert.changeMessage(
              "User added successfully.",
              "success"
            );

            this.$refs.addUserForm.reset();
          } else {
            this.$refs.addUserAlert.changeMessage(
              "There was an error saving this data.",
              "error"
            );
          }
        })
        .catch(error => {
          this.$refs.addUserAlert.changeMessage(
            "Data not saved. " + error,
            "error"
          );
        });
    }
  }
};
</script>
