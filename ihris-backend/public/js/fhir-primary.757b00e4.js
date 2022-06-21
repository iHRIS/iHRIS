"use strict";(self["webpackChunkihris_frontend"]=self["webpackChunkihris_frontend"]||[]).push([[657,364],{3697:function(t,e,i){i.r(e),i.d(e,{default:function(){return p}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ihris-element",{attrs:{edit:t.edit,loading:t.loading},scopedSlots:t._u([{key:"form",fn:function(){return[i("v-select",{attrs:{loading:t.loading,label:t.$t("App.fhir-code."+t.display),items:t.items.filter((function(t){return!t.code.includes("(deactivated)")})),outlined:"","hide-details":"auto","error-messages":t.errors,"item-text":"display","item-value":"code",disabled:t.disabled,rules:t.rules,dense:""},on:{change:function(e){t.errors=[]}},scopedSlots:t._u([{key:"label",fn:function(){return[t._v(t._s(t.$t("App.fhir-code."+t.display))+" "),t.required?i("span",{staticClass:"red--text font-weight-bold"},[t._v("*")]):t._e()]},proxy:!0}]),model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})]},proxy:!0},{key:"header",fn:function(){return[t._v(" "+t._s(t.$t("App.fhir-code."+t.display))+" ")]},proxy:!0},{key:"value",fn:function(){return[t._v(" "+t._s(t.displayValue)+" ")]},proxy:!0}])})},r=[],n=i(2130),o={name:"fhir-code",props:["field","min","max","base-min","base-max","label","binding","slotProps","path","edit","sliceName","readOnlyIfSet","constraints"],components:{IhrisElement:n.Z},data:function(){return{value:"",loading:!0,errors:[],items:[],source:{path:"",data:{},binding:this.binding},disabled:!1,lockWatch:!1}},created:function(){this.setupData()},watch:{slotProps:{handler(){this.lockWatch||this.setupData()},deep:!0}},methods:{setupData(){if(this.slotProps&&this.slotProps.source){if(this.source={path:this.slotProps.source.path+"."+this.field,data:{}},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data,this.value=this.source.data,this.lockWatch=!0;else{let t=this.$fhirutils.pathFieldExpression(this.field);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,t),1==this.source.data.length&&(this.value=this.source.data[0],this.lockWatch=!0)}this.disabled=this.readOnlyIfSet&&!!this.value}let t=this.binding||this.slotProps.source.binding;this.$fhirutils.expand(t).then((t=>{this.items=t,this.loading=!1})).catch((t=>{console.log(t),this.errors.push(t.message),this.loading=!1}))}},computed:{index:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.index:void 0},display:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.label:this.label},displayValue:function(){let t=this.items.find((t=>t.code===this.value));return t?t.display:""},required:function(){return(this.index||0)<this.min},rules:function(){return this.required?[t=>!!t||this.display+" is required"]:[]}}},l=o,a=i(3736),c=i(3453),d=i.n(c),u=i(3986),h=(0,a.Z)(l,s,r,!1,null,null,null),p=h.exports;d()(h,{VSelect:u.Z})},2692:function(t,e,i){i.r(e),i.d(e,{default:function(){return c}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._t("default",null,{source:t.source})],2)},r=[],n={name:"fhir-codeable-concept",props:["field","slotProps","sliceName","min","max","base-min","base-max","label","path","binding","edit","constraints"],data:function(){return{source:{path:"",data:{},binding:this.binding},errors:[]}},created:function(){this.setupData()},watch:{slotProps:{handler(){this.setupData()},deep:!0}},methods:{setupData:function(){if(this.slotProps&&this.slotProps.source)if(this.source={path:this.slotProps.source.path+"."+this.field,data:{},binding:this.binding},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data;else{let t=this.$fhirutils.pathFieldExpression(this.field);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,t)}}},computed:{display:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.label:this.label}}},o=n,l=i(3736),a=(0,l.Z)(o,s,r,!1,null,null,null),c=a.exports},2727:function(t,e,i){i.r(e),i.d(e,{default:function(){return p}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ihris-element",{attrs:{edit:t.edit,loading:t.loading},scopedSlots:t._u([{key:"form",fn:function(){return[i("v-select",{attrs:{loading:t.loading,label:t.display,items:t.items.filter((function(t){return!t.code.includes("(deactivated)")})),outlined:"","hide-details":"auto","error-messages":t.errors,"item-text":"display","item-value":"code",disabled:t.disabled,rules:t.rules,dense:""},on:{change:function(e){t.errors=[]}},scopedSlots:t._u([{key:"label",fn:function(){return[t._v(t._s(t.$t("App.fhir-coding."+t.label))+" "),t.required?i("span",{staticClass:"red--text font-weight-bold"},[t._v("*")]):t._e()]},proxy:!0}]),model:{value:t.valueCode,callback:function(e){t.valueCode=e},expression:"valueCode"}})]},proxy:!0},{key:"header",fn:function(){return[t._v(" "+t._s(t.$t("App.fhir-coding."+t.display))+" ")]},proxy:!0},{key:"value",fn:function(){return[t._v(" "+t._s(t.valueDisplay||t.value.display||"")+" ")]},proxy:!0}])})},r=[],n=i(2130),o={name:"fhir-coding",props:["field","label","sliceName","targetprofile","min","max","base-min","base-max","slotProps","path","binding","edit","readOnlyIfSet","constraints"],components:{IhrisElement:n.Z},data:function(){return{value:{system:"",code:"",display:""},valueCode:"",valueDisplay:"",loading:!0,errors:[],items:[],source:{path:"",data:{},binding:this.binding},disabled:!1,lockWatch:!1}},created:function(){this.setupData()},watch:{slotProps:{handler(){this.lockWatch||this.setupData()},deep:!0},valueCode:function(t){if(this.items){let e=this.items.find((e=>e.code===t));e&&(this.value=e)}this.value.system&&this.value.code&&this.$fhirutils.codeLookup(this.value.system,this.value.code,this.binding||this.source.binding).then((t=>{this.valueDisplay=t}))}},methods:{setupData:function(){if(this.slotProps&&this.slotProps.source){if(this.source={path:this.slotProps.source.path+"."+this.field,data:{},binding:this.binding||this.slotProps.source.binding},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data,this.source.data&&(this.value=this.source.data,this.valueCode=this.value.code,this.lockWatch=!0);else{let t=this.$fhirutils.pathFieldExpression(this.field);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,t),this.source.data[0]&&(this.value=this.source.data[0],this.valueCode=this.value.code,this.lockWatch=!0)}this.disabled=this.readOnlyIfSet&&!!this.valueCode}let t=this.binding||this.slotProps.source.binding;this.$fhirutils.expand(t).then((t=>{this.items=t,this.loading=!1})).catch((t=>{console.log(t),this.errors=t.message,this.loading=!1}))}},computed:{index:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.index:void 0},display:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.label:this.label},required:function(){return(this.index||0)<this.min},rules:function(){return this.required?[t=>!!t||this.display+" is required"]:[]}}},l=o,a=i(3736),c=i(3453),d=i.n(c),u=i(3986),h=(0,a.Z)(l,s,r,!1,null,null,null),p=h.exports;d()(h,{VSelect:u.Z})},3886:function(t,e,i){i.r(e),i.d(e,{default:function(){return c}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._t("default",null,{source:t.source})],2)},r=[],n={name:"fhir-extension",props:["field","sliceName","min","max","base-min","base-max","profile","slotProps","path","edit","constraints"],data:function(){return{source:{path:"",data:[]},errors:[]}},created:function(){this.setupData()},watch:{slotProps:{handler(){this.setupData()},deep:!0}},methods:{setupData:function(){if(this.slotProps&&this.slotProps.source)if(this.source={path:this.slotProps.source.path+"."+this.field,data:{}},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data;else{let t;t=this.profile?this.profile:this.sliceName;let e=this.field.replace(/([^:]+):(.+)/,"$1.where(url='"+t+"')");this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,e)}}}},o=n,l=i(3736),a=(0,l.Z)(o,s,r,!1,null,null,null),c=a.exports},8667:function(t,e,i){i.r(e),i.d(e,{default:function(){return d}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ihris-complex-card",{attrs:{complexField:t.field,slotProps:t.slotProps,label:t.label,errors:t.errors},scopedSlots:t._u([{key:"default",fn:function(e){return[t._t("default",null,{source:e.source})]}}],null,!0)})},r=[],n=i(7299),o={name:"fhir-human-name",props:["field","slotProps","sliceName","min","max","base-min","base-max","label","path","edit","constraints"],data:function(){return{errors:[]}},components:{IhrisComplexCard:n.Z}},l=o,a=i(3736),c=(0,a.Z)(l,s,r,!1,null,null,null),d=c.exports},3858:function(t,e,i){i.r(e),i.d(e,{default:function(){return d}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ihris-complex-card",{attrs:{complexField:t.field,slotProps:t.slotProps,label:t.label,errors:t.errors},scopedSlots:t._u([{key:"default",fn:function(e){return[t._t("default",null,{source:e.source})]}}],null,!0)})},r=[],n=i(7299),o={name:"fhir-identifier",props:["field","slotProps","sliceName","min","max","base-min","base-max","label","path","edit","constraints"],data:function(){return{errors:[]}},components:{IhrisComplexCard:n.Z}},l=o,a=i(3736),c=(0,a.Z)(l,s,r,!1,null,null,null),d=c.exports},7299:function(t,e,i){i.d(e,{Z:function(){return p}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",[i("v-card-subtitle",{staticClass:"primary--text text-uppercase font-weight-bold"},[t._v(t._s(t.$t("App.ihris-complex-card."+t.display)))]),t._l(t.errors,(function(e,s){return i("v-card-text",{key:s,staticClass:"error white--text font-weight-bold"},[t._v(t._s(e))])})),i("v-card-text",[t._t("default",null,{source:t.source})],2)],2)},r=[],n={name:"ihris-complex-card",props:["complexField","slotProps","label","errors"],data:function(){return{source:{path:"",data:{}}}},created:function(){this.setupData()},watch:{slotProps:{handler(){this.setupData()},deep:!0}},methods:{setupData:function(){if(this.slotProps&&this.slotProps.source)if(this.source={path:this.slotProps.source.path+"."+this.complexField,data:{}},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data;else{let t=this.$fhirutils.pathFieldExpression(this.complexField);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,t)}}},computed:{display:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.label:this.label}}},o=n,l=i(3736),a=i(3453),c=i.n(a),d=i(2371),u=i(7118),h=(0,l.Z)(o,s,r,!1,null,null,null),p=h.exports;c()(h,{VCard:d.Z,VCardSubtitle:u.Qq,VCardText:u.ZB})},8218:function(t,e,i){i.r(e),i.d(e,{default:function(){return $}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticClass:"my-3"},[i("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[t._t("default",null,{source:t.source}),i("v-overlay",{attrs:{value:t.overlay}},[i("v-progress-circular",{attrs:{color:"primary",indeterminate:"",size:"50"}})],1),i("v-navigation-drawer",{staticClass:"primary darken-1 white--text",staticStyle:{"z-index":"3"},attrs:{app:"",clipped:"",permanent:"",right:""}},[i("v-list",{staticClass:"white--text"},[t.$router.history.current.path==="/resource/view/practitioner/"+this.fhirId?i("v-list-item",[i("v-btn",{staticClass:"primary",attrs:{loading:t.loadingId},on:{click:t.printEmployeeId},scopedSlots:t._u([{key:"loader",fn:function(){return[i("span",{staticClass:"custom-loader"},[i("v-icon",{attrs:{light:""}},[t._v("mdi-cached")])],1)]},proxy:!0}],null,!1,1919056595)},[i("v-icon",{staticClass:"mr-2",attrs:{right:""}},[t._v(" mdi-card-account-details-outline ")]),t._v(" "+t._s(t.$t("App.ihris-resource.GenerateId"))+" ")],1)],1):t._e(),t.$router.history.current.path==="/resource/view/practitioner/"+this.fhirId?i("v-list-item",[i("v-btn",{staticClass:"primary",attrs:{loading:t.loadingCv},on:{click:t.printEmployeeCv},scopedSlots:t._u([{key:"loader",fn:function(){return[i("span",{staticClass:"custom-loader"},[i("v-icon",{attrs:{light:""}},[t._v("mdi-cached")])],1)]},proxy:!0}],null,!1,1919056595)},[i("v-icon",{staticClass:"mr-2",attrs:{dark:"",right:""}},[t._v(" mdi-file-pdf-box")]),t._v(" "+t._s(t.$t("App.ihris-resource.GenerateCv"))+" ")],1)],1):t._e(),i("v-list-item",[t.edit?i("v-btn",{staticClass:"secondary",attrs:{dark:""},on:{click:function(e){return t.$router.go(0)}}},[i("v-icon",{attrs:{light:""}},[t._v("mdi-pencil-off")]),i("span",[t._v(t._s(t.$t("App.ihris-resource.Cancel")))])],1):i("v-btn",{staticClass:"secondary",attrs:{dark:""},on:{click:function(e){return t.$emit("set-edit",!t.edit)}}},[i("v-icon",{attrs:{light:""}},[t._v("mdi-pencil")]),i("span",[t._v(t._s(t.$t("App.ihris-resource.Edit")))])],1),i("v-spacer"),t.edit?[t.valid?i("v-btn",{staticClass:"success darken-1",attrs:{disabled:!t.valid,dark:""},on:{click:function(e){return t.processFHIR()}}},[i("v-icon",{attrs:{light:""}},[t._v("mdi-content-save")]),i("span")],1):i("v-btn",{staticClass:"warning",attrs:{dark:""},on:{click:function(e){return t.$refs.form.validate()}}},[i("v-icon",{attrs:{light:""}},[t._v("mdi-content-save")]),i("span",[t._v(t._s(t.$t("App.ihris-resource.Save")))])],1)]:t._e()],2),i("v-divider",{attrs:{color:"white"}}),!t.edit&&t.links&&t.links.length?t._l(t.links,(function(e,s){return i("v-list-item",{key:e.url},[i("v-btn",{key:e.url,staticClass:"primary",attrs:{text:!e.button,to:t.getLinkUrl(e)}},[e.icon?i("v-icon",{attrs:{light:""}},[t._v(t._s(e.icon))]):t._e(),t._v(" "+t._s(t.linktext[s])+" ")],1)],1)})):t._e(),t.sectionMenu?i("v-subheader",{staticClass:"white--text"},[i("h2",[t._v(t._s(t.$t("App.ihris-resource.Sections")))])]):t._e(),t._l(t.sectionMenu,(function(e){return i("v-list-item",{key:e.name,class:"#section-"+e.name===t.path?"highlighted":"",attrs:{href:"#section-"+e.name}},[t.edit&&e.secondary?t._e():i("v-list-item-content",{staticClass:"white--text"},[i("v-list-item-title",{staticClass:"text-uppercase"},[i("h4",[t._v(t._s(t.$t("App.ihris-resource."+e.title)))])]),i("v-list-item-subtitle",{staticClass:"white--text"},[t._v(t._s(t.$t("App.ihris-resource."+e.desc))+" ")])],1)],1)}))],2)],1)],2)],1)},r=[],n=(i(6699),i(9669)),o=i.n(n),l={name:"ihris-resource",props:["title","field","fhir-id","page","profile","section-menu","edit","links","constraints"],data:function(){return{fhir:{},orig:{},valid:!0,source:{data:{},path:""},path:"",loading:!1,overlay:!1,isEdit:!1,linktext:[],advancedValid:!0,loadingId:!1,loadingCv:!1}},mounted(){this.isQuestionnaire?window.removeEventListener("scroll",this.handleScroll):window.addEventListener("scroll",this.handleScroll)},beforeDestroy(){window.removeEventListener("scroll",this.handleScroll)},created:function(){if(this.fhirId)this.loading=!0,fetch("/fhir/"+this.field+"/"+this.fhirId).then((t=>{t.json().then((t=>{this.orig=t,this.source={data:t,path:this.field},this.setLinkText(),this.loading=!1})).catch((t=>{console.log(this.field,this.fhirId,t)}))})).catch((t=>{console.log(this.field,this.fhirId,t)}));else if(this.$route.query){let e={resourceType:this.field},i=!1;for(let s of Object.keys(this.$route.query))if(s.startsWith(this.field+".")){i=!0;let r=s.substring(this.field.length+1).split("."),n=r.pop(),o=e;for(let e of r)if(e.includes("["))try{let t=e.split("["),i=t[0],s=t[1].slice(0,-1);if(o.hasOwnProperty(i)||(o[i]=[]),s){let t={};o[i][parseInt(s)]=t,o=t}else{let t={};o[i].push(t),o=t}}catch(t){console.log("Unable to process",s)}else o.hasOwnProperty(e)||(o[e]={},o=o[e]);if(n.includes("["))try{let t=n.split("["),e=t[0],i=t[1].slice(0,-1);o.hasOwnProperty(e)||(o[e]=[]),i?o[e][parseInt(i)]=this.$route.query[s]:o[e].push(this.$route.query[s])}catch(t){console.log("Unable to process",s)}else o[n]=this.$route.query[s]}i&&(this.source={data:e,path:this.field})}},computed:{hasFhirId:function(){return""!=this.fhirId&&!!this.fhirId}},methods:{handleScroll(){this.hasScrolled=window.top.scrollY>=100,this.sectionMenu.map((t=>{let e=document.getElementById(`section-${t.name}`),i=e.offsetTop;pageYOffset>=i&&(this.path=`#section-${t.name}`)}))},getLinkField:function(t){let e=this.$fhirpath.evaluate(this.source.data,t);return!!e&&e[0]},getLinkUrl:function(t){let e;if(t.field&&(e=this.getLinkField(t.field)),e){if(e.includes("/")){let t=e.split("/");e=t[1]}return t.url.replace("FIELD",e)}return t.url},setLinkText:function(){for(let t in this.links){let e=this.links[t];if(e.text)this.linktext[t]=e.text;else if(e.field){let i=this.getLinkField(e.field);i&&this.$fhirutils.lookup(i).then((e=>{this.$set(this.linktext,t,e)}))}}},processFHIR:async function(){if(this.$refs.form.validate(),!this.valid)return;this.advancedValid=!0,this.overlay=!0,this.loading=!0;const t=async(e,i,s)=>{for(let n of s){let s=e,o=i;if(n.field&&!n.fieldType){let t;if(n.sliceName?n.field.startsWith("value[x]")?(t=n.field.substring(9),s+="."+t):(t=n.field.replace(":"+n.sliceName,""),s+="."+t):(t=n.field,s+="."+t),"1"!==n.max||"1"!==n.baseMax?i.hasOwnProperty(t)||(o[t]=[]):o[t]={},n.hasOwnProperty("value"))Array.isArray(o[t])?o[t].push(n.value):o[t]=n.value,o=o[t];else if(Array.isArray(o[t])){let e={};n.profile?e.url=n.profile:"extension"===t&&n.sliceName&&(e.url=n.sliceName),o[t].push(e),o=e}else o=o[t]}if(n.$children)try{await t(s,o,n.$children)}catch(r){this.advancedValid=!1,console.log(r)}if(n.constraints){n.errors=[];try{this.advancedValid=this.advancedValid&&await this.$fhirutils.checkConstraints(n.constraints,this.constraints,o,n.errors,this.fhirId)}catch(r){this.advancedValid=!1,n.errors.push("An unknown error occurred."),console.log(r)}}}};this.fhir={resourceType:this.field,meta:{profile:[this.profile]}};try{await t(this.field,this.fhir,this.$children)}catch(s){this.advancedValid=!1,console.log(s)}if(!this.advancedValid)return this.overlay=!1,this.loading=!1,void this.$store.commit("setMessage",{type:"error",text:"There were errors on the form."});console.log("FINISHED PROCESS AND CHECK.");let e="/fhir/"+this.field,i={method:"POST",headers:{"Content-Type":"application/fhir+json"},redirect:"manual"};this.fhirId&&(this.fhir.id=this.fhirId,e+="/"+this.fhirId,i.method="PUT"),i.body=JSON.stringify(this.fhir),fetch(e,i).then((t=>{201!==t.status&&200!==t.status||t.json().then((t=>{this.overlay=!1,this.loading=!1,this.fhirId?(this.$store.commit("setMessage",{type:"success",text:"Update successful."}),setTimeout((()=>this.$router.go(0)),1e3)):this.$router.push({name:"resource_view",params:{page:this.page,id:t.id}})}))}))},printEmployeeId(){this.loadingId=!0,o()({url:`/config/employeeId/${this.fhirId}`,method:"GET",responseType:"blob"}).then((t=>{let e=new Blob([t.data],{type:"application/png"}),i=document.createElement("a");i.href=window.URL.createObjectURL(e),i.download=`employee_identification_card_${this.fhirId}.png`,i.click(),this.loadingId=!1})).catch((t=>{console.log(t),this.loadingId=!1}))},printEmployeeCv(){this.loadingCv=!0,o()({url:`/config/employeeCv/${this.fhirId}`,method:"GET",responseType:"blob"}).then((t=>{let e=new Blob([t.data],{type:"application/pdf"}),i=document.createElement("a");i.href=window.URL.createObjectURL(e),i.download=`employee_resume_${this.fhirId}.pdf`,i.click(),this.loadingCv=!1})).catch((t=>{console.log(t),this.loadingCv=!1}))}}},a=l,c=i(3736),d=i(3453),u=i.n(d),h=i(3150),p=i(4228),f=i(1418),v=i(6232),m=i(6428),g=i(6816),y=i(7620),x=i(4562),_=i(5132),b=i(1058),k=i(624),C=i(9762),P=i(3205),w=(0,c.Z)(a,s,r,!1,null,null,null),$=w.exports;u()(w,{VBtn:h.Z,VContainer:p.Z,VDivider:f.Z,VForm:v.Z,VIcon:m.Z,VList:g.Z,VListItem:y.Z,VListItemContent:x.km,VListItemSubtitle:x.oZ,VListItemTitle:x.V9,VNavigationDrawer:_.Z,VOverlay:b.Z,VProgressCircular:k.Z,VSpacer:C.Z,VSubheader:P.Z})},5919:function(t,e,i){i.r(e),i.d(e,{default:function(){return y}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.edit?t._e():i("v-container",{staticClass:"my-3"},[i("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.translatedHeader,items:t.items,"item-key":"id","items-per-page":5,loading:t.loading,dense:"","footer-props":{"items-per-page-text":t.$t("App.ihris-search.tableText"),"items-per-page-options":[5,10,20,50]}},scopedSlots:t._u([{key:"top",fn:function(){return[i("v-toolbar",{attrs:{flat:"",color:"white"}},[i("v-toolbar-title",[t._v(" "+t._s(t.$t("App.ihris-secondary."+t.title))+" ")]),i("v-spacer"),t._l(t.topActions,(function(e){return i("v-btn",{key:e.text,attrs:{to:t.setupLink(e.link,{}),color:e.class,small:""}},[t._v(" "+t._s(t.$t("App.ihris-secondary."+e.text))+" ")])}))],2)]},proxy:!0},{key:"item._action",fn:function(e){var s=e.item;return t._l(s.actions,(function(e){return i("v-btn",{key:e.text,attrs:{to:t.setupLink(e.link,s),color:e.class,small:"",rounded:""}},[t._v(" "+t._s(e.text)+" ")])}))}}],null,!1,4170917870)})],1)},r=[];const n=t=>!!t&&t.constructor===Object;var o={name:"ihris-secondary",props:["title","field","profile","slotProps","link-id","link-field","search-field","edit","columns","actions"],data:function(){return{source:{data:{},path:this.field},empty:!0,items:[],loading:!0,topActions:[],translatedHeader:[]}},mounted:function(){this.setupData()},watch:{},methods:{setupData:function(){let t;if(this.translatedHeader=this.columns.map((t=>({text:this.$t(`App.ihris-secondary.table.${t.text}`),value:t.value}))),2===this.searchField.split(":").length){let e=this.searchField.split(":")[0];t="fhir/"+e+"?_id="+this.linkId+"&_include="+this.searchField}else{t="/fhir/"+this.field;let e=[];this.profile&&e.push("_profile="+this.profile),this.searchField?e.push(this.searchField+"="+this.linkId):e.push(this.linkField.substring(this.linkField.indexOf(".")+1)+"="+this.linkId),t+="?"+e.join("&")}this.items=[],this.loading=!0,this.addItems(t)},addItems:function(t){fetch(t).then((e=>{200===e.status?e.json().then((async t=>{if(t.entry&&t.entry.length>0)for(let i of t.entry){if(2===this.searchField.split(":").length&&i.resource.resourceType===this.searchField.split(":")[0])continue;let t={id:i.resource.id};for(let s of this.columns)if("_action"!==s.value)try{let e=this.$fhirpath.evaluate(i.resource,s.value);t[s.value]=await this.processContent(e)}catch(e){console.log(e)}t.actions||(t.actions=[]);for(let e of this.actions)if(e.row)if(e.condition){let s=this.$fhirpath.evaluate(i.resource,e.condition);s.every((t=>t))&&t.actions.push(e)}else t.actions.push(e);else if(e.condition){let t=this.$fhirpath.evaluate(i.resource,e.condition);e.hasOwnProperty("meets")?e.meets=e.meets&&t.every((t=>t)):e.meets=t.every((t=>t))}else e.meets=!0;this.items.push(t)}else for(let i of this.actions)i.row||(i.meets=i.emptyDisplay);if(this.topActions=this.actions.filter((t=>!t.row&&t.meets)),t.link){let e=t.link.find((t=>"next"===t.relation));e?this.addItems(e.url):this.loading=!1}else this.loading=!1})).catch((t=>{this.loading=!1,console.log(t)})):(this.loading=!1,console.log("Unable to fetch",t,e.status))})).catch((t=>{this.loading=!1,console.log(t)}))},processContent:async function(t){if(Array.isArray(t)){let e=await Promise.all(t.map(this.processContent));return e.join(" ")}return n(t)?t.code&&t.system?await this.$fhirutils.codeLookup(t.system,t.code):t.display?t.display:t.code?t.code:t.reference?await this.$fhirutils.resourceLookup(t.reference):(console.log("Unable to process content:",t),"Unknown"):t},setupLink(t,e){return t.replace("ITEMID",e.id).replace("FHIRID",this.linkId)}}},l=o,a=i(3736),c=i(3453),d=i.n(c),u=i(3150),h=i(4228),p=i(6957),f=i(9762),v=i(6656),m=i(7921),g=(0,a.Z)(l,s,r,!1,null,null,null),y=g.exports;d()(g,{VBtn:u.Z,VContainer:h.Z,VDataTable:p.Z,VSpacer:f.Z,VToolbar:v.Z,VToolbarTitle:m.qW})},5806:function(t,e,i){i.r(e),i.d(e,{default:function(){return V}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.edit&&t.secondary?t._e():i("div",{staticClass:"ihris-section",attrs:{id:"section-"+t.name}},[i("v-card",{staticClass:"mx-auto",attrs:{"max-width":"700",outlined:""}},[i("v-card-title",{staticClass:"primary darken-1 white--text text-uppercase font-weight-bold"},[t._v(t._s(t.$t("App.ihris-section."+t.title))+" ")]),"language"!==t.name?i("v-card-text",{staticClass:"my-3"},[t._t("default",null,{source:t.slotProps.source})],2):t._e(),"language"===t.name?i("v-card-text",{staticClass:"my-3"},[i("language-detail")],1):t._e()],1)],1)},r=[],n=function(){var t=this,e=this,i=e.$createElement,s=e._self._c||i;return s("v-container",[s("v-row",{attrs:{justify:"center"}},[s("v-dialog",{attrs:{persistent:"","max-width":"680px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[s("v-card",{staticClass:"px-6 py-4"},[s("v-card-title",{staticClass:"justify-center"},[s("span",{staticClass:"text-h6"},[s("v-icon",{staticClass:"mr-2",attrs:{large:"",color:"primary"}},[e._v("mdi-translate")]),e._v("Add New Language")],1)]),s("v-card-text",[s("v-container",[s("v-row",[s("v-col",{attrs:{cols:"12"}},[s("v-autocomplete",{attrs:{dense:"",items:e.languageList,label:"Language",filter:e.customFilter,required:"",outlined:"","item-text":"display","return-object":""},scopedSlots:e._u([{key:"item",fn:function(t){return["object"===typeof t.item?[s("v-list-item-content",{domProps:{textContent:e._s(t.item.display)}})]:e._e()]}}]),model:{value:e.selectedLanguage,callback:function(t){e.selectedLanguage=t},expression:"selectedLanguage"}})],1),e._l(e.proficiencyInput,(function(t,i){return s("v-row",{key:i,staticClass:"mx-2"},[s("v-col",{attrs:{cols:"5"}},[s("v-autocomplete",{attrs:{dense:"",label:"proficiency Type",items:e.proficiencyType,outlined:"","item-text":"display","return-object":""},scopedSlots:e._u([{key:"item",fn:function(t){return["object"===typeof t.item?[s("v-list-item-content",{domProps:{textContent:e._s(t.item.display)}})]:e._e()]}}],null,!0),model:{value:t.extension[1].valueCoding,callback:function(i){e.$set(t.extension[1],"valueCoding",i)},expression:"proficiencyData.extension[1].valueCoding"}})],1),s("v-col",{attrs:{cols:"5"}},[s("v-autocomplete",{attrs:{dense:"",items:e.proficiency,label:"Proficiency",outlined:"","item-text":"display","return-object":""},scopedSlots:e._u([{key:"item",fn:function(t){return["object"===typeof t.item?[s("v-list-item-content",{domProps:{textContent:e._s(t.item.display)}})]:e._e()]}}],null,!0),model:{value:t.extension[0].valueCoding,callback:function(i){e.$set(t.extension[0],"valueCoding",i)},expression:"proficiencyData.extension[0].valueCoding"}})],1),i===e.proficiencyInput.length-1?s("v-cols",{attrs:{cols:"2"}},[s("v-row",{staticClass:"mt-4 ml-2"},[s("v-btn",{attrs:{rounded:"",small:"",icon:"",flat:"",color:"primary",disabled:e.proficiencyInput.length>=4},on:{click:e.addProficiency}},[s("v-icon",{attrs:{left:""}},[e._v(" mdi-plus-circle ")])],1),s("v-btn",{attrs:{rounded:"",small:"",icon:"",flat:"",color:"primary",disabled:e.proficiencyInput.length<=1},on:{click:function(t){return e.reSet()}}},[s("v-icon",{attrs:{left:""}},[e._v(" mdi-backup-restore ")])],1)],1)],1):e._e()],1)}))],2)],1)],1),s("v-card-actions",[s("v-spacer"),s("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(){e.dialog=!1,e.reSet()}}},[e._v(" Close ")]),s("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.onSave}},[e._v(" Save ")])],1)],1)],1)],1),s("v-row",{attrs:{justify:"center"}},[s("v-dialog",{attrs:{persistent:"","max-width":"680px"},model:{value:e.editDialog,callback:function(t){e.editDialog=t},expression:"editDialog"}},[s("v-card",{staticClass:"px-6 py-4"},[s("v-card-title",{staticClass:"justify-center"},[s("span",{staticClass:"text-h6"},[s("v-icon",{staticClass:"mr-2",attrs:{large:"",color:"primary"}},[e._v("mdi-translate")]),e._v("Select and Edit Language")],1)]),s("v-card-text",[s("v-container",[s("v-row",[s("v-col",{attrs:{cols:"12"}},[s("v-autocomplete",{attrs:{dense:"",items:e.allAvailableLanguages.map((function(t){return t.coding[0]})),label:"select the Language to edit",filter:e.customFilter,required:"",outlined:"","item-text":"display","return-object":""},scopedSlots:e._u([{key:"item",fn:function(t){return["object"===typeof t.item?[s("v-list-item-content",{domProps:{textContent:e._s(t.item.display)}})]:e._e()]}}]),model:{value:e.selectedLanguageToEdit,callback:function(t){e.selectedLanguageToEdit=t},expression:"selectedLanguageToEdit"}})],1),e._l(e.proficiencySelected,(function(t,i){return s("v-row",{key:i,staticClass:"mx-2"},[s("v-col",{attrs:{cols:"5"}},[s("v-autocomplete",{attrs:{dense:"",label:"proficiency Type",items:e.proficiencyType,outlined:"","item-text":"display","return-object":""},scopedSlots:e._u([{key:"item",fn:function(t){return["object"===typeof t.item?[s("v-list-item-content",{domProps:{textContent:e._s(t.item.display)}})]:e._e()]}}],null,!0),model:{value:t.extension[1].valueCoding,callback:function(i){e.$set(t.extension[1],"valueCoding",i)},expression:"proficiencyData.extension[1].valueCoding"}})],1),s("v-col",{attrs:{cols:"5"}},[s("v-autocomplete",{attrs:{dense:"",items:e.proficiency,label:"Proficiency",outlined:"","item-text":"display","return-object":""},scopedSlots:e._u([{key:"item",fn:function(t){return["object"===typeof t.item?[s("v-list-item-content",{domProps:{textContent:e._s(t.item.display)}})]:e._e()]}}],null,!0),model:{value:t.extension[0].valueCoding,callback:function(i){e.$set(t.extension[0],"valueCoding",i)},expression:"proficiencyData.extension[0].valueCoding"}})],1),i===e.proficiencySelected.length-1?s("v-cols",{attrs:{cols:"2"}},[s("v-row",{staticClass:"mt-4 ml-2"},[s("v-btn",{attrs:{rounded:"",small:"",icon:"",flat:"",color:"primary",disabled:e.proficiencySelected.length>=6},on:{click:e.addProficiencySelected}},[s("v-icon",{attrs:{left:""}},[e._v(" mdi-plus-circle ")])],1),s("v-btn",{attrs:{rounded:"",small:"",icon:"",flat:"",color:"primary",disabled:e.proficiencySelected.length<=1},on:{click:function(t){return e.reSet()}}},[s("v-icon",{attrs:{left:""}},[e._v(" mdi-backup-restore ")])],1)],1)],1):e._e()],1)}))],2)],1)],1),s("v-card-actions",[s("v-spacer"),s("v-btn",{attrs:{color:"warning",error:""},on:{click:function(){e.editDialog=!1}}},[s("v-icon",{attrs:{left:""}},[e._v("mdi-close-box-multiple")]),e._v(" Close ")],1),s("v-btn",{attrs:{color:"primary"},on:{click:e.onUpdate}},[s("v-icon",{attrs:{left:""}},[e._v("mdi-content-save-check-outline")]),e._v(" Save ")],1)],1)],1)],1)],1),s("v-card",[s("v-row",{staticClass:"ma-2 pt-3",attrs:{justify:"end"}},[[s("v-btn",{staticClass:"mr-3",attrs:{color:"primary"},on:{click:function(){t.dialog=!0,t.skillCount=1}}},[s("v-icon",{attrs:{left:""}},[e._v(" mdi-plus-circle ")]),e._v(" Add Language ")],1),s("v-btn",{attrs:{color:"primary",disabled:0===e.tableData.length},on:{click:function(){t.editDialog=!0}}},[s("v-icon",{attrs:{left:""}},[e._v(" mdi-circle-edit-outline ")]),e._v(" Edit Language ")],1)]],2),s("v-card-text",[e.tableData.length>0?s("v-simple-table",{scopedSlots:e._u([{key:"default",fn:function(){return[s("thead",[s("tr",[s("th",{staticClass:"text-left"},[e._v(" Language ")]),s("th",{staticClass:"text-left"},[e._v(" Skill ")]),s("th",{staticClass:"text-left"},[e._v(" Excellent ")]),s("th",{staticClass:"text-left"},[e._v(" Good ")]),s("th",{staticClass:"text-left"},[e._v(" Fair ")]),s("th",{staticClass:"text-left"},[e._v(" Poor ")])])]),e._l(e.tableData,(function(t){return s("tbody",{key:t.name},[s("tr",[s("th",{attrs:{rowspan:"6",scope:"rowgroup"}},[e._v(e._s(t.name))]),s("th",{attrs:{scope:"row"}},[e._v("Expressed signed")]),e._l([0,1,2,3],(function(i){return s("td",{key:i},e._l([0,1,2,3,4,5],(function(r){return s("span",{key:r},[t.skills[r]&&"Expressed signed"===t.skills[r].type&&t.skills[r].level===e.level[i]?s("v-icon",{attrs:{color:"green"}},[e._v("mdi-checkbox-marked-circle-outline")]):s("v-icon")],1)})),0)}))],2),s("tr",[s("th",{attrs:{scope:"row"}},[e._v("Expressed spoken")]),e._l([0,1,2,3],(function(i){return s("td",{key:i},e._l([0,1,2,3,4,5],(function(r){return s("span",{key:r},[t.skills[r]&&"Expressed spoken"===t.skills[r].type&&t.skills[r].level===e.level[i]?s("v-icon",{attrs:{color:"green"}},[e._v("mdi-checkbox-marked-circle-outline")]):s("v-icon")],1)})),0)}))],2),s("tr",[s("th",{attrs:{scope:"row"}},[e._v("Expressed written")]),e._l([0,1,2,3],(function(i){return s("td",{key:i},e._l([0,1,2,3,4,5],(function(r){return s("span",{key:r},[t.skills[r]&&"Expressed written"===t.skills[r].type&&t.skills[r].level===e.level[i]?s("v-icon",{attrs:{color:"green"}},[e._v("mdi-checkbox-marked-circle-outline")]):s("v-icon")],1)})),0)}))],2),s("tr",[s("th",{attrs:{scope:"row"}},[e._v("Received signed")]),e._l([0,1,2,3],(function(i){return s("td",{key:i},e._l([0,1,2,3,4,5],(function(r){return s("span",{key:r},[t.skills[r]&&"Received signed"===t.skills[r].type&&t.skills[r].level===e.level[i]?s("v-icon",{attrs:{color:"green",div:""}},[e._v("mdi-checkbox-marked-circle-outline")]):s("v-icon")],1)})),0)}))],2),s("tr",[s("th",{attrs:{scope:"row"}},[e._v("Received written")]),e._l([0,1,2,3],(function(i){return s("td",{key:i},e._l([0,1,2,3,4,5],(function(r){return s("span",{key:r},[t.skills[r]&&"Received written"===t.skills[r].type&&t.skills[r].level===e.level[i]?s("v-icon",{attrs:{color:"green",div:""}},[e._v("mdi-checkbox-marked-circle-outline")]):s("v-icon")],1)})),0)}))],2),s("tr",[s("th",{attrs:{scope:"row"}},[e._v("Received spoken")]),e._l([0,1,2,3],(function(i){return s("td",{key:i},e._l([0,1,2,3,4,5],(function(r){return s("span",{key:r},[t.skills[r]&&"Received spoken"===t.skills[r].type&&t.skills[r].level===e.level[i]?s("v-icon",{attrs:{color:"green",div:""}},[e._v("mdi-checkbox-marked-circle-outline")]):s("v-icon")],1)})),0)}))],2),s("tr")])}))]},proxy:!0}],null,!1,1009935552)}):s("v-card-title",{staticClass:"justify-center"},[s("span",{staticClass:"text-h6"},[s("v-icon",{staticClass:"mr-2",attrs:{large:"",color:"primary"}},[e._v("mdi-translate")]),e._v("No language data is available please add one ")],1)])],1)],1)],1)},o=[],l=(i(6699),i(9669)),a=i.n(l),c={name:"languageDetail",data(){return{valid:!1,skillCount:1,select:null,dialog:!1,skillsList:["Received signed","Expressed signed","Expressed written","Received written","Expressed spoken","Received spoken"],level:["Excellent","Good","Fair","Poor"],tableData:[],languageList:[],filledLanguage:[],proficiency:[],proficiencyType:[],selectedLanguage:null,selectedProficiency:null,selectedProficiencyType:null,proficiencySelected:[],selected:[],required(t){return e=>e||`You must select a ${t}`},proficiencyInput:[{url:"http://ihris.org/fhir/StructureDefinition/ihris-practitioner-language-proficiency",extension:[{url:"level",valueCoding:{system:"http://terminology.hl7.org/CodeSystem/v3-LanguageAbilityProficiency",version:"",code:"",display:""}},{url:"type",valueCoding:{system:"http://terminology.hl7.org/CodeSystem/v3-LanguageAbilityMode",version:"",code:"",display:""}}]}],allAvailableLanguages:[],selectedLanguageToEdit:null,editDialog:!1}},watch:{selectedLanguageToEdit:function(t){let e=this.allAvailableLanguages.find((e=>e.coding[0].code===t.code));e.extension?this.proficiencySelected=e.extension:this.proficiencySelected=[{url:"http://ihris.org/fhir/StructureDefinition/ihris-practitioner-language-proficiency",extension:[{url:"level",valueCoding:""},{url:"type",valueCoding:""}]}]}},methods:{reSet(){this.proficiencyInput=[{url:"http://ihris.org/fhir/StructureDefinition/ihris-practitioner-language-proficiency",extension:[{url:"level",valueCoding:{system:"http://terminology.hl7.org/CodeSystem/v3-LanguageAbilityProficiency",version:"",code:"",display:""}},{url:"type",valueCoding:{system:"http://terminology.hl7.org/CodeSystem/v3-LanguageAbilityMode",version:"",code:"",display:""}}]}]},addProficiency(){this.proficiencyInput.push({url:"http://ihris.org/fhir/StructureDefinition/ihris-practitioner-language-proficiency",extension:[{url:"level",valueCoding:""},{url:"type",valueCoding:""}]})},addProficiencySelected(){this.proficiencySelected.push({url:"http://ihris.org/fhir/StructureDefinition/ihris-practitioner-language-proficiency",extension:[{url:"level",valueCoding:""},{url:"type",valueCoding:""}]})},customFilter(t,e){const i=t.display.toLowerCase(),s=e.toLowerCase();return i.indexOf(s)>-1},onSave(){this.dialog=!1,a().get(`/fhir/Practitioner/${this.$router.history.current.params.id}`).then((({data:t})=>{void 0===t.communication&&(t.communication=[]),t.communication.push({extension:this.proficiencyInput,coding:[this.selectedLanguage]}),a().put(`/fhir/Practitioner/${this.$router.history.current.params.id}`,t).then((()=>{this.$router.go()})).catch((t=>{console.log("error",t)}))})).catch((t=>console.log(t)))},onUpdate(){this.editDialog=!1,a().get(`/fhir/Practitioner/${this.$router.history.current.params.id}`).then((({data:t})=>{t.communication.find((t=>t.coding[0].code===this.selectedLanguageToEdit.code)).extension=this.proficiencySelected,a().put(`/fhir/Practitioner/${this.$router.history.current.params.id}`,t).then((()=>{this.$router.go()})).catch((t=>{console.log("error",t)}))})).catch((t=>console.log(t)))}},created(){a().get(`/fhir/Practitioner/${this.$router.history.current.params.id}`).then((t=>{t.data&&t.data.communication&&(this.allAvailableLanguages=t.data.communication,t.data.communication.map((t=>{if(t.coding[0].code){this.filledLanguage.push(t.coding[0].code);let e=[];t.extension&&t.extension.length>0&&t.extension.map((t=>{let i={};t.extension&&t.extension[0]&&t.extension[1]&&(i.level=t.extension[0].valueCoding.display,i.type=t.extension[1].valueCoding.display,e.push(i))}));let i={};i.skills=e,i.name=t.coding[0].display,i.skillList=this.skillsList,this.tableData.push(i)}})))})),a().get("/fhir/ValueSet/languages/$expand").then((t=>{this.languageList=t.data.expansion.contains,this.languageList=this.languageList.filter((t=>!this.filledLanguage.includes(t.code))),this.languageList.sort(((t,e)=>t.display>e.display?1:e.display>t.display?-1:0))})),a().get("/fhir/ValueSet/v3-LanguageAbilityMode/$expand").then((t=>this.proficiencyType=t.data.expansion.contains)).catch((t=>console.log(t))),a().get("/fhir/ValueSet/v3-LanguageAbilityProficiency/$expand").then((t=>this.proficiency=t.data.expansion.contains)).catch((t=>console.log(t)))}},d=c,u=i(3736),h=i(3453),p=i.n(h),f=i(1835),v=i(3150),m=i(2371),g=i(7118),y=i(2102),x=i(4228),_=i(4497),b=i(6428),k=i(4562),C=i(2877),P=i(3568),w=i(9762),$=(0,u.Z)(d,n,o,!1,null,"6b049f1c",null),S=$.exports;p()($,{VAutocomplete:f.Z,VBtn:v.Z,VCard:m.Z,VCardActions:g.h7,VCardText:g.ZB,VCardTitle:g.EB,VCol:y.Z,VContainer:x.Z,VDialog:_.Z,VIcon:b.Z,VListItemContent:k.km,VRow:C.Z,VSimpleTable:P.Z,VSpacer:w.Z});var I={name:"ihris-section",props:["name","slotProps","title","description","edit","secondary"],components:{"language-detail":S},data:function(){return{}},created:function(){},watch:{},methods:{}},L=I,E=(0,u.Z)(L,s,r,!1,null,null,null),V=E.exports;p()(E,{VCard:m.Z,VCardText:g.ZB,VCardTitle:g.EB})}}]);
//# sourceMappingURL=fhir-primary.757b00e4.js.map