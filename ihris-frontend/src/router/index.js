import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/home.vue"
import Static from "../views/static-page.vue"
import HomeNav from "../views/home-nav.vue"
import ShowInGrid from "@/views/custom-nav.vue";
//import Test from "../views/test.vue"
//import mhero from "../views/mhero/mhero.vue"
//import contactGroups from "../views/mhero/contact-groups.vue"
// import store from "@/store";

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "home",
    components: {
      default: Home,
      homeNav: HomeNav
    },
    props: { default: { id: "page-home", blankOnErr: true } }
  },
  {
    path: "/show-in-grid/:id",
    name: "grid-view",
    components: {
      default: Home,
      homeNav: ShowInGrid
    },
    props: { default: { id: "page-grid-view", blankOnErr: true } }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import( /* webpackChunkName: "reset-password" */ '../views/auth/reset-password.vue'),
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: () => import( /* webpackChunkName: "change-password" */ '../views/auth/change-password.vue')
  },
  {
    path: '/page/blockContacts',
    name: 'mhero',
    component: () => import( /* webpackChunkName: "mhero" */ "../views/mhero/blockContacts.vue")
  },
  {
    path: '/page/unblockContacts',
    name: 'mhero',
    component: () => import( /* webpackChunkName: "mhero" */ "../views/mhero/unblockContacts.vue")
  },
  {
    path: '/page/mhero',
    name: 'mhero',
    component: () => import( /* webpackChunkName: "mhero" */ "../views/mhero/mhero.vue")
  },
  {
    path: '/page/mhero-scheduled-message',
    name: 'mhero-scheduled-message',
    component: () => import( /* webpackChunkName: "mhero" */ "../views/mhero/mhero-scheduled-message.vue")
  },
  {
    path: '/page/contact-groups',
    name: 'contact-groups',
    component: () => import( /* webpackChunkName: "mhero" */ "../views/mhero/contact-groups.vue")
  },
  {
    path: '/page/mhero-reports',
    name: 'mhero-reports-base',
    component: () => import( /* webpackChunkName: "mhero" */ "../views/mhero/mhero-reports-base.vue")
  },
  {
    path: '/report/:report',
    name: 'mhero-reports',
    component: () => import( /* webpackChunkName: "mhero" */ "../views/mhero/mhero-reports.vue")
  },
  /*
  {
    path: "/test/:id",
    name: "test",
    component: Test
  },
  */
  {
    path: "/static/:id",
    name: "static",
    //component: () => import( /* webpackChunkName: "static" */ "../views/static-page.vue")
    component: Static
  },
  //{
  //path: "/resource/:type/:page/:id?",
  //name: "resource_page",
  //// route level code-splitting
  //// this generates a separate chunk (about.[hash].js) for this route
  //// which is lazy-loaded when the route is visited.
  //component: () => import(/* webpackChunkName: "resource" */ "../views/fhir-page-resource.vue")
  //},
  {
    path: "/resource/view/:page/:id",
    name: "resource_view",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "resource" */ "../views/fhir-page-view.vue")
  },
  {
    path: "/resource/search/:page",
    name: "resource_search",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "resource" */ "../views/fhir-page-search.vue")
  },
  {
    path: "/resource/report/:report",
    name: "resource_report",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "report" */ "../views/fhir-report.vue")
  },
  {
    path: "/resource/add/:page",
    name: "resource_add",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "resource-add" */ "../views/fhir-page-add.vue")
  },
  {
    path: "/questionnaire/:questionnaire/:page/:id?",
    name: "questionnaire",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "questionnaire" */ "../views/fhir-page-questionnaire.vue")
  },
  {
    path: "/custom/:component",
    name: "custom_components",
    component: () => import( /* webpackChunkName: "custom" */ "../views/custom.vue")
  },
  {
    path: "/ihris-apps-list",
    name: "ihris-apps-list",
    component: () => import( /* webpackChunkName: "apps" */ "../views/apps.vue")
  },
  {
    path: "/ihris-apps-install",
    name: "ihris-apps-install",
    component: () => import( /* webpackChunkName: "install-app" */ "../components/ihris/install-app.vue")
  },
  {
    path: "/ihris-apps-uninstall",
    name: "ihris-apps-uninstall",
    component: () => import( /* webpackChunkName: "uninstall-app" */ "../components/ihris/uninstall-app.vue")
  },
  {
    path: "/dashboard/:id",
    name: "dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "dashboard" */ "../views/dashboard.vue")
  },
  {
    path: "/bulk-registration",
    name: "bulk_registration",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "questionnaire" */ "../views/bulk-registration")
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//     if (!store.state.user.loggedin) {
//       if (to.path !== '/' && to.path !== '/reset-password' &&to.path !== '/change-password') {
//         next({
//           path: '/'
//         })
//       }else {
//         next()
//       }
//     } else {
//       next()
//     }
// })

export default router
