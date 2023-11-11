"use strict";(self["webpackChunkiHRIS_v5"]=self["webpackChunkiHRIS_v5"]||[]).push([[3200],{3200:function(e,t,i){i.r(t),i.d(t,{default:function(){return L}});var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-container",{attrs:{"grid-list-xs":""}},[i("v-overlay",{attrs:{value:e.overlay}},[i("v-progress-circular",{attrs:{color:"primary",indeterminate:"",size:"50"}}),i("v-btn",{attrs:{icon:""},on:{click:function(t){e.overlay=!1}}},[i("v-icon",[e._v("mdi-close")])],1)],1),i("v-navigation-drawer",{staticClass:"primary darken-1 white--text",staticStyle:{"z-index":"3"},attrs:{app:"",clipped:"",permanent:"",right:""}},[i("v-list",{staticClass:"white--text"},[i("v-list-item",[i("v-btn",{staticClass:"secondary",attrs:{dark:""},on:{click:function(t){return e.$router.push("/resource/view/bwpractitioner/"+e.queries.practitioner)}}},[i("v-icon",{attrs:{light:"",left:""}},[e._v("mdi-eye")]),i("span",[e._v("View Health Profession")])],1)],1),i("v-divider",{attrs:{color:"white"}}),e.canRenewLicense?i("v-list-item",[i("v-btn",{staticClass:"primary",attrs:{dark:""},on:{click:function(t){e.renewDialog=!0}}},[i("v-icon",{attrs:{light:"",left:""}},[e._v("mdi-autorenew")]),i("span",[e._v("Renew License")])],1)],1):e._e(),e.canPrintCertificate?i("v-list-item",[i("v-btn",{staticClass:"blue",attrs:{dark:""},on:{click:function(t){return e.print_certificate("initial_certificate")}}},[i("v-icon",{attrs:{light:"",left:""}},[e._v("mdi-download")]),i("span",[e._v("Intial Certificate")])],1)],1):e._e(),e.canPrintCertificate?i("v-list-item",[i("v-btn",{staticClass:"blue",attrs:{dark:""},on:{click:function(t){return e.print_certificate("practising_certificate")}}},[i("v-icon",{attrs:{light:"",left:""}},[e._v("mdi-download")]),i("span",[e._v("Practising Certificate")])],1)],1):e._e(),e.canPrintCertificate?i("v-list-item",[i("v-btn",{staticClass:"blue",attrs:{dark:""},on:{click:function(t){return e.print_certificate("provisional_certificate")}}},[i("v-icon",{attrs:{light:"",left:""}},[e._v("mdi-download")]),i("span",[e._v("Provisional Certificate")])],1)],1):e._e()],1)],1),i("v-dialog",{attrs:{persistent:"","max-width":"500px",transition:"dialog-transition"},model:{value:e.renewDialog,callback:function(t){e.renewDialog=t},expression:"renewDialog"}},[i("v-card",[i("v-toolbar",{staticClass:"darken-1 white--text text-uppercase font-weight-bold",attrs:{color:"primary",dark:""}},[e._v(" License Renewal "),i("v-spacer"),i("v-btn",{attrs:{icon:"",color:"white"},on:{click:function(t){e.renewDialog=!1}}},[i("v-icon",[e._v("mdi-close")])],1)],1),i("v-card-text",[i("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on;return[i("v-text-field",e._g({attrs:{label:"Renewal Date*","prepend-icon":"mdi-event",readonly:""},model:{value:e.renewalDateFormatted,callback:function(t){e.renewalDateFormatted=t},expression:"renewalDateFormatted"}},r))]}}]),model:{value:e.dateMenu,callback:function(t){e.dateMenu=t},expression:"dateMenu"}},[i("v-date-picker",{on:{change:function(t){e.renewalDateFormatted=e.formatDate(e.renewalDate)},input:function(t){e.dateMenu=!1}},model:{value:e.renewalDate,callback:function(t){e.renewalDate=t},expression:"renewalDate"}})],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"success",disabled:!e.renewalDate},on:{click:e.renew}},[e._v("Renew")])],1)],1)],1),i("bw-page-view",{key:e.regCompKey,attrs:{id:e.queries.id,page:"nmcb-registration"}}),e.license.resource.id?i("bw-page-view",{key:e.licenseCompKey,attrs:{id:e.license.resource.id,page:"nmcb-license"}}):e._e()],1)},n=[],a={props:["queries"],data(){return{overlay:!1,loading:!1,renewDialog:!1,renewalDate:"",dateMenu:!1,renewalDateFormatted:"",regStatusCodes:[],regCompKey:"registration0",licenseCompKey:"license0",registration:{resource:{},statusCode:"",registrationStatus:{}},license:{resource:{}}}},computed:{canRenewLicense(){return!("nmcb-role-records-officer"!==this.$store.state.user.role||!this.registration.statusCode||"active"!=this.registration.statusCode&&"lapsed"!=this.registration.statusCode)},canPrintCertificate(){return!("nmcb-role-records-officer"!==this.$store.state.user.role||!this.registration.statusCode||"active"!=this.registration.statusCode)}},methods:{formatDate(e){if(!e)return null;const[t,i,r]=e.split("-");return`${r}-${i}-${t}`},print_certificate(e){this.overlay=!0,fetch("/site/nmcb/"+e+"/"+this.queries.practitioner).then((e=>{e.blob().then((e=>{fetch("/fhir/Practitioner/"+this.queries.practitioner).then((t=>{t.json().then((t=>{this.overlay=!1;let i="",r=t.name.find((e=>{e.use}));if(!r&&t.name&&t.name.length>0&&(r=t.name[0]),r){let e=r.extension&&r.extension.find((e=>"http://ihris.org/fhir/StructureDefinition/ihris-practitioner-prefix"===e.url));e&&(i+=e.valueCoding.display),r.given&&(i&&(i+=" "),i+=r.given.join(" ")),r.family&&(i&&(i+=" "),i+=r.family)}let n=document.createElement("a");n.href=window.URL.createObjectURL(e),n.download=`${i}.pdf`,n.click()})).catch((()=>{this.overlay=!1}))})).catch((()=>{this.overlay=!1}))})).catch((()=>{this.overlay=!1}))})).catch((()=>{this.overlay=!1}))},renew(){this.overlay=!0,this.renewDialog=!1;let e,t=this.license.resource.extension.find((e=>"http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference"===e.url)).valueReference.reference,i=this.license.resource.extension.find((e=>"http://ihris.org/fhir/StructureDefinition/nmcb-registration-reference"===e.url)).valueReference.reference,r=this.license.resource.extension.find((e=>"http://ihris.org/fhir/StructureDefinition/license-number"===e.url)).valueString;e=this.renewalDate.split("-")[1]>=9?this.$moment(this.renewalDate).add(1,"years").endOf("year").format("YYYY-MM-DD"):this.$moment(this.renewalDate).endOf("year").format("YYYY-MM-DD");let n={resourceType:"Basic",meta:{profile:["http://ihris.org/fhir/StructureDefinition/nmcb-license-profile"]},extension:[{url:"http://ihris.org/fhir/StructureDefinition/start-date",valueDate:this.renewalDate},{url:"http://ihris.org/fhir/StructureDefinition/end-date",valueDate:e},{url:"http://ihris.org/fhir/StructureDefinition/license-number",valueString:r},{url:"http://ihris.org/fhir/StructureDefinition/nmcb-registration-reference",valueReference:{reference:i}},{url:"http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference",valueReference:{reference:t}},{url:"http://ihris.org/fhir/StructureDefinition/ihris-related-group",extension:[{url:"practitioner",valueString:t}]}]},a={method:"POST",headers:{"Content-Type":"application/fhir+json"},redirect:"manual",body:JSON.stringify(n)};fetch("/fhir/Basic",a).then((e=>{this.overlay=!1,201===e.status?(this.getLatestLicense(),this.$store.commit("setMessage",{type:"success",text:"License Renewed"})):this.$store.commit("setMessage",{type:"error",text:"Failed to renew license."})})).catch((()=>{this.overlay=!1,this.$store.commit("setMessage",{type:"error",text:"Failed to renew license."})}))},getLatestLicense(){fetch("/fhir/Basic?_profile=http://ihris.org/fhir/StructureDefinition/nmcb-license-profile&_count=1&_sort=-_id&nmcbregistration=Basic/"+this.queries.id).then((e=>{e.json().then((e=>{e.entry&&e.entry.length>0&&(this.license.resource=e.entry[0].resource,this.licenseCompKey="license"+ ++this.licenseCompKey.split("license")[1])}))}))},getRegistration(){fetch("/fhir/Basic/"+this.queries.id).then((e=>e.json().then((e=>{this.registration.resource=e,this.registration.registrationStatus=e.extension.find((e=>"http://ihris.org/fhir/StructureDefinition/nmcb-registration-status"===e.url)).valueCoding,this.registration.statusCode=this.registration.registrationStatus.code,this.regCompKey="registration"+ ++this.regCompKey.split("registration")[1]}))))},activateChangeStatus(){0===this.LicenseChangeStatusCodes.length&&this.loadLicenseChangeStatusCodes(),this.changeLicenseStatusDialog=!0},async loadRegStatusCodes(){this.loading=!0,this.regStatusCodes=await this.$fhirutils.expand("http://ihris.org/fhir/StructureDefinition/nmcb-registration-status-valueset"),this.loading=!1}},created(){this.getRegistration(),setTimeout((()=>{this.getLatestLicense()}),600)},components:{"bw-page-view":()=>i.e(6688).then(i.bind(i,6688))}},s=a,o=i(3736),c=i(3453),l=i.n(c),u=i(3150),h=i(2371),d=i(7118),f=i(4228),g=i(9771),p=i(4497),v=i(1418),m=i(6428),w=i(6816),y=i(7620),D=i(1152),C=i(5132),b=i(1058),_=i(624),S=i(9762),k=i(5978),x=i(6656),V=(0,o.Z)(s,r,n,!1,null,null,null),L=V.exports;l()(V,{VBtn:u.Z,VCard:h.Z,VCardActions:d.h7,VCardText:d.ZB,VContainer:f.Z,VDatePicker:g.Z,VDialog:p.Z,VDivider:v.Z,VIcon:m.Z,VList:w.Z,VListItem:y.Z,VMenu:D.Z,VNavigationDrawer:C.Z,VOverlay:b.Z,VProgressCircular:_.Z,VSpacer:S.Z,VTextField:k.Z,VToolbar:x.Z})}}]);
//# sourceMappingURL=3200.057d4630.js.map