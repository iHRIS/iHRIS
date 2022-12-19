"use strict";(self["webpackChunkiHRIS_v5"]=self["webpackChunkiHRIS_v5"]||[]).push([[657,364],{6907:function(t,e,s){s.r(e),s.d(e,{default:function(){return p}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ihris-element",{attrs:{edit:t.edit,loading:t.loading},scopedSlots:t._u([{key:"form",fn:function(){return[s("v-select",{attrs:{loading:t.loading,label:t.$t("App.fhir-resources-texts."+t.display),items:t.items.filter((function(t){return!t.code.includes("(deactivated)")})),outlined:"","hide-details":"auto","error-messages":t.errors,"item-text":"display","item-value":"code",disabled:t.disabled,rules:t.rules,dense:""},on:{change:function(e){t.errors=[]}},scopedSlots:t._u([{key:"label",fn:function(){return[t._v(t._s(t.$t("App.fhir-resources-texts."+t.display))+" "),t.required?s("span",{staticClass:"red--text font-weight-bold"},[t._v("*")]):t._e()]},proxy:!0}]),model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})]},proxy:!0},{key:"header",fn:function(){return[t._v(" "+t._s(t.$t("App.fhir-resources-texts."+t.display))+" ")]},proxy:!0},{key:"value",fn:function(){return[t._v(" "+t._s(t.displayValue)+" ")]},proxy:!0}])})},r=[],o=s(2130),a={name:"fhir-code",props:["field","min","max","base-min","base-max","label","binding","slotProps","path","edit","sliceName","readOnlyIfSet","constraints"],components:{IhrisElement:o.Z},data:function(){return{value:"",loading:!0,errors:[],items:[],source:{path:"",data:{},binding:this.binding},disabled:!1,lockWatch:!1}},created:function(){this.setupData()},watch:{slotProps:{handler(){this.lockWatch||this.setupData()},deep:!0}},methods:{setupData(){if(this.slotProps&&this.slotProps.source){if(this.source={path:this.slotProps.source.path+"."+this.field,data:{}},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data,this.value=this.source.data,this.lockWatch=!0;else{let t=this.$fhirutils.pathFieldExpression(this.field);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,t),1==this.source.data.length&&(this.value=this.source.data[0],this.lockWatch=!0)}this.disabled=this.readOnlyIfSet&&!!this.value}let t=this.binding||this.slotProps.source.binding;this.$fhirutils.expand(t).then((t=>{this.items=t,this.loading=!1})).catch((t=>{console.log(t),this.errors.push(t.message),this.loading=!1}))}},computed:{index:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.index:void 0},display:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.label:this.label},displayValue:function(){let t=this.items.find((t=>t.code===this.value));return t?t.display:""},required:function(){return(this.index||0)<this.min},rules:function(){return this.required?[t=>!!t||this.display+" is required"]:[]}}},n=a,l=s(3736),c=s(3453),d=s.n(c),h=s(3986),u=(0,l.Z)(n,i,r,!1,null,null,null),p=u.exports;d()(u,{VSelect:h.Z})},2692:function(t,e,s){s.r(e),s.d(e,{default:function(){return c}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._t("default",null,{source:t.source})],2)},r=[],o={name:"fhir-codeable-concept",props:["field","slotProps","sliceName","min","max","base-min","base-max","label","path","binding","edit","constraints"],data:function(){return{source:{path:"",data:{},binding:this.binding},errors:[]}},created:function(){this.setupData()},watch:{slotProps:{handler(){this.setupData()},deep:!0}},methods:{setupData:function(){if(this.slotProps&&this.slotProps.source)if(this.source={path:this.slotProps.source.path+"."+this.field,data:{},binding:this.binding},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data;else{let t=this.$fhirutils.pathFieldExpression(this.field);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,t)}}},computed:{display:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.label:this.label}}},a=o,n=s(3736),l=(0,n.Z)(a,i,r,!1,null,null,null),c=l.exports},4831:function(t,e,s){s.r(e),s.d(e,{default:function(){return p}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ihris-element",{attrs:{edit:t.edit,loading:t.loading},scopedSlots:t._u([{key:"form",fn:function(){return[s("v-select",{attrs:{loading:t.loading,label:t.display,items:t.items.filter((function(t){return!t.code.includes("(deactivated)")})),outlined:"","hide-details":"auto","error-messages":t.errors,"item-text":"display","item-value":"code",disabled:t.disabled,rules:t.rules,dense:""},on:{change:function(e){t.errors=[]}},scopedSlots:t._u([{key:"label",fn:function(){return[t._v(t._s(t.$t("App.fhir-resources-texts."+t.label))+" "),t.required?s("span",{staticClass:"red--text font-weight-bold"},[t._v("*")]):t._e()]},proxy:!0}]),model:{value:t.valueCode,callback:function(e){t.valueCode=e},expression:"valueCode"}})]},proxy:!0},{key:"header",fn:function(){return[t._v(" "+t._s(t.$t("App.fhir-resources-texts."+t.display))+" ")]},proxy:!0},{key:"value",fn:function(){return[t._v(" "+t._s(t.valueDisplay||t.value.display||"")+" ")]},proxy:!0}])})},r=[],o=s(2130),a={name:"fhir-coding",props:["field","label","sliceName","targetprofile","min","max","base-min","base-max","slotProps","path","binding","edit","readOnlyIfSet","constraints"],components:{IhrisElement:o.Z},data:function(){return{value:{system:"",code:"",display:""},valueCode:"",valueDisplay:"",loading:!0,errors:[],items:[],source:{path:"",data:{},binding:this.binding},disabled:!1,lockWatch:!1}},created:function(){this.setupData()},watch:{slotProps:{handler(){this.lockWatch||this.setupData()},deep:!0},valueCode:function(t){if(this.items){let e=this.items.find((e=>e.code===t));e&&(this.value=e)}this.value.system&&this.value.code&&this.$fhirutils.codeLookup(this.value.system,this.value.code,this.binding||this.source.binding).then((t=>{this.valueDisplay=t}))}},methods:{setupData:function(){if(this.slotProps&&this.slotProps.source){if(this.source={path:this.slotProps.source.path+"."+this.field,data:{},binding:this.binding||this.slotProps.source.binding},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data,this.source.data&&(this.value=this.source.data,this.valueCode=this.value.code,this.lockWatch=!0);else{let t=this.$fhirutils.pathFieldExpression(this.field);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,t),this.source.data[0]&&(this.value=this.source.data[0],this.valueCode=this.value.code,this.lockWatch=!0)}this.disabled=this.readOnlyIfSet&&!!this.valueCode}let t=this.binding||this.slotProps.source.binding;this.$fhirutils.expand(t).then((t=>{this.items=t,this.loading=!1})).catch((t=>{console.log(t),this.errors=t.message,this.loading=!1}))}},computed:{index:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.index:void 0},display:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.label:this.label},required:function(){return(this.index||0)<this.min},rules:function(){return this.required?[t=>!!t||this.display+" is required"]:[]}}},n=a,l=s(3736),c=s(3453),d=s.n(c),h=s(3986),u=(0,l.Z)(n,i,r,!1,null,null,null),p=u.exports;d()(u,{VSelect:h.Z})},3886:function(t,e,s){s.r(e),s.d(e,{default:function(){return c}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._t("default",null,{source:t.source})],2)},r=[],o={name:"fhir-extension",props:["field","sliceName","min","max","base-min","base-max","profile","slotProps","path","edit","constraints"],data:function(){return{source:{path:"",data:[]},errors:[]}},created:function(){this.setupData()},watch:{slotProps:{handler(){this.setupData()},deep:!0}},methods:{setupData:function(){if(this.slotProps&&this.slotProps.source)if(this.source={path:this.slotProps.source.path+"."+this.field,data:{}},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data;else{let t;t=this.profile?this.profile:this.sliceName;let e=this.field.replace(/([^:]+):(.+)/,"$1.where(url='"+t+"')");this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,e)}}}},a=o,n=s(3736),l=(0,n.Z)(a,i,r,!1,null,null,null),c=l.exports},8667:function(t,e,s){s.r(e),s.d(e,{default:function(){return d}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ihris-complex-card",{attrs:{complexField:t.field,slotProps:t.slotProps,label:t.label,errors:t.errors},scopedSlots:t._u([{key:"default",fn:function(e){return[t._t("default",null,{source:e.source})]}}],null,!0)})},r=[],o=s(7085),a={name:"fhir-human-name",props:["field","slotProps","sliceName","min","max","base-min","base-max","label","path","edit","constraints"],data:function(){return{errors:[]}},components:{IhrisComplexCard:o.Z}},n=a,l=s(3736),c=(0,l.Z)(n,i,r,!1,null,null,null),d=c.exports},3858:function(t,e,s){s.r(e),s.d(e,{default:function(){return d}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ihris-complex-card",{attrs:{complexField:t.field,slotProps:t.slotProps,label:t.label,errors:t.errors},scopedSlots:t._u([{key:"default",fn:function(e){return[t._t("default",null,{source:e.source})]}}],null,!0)})},r=[],o=s(7085),a={name:"fhir-identifier",props:["field","slotProps","sliceName","min","max","base-min","base-max","label","path","edit","constraints"],data:function(){return{errors:[]}},components:{IhrisComplexCard:o.Z}},n=a,l=s(3736),c=(0,l.Z)(n,i,r,!1,null,null,null),d=c.exports},7085:function(t,e,s){s.d(e,{Z:function(){return p}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-card",[s("v-card-subtitle",{staticClass:"primary--text text-uppercase font-weight-bold"},[t._v(t._s(t.$t("App.fhir-resources-texts."+t.display))+" ("+t._s(++this.slotProps.count)+")")]),t._l(t.errors,(function(e,i){return s("v-card-text",{key:i,staticClass:"error white--text font-weight-bold"},[t._v(t._s(e))])})),s("v-card-text",[t._t("default",null,{source:t.source})],2)],2)},r=[],o={name:"ihris-complex-card",props:["complexField","slotProps","label","errors"],data:function(){return{source:{path:"",data:{}}}},created:function(){this.setupData()},watch:{slotProps:{handler(){this.setupData()},deep:!0}},methods:{setupData:function(){if(this.slotProps&&this.slotProps.source)if(this.source={path:this.slotProps.source.path+"."+this.complexField,data:{}},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data;else{let t=this.$fhirutils.pathFieldExpression(this.complexField);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,t)}}},computed:{display:function(){return this.label}}},a=o,n=s(3736),l=s(3453),c=s.n(l),d=s(2371),h=s(7118),u=(0,n.Z)(a,i,r,!1,null,null,null),p=u.exports;c()(u,{VCard:d.Z,VCardSubtitle:h.Qq,VCardText:h.ZB})},2130:function(t,e,s){s.d(e,{Z:function(){return v}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.edit?s("v-container",[t._t("form")],2):s("div",[s("v-row",{attrs:{dense:""}},[s("v-col",{staticClass:"font-weight-bold",attrs:{cols:t.$store.state.cols.header}},[t._t("header")],2),t.loading?s("v-col",{attrs:{cols:t.$store.state.cols.content}},[s("v-progress-linear",{attrs:{indeterminate:"",color:"primary"}})],1):s("v-col",{attrs:{cols:t.$store.state.cols.content}},[t._t("value")],2)],1),s("v-divider")],1)],1)},r=[],o={name:"ihris-element",props:["edit","loading"]},a=o,n=s(3736),l=s(3453),c=s.n(l),d=s(2102),h=s(4228),u=s(1418),p=s(7003),f=s(2877),m=(0,n.Z)(a,i,r,!1,null,null,null),v=m.exports;c()(m,{VCol:d.Z,VContainer:h.Z,VDivider:u.Z,VProgressLinear:p.Z,VRow:f.Z})},4375:function(t,e,s){s.r(e),s.d(e,{default:function(){return y}});var i=function(){var t=this,e=this,s=e.$createElement,i=e._self._c||s;return!e.intro.closed&&this.intro.fullName?i("div",{class:[e.hasScrolled||this.isQuestionnaire?"show":"hide"],staticStyle:{padding:"0"}},[i("v-snackbar",{attrs:{color:"white",bottom:e.bottom,right:e.right,timeout:e.timeout,width:"320"},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[i("div",[i("v-card",{attrs:{height:"400",elevation:"0",color:"white",width:"320"}},[i("template",{slot:"progress"},[i("v-progress-linear",{attrs:{color:"deep-purple",height:"10",indeterminate:""}})],1),i("v-card-title",{staticClass:"justify-end",staticStyle:{"padding-top":"4px","padding-bottom":"4px"}},[i("v-btn",{attrs:{color:"deep-purple lighten-2",icon:""},on:{click:function(){t.intro.closed=!0}}},[i("v-icon",[e._v("mdi-close-circle-outline")])],1)],1),i("v-card-title",{staticClass:"justify-center",staticStyle:{"padding-top":"4px","padding-bottom":"4px"}},[i("v-avatar",{attrs:{size:"120"}},[i("img",{attrs:{alt:e.intro.fullName,src:e.intro.photoURL?e.intro.photoURL:"/images/Blank-Avatar.jpg"}})])],1),i("v-card-title",{staticClass:"justify-center py-0"},[i("span",{staticClass:"black--text"},[e._v(e._s(e.intro.fullName))])]),i("v-card-text",{staticClass:"black--text"},[i("span",[e._v(e._s(e.$t("App.hardcoded-texts.Job Title"))+": "),i("strong",[e._v(e._s(e.intro.jobTitle))])]),i("br"),i("span",[e._v(e._s(e.$t("App.hardcoded-texts.Employer Number"))+": "),i("strong",[e._v(e._s(e.intro.employeeID))])]),i("br"),i("span",[e._v(e._s(e.$t("App.hardcoded-texts.Email"))+": "),i("strong",[e._v(e._s(e.intro.email))])]),i("br"),i("span",[e._v(e._s(e.$t("App.hardcoded-texts.Phone"))+" : "),i("strong",[e._v(e._s(e.intro.phone))])]),i("br"),i("span",[e._v(e._s(e.$t("App.hardcoded-texts.Gender"))+" : "),i("strong",[e._v(e._s(e.intro.gender))])]),i("br"),i("span",[e._v(e._s(e.$t("App.hardcoded-texts.Birth Date"))+" : "),i("strong",[e._v(e._s(e.intro.birthDate))])]),i("br"),i("span",[e._v(" "+e._s(e.$t("App.hardcoded-texts.Age"))+" : "),i("strong",[e._v(e._s(Math.floor((new Date-new Date(e.intro.birthDate))/31536e6)))])]),i("br")])],2)],1)])],1):e._e()},r=[],o={name:"ihris-practitioner-intro",props:["slotProps","isQuestionnaire"],data:function(){return{intro:{fullName:"",jobTitle:"",photoURL:"",birthDate:"",gender:"",employeeID:"",closed:!1,emil:"",phone:""},hasScrolled:!1,snackbar:!0,timeout:-1,bottom:!0,right:!0}},components:{},mounted(){this.isQuestionnaire?window.removeEventListener("scroll",this.handleScroll):window.addEventListener("scroll",this.handleScroll)},beforeDestroy(){window.removeEventListener("scroll",this.handleScroll)},watch:{slotProps:{handler(){this.lockWatch||this.setupData()},deep:!0}},methods:{setupData(){if(this.slotProps&&this.slotProps.source&&this.slotProps.source.data){let t=this.slotProps.source.data,e="";t&&t.name[0]?.prefix&&t.name[0]?.prefix.length&&(e=t.name[0].prefix[0]),this.intro.fullName=`${e} ${t?.name[0]?.given[0]} ${t?.name[0]?.family}`,this.intro.email=t?.telecom?.find((t=>"email"===t.system))?.value,this.intro.phone=t?.telecom?.find((t=>"phone"===t.system))?.value,this.intro.jobTitle=this.slotProps.position,this.intro.gender=t?.gender,this.intro.birthDate=t?.birthDate,this.intro.employeeID=t?.identifier?t?.identifier[0]?.value:"";let s="";if(t.photo&&(s=t?.photo[0]),s.data&&s.contentType){let t="data:"+s.contentType+";base64,"+s.data;fetch(t).then((t=>t.blob())).then((t=>{this.intro.photoURL=URL.createObjectURL(t)})).catch((t=>{console.log("Failed to get data from base64.",t)}))}}},handleScroll(){this.hasScrolled=window.top.scrollY>=100}}},a=o,n=s(3736),l=s(3453),c=s.n(l),d=s(6370),h=s(3150),u=s(2371),p=s(7118),f=s(6428),m=s(7003),v=s(3202),g=(0,n.Z)(a,i,r,!1,null,"35101bbf",null),y=g.exports;c()(g,{VAvatar:d.Z,VBtn:h.Z,VCard:u.Z,VCardText:p.ZB,VCardTitle:p.EB,VIcon:f.Z,VProgressLinear:m.Z,VSnackbar:v.Z})},1949:function(t,e,s){s.r(e),s.d(e,{default:function(){return C}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{staticClass:"my-3"},[s("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[t._t("default",null,{position:t.position,source:t.source}),s("v-overlay",{attrs:{value:t.overlay}},[s("v-progress-circular",{attrs:{color:"primary",indeterminate:"",size:"50"}})],1),s("v-navigation-drawer",{staticClass:"primary darken-1 white--text",staticStyle:{"z-index":"3"},attrs:{app:"",clipped:"",permanent:"",right:""}},[s("v-list",{staticClass:"white--text"},[t.$router.history.current.path==="/resource/view/practitioner/"+this.fhirId?s("v-list-item",[s("v-btn",{staticClass:"primary",attrs:{loading:t.loadingId},on:{click:t.printEmployeeId},scopedSlots:t._u([{key:"loader",fn:function(){return[s("span",{staticClass:"custom-loader"},[s("v-icon",{attrs:{light:""}},[t._v("mdi-cached")])],1)]},proxy:!0}],null,!1,1919056595)},[s("v-icon",{staticClass:"mr-2",attrs:{right:""}},[t._v(" mdi-card-account-details-outline ")]),t._v(" "+t._s(t.$t("App.hardcoded-texts.GenerateId"))+" ")],1)],1):t._e(),t.$router.history.current.path==="/resource/view/practitioner/"+this.fhirId?s("v-list-item",[s("v-btn",{staticClass:"primary",attrs:{loading:t.loadingCv},on:{click:t.printEmployeeCv},scopedSlots:t._u([{key:"loader",fn:function(){return[s("span",{staticClass:"custom-loader"},[s("v-icon",{attrs:{light:""}},[t._v("mdi-cached")])],1)]},proxy:!0}],null,!1,1919056595)},[s("v-icon",{staticClass:"mr-2",attrs:{dark:"",right:""}},[t._v(" mdi-file-pdf-box")]),t._v(" "+t._s(t.$t("App.hardcoded-texts.GenerateCv"))+" ")],1)],1):t._e(),s("v-list-item",[t.edit?s("v-btn",{staticClass:"secondary",attrs:{dark:""},on:{click:function(e){return t.$router.go(0)}}},[s("v-icon",{attrs:{light:""}},[t._v("mdi-close-circle-outline")]),s("span",[t._v(t._s(t.$t("App.hardcoded-texts.Cancel")))])],1):s("v-btn",{staticClass:"secondary",attrs:{dark:""},on:{click:function(e){return t.$emit("set-edit",!t.edit)}}},[s("v-icon",{attrs:{light:""}},[t._v("mdi-pencil")]),s("span",[t._v(t._s(t.$t("App.hardcoded-texts.Edit")))])],1),s("v-spacer"),t.edit?[t.valid?s("v-btn",{staticClass:"success darken-1",attrs:{disabled:!t.valid,dark:""},on:{click:function(e){return t.processFHIR()}}},[s("v-icon",{attrs:{light:""}},[t._v("mdi-content-save")]),s("span",[t._v(t._s(t.$t("App.ihardcoded-texts.Save")))])],1):s("v-btn",{staticClass:"warning",attrs:{dark:""},on:{click:function(e){return t.$refs.form.validate()}}},[s("v-icon",{attrs:{light:""}},[t._v("mdi-content-save")]),s("span",[t._v(t._s(t.$t("App.hardcoded-texts.Save")))])],1)]:t._e()],2),s("v-divider",{attrs:{color:"white"}}),!t.edit&&t.links&&t.links.length?t._l(t.links,(function(e,i){return s("v-list-item",{key:e.url},[s("v-btn",{key:e.url,staticClass:"primary",attrs:{text:!e.button,to:t.getLinkUrl(e)}},[e.icon?s("v-icon",{attrs:{light:""}},[t._v(t._s(e.icon))]):t._e(),t._v(" "+t._s(t.linktext[i])+" ")],1)],1)})):t._e(),t.sectionMenu?s("v-subheader",{staticClass:"white--text"},[s("h2",[t._v(t._s(t.$t("App.hardcoded-texts.Sections")))])]):t._e(),t._l(t.sectionMenu,(function(e){return s("v-list-item",{key:e.name,attrs:{href:"#section-"+e.name}},[t.edit&&e.secondary?t._e():s("v-list-item-content",{staticClass:"white--text"},[s("v-list-item-title",{staticClass:"text-uppercase"},[s("h4",[t._v(t._s(t.$t("App.fhir-resources-texts."+e.title)))])]),s("v-list-item-subtitle",{staticClass:"white--text"},[t._v(t._s(t.$t("App.fhir-resources-texts."+e.desc)))])],1)],1)}))],2)],1)],2)],1)},r=[],o=(s(6699),s(9669)),a=s.n(o),n={name:"ihris-resource",props:["title","field","fhir-id","page","profile","section-menu","edit","links","constraints"],data:function(){return{fhir:{},orig:{},valid:!0,source:{data:{},path:""},path:"",loading:!1,overlay:!1,isEdit:!1,linktext:[],position:"",advancedValid:!0,loadingId:!1,loadingCv:!1}},mounted(){this.isQuestionnaire?window.removeEventListener("scroll",this.handleScroll):window.addEventListener("scroll",this.handleScroll)},beforeDestroy(){window.removeEventListener("scroll",this.handleScroll)},created:function(){if(this.fhirId)this.loading=!0,fetch(`/fhir/PractitionerRole?_practitioner=${this.fhirId}`).then((t=>{t.json().then((t=>{if(t.entry){let e=t.entry[0].resource.code[0].coding[0].display;this.position=e||""}})).catch((t=>{console.log(this.field,this.fhirId,t)}))})).catch((t=>{console.log(this.field,this.fhirId,t)})),fetch("/fhir/"+this.field+"/"+this.fhirId).then((t=>{t.json().then((t=>{this.orig=t,this.source={data:t,path:this.field},this.setLinkText(),this.loading=!1})).catch((t=>{console.log(this.field,this.fhirId,t)}))})).catch((t=>{console.log(this.field,this.fhirId,t)}));else if(this.$route.query){let e={resourceType:this.field},s=!1;for(let i of Object.keys(this.$route.query))if(i.startsWith(this.field+".")){s=!0;let r=i.substring(this.field.length+1).split("."),o=r.pop(),a=e;for(let e of r)if(e.includes("["))try{let t=e.split("["),s=t[0],i=t[1].slice(0,-1);if(a.hasOwnProperty(s)||(a[s]=[]),i){let t={};a[s][parseInt(i)]=t,a=t}else{let t={};a[s].push(t),a=t}}catch(t){console.log("Unable to process",i)}else a.hasOwnProperty(e)||(a[e]={},a=a[e]);if(o.includes("["))try{let t=o.split("["),e=t[0],s=t[1].slice(0,-1);a.hasOwnProperty(e)||(a[e]=[]),s?a[e][parseInt(s)]=this.$route.query[i]:a[e].push(this.$route.query[i])}catch(t){console.log("Unable to process",i)}else a[o]=this.$route.query[i]}s&&(this.source={data:e,path:this.field})}},computed:{hasFhirId:function(){return""!=this.fhirId&&!!this.fhirId}},methods:{handleScroll(){this.hasScrolled=window.top.scrollY>=100,this.sectionMenu.map((t=>{let e=document.getElementById(`section-${t.name}`),s=e.offsetTop;pageYOffset>=s&&(this.path=`#section-${t.name}`)}))},getLinkField:function(t){let e=this.$fhirpath.evaluate(this.source.data,t);return!!e&&e[0]},getLinkUrl:function(t){let e;if(t.field&&(e=this.getLinkField(t.field)),e){if(e.includes("/")){let t=e.split("/");e=t[1]}return t.url.replace("FIELD",e)}return t.url},setLinkText:function(){for(let t in this.links){let e=this.links[t];if(e.text)this.linktext[t]=e.text;else if(e.field){let s=this.getLinkField(e.field);s&&this.$fhirutils.lookup(s).then((e=>{this.$set(this.linktext,t,e)}))}}},processFHIR:async function(){if(this.$refs.form.validate(),!this.valid)return;this.advancedValid=!0,this.overlay=!0,this.loading=!0;const t=async(e,s,i)=>{for(let o of i){let i=e,a=s;if(o.field&&!o.fieldType){let t;if(o.sliceName?o.field.startsWith("value[x]")?(t=o.field.substring(9),i+="."+t):(t=o.field.replace(":"+o.sliceName,""),i+="."+t):(t=o.field,i+="."+t),"1"!==o.max||"1"!==o.baseMax?s.hasOwnProperty(t)||(a[t]=[]):a[t]={},o.hasOwnProperty("value"))Array.isArray(a[t])?a[t].push(o.value):a[t]=o.value,a=a[t];else if(Array.isArray(a[t])){let e={};o.profile?e.url=o.profile:"extension"===t&&o.sliceName&&(e.url=o.sliceName),a[t].push(e),a=e}else a=a[t]}if(o.$children)try{await t(i,a,o.$children)}catch(r){this.advancedValid=!1,console.log(r)}if(o.constraints){o.errors=[];try{this.advancedValid=this.advancedValid&&await this.$fhirutils.checkConstraints(o.constraints,this.constraints,a,o.errors,this.fhirId)}catch(r){this.advancedValid=!1,o.errors.push("An unknown error occurred."),console.log(r)}}}};this.fhir={resourceType:this.field,meta:{profile:[this.profile]}};try{await t(this.field,this.fhir,this.$children)}catch(i){this.advancedValid=!1,console.log(i)}if(!this.advancedValid)return this.overlay=!1,this.loading=!1,void this.$store.commit("setMessage",{type:"error",text:"There were errors on the form."});console.log("FINISHED PROCESS AND CHECK.");let e="/fhir/"+this.field,s={method:"POST",headers:{"Content-Type":"application/fhir+json"},redirect:"manual"};this.fhirId&&(this.fhir.id=this.fhirId,e+="/"+this.fhirId,s.method="PUT"),s.body=JSON.stringify(this.fhir),fetch(e,s).then((t=>{201!==t.status&&200!==t.status||t.json().then((t=>{this.overlay=!1,this.loading=!1,this.fhirId?(this.$store.commit("setMessage",{type:"success",text:"Update successful."}),setTimeout((()=>this.$router.go(0)),1e3)):this.$router.push({name:"resource_view",params:{page:this.page,id:t.id}})}))}))},printEmployeeId(){this.loadingId=!0,a()({url:`/config/employeeId/${this.fhirId}`,method:"GET",responseType:"blob"}).then((t=>{let e=new Blob([t.data],{type:"application/png"}),s=document.createElement("a");s.href=window.URL.createObjectURL(e),s.download=`employee_identification_card_${this.fhirId}.png`,s.click(),this.loadingId=!1})).catch((t=>{console.log(t),this.loadingId=!1}))},printEmployeeCv(){this.loadingCv=!0,a()({url:`/config/employeeCv/${this.fhirId}`,method:"GET",responseType:"blob"}).then((t=>{let e=new Blob([t.data],{type:"application/pdf"}),s=document.createElement("a");s.href=window.URL.createObjectURL(e),s.download=`employee_resume_${this.fhirId}.pdf`,s.click(),this.loadingCv=!1})).catch((t=>{console.log(t),this.loadingCv=!1}))}}},l=n,c=s(3736),d=s(3453),h=s.n(d),u=s(3150),p=s(4228),f=s(1418),m=s(6232),v=s(6428),g=s(6816),y=s(7620),_=s(4562),b=s(5132),x=s(1058),k=s(624),$=s(9762),P=s(3205),w=(0,c.Z)(l,i,r,!1,null,null,null),C=w.exports;h()(w,{VBtn:u.Z,VContainer:p.Z,VDivider:f.Z,VForm:m.Z,VIcon:v.Z,VList:g.Z,VListItem:y.Z,VListItemContent:_.km,VListItemSubtitle:_.oZ,VListItemTitle:_.V9,VNavigationDrawer:b.Z,VOverlay:x.Z,VProgressCircular:k.Z,VSpacer:$.Z,VSubheader:P.Z})},461:function(t,e,s){s.r(e),s.d(e,{default:function(){return y}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.edit?t._e():s("v-container",{staticClass:"my-3"},[s("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.translatedHeader,items:t.items,"item-key":"id","items-per-page":5,loading:t.loading,dense:"","footer-props":{"items-per-page-text":t.$t("App.fhir-resources-texts.tableText"),"items-per-page-options":[5,10,20,50]}},scopedSlots:t._u([{key:"top",fn:function(){return[s("v-toolbar",{attrs:{flat:"",color:"white"}},[s("v-toolbar-title",[t._v(" "+t._s(t.$t("App.fhir-resources-texts."+t.title))+" ")]),s("v-spacer"),t._l(t.topActions,(function(e){return s("v-btn",{key:e.text,attrs:{to:t.setupLink(e.link,{}),color:e.class,small:""}},[t._v(" "+t._s(t.$t("App.fhir-resources-texts."+e.text))+" ")])}))],2)]},proxy:!0},{key:"item._action",fn:function(e){var i=e.item;return t._l(i.actions,(function(e){return s("v-btn",{key:e.text,attrs:{to:t.setupLink(e.link,i),color:e.class,small:"",rounded:""}},[t._v(" "+t._s(e.text)+" ")])}))}}],null,!1,1174550382)})],1)},r=[];const o=t=>!!t&&t.constructor===Object;var a={name:"ihris-secondary",props:["title","field","profile","slotProps","link-id","link-field","search-field","edit","columns","actions"],data:function(){return{source:{data:{},path:this.field},empty:!0,items:[],loading:!0,topActions:[],translatedHeader:[]}},mounted:function(){this.setupData()},watch:{},methods:{setupData:function(){let t;if(this.translatedHeader=this.columns.map((t=>({text:this.$t(`App.fhir-resources-texts.${t.text}`),value:t.value}))),2===this.searchField.split(":").length){let e=this.searchField.split(":")[0];t="fhir/"+e+"?_id="+this.linkId+"&_include="+this.searchField}else{t="/fhir/"+this.field;let e=[];this.profile&&e.push("_profile="+this.profile),this.searchField?e.push(this.searchField+"="+this.linkId):e.push(this.linkField.substring(this.linkField.indexOf(".")+1)+"="+this.linkId),t+="?"+e.join("&")}this.items=[],this.loading=!0,this.addItems(t)},addItems:function(t){fetch(t).then((e=>{200===e.status?e.json().then((async t=>{if(t.entry&&t.entry.length>0)for(let s of t.entry){if(2===this.searchField.split(":").length&&s.resource.resourceType===this.searchField.split(":")[0])continue;let t={id:s.resource.id};for(let i of this.columns)if("_action"!==i.value)try{let e=this.$fhirpath.evaluate(s.resource,i.value);t[i.value]=await this.processContent(e)}catch(e){console.log(e)}t.actions||(t.actions=[]);for(let e of this.actions)if(e.row)if(e.condition){let i=this.$fhirpath.evaluate(s.resource,e.condition);i.every((t=>t))&&t.actions.push(e)}else t.actions.push(e);else if(e.condition){let t=this.$fhirpath.evaluate(s.resource,e.condition);e.hasOwnProperty("meets")?e.meets=e.meets&&t.every((t=>t)):e.meets=t.every((t=>t))}else e.meets=!0;this.items.push(t)}else for(let s of this.actions)s.row||(s.meets=s.emptyDisplay);if(this.topActions=this.actions.filter((t=>!t.row&&t.meets)),t.link){let e=t.link.find((t=>"next"===t.relation));e?this.addItems(e.url):this.loading=!1}else this.loading=!1})).catch((t=>{this.loading=!1,console.log(t)})):(this.loading=!1,console.log("Unable to fetch",t,e.status))})).catch((t=>{this.loading=!1,console.log(t)}))},processContent:async function(t){if(Array.isArray(t)){let e=await Promise.all(t.map(this.processContent));return e.join(" ")}return o(t)?t.code&&t.system?await this.$fhirutils.codeLookup(t.system,t.code):t.display?t.display:t.code?t.code:t.reference?await this.$fhirutils.resourceLookup(t.reference):(console.log("Unable to process content:",t),"Unknown"):t},setupLink(t,e){return t.replace("ITEMID",e.id).replace("FHIRID",this.linkId)}}},n=a,l=s(3736),c=s(3453),d=s.n(c),h=s(3150),u=s(4228),p=s(4998),f=s(9762),m=s(6656),v=s(7921),g=(0,l.Z)(n,i,r,!1,null,null,null),y=g.exports;d()(g,{VBtn:h.Z,VContainer:u.Z,VDataTable:p.Z,VSpacer:f.Z,VToolbar:m.Z,VToolbarTitle:v.qW})},6869:function(t,e,s){s.r(e),s.d(e,{default:function(){return p}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.edit&&t.secondary?t._e():s("div",{staticClass:"ihris-section",attrs:{id:"section-"+t.name}},[s("v-card",{staticClass:"mx-auto",attrs:{"max-width":"700",outlined:""}},[s("v-card-title",{staticClass:"primary darken-1 white--text text-uppercase font-weight-bold"},[t._v(t._s(t.$t("App.fhir-resources-texts."+t.title))+" ")]),s("v-card-text",{staticClass:"my-3"},[t._t("default",null,{source:t.slotProps.source})],2)],1)],1)},r=[],o={name:"ihris-section",props:["name","slotProps","title","description","edit","secondary"],data:function(){return{}},created:function(){},watch:{},methods:{}},a=o,n=s(3736),l=s(3453),c=s.n(l),d=s(2371),h=s(7118),u=(0,n.Z)(a,i,r,!1,null,null,null),p=u.exports;c()(u,{VCard:d.Z,VCardText:h.ZB,VCardTitle:h.EB})}}]);
//# sourceMappingURL=fhir-primary.458ffa2a.js.map