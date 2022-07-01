<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="680px" persistent>
        <v-card class="px-6 py-4">
          <v-card-title class="justify-center">
            <span class="text-h6"
            ><v-icon class="mr-2" color="primary" large>mdi-translate</v-icon
            >{{ $t('App.language.add') }}</span
            >
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                      v-model="selectedLanguage"
                      :filter="customFilter"
                      :items="languageList"
                      dense
                      item-text="display"
                      :label="$t('App.language.language')"
                      outlined
                      required
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
                    v-for="(proficiencyData, index) in proficiencyInput"
                    :key="index"
                    class="mx-2"
                >
                  <v-col cols="5">
                    <v-autocomplete
                        v-model="proficiencyData.extension[1].valueCoding"
                        :items="proficiencyType"
                        dense
                        item-text="display"
                        :label="$t('App.language.proficiencyType')"
                        outlined
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
                        v-model="proficiencyData.extension[0].valueCoding"
                        :items="proficiency"
                        dense
                        item-text="display"
                        :label="$t('App.language.proficiency')"
                        outlined
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
                  <v-cols v-if="index === proficiencyInput.length - 1" cols="2">
                    <v-row class="mt-4 ml-2">
                      <v-btn
                          :disabled="proficiencyInput.length >= skillsList.length"
                          color="primary"
                          flat
                          icon
                          rounded
                          small
                          @click="addProficiency"
                      >
                        <v-icon left>
                          mdi-plus-circle
                        </v-icon>
                      </v-btn>
                      <v-btn
                          :disabled="proficiencyInput.length <= 1"
                          color="primary"
                          flat
                          icon
                          rounded
                          small
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
              {{ $t('App.language.close') }}
            </v-btn>
            <v-btn color="blue darken-1" text @click="onSave">
              {{ $t('App.language.save') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="editDialog" max-width="680px" persistent>
        <v-card class="px-6 py-4">
          <v-card-title class="justify-center">
            <span class="text-h6"
            ><v-icon class="mr-2" color="primary" large>mdi-translate</v-icon
            >{{ $t('App.language.selectAndEdit') }}</span
            >
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                      v-model="selectedLanguageToEdit"
                      :filter="customFilter"
                      :items="allAvailableLanguages.map((lan) => lan.coding[0])"
                      dense
                      item-text="display"
                      :label="$t('App.language.selectAndEdit')"
                      outlined
                      required
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
                    v-for="(proficiencyData, index) in proficiencySelected"
                    :key="index"
                    class="mx-2"
                >
                  <v-col cols="5">
                    <v-autocomplete
                        v-model="proficiencyData.extension[1].valueCoding"
                        :items="proficiencyType"
                        dense
                        item-text="display"
                        :label="$t('App.language.proficiencyType')"
                        outlined
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
                        v-model="proficiencyData.extension[0].valueCoding"
                        :items="proficiency"
                        dense
                        item-text="display"
                        :label="$t('App.language.proficiency')"
                        outlined
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
                      v-if="index === proficiencySelected.length - 1"
                      cols="2"
                  >
                    <v-row class="mt-4 ml-2">
                      <v-btn
                          :disabled="proficiencySelected.length >=skillsList.length"
                          color="primary"
                          flat
                          icon
                          rounded
                          small
                          @click="addProficiencySelected"
                      >
                        <v-icon left>
                          mdi-plus-circle
                        </v-icon>
                      </v-btn>
                      <v-btn
                          :disabled="proficiencySelected.length <= 1"
                          color="primary"
                          flat
                          icon
                          rounded
                          small
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
              {{ $t('App.language.close') }}
            </v-btn>
            <v-btn color="primary" @click="onUpdate">
              <v-icon left>mdi-content-save-check-outline</v-icon>
              {{ $t('App.language.save') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-card>
      <v-row class="ma-2 pt-3" justify="end">
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
            {{$t('App.language.add') }}
          </v-btn>
          <v-btn
              :disabled="tableData.length === 0"
              color="primary"
              @click="
              () => {
                this.editDialog = true;
              }
            "
          >
            <v-icon left>
              mdi-circle-edit-outline
            </v-icon>
            {{$t('App.language.selectAndEdit') }}
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
              <template v-for="lev in level">
                <th :key="lev" class="text-left">
                  {{ lev }}
                </th>
              </template>
            </tr>
            </thead>
            <tbody v-for="item in tableData" :key="item.name">
            <tr v-for="skill in skillsList" :key="skill">
              <th v-if="skill===skillsList[0]" :rowspan="skillsList.length" scope="rowgroup">{{ item.name }}</th>
              <template>
                <th scope="row">{{skill}}</th>
                <td v-for="i in level" :key="i">
                    <span v-for="j in Array(skillsList.length).keys()" :key="j">
                     <v-icon
                         v-if="item.skills[j] && item.skills[j].type === skill && item.skills[j].level === i"
                         color="green"
                     >mdi-checkbox-marked-circle-outline</v-icon
                     ><v-icon v-else></v-icon>
                     </span>
                </td>
              </template>
            <tr></tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-card-title v-else class="justify-center">
       <span class="text-h6"
       ><v-icon class="mr-2" color="primary" large>mdi-translate</v-icon
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
      skillsList: [],
      level: [],
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
          .then(({data}) => {
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
          .then(({data}) => {
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
        .then((res) => {
          this.proficiencyType = res.data.expansion.contains
          this.skillsList = res.data.expansion.contains.map(x=> (x.display))
        })
        .catch((e) => console.log(e));
    axios
        .get("/fhir/ValueSet/v3-LanguageAbilityProficiency/$expand")
        .then((res) => {
          this.proficiency = res.data.expansion.contains
          this.level = res.data.expansion.contains.map(x=> (x.display))
        })
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
