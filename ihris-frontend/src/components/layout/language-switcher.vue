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
      <v-list-item v-for="(lang, index) in langs" :key="index" @click="handleMenuItemClick(lang)">
        <v-list-item-avatar size="24">
          <v-img :src="`/flag_${lang.flag}.svg`"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{ lang.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      langs: [
        {code:'en', title: 'English', flag: 'en' },
        {code:'fr',  title: 'French', flag: 'fr' },
        {code:'es', title: 'Spanish', flag: 'es' },
        {code:'it',  title: 'Italian', flag: 'it' },
        {code:'pt',  title: 'Portuguese', flag: 'pt' },
        {code:'sw',  title: 'Swahili', flag: 'tz' },
        {code:'ar',  title: 'عربي', flag: 'eg' },
      ].sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      }),
      activeLang: 'English',
      activeFlag: 'en',
      dialog: false,
      languageMenu: false,
    }
  },
created() {
   // this.$i18n.availableLocales.map((lang) => (this.langs.push({code:lang, title: lang, flag: 'en' })))
  this.activeLang = localStorage.getItem('activeLang')
  this.activeFlag = localStorage.getItem('activeFlag')
  this.$i18n.locale = localStorage.getItem('activeCode')
},
  methods: {
    handleMenuItemClick (lang) {
      localStorage.setItem('activeLang', lang.title)
      localStorage.setItem('activeFlag', lang.flag)
      localStorage.setItem('activeCode', lang.code)
      this.$i18n.locale = lang.code
      this.activeLang = lang.title;
      this.activeFlag = lang.flag
    },
  }
}
</script>
