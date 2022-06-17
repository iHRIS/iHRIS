<template>
  <div class="home" >
    <v-dialog v-model="dialog" width="500">
      <v-form>
        <v-card>
          <v-card-title class="white--text justify-center primary darken-1">
            <v-icon color="white" left>
              mdi-account-plus
            </v-icon>
            {{$t('App.home.register')}}
          </v-card-title>
          <v-card-text class="px-12 pt-6">
            <v-text-field
                outlined
                dense
                v-model="email"
                type="email"
                :label="$t('App.home.emailAddress')"
                required
                prepend-icon="mdi-email"
            ></v-text-field>
            <v-text-field
                outlined
                dense
                v-model="medicalLicenseNumber"
                :label="$t(`App.home.medicalLicenseNumber`)"
                required
                prepend-icon="mdi-account-key"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-snackbar v-model="snackbarRegister" :absolute="absolute" color="secondary">
              {{ message }}
              <v-btn color="warning" text @click="snackbarRegister = false">Close</v-btn>
            </v-snackbar>
            <v-spacer></v-spacer>
            <v-btn class="mr-8 mb-6 primary" :loading="registering" :disabled="registering" @click="register">
              <v-icon left>
                mdi-account-plus
              </v-icon>
              Sign Up
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="resetPasswordDialog" width="500">
      <v-form>
        <v-card>
          <v-card-title class="white--text justify-center primary darken-1">
            <v-icon color="white" left>
              mdi-lock-reset
            </v-icon>
            {{$t('App.home.resetPassword')}}
          </v-card-title>
          <v-card-text class="px-12 pt-12">
            <v-text-field
                outlined
                dense
                v-model="resetPasswordEmail"
                type="email"
                :label="$t(`App.home.emailAddress`)"
                required
                prepend-icon="mdi-email"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-snackbar v-model="snackbarRegister" :absolute="absolute" color="secondary">
              {{ message }}
              <v-btn color="warning" text @click="snackbarRegister = false">Close</v-btn>
            </v-snackbar>
            <v-spacer></v-spacer>
            <v-btn class="mr-8 mb-6 primary" :loading="registering" :disabled="registering" @click="resetPassword">
              <v-icon left>
                mdi-lock-reset
              </v-icon>
              {{$t('App.home.resetPassword')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
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
                  <v-card-actions class="mt-12">
                    <v-btn
                        @click="()=>{this.resetPasswordDialog=true}"
                        class="mx-2 text--white"
                        outlined
                        color="primary"
                        style="text-transform: none" text
                    >
                      {{$t(`App.home.forgotPassword`)}}</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn @click="()=>{this.dialog=true}" class="mx-2 text--white"
                           outlined
                           color="primary" style="text-transform: none" text >
                      {{$t(`App.home.noAccount`)}}
                    </v-btn>
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
      dialog: false,
      email: "",
      medicalLicenseNumber:"",
      registering: false,
      resetPasswordDialog: false,
      resetPasswordEmail: "",
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
    resetPassword(){
      this.loggingin = true;
      let formData = new URLSearchParams();
      formData.append("email", this.resetPasswordEmail);
      //eslint-disable-next-line
      let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.resetPasswordEmail === "") {
        this.message = "Email Field is required!"
        this.snackbarRegister = true
        this.signingin = false
      }
      else if (!this.resetPasswordEmail.match(mailFormat)) {
        this.message = "Please enter a valid email"
        this.snackbarRegister = true
        this.signingin = false
      }
      else {
        fetch("/auth/password-reset-request", {
          method: "POST",
          body: formData,
        }).then((response) => response.json())
            .then((data) => {
              this.loggingin = false;
              if (data.ok) {
                console.log(data)
                this.message = data.message;
                this.snackbar = true;
                setTimeout(() => {
                  this.resetPasswordDialog = false
                  this.$router.push("/");
                }, 1000)
              } else {
                this.message = data.message;
                this.snackbar = true;
              }
            }).catch((error) => {
          this.loggingin = false;
          this.message = error;
          this.snackbar = true;
        });
      }

    },
    register() {
      this.signingin = true
      let formData = new URLSearchParams()
      formData.append("username", this.email)
      formData.append("medicalLicenseNumber", this.medicalLicenseNumber)
      if (this.email === "" ||  this.medicalLicenseNumber === "") {
        this.message = "Please fill in all fields"
        this.snackbarRegister = true
        this.signingin = false
      }
      else {
        //eslint-disable-next-line
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.email.match(mailFormat)) {
          this.message = "Please enter a valid email"
          this.snackbarRegister = true
          this.signingin = false
        }
      }
      if (this.signingin !== false) {
        console.log("this is the data",formData)
        fetch('/auth/signup/', {
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: formData
        }).then(response => {
          this.signingin = false
          if (response.ok) {
            response.json().then(data => {
              console.log("data",data)
              //this.dialog = false
              this.snackbarRegister = true
              this.message = "Sign up successful! Please login to continue"
              setTimeout(() => {
                this.dialog = false
                this.$router.push("/");
              }, 1000)

            }).catch(err => {
              this.signingin = false
              this.snackbarRegister = true
              this.message = err.message
            })
          } else {
            if(response.status === 409) {
              this.message = "User already exists with this email address!"
              this.snackbarRegister = true
              this.signingin = false
            }
            if(response.status === 404) {
              this.message = "No practitioner found with given information"
              this.snackbarRegister = true
              this.signingin = false
            }
            if(response.status === 402) {
              this.message = "Email does not match with registered practitioner email"
              this.snackbarRegister = true
              this.signingin = false
            }
            if(response.status === 403) {
              this.message = "No Email found for this practitioner. please add your email first!"
              this.snackbarRegister = true
              this.signingin = false
            }
          }
        }).catch(err => {
          this.signingin = false
          this.snackbarRegister = true
          this.message = "Sign Up failed: " + err.message
        })
      }
    },
  }
};
</script>
