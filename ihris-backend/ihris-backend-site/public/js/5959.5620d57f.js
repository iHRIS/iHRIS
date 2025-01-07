"use strict";(self["webpackChunkiHRIS_v5"]=self["webpackChunkiHRIS_v5"]||[]).push([[5959],{2245:function(){},35098:function(e,t,i){i.d(t,{Z:function(){return h}});i(26699);var s=i(55648),r=i(98119),a=i(70172),o=i(2936),n=i(48085),l=i(36591),c=i(73325),u=i(71824),h=(0,c.Z)(s.Z,o.Z,l.Z).extend({name:"v-alert",props:{border:{type:String,validator(e){return["top","right","bottom","left"].includes(e)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator(e){return"string"===typeof e||!1===e}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator(e){return["info","error","success","warning"].includes(e)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder(){if(!this.border)return null;let e={staticClass:"v-alert__border",class:{[`v-alert__border--${this.border}`]:!0}};return this.coloredBorder&&(e=this.setBackgroundColor(this.computedColor,e),e.class["v-alert__border--has-color"]=!0),this.$createElement("div",e)},__cachedDismissible(){if(!this.dismissible)return null;const e=this.iconColor;return this.$createElement(r.Z,{staticClass:"v-alert__dismissible",props:{color:e,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:()=>this.isActive=!1}},[this.$createElement(a.Z,{props:{color:e}},this.closeIcon)])},__cachedIcon(){return this.computedIcon?this.$createElement(a.Z,{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes(){const e={...s.Z.options.computed.classes.call(this),"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text};return this.border&&(e[`v-alert--border-${this.border}`]=!0),e},computedColor(){return this.color||this.type},computedIcon(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&`$${this.type}`)},hasColoredIcon(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText(){return this.text||this.outlined},iconColor(){return this.hasColoredIcon?this.computedColor:void 0},isDark(){return!(!this.type||this.coloredBorder||this.outlined)||n.Z.options.computed.isDark.call(this)}},created(){this.$attrs.hasOwnProperty("outline")&&(0,u.fK)("outline","outlined",this)},methods:{genWrapper(){const e=[this.$slots.prepend||this.__cachedIcon,this.genContent(),this.__cachedBorder,this.$slots.append,this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],t={staticClass:"v-alert__wrapper"};return this.$createElement("div",t,e)},genContent(){return this.$createElement("div",{staticClass:"v-alert__content"},this.$slots.default)},genAlert(){let e={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){const t=this.hasText?this.setTextColor:this.setBackgroundColor;e=t(this.computedColor,e)}return this.$createElement("div",e,[this.genWrapper()])},toggle(){this.isActive=!this.isActive}},render(e){const t=this.genAlert();return this.transition?e("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[t]):t}})},83702:function(e,t,i){i.d(t,{Z:function(){return o}});i(2245);var s=i(70172),r=i(58230),a=i(7764),o=a.Z.extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data(){return{inputIndeterminate:this.indeterminate}},computed:{classes(){return{...r.Z.options.computed.classes.call(this),"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate}},computedIcon(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate(e){this.$nextTick((()=>this.inputIndeterminate=e))},inputIndeterminate(e){this.$emit("update:indeterminate",e)},isActive(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox(){const{title:e,...t}=this.attrs$;return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(s.Z,this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",{...t,"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()}),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot(){return[this.genCheckbox(),this.genLabel()]}}})},55533:function(e,t,i){i.d(t,{Z:function(){return a}});var s=i(48085),r=i(73325),a=(0,r.Z)(s.Z).extend({name:"v-subheader",props:{inset:Boolean},render(e){return e("div",{staticClass:"v-subheader",class:{"v-subheader--inset":this.inset,...this.themeClasses},attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})},89155:function(e,t,i){var s=i(46286),r=i(70538);t["Z"]=r["default"].extend({name:"rippleable",directives:{ripple:s.Z},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple(e={}){return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",e)):null}}})},7764:function(e,t,i){i.d(t,{X:function(){return n}});var s=i(58230),r=i(89155),a=i(34419),o=i(73325);function n(e){e.preventDefault()}t["Z"]=(0,o.Z)(s.Z,r.Z,a.Z).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive(){const e=this.value,t=this.internalValue;return this.isMultiple?!!Array.isArray(t)&&t.some((t=>this.valueComparator(t,e))):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,t):Boolean(t):this.valueComparator(t,this.trueValue)},isDirty(){return this.isActive},rippleState(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue(e){this.lazyValue=e,this.hasColor=e}},methods:{genLabel(){const e=s.Z.options.methods.genLabel.call(this);return e?(e.data.on={click:n},e):e},genInput(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:n},ref:"input"})},onClick(e){this.onChange(),this.$emit("click",e)},onChange(){if(!this.isInteractive)return;const e=this.value;let t=this.internalValue;if(this.isMultiple){Array.isArray(t)||(t=[]);const i=t.length;t=t.filter((t=>!this.valueComparator(t,e))),t.length===i&&t.push(e)}else t=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(t,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(t,e)?null:e:!t;this.validate(!0,t),this.internalValue=t,this.hasColor=t},onFocus(e){this.isFocused=!0,this.$emit("focus",e)},onBlur(e){this.isFocused=!1,this.$emit("blur",e)},onKeydown(e){}}})},36591:function(e,t,i){var s=i(70538);t["Z"]=s["default"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}})},65959:function(e,t,i){i.r(t),i.d(t,{default:function(){return P}});var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-container",{attrs:{"grid-list-xs":""}},[i("v-overlay",{attrs:{value:e.overlay}},[i("v-progress-circular",{attrs:{color:"primary",indeterminate:"",size:"50"}}),i("v-btn",{attrs:{icon:""},on:{click:function(t){e.overlay=!1}}},[i("v-icon",[e._v("mdi-close")])],1)],1),i("v-overlay",{attrs:{value:e.overlayUnclosed}},[i("v-progress-circular",{attrs:{color:"primary",indeterminate:"",size:"50"}})],1),i("v-dialog",{attrs:{transition:"dialog-top-transition","max-width":"600"},model:{value:e.leaveRequestDialog,callback:function(t){e.leaveRequestDialog=t},expression:"leaveRequestDialog"}},[i("v-card",[i("v-toolbar",{attrs:{color:"primary",dark:""}},[e._v("About to send leave request")]),i("v-card-text",[e._v(" Are you sure that you want to request "+e._s(this.days)+" Days starting "+e._s(this.$moment(this.startDate).format("DD-MM-YYYY"))+" and ending "+e._s(this.$moment(this.endDate).format("DD-MM-YYYY"))+"? ")]),i("v-card-actions",{staticClass:"justify-end"},[i("v-btn",{attrs:{color:"error"},on:{click:function(t){e.leaveRequestDialog=!1}}},[e._v("Cancel")]),i("v-spacer"),i("v-btn",{on:{click:e.createLeaveRequest}},[e._v("Yes, Proceed")])],1)],1)],1),e.leave.period?i("v-dialog",{attrs:{transition:"dialog-top-transition","max-width":"600"},model:{value:e.detailedViewDialog,callback:function(t){e.detailedViewDialog=t},expression:"detailedViewDialog"}},[i("v-card",[i("v-toolbar",{attrs:{color:"primary",dark:""}},[e._v("Detailed View")]),i("v-card-text",[i("v-list",{attrs:{dense:""}},[i("v-subheader",[e._v("Annual Leave")]),i("v-list-item-group",{attrs:{color:"primary"}},[i("v-row",[i("v-col",[i("v-list-item",[i("v-list-item-content",[i("v-list-item-title",[e._v("Period: "+e._s(e.leave.period))])],1)],1)],1),i("v-col",[i("v-list-item",[i("v-list-item-content",[i("v-list-item-title",[e._v("Leave Days: "+e._s(e.leave.maxDays))])],1)],1)],1)],1),i("v-row",[i("v-col",[i("v-list-item",[i("v-list-item-content",[i("v-list-item-title",[e._v("Accrued: "+e._s(e.leave.accrued))])],1)],1)],1),i("v-col",[i("v-list-item",[i("v-list-item-content",[i("v-list-item-title",[e._v("Days on Leave: "+e._s(e.leave.daysOnLeave))])],1)],1)],1)],1),i("v-row",[i("v-col",[i("v-list-item",[i("v-list-item-content",[i("v-list-item-title",[e._v("Expires in 6 Months After "+e._s(e.leave.period.split("/")[0])+": "+e._s(e.leave.carry.days-e.leave.carry.taken-e.leave.expired))])],1)],1)],1),i("v-col",[i("v-list-item",[i("v-list-item-content",[i("v-list-item-title",[e._v("Expired: "+e._s(e.leave.expired))])],1)],1)],1)],1),i("v-row",[i("v-list-item",[i("v-list-item-content",[i("v-list-item-title",[e._v("Balance: "+e._s(e.leave.balance))])],1)],1)],1)],1)],1)],1),i("v-card-actions",{staticClass:"justify-end"},[i("v-btn",{on:{click:function(t){e.detailedViewDialog=!1}}},[e._v("OK")])],1)],1)],1):e._e(),i("v-navigation-drawer",{staticClass:"primary darken-1 white--text",staticStyle:{"z-index":"3"},attrs:{app:"",clipped:"",permanent:"",right:""}},[i("v-list",{staticClass:"white--text"},[i("v-list-item",[i("v-btn",{staticClass:"secondary",attrs:{dark:""},on:{click:function(t){return e.$router.push("/resource/view/practitioner/"+e.queries.practitioner)}}},[i("v-icon",{attrs:{light:"",left:""}},[e._v("mdi-eye")]),i("span",[e._v("View Health Profession")])],1)],1)],1)],1),e.staffName?i("v-alert",{attrs:{border:"bottom",outlined:""}},[i("b",[e._v("Leave Request For: "+e._s(e.staffName))])]):e._e(),i("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.leaveDetailsHeaders,items:e.leaveDetails,"items-per-page":15},scopedSlots:e._u([{key:"item.action",fn:function(t){var s=t.item;return["annual"==s.categoryid?i("v-btn",{attrs:{text:"",color:"success"},on:{click:function(t){return e.detailedView(s)}}},[i("v-icon",{attrs:{left:""}},[e._v("mdi-eye-arrow-right")]),e._v("View")],1):e._e()]}}])}),e.noSupervisor?i("v-alert",{attrs:{border:"bottom",type:"error",elevation:"10",outlined:""}},[i("b",[e._v("This practitioner has no supervisor assigned, assign supervisor before requesting leave")])]):e._e(),i("v-card",[i("v-card-title",{attrs:{"primary-title":""}},[e._v(" Select Category* ")]),i("v-card-text",[i("v-row",{attrs:{"no-gutters":""}},e._l(e.leaveCategories,(function(t){return i("v-col",{key:t.value,attrs:{cols:"3"}},[i("v-checkbox",{attrs:{label:t.text,value:t.value,disabled:e.disabledCategory[t.value]||e.noSupervisor},on:{change:e.checkCategorySelection},model:{value:e.selectedCategories,callback:function(t){e.selectedCategories=t},expression:"selectedCategories"}})],1)})),1),e.invalidDates?i("div",{staticStyle:{color:"red"}},[e._v(" Start Date must be before end date"),i("br")]):e._e(),i("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[i("v-row",[i("v-col",{attrs:{cols:"6"}},[i("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on;return[i("v-text-field",e._g({attrs:{label:"Start Date*","prepend-inner-icon":"mdi-calendar",readonly:"",outlined:"","hide-details":"auto",dense:""},on:{input:function(t){e.days=0}},model:{value:e.startDateFormatted,callback:function(t){e.startDateFormatted=t},expression:"startDateFormatted"}},s))]}}]),model:{value:e.startDateMenu,callback:function(t){e.startDateMenu=t},expression:"startDateMenu"}},[i("v-date-picker",{on:{change:function(t){e.startDateFormatted=e.formatDate(e.startDate)},input:function(t){e.startDateMenu=!1}},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}})],1)],1),i("v-col",{attrs:{cols:"6"}},[i("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on;return[i("v-text-field",e._g({attrs:{label:"End Date*","prepend-inner-icon":"mdi-calendar",readonly:"",outlined:"","hide-details":"auto",dense:""},on:{input:function(t){e.days=0}},model:{value:e.endDateFormatted,callback:function(t){e.endDateFormatted=t},expression:"endDateFormatted"}},s))]}}]),model:{value:e.endDateMenu,callback:function(t){e.endDateMenu=t},expression:"endDateMenu"}},[i("v-date-picker",{on:{change:function(t){e.endDateFormatted=e.formatDate(e.endDate)},input:function(t){e.endDateMenu=!1}},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}})],1)],1),e.requiresSupportingDoc?i("v-col",{attrs:{cols:"6"}},[e.requiresSupportingDoc?i("fhir-attachment",{attrs:{field:"value[x]:valueAttachment",label:"Supporting Document",min:"1",max:"1",path:"attachment",slotProps:{source:{path:".extension:attachment",data:[]}},edit:!0}}):e._e()],1):e._e(),e.hasSupervisee?i("v-col",{attrs:{cols:"6"}},[i("fhir-reference",{attrs:{field:"value[x]:valueReference",edit:!0,path:"actingSupervisor",displayCondition:"",id:"actingSupervisor",targetProfile:"http://ihris.org/fhir/StructureDefinition/ihris-practitioner",targetResource:"Practitioner",report:"ihris-es-report-staff-directorate",reportReturnValue:"ihris-es-report-position-list.id",referenceDisplayPath:"Practitioner.name.given.first() + ' ' + Practitioner.name.family.first()",label:"Acting Supervisor",displayType:"reportSelect",min:"1",max:"1"}})],1):e._e(),e.days||0===e.days?i("v-col",{attrs:{cols:"12"}},[i("b",[e._v("This will give you "),[e._v(e._s(e.days))],e._v(" Days of leave")],2),i("br"),"N/A"!==e.accruedDays&&e.accruedDays<e.days?i("div",{staticStyle:{color:"red"}},[e._v(" You are requesting more days than what you have accrued, adjust the end date ")]):e._e(),e.days>=90&&e.selectedCategories.includes("unpaidauthorized")?i("div",{staticStyle:{color:"red"}},[e._v(" This will require ED Approval ")]):e._e()]):e._e()],1)],1)],1),i("v-card-actions",[i("v-btn",{attrs:{color:"success",disabled:!e.canSubmitLeave},on:{click:e.displayRequestDialog}},[e._v("Submit Request")]),i("v-spacer"),i("v-btn",{attrs:{color:"primary",disabled:!e.canGoNext},on:{click:e.getDays}},[e._v("Check")])],1),i("br"),i("br")],1)],1)},r=[],a=(i(26699),{props:["queries"],data(){return{valid:!0,overlay:!1,overlayUnclosed:!1,loading:!1,noSupervisor:!1,leaveRequestDialog:!1,leaveDetails:[],leave:{},leaveCategories:[],selectedCategories:[],disabledCategory:{},startDateMenu:!1,endDateMenu:!1,startDateFormatted:"",endDateFormatted:"",startDate:"",endDate:"",days:"",balanceDays:"",accruedDays:"",errors:{days:[]},leaveDetailsHeaders:[{text:"Period",value:"period"},{text:"Category",value:"category"},{text:"Leave Days",value:"maxDays"},{text:"Accrued",value:"accrued"},{text:"Days on Leave",value:"daysOnLeave"},{text:"Expired",value:"expired"},{text:"Balance",value:"balance"},{text:"Action",value:"action"}],hasSupervisee:!1,staffName:"",detailedViewDialog:!1}},watch:{endDateFormatted(){this.days=""},startDateFormatted(){this.days=""}},computed:{requiresSupportingDoc(){return!!(this.selectedCategories.includes("study")||this.selectedCategories.includes("sick")||this.selectedCategories.includes("sickhalfpay")||this.selectedCategories.includes("specialsick")||this.selectedCategories.includes("maternity"))},canGoNext(){return!(!(this.selectedCategories.length&&this.startDate&&this.endDate)||this.invalidDates)},canSubmitLeave(){return!(!this.days||!(this.days<=this.accruedDays||"N/A"===this.accruedDays))},leavePeriod(){if(this.selectedCategories.length&&this.leaveDetails.length){let e=this.leaveDetails.find((e=>e.categoryid===this.selectedCategories[0]));if(e)return e.currentPeriod||e.period}return""},invalidDates(){return!!(this.startDate&&this.endDate&&this.$moment(this.startDate).isAfter(this.endDate))},daysrule(){return[e=>(this.errors.days=[],e?!!Number.isInteger(e)||(this.errors.days=["Days must be a number"],"Days must be a number"):(this.errors.days=["Days is required"],"Days is required"))]}},methods:{detailedView(e){this.leave=e,this.detailedViewDialog=!0},getSupervisor(){return new Promise((e=>{fetch("/site/leave/getSupervisor/"+this.queries.practitioner).then((t=>t.json().then((t=>{t.supervisor?this.noSupervisor=!1:this.noSupervisor=!0,e()}))))}))},populateCarry(){this.overlayUnclosed=!0,fetch("/site/leave/populateCarry/"+this.queries.practitioner).then((()=>{Promise.all([this.isActive(),this.isContractorLeaveDaysImported(),this.getLeaveBalance(),this.getLeaveCategories(),this.getSupervisor()]).then((()=>{this.overlayUnclosed=!1}))}))},displayRequestDialog(){this.$refs.form.validate(),this.valid&&(this.leaveRequestDialog=!0)},formatDate(e){return e?this.$moment(e).format("DD-MM-YYYY"):null},getDays(){if(this.selectedCategories.includes("sick")&&this.$moment(this.endDate).isAfter(this.$moment().format("YYYY-MM-DD")))return void this.$store.commit("setMessage",{type:"error",text:"Cant request sick leave for future dates"});if(this.selectedCategories.includes("unpaidunauthorized")&&this.$moment(this.endDate).isAfter(this.$moment().format("YYYY-MM-DD")))return void this.$store.commit("setMessage",{type:"error",text:"Cant request Unauthorized Unpaid leave for future dates"});let e=this.leavePeriod.split("/")[0];this.$moment(e).isAfter(this.startDate)?this.$store.commit("setMessage",{type:"error",text:"Start date is not in the range of current leave period "+this.leavePeriod}):fetch("/site/leave/balance/"+this.queries.practitioner+"/"+this.startDate).then((e=>e.json().then((e=>{let t=e.find((e=>this.selectedCategories.includes(e.categoryid)));this.balanceDays=t.balance,this.accruedDays=t.accrued,fetch("/site/leave/getDays/"+this.queries.practitioner+"/"+this.startDate+"/"+this.endDate).then((e=>{e.ok?e.json().then((e=>{this.days=e})):e.text().then((e=>{this.$store.commit("setMessage",{type:"error",text:e})}))}))}))))},checkCategorySelection(){if(this.disabledCategory={},0!==this.selectedCategories.length)for(let e of this.leaveCategories)this.selectedCategories.includes(e.value)||this.$set(this.disabledCategory,e.value,!0)},getLeaveCategories(){return new Promise((e=>{fetch("/fhir/Basic?_profile=http://ihris.org/fhir/StructureDefinition/na-leave-category-profile&_count=200").then((t=>t.json().then((async t=>{if(t&&t.entry&&t.entry.length)for(let e of t.entry){let t=e.resource.extension.find((e=>"http://ihris.org/fhir/StructureDefinition/ihris-basic-name"===e.url)).valueString;this.leaveCategories.push({text:t,value:e.resource.id})}return e()}))))}))},checkSupervisee(){return new Promise((e=>{fetch("/site/leave/checkSupervisee/"+this.queries.practitioner).then((t=>t.json().then((t=>(t.total&&(this.hasSupervisee=!0),this.overlayUnclosed=!1,e())))))}))},isActive(){return new Promise((e=>{fetch("/site/leave/isActive/"+this.queries.practitioner).then((t=>t.json().then((t=>{if(!t.status)return this.overlay,this.$store.commit("setMessage",{type:"error",text:"You are not an active employee."}),this.$router.go(-1);e()})).catch((()=>(this.$store.commit("setMessage",{type:"error",text:"An error has occured, try later"}),this.$router.go(-1)))))).catch((()=>(this.$store.commit("setMessage",{type:"error",text:"An error has occured, try later"}),this.$router.go(-1))))}))},isContractorLeaveDaysImported(){return new Promise((e=>{fetch("/site/leave/isContractorLeaveDaysImported/"+this.queries.practitioner).then((t=>t.json().then((t=>{if(t.message)return this.overlay,this.$store.commit("setMessage",{type:"error",text:t.message}),this.$router.go(-1);e()})).catch((()=>(this.$store.commit("setMessage",{type:"error",text:"An error has occured, try later"}),this.$router.go(-1)))))).catch((()=>(this.$store.commit("setMessage",{type:"error",text:"An error has occured, try later"}),this.$router.go(-1))))}))},getLeaveBalance(){return new Promise((e=>{fetch("/site/leave/balance/"+this.queries.practitioner).then((t=>t.json().then((async t=>(this.leaveDetails=t,await this.checkSupervisee(),e())))))}))},createLeaveRequest(){if(this.$refs.form.validate(),!this.valid)return;this.overlayUnclosed=!0;let e=[];this.populateValues(this.$children,e);let t=e.find((e=>"attachment"===e.path)),i=e.find((e=>"actingSupervisor"===e.path)),s={startDate:this.startDate,endDate:this.endDate,leaveCategory:this.selectedCategories};t&&(s.attachment=t.value),i&&(s.actingSupervisor=i.value.reference),fetch("/site/leave/createLeaveRequest/"+this.queries.practitioner,{method:"POST",headers:{"Content-Type":"application/json"},redirect:"manual",body:JSON.stringify(s)}).then((e=>{this.overlayUnclosed=!1,this.leaveRequestDialog=!1,201===e.status?(this.$store.commit("setMessage",{type:"success",text:"Leave Request Created Successfully"}),e.json().then((e=>{this.$router.push("/custom/leave-request-view?path=/namibia/components&id="+e.id)}))):e.json().then((e=>{this.$store.commit("setMessage",{type:"error",text:e.message})}))})).catch((()=>{this.overlayUnclosed=!1,this.$store.commit("setMessage",{type:"error",text:"Failed To Create Carry Forward Request."})}))},populateValues(e,t){for(let i of e)i.qField&&i.value&&i.path&&t.push({qField:i.qField,path:i.path,value:i.value}),i.$children&&this.populateValues(i.$children,t)}},components:{"fhir-attachment":()=>Promise.all([i.e(6049),i.e(7833)]).then(i.bind(i,46049)),"fhir-reference":()=>Promise.all([i.e(591),i.e(1904),i.e(333)]).then(i.bind(i,41904))},created(){this.$fhirutils.resourceLookup("Practitioner/"+this.queries.practitioner).then((e=>{this.staffName=e}));let e=this.$store.state.user.obj.resource.extension.find((e=>"http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference"===e.url));e&&(e=e.valueReference.reference);let t=this.$store.state.user.obj.resource.extension.find((e=>"http://ihris.org/fhir/StructureDefinition/ihris-assign-role"===e.url));if(e!=="Practitioner/"+this.queries.practitioner&&t&&"Basic/na-hr-manager"!==t.valueReference.reference&&"Basic/na-hr-staff"!==t.valueReference.reference)return this.$store.commit("setMessage",{type:"error",text:"Only HR Or staff him/her self can request leave."}),this.$router.go(-1);this.populateCarry()}}),o=a,n=i(43736),l=i(43453),c=i.n(l),u=i(35098),h=i(63150),d=i(32371),v=i(37118),p=i(83702),m=i(82102),f=i(4228),g=i(40865),y=i(89771),D=i(4497),b=i(46232),C=i(96428),x=i(16816),_=i(97620),$=i(60527),k=i(73123),S=i(41152),V=i(65132),w=i(51058),Z=i(90624),q=i(62877),A=i(99762),I=i(55533),M=i(55978),B=i(36656),L=(0,n.Z)(o,s,r,!1,null,null,null),P=L.exports;c()(L,{VAlert:u.Z,VBtn:h.Z,VCard:d.Z,VCardActions:v.h7,VCardText:v.ZB,VCardTitle:v.EB,VCheckbox:p.Z,VCol:m.Z,VContainer:f.Z,VDataTable:g.Z,VDatePicker:y.Z,VDialog:D.Z,VForm:b.Z,VIcon:C.Z,VList:x.Z,VListItem:_.Z,VListItemContent:$.km,VListItemGroup:k.Z,VListItemTitle:$.V9,VMenu:S.Z,VNavigationDrawer:V.Z,VOverlay:w.Z,VProgressCircular:Z.Z,VRow:q.Z,VSpacer:A.Z,VSubheader:I.Z,VTextField:M.Z,VToolbar:B.Z})}}]);
//# sourceMappingURL=5959.5620d57f.js.map