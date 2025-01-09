"use strict";(self["webpackChunkiHRIS_v5"]=self["webpackChunkiHRIS_v5"]||[]).push([[4105,8754],{8412:function(e,t,i){i.r(t),i.d(t,{default:function(){return m}});var n,r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ihris-template",{key:e.$route.path},[e._v(" Loading... ")])},a=[],o=i(70538),s={name:"fhir-page-search",data:function(){return{}},created:function(){this.getTemplate()},methods:{getTemplate:function(){fetch("/config/page/"+n+"/search").then((e=>{e.json().then((e=>{"OperationOutcome"===e.resourceType?o["default"].component("ihris-template",{name:"ihris-template",data:function(){return{issues:e.issue}},components:{"ihris-outcome":()=>i.e(2269).then(i.bind(i,5532))},template:'<div><ihris-outcome :issues="issues"></ihris-outcome></div>'}):o["default"].component("ihris-template",{name:"ihris-template",data:function(){return{fields:e.data.fields,addLink:e.data.addLink,terms:{}}},components:{"ihris-search":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(2242)]).then(i.bind(i,9942)),"ihris-search-code":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(2242)]).then(i.bind(i,15975)),"ihris-search-term":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(2242)]).then(i.bind(i,21841))},template:e.template,methods:{searchData:function(e,t){this.$set(this.terms,e,t)}}}),this.$forceUpdate()})).catch((e=>{console.log(e),o["default"].component("ihris-template",{template:"<div><h1>Error</h1><p>An error occurred trying to load this page</p>.</div>"}),this.$forceUpdate()}))})).catch((e=>{console.log(e),o["default"].component("ihris-template",{template:"<div><h1>Error</h1><p>An error occurred trying to load this page</p>.</div>"}),this.$forceUpdate()}))}},components:{},beforeCreate:function(){n=this.$route.params.page,o["default"].component("ihris-template",{template:"<div>Loading...</div>"})}},h=s,l=i(43736),d=(0,l.Z)(h,r,a,!1,null,null,null),m=d.exports},78754:function(e,t,i){i.r(t),i.d(t,{default:function(){return u}});var n,r,a,o,s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ihris-template",{key:e.$route.path,on:{"templates-loaded":e.templatesLoaded}},[e._v(" Loading... ")])},h=[],l=i(70538),d={name:"fhir-page-view",props:["id","version","page"],data:function(){return{}},created:function(){!n&&this.id&&(n=this.id),!r&&this.version&&(r=this.version),!a&&this.page&&(a=this.page),this.getTemplate()},methods:{templatesLoaded(){this.$emit("templates-loaded")},getTemplate:function(){fetch("/config/page/"+a).then((e=>{e.json().then((e=>{"OperationOutcome"===e.resourceType?l["default"].component("ihris-template",{name:"ihris-template",data:function(){return{issues:e.issue}},components:{"ihris-outcome":()=>i.e(2269).then(i.bind(i,5532))},template:'<div><ihris-outcome :issues="issues"></ihris-outcome></div>'}):l["default"].component("ihris-template",{name:"ihris-template",data:function(){return{fhirId:n,fhirVersion:r,isEdit:o,sectionMenu:e.data.sectionMenu,subFields:e.data.subFields,columns:e.data.columns,actions:e.data.actions,links:e.data.links,mounts:e.data.mounts,constraints:e.data.constraints}},created(){this.$emit("templates-loaded")},components:{"ihris-practitioner-intro":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,62765)),"ihris-resource":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,34790)),"ihris-codesystem":()=>i.e(902).then(i.bind(i,96462)),"ihris-section":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,26181)),"ihris-secondary":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,40371)),"ihris-array":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,79486)),"fhir-extension":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,91355)),"fhir-reference":()=>Promise.all([i.e(3986),i.e(591),i.e(1904),i.e(6049),i.e(2890),i.e(8384)]).then(i.bind(i,41904)),"fhir-backbone-element":()=>Promise.all([i.e(3986),i.e(591),i.e(1904),i.e(6049),i.e(2890),i.e(8384)]).then(i.bind(i,35447)),"fhir-string":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,58245)),"fhir-attachment":()=>Promise.all([i.e(3986),i.e(591),i.e(1904),i.e(6049),i.e(2890),i.e(8384)]).then(i.bind(i,46049)),"fhir-human-name":()=>i.e(1364).then(i.bind(i,8667)),"fhir-code":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,20603)),"fhir-date":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,21854)),"fhir-date-time":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,50425)),"fhir-period":()=>Promise.all([i.e(3986),i.e(591),i.e(1904),i.e(6049),i.e(2890),i.e(8384)]).then(i.bind(i,85481)),"fhir-identifier":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,53858)),"fhir-contact-point":()=>Promise.all([i.e(3986),i.e(591),i.e(1904),i.e(6049),i.e(2890),i.e(8384)]).then(i.bind(i,76010)),"fhir-address":()=>Promise.all([i.e(3986),i.e(591),i.e(1904),i.e(6049),i.e(2890),i.e(8384)]).then(i.bind(i,65537)),"fhir-codeable-concept":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,2692)),"fhir-uri":()=>Promise.all([i.e(3986),i.e(591),i.e(1904),i.e(6049),i.e(2890),i.e(8384)]).then(i.bind(i,95501)),"fhir-boolean":()=>Promise.all([i.e(3986),i.e(591),i.e(1904),i.e(6049),i.e(2890),i.e(8384)]).then(i.bind(i,48125)),"fhir-positive-int":()=>Promise.all([i.e(3986),i.e(591),i.e(1904),i.e(6049),i.e(2890),i.e(8384)]).then(i.bind(i,94211)),"fhir-unsigned-int":()=>Promise.all([i.e(3986),i.e(591),i.e(1904),i.e(6049),i.e(2890),i.e(8384)]).then(i.bind(i,20310)),"fhir-integer":()=>Promise.all([i.e(3986),i.e(591),i.e(1904),i.e(6049),i.e(2890),i.e(8384)]).then(i.bind(i,83229)),"fhir-coding":()=>Promise.all([i.e(3986),i.e(2200),i.e(3113),i.e(5814),i.e(2657)]).then(i.bind(i,61311)),"fhir-money":()=>Promise.all([i.e(3986),i.e(591),i.e(1904),i.e(6049),i.e(2890),i.e(8384)]).then(i.bind(i,67239)),"fhir-decimal":()=>i.e(7305).then(i.bind(i,67289))},template:e.template,methods:{setEdit:function(e){this.isEdit=e}}}),this.$forceUpdate()})).catch((e=>{console.log(e),l["default"].component("ihris-template",{template:"<div><h1>Error</h1><p>An error occurred trying to load this page</p>.</div>"}),this.$forceUpdate()}))})).catch((e=>{console.log(e),l["default"].component("ihris-template",{template:"<div><h1>Error</h1><p>An error occurred trying to load this page</p>.</div>"}),this.$forceUpdate()}))}},beforeCreate:function(){n=this.$route.params.id,r=this.$route.params.version,a=this.$route.params.page,o=this.$route.query.edit,l["default"].component("ihris-template",{template:"<div>Loading...</div>"})}},m=d,c=i(43736),p=(0,c.Z)(m,s,h,!1,null,null,null),u=p.exports}}]);
//# sourceMappingURL=resource.04cb174b.js.map