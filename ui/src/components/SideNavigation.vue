<template>
  <v-container centered class="px-1 text-uppercase font-weight-bold">
    <v-list class="primary darken-1 white--text font-weight-bold">
      <v-list-tile active-class="primary darken-2" href="/">
        <v-list-tile-avatar>
          <v-icon class="white--text">dashboard</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title><strong>Dashboard</strong></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile active-class="primary darken-2" href="/settings">
        <v-list-tile-avatar>
          <v-icon class="white--text">settings</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title><strong>Configuration</strong></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-container>
</template>
