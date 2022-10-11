<template>
  <div class="home" >
    <v-dialog v-model="dialog" width="500">
      <v-form>
        <v-card>
          <v-card-title class="white--text justify-center primary darken-1">
            <v-icon color="white" left>
              mdi-account-plus
            </v-icon>
            {{$t('App.hardcoded-texts.Register')}}
          </v-card-title>
          <v-card-text class="px-12 pt-6">
            <v-text-field
                outlined
                dense
                v-model="email"
                type="email"
                :label="$t('App.hardcoded-texts.Email Address')"
                required
                prepend-icon="mdi-email"
            ></v-text-field>
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    outlined
                    dense
                    v-model="birthDate"
                    :label="$t('App.hardcoded-texts.Birth Date')"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="birthDate"
                  :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                  min="1910-01-01"
                  @change="saveDate"
              ></v-date-picker>
            </v-menu>
            <v-text-field
                outlined
                dense
                v-model="employeeNumber"
                :label="$t(`App.hardcoded-texts.Employee Number`)"
                required
                prepend-icon="mdi-account-key"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-snackbar v-model="snackbarRegister" :absolute="absolute" color="secondary">
              {{ message }}
              <v-btn color="warning" text @click="snackbarRegister = false">{{$t('App.hardcoded-texts.Close')}}</v-btn>
            </v-snackbar>
            <v-spacer></v-spacer>
            <v-btn class="mr-8 mb-6 primary" :loading="registering" :disabled="registering" @click="register">
              <v-icon left>
                mdi-account-plus
              </v-icon>
              {{$t('App.hardcoded-texts.Sign Up')}}
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
            {{$t('App.hardcoded-texts.Reset Password')}}
          </v-card-title>
          <v-card-text class="px-12 pt-12">
            <v-text-field
                outlined
                dense
                v-model="resetPasswordEmail"
                type="email"
                :label="$t(`App.hardcoded-texts.Email Address`)"
                required
                prepend-icon="mdi-email"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-snackbar v-model="snackbarRegister" :absolute="absolute" color="secondary">
              {{ message }}
              <v-btn color="warning" text @click="snackbarRegister = false">{{$t('App.hardcoded-texts.Close')}}</v-btn>
            </v-snackbar>
            <v-spacer></v-spacer>
            <v-btn class="mr-8 mb-6 primary" :loading="registering" :disabled="registering" @click="resetPassword">
              <v-icon left>
                mdi-lock-reset
              </v-icon>
              {{$t('App.hardcoded-texts.Reset Password')}}
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
                      {{$t(`App.hardcoded-texts.Welcome to iHRIS!`)}}<br/>
                    </h1>
                    <br/>
                    <p  class="pt-8 subtitle-1 text--primary font-weight-medium text-lg-justify">
                      {{$t(`App.hardcoded-texts.iHRIS is IntraHealth International's free, open source software that helps countries around the world track and manage their health workforce data to improve access to services. Countries use it to capture and maintain high-quality information for health workforce planning, management, regulation, and training.`)}}
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
                    <div class="white--text display-1"><v-icon size="48" class="mr-2">mdi-account-circle</v-icon>{{$t(`App.hardcoded-texts.Sign in`)}}<br/></div>
                  </v-card-title>
                  <v-card-text class="pt-8">
                    <v-form>
                      <h4 class="white--text">{{$t(`App.hardcoded-texts.Username/Email`)}}</h4>
                      <v-text-field
                        v-model="username"
                        background-color="#0d3552"
                        class="pt-1 white--text"
                        :placeholder="$t(`App.hardcoded-texts.Username/Email`)"
                        required
                        solo
                      />
                      <h4 class="white--text pt-2">{{$t(`App.hardcoded-texts.Password`)}}</h4>
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
                      >{{$t('App.hardcoded-texts.Close')}}
                      </v-btn
                      >
                    </v-snackbar>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="loggingin" :loading="loggingin" light @click="submit">{{$t(`App.hardcoded-texts.Sign in`)}}</v-btn>
                  </v-card-actions>
                  <v-card-actions class="mt-12">
                    <v-btn
                        @click="()=>{this.resetPasswordDialog=true}"
                        class="mx-2 text--white"
                        outlined
                        color="primary"
                        style="text-transform: none" text
                    >
                      {{$t(`App.hardcoded-texts.Forgot Password`)}}</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn v-if="this.$store.state.allowSelfSignup === 'true' " @click="()=>{this.dialog=true}" class="mx-2 text--white"
                           outlined
                           color="primary" style="text-transform: none" text >
                      {{$t(`App.hardcoded-texts.No account? Sign Up`)}}
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
      birthDate: null,
      menu: false,
      employeeNumber:"",
      registering: false,
      resetPasswordDialog: false,
      resetPasswordEmail: "",
    }
  },
  created:function(){
    fetch("/config/site").then(response => {
      response.json().then(data => {
        if (data.hasOwnProperty("canSelfSignup")) {
          this.$store.commit('setAllowSelfSignup', data.canSelfSignup);
        }
      })
    })
  },
  methods:{
    saveDate (date) {
      this.$refs.menu.save(date)
    },
    submit() {
      this.loggingin = true
      let formData = new URLSearchParams()
      formData.append("username", this.username)
      formData.append("password", this.password)
      if (this.username.length === 0 || this.password.length === 0) {
        this.message = this.$t("App.hardcoded-texts.Both Username and password are required")
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
              this.message = this.$t("App.hardcoded-texts.Login successfull")
              this.$emit("loggedin", data.user)
              // this.$router.push( {path: "/" } )
              location.reload()
            }).catch(err => {
              this.loggingin = false
              this.snackbar = true
              this.message = err.message
            })
          } else {
            this.message = this.$t("App.hardcoded-texts.Username or password is incorrect!")
            this.snackbar = true
            this.loggingin = false
          }
        }).catch(err => {
          console.log(err)
          //this.absolute=true
          this.loggingin = false
          this.snackbar = true
          this.message = this.$t("App.hardcoded-texts.Login failed: ") + err.message
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
        this.message = this.$t("App.hardcoded-texts.Email Field is required!")
        this.snackbarRegister = true
        this.signingin = false
      }
      else if (!this.resetPasswordEmail.match(mailFormat)) {
        this.message = this.$t("App.hardcoded-texts.Please enter a valid email")
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
      formData.append("employeeNumber", this.employeeNumber)
      formData.append("birthDate", this.birthDate)
      if (this.email === "" ||  this.employeeNumber === "" || this.birthDate === "") {
        this.message = "Please fill in all fields"
        this.snackbarRegister = true
        this.signingin = false
      }
      else {
        //eslint-disable-next-line
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.email.match(mailFormat)) {
          this.message = this.$t("App.hardcoded-texts.Please enter a valid email")
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
              this.message = this.$t("App.hardcoded-texts.Sign up successful! Please login to continue")
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
              this.message = this.$t("App.hardcoded-texts.User already exists with this email address!")
              this.snackbarRegister = true
              this.signingin = false
            }
            if(response.status === 404) {
              this.message = this.$t("App.hardcoded-texts.No practitioner found with given information")
              this.snackbarRegister = true
              this.signingin = false
            }
            if(response.status === 402) {
              this.message = this.$t("App.hardcoded-texts.Email does not match with registered practitioner email")
              this.snackbarRegister = true
              this.signingin = false
            }
            if(response.status === 403) {
              this.message = this.$t("App.hardcoded-texts.No Email found for this practitioner. please add your email first!")
              this.snackbarRegister = true
              this.signingin = false
            }
          }
        }).catch(err => {
          this.signingin = false
          this.snackbarRegister = true
          this.message = this.$t("App.hardcoded-texts.Sign Up failed: ") + err.message
        })
      }
    },
  }
};
</script>
