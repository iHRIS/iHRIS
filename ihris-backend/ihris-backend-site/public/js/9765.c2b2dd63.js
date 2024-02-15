"use strict";(self["webpackChunkiHRIS_v5"]=self["webpackChunkiHRIS_v5"]||[]).push([[9765],{4998:function(t,e,s){s.d(e,{Z:function(){return k}});var i=s(4589),a=s(538),o=a["default"].extend({name:"v-data",inheritAttrs:!1,props:{items:{type:Array,default:()=>[]},options:{type:Object,default:()=>({})},sortBy:{type:[String,Array]},sortDesc:{type:[Boolean,Array]},customSort:{type:Function,default:i.xl},mustSort:Boolean,multiSort:Boolean,page:{type:Number,default:1},itemsPerPage:{type:Number,default:10},groupBy:{type:[String,Array],default:()=>[]},groupDesc:{type:[Boolean,Array],default:()=>[]},customGroup:{type:Function,default:i.sD},locale:{type:String,default:"en-US"},disableSort:Boolean,disablePagination:Boolean,disableFiltering:Boolean,search:String,customFilter:{type:Function,default:i.KT},serverItemsLength:{type:Number,default:-1}},data(){let t={page:this.page,itemsPerPage:this.itemsPerPage,sortBy:(0,i.TI)(this.sortBy),sortDesc:(0,i.TI)(this.sortDesc),groupBy:(0,i.TI)(this.groupBy),groupDesc:(0,i.TI)(this.groupDesc),mustSort:this.mustSort,multiSort:this.multiSort};this.options&&(t=Object.assign(t,this.options));const{sortBy:e,sortDesc:s,groupBy:a,groupDesc:o}=t,n=e.length-s.length,r=a.length-o.length;return n>0&&t.sortDesc.push(...(0,i.kg)(n,!1)),r>0&&t.groupDesc.push(...(0,i.kg)(r,!1)),{internalOptions:t}},computed:{itemsLength(){return this.serverItemsLength>=0?this.serverItemsLength:this.filteredItems.length},pageCount(){return this.internalOptions.itemsPerPage<=0?1:Math.ceil(this.itemsLength/this.internalOptions.itemsPerPage)},pageStart(){return-1!==this.internalOptions.itemsPerPage&&this.items.length?(this.internalOptions.page-1)*this.internalOptions.itemsPerPage:0},pageStop(){return-1===this.internalOptions.itemsPerPage?this.itemsLength:this.items.length?Math.min(this.itemsLength,this.internalOptions.page*this.internalOptions.itemsPerPage):0},isGrouped(){return!!this.internalOptions.groupBy.length},pagination(){return{page:this.internalOptions.page,itemsPerPage:this.internalOptions.itemsPerPage,pageStart:this.pageStart,pageStop:this.pageStop,pageCount:this.pageCount,itemsLength:this.itemsLength}},filteredItems(){let t=this.items.slice();return!this.disableFiltering&&this.serverItemsLength<=0&&(t=this.customFilter(t,this.search)),t},computedItems(){let t=this.filteredItems.slice();return(!this.disableSort||this.internalOptions.groupBy.length)&&this.serverItemsLength<=0&&(t=this.sortItems(t)),!this.disablePagination&&this.serverItemsLength<=0&&(t=this.paginateItems(t)),t},groupedItems(){return this.isGrouped?this.groupItems(this.computedItems):null},scopedProps(){return{sort:this.sort,sortArray:this.sortArray,group:this.group,items:this.computedItems,options:this.internalOptions,updateOptions:this.updateOptions,pagination:this.pagination,groupedItems:this.groupedItems,originalItemsLength:this.items.length}},computedOptions(){return{...this.options}}},watch:{computedOptions:{handler(t,e){(0,i.vZ)(t,e)||this.updateOptions(t)},deep:!0,immediate:!0},internalOptions:{handler(t,e){(0,i.vZ)(t,e)||this.$emit("update:options",t)},deep:!0,immediate:!0},page(t){this.updateOptions({page:t})},"internalOptions.page"(t){this.$emit("update:page",t)},itemsPerPage(t){this.updateOptions({itemsPerPage:t})},"internalOptions.itemsPerPage"(t){this.$emit("update:items-per-page",t)},sortBy(t){this.updateOptions({sortBy:(0,i.TI)(t)})},"internalOptions.sortBy"(t,e){!(0,i.vZ)(t,e)&&this.$emit("update:sort-by",Array.isArray(this.sortBy)?t:t[0])},sortDesc(t){this.updateOptions({sortDesc:(0,i.TI)(t)})},"internalOptions.sortDesc"(t,e){!(0,i.vZ)(t,e)&&this.$emit("update:sort-desc",Array.isArray(this.sortDesc)?t:t[0])},groupBy(t){this.updateOptions({groupBy:(0,i.TI)(t)})},"internalOptions.groupBy"(t,e){!(0,i.vZ)(t,e)&&this.$emit("update:group-by",Array.isArray(this.groupBy)?t:t[0])},groupDesc(t){this.updateOptions({groupDesc:(0,i.TI)(t)})},"internalOptions.groupDesc"(t,e){!(0,i.vZ)(t,e)&&this.$emit("update:group-desc",Array.isArray(this.groupDesc)?t:t[0])},multiSort(t){this.updateOptions({multiSort:t})},"internalOptions.multiSort"(t){this.$emit("update:multi-sort",t)},mustSort(t){this.updateOptions({mustSort:t})},"internalOptions.mustSort"(t){this.$emit("update:must-sort",t)},pageCount:{handler(t){this.$emit("page-count",t)},immediate:!0},computedItems:{handler(t){this.$emit("current-items",t)},immediate:!0},pagination:{handler(t,e){(0,i.vZ)(t,e)||this.$emit("pagination",this.pagination)},immediate:!0}},methods:{toggle(t,e,s,a,o,n){let r=e.slice(),l=s.slice();const h=r.findIndex((e=>e===t));return h<0?(n||(r=[],l=[]),r.push(t),l.push(!1)):h>=0&&!l[h]?l[h]=!0:o?l[h]=!1:(r.splice(h,1),l.splice(h,1)),(0,i.vZ)(r,e)&&(0,i.vZ)(l,s)||(a=1),{by:r,desc:l,page:a}},group(t){const{by:e,desc:s,page:i}=this.toggle(t,this.internalOptions.groupBy,this.internalOptions.groupDesc,this.internalOptions.page,!0,!1);this.updateOptions({groupBy:e,groupDesc:s,page:i})},sort(t){if(Array.isArray(t))return this.sortArray(t);const{by:e,desc:s,page:i}=this.toggle(t,this.internalOptions.sortBy,this.internalOptions.sortDesc,this.internalOptions.page,this.internalOptions.mustSort,this.internalOptions.multiSort);this.updateOptions({sortBy:e,sortDesc:s,page:i})},sortArray(t){const e=t.map((t=>{const e=this.internalOptions.sortBy.findIndex((e=>e===t));return e>-1&&this.internalOptions.sortDesc[e]}));this.updateOptions({sortBy:t,sortDesc:e})},updateOptions(t){this.internalOptions={...this.internalOptions,...t,page:this.serverItemsLength<0?Math.max(1,Math.min(t.page||this.internalOptions.page,this.pageCount)):t.page||this.internalOptions.page}},sortItems(t){let e=[],s=[];return this.disableSort||(e=this.internalOptions.sortBy,s=this.internalOptions.sortDesc),this.internalOptions.groupBy.length&&(e=[...this.internalOptions.groupBy,...e],s=[...this.internalOptions.groupDesc,...s]),this.customSort(t,e,s,this.locale)},groupItems(t){return this.customGroup(t,this.internalOptions.groupBy,this.internalOptions.groupDesc)},paginateItems(t){return-1===this.serverItemsLength&&t.length<=this.pageStart&&(this.internalOptions.page=Math.max(1,Math.ceil(t.length/this.internalOptions.itemsPerPage))||1),t.slice(this.pageStart,this.pageStop)}},render(){return this.$scopedSlots.default&&this.$scopedSlots.default(this.scopedProps)}}),n=(s(6699),s(3986)),r=s(172),l=s(8119),h=a["default"].extend({name:"v-data-footer",props:{options:{type:Object,required:!0},pagination:{type:Object,required:!0},itemsPerPageOptions:{type:Array,default:()=>[5,10,15,-1]},prevIcon:{type:String,default:"$prev"},nextIcon:{type:String,default:"$next"},firstIcon:{type:String,default:"$first"},lastIcon:{type:String,default:"$last"},itemsPerPageText:{type:String,default:"$vuetify.dataFooter.itemsPerPageText"},itemsPerPageAllText:{type:String,default:"$vuetify.dataFooter.itemsPerPageAll"},showFirstLastPage:Boolean,showCurrentPage:Boolean,disablePagination:Boolean,disableItemsPerPage:Boolean,pageText:{type:String,default:"$vuetify.dataFooter.pageText"}},computed:{disableNextPageIcon(){return this.options.itemsPerPage<=0||this.options.page*this.options.itemsPerPage>=this.pagination.itemsLength||this.pagination.pageStop<0},computedDataItemsPerPageOptions(){return this.itemsPerPageOptions.map((t=>"object"===typeof t?t:this.genDataItemsPerPageOption(t)))}},methods:{updateOptions(t){this.$emit("update:options",Object.assign({},this.options,t))},onFirstPage(){this.updateOptions({page:1})},onPreviousPage(){this.updateOptions({page:this.options.page-1})},onNextPage(){this.updateOptions({page:this.options.page+1})},onLastPage(){this.updateOptions({page:this.pagination.pageCount})},onChangeItemsPerPage(t){this.updateOptions({itemsPerPage:t,page:1})},genDataItemsPerPageOption(t){return{text:-1===t?this.$vuetify.lang.t(this.itemsPerPageAllText):String(t),value:t}},genItemsPerPageSelect(){let t=this.options.itemsPerPage;const e=this.computedDataItemsPerPageOptions;return e.length<=1?null:(e.find((e=>e.value===t))||(t=e[0]),this.$createElement("div",{staticClass:"v-data-footer__select"},[this.$vuetify.lang.t(this.itemsPerPageText),this.$createElement(n.Z,{attrs:{"aria-label":this.$vuetify.lang.t(this.itemsPerPageText)},props:{disabled:this.disableItemsPerPage,items:e,value:t,hideDetails:!0,auto:!0,minWidth:"75px"},on:{input:this.onChangeItemsPerPage}})]))},genPaginationInfo(){let t=["–"];const e=this.pagination.itemsLength;let s=this.pagination.pageStart,i=this.pagination.pageStop;return this.pagination.itemsLength&&this.pagination.itemsPerPage?(s=this.pagination.pageStart+1,i=e<this.pagination.pageStop||this.pagination.pageStop<0?e:this.pagination.pageStop,t=this.$scopedSlots["page-text"]?[this.$scopedSlots["page-text"]({pageStart:s,pageStop:i,itemsLength:e})]:[this.$vuetify.lang.t(this.pageText,s,i,e)]):this.$scopedSlots["page-text"]&&(t=[this.$scopedSlots["page-text"]({pageStart:s,pageStop:i,itemsLength:e})]),this.$createElement("div",{class:"v-data-footer__pagination"},t)},genIcon(t,e,s,i){return this.$createElement(l.Z,{props:{disabled:e||this.disablePagination,icon:!0,text:!0},on:{click:t},attrs:{"aria-label":s}},[this.$createElement(r.Z,i)])},genIcons(){const t=[],e=[];return t.push(this.genIcon(this.onPreviousPage,1===this.options.page,this.$vuetify.lang.t("$vuetify.dataFooter.prevPage"),this.$vuetify.rtl?this.nextIcon:this.prevIcon)),e.push(this.genIcon(this.onNextPage,this.disableNextPageIcon,this.$vuetify.lang.t("$vuetify.dataFooter.nextPage"),this.$vuetify.rtl?this.prevIcon:this.nextIcon)),this.showFirstLastPage&&(t.unshift(this.genIcon(this.onFirstPage,1===this.options.page,this.$vuetify.lang.t("$vuetify.dataFooter.firstPage"),this.$vuetify.rtl?this.lastIcon:this.firstIcon)),e.push(this.genIcon(this.onLastPage,this.options.page>=this.pagination.pageCount||-1===this.options.itemsPerPage,this.$vuetify.lang.t("$vuetify.dataFooter.lastPage"),this.$vuetify.rtl?this.firstIcon:this.lastIcon))),[this.$createElement("div",{staticClass:"v-data-footer__icons-before"},t),this.showCurrentPage&&this.$createElement("span",[this.options.page.toString()]),this.$createElement("div",{staticClass:"v-data-footer__icons-after"},e)]}},render(){return this.$createElement("div",{staticClass:"v-data-footer"},[(0,i.z9)(this,"prepend"),this.genItemsPerPageSelect(),this.genPaginationInfo(),this.genIcons()])}}),p=s(6341),d=s(8085),c=s(3325),u=s(1824),m=(0,c.Z)(p.Z,d.Z).extend({name:"v-data-iterator",props:{...o.options.props,itemKey:{type:String,default:"id"},value:{type:Array,default:()=>[]},singleSelect:Boolean,expanded:{type:Array,default:()=>[]},mobileBreakpoint:{...p.Z.options.props.mobileBreakpoint,default:600},singleExpand:Boolean,loading:[Boolean,String],noResultsText:{type:String,default:"$vuetify.dataIterator.noResultsText"},noDataText:{type:String,default:"$vuetify.noDataText"},loadingText:{type:String,default:"$vuetify.dataIterator.loadingText"},hideDefaultFooter:Boolean,footerProps:Object,selectableKey:{type:String,default:"isSelectable"}},data:()=>({selection:{},expansion:{},internalCurrentItems:[],shiftKeyDown:!1,lastEntry:-1}),computed:{everyItem(){return!!this.selectableItems.length&&this.selectableItems.every((t=>this.isSelected(t)))},someItems(){return this.selectableItems.some((t=>this.isSelected(t)))},sanitizedFooterProps(){return(0,i.$x)(this.footerProps)},selectableItems(){return this.internalCurrentItems.filter((t=>this.isSelectable(t)))}},watch:{value:{handler(t){this.selection=t.reduce(((t,e)=>(t[(0,i.vO)(e,this.itemKey)]=e,t)),{})},immediate:!0},selection(t,e){(0,i.vZ)(Object.keys(t),Object.keys(e))||this.$emit("input",Object.values(t))},expanded:{handler(t){this.expansion=t.reduce(((t,e)=>(t[(0,i.vO)(e,this.itemKey)]=!0,t)),{})},immediate:!0},expansion(t,e){if((0,i.vZ)(t,e))return;const s=Object.keys(t).filter((e=>t[e])),a=s.length?this.items.filter((t=>s.includes(String((0,i.vO)(t,this.itemKey))))):[];this.$emit("update:expanded",a)}},created(){const t=[["disable-initial-sort","sort-by"],["filter","custom-filter"],["pagination","options"],["total-items","server-items-length"],["hide-actions","hide-default-footer"],["rows-per-page-items","footer-props.items-per-page-options"],["rows-per-page-text","footer-props.items-per-page-text"],["prev-icon","footer-props.prev-icon"],["next-icon","footer-props.next-icon"]];t.forEach((([t,e])=>{this.$attrs.hasOwnProperty(t)&&(0,u.fK)(t,e,this)}));const e=["expand","content-class","content-props","content-tag"];e.forEach((t=>{this.$attrs.hasOwnProperty(t)&&(0,u.Jk)(t)}))},mounted(){window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)},beforeDestroy(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp)},methods:{onKeyDown(t){t.keyCode===i.Do.shift&&(this.shiftKeyDown=!0)},onKeyUp(t){t.keyCode===i.Do.shift&&(this.shiftKeyDown=!1)},toggleSelectAll(t){const e=Object.assign({},this.selection);for(let s=0;s<this.selectableItems.length;s++){const a=this.selectableItems[s];if(!this.isSelectable(a))continue;const o=(0,i.vO)(a,this.itemKey);t?e[o]=a:delete e[o]}this.selection=e,this.$emit("toggle-select-all",{items:this.internalCurrentItems,value:t})},isSelectable(t){return!1!==(0,i.vO)(t,this.selectableKey)},isSelected(t){return!!this.selection[(0,i.vO)(t,this.itemKey)]||!1},select(t,e=!0,s=!0){if(!this.isSelectable(t))return;const a=this.singleSelect?{}:Object.assign({},this.selection),o=(0,i.vO)(t,this.itemKey);e?a[o]=t:delete a[o];const n=this.selectableItems.findIndex((t=>(0,i.vO)(t,this.itemKey)===o));if(-1===this.lastEntry)this.lastEntry=n;else if(this.shiftKeyDown&&!this.singleSelect&&s){const t=(0,i.vO)(this.selectableItems[this.lastEntry],this.itemKey),e=Object.keys(this.selection).includes(String(t));this.multipleSelect(e,s,a,n)}if(this.lastEntry=n,this.singleSelect&&s){const t=Object.keys(this.selection),e=t.length&&(0,i.vO)(this.selection[t[0]],this.itemKey);e&&e!==o&&this.$emit("item-selected",{item:this.selection[e],value:!1})}this.selection=a,s&&this.$emit("item-selected",{item:t,value:e})},multipleSelect(t=!0,e=!0,s,a){const o=a<this.lastEntry?a:this.lastEntry,n=a<this.lastEntry?this.lastEntry:a;for(let r=o;r<=n;r++){const a=this.selectableItems[r],o=(0,i.vO)(a,this.itemKey);t?s[o]=a:delete s[o],e&&this.$emit("item-selected",{currentItem:a,value:t})}},isExpanded(t){return this.expansion[(0,i.vO)(t,this.itemKey)]||!1},expand(t,e=!0){const s=this.singleExpand?{}:Object.assign({},this.expansion),a=(0,i.vO)(t,this.itemKey);e?s[a]=!0:delete s[a],this.expansion=s,this.$emit("item-expanded",{item:t,value:e})},createItemProps(t,e){return{item:t,index:e,select:e=>this.select(t,e),isSelected:this.isSelected(t),expand:e=>this.expand(t,e),isExpanded:this.isExpanded(t),isMobile:this.isMobile}},genEmptyWrapper(t){return this.$createElement("div",t)},genEmpty(t,e){if(0===t&&this.loading){const t=this.$slots.loading||this.$vuetify.lang.t(this.loadingText);return this.genEmptyWrapper(t)}if(0===t){const t=this.$slots["no-data"]||this.$vuetify.lang.t(this.noDataText);return this.genEmptyWrapper(t)}if(0===e){const t=this.$slots["no-results"]||this.$vuetify.lang.t(this.noResultsText);return this.genEmptyWrapper(t)}return null},genItems(t){const e=this.genEmpty(t.originalItemsLength,t.pagination.itemsLength);return e?[e]:this.$scopedSlots.default?this.$scopedSlots.default({...t,isSelected:this.isSelected,select:this.select,isExpanded:this.isExpanded,isMobile:this.isMobile,expand:this.expand}):this.$scopedSlots.item?t.items.map(((t,e)=>this.$scopedSlots.item(this.createItemProps(t,e)))):[]},genFooter(t){if(this.hideDefaultFooter)return null;const e={props:{...this.sanitizedFooterProps,options:t.options,pagination:t.pagination},on:{"update:options":e=>t.updateOptions(e)}},s=(0,i.FT)("footer.",this.$scopedSlots);return this.$createElement(h,{scopedSlots:s,...e})},genDefaultScopedSlot(t){const e={...t,someItems:this.someItems,everyItem:this.everyItem,toggleSelectAll:this.toggleSelectAll};return this.$createElement("div",{staticClass:"v-data-iterator"},[(0,i.z9)(this,"header",e,!0),this.genItems(t),this.genFooter(t),(0,i.z9)(this,"footer",e,!0)])}},render(){return this.$createElement(o,{props:this.$props,on:{"update:options":(t,e)=>!(0,i.vZ)(t,e)&&this.$emit("update:options",t),"update:page":t=>this.$emit("update:page",t),"update:items-per-page":t=>this.$emit("update:items-per-page",t),"update:sort-by":t=>this.$emit("update:sort-by",t),"update:sort-desc":t=>this.$emit("update:sort-desc",t),"update:group-by":t=>this.$emit("update:group-by",t),"update:group-desc":t=>this.$emit("update:group-desc",t),pagination:(t,e)=>!(0,i.vZ)(t,e)&&this.$emit("pagination",t),"current-items":t=>{this.internalCurrentItems=t,this.$emit("current-items",t)},"page-count":t=>this.$emit("page-count",t)},scopedSlots:{default:this.genDefaultScopedSlot}})}}),g=s(4394),y=s(128),f=s(6286),v=(0,c.Z)().extend({directives:{ripple:f.Z},props:{headers:{type:Array,default:()=>[]},options:{type:Object,default:()=>({page:1,itemsPerPage:10,sortBy:[],sortDesc:[],groupBy:[],groupDesc:[],multiSort:!1,mustSort:!1})},checkboxColor:String,sortIcon:{type:String,default:"$sort"},everyItem:Boolean,someItems:Boolean,showGroupBy:Boolean,singleSelect:Boolean,disableSort:Boolean},methods:{genSelectAll(){var t;const e={props:{value:this.everyItem,indeterminate:!this.everyItem&&this.someItems,color:null!=(t=this.checkboxColor)?t:""},on:{input:t=>this.$emit("toggle-select-all",t)}};return this.$scopedSlots["data-table-select"]?this.$scopedSlots["data-table-select"](e):this.$createElement(y.Z,{staticClass:"v-data-table__checkbox",...e})},genSortIcon(){return this.$createElement(r.Z,{staticClass:"v-data-table-header__icon",props:{size:18}},[this.sortIcon])}}}),b=(0,c.Z)(v).extend({name:"v-data-table-header-mobile",props:{sortByText:{type:String,default:"$vuetify.dataTable.sortBy"}},methods:{genSortChip(t){const e=[t.item.text],s=this.options.sortBy.findIndex((e=>e===t.item.value)),i=s>=0,a=this.options.sortDesc[s];return e.push(this.$createElement("div",{staticClass:"v-chip__close",class:{sortable:!0,active:i,asc:i&&!a,desc:i&&a}},[this.genSortIcon()])),this.$createElement(g.Z,{staticClass:"sortable",on:{click:e=>{e.stopPropagation(),this.$emit("sort",t.item.value)}}},e)},genSortSelect(t){return this.$createElement(n.Z,{props:{label:this.$vuetify.lang.t(this.sortByText),items:t,hideDetails:!0,multiple:this.options.multiSort,value:this.options.multiSort?this.options.sortBy:this.options.sortBy[0],menuProps:{closeOnContentClick:!0}},on:{change:t=>this.$emit("sort",t)},scopedSlots:{selection:t=>this.genSortChip(t)}})}},render(t){const e=[],s=this.headers.find((t=>"data-table-select"===t.value));s&&!this.singleSelect&&e.push(this.$createElement("div",{class:["v-data-table-header-mobile__select",...(0,i.TI)(s.class)],attrs:{width:s.width}},[this.genSelectAll()]));const a=this.headers.filter((t=>!1!==t.sortable&&"data-table-select"!==t.value)).map((t=>({text:t.text,value:t.value})));!this.disableSort&&a.length&&e.push(this.genSortSelect(a));const o=e.length?t("th",[t("div",{staticClass:"v-data-table-header-mobile__wrapper"},e)]):void 0,n=t("tr",[o]);return t("thead",{staticClass:"v-data-table-header v-data-table-header-mobile"},[n])}}),S=(0,c.Z)(v).extend({name:"v-data-table-header-desktop",methods:{genGroupByToggle(t){return this.$createElement("span",{on:{click:e=>{e.stopPropagation(),this.$emit("group",t.value)}}},["group"])},getAria(t,e){const s=t=>this.$vuetify.lang.t(`$vuetify.dataTable.ariaLabel.${t}`);let i="none",a=[s("sortNone"),s("activateAscending")];return t?(e?(i="descending",a=[s("sortDescending"),s(this.options.mustSort?"activateAscending":"activateNone")]):(i="ascending",a=[s("sortAscending"),s("activateDescending")]),{ariaSort:i,ariaLabel:a.join(" ")}):{ariaSort:i,ariaLabel:a.join(" ")}},genHeader(t){const e={attrs:{role:"columnheader",scope:"col","aria-label":t.text||""},style:{width:(0,i.kb)(t.width),minWidth:(0,i.kb)(t.width)},class:[`text-${t.align||"start"}`,...(0,i.TI)(t.class),t.divider&&"v-data-table__divider"],on:{}},s=[];if("data-table-select"===t.value&&!this.singleSelect)return this.$createElement("th",e,[this.genSelectAll()]);if(s.push(this.$scopedSlots.hasOwnProperty(t.value)?this.$scopedSlots[t.value]({header:t}):this.$createElement("span",[t.text])),!this.disableSort&&(t.sortable||!t.hasOwnProperty("sortable"))){e.on.click=()=>this.$emit("sort",t.value);const i=this.options.sortBy.findIndex((e=>e===t.value)),a=i>=0,o=this.options.sortDesc[i];e.class.push("sortable");const{ariaLabel:n,ariaSort:r}=this.getAria(a,o);e.attrs["aria-label"]+=`${t.text?": ":""}${n}`,e.attrs["aria-sort"]=r,a&&(e.class.push("active"),e.class.push(o?"desc":"asc")),"end"===t.align?s.unshift(this.genSortIcon()):s.push(this.genSortIcon()),this.options.multiSort&&a&&s.push(this.$createElement("span",{class:"v-data-table-header__sort-badge"},[String(i+1)]))}return this.showGroupBy&&!1!==t.groupable&&s.push(this.genGroupByToggle(t)),this.$createElement("th",e,s)}},render(){return this.$createElement("thead",{staticClass:"v-data-table-header"},[this.$createElement("tr",this.headers.map((t=>this.genHeader(t))))])}});function $(t){if(t.model&&t.on&&t.on.input)if(Array.isArray(t.on.input)){const e=t.on.input.indexOf(t.model.callback);e>-1&&t.on.input.splice(e,1)}else delete t.on.input}var P=s(6290);function x(t,e){const s=[];for(const i in t)t.hasOwnProperty(i)&&s.push(e("template",{slot:i},t[i]));return s}var I=a["default"].extend({name:"v-data-table-header",functional:!0,props:{...v.options.props,mobile:Boolean},render(t,{props:e,data:s,slots:i}){$(s);const a=x(i(),t);return s=(0,P.ZP)(s,{props:e}),e.mobile?t(b,s,a):t(S,s,a)}});function O(t){var e;return 1!==t.length||!["td","th"].includes(null==(e=t[0])?void 0:e.tag)}var w=a["default"].extend({name:"row",functional:!0,props:{headers:Array,index:Number,item:Object,rtl:Boolean},render(t,{props:e,slots:s,data:a}){const o=s(),n=e.headers.map((s=>{const n=[],r=(0,i.vO)(e.item,s.value),l=s.value,h=a.scopedSlots&&a.scopedSlots.hasOwnProperty(l)&&a.scopedSlots[l],p=o.hasOwnProperty(l)&&o[l];h?n.push(...(0,i.TI)(h({item:e.item,isMobile:!1,header:s,index:e.index,value:r}))):p?n.push(...(0,i.TI)(p)):n.push(null==r?r:String(r));const d=`text-${s.align||"start"}`;return O(n)?t("td",{class:[d,s.cellClass,{"v-data-table__divider":s.divider}]},n):n}));return t("tr",a,n)}}),E=a["default"].extend({name:"row-group",functional:!0,props:{value:{type:Boolean,default:!0},headerClass:{type:String,default:"v-row-group__header"},contentClass:String,summaryClass:{type:String,default:"v-row-group__summary"}},render(t,{slots:e,props:s}){const i=e(),a=[];return i["column.header"]?a.push(t("tr",{staticClass:s.headerClass},i["column.header"])):i["row.header"]&&a.push(...i["row.header"]),i["row.content"]&&s.value&&a.push(...i["row.content"]),i["column.summary"]?a.push(t("tr",{staticClass:s.summaryClass},i["column.summary"])):i["row.summary"]&&a.push(...i["row.summary"]),a}}),B=(0,c.Z)(d.Z).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes(){return{"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader,"v-data-table--has-top":!!this.$slots.top,"v-data-table--has-bottom":!!this.$slots.bottom,...this.themeClasses}}},methods:{genWrapper(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:(0,i.kb)(this.height)}},[this.$createElement("table",this.$slots.default)])}},render(t){return t("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}}),C=a["default"].extend({name:"row",functional:!0,props:{headers:Array,hideDefaultHeader:Boolean,index:Number,item:Object,rtl:Boolean},render(t,{props:e,slots:s,data:a}){const o=s(),n=e.headers.map((s=>{const n={"v-data-table__mobile-row":!0},r=[],l=(0,i.vO)(e.item,s.value),h=s.value,p=a.scopedSlots&&a.scopedSlots.hasOwnProperty(h)&&a.scopedSlots[h],d=o.hasOwnProperty(h)&&o[h];p?r.push(p({item:e.item,isMobile:!0,header:s,index:e.index,value:l})):d?r.push(d):r.push(null==l?l:String(l));const c=[t("div",{staticClass:"v-data-table__mobile-row__cell"},r)];return"dataTableSelect"===s.value||e.hideDefaultHeader||c.unshift(t("div",{staticClass:"v-data-table__mobile-row__header"},[s.text])),t("td",{class:n},c)}));return t("tr",{...a,staticClass:"v-data-table__mobile-table-row"},n)}}),D=s(7342);function _(t,e,s){return a=>{const o=(0,i.vO)(t,a.value);return a.filter?a.filter(o,e,t):s(o,e,t)}}function A(t,e,s,a,o){return e="string"===typeof e?e.trim():null,t.filter((t=>{const n=s.every(_(t,e,i.f9)),r=!e||a.some(_(t,e,o));return n&&r}))}var k=(0,c.Z)(m,D.Z).extend({name:"v-data-table",directives:{ripple:f.Z},props:{headers:{type:Array,default:()=>[]},showSelect:Boolean,checkboxColor:String,showExpand:Boolean,showGroupBy:Boolean,height:[Number,String],hideDefaultHeader:Boolean,caption:String,dense:Boolean,headerProps:Object,calculateWidths:Boolean,fixedHeader:Boolean,headersLength:Number,expandIcon:{type:String,default:"$expand"},customFilter:{type:Function,default:i.f9},itemClass:{type:[String,Function],default:()=>""},loaderHeight:{type:[Number,String],default:4}},data(){return{internalGroupBy:[],openCache:{},widths:[]}},computed:{computedHeaders(){if(!this.headers)return[];const t=this.headers.filter((t=>void 0===t.value||!this.internalGroupBy.find((e=>e===t.value)))),e={text:"",sortable:!1,width:"1px"};if(this.showSelect){const s=t.findIndex((t=>"data-table-select"===t.value));s<0?t.unshift({...e,value:"data-table-select"}):t.splice(s,1,{...e,...t[s]})}if(this.showExpand){const s=t.findIndex((t=>"data-table-expand"===t.value));s<0?t.unshift({...e,value:"data-table-expand"}):t.splice(s,1,{...e,...t[s]})}return t},colspanAttrs(){return this.isMobile?void 0:{colspan:this.headersLength||this.computedHeaders.length}},columnSorters(){return this.computedHeaders.reduce(((t,e)=>(e.sort&&(t[e.value]=e.sort),t)),{})},headersWithCustomFilters(){return this.headers.filter((t=>t.filter&&(!t.hasOwnProperty("filterable")||!0===t.filterable)))},headersWithoutCustomFilters(){return this.headers.filter((t=>!t.filter&&(!t.hasOwnProperty("filterable")||!0===t.filterable)))},sanitizedHeaderProps(){return(0,i.$x)(this.headerProps)},computedItemsPerPage(){const t=this.options&&this.options.itemsPerPage?this.options.itemsPerPage:this.itemsPerPage,e=this.sanitizedFooterProps.itemsPerPageOptions;if(e&&!e.find((e=>"number"===typeof e?e===t:e.value===t))){const t=e[0];return"object"===typeof t?t.value:t}return t}},created(){const t=[["sort-icon","header-props.sort-icon"],["hide-headers","hide-default-header"],["select-all","show-select"]];t.forEach((([t,e])=>{this.$attrs.hasOwnProperty(t)&&(0,u.fK)(t,e,this)}))},mounted(){this.calculateWidths&&(window.addEventListener("resize",this.calcWidths),this.calcWidths())},beforeDestroy(){this.calculateWidths&&window.removeEventListener("resize",this.calcWidths)},methods:{calcWidths(){this.widths=Array.from(this.$el.querySelectorAll("th")).map((t=>t.clientWidth))},customFilterWithColumns(t,e){return A(t,e,this.headersWithCustomFilters,this.headersWithoutCustomFilters,this.customFilter)},customSortWithHeaders(t,e,s,i){return this.customSort(t,e,s,i,this.columnSorters)},createItemProps(t,e){const s=m.options.methods.createItemProps.call(this,t,e);return Object.assign(s,{headers:this.computedHeaders})},genCaption(t){return this.caption?[this.$createElement("caption",[this.caption])]:(0,i.z9)(this,"caption",t,!0)},genColgroup(t){return this.$createElement("colgroup",this.computedHeaders.map((t=>this.$createElement("col",{class:{divider:t.divider}}))))},genLoading(){const t=this.$createElement("th",{staticClass:"column",attrs:this.colspanAttrs},[this.genProgress()]),e=this.$createElement("tr",{staticClass:"v-data-table__progress"},[t]);return this.$createElement("thead",[e])},genHeaders(t){const e={props:{...this.sanitizedHeaderProps,headers:this.computedHeaders,options:t.options,mobile:this.isMobile,showGroupBy:this.showGroupBy,checkboxColor:this.checkboxColor,someItems:this.someItems,everyItem:this.everyItem,singleSelect:this.singleSelect,disableSort:this.disableSort},on:{sort:t.sort,group:t.group,"toggle-select-all":this.toggleSelectAll}},s=[(0,i.z9)(this,"header",{...e,isMobile:this.isMobile})];if(!this.hideDefaultHeader){const t=(0,i.FT)("header.",this.$scopedSlots);s.push(this.$createElement(I,{...e,scopedSlots:t}))}return this.loading&&s.push(this.genLoading()),s},genEmptyWrapper(t){return this.$createElement("tr",{staticClass:"v-data-table__empty-wrapper"},[this.$createElement("td",{attrs:this.colspanAttrs},t)])},genItems(t,e){const s=this.genEmpty(e.originalItemsLength,e.pagination.itemsLength);return s?[s]:e.groupedItems?this.genGroupedRows(e.groupedItems,e):this.genRows(t,e)},genGroupedRows(t,e){return t.map((t=>(this.openCache.hasOwnProperty(t.name)||this.$set(this.openCache,t.name,!0),this.$scopedSlots.group?this.$scopedSlots.group({group:t.name,options:e.options,isMobile:this.isMobile,items:t.items,headers:this.computedHeaders}):this.genDefaultGroupedRow(t.name,t.items,e))))},genDefaultGroupedRow(t,e,s){const i=!!this.openCache[t],a=[this.$createElement("template",{slot:"row.content"},this.genRows(e,s))],o=()=>this.$set(this.openCache,t,!this.openCache[t]),n=()=>s.updateOptions({groupBy:[],groupDesc:[]});if(this.$scopedSlots["group.header"])a.unshift(this.$createElement("template",{slot:"column.header"},[this.$scopedSlots["group.header"]({group:t,groupBy:s.options.groupBy,isMobile:this.isMobile,items:e,headers:this.computedHeaders,isOpen:i,toggle:o,remove:n})]));else{const e=this.$createElement(l.Z,{staticClass:"ma-0",props:{icon:!0,small:!0},on:{click:o}},[this.$createElement(r.Z,[i?"$minus":"$plus"])]),h=this.$createElement(l.Z,{staticClass:"ma-0",props:{icon:!0,small:!0},on:{click:n}},[this.$createElement(r.Z,["$close"])]),p=this.$createElement("td",{staticClass:"text-start",attrs:this.colspanAttrs},[e,`${s.options.groupBy[0]}: ${t}`,h]);a.unshift(this.$createElement("template",{slot:"column.header"},[p]))}return this.$scopedSlots["group.summary"]&&a.push(this.$createElement("template",{slot:"column.summary"},[this.$scopedSlots["group.summary"]({group:t,groupBy:s.options.groupBy,isMobile:this.isMobile,items:e,headers:this.computedHeaders,isOpen:i,toggle:o})])),this.$createElement(E,{key:t,props:{value:i}},a)},genRows(t,e){return this.$scopedSlots.item?this.genScopedRows(t,e):this.genDefaultRows(t,e)},genScopedRows(t,e){const s=[];for(let i=0;i<t.length;i++){const e=t[i];s.push(this.$scopedSlots.item({...this.createItemProps(e,i),isMobile:this.isMobile})),this.isExpanded(e)&&s.push(this.$scopedSlots["expanded-item"]({headers:this.computedHeaders,isMobile:this.isMobile,index:i,item:e}))}return s},genDefaultRows(t,e){return this.$scopedSlots["expanded-item"]?t.map(((t,e)=>this.genDefaultExpandedRow(t,e))):t.map(((t,e)=>this.genDefaultSimpleRow(t,e)))},genDefaultExpandedRow(t,e){const s=this.isExpanded(t),i={"v-data-table__expanded v-data-table__expanded__row":s},a=this.genDefaultSimpleRow(t,e,i),o=this.$createElement("tr",{staticClass:"v-data-table__expanded v-data-table__expanded__content"},[this.$scopedSlots["expanded-item"]({headers:this.computedHeaders,isMobile:this.isMobile,item:t})]);return this.$createElement(E,{props:{value:s}},[this.$createElement("template",{slot:"row.header"},[a]),this.$createElement("template",{slot:"row.content"},[o])])},genDefaultSimpleRow(t,e,s={}){const a=(0,i.FT)("item.",this.$scopedSlots),o=this.createItemProps(t,e);if(this.showSelect){const e=a["data-table-select"];a["data-table-select"]=e?()=>e({...o,isMobile:this.isMobile}):()=>{var e;return this.$createElement(y.Z,{staticClass:"v-data-table__checkbox",props:{value:o.isSelected,disabled:!this.isSelectable(t),color:null!=(e=this.checkboxColor)?e:""},on:{input:t=>o.select(t)}})}}if(this.showExpand){const t=a["data-table-expand"];a["data-table-expand"]=t?()=>t(o):()=>this.$createElement(r.Z,{staticClass:"v-data-table__expand-icon",class:{"v-data-table__expand-icon--active":o.isExpanded},on:{click:t=>{t.stopPropagation(),o.expand(!o.isExpanded)}}},[this.expandIcon])}return this.$createElement(this.isMobile?C:w,{key:(0,i.vO)(t,this.itemKey),class:(0,P.ze)({...s,"v-data-table__selected":o.isSelected},(0,i.qF)(t,this.itemClass)),props:{headers:this.computedHeaders,hideDefaultHeader:this.hideDefaultHeader,index:e,item:t,rtl:this.$vuetify.rtl},scopedSlots:a,on:{click:()=>this.$emit("click:row",t,o),contextmenu:t=>this.$emit("contextmenu:row",t,o),dblclick:t=>this.$emit("dblclick:row",t,o)}})},genBody(t){const e={...t,expand:this.expand,headers:this.computedHeaders,isExpanded:this.isExpanded,isMobile:this.isMobile,isSelected:this.isSelected,select:this.select};return this.$scopedSlots.body?this.$scopedSlots.body(e):this.$createElement("tbody",[(0,i.z9)(this,"body.prepend",e,!0),this.genItems(t.items,t),(0,i.z9)(this,"body.append",e,!0)])},genFoot(t){var e,s;return null==(e=(s=this.$scopedSlots).foot)?void 0:e.call(s,t)},genFooters(t){const e={props:{options:t.options,pagination:t.pagination,itemsPerPageText:"$vuetify.dataTable.itemsPerPageText",...this.sanitizedFooterProps},on:{"update:options":e=>t.updateOptions(e)},widths:this.widths,headers:this.computedHeaders},s=[(0,i.z9)(this,"footer",e,!0)];return this.hideDefaultFooter||s.push(this.$createElement(h,{...e,scopedSlots:(0,i.FT)("footer.",this.$scopedSlots)})),s},genDefaultScopedSlot(t){const e={height:this.height,fixedHeader:this.fixedHeader,dense:this.dense};return this.$createElement(B,{props:e,class:{"v-data-table--mobile":this.isMobile}},[this.proxySlot("top",(0,i.z9)(this,"top",{...t,isMobile:this.isMobile},!0)),this.genCaption(t),this.genColgroup(t),this.genHeaders(t),this.genBody(t),this.genFoot(t),this.proxySlot("bottom",this.genFooters(t))])},proxySlot(t,e){return this.$createElement("template",{slot:t},e)}},render(){return this.$createElement(o,{props:{...this.$props,customFilter:this.customFilterWithColumns,customSort:this.customSortWithHeaders,itemsPerPage:this.computedItemsPerPage},on:{"update:options":(t,e)=>{this.internalGroupBy=t.groupBy||[],!(0,i.vZ)(t,e)&&this.$emit("update:options",t)},"update:page":t=>this.$emit("update:page",t),"update:items-per-page":t=>this.$emit("update:items-per-page",t),"update:sort-by":t=>this.$emit("update:sort-by",t),"update:sort-desc":t=>this.$emit("update:sort-desc",t),"update:group-by":t=>this.$emit("update:group-by",t),"update:group-desc":t=>this.$emit("update:group-desc",t),pagination:(t,e)=>!(0,i.vZ)(t,e)&&this.$emit("pagination",t),"current-items":t=>{this.internalCurrentItems=t,this.$emit("current-items",t)},"page-count":t=>this.$emit("page-count",t)},scopedSlots:{default:this.genDefaultScopedSlot}})}})}}]);
//# sourceMappingURL=9765.c2b2dd63.js.map