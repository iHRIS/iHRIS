import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/home.vue"
import Test from "../views/test.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/test/:id",
    name: "test",
    component: Test
  },
  {
    path: "/static/:id",
    name: "static",
    component: () => import(/* webpackChunkName: "about" */ "../views/static-page.vue")
  },
  //{
    //path: "/resource/:type/:page/:id?",
    //name: "resource_page",
    //// route level code-splitting
    //// this generates a separate chunk (about.[hash].js) for this route
    //// which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ "../views/fhir-page-resource.vue")
  //},
  {
    path: "/resource/view/:page/:id",
    name: "resource_view",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/fhir-page-view.vue")
  },
  {
    path: "/resource/search/:page",
    name: "resource_search",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/fhir-page-search.vue")
  },
  {
    path: "/resource/add/:page",
    name: "resource_add",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/fhir-page-add.vue")
  },
  {
    path: "/questionnaire/:questionnaire/:page",
    name: "questionnaire",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/fhir-page-questionnaire.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
