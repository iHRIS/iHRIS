<template>
  <v-container grid-list-xs>
    <v-card elevation="1">
      <v-card-title class="primary darken-1 white--text font-weight-bold justify-center">
        <!-- <v-icon class="mr-2" color="white">{{ selectedIcon }}</v-icon> -->
        Dashboards
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2"
          outlined
          color="white"
          @click="$router.push('/build-dashboard')"
        >
          Build Dashboards
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
import axios from "axios";

export default {
  name: "dashboard",
  props: [ "id" ],
  data() {
    return {
      loading: false,
      search: '',
      dashboards: [],
      headers: [{
        text: "Name",
        value: "title"
      }]
    }
  },
  created() {
    this.loading = true
    let body = {
      type: "dashboard",
      excludeExportDetails: true,
      includeReferencesDeep: false
    }
    let options = {
      method: "POST",
      headers: {
        "kbn-xsrf": true,
        "Content-Type": "application/fhir+json",
      },
      redirect: "manual",
      data: body
    }
    axios("/dashboards/api/saved_objects/_export", options).then((response) => {
      let lines = response.data.split('\n');
      for (let i = 0; i < lines.length - 1; i++) {
        if (lines[i].trim()) {
          try {
            const dashboard = JSON.parse(lines[i]);
            this.dashboards.push({
              id: dashboard.id,
              title: dashboard.attributes.title
            })
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      }
      let buffer = lines[lines.length - 1];
      if (buffer.trim()) {
        try {
          const dashboard = JSON.parse(buffer);
          this.dashboards.push({
            id: dashboard.id,
            title: dashboard.attributes.title
          })
        } catch (error) {
          console.error('Error parsing final JSON object:', error);
        }
      }
      this.loading = false
    }).catch((err) => {
      console.log(err);
    })
  }
}
</script>