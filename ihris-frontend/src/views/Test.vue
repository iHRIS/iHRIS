<template>
  <div class="test">
    <FHIRForm>
    Loading...
    </FHIRForm>
  </div>
</template>

<script>
// @ is an alias to /src

const comps = { 
  FHIRExtension: () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/FHIRExtension" ),
  FHIRReference: () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/FHIRReference" ),
  FHIRString: () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/FHIRString" )
}
var pageId

export default {
  name: "Test",
  data: () => ({
      }),
  components: {
    FHIRForm: function() {
      return new Promise(resolve => {
        let template = '<div class="fhir"><FHIRExtension data="ext from data '+pageId+'"><FHIRReference data="ref from data"><FHIRString data="str from data" /></FHIRReference></FHIRExtension></div>'
        resolve({components: comps, template: template})
      })
    }
  },
  created: function() {
    pageId = this.$route.params.id
  }
}

</script>
