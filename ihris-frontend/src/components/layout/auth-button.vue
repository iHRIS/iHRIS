<template>
  <div class="text-xs-center">
    <a v-if="data.method=='get'" :href="data.link">
      <img v-if="data.btn.image" :src="'/images/' + data.btn.image" :alt="data.btn.text" width="191" height="46"/>
    </a>
    <v-dialog v-if="data.method=='post'" v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <a v-on="on">
          <img v-if="data.btn.image" :src="'/images/' + data.btn.image" :alt="data.btn.text" width="191" height="46"/>
        </a>
      </template>
      <v-form>
        <v-card>
          <v-card-title class="headline info" dark primary-title>Login</v-card-title>
          <v-card-text>
            <v-text-field 
              v-model="username" 
              label="Email Address" 
              required 
              prepend-icon="mdi-email"
            ></v-text-field>
            <v-text-field 
              v-model="password" 
              label="Password" 
              required 
              :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_pass ? 'text' : 'password'"
              @click:append="show_pass = !show_pass"
              prepend-icon="mdi-form-textbox-password"
              ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-snackbar v-model="snackbar" :absolute="absolute" color="secondary">
              {{ message }}
              <v-btn color="warning" text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
            <v-spacer></v-spacer>
            <v-btn color="success" :loading="loggingin" :disabled="loggingin" @click="submit">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "auth-button",
  props: ["data"],
  data: function() {
    return {
      dialog: false,
      username: "",
      password: "",
      show_pass: false,
      loggingin: false,
      message: "",
      snackbar: false,
      absolute: true
    }
  },
  methods: {
    submit () {
      this.loggingin = true
      var formData = new URLSearchParams()
      formData.append("username", this.username)
      formData.append("password", this.password)
      fetch( this.data.link, { 
        method: "POST", 
        headers: {"Content-Type": "application/x-www-form-urlencoded"}, 
        body: formData
      } ).then(response => {
        response.json().then(data => {
          this.loggingin = false
          if ( response.status == 200 ) {
            this.dialog = false
            //this.absolute=false
            this.snackbar=true
            this.message="Login successful"
            this.$emit("loggedin", data.name)
          } else {
            //this.absolute=true
            this.message="Login failed"
            this.snackbar=true
          }
        })
      } ).catch(err => {
        //this.absolute=true
        this.loggingin = false
        this.snackbar=true
        this.message=err.message
      } )
    }
  }
}
</script>
