"use strict";(self["webpackChunkihris_frontend"]=self["webpackChunkihris_frontend"]||[]).push([[364],{8667:function(t,e,s){s.r(e),s.d(e,{default:function(){return c}});var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ihris-complex-card",{attrs:{complexField:t.field,slotProps:t.slotProps,label:t.label,errors:t.errors},scopedSlots:t._u([{key:"default",fn:function(e){return[t._t("default",null,{source:e.source})]}}],null,!0)})},o=[],l=s(7299),a={name:"fhir-human-name",props:["field","slotProps","sliceName","min","max","base-min","base-max","label","path","edit","constraints"],data:function(){return{errors:[]}},components:{IhrisComplexCard:l.Z}},i=a,n=s(3736),u=(0,n.Z)(i,r,o,!1,null,null,null),c=u.exports},7299:function(t,e,s){s.d(e,{Z:function(){return d}});var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-card",[s("v-card-subtitle",{staticClass:"primary--text text-uppercase font-weight-bold"},[t._v(t._s(t.$t("App.ihris-complex-card."+t.display)))]),t._l(t.errors,(function(e,r){return s("v-card-text",{key:r,staticClass:"error white--text font-weight-bold"},[t._v(t._s(e))])})),s("v-card-text",[t._t("default",null,{source:t.source})],2)],2)},o=[],l={name:"ihris-complex-card",props:["complexField","slotProps","label","errors"],data:function(){return{source:{path:"",data:{}}}},created:function(){this.setupData()},watch:{slotProps:{handler(){this.setupData()},deep:!0}},methods:{setupData:function(){if(this.slotProps&&this.slotProps.source)if(this.source={path:this.slotProps.source.path+"."+this.complexField,data:{}},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data;else{let t=this.$fhirutils.pathFieldExpression(this.complexField);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,t)}}},computed:{display:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.label:this.label}}},a=l,i=s(3736),n=s(3453),u=s.n(n),c=s(2371),p=s(7118),h=(0,i.Z)(a,r,o,!1,null,null,null),d=h.exports;u()(h,{VCard:c.Z,VCardSubtitle:p.Qq,VCardText:p.ZB})}}]);
//# sourceMappingURL=fhir-name.173491ef.js.map