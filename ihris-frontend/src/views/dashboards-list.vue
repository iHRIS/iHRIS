<template>
  <v-container grid-list-xs>
    <v-card elevation="1">
      <v-card-title class="primary darken-1 white--text font-weight-bold justify-center">
        {{ $t('App.hardcoded-texts.Dashboards') }}
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2"
          outlined
          color="white"
          @click="$router.push('/build-dashboard')"
        >
          {{ $t('App.hardcoded-texts.Build Dashboards') }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="white--text font-weight-bold justify-center"
        ></v-text-field>
        <v-data-table
          :items="dashboards"
          :headers="headers"
          class="elevation-1"
          :search="search"
          hide-default-header
          :loading="loading"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>
                <v-list-item
                  @click="$router.push('/dashboard/' + item.id)"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-monitor-dashboard</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { kibana } from "@/mixins/kibana"

export default {
  name: "dashboard",
  props: [ "id" ],
  mixins: [kibana],
  data() {
    return {
      loading: false,
      search: '',
      headers: [{
        text: "Name",
        value: "title"
      }]
    }
  }
}
</script>