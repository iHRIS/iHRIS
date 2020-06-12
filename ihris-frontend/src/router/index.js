import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/home.vue"
import Test from "../views/test.vue"
import SlotTest from "../views/slot-test.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/test/:id",
    name: "Test",
    component: Test
  },
  {
    path: "/slot",
    name: "Slot",
    component: SlotTest
  },
  {
    path: "/static/:id",
    name: "Static Page",
    component: () => import(/* webpackChunkName: "about" */ "../views/static-page.vue")
  },
  {
    path: "/resource/view/:page/:id",
    name: "FHIR Resource View Page",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/fhir-page-view.vue")
  },
  {
    path: "/resource/search/:page",
    name: "FHIR Resource Search Page",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/fhir-page-search.vue")
  },
  {
    path: "/resource/add/:page",
    name: "FHIR Resource Add Page",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/fhir-page-add.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
