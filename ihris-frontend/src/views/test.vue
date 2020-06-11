<template>
  <div class="test">
    <fhir-form>
    Loading...
    </fhir-form>
  </div>
</template>

<script>
// @ is an alias to /src

const comps = { 
  'fhir-extension': () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-extension" ),
  'fhir-reference': () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-reference" ),
  'fhir-string': () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-string" )
}
var pageId

export default {
  name: "Test",
  data: () => ({
      }),
  components: {
    FhirForm: function() {
      return new Promise(resolve => {
        let template = '<div class="fhir"><fhir-extension name="ext from data '+pageId+'"><fhir-reference name="ref from data"><fhir-string name="str from data" /></fhir-reference></fhir-extension></div>'
        resolve({components: comps, template: template})
      })
    }
  },
  created: function() {
    pageId = this.$route.params.id
  }
}

</script>
