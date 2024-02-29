"use strict";(self["webpackChunkiHRIS_v5"]=self["webpackChunkiHRIS_v5"]||[]).push([[1276],{2245:function(){},1835:function(e,t,i){i.d(t,{Z:function(){return o}});i(6699);var s=i(3986),a=i(5978),n=i(6290),l=i(4589);const r={...s.l,offsetY:!0,offsetOverflow:!0,transition:!1};var o=s.Z.extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:(e,t,i)=>i.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1},hideNoData:Boolean,menuProps:{type:s.Z.options.props.menuProps.type,default:()=>r},noFilter:Boolean,searchInput:{type:String}},data(){return{lazySearch:this.searchInput}},computed:{classes(){return{...s.Z.options.computed.classes.call(this),"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1}},computedItems(){return this.filteredItems},selectedValues(){return this.selectedItems.map((e=>this.getValue(e)))},hasDisplayedItems(){return this.hideSelected?this.filteredItems.some((e=>!this.hasItem(e))):this.filteredItems.length>0},currentRange(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems(){return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((e=>{const t=(0,l.qF)(e,this.itemText),i=null!=t?String(t):"";return this.filter(e,String(this.internalSearch),i)}))},internalSearch:{get(){return this.lazySearch},set(e){this.lazySearch!==e&&(this.lazySearch=e,this.$emit("update:search-input",e))}},isAnyValueAllowed(){return!1},isDirty(){return this.searchIsDirty||this.selectedItems.length>0},isSearching(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps(){const e=s.Z.options.computed.$_menuProps.call(this);return e.contentClass=`v-autocomplete__content ${e.contentClass||""}`.trim(),{...r,...e}},searchIsDirty(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem(){return this.multiple?null:this.selectedItems.find((e=>this.valueComparator(this.getValue(e),this.getValue(this.internalValue))))},listData(){const e=s.Z.options.computed.listData.call(this);return e.props={...e.props,items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch},e}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused(e){e?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.blur(),this.updateSelf())},isMenuActive(e){!e&&this.hasSlot&&(this.lazySearch=null)},items(e,t){t&&t.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!e.length||this.activateMenu()},searchInput(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created(){this.setSearch()},destroyed(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged(e,t){if(e!==t){if(!this.autoSelectFirst){const i=t[this.$refs.menu.listIndex];i?this.setMenuIndex(e.findIndex((e=>e===i))):this.setMenuIndex(-1),this.$emit("update:list-index",this.$refs.menu.listIndex)}this.$nextTick((()=>{this.internalSearch&&(1===e.length||this.autoSelectFirst)&&(this.$refs.menu.getTiles(),this.autoSelectFirst&&e.length&&(this.setMenuIndex(0),this.$emit("update:list-index",this.$refs.menu.listIndex)))}))}},onInternalSearchChanged(){this.updateMenuDimensions()},updateMenuDimensions(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex(e){this.searchIsDirty||(this.multiple&&e===l.Do.left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&e===l.Do.right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:e!==l.Do.backspace&&e!==l.Do["delete"]||this.deleteCurrentItem())},deleteCurrentItem(){const e=this.selectedIndex,t=this.selectedItems[e];if(!this.isInteractive||this.getDisabled(t))return;const i=this.selectedItems.length-1;if(-1===this.selectedIndex&&0!==i)return void(this.selectedIndex=i);const s=this.selectedItems.length,a=e!==s-1?e:e-1,n=this.selectedItems[a];n?this.selectItem(t):this.setValue(this.multiple?[]:null),this.selectedIndex=a},clearableCallback(){this.internalSearch=null,s.Z.options.methods.clearableCallback.call(this)},genInput(){const e=a.Z.options.methods.genInput.call(this);return e.data=(0,n.ZP)(e.data,{attrs:{"aria-activedescendant":(0,l.vO)(this.$refs.menu,"activeTile.id"),autocomplete:(0,l.vO)(e.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),e},genInputSlot(){const e=s.Z.options.methods.genInputSlot.call(this);return e.data.attrs.role="combobox",e},genSelections(){return this.hasSlot||this.multiple?s.Z.options.methods.genSelections.call(this):[]},onClick(e){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(e.target)||this.activateMenu())},onInput(e){if(this.selectedIndex>-1||!e.target)return;const t=e.target,i=t.value;t.value&&this.activateMenu(),this.multiple||""!==i||this.deleteCurrentItem(),this.internalSearch=i,this.badInput=t.validity&&t.validity.badInput},onKeyDown(e){const t=e.keyCode;!e.ctrlKey&&[l.Do.home,l.Do.end].includes(t)||s.Z.options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown(e){},onTabDown(e){s.Z.options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown(e){e.preventDefault(),this.activateMenu()},selectItem(e){s.Z.options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems(){s.Z.options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch(){this.$nextTick((()=>{this.multiple&&this.internalSearch&&this.isMenuActive||(this.internalSearch=!this.selectedItems.length||this.multiple||this.hasSlot?null:this.getText(this.selectedItem))}))},updateSelf(){(this.searchIsDirty||this.internalValue)&&(this.multiple||this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem(e){return this.selectedValues.indexOf(this.getValue(e))>-1},onCopy(e){var t,i;if(-1===this.selectedIndex)return;const s=this.selectedItems[this.selectedIndex],a=this.getText(s);null==(t=e.clipboardData)||t.setData("text/plain",a),null==(i=e.clipboardData)||i.setData("text/vnd.vuetify.autocomplete.item+plain",a),e.preventDefault()}}})},8978:function(e,t,i){i.d(t,{Z:function(){return f}});var s=i(5097),a=i(172),n=i(8230),l=i(6210),r=i(6952),o=i(7352),h=i(9155),u=i(8085),c=i(7764),d=i(4589),p=i(3325),m=i(6290);const v=(0,p.Z)(l.Z,r.Z,h.Z,(0,o.d)("radioGroup"),u.Z);var f=v.extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:Boolean,id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:Boolean,value:{default:null}},data:()=>({isFocused:!1}),computed:{classes(){return{"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused,...this.themeClasses,...this.groupClasses}},computedColor(){return c.Z.options.computed.computedColor.call(this)},computedIcon(){return this.isActive?this.onIcon:this.offIcon},computedId(){return n.Z.options.computed.computedId.call(this)},hasLabel:n.Z.options.computed.hasLabel,hasState(){return(this.radioGroup||{}).hasState},isDisabled(){return this.disabled||!!this.radioGroup&&this.radioGroup.isDisabled},isReadonly(){return this.readonly||!!this.radioGroup&&this.radioGroup.isReadonly},computedName(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||`radio-${this.radioGroup._uid}`},rippleState(){return c.Z.options.computed.rippleState.call(this)},validationState(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput(e){return c.Z.options.methods.genInput.call(this,"radio",e)},genLabel(){return this.hasLabel?this.$createElement(s.Z,{on:{click:c.X},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},(0,d.z9)(this,"label")||this.label):null},genRadio(){const{title:e,...t}=this.attrs$;return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(a.Z,this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput({name:this.computedName,value:this.value,...t}),this.genRipple(this.setTextColor(this.rippleState))])},onFocus(e){this.isFocused=!0,this.$emit("focus",e)},onBlur(e){this.isFocused=!1,this.$emit("blur",e)},onChange(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:()=>{}},render(e){const t={staticClass:"v-radio",class:this.classes,on:(0,m.bp)({click:this.onChange},this.listeners$),attrs:{title:this.attrs$.title}};return e("div",t,[this.genRadio(),this.genLabel()])}})},4739:function(e,t,i){i.d(t,{Z:function(){return r}});i(2245);var s=i(8230),a=i(4622),n=i(3325);const l=(0,n.Z)(a.y,s.Z);var r=l.extend({name:"v-radio-group",provide(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes(){return{...s.Z.options.computed.classes.call(this),"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row}}},methods:{genDefaultSlot(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},s.Z.options.methods.genDefaultSlot.call(this))},genInputSlot(){const e=s.Z.options.methods.genInputSlot.call(this);return delete e.data.on.click,e},genLabel(){const e=s.Z.options.methods.genLabel.call(this);return e?(e.data.attrs.id=this.computedId,delete e.data.attrs.for,e.tag="legend",e):null},onClick:a.y.options.methods.onClick},render(e){const t=s.Z.options.render.call(this,e);return this._b(t.data,"div",this.attrs$),t}})},9155:function(e,t,i){var s=i(6286),a=i(538);t["Z"]=a["default"].extend({name:"rippleable",directives:{ripple:s.Z},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple(e={}){return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",e)):null}}})},7764:function(e,t,i){i.d(t,{X:function(){return r}});var s=i(8230),a=i(9155),n=i(4419),l=i(3325);function r(e){e.preventDefault()}t["Z"]=(0,l.Z)(s.Z,a.Z,n.Z).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive(){const e=this.value,t=this.internalValue;return this.isMultiple?!!Array.isArray(t)&&t.some((t=>this.valueComparator(t,e))):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,t):Boolean(t):this.valueComparator(t,this.trueValue)},isDirty(){return this.isActive},rippleState(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue(e){this.lazyValue=e,this.hasColor=e}},methods:{genLabel(){const e=s.Z.options.methods.genLabel.call(this);return e?(e.data.on={click:r},e):e},genInput(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:r},ref:"input"})},onClick(e){this.onChange(),this.$emit("click",e)},onChange(){if(!this.isInteractive)return;const e=this.value;let t=this.internalValue;if(this.isMultiple){Array.isArray(t)||(t=[]);const i=t.length;t=t.filter((t=>!this.valueComparator(t,e))),t.length===i&&t.push(e)}else t=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(t,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(t,e)?null:e:!t;this.validate(!0,t),this.internalValue=t,this.hasColor=t},onFocus(e){this.isFocused=!0,this.$emit("focus",e)},onBlur(e){this.isFocused=!1,this.$emit("blur",e)},onKeydown(e){}}})},2509:function(e,t,i){i.r(t),i.d(t,{default:function(){return y}});var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("label",[e.isDropDown&&!e.hideFilters?i("v-autocomplete",{staticClass:"ma-1",attrs:{error:e.error,"error-messages":e.err_messages,items:e.items,label:e.label,loading:e.loading,clearable:"",dense:"","hide-details":"","item-text":"display","item-value":"code",multiple:"",outlined:"","small-chips":""},on:{change:function(t){return e.updateSearch()},"click:clear":function(t){return e.clearSearch()}},scopedSlots:e._u([{key:"prepend-item",fn:function(){return[i("v-radio-group",{attrs:{row:""},on:{change:function(t){return e.updateSearch()}},model:{value:e.filterType,callback:function(t){e.filterType=t},expression:"filterType"}},[i("v-radio",{attrs:{label:"Include",value:"include"}}),i("v-radio",{attrs:{label:"Exclude",value:"exclude"}})],1),i("v-divider")]},proxy:!0}],null,!1,1071381286),model:{value:e.value,callback:function(t){e.value=t},expression:"value"}}):e.hideFilters?e._e():["date"==e.filterDataType?[i("v-container",[i("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"min-width":"auto","offset-y":"",transition:"scale-transition"},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on,a=t.attrs;return[i("v-text-field",e._g(e._b({staticClass:"internal-slot reverse-text",attrs:{label:e.label,clearable:"",dense:"",outlined:"","hide-details":"",readonly:""},on:{input:e.updateSearch},scopedSlots:e._u([{key:"prepend-inner",fn:function(){return[i("v-select",{staticStyle:{"max-width":"80px"},attrs:{items:e.comparisons,"menu-props":"auto",dense:"",solo:"",chips:"","hide-details":"","item-text":"text","item-value":"value"},on:{change:e.changeFilter,input:e.updateSearch},model:{value:e.filters,callback:function(t){e.filters=t},expression:"filters"}})]},proxy:!0}],null,!0),model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},"v-text-field",a,!1),s))]}}],null,!1,984029115),model:{value:e.dateMenu,callback:function(t){e.dateMenu=t},expression:"dateMenu"}},[i("v-date-picker",{ref:"picker",attrs:{max:(new Date).toISOString().substr(0,10),range:e.isRange,min:"1950-01-01"},on:{change:e.updateSearch},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)],1)]:i("v-text-field",{staticClass:"ma-1",attrs:{label:e.label,clearable:"",dense:"","hide-details":"",outlined:"","prepend-inner-icon":"mdi-filter-variant"},on:{change:function(t){return e.updateSearch()},"click:clear":function(t){return e.clearSearch()}},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})]],2)},a=[],n={name:"ihris-search-term",props:["label","expression","isDropDown","reportData","hideFilters"],data:function(){return{loading:!1,items:[],error:!1,err_messages:null,filterType:"include",value:null,filterDataType:"",dateMenu:!1,filters:null,comparisons:[{value:null,text:"="},{value:"gte",text:">="},{value:"gt",text:">"},{value:"lt",text:"<"},{value:"lte",text:"<="},{value:"range",text:"In"}],isRange:!1}},mounted:function(){if(this.reportData.mappings.mappings.properties[this.expression]&&(this.filterDataType=this.reportData.mappings.mappings.properties[this.expression].type),this.isDropDown&&this.filterDataType){this.loading=!0;let e=`/es/populateFilter/${this.reportData.indexName}/${this.expression}?dataType=${this.filterDataType}`;fetch(e,{method:"GET"}).then((e=>{e.json().then((e=>{this.loading=!1;for(let t of e)this.items.push(t.key.value.toString().replace(/\s+/g," "))})).catch((e=>{this.loading=!1,this.error_message="Unable to load results.",console.log(e)}))})).catch((e=>{this.loading=!1,this.error_message="Unable to load results.",console.log(e)}))}},methods:{changeFilter(e){this.filterType=e,this.$emit("termChange",this.expression,this.value,this.filterType)},updateSearch:function(){this.$emit("termChange",this.expression,this.value,this.filterType)},clearSearch:function(){this.$emit("termChange",this.expression,[])}},watch:{filters(e){this.isRange="range"===e},dateMenu(e){this.isRange||e&&setTimeout((()=>this.$refs.picker.activePicker="YEAR"))}}},l=n,r=i(3736),o=i(3453),h=i.n(o),u=i(1835),c=i(4228),d=i(9771),p=i(1418),m=i(1152),v=i(8978),f=i(4739),g=i(3986),I=i(5978),S=(0,r.Z)(l,s,a,!1,null,"0a2e424a",null),y=S.exports;h()(S,{VAutocomplete:u.Z,VContainer:c.Z,VDatePicker:d.Z,VDivider:p.Z,VMenu:m.Z,VRadio:v.Z,VRadioGroup:f.Z,VSelect:g.Z,VTextField:I.Z})}}]);
//# sourceMappingURL=ihris-es-search-term.01dc5e69.js.map