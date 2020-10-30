(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["fhir-primary","fhir-name"],{1131:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ihris-element",{attrs:{edit:t.edit,loading:t.loading},scopedSlots:t._u([{key:"form",fn:function(){return[s("v-select",{attrs:{loading:t.loading,label:t.display,items:t.items,outlined:"","hide-details":"auto","error-messages":t.errors,"item-text":"display","item-value":"code",disabled:t.disabled,rules:t.rules,dense:""},on:{change:function(e){t.errors=[]}},scopedSlots:t._u([{key:"label",fn:function(){return[t._v(t._s(t.display)+" "),t.required?s("span",{staticClass:"red--text font-weight-bold"},[t._v("*")]):t._e()]},proxy:!0}]),model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})]},proxy:!0},{key:"header",fn:function(){return[t._v(" "+t._s(t.display)+" ")]},proxy:!0},{key:"value",fn:function(){return[t._v(" "+t._s(t.displayValue)+" ")]},proxy:!0}])})},r=[],a=(s("7db0"),s("b287")),n={name:"fhir-code",props:["field","min","max","base-min","base-max","label","binding","slotProps","path","edit","sliceName","readOnlyIfSet","constraints"],components:{IhrisElement:a["a"]},data:function(){return{value:"",loading:!0,errors:[],items:[],source:{path:"",data:{},binding:this.binding},disabled:!1,lockWatch:!1}},created:function(){this.setupData()},watch:{slotProps:{handler:function(){this.lockWatch||this.setupData()},deep:!0}},methods:{setupData:function(){var t=this;if(this.slotProps&&this.slotProps.source){if(this.source={path:this.slotProps.source.path+"."+this.field,data:{}},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data,this.value=this.source.data,this.lockWatch=!0;else{var e=this.$fhirutils.pathFieldExpression(this.field);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,e),1==this.source.data.length&&(this.value=this.source.data[0],this.lockWatch=!0)}this.disabled=this.readOnlyIfSet&&!!this.value}var s=this.binding||this.slotProps.source.binding;this.$fhirutils.expand(s).then((function(e){t.items=e,t.loading=!1})).catch((function(e){console.log(e),t.errors.push(e.message),t.loading=!1}))}},computed:{index:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.index:void 0},display:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.label:this.label},displayValue:function(){var t=this,e=this.items.find((function(e){return e.code===t.value}));return e?e.display:""},required:function(){return(this.index||0)<this.min},rules:function(){var t=this;return this.required?[function(e){return!!e||t.display+" is required"}]:[]}}},o=n,l=s("2877"),c=s("6544"),u=s.n(c),d=s("b974"),h=Object(l["a"])(o,i,r,!1,null,null,null);e["default"]=h.exports;u()(h,{VSelect:d["a"]})},"309c":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._t("default",null,{source:t.source})],2)},r=[],a={name:"fhir-codeable-concept",props:["field","slotProps","sliceName","min","max","base-min","base-max","label","path","binding","edit","constraints"],data:function(){return{source:{path:"",data:{},binding:this.binding},errors:[]}},created:function(){this.setupData()},watch:{slotProps:{handler:function(){this.setupData()},deep:!0}},methods:{setupData:function(){if(this.slotProps&&this.slotProps.source)if(this.source={path:this.slotProps.source.path+"."+this.field,data:{},binding:this.binding},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data;else{var t=this.$fhirutils.pathFieldExpression(this.field);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,t)}}},computed:{display:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.label:this.label}}},n=a,o=s("2877"),l=Object(o["a"])(n,i,r,!1,null,null,null);e["default"]=l.exports},"39e1":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.edit?t._e():s("v-container",{staticClass:"my-3"},[s("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.columns,items:t.items,"item-key":"id","items-per-page":5,loading:t.loading,dense:""},scopedSlots:t._u([{key:"top",fn:function(){return[s("v-toolbar",{attrs:{flat:"",color:"white"}},[s("v-toolbar-title",[t._v(" "+t._s(t.title)+" ")]),s("v-spacer"),t._l(t.topActions,(function(e){return s("v-btn",{key:e.text,attrs:{to:t.setupLink(e.link,{}),color:e.class,small:""}},[t._v(" "+t._s(e.text)+" ")])}))],2)]},proxy:!0},{key:"item._action",fn:function(e){var i=e.item;return t._l(i.actions,(function(e){return s("v-btn",{key:e.text,attrs:{to:t.setupLink(e.link,i),color:e.class,small:"",rounded:""}},[t._v(" "+t._s(e.text)+" ")])}))}}],null,!1,3813068814)})],1)},r=[],a=(s("a623"),s("4de4"),s("7db0"),s("c975"),s("a15b"),s("d81d"),s("d3b7"),s("ac1f"),s("3ca3"),s("5319"),s("9911"),s("ddb0"),s("b85c")),n=(s("96cf"),s("1da1")),o=function(t){return!!t&&t.constructor===Object},l={name:"ihris-secondary",props:["title","field","profile","slotProps","link-id","link-field","search-field","edit","columns","actions"],data:function(){return{source:{data:{},path:this.field},empty:!0,items:[],loading:!0,topActions:[]}},mounted:function(){this.setupData()},watch:{},methods:{setupData:function(){var t="/fhir/"+this.field,e=[];this.profile&&e.push("_profile="+this.profile),this.searchField?e.push(this.searchField+"="+this.linkId):e.push(this.linkField.substring(this.linkField.indexOf(".")+1)+"="+this.linkId),t+="?"+e.join("&"),this.items=[],this.loading=!0,this.addItems(t)},addItems:function(t){var e=this;fetch(t).then((function(s){200===s.status?s.json().then(function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(s){var i,r,n,o,l,c,u,d,h,p,f,v,m,b,y,x,g;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(s.entry&&s.entry.length>0)){t.next=50;break}i=Object(a["a"])(s.entry),t.prev=2,i.s();case 4:if((r=i.n()).done){t.next=40;break}n=r.value,o={id:n.resource.id},l=Object(a["a"])(e.columns),t.prev=8,l.s();case 10:if((c=l.n()).done){t.next=26;break}if(u=c.value,"_action"!==u.value){t.next=14;break}return t.abrupt("continue",24);case 14:return t.prev=14,d=e.$fhirpath.evaluate(n.resource,u.value),t.next=18,e.processContent(d);case 18:o[u.value]=t.sent,t.next=24;break;case 21:t.prev=21,t.t0=t["catch"](14),console.log(t.t0);case 24:t.next=10;break;case 26:t.next=31;break;case 28:t.prev=28,t.t1=t["catch"](8),l.e(t.t1);case 31:return t.prev=31,l.f(),t.finish(31);case 34:o.actions||(o.actions=[]),h=Object(a["a"])(e.actions);try{for(h.s();!(p=h.n()).done;)f=p.value,f.row?f.condition?(v=e.$fhirpath.evaluate(n.resource,f.condition),v.every((function(t){return t}))&&o.actions.push(f)):o.actions.push(f):f.condition?(m=e.$fhirpath.evaluate(n.resource,f.condition),f.hasOwnProperty("meets")?f.meets=f.meets&&m.every((function(t){return t})):f.meets=m.every((function(t){return t}))):f.meets=!0}catch(k){h.e(k)}finally{h.f()}e.items.push(o);case 38:t.next=4;break;case 40:t.next=45;break;case 42:t.prev=42,t.t2=t["catch"](2),i.e(t.t2);case 45:return t.prev=45,i.f(),t.finish(45);case 48:t.next=52;break;case 50:b=Object(a["a"])(e.actions);try{for(b.s();!(y=b.n()).done;)x=y.value,x.row||(x.meets=x.emptyDisplay)}catch(k){b.e(k)}finally{b.f()}case 52:e.topActions=e.actions.filter((function(t){return!t.row&&t.meets})),s.link?(g=s.link.find((function(t){return"next"===t.relation})),g?e.addItems(g.url):e.loading=!1):e.loading=!1;case 54:case"end":return t.stop()}}),t,null,[[2,42,45,48],[8,28,31,34],[14,21]])})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.loading=!1,console.log(t)})):(e.loading=!1,console.log("Unable to fetch",t,s.status))})).catch((function(t){e.loading=!1,console.log(t)}))},processContent:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!Array.isArray(e)){t.next=7;break}return t.next=3,Promise.all(e.map(this.processContent));case 3:return s=t.sent,t.abrupt("return",s.join(" "));case 7:if(!o(e)){t.next=26;break}if(!e.code||!e.system){t.next=14;break}return t.next=11,this.$fhirutils.codeLookup(e.system,e.code);case 11:return t.abrupt("return",t.sent);case 14:if(!e.display){t.next=18;break}return t.abrupt("return",e.display);case 18:if(!e.code){t.next=22;break}return t.abrupt("return",e.code);case 22:return console.log("Unable to process content:",e),t.abrupt("return","Unknown");case 24:t.next=27;break;case 26:return t.abrupt("return",e);case 27:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),setupLink:function(t,e){return t.replace("ITEMID",e.id).replace("FHIRID",this.linkId)}}},c=l,u=s("2877"),d=s("6544"),h=s.n(d),p=s("8336"),f=s("a523"),v=s("8fea"),m=s("2fa4"),b=s("71d9"),y=s("2a7f"),x=Object(u["a"])(c,i,r,!1,null,null,null);e["default"]=x.exports;h()(x,{VBtn:p["a"],VContainer:f["a"],VDataTable:v["a"],VSpacer:m["a"],VToolbar:b["a"],VToolbarTitle:y["a"]})},"6b10":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._t("default",null,{source:t.source})],2)},r=[],a=(s("ac1f"),s("5319"),{name:"fhir-extension",props:["field","sliceName","min","max","base-min","base-max","profile","slotProps","path","edit","constraints"],data:function(){return{source:{path:"",data:[]},errors:[]}},created:function(){this.setupData()},watch:{slotProps:{handler:function(){this.setupData()},deep:!0}},methods:{setupData:function(){if(this.slotProps&&this.slotProps.source)if(this.source={path:this.slotProps.source.path+"."+this.field,data:{}},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data;else{var t;t=this.profile?this.profile:this.sliceName;var e=this.field.replace(/([^:]+):(.+)/,"$1.where(url='"+t+"')");this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,e)}}}}),n=a,o=s("2877"),l=Object(o["a"])(n,i,r,!1,null,null,null);e["default"]=l.exports},7372:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{staticClass:"my-3"},[s("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[t._t("default",null,{source:t.source}),s("v-overlay",{attrs:{value:t.overlay}},[s("v-progress-circular",{attrs:{size:"50",color:"primary",indeterminate:""}})],1),s("v-navigation-drawer",{staticClass:"primary darken-1 white--text",staticStyle:{"z-index":"3"},attrs:{app:"",right:"",permanent:"",clipped:""}},[s("v-list",{staticClass:"white--text"},[s("v-list-item",[t.edit?s("v-btn",{staticClass:"secondary",attrs:{dark:""},on:{click:function(e){return t.$router.go(0)}}},[s("v-icon",{attrs:{light:""}},[t._v("mdi-pencil-off")]),s("span",[t._v("Cancel")])],1):s("v-btn",{staticClass:"secondary",attrs:{dark:""},on:{click:function(e){return t.$emit("set-edit",!t.edit)}}},[s("v-icon",{attrs:{light:""}},[t._v("mdi-pencil")]),s("span",[t._v("Edit")])],1),s("v-spacer"),t.edit?[t.valid?s("v-btn",{staticClass:"success darken-1",attrs:{dark:"",disabled:!t.valid},on:{click:function(e){return t.processFHIR()}}},[s("v-icon",{attrs:{light:""}},[t._v("mdi-content-save")]),s("span",[t._v("Save")])],1):s("v-btn",{staticClass:"warning",attrs:{dark:""},on:{click:function(e){return t.$refs.form.validate()}}},[s("v-icon",{attrs:{light:""}},[t._v("mdi-content-save")]),s("span",[t._v("Save")])],1)]:t._e()],2),s("v-divider",{attrs:{color:"white"}}),!t.edit&&t.links&&t.links.length?t._l(t.links,(function(e,i){return s("v-list-item",{key:e.url},[s("v-btn",{key:e.url,staticClass:"primary",attrs:{text:!e.button,to:t.getLinkUrl(e)}},[e.icon?s("v-icon",{attrs:{light:""}},[t._v(t._s(e.icon))]):t._e(),t._v(" "+t._s(t.linktext[i])+" ")],1)],1)})):t._e(),t.sectionMenu?s("v-subheader",{staticClass:"white--text"},[s("h2",[t._v("Sections")])]):t._e(),t._l(t.sectionMenu,(function(e){return s("v-list-item",{key:e.name,attrs:{href:"#section-"+e.name}},[t.edit&&e.secondary?t._e():s("v-list-item-content",{staticClass:"white--text"},[s("v-list-item-title",{staticClass:"text-uppercase"},[s("h4",[t._v(t._s(e.title))])]),s("v-list-item-subtitle",{staticClass:"white--text"},[t._v(t._s(e.desc))])],1)],1)}))],2)],1)],2)],1)},r=[],a=(s("a623"),s("4160"),s("caad"),s("fb6a"),s("b64b"),s("d3b7"),s("ac1f"),s("2532"),s("5319"),s("1276"),s("2ca0"),s("159b"),s("b85c")),n={name:"ihris-resource",props:["title","field","fhir-id","page","profile","section-menu","edit","links","constraints"],data:function(){return{fhir:{},valid:!0,source:{data:{},path:""},loading:!1,overlay:!1,isEdit:!1,linktext:[],advancedValid:!0}},created:function(){var t=this;if(this.fhirId)this.loading=!0,fetch("/fhir/"+this.field+"/"+this.fhirId).then((function(e){e.json().then((function(e){t.source={data:e,path:t.field},t.setLinkText(),t.loading=!1})).catch((function(e){console.log(t.field,t.fhirId,e)}))})).catch((function(e){console.log(t.field,t.fhirId,e)}));else if(this.$route.query){for(var e={resourceType:this.field},s=!1,i=0,r=Object.keys(this.$route.query);i<r.length;i++){var n=r[i];if(n.startsWith(this.field+".")){s=!0;var o,l=n.substring(this.field.length+1).split("."),c=l.pop(),u=e,d=Object(a["a"])(l);try{for(d.s();!(o=d.n()).done;){var h=o.value;if(h.includes("["))try{var p=h.split("["),f=p[0],v=p[1].slice(0,-1);if(u.hasOwnProperty(f)||(u[f]=[]),v){var m={};u[f][parseInt(v)]=m,u=m}else{var b={};u[f].push(b),u=b}}catch(k){console.log("Unable to process",n);continue}else u.hasOwnProperty(h)||(u[h]={},u=u[h])}}catch(k){d.e(k)}finally{d.f()}if(c.includes("["))try{var y=c.split("["),x=y[0],g=y[1].slice(0,-1);u.hasOwnProperty(x)||(u[x]=[]),g?u[x][parseInt(g)]=this.$route.query[n]:u[x].push(this.$route.query[n])}catch(k){console.log("Unable to process",n);continue}else u[c]=this.$route.query[n]}}s&&(this.source={data:e,path:this.field})}},computed:{hasFhirId:function(){return""!=this.fhirId&&!!this.fhirId}},methods:{getLinkField:function(t){var e=this.$fhirpath.evaluate(this.source.data,t);return!!e&&e[0]},getLinkUrl:function(t){var e;if(t.field&&(e=this.getLinkField(t.field)),e){if(e.includes("/")){var s=e.split("/");e=s[1]}return t.url.replace("FIELD",e)}return t.url},setLinkText:function(){var t=this,e=function(e){var s=t.links[e];if(s.text)t.linktext[e]=s.text;else if(s.field){var i=t.getLinkField(s.field);i&&t.$fhirutils.lookup(i).then((function(s){t.$set(t.linktext,e,s)}))}};for(var s in this.links)e(s)},processFHIR:function(){var t=this;if(this.$refs.form.validate(),this.valid){this.advancedValid=!0,this.overlay=!0,this.loading=!0;var e=function e(s,i,r){r.forEach((function(r){var n,o=s,l=i;if(r.field&&!r.fieldType)if(r.sliceName?r.field.startsWith("value[x]")?(n=r.field.substring(9),o+="."+n):(n=r.field.replace(":"+r.sliceName,""),o+="."+n):(n=r.field,o+="."+n),"1"!==r.max||"1"!==r.baseMax?i.hasOwnProperty(n)||(l[n]=[]):l[n]={},r.hasOwnProperty("value"))Array.isArray(l[n])?l[n].push(r.value):l[n]=r.value,l=l[n];else if(Array.isArray(l[n])){var c={};r.profile?c.url=r.profile:"extension"===n&&r.sliceName&&(c.url=r.sliceName),l[n].push(c),l=c}else l=l[n];if(r.$children&&e(o,l,r.$children),r.constraints){r.errors=[];var u,d=r.constraints.split(","),h=Object(a["a"])(d);try{for(h.s();!(u=h.n()).done;){var p=u.value;if(t.constraints[p]){var f=t.$fhirpath.evaluate(l,t.constraints[p].expression);f.every(Boolean)||(r.errors.push(t.constraints[p].human),t.advancedValid=!1)}}}catch(v){h.e(v)}finally{h.f()}}}))};if(this.fhir={resourceType:this.field,meta:{profile:[this.profile]}},e(this.field,this.fhir,this.$children),!this.advancedValid)return this.overlay=!1,this.loading=!1,void this.$store.commit("setMessage",{type:"error",text:"There were errors on the form."});var s="/fhir/"+this.field,i={method:"POST",headers:{"Content-Type":"application/fhir+json"},redirect:"manual"};this.fhirId&&(this.fhir.id=this.fhirId,s+="/"+this.fhirId,i.method="PUT"),i.body=JSON.stringify(this.fhir),console.log("SAVE",s,this.fhir),this.loading=!1,this.overlay=!1}}}},o=n,l=s("2877"),c=s("6544"),u=s.n(c),d=s("8336"),h=s("a523"),p=s("ce7e"),f=s("4bd4"),v=s("132d"),m=s("8860"),b=s("da13"),y=s("5d23"),x=s("f774"),g=s("a797"),k=s("490a"),_=s("2fa4"),P=s("e0c7"),w=Object(l["a"])(o,i,r,!1,null,null,null);e["default"]=w.exports;u()(w,{VBtn:d["a"],VContainer:h["a"],VDivider:p["a"],VForm:f["a"],VIcon:v["a"],VList:m["a"],VListItem:b["a"],VListItemContent:y["a"],VListItemSubtitle:y["b"],VListItemTitle:y["c"],VNavigationDrawer:x["a"],VOverlay:g["a"],VProgressCircular:k["a"],VSpacer:_["a"],VSubheader:P["a"]})},"89c1":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ihris-complex-card",{attrs:{complexField:t.field,slotProps:t.slotProps,label:t.label,errors:t.errors},scopedSlots:t._u([{key:"default",fn:function(e){return[t._t("default",null,{source:e.source})]}}],null,!0)})},r=[],a=s("fa57"),n={name:"fhir-human-name",props:["field","slotProps","sliceName","min","max","base-min","base-max","label","path","edit","constraints"],data:function(){return{errors:[]}},components:{IhrisComplexCard:a["a"]}},o=n,l=s("2877"),c=Object(l["a"])(o,i,r,!1,null,null,null);e["default"]=c.exports},c408:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ihris-complex-card",{attrs:{complexField:t.field,slotProps:t.slotProps,label:t.label,errors:t.errors},scopedSlots:t._u([{key:"default",fn:function(e){return[t._t("default",null,{source:e.source})]}}],null,!0)})},r=[],a=s("fa57"),n={name:"fhir-identifier",props:["field","slotProps","sliceName","min","max","base-min","base-max","label","path","edit","constraints"],data:function(){return{errors:[]}},components:{IhrisComplexCard:a["a"]}},o=n,l=s("2877"),c=Object(l["a"])(o,i,r,!1,null,null,null);e["default"]=c.exports},e07f:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.edit&&t.secondary?t._e():s("div",{staticClass:"ihris-section",attrs:{id:"section-"+t.name}},[s("v-card",{staticClass:"mx-auto",attrs:{"max-width":"700",outlined:""}},[s("v-card-title",{staticClass:"primary darken-1 white--text text-uppercase font-weight-bold"},[t._v(t._s(t.title)+" ")]),s("v-card-text",{staticClass:"my-3"},[t._t("default",null,{source:t.slotProps.source})],2)],1)],1)},r=[],a={name:"ihris-section",props:["name","slotProps","title","description","edit","secondary"],data:function(){return{}},created:function(){},watch:{},methods:{}},n=a,o=s("2877"),l=s("6544"),c=s.n(l),u=s("b0af"),d=s("99d9"),h=Object(o["a"])(n,i,r,!1,null,null,null);e["default"]=h.exports;c()(h,{VCard:u["a"],VCardText:d["c"],VCardTitle:d["d"]})},eee9:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ihris-element",{attrs:{edit:t.edit,loading:t.loading},scopedSlots:t._u([{key:"form",fn:function(){return[s("v-select",{attrs:{loading:t.loading,label:t.display,items:t.items,outlined:"","hide-details":"auto","error-messages":t.errors,"item-text":"display","item-value":"code",disabled:t.disabled,rules:t.rules,dense:""},on:{change:function(e){t.errors=[]}},scopedSlots:t._u([{key:"label",fn:function(){return[t._v(t._s(t.display)+" "),t.required?s("span",{staticClass:"red--text font-weight-bold"},[t._v("*")]):t._e()]},proxy:!0}]),model:{value:t.valueCode,callback:function(e){t.valueCode=e},expression:"valueCode"}})]},proxy:!0},{key:"header",fn:function(){return[t._v(" "+t._s(t.display)+" ")]},proxy:!0},{key:"value",fn:function(){return[t._v(" "+t._s(t.valueDisplay||t.value.display||"")+" ")]},proxy:!0}])})},r=[],a=(s("7db0"),s("b287")),n={name:"fhir-coding",props:["field","label","sliceName","targetprofile","min","max","base-min","base-max","slotProps","path","binding","edit","readOnlyIfSet","constraints"],components:{IhrisElement:a["a"]},data:function(){return{value:{system:"",code:"",display:""},valueCode:"",valueDisplay:"",loading:!0,errors:[],items:[],source:{path:"",data:{},binding:this.binding},disabled:!1,lockWatch:!1}},created:function(){this.setupData()},watch:{slotProps:{handler:function(){this.lockWatch||this.setupData()},deep:!0},valueCode:function(t){var e=this;if(this.items){var s=this.items.find((function(e){return e.code===t}));s&&(this.value=s)}this.value.system&&this.value.code&&this.$fhirutils.codeLookup(this.value.system,this.value.code,this.binding||this.source.binding).then((function(t){e.valueDisplay=t}))}},methods:{setupData:function(){var t=this;if(this.slotProps&&this.slotProps.source){if(this.source={path:this.slotProps.source.path+"."+this.field,data:{},binding:this.binding||this.slotProps.source.binding},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data,this.source.data&&(this.value=this.source.data,this.valueCode=this.value.code,this.lockWatch=!0);else{var e=this.$fhirutils.pathFieldExpression(this.field);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,e),this.source.data[0]&&(this.value=this.source.data[0],this.valueCode=this.value.code,this.lockWatch=!0)}this.disabled=this.readOnlyIfSet&&!!this.valueCode}var s=this.binding||this.slotProps.source.binding;this.$fhirutils.expand(s).then((function(e){t.items=e,t.loading=!1})).catch((function(e){console.log(e),t.errors=e.message,t.loading=!1}))}},computed:{index:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.index:void 0},display:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.label:this.label},required:function(){return(this.index||0)<this.min},rules:function(){var t=this;return this.required?[function(e){return!!e||t.display+" is required"}]:[]}}},o=n,l=s("2877"),c=s("6544"),u=s.n(c),d=s("b974"),h=Object(l["a"])(o,i,r,!1,null,null,null);e["default"]=h.exports;u()(h,{VSelect:d["a"]})},fa57:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-card",[s("v-card-subtitle",{staticClass:"primary--text text-uppercase font-weight-bold"},[t._v(t._s(t.display))]),t._l(t.errors,(function(e,i){return s("v-card-text",{key:i,staticClass:"error white--text font-weight-bold"},[t._v(t._s(e))])})),s("v-card-text",[t._t("default",null,{source:t.source})],2)],2)},r=[],a={name:"ihris-complex-card",props:["complexField","slotProps","label","errors"],data:function(){return{source:{path:"",data:{}}}},created:function(){this.setupData()},watch:{slotProps:{handler:function(){this.setupData()},deep:!0}},methods:{setupData:function(){if(this.slotProps&&this.slotProps.source)if(this.source={path:this.slotProps.source.path+"."+this.complexField,data:{}},this.slotProps.source.fromArray)this.source.data=this.slotProps.source.data;else{var t=this.$fhirutils.pathFieldExpression(this.complexField);this.source.data=this.$fhirpath.evaluate(this.slotProps.source.data,t)}}},computed:{display:function(){return this.slotProps&&this.slotProps.input?this.slotProps.input.label:this.label}}},n=a,o=s("2877"),l=s("6544"),c=s.n(l),u=s("b0af"),d=s("99d9"),h=Object(o["a"])(n,i,r,!1,null,null,null);e["a"]=h.exports;c()(h,{VCard:u["a"],VCardSubtitle:d["b"],VCardText:d["c"]})}}]);
//# sourceMappingURL=fhir-primary.e6d2fa07.js.map