<template>
  <v-app id="top">
    <!-- <v-content> -->
    <v-snackbar
      app
      class="mt-12"
      v-model="$store.state.message.active"
      :color="$store.state.message.type"
      :timeout="$store.state.message.timeout"
      top
      multi-line
    >
      {{ $store.state.message.text }}
      <v-btn icon dark @click="$store.commit('closeMessage')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-dialog v-model="$store.state.progress.enabled" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ $store.state.progress.title }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- <v-main> <router-view :key="$route.path"></router-view></v-main> -->
    <router-view></router-view>
    <!-- </v-content> -->
  </v-app>
</template>

