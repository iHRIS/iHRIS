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
    path: "/resource/:page/:id?",
    name: "FHIR Resource Page",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/fhir-page.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
