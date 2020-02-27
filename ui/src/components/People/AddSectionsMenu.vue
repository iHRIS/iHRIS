<template>
  <v-flex :class="gridLayout" v-if="!smallScreenCompute">
    <v-card class="primary darken-1 white--text" >
      <v-card-title  :class="titleStyle">Add Sections</v-card-title>
      <v-card-text :class="layoutCardText">
        <v-list 
          :class = "layoutList"
          v-for="item in menu"
          :key="item.title"
        >
          <v-list-item
            active-class = "primary darken-2"
            :class = "layoutListItem"
            @click.stop="showForm(item.title, item.type, item.raw)"
            three-line
          >
            <v-list-item-icon :class="layoutListItemIcon">
              <v-icon class="white--text ">mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="white--text text-uppercase font-weight-bold"
              >
                {{ item.title | sentenceCase }}
              </v-list-item-title>
              <v-list-item-subtitle class="white--text">
                {{ item.subtitle }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-flex>
   <v-toolbar dark color="primary" class="mb-2" v-else-if="smallScreenCompute">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon  v-on="on">
          <v-icon>list</v-icon>
        </v-btn>
        <v-toolbar-title :class="titleStyle">Add Sections</v-toolbar-title>
      </template>
      <v-card>
        <v-list dense
        >
          <v-list-item
            v-for="item in menu"
            :key="item.title"
          >
           <v-list-item-content style="cursor: pointer">
            <v-list-item-title 
              active-class="primary darken-2" 
              class="my-1 mx-1"
              @click ="showForm(item.title, item.type, item.raw)"
              > {{ item.title}}
            </v-list-item-title>
           </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
   </v-toolbar>
</template>

<script>
import axios from "axios";
import Practitioner from "@/mixins/Practitioner.js";
import StructureDefinition from "@/mixins/StructureDefinition.js";

export default {
  computed: {
    smallScreenCompute(){
      var smallScreen=false;
      if(this.$vuetify.breakpoint.name == "xs")
      {
        smallScreen = true;
      }
      else{
        smallScreen = false;
      }
      return smallScreen;
    },
    gridLayout(){
      var layout = "";
      switch (this.$vuetify.breakpoint.name) {
        case 'sm': layout = 'xs5';
          break;
        case 'md': layout = 'xs6';
          break;
        case 'lg': layout = 'xs6';
          break;
        case 'xl': layout = 'xs6'
      }
      return layout;
    },
    titleStyle(){
      var style="";
      
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': style='title font-weight-bold white--text';
          break;
        case 'sm': style='title font-weight-bold white--text';
          break;
        case 'md': style='display-1 font-weight-bold white--text';
          break;
        case 'lg': style='display-1 font-weight-bold white--text';
          break;
        case 'xl': style='display-1 font-weight-bold white--text';
          break;
      }
      return style;
    },
    itemIconStyle(){
      var itemIconStyle="";
      switch (this.$vuetify.breakpoint.name) {
      case 'xs': itemIconStyle='m-0';
        break;
      case 'sm': itemIconStyle='m-0';
        break;
    }
    return itemIconStyle;
    },
    layoutCardText(){
      var layout="";
      switch (this.$vuetify.breakpoint.name) {
      case 'xs': layout='pl-0 pr-0';
        break;
      case 'sm': layout='pl-0 pr-0';
        break;
    }
    return layout;
    },
    layoutListItem(){
      var layout="";
      switch (this.$vuetify.breakpoint.name) {
      case 'xs': layout='pb-0 ma-0';
        break;
      case 'sm': layout='pb-0 ma-0';
        break;
    }
    return layout;
    },
    layoutList(){
      var layout="primary darken-1 white--text ml-0";
      switch (this.$vuetify.breakpoint.name) {
      case 'xs': layout='pb-0 pt-0 primary darken-1 white--text ml-0';
        break;
      case 'sm': layout='pb-0 pt-0 primary darken-1 white--text ml-0';
        break;
    }
    return layout;
    },
    layoutListItemIcon(){
      var layout="";
      switch (this.$vuetify.breakpoint.name) {
      case 'xs': layout='mr-0 ml-0';
        break;
      case 'sm': layout='mr-0 ml-0';
        break;
    }
    return layout;
    },
    menu() {
      let menu = {};

      for (var index in this.sections) {
        let field = this.sections[index];
        let label = null;
        let id = null;

        // if we have data set for this field, then don't render it
        if (field.id.includes("extension:")) {
          id = field.id.slice(field.id.lastIndexOf(":") + 1);
        } else {
          id = field.id.slice(field.id.lastIndexOf(".") + 1);
        }

        // data is set, don't continue with this field
        if (this.data && this.data[id]) {
          continue;
        } else if (field.type[0].code && field.type[0].code === "Extension") {
          let match = false;
          let profile = field.type[0].profile[0];

          for (var i in this.data.extension) {
            let extension = this.data.extension[i];

            if (extension.url === profile) {
              match = true;
              break;
            }
          }

          if (match) {
            continue;
          }
        }

        // if a label field exists, use that
        // otherwise, go with the last text before the period
        if (field.label) {
          label = field.label;
        } else {
          label = field.id.slice(field.id.lastIndexOf(".") + 1);
        }

        menu[field.id] = {};
        menu[field.id].title = label;
        menu[field.id].index = field.id;
        menu[field.id].raw = field;
        menu[field.id].subtitle = field.description;

        // set the type, used to show the correct fields
        if (field.type[0].code && field.type[0].code !== "Extension") {
          menu[field.id].type = field.type[0].code;
        } else if (
          field.type[0].code === "Extension" &&
          field.type[0].profile[0]
        ) {
          let type = field.type[0].profile[0];
          menu[field.id].type = type.slice(type.lastIndexOf("/") + 1);
        }
      }

      return menu;
    }
  },
  created() {
    
    this.sections = [];
    

    this.getSections().then(fields => {
      fields.forEach(field => {
        this.$set(this.sections, field.id, field);

        // get the subtitle. if a description value is set, use that
        if (field.description) {
          this.sections[field.id].description = field.description;
        } else if (field.definition) {
          this.sections[field.id].description = field.definition;
        } else if (field.path == "Practitioner.extension") {
          // if this is an extension, load the structure definition and get the description from that
          let type = field.type[0].profile[0];
          let structureDefinition = type.slice(type.lastIndexOf("/") + 1);

          axios
            .get(
              this.config.backend +
                "/practitioner/describe/definition/" +
                structureDefinition
            )
            .then(extension => {
              // use the description field for the subtitle
              if (extension.data.description) {
                this.sections[field.id].description =
                  extension.data.description;
              }
            });
        }
      });
    });
  },
  data() {
    return {
      fields: [],
      sections: [],
      smallScreen:false

    };
  },
  mixins: [Practitioner, StructureDefinition],
  props: ["data"]
};
</script>
