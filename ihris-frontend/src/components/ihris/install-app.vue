<template>
  <center>
    <v-card width="500">
      <v-card-text>
        <v-card-title primary-title>
          Install New iHRIS App
        </v-card-title>
        <v-card-text>
          <v-file-input
            v-model="app"
            show-size
            label="Select"
            accept=".zip"
            ref="file"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="5">
              <v-progress-linear height="25" v-model="percentUpload" v-if="displayProgress">
                <strong>{{ Math.ceil(percentUpload) }}%</strong>
              </v-progress-linear>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn small color="primary" :disabled="!app" @click="doUpload">
                <v-icon left>mdi-file-upload</v-icon>
                Install
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </center>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      app: "",
      percentUpload: 0,
      displayProgress: false
    }
  },
  methods: {
    doUpload() {
      const formData = new FormData();
      formData.append('app',this.app);
      axios.request({
        method: "post", 
        url: "/apps/install", 
        data: formData, 
        onUploadProgress: (p) => {
          this.displayProgress = true
          this.percentUpload = p.loaded*100/p.total;
        }
      }).then(() => {
        this.app = ""
        this.$store.state.message.active = true
        this.$store.state.message.type = "success"
        this.$store.state.message.text = "App Installed Successfully"
      }).catch((err) => {
        if(err.response && err.response.data) {
          this.$store.state.message.text = err.response.data
        } else {
          this.$store.state.message.text = "OOps, something went wrong, App Failed to Install"
        }
        this.$store.state.message.active = true
        this.$store.state.message.type = "red accent-2"
      })
    }
  }
}
</script>
