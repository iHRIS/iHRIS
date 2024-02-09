"use strict";(self["webpackChunkiHRIS_v5"]=self["webpackChunkiHRIS_v5"]||[]).push([[576],{576:function(i,t,e){e.r(t),e.d(t,{default:function(){return _}});var s=function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("v-container",{attrs:{"grid-list-xs":""}},[e("v-overlay",{attrs:{value:i.overlay}},[e("v-progress-circular",{attrs:{color:"primary",indeterminate:"",size:"50"}}),e("v-btn",{attrs:{icon:""},on:{click:function(t){i.overlay=!1}}},[e("v-icon",[i._v("mdi-close")])],1)],1),e("v-overlay",{attrs:{value:i.overlayUnclosed}},[e("v-progress-circular",{attrs:{color:"primary",indeterminate:"",size:"50"}})],1),e("v-navigation-drawer",{staticClass:"primary darken-1 white--text",staticStyle:{"z-index":"3"},attrs:{app:"",clipped:"",permanent:"",right:""}},[e("v-list",{staticClass:"white--text"},[e("v-list-item",[e("v-btn",{staticClass:"secondary",attrs:{dark:""},on:{click:function(t){return i.$router.push("/resource/view/applicant/"+i.practitionerId)}}},[e("v-icon",{attrs:{light:"",left:""}},[i._v("mdi-eye")]),e("span",[i._v("View Health Profession")])],1)],1),e("v-list-item",[e("v-btn",{staticClass:"primary",attrs:{disabled:!i.canAddShortlist,dark:"",small:""},on:{click:function(t){return i.$router.push("/questionnaire/interview-shortlist/interview-shortlist?practitioner="+i.practitionerId+"&application="+i.queries.id)}}},[e("v-icon",{attrs:{light:"",left:""}},[i._v("mdi-plus")]),e("span",[i._v("Interview Shortlist")])],1)],1),e("v-list-item",[e("v-btn",{staticClass:"primary",attrs:{disabled:!i.canAddAssessment,dark:"",small:""},on:{click:function(t){return i.$router.push("/questionnaire/post-interview/post-interview?practitioner="+i.practitionerId+"&application="+i.queries.id)}}},[e("v-icon",{attrs:{light:"",left:""}},[i._v("mdi-plus")]),e("span",[i._v("Interview Assessments")])],1)],1),e("v-list-item",[e("v-btn",{staticClass:"primary",attrs:{disabled:!i.canAddHiring,dark:"",small:""},on:{click:function(t){return i.$router.push("/questionnaire/hiring-decision/hiring-decision?practitioner="+i.practitionerId+"&application="+i.queries.id)}}},[e("v-icon",{attrs:{light:"",left:""}},[i._v("mdi-plus")]),e("span",[i._v("Hiring Decision")])],1)],1),e("v-list-item",[e("v-btn",{staticClass:"primary",attrs:{disabled:!i.canSetPosition,dark:"",small:""},on:{click:function(t){return i.$router.push("/questionnaire/assign-position/practitioner-role?practitioner="+i.practitionerId+"&application="+i.queries.id)}}},[e("v-icon",{attrs:{light:"",left:""}},[i._v("mdi-plus")]),e("span",[i._v("Set Position")])],1)],1)],1)],1),e("v-row",[e("v-col",[e("bw-page-view",{attrs:{id:i.queries.id,page:"application"}}),i.shortlist.id?e("bw-page-view",{attrs:{id:i.shortlist.id,page:"interview-shortlist"}}):i._e(),i.assessment.id?e("bw-page-view",{attrs:{id:i.assessment.id,page:"post-interview"}}):i._e(),i.hiring.id?e("bw-page-view",{attrs:{id:i.hiring.id,page:"hiring-decision"}}):i._e()],1)],1)],1)},r=[];e(6699);const n=e(7673);var a={props:["queries"],data(){return{overlay:!1,overlayUnclosed:!1,practitionerId:"",shortlist:{id:""},assessment:{id:""},hiring:{id:""},position:{id:""}}},methods:{hasTask(i){return!!this.$store.state.user.obj.roles.includes("ihris-role-admin")||this.$store.state.user.obj.permissions&&this.$store.state.user.obj.permissions.special&&this.$store.state.user.obj.permissions.special.special&&this.$store.state.user.obj.permissions.special.special.id&&this.$store.state.user.obj.permissions.special.special.id[i]},getApplication(){fetch("/fhir/Basic/"+this.queries.id).then((i=>{i.json().then((i=>{let t=i.extension.find((i=>"http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference"===i.url));this.practitionerId=t.valueReference.reference.split("/")[1],setTimeout((()=>{this.getInterviewShortList()}),1e3)}))}))},getInterviewShortList(){let i={_profile:"http://ihris.org/fhir/StructureDefinition/interview-shortlist-profile",jobapplication:"Basic/"+this.queries.id,practitioner:this.practitionerId};fetch("/fhir/Basic?"+n.stringify(i)).then((i=>i.json().then((i=>{i.entry&&i.entry.length>0?(this.shortlist.id=i.entry[0].resource.id,setTimeout((()=>{this.getInterviewAssessment()}),1e3)):this.overlayUnclosed=!1}))))},getInterviewAssessment(){let i={_profile:"http://ihris.org/fhir/StructureDefinition/post-interview-profile",jobapplication:"Basic/"+this.queries.id,practitioner:this.practitionerId};fetch("/fhir/Basic?"+n.stringify(i)).then((i=>i.json().then((i=>{i.entry&&i.entry.length>0?(this.assessment.id=i.entry[0].resource.id,setTimeout((()=>{this.getHiringDecision()}),1e3)):this.overlayUnclosed=!1}))))},getHiringDecision(){let i={_profile:"http://ihris.org/fhir/StructureDefinition/hiring-decision-profile",jobapplication:"Basic/"+this.queries.id,practitioner:this.practitionerId};fetch("/fhir/Basic?"+n.stringify(i)).then((i=>i.json().then((i=>{i.entry&&i.entry.length>0?(this.hiring.id=i.entry[0].resource.id,this.overlayUnclosed=!1):this.overlayUnclosed=!1}))))}},computed:{canSetPosition(){return!!this.hasTask("set-position")&&!this.position.id},canAddShortlist(){return!!this.hasTask("shortlist-applicant")&&!this.shortlist.id},canAddAssessment(){return!!this.hasTask("applicant-interview-assessment")&&!(!this.shortlist.id||this.assessment.id)},canAddHiring(){return!!this.hasTask("applicant-hiring-decision")&&!(!this.assessment.id||this.hiring.id)}},created(){this.overlayUnclosed=!0,this.getApplication()},components:{"bw-page-view":()=>e.e(6688).then(e.bind(e,6688))}},o=a,l=e(3736),c=e(3453),p=e.n(c),h=e(3150),d=e(2102),u=e(4228),v=e(6428),g=e(6816),m=e(7620),f=e(5132),w=e(1058),y=e(624),b=e(2877),k=(0,l.Z)(o,s,r,!1,null,null,null),_=k.exports;p()(k,{VBtn:h.Z,VCol:d.Z,VContainer:u.Z,VIcon:v.Z,VList:g.Z,VListItem:m.Z,VNavigationDrawer:f.Z,VOverlay:w.Z,VProgressCircular:y.Z,VRow:b.Z})}}]);
//# sourceMappingURL=576.02748d8d.js.map