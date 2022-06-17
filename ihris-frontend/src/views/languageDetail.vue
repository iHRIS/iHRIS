<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="680px">
        <v-card class="px-6 py-4">
          <v-card-title class="justify-center">
            <span class="text-h6"
            ><v-icon large color="primary" class="mr-2">mdi-translate</v-icon
            >Add New Language</span
            >
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                      dense
                      :items="languageList"
                      label="Language"
                      :filter="customFilter"
                      required
                      outlined
                      v-model="selectedLanguage"
                      item-text="display"
                      return-object
                  >
                    <template v-slot:item="data">
                      <template v-if="typeof data.item === 'object'">
                        <v-list-item-content
                            v-text="data.item.display"
                        ></v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-row
                    class="mx-2"
                    v-for="(proficiencyData, index) in proficiencyInput"
                    :key="index"
                >
                  <v-col cols="5">
                    <v-autocomplete
                        dense
                        label="proficiency Type"
                        :items="proficiencyType"
                        outlined
                        v-model="proficiencyData.extension[1].valueCoding"
                        item-text="display"
                        return-object
                    >
                      <template v-slot:item="data">
                        <template v-if="typeof data.item === 'object'">
                          <v-list-item-content
                              v-text="data.item.display"
                          ></v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="5">
                    <v-autocomplete
                        dense
                        :items="proficiency"
                        label="Proficiency"
                        outlined
                        v-model="proficiencyData.extension[0].valueCoding"
                        item-text="display"
                        return-object
                    >
                      <template v-slot:item="data">
                        <template v-if="typeof data.item === 'object'">
                          <v-list-item-content
                              v-text="data.item.display"
                          ></v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-cols cols="2" v-if="index === proficiencyInput.length - 1">
                    <v-row class="mt-4 ml-2">
                      <v-btn
                          rounded
                          small
                          icon
                          flat
                          color="primary"
                          :disabled="proficiencyInput.length >= 4"
                          @click="addProficiency"
                      >
                        <v-icon left>
                          mdi-plus-circle
                        </v-icon>
                      </v-btn>
                      <v-btn
                          rounded
                          small
                          icon
                          flat
                          color="primary"
                          :disabled="proficiencyInput.length <= 1"
                          @click="reSet()"
                      >
                        <v-icon left>
                          mdi-backup-restore
                        </v-icon>
                      </v-btn>
                    </v-row>
                  </v-cols>
                </v-row>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="
                () => {
                  dialog = false;
                  reSet();
                }
              "
            >
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="onSave">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="editDialog" persistent max-width="680px">
        <v-card class="px-6 py-4">
          <v-card-title class="justify-center">
            <span class="text-h6"
            ><v-icon large color="primary" class="mr-2">mdi-translate</v-icon
            >Select and Edit Language</span
            >
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                      dense
                      :items="allAvailableLanguages.map((lan) => lan.coding[0])"
                      label="select the Language to edit"
                      :filter="customFilter"
                      required
                      outlined
                      v-model="selectedLanguageToEdit"
                      item-text="display"
                      return-object
                  >
                    <template v-slot:item="data">
                      <template v-if="typeof data.item === 'object'">
                        <v-list-item-content
                            v-text="data.item.display"
                        ></v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-row
                    class="mx-2"
                    v-for="(proficiencyData, index) in proficiencySelected"
                    :key="index"
                >
                  <v-col cols="5">
                    <v-autocomplete
                        dense
                        label="proficiency Type"
                        :items="proficiencyType"
                        outlined
                        v-model="proficiencyData.extension[1].valueCoding"
                        item-text="display"
                        return-object
                    >
                      <template v-slot:item="data">
                        <template v-if="typeof data.item === 'object'">
                          <v-list-item-content
                              v-text="data.item.display"
                          ></v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="5">
                    <v-autocomplete
                        dense
                        :items="proficiency"
                        label="Proficiency"
                        outlined
                        v-model="proficiencyData.extension[0].valueCoding"
                        item-text="display"
                        return-object
                    >
                      <template v-slot:item="data">
                        <template v-if="typeof data.item === 'object'">
                          <v-list-item-content
                              v-text="data.item.display"
                          ></v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-cols
                      cols="2"
                      v-if="index === proficiencySelected.length - 1"
                  >
                    <v-row class="mt-4 ml-2">
                      <v-btn
                          rounded
                          small
                          icon
                          flat
                          color="primary"
                          :disabled="proficiencySelected.length >= 6"
                          @click="addProficiencySelected"
                      >
                        <v-icon left>
                          mdi-plus-circle
                        </v-icon>
                      </v-btn>
                      <v-btn
                          rounded
                          small
                          icon
                          flat
                          color="primary"
                          :disabled="proficiencySelected.length <= 1"
                          @click="reSet()"
                      >
                        <v-icon left>
                          mdi-backup-restore
                        </v-icon>
                      </v-btn>
                    </v-row>
                  </v-cols>
                </v-row>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="warning"
                error
                @click="
                () => {
                  editDialog = false;
                }
              "
            >
              <v-icon left>mdi-close-box-multiple</v-icon>
              Close
            </v-btn>
            <v-btn color="primary" @click="onUpdate">
              <v-icon left>mdi-content-save-check-outline</v-icon>
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-card>
      <v-row justify="end" class="ma-2 pt-3">
        <template>
          <v-btn
              class="mr-3"
              color="primary"
              @click="
              () => {
                this.dialog = true;
                this.skillCount = 1;
              }
            "
          >
            <v-icon left>
              mdi-plus-circle
            </v-icon>
            Add Language
          </v-btn>
          <v-btn
              color="primary"
              :disabled="tableData.length === 0"
              @click="
              () => {
                this.editDialog = true;
              }
            "
          >
            <v-icon left>
              mdi-circle-edit-outline
            </v-icon>
            Edit Language
          </v-btn>
        </template>
      </v-row>
      <v-card-text>
        <v-simple-table v-if="tableData.length > 0">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Language
              </th>
              <th class="text-left">
                Skill
              </th>
              <th class="text-left">
                Excellent
              </th>
              <th class="text-left">
                Good
              </th>
              <th class="text-left">
                Fair
              </th>
              <th class="text-left">
                Poor
              </th>
            </tr>
            </thead>
            <tbody v-for="item in tableData" :key="item.name">
            <tr>
              <th rowspan="6" scope="rowgroup">{{ item.name }}</th>
              <th scope="row">Expressed signed</th>
              <td v-for="i in [0, 1, 2, 3]" :key="i">
                  <span v-for="j in [0, 1, 2, 3,4,5]" :key="j">
                    <v-icon
                        v-if="
                        item.skills[j] &&
                          item.skills[j].type === 'Expressed signed' &&
                          item.skills[j].level === level[i]
                      "
                        color="green"
                    >mdi-checkbox-marked-circle-outline</v-icon
                    ><v-icon v-else></v-icon>
                  </span>
              </td>
            </tr>
            <tr>
              <th scope="row">Expressed spoken</th>
              <td v-for="i in [0, 1, 2, 3]" :key="i">
                  <span v-for="j in [0, 1, 2, 3,4,5]" :key="j">
                    <v-icon
                        v-if="
                        item.skills[j] &&
                          item.skills[j].type === 'Expressed spoken' &&
                          item.skills[j].level === level[i]
                      "
                        color="green"
                    >mdi-checkbox-marked-circle-outline</v-icon
                    ><v-icon v-else></v-icon>
                  </span>
              </td>
            </tr>
            <tr>
              <th scope="row">Expressed written</th>
              <td v-for="i in [0, 1, 2, 3]" :key="i">
                  <span v-for="j in [0, 1, 2, 3,4,5]" :key="j">
                    <v-icon
                        v-if="
                        item.skills[j] &&
                          item.skills[j].type === 'Expressed written' &&
                          item.skills[j].level === level[i]
                      "
                        color="green"
                    >mdi-checkbox-marked-circle-outline</v-icon
                    ><v-icon v-else></v-icon>
                  </span>
              </td>
            </tr>
            <tr>
              <th scope="row">Received signed</th>
              <td v-for="i in [0, 1, 2, 3]" :key="i">
                  <span v-for="j in [0, 1, 2, 3,4,5]" :key="j">
                    <v-icon
                        v-if="
                        item.skills[j] &&
                          item.skills[j].type === 'Received signed' &&
                          item.skills[j].level === level[i]
                      "
                        color="green"
                        div               >mdi-checkbox-marked-circle-outline</v-icon
                    ><v-icon v-else></v-icon>
                  </span>
              </td>
            </tr>
            <tr>
              <th scope="row">Received written</th>
              <td v-for="i in [0, 1, 2, 3]" :key="i">
                  <span v-for="j in [0, 1, 2, 3,4,5]" :key="j">
                    <v-icon
                        v-if="
                        item.skills[j] &&
                          item.skills[j].type === 'Received written' &&
                          item.skills[j].level === level[i]
                      "
                        color="green"
                        div               >mdi-checkbox-marked-circle-outline</v-icon
                    ><v-icon v-else></v-icon>
                  </span>
              </td>
            </tr>
            <tr>
              <th scope="row">Received spoken</th>
              <td v-for="i in [0, 1, 2, 3]" :key="i">
                  <span v-for="j in [0, 1, 2, 3,4,5]" :key="j">
                    <v-icon
                        v-if="
                        item.skills[j] &&
                          item.skills[j].type === 'Received spoken' &&
                          item.skills[j].level === level[i]
                      "
                        color="green"
                        div               >mdi-checkbox-marked-circle-outline</v-icon
                    ><v-icon v-else></v-icon>
                  </span>
              </td>
            </tr>
            <tr></tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-card-title class="justify-center" v-else>
       <span class="text-h6"
       ><v-icon large color="primary" class="mr-2">mdi-translate</v-icon
       >No language data is available please add one </span
       >
        </v-card-title>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  name: "languageDetail",
  data() {
    return {
      valid: false,
      skillCount: 1,
      select: null,
      dialog: false,
      skillsList: ["Received signed", "Expressed signed", "Expressed written", "Received written","Expressed spoken","Received spoken"],
      level: ["Excellent", "Good", "Fair", "Poor"],
      tableData: [],
      languageList: [],
      filledLanguage: [],
      proficiency: [],
      proficiencyType: [],
      selectedLanguage: null,
      selectedProficiency: null,
      selectedProficiencyType: null,
      proficiencySelected: [],
      selected: [],
      required(propertyType) {
        return (v) => v || `You must select a ${propertyType}`;
      },
      proficiencyInput: [
        {
          url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-language-proficiency",
          extension: [
            {
              url: "level",
              valueCoding: {
                system:
                    "http://terminology.hl7.org/CodeSystem/v3-LanguageAbilityProficiency",
                version: "",
                code: "",
                display: "",
              },
            },
            {
              url: "type",
              valueCoding: {
                system:
                    "http://terminology.hl7.org/CodeSystem/v3-LanguageAbilityMode",
                version: "",
                code: "",
                display: "",
              },
            },
          ],
        }
      ],
      // selected to edit
      allAvailableLanguages: [],
      selectedLanguageToEdit: null,
      editDialog: false,
    };
  },
  watch: {
    selectedLanguageToEdit: function (value) {
      let loaded = this.allAvailableLanguages.find(
          (lan) => lan.coding[0].code === value.code
      );
      if (loaded.extension) {
        this.proficiencySelected = loaded.extension;
      } else {
        this.proficiencySelected = [
          {
            url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-language-proficiency",
            extension: [
              {
                url: "level",
                valueCoding: "",
              },
              {
                url: "type",
                valueCoding: "",
              },
            ],
          },
        ];
      }
    },
  },
  methods: {
    reSet() {
      this.proficiencyInput = [
        {
          url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-language-proficiency",
          extension: [
            {
              url: "level",
              valueCoding: {
                system:
                    "http://terminology.hl7.org/CodeSystem/v3-LanguageAbilityProficiency",
                version: "",
                code: "",
                display: "",
              },
            },
            {
              url: "type",
              valueCoding: {
                system:
                    "http://terminology.hl7.org/CodeSystem/v3-LanguageAbilityMode",
                version: "",
                code: "",
                display: "",
              },
            },
          ],
        }
      ];
    },
    addProficiency() {
      this.proficiencyInput.push({
        url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-language-proficiency",
        extension: [
          {
            url: "level",
            valueCoding: "",
          },
          {
            url: "type",
            valueCoding: "",
          },
        ],
      });
    },
    addProficiencySelected() {
      this.proficiencySelected.push({
        url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-language-proficiency",
        extension: [
          {
            url: "level",
            valueCoding: "",
          },
          {
            url: "type",
            valueCoding: "",
          },
        ],
      });
    },
    customFilter(item, queryText) {
      const textOne = item.display.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },
    onSave() {
      this.dialog = false;
      axios
          .get(`/fhir/Practitioner/${this.$router.history.current.params.id}`)
          .then(({ data }) => {
            if (data.communication === undefined) {
              data.communication = [];
            }
            data.communication.push({
              extension: this.proficiencyInput,
              coding: [this.selectedLanguage],
            });
            axios
                .put(
                    `/fhir/Practitioner/${this.$router.history.current.params.id}`,
                    data
                )
                .then(() => {
                  this.$router.go()
                })
                .catch((err) => {
                  console.log("error", err);
                });
          })
          .catch((e) => console.log(e));
    },
    onUpdate() {
      this.editDialog = false;
      axios
          .get(`/fhir/Practitioner/${this.$router.history.current.params.id}`)
          .then(({ data }) => {
            data.communication.find(
                (lan) => lan.coding[0].code === this.selectedLanguageToEdit.code
            ).extension = this.proficiencySelected;
            axios
                .put(
                    `/fhir/Practitioner/${this.$router.history.current.params.id}`,
                    data
                )
                .then(() => {
                  this.$router.go();
                })
                .catch((err) => {
                  console.log("error", err);
                });
          })
          .catch((e) => console.log(e));
    },
  },
  created() {
    axios
        .get(`/fhir/Practitioner/${this.$router.history.current.params.id}`)
        .then((res) => {
          if (res.data && res.data.communication) {
            this.allAvailableLanguages = res.data.communication;
            res.data.communication.map((data) => {
              if (data.coding[0].code) {
                this.filledLanguage.push(data.coding[0].code);
                let skill = [];
                if (data.extension && data.extension.length > 0) {
                  data.extension.map((data) => {
                    let subSkill = {};
                    if (
                        data.extension &&
                        data.extension[0] &&
                        data.extension[1]
                    ) {
                      subSkill.level = data.extension[0].valueCoding.display;
                      subSkill.type = data.extension[1].valueCoding.display;
                      skill.push(subSkill);
                    }
                  });
                }
                let language = {};
                language.skills = skill;
                language.name = data.coding[0].display;
                language.skillList = this.skillsList;
                this.tableData.push(language);
              }
            });
          }
        });
    axios
        .get("/fhir/ValueSet/languages/$expand")
        .then((res) => {
          this.languageList = res.data.expansion.contains;
          this.languageList = this.languageList.filter(
              (lang) => !this.filledLanguage.includes(lang.code)
          );
          this.languageList.sort((a, b) =>
              a.display > b.display ? 1 : b.display > a.display ? -1 : 0
          );
        });
    axios
        .get("/fhir/ValueSet/v3-LanguageAbilityMode/$expand")
        .then((res) => (this.proficiencyType = res.data.expansion.contains))
        .catch((e) => console.log(e));
    axios
        .get("/fhir/ValueSet/v3-LanguageAbilityProficiency/$expand")
        .then((res) => (this.proficiency = res.data.expansion.contains))
        .catch((e) => console.log(e));
  },
};
</script>

<style scoped>
table,
th,
td {
  border: 1px dotted rgb(221, 221, 226);
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th {
  font-size: 14px !important;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 16px !important;
}
box {
  border: 2px dashed #bbb;
  width: 96%;
  margin: 4px auto;
}
</style>
