<template>
  <v-container >
    <v-alert v-model="alert" dismissable type="error">
        Error :{{ error }}
    </v-alert>
    
  </v-container>
</template>
<script>
import {serverBus} from "../main.js";
export default{
    props:{
        error:{
            type: String,
            default: "The user does not have the necessary privileges to access the requested page "
        } 
    },
    created()
    {
        serverBus.$on("errorGenerated",(error)=>{
            this.error=error;
            });

        
    },
    data() {
    return {
         alert: true,
        }
    }
}
</script>