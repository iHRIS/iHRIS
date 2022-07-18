<template>
  <v-container>
    <center>
      <v-card min-height="200" max-width="500" rounded shaped>
        <v-card-title primary-title>
          Installed Apps
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                icon 
                color="primary" 
                x-large 
                v-bind="attrs" 
                v-on="on"
                to="install-app"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Install New App</span>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs3>
              <v-card hover max-width="110" rounded>
                <v-card-text>
                  <v-avatar color="primary" size="70">
                    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                  </v-avatar>
                  <br>
                  Audit Logs
                </v-card-text>
              </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs3>
              <v-card hover max-width="110" rounded>
                <v-card-text>
                  <v-avatar color="primary" size="70">
                    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                  </v-avatar>
                  <br>
                  Audit Logs
                </v-card-text>
              </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs3>
              <v-card hover max-width="110" rounded>
                <v-card-text>
                  <v-avatar color="primary" size="70">
                    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                  </v-avatar>
                  <br>
                  Audit Logs
                </v-card-text>
              </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs3>
              <v-card hover max-width="110" rounded>
                <v-card-text>
                  <v-avatar color="primary" size="70">
                    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                  </v-avatar>
                  <br>
                  Audit Logs
                </v-card-text>
              </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs3>
              <v-card hover max-width="110" rounded>
                <v-card-text>
                  <v-avatar color="primary" size="70">
                    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                  </v-avatar>
                  <br>
                  Audit Logs
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs3>
              <v-card hover max-width="110" rounded>
                <v-card-text>
                  <v-avatar color="primary" size="70">
                    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                  </v-avatar>
                  <br>
                  Audit Logs
                </v-card-text>
              </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs3>
              <v-card hover max-width="110" rounded>
                <v-card-text>
                  <v-avatar color="primary" size="70">
                    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                  </v-avatar>
                  <br>
                  Audit Logs
                </v-card-text>
              </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs3>
              <v-card hover max-width="110" rounded to="/questionnaire/ihris-practitioner/practitioner">
                <v-card-text>
                  <v-avatar color="primary" size="70">
                    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                  </v-avatar>
                  <br>
                  Audit Logs
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </center>
  </v-container>
</template>