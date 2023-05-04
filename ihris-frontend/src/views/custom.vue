<template>
  <component 
    :is="currentComponent" 
    :queries="this.$route.query" 
  />
</template>
<script>
export default {
  props: ["component"],
  data() {
    return {
        currentComponent: ""
    }
  },
  created() {
    let componentPath = ""
    if(this.$route.query.path) {
      let actualPath = this.$route.query.path.split('/')
      for(let path of actualPath) {
        if(!path) {
          continue
        }
        componentPath += "/" + path
      }
    }
    componentPath += "/" + this.$route.params.component
    if(!componentPath.endsWith(".vue")) {
      componentPath += ".vue"
    }
    this.currentComponent = () => import(`@/site${componentPath}`)
  }
}
</script>