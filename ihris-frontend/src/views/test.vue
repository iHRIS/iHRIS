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
  FhirExtension: () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-extension" ),
  FhirReference: () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-reference" ),
  FhirString: () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-string" )
}
var pageId

export default {
  name: "Test",
  data: () => ({
      }),
  components: {
    FhirForm: function() {
      return new Promise(resolve => {
        let template = '<div class="fhir"><fhir-extension data="ext from data '+pageId+'"><fhir-reference data="ref from data"><fhir-string data="str from data" /></fhir-reference></fhir-extension></div>'
        resolve({components: comps, template: template})
      })
    }
  },
  created: function() {
    pageId = this.$route.params.id
  }
}

</script>
