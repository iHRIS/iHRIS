<template>
  <div class="home" >
        <v-container class="lighten-1" fill-height  >
          <v-card-text v-if="!$store.state.user.loggedin">
            <v-row class="ma-0 pa-0 pt-12" >
              <v-col :md="$store.state.user.loggedin?12: 6" align="right"  class="pt-12 pr-0" cols="12">
                <v-card class="pa-4 pt-12"  max-width="600" min-height="600">
                  <v-card-title class="justify-center">
                    <v-img
                      :src="'/images/iHRIS5LogoBig.png'"
                      align="center"
                      contain
                      justify="center"
                      max-height="132"
                      max-width="150"
                    />
                  </v-card-title>
                  <v-card-text align="center" justify="center">
                    <br/>
                    <h1 class="mt-8 text--primary font-weight-bold text-lg-center">
                      {{$t(`App.home.well-come`)}}<br/>
                    </h1>
                    <br/>
                    <p  class="pt-8 subtitle-1 text--primary font-weight-medium text-lg-justify">
                      {{$t(`App.home.description`)}}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col  class="pt-12 pl-0  " cols="12" md="6">
                <v-card
                  class="primary  darken-1 white--text pa-10"
                  dark
                  max-width="600"
                  min-height="600"
                  raised
                >
                  <v-card-title class="justify-center mb-4">
                    <div class="white--text display-1"><v-icon size="48" class="mr-2">mdi-account-circle</v-icon>{{$t(`App.home.signin`)}}<br/></div>
                  </v-card-title>
                  <v-card-text class="pt-8">
                    <v-form>
                      <h4 class="white--text">{{$t(`App.home.username`)}}</h4>
                      <v-text-field
                        v-model="username"
                        background-color="#0d3552"
                        class="pt-1 white--text"
                        :placeholder="$t(`App.home.username`)"
                        required
                        solo
                      />
                      <h4 class="white--text pt-2">{{$t(`App.home.password`)}}</h4>
                      <v-text-field
                        v-model="password"
                        :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show_pass ? 'text' : 'password'"
                        background-color="#0d3552"
                        class="pt-1 white--text"
                        placeholder="****************"
                        required
                        solo
                        @click:append="show_pass = !show_pass"
                        @keyup.native.enter="submit"
                      />
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-snackbar
                      v-model="snackbar"
                      color="secondary"
                      class="mb-8"
                    >
                      {{ message }}
                      <v-btn :disabled="loggingin" :loading="loggingin" color="warning" text @click="snackbar = false"
                      >Close
                      </v-btn
                      >
                    </v-snackbar>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="loggingin" :loading="loggingin" light @click="submit">{{$t(`App.home.signin`)}}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-container>
  </div>
</template>
<style scoped>
</style>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data(){
    return {
      username: "",
      password: "",
      show_pass: false,
      loggingin: false,
      message: "",
      snackbar: false,
      snackbarRegister: false,
      absolute: true,
      auth: {},
    }
  },
  methods:{
    submit() {
      this.loggingin = true
      let formData = new URLSearchParams()
      formData.append("username", this.username)
      formData.append("password", this.password)
      if (this.username.length === 0 || this.password.length === 0) {
        this.message = this.$t("App.home.required")
        this.snackbar = true
        this.loggingin = false
      } else {
        fetch("/auth/login", {
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: formData
        }).then(response => {
          this.loggingin = false
          if (response.ok) {
            response.json().then(data => {
              this.snackbar = true
              this.message = "Login successful"
              this.$emit("loggedin", data.user)
              // this.$router.push( {path: "/" } )
              location.reload()
            }).catch(err => {
              this.loggingin = false
              this.snackbar = true
              this.message = err.message
            })
          } else {
            this.message = this.$t("App.home.incorrect")
            this.snackbar = true
            this.loggingin = false
          }
        }).catch(err => {
          console.log(err)
          //this.absolute=true
          this.loggingin = false
          this.snackbar = true
          this.message = "Login failed: " + err.message
        })
      }
    },
  }
};
</script>
