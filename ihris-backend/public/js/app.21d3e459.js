(function(e){function r(r){for(var t,o,c=r[0],s=r[1],u=r[2],h=0,f=[];h<c.length;h++)o=c[h],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t]);d&&d(r);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,r=0;r<i.length;r++){for(var n=i[r],t=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(t=!1)}t&&(i.splice(r--,1),e=s(s.s=n[0]))}return e}var t={},o={app:0},a={app:0},i=[];function c(e){return s.p+"js/"+({about:"about","fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero":"fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero","fhir-main~mhero":"fhir-main~mhero",mhero:"mhero","dashboard~questionnaire":"dashboard~questionnaire",dashboard:"dashboard",questionnaire:"questionnaire",report:"report",resource:"resource","resource-add":"resource-add","fhir-search":"fhir-search","fhir-main":"fhir-main","fhir-secondary":"fhir-secondary","fhir-questionnaire":"fhir-questionnaire","fhir-decimal":"fhir-decimal","fhir-codesystem":"fhir-codesystem","fhir-primary":"fhir-primary","fhir-name":"fhir-name","fhir-outcome":"fhir-outcome"}[e]||e)+"."+{about:"3247fb80","chunk-6f5e7131":"4ec774bc","chunk-4f1f2f6c":"45f22f6b","chunk-7123fce8":"04318233","chunk-1746ed4e":"68ae1fbb","fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero":"4acd4d7f","fhir-main~mhero":"8926ae4d",mhero:"ef95755e","chunk-0bf56be0":"4c078600","chunk-92d8529a":"410a9377","chunk-fbc44fa2":"1a84f853","chunk-fbc7f25e":"f03f9f76","dashboard~questionnaire":"daeed602",dashboard:"7ad1fb38",questionnaire:"786ddcd6",report:"2dfdc2ae",resource:"12ed22b4","resource-add":"60c53a50","fhir-search":"5ac452b3","chunk-2d213c9b":"3af227ca","fhir-main":"d039ba9b","fhir-secondary":"379e4a41","fhir-questionnaire":"0ec9ddb1","fhir-decimal":"b3231466","fhir-codesystem":"0117e0f5","fhir-primary":"ddc8106d","fhir-name":"9d4da3e5","fhir-outcome":"7fa1e285"}[e]+".js"}function s(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var r=[],n={"chunk-6f5e7131":1,"chunk-4f1f2f6c":1,"chunk-7123fce8":1,"chunk-1746ed4e":1,"fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero":1,"fhir-main~mhero":1,mhero:1,"chunk-0bf56be0":1,questionnaire:1,"fhir-search":1,"fhir-main":1,"fhir-secondary":1,"fhir-questionnaire":1,"fhir-codesystem":1,"fhir-primary":1};o[e]?r.push(o[e]):0!==o[e]&&n[e]&&r.push(o[e]=new Promise((function(r,n){for(var t="css/"+({about:"about","fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero":"fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero","fhir-main~mhero":"fhir-main~mhero",mhero:"mhero","dashboard~questionnaire":"dashboard~questionnaire",dashboard:"dashboard",questionnaire:"questionnaire",report:"report",resource:"resource","resource-add":"resource-add","fhir-search":"fhir-search","fhir-main":"fhir-main","fhir-secondary":"fhir-secondary","fhir-questionnaire":"fhir-questionnaire","fhir-decimal":"fhir-decimal","fhir-codesystem":"fhir-codesystem","fhir-primary":"fhir-primary","fhir-name":"fhir-name","fhir-outcome":"fhir-outcome"}[e]||e)+"."+{about:"31d6cfe0","chunk-6f5e7131":"4324ea9a","chunk-4f1f2f6c":"17277de6","chunk-7123fce8":"74f3551e","chunk-1746ed4e":"41be0e80","fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero":"cfef7a8a","fhir-main~mhero":"0db1c378",mhero:"f5831349","chunk-0bf56be0":"6963ac0f","chunk-92d8529a":"31d6cfe0","chunk-fbc44fa2":"31d6cfe0","chunk-fbc7f25e":"31d6cfe0","dashboard~questionnaire":"31d6cfe0",dashboard:"31d6cfe0",questionnaire:"85e3e243",report:"31d6cfe0",resource:"31d6cfe0","resource-add":"31d6cfe0","fhir-search":"fc0cf4c1","chunk-2d213c9b":"31d6cfe0","fhir-main":"15eba924","fhir-secondary":"8720a55c","fhir-questionnaire":"5e109021","fhir-decimal":"31d6cfe0","fhir-codesystem":"25594ed2","fhir-primary":"898873a0","fhir-name":"31d6cfe0","fhir-outcome":"31d6cfe0"}[e]+".css",a=s.p+t,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var u=i[c],h=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(h===t||h===a))return r()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){u=f[c],h=u.getAttribute("data-href");if(h===t||h===a)return r()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=r,d.onerror=function(r){var t=r&&r.target&&r.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+t+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=t,delete o[e],d.parentNode.removeChild(d),n(i)},d.href=a;var l=document.getElementsByTagName("head")[0];l.appendChild(d)})).then((function(){o[e]=0})));var t=a[e];if(0!==t)if(t)r.push(t[2]);else{var i=new Promise((function(r,n){t=a[e]=[r,n]}));r.push(t[2]=i);var u,h=document.createElement("script");h.charset="utf-8",h.timeout=120,s.nc&&h.setAttribute("nonce",s.nc),h.src=c(e);var f=new Error;u=function(r){h.onerror=h.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var t=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;f.message="Loading chunk "+e+" failed.\n("+t+": "+o+")",f.name="ChunkLoadError",f.type=t,f.request=o,n[1](f)}a[e]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:h})}),12e4);h.onerror=h.onload=u,document.head.appendChild(h)}return Promise.all(r)},s.m=e,s.c=t,s.d=function(e,r,n){s.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,r){if(1&r&&(e=s(e)),8&r)return e;if(4&r&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var t in e)s.d(n,t,function(r){return e[r]}.bind(null,t));return n},s.n=function(e){var r=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(r,"a",r),r},s.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],h=u.push.bind(u);u.push=r,u=u.slice();for(var f=0;f<u.length;f++)r(u[f]);var d=h;i.push([0,"chunk-vendors"]),n()})({0:function(e,r,n){e.exports=n("56d7")},"56d7":function(e,r,n){"use strict";n.r(r),n.d(r,"eventBus",(function(){return he}));n("b0c0"),n("d3b7"),n("4c53"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var t=n("a026"),o=function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("v-app",{attrs:{id:"top"}},[n("v-content",[n("v-snackbar",{staticClass:"mt-12",attrs:{app:"",color:e.$store.state.message.type,timeout:e.$store.state.message.timeout,top:"","multi-line":""},model:{value:e.$store.state.message.active,callback:function(r){e.$set(e.$store.state.message,"active",r)},expression:"$store.state.message.active"}},[e._v(" "+e._s(e.$store.state.message.text)+" "),n("v-btn",{attrs:{icon:"",dark:""},on:{click:function(r){return e.$store.commit("closeMessage")}}},[n("v-icon",[e._v("mdi-close")])],1)],1),n("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:e.$store.state.progress.enabled,callback:function(r){e.$set(e.$store.state.progress,"enabled",r)},expression:"$store.state.progress.enabled"}},[n("v-card",{attrs:{color:"primary",dark:""}},[n("v-card-text",[e._v(" "+e._s(e.$store.state.progress.title)+" "),n("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"white"}})],1)],1)],1),n("v-main",[n("router-view")],1),[n("v-footer",{attrs:{padless:""}},[n("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[e._v(" "+e._s((new Date).getFullYear())+" — "),n("strong",[e._v("MoH")])])],1)]],2)],1)},a=[],i={name:"App"},c=i,s=n("2877"),u=n("6544"),h=n.n(u),f=n("7496"),d=n("8336"),l=n("b0af"),m=n("99d9"),p=n("62ad"),b=n("a75b"),y=n("169a"),g=n("553a"),v=n("132d"),k=n("8e36"),_=n("2db4"),w=Object(s["a"])(c,o,a,!1,null,null,null),P=w.exports;h()(w,{VApp:f["a"],VBtn:d["a"],VCard:l["a"],VCardText:m["c"],VCol:p["a"],VContent:b["a"],VDialog:y["a"],VFooter:g["a"],VIcon:v["a"],VProgressLinear:k["a"],VSnackbar:_["a"]});var C=n("8c4f"),x=function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("v-container",[e.rawHTML?n("v-card",[e.title?n("v-card-title",{staticClass:"primary white--text",attrs:{dark:"","primary-title":""}},[n("h2",[e._v(e._s(e.title))])]):e._e(),n("v-card-text",{staticClass:"pa-5"},[n("div",{domProps:{innerHTML:e._s(e.rawHTML)}})])],1):e._e()],1)},q=[],L={name:"static-page",props:["id","blank-on-err"],data:function(){return{rawHTML:null,title:"Loading..."}},created:function(){var e=this;this.blankOnErr||(this.rawHTML="Loading..."),fetch("/fhir/DocumentReference/"+(this.id||this.$route.params.id)+"/$html").then((function(r){r.ok?r.json().then((function(r){e.rawHTML=r.html,e.title=r.title})).catch((function(r){console.log(r),e.blankOnErr?e.rawHTML=null:(e.title="Error",e.rawHTML="<p>Failed to access requested resource.</p>")})):e.blankOnErr?e.rawHTML=null:(e.title="Error",e.rawHTML="<p>Failed to access requested resource.</p>")})).catch((function(r){console.log(r),e.blankOnErr?e.rawHTML=null:(e.title="Error",e.rawHTML="<p>Failed to access requested resource.</p>")}))}},O=L,j=n("a523"),T=Object(s["a"])(O,x,q,!1,null,null,null),$=T.exports;h()(T,{VCard:l["a"],VCardText:m["c"],VCardTitle:m["d"],VContainer:j["a"]}),t["default"].use(C["a"]);var E=[{path:"/",name:"login",component:function(){return n.e("about").then(n.bind(null,"3bfd"))},redirect:"/sign-in",children:[{path:"/sign-in",name:"sign-in",component:function(){return Promise.all([n.e("chunk-7123fce8"),n.e("chunk-6f5e7131"),n.e("chunk-92d8529a")]).then(n.bind(null,"240c"))}},{path:"/verify-otp",name:"verify-otp",component:function(){return Promise.all([n.e("chunk-6f5e7131"),n.e("chunk-4f1f2f6c")]).then(n.bind(null,"662f"))}},{path:"/forgot-password",name:"forgot-password",component:function(){return Promise.all([n.e("chunk-7123fce8"),n.e("chunk-6f5e7131"),n.e("chunk-fbc44fa2")]).then(n.bind(null,"4bc5"))}},{path:"/reset-password",name:"reset-password",component:function(){return Promise.all([n.e("chunk-7123fce8"),n.e("chunk-6f5e7131"),n.e("chunk-fbc7f25e")]).then(n.bind(null,"0bd4"))}}]},{path:"/dashboard",name:"dashboard",component:function(){return Promise.all([n.e("chunk-7123fce8"),n.e("chunk-6f5e7131"),n.e("chunk-1746ed4e"),n.e("chunk-0bf56be0")]).then(n.bind(null,"4601"))},redirect:"/dashboard/home",children:[{path:"/dashboard/home",name:"home",component:function(){return Promise.all([n.e("dashboard~questionnaire"),n.e("dashboard")]).then(n.bind(null,"6511"))}},{path:"/page/blockContacts",name:"mhero",component:function(){return Promise.all([n.e("chunk-7123fce8"),n.e("chunk-1746ed4e"),n.e("fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero"),n.e("fhir-main~mhero"),n.e("mhero")]).then(n.bind(null,"cf25"))}},{path:"/page/unblockContacts",name:"mhero",component:function(){return Promise.all([n.e("chunk-7123fce8"),n.e("chunk-1746ed4e"),n.e("fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero"),n.e("fhir-main~mhero"),n.e("mhero")]).then(n.bind(null,"6c6d"))}},{path:"/page/mhero",name:"mhero",component:function(){return Promise.all([n.e("chunk-7123fce8"),n.e("chunk-1746ed4e"),n.e("fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero"),n.e("fhir-main~mhero"),n.e("mhero")]).then(n.bind(null,"6629"))}},{path:"/page/mhero-scheduled-message",name:"mhero-scheduled-message",component:function(){return Promise.all([n.e("chunk-7123fce8"),n.e("chunk-1746ed4e"),n.e("fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero"),n.e("fhir-main~mhero"),n.e("mhero")]).then(n.bind(null,"b682"))}},{path:"/page/contact-groups",name:"contact-groups",component:function(){return Promise.all([n.e("chunk-7123fce8"),n.e("chunk-1746ed4e"),n.e("fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero"),n.e("fhir-main~mhero"),n.e("mhero")]).then(n.bind(null,"7dda"))}},{path:"/page/mhero-reports",name:"mhero-reports-base",component:function(){return Promise.all([n.e("chunk-7123fce8"),n.e("chunk-1746ed4e"),n.e("fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero"),n.e("fhir-main~mhero"),n.e("mhero")]).then(n.bind(null,"a232"))}},{path:"/report/:report",name:"mhero-reports",component:function(){return Promise.all([n.e("chunk-7123fce8"),n.e("chunk-1746ed4e"),n.e("fhir-main~fhir-primary~fhir-search~fhir-secondary~mhero"),n.e("fhir-main~mhero"),n.e("mhero")]).then(n.bind(null,"59ef"))}},{path:"/static/:id",name:"static",component:$},{path:"/resource/view/:page/:id",name:"resource_view",component:function(){return n.e("resource").then(n.bind(null,"1a0a"))}},{path:"/resource/search/:page",name:"resource_search",component:function(){return n.e("resource").then(n.bind(null,"9d3d"))}},{path:"/resource/report/:report",name:"resource_report",component:function(){return n.e("report").then(n.bind(null,"2fc5"))}},{path:"/resource/add/:page",name:"resource_add",component:function(){return n.e("resource-add").then(n.bind(null,"cd8b"))}},{path:"/questionnaire/:questionnaire/:page",name:"questionnaire",component:function(){return Promise.all([n.e("dashboard~questionnaire"),n.e("questionnaire")]).then(n.bind(null,"9d48"))}},{path:"/bulk-registration",name:"bulk_registration",component:function(){return Promise.all([n.e("dashboard~questionnaire"),n.e("questionnaire")]).then(n.bind(null,"d608"))}}]}],M=new C["a"]({mode:"history",base:"/",routes:E}),S=M,V=n("2f62");t["default"].use(V["a"]);var I=new V["a"].Store({state:{user:{loggedin:!1,name:"",email:""},idp:"ihris",security_off:!1,message:{type:"info",text:null,timeout:5e3,active:!1},cols:{header:4,content:8},progress:{enabled:!1,title:""}},mutations:{login:function(e,r){e.user.loggedin=!0,e.user.name=r},logout:function(e){e.user.loggedin=!1,e.user.name=""},securityOff:function(e,r){e.security_off=r},closeMessage:function(e){e.message.active=!1},setMessage:function(e,r){"string"===typeof r?(e.message.type="info",e.message.timeout=5e3,e.message.text=r,e.message.active=!0):(e.message.type=r.type||"info",e.message.timeout=r.timeout||5e3,e.message.text=r.text,e.message.active=!0)}},actions:{},modules:{}}),H=n("1321"),A=n.n(H),N=n("4452"),B=n.n(N),F=n("ea7f"),D=n.n(F),U=n("0319"),J=n.n(U),R=n("68ad"),z=n("2b27"),K=n.n(z),Z=n("dcb8"),W=n.n(Z),Y=n("f309");t["default"].use(Y["a"]);var G=new Y["a"]({theme:{options:{customProperties:!0},themes:{light:{primary:{base:"#569fd3",darken1:"0d3552",darken2:"011b2d",lighten1:"ddecf6",lighten2:"f4f7f9"},secondary:{base:"#5f6062",darken1:"04070e",lighten1:"e5e5e5"},accent:"#78496a",error:"#b32317",info:"#005595",success:"#8a8d35",warning:"#d06f1a"}}}}),Q=(n("6d93"),n("0551")),X=n.n(Q),ee=(n("a623"),n("caad"),n("c975"),n("a15b"),n("baa5"),n("fb6a"),n("ac1f"),n("2532"),n("3ca3"),n("1276"),n("2ca0"),n("ddb0"),n("b85c")),re=n("0551"),ne={_code_cache:{},_code_loading:{},_setCache:function(e,r){return ne._code_cache[e]=r,ne._code_loading[e]=!1,r},checkConstraints:function(e,r,n,t,o){return console.log(e),new Promise((function(a,i){var c,s=e.split(","),u=[],h=Object(ee["a"])(s);try{var f=function(){var e=c.value;if(r[e]){var a=re.evaluate(n,r[e].expression);if(e.startsWith("ihris-search")){var i=a.shift(),s=["_elements=id"];while(a.length)s.push(a.shift()+"="+encodeURI(a.shift()));u.push(new Promise((function(n,a){fetch("/fhir/"+i+"?"+s.join("&")).then((function(i){200===i.status?i.json().then((function(a){if(0===a.total)n(!0);else if(o){var i=re.evaluate(a.entry,"resource.id");i.includes(o)?n(!0):(t.push(r[e].human),n(!1))}else t.push(r[e].human),n(!1)})).catch((function(e){a(e)})):a("Failed to search: "+i.status)})).catch((function(e){a(e)}))})))}else a.every(Boolean)?u.push(!0):(t.push(r[e].human),u.push(!1))}};for(h.s();!(c=h.n()).done;)f()}catch(d){h.e(d)}finally{h.f()}Promise.all(u).then((function(e){e.every(Boolean)?a(!0):a(!1)})).catch((function(e){i(e)}))}))},lookup:function(e,r){return e?r?ne.codeLookup(r,e):e.system&&e.code?ne.codeLookup(e.system,e.code):e.reference?ne.resourceLookup(e.reference):/([A-Z]\w*)\/([A-Za-z0-9\-.]{1,64})/.test(e)?ne.resourceLookup(e):new Promise((function(r){return r(e)})):new Promise((function(r){return r(e)}))},resourceLookup:function(e){return new Promise((function(r){var n=e;ne._code_loading[n]?setTimeout((function(){r(ne.resourceLookup(e))}),200):ne._code_cache[n]?r(ne._code_cache[n]):(ne._code_loading[n]=!0,fetch("/fhir/$short-name?reference="+e).then((function(t){200===t.status?t.json().then((function(t){t.display?r(ne._setCache(n,t.display)):(console.log("No display data from reference found ",n,t),r(ne._setCache(n,e)))})).catch((function(t){console.log(t),r(ne._setCache(n,e))})):(console.log("Invalid status from reference $short-name for ",n),r(ne._setCache(n,e)))})).catch((function(t){console.log(t),r(ne._setCache(n,e))})))}))},codeLookup:function(e,r,n){return new Promise((function(t){var o=e+"#"+r;ne._code_loading[o]?setTimeout((function(){t(ne.codeLookup(e,r,n))}),200):ne._code_cache[o]?t(ne._code_cache[o]):(ne._code_loading[o]=!0,fetch("/fhir/$short-name?system="+e+"&code="+r+"&valuset="+n).then((function(e){200===e.status?e.json().then((function(e){e.display?t(ne._setCache(o,e.display)):(console.log("No display data from codesystem found ",o,e),t(ne._setCache(o,r)))})).catch((function(e){console.log(e),t(ne._setCache(o,r))})):(console.log("Invalid status from codesystem $short-name for ",o),t(ne._setCache(o,r)))})).catch((function(e){console.log(e),t(ne._setCache(o,r))})))}))},pathFieldExpression:function(e){var r=e.substring(e.indexOf(":")+1);return r.includes("-")||r.includes(".")?"`"+r+"`":r},expand:function(e){var r=function(e,r){return e.display===r.display?e.code===r.code?0:e.code<r.code?-1:1:e.display<r.display?-1:1},n=function(e,r){if(e.compose.include){var n,t=Object(ee["a"])(e.compose.include);try{for(t.s();!(n=t.n()).done;){var o=n.value;if(o.concept){var a,i=Object(ee["a"])(o.concept);try{for(i.s();!(a=i.n()).done;){var c=a.value;c.system=o.system,r.push(c)}}catch(s){i.e(s)}finally{i.f()}}}}catch(s){t.e(s)}finally{t.f()}}};return new Promise((function(t,o){var a=e.lastIndexOf("/"),i=e.lastIndexOf("|"),c=e.slice(a+1,-1!==i?i:e.length),s=[];fetch("/fhir/ValueSet/"+c+"/$expand").then((function(e){e.ok?e.json().then((function(e){try{e.expansion&&0!==e.expansion.total||!e.compose.include?s=e.expansion.contains:n(e,s),s.sort(r),t(s)}catch(a){console.log(a),o(new Error("Invalid response from server."))}})).catch((function(e){o(e)})):fetch("/fhir/ValueSet/"+c).then((function(e){e.ok?e.json().then((function(e){n(e,s),s.sort(r),t(s)})).catch((function(e){o(e)})):o(new Error("Invalid response from server."))})).catch((function(e){o(e)}))})).catch((function(e){o(e)}))}))}},te=ne,oe=n("7898"),ae=n.n(oe),ie=n("cc46"),ce=n.n(ie),se=n("9516");t["default"].config.productionTip=!1,Object.defineProperty(t["default"].prototype,"$fhirpath",{value:X.a}),Object.defineProperty(t["default"].prototype,"$fhirutils",{value:te});var ue={name:"_blank",specs:["fullscreen=yes","titlebar=yes","scrollbars=yes"],styles:["https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css","https://unpkg.com/kidlat-css/css/kidlat.css"]};t["default"].use(ae.a,ue),t["default"].component("apexchart",A.a),t["default"].component("v-otp-input",ce.a),t["default"].use(B.a),J()(D.a),t["default"].use(n("2ead"));var he=new t["default"];t["default"].use(W.a,{eventEmitter:he,store:I,idleTime:9e5,startAtIdle:!1}),fetch("/config/app").then((function(e){e.json().then((function(e){if(I.state.idp=e.idp,"keycloak"===I.state.idp){var r={realm:e.keycloak.realm,clientId:e.keycloak.UIClientId,url:e.keycloak.baseURL,onLoad:"login-required"},n=R(r),o={install:function(e){e.$keycloak=n}};o.install=function(e){e.$keycloak=n,Object.defineProperties(e.prototype,{$keycloak:{get:function(){return n}}})},t["default"].use(o),n.init({onLoad:r.onLoad}).then((function(e){e?(window.fetch=se(fetch,{headers:{Authorization:"Bearer ".concat(n.token)}}),n.loadUserInfo().then((function(e){var r={resourceType:"Person",id:e.sub,meta:{profile:["http://ihris.org/fhir/StructureDefinition/ihris-person-user"]},name:[{use:"official",text:e.name}],active:!0};e.email&&(r.telecom=[{system:"email",value:e.email}]),fetch("/auth",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify(r)}).then((function(e){e.json().then((function(e){K.a.set("userObj",JSON.stringify(e),"infinity"),new t["default"]({router:S,store:I,vuetify:G,render:function(e){return e(P)}}).$mount("#app")}))})).catch((function(e){console.error(e)}))})),setInterval((function(){n.updateToken(70)}),6e4)):window.location.reload()})).catch((function(){alert("Keycloak access failed")}))}else t["default"].prototype.$keycloak=null,new t["default"]({router:S,store:I,vuetify:G,render:function(e){return e(P)}}).$mount("#app")}))}))}});
//# sourceMappingURL=app.21d3e459.js.map