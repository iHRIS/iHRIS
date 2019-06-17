<template>
  <v-container grid-list-xs>
    <v-alert v-model="alert" dismissable type="error">
      {{ error }}
    </v-alert>
    <v-dialog persistent v-model="joinResourceDialog" width="620px">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>
            Joining resources to
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="joinResourceDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-select
            label="Resource*"
            item-text='resource'
            item-value='field'
            required
            :items="linkableResources"
            :loading="loadingLinkableResources"
          ></v-select>
          <v-text-field
            label="Unique Name*"
          ></v-text-field>
          <v-text-field
            label="Limit*"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
          >
            <v-icon left>save</v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-layout column>
      <v-flex xs1 v-if='relationship'>
        <v-card>
          <v-card-title primary-title>
            {{relationship.id}}
          </v-card-title>
          <v-card-text>
            <v-flex xs5>
              <v-text-field
                v-model="relationshipName"
                label="Display Name"
                solo
              ></v-text-field>
            </v-flex>
            <div>
              <label style="color:red">Primary Resource:</label> {{relationship.subject.reference}}
            </div>
            <br>
            <div style="color:red">
              Joined Resources
            </div>
            <v-treeview
              :items="relationship.extension"
              item-children="extension"
            >
              <template v-slot:prepend="{ item }">
                {{item | relationDispFilter}}
              </template>
            </v-treeview>
            <v-btn 
              color="success" 
              small 
              round
              outline
              @click="getLinkableResources(relationship.subject.reference)"
            >
              <v-icon left>add</v-icon>
              Join More
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <br>
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
                  <v-btn 
                    color="primary" 
                    small 
                    round
                    @click="displayRelationship(props.item.resource, 'view')"
                  >
                    <v-icon left>build</v-icon>
                    Generate Report
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
      joinResourceDialog: false,
      loadingLinkableResources: false,
      linkableResources: [],
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
    getLinkableResources (resource) {
      this.joinResourceDialog = true
      this.loadingLinkableResources = true
      resource = resource.split("/").pop()
      axios.get(`/relationship/getLinkableResources?resource=${resource}`).then(response => {
        this.loadingLinkableResources = false
        this.linkableResources = response.data
      }).catch(error => {
        this.loadingLinkableResources = false
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
