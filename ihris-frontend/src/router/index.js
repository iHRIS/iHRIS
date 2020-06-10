import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/home.vue"
import Test from "../views/test.vue"

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
    path: "/static/:id",
    name: "Static Page",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/static-page.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/about.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
