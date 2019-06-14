<template>
  <v-container grid-list-xs>
    <v-alert v-model="alert" dismissable type="error">
      {{ error }}
    </v-alert>
    <v-layout column>
      <v-flex xs1 v-if='relationship'>
        <v-card>
          <v-card-title primary-title>
            {{relationship.id}}
          </v-card-title>
          <v-card-text>
            <v-treeview
              :items="relationship.extension"
              item-children="extension"
            >
              <template v-slot:prepend="{ item }">
                {{item | relationDispFilter}}
              </template>
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs1 v-if="relationships.length > 0">
        <v-card>
          <v-card-title primary-title>
            View/Edit Existing Relationship
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="relationshipHeaders"
              :items="relationships"
            >
              <template slot="items" slot-scope="props">
                <td>{{props.item.resource.id}}</td>
                <td>
                  <v-btn 
                    color="primary" 
                    small 
                    round
                    @click="displayRelationship(props.item.resource, 'edit')"
                  >
                    <v-icon left>edit</v-icon>Edit
                  </v-btn>
                  <v-btn 
                    color="primary" 
                    small 
                    round
                    @click="displayRelationship(props.item.resource, 'view')"
                  >
                    <v-icon left>pageview</v-icon>
                    View
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      tree: [],
      alert: false,
      error: "",
      relationships: [],
      relationship: '',
      relationshipName: '',
      action: '',
      relationshipHeaders: [
        { text: 'Relationship', value: 'relationship' },
        { text: 'Action', value: 'action' }
      ]
    }
  },
  filters: {
    relationDispFilter(value) {
      if(value.url === 'name') {
        return ''
      } else if(value.url.endsWith('iHRISReportLink')) {
        let resource = value.extension.find(extension => {
          return extension.url === 'resource'
        })
        return resource.valueCanonical.split('/').pop()
      } else if(value.url === 'resource') {
        return "Resource Name: " + value[Object.keys(value)[1]].split('/').pop()
      } else {
        return value.url + ": " + value[Object.keys(value)[1]]
      }
      
    }
  },
  methods: {
    getRelationships () {
      axios.get("/relationship/describe").then(response => {
        for(let relationship of response.data.entry) {
          if(relationship.resource.code.text === 'relationship') {
            this.relationships.push(relationship)
          }
        }
      }).catch(error => {
        this.error = error.response.data;
        this.alert = true;
      });
    },
    displayRelationship (relationship, action) {
      this.relationship = relationship
      let name = relationship.extension.find(extension => {
        return extension.url === 'name';
      })
      this.relationshipName = name.valueString;
      this.action = action;
    }
  },
  created () {
    this.getRelationships();
  }
}
</script>
