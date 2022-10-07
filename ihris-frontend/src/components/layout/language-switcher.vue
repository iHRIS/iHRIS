<template>
  <v-menu class="ma-8" v-model="languageMenu" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="text-capitalize" v-bind="attrs" v-on="on" text>
        <v-list-item-avatar size="24">
          <v-img :src="`/flag_${activeFlag}.svg`"></v-img>
        </v-list-item-avatar>
        {{ activeLang }}
        <v-icon small right>mdi-menu-down</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item v-for="(lang, index) in languages" :key="index" @click="handleMenuItemClick(lang)">
        <v-list-item-avatar size="24">
          <v-img :src="`/flag_${lang.flag}.svg`"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{ lang.language }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {loadLanguage} from '../../i18n'
import axios from 'axios'
export default {
  data() {
    return {
      languages: [],
      activeLang: 'English',
      activeFlag: 'en',
      dialog: false,
      languageMenu: false,
    }
  },
  created() {
    this.getLanguageList()
  },
  methods: {
    handleMenuItemClick (lang) {
      loadLanguage(lang.locale)
      localStorage.setItem('activeLang', lang.language)
      localStorage.setItem('activeFlag', lang.flag)
      localStorage.setItem('activeLocale', lang.locale)
      this.activeLang = lang.language;
      this.activeFlag = lang.flag
    },
    getLanguageList() {
      axios.get("/translator/getTranslatedLanguages").then((response) => {
        this.languages = response.data
        this.languages.sort((a, b) => {
          if (a.language < b.language) {
            return -1;
          }
          if (a.language > b.language) {
            return 1;
          }
          return 0;
        })
        let activeLocale = localStorage.getItem('activeLocale') || this.$i18n.locale || "en"
        let activeLanguage = this.languages.find((lang) => {
          return lang.locale === activeLocale
        })
        this.$i18n.locale = activeLanguage.locale
        this.activeLang = activeLanguage.language
        loadLanguage(activeLanguage.locale || "en")
      })
    }
  }
}
</script>
