(self["webpackChunkiHRIS_v5"]=self["webpackChunkiHRIS_v5"]||[]).push([[7289],{67257:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return m}});var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i(e.currentComponent,{tag:"component",attrs:{queries:this.$route.query}})},s=[],o={props:["component"],data(){return{currentComponent:""}},created(){let e="";if(this.$route.query.path){let t=this.$route.query.path.split("/");for(let i of t)i&&(e+="/"+i)}e+="/"+this.$route.params.component,e.endsWith(".vue")||(e+=".vue"),this.currentComponent=()=>i(1473)(`./site${e}`)}},p=o,a=i(43736),c=(0,a.Z)(p,n,s,!1,null,null,null),m=c.exports},1473:function(e,t,i){var n={"./site/chad/components/delete-practitioner":[68135,9,8135],"./site/chad/components/delete-practitioner.vue":[68135,9,8135],"./site/chad/components/import-practitioners":[24936,9,4936],"./site/chad/components/import-practitioners.vue":[24936,9,4936],"./site/components/add-family-head":[48655,9,3986,2200,3113,4209],"./site/components/add-family-head.vue":[48655,9,3986,2200,3113,4209],"./site/components/add-from-hie":[27165,9,3986,2200,4847],"./site/components/add-from-hie.vue":[27165,9,3986,2200,4847],"./site/components/bhpc/bhpc-approve-exemption":[22239,9,3986,5374],"./site/components/bhpc/bhpc-approve-exemption.vue":[22239,9,3986,5374],"./site/components/bhpc/bhpc-registration":[76515,9,6515],"./site/components/bhpc/bhpc-registration.vue":[76515,9,6515],"./site/components/displayAttachment":[69057,9,9057],"./site/components/displayAttachment.vue":[69057,9,9057],"./site/components/exams/nmcb-exam-scheduling":[85226,9,3986,3800],"./site/components/exams/nmcb-exam-scheduling.vue":[85226,9,3986,3800],"./site/components/exams/nmcb-scheduled-exam":[13136,9,3986,2200,3113,3475],"./site/components/exams/nmcb-scheduled-exam.vue":[13136,9,3986,2200,3113,3475],"./site/components/exams/nmcb-scheduled-exams":[31097,9,3986,2200,3113,7895],"./site/components/exams/nmcb-scheduled-exams.vue":[31097,9,3986,2200,3113,7895],"./site/components/kitso/kitso-person-exam":[60366,9,366],"./site/components/kitso/kitso-person-exam.vue":[60366,9,366],"./site/components/kitso/kitso-scheduled-exam":[94930,9,3986,2200,3113,3107],"./site/components/kitso/kitso-scheduled-exam.vue":[94930,9,3986,2200,3113,3107],"./site/components/nmcb/LocallyTrainedStepper":[51106,9,1106],"./site/components/nmcb/LocallyTrainedStepper.vue":[51106,9,1106],"./site/components/nmcb/OutsideTrainedStepper":[48317,9,8317],"./site/components/nmcb/OutsideTrainedStepper.vue":[48317,9,8317],"./site/components/nmcb/TemporaryCertificateStepper":[45244,9,5244],"./site/components/nmcb/TemporaryCertificateStepper.vue":[45244,9,5244],"./site/components/nmcb/nmcb-license-renewal":[19872,9,9872],"./site/components/nmcb/nmcb-license-renewal.vue":[19872,9,9872],"./site/components/nmcb/nmcb-registration":[14580,9,4580],"./site/components/nmcb/nmcb-registration-application":[36708,9,6708],"./site/components/nmcb/nmcb-registration-application.vue":[36708,9,6708],"./site/components/nmcb/nmcb-registration.vue":[14580,9,4580],"./site/components/pp/license-application":[79395,9,3986,2037],"./site/components/pp/license-application-view":[84596,9,3986,5118],"./site/components/pp/license-application-view.vue":[84596,9,3986,5118],"./site/components/pp/license-application.vue":[79395,9,3986,2037],"./site/components/signup":[93778,9,3986,2578,9971],"./site/components/signup.vue":[93778,9,3986,2578,9971],"./site/locales/en":[18652,3,8652],"./site/locales/en.json":[18652,3,8652],"./site/namibia/components/LeaveRequestStepper":[59349,9,9349],"./site/namibia/components/LeaveRequestStepper.vue":[59349,9,9349],"./site/namibia/components/SpecialStudyLeaveRequestStepper":[43770,9,3770],"./site/namibia/components/SpecialStudyLeaveRequestStepper.vue":[43770,9,3770],"./site/namibia/components/advertised-positions":[71135,9,3986,2200,3113,3825],"./site/namibia/components/advertised-positions.vue":[71135,9,3986,2200,3113,3825],"./site/namibia/components/delete-practitioner":[77827,9,7827],"./site/namibia/components/delete-practitioner.vue":[77827,9,7827],"./site/namibia/components/dupp-positions-by-struct":[83604,9,3604],"./site/namibia/components/dupp-positions-by-struct.vue":[83604,9,3604],"./site/namibia/components/dupplicates-by-id":[27783,9,7783],"./site/namibia/components/dupplicates-by-id.vue":[27783,9,7783],"./site/namibia/components/import-leaves":[92494,9,2494],"./site/namibia/components/import-leaves.vue":[92494,9,2494],"./site/namibia/components/leave-request":[65959,9,3986,2200,3113,5959],"./site/namibia/components/leave-request-view":[50568,9,3986,2200,3113,568],"./site/namibia/components/leave-request-view.vue":[50568,9,3986,2200,3113,568],"./site/namibia/components/leave-request.vue":[65959,9,3986,2200,3113,5959],"./site/namibia/components/multiple-active-pos":[48969,9,8969],"./site/namibia/components/multiple-active-pos.vue":[48969,9,8969],"./site/namibia/components/position-application":[10576,9,576],"./site/namibia/components/position-application.vue":[10576,9,576],"./site/namibia/components/position-history":[37721,9,7721],"./site/namibia/components/position-history.vue":[37721,9,7721],"./site/namibia/components/post-interview":[94785,9,4785],"./site/namibia/components/post-interview.vue":[94785,9,4785],"./site/namibia/components/user-assigned-tasks":[10861,9,3986,2200,3113,6476],"./site/namibia/components/user-assigned-tasks.vue":[10861,9,3986,2200,3113,6476],"./site/package":[2062,3,2062],"./site/package.json":[2062,3,2062],"./site/togo/components/classification":[10573,9,573],"./site/togo/components/classification.vue":[10573,9,573],"./site/togo/components/delete-practitioner":[85646,9,5646],"./site/togo/components/delete-practitioner.vue":[85646,9,5646],"./site/togo/components/import-practitioners":[70551,9,551],"./site/togo/components/import-practitioners.vue":[70551,9,551],"./site/view/OutputDisplay":[66283,9,6283],"./site/view/OutputDisplay.vue":[66283,9,6283],"./site/view/bw-page-view":[6688,9,6688],"./site/view/bw-page-view.vue":[6688,9,6688],"./site/view/bw-resource":[60728,9,728],"./site/view/bw-resource.vue":[60728,9,728],"./site/view/changepassword":[5548,9,5548],"./site/view/changepassword.vue":[5548,9,5548],"./site/view/search-bhpc":[97321,9,3986,2200,3113,5358],"./site/view/search-bhpc.vue":[97321,9,3986,2200,3113,5358],"./site/view/search-itsf-student":[50397,9,3986,2200,3113,3011],"./site/view/search-itsf-student.vue":[50397,9,3986,2200,3113,3011],"./site/view/search-pp":[21658,9,3986,2200,3113,871],"./site/view/search-pp.vue":[21658,9,3986,2200,3113,871]};function s(e){if(!i.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],s=t[0];return Promise.all(t.slice(2).map(i.e)).then((function(){return i.t(s,16|t[1])}))}s.keys=function(){return Object.keys(n)},s.id=1473,e.exports=s}}]);
//# sourceMappingURL=custom.015368d1.js.map