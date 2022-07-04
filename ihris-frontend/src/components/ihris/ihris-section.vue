<template>
  <div :id="'section-'+name" class="ihris-section" v-if="!edit || !secondary" >
    <v-card 
      class="mx-auto"
      max-width="700"
      outlined
      >
      <v-card-title class="primary darken-1 white--text justify-center text-uppercase font-weight-bold">{{ $t(`App.ihris-section.${title}`) }}
      </v-card-title>
      <v-card-text class="my-3" v-if="name!=='language'">
        <slot :source="slotProps.source"></slot>
      </v-card-text>
      <v-card-text class="my-3" v-if="name==='language'">
        <language-detail></language-detail>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import LanguageDetail from '../../views/languageDetail.vue'
export default {
  name: "ihris-section",
  props: ["name", "slotProps","title","description", "edit", "secondary"],
  components: {
    "language-detail": LanguageDetail
  },
  data: function() {
    return {
      //source: { path: "", data: {} }
    }
  },
  created: function() {
    //this.setupData()
  },
  watch: {
    /*
    slotProps: {
      handler() {
        //console.log("WATCH SECTION",this.path,this.slotProps.source)
        this.setupData()
      },
      deep: true
    }
    */
  },
  methods: {
    /*
    setupData: function() {
      if ( this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {} }
        this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, this.field )
      }
    }
    */
  }
}
</script>
