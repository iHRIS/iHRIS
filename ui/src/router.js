import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/account",
      name: "account",
      component: () =>
        import(/* webpackChunkName: "account" */ "./views/Account.vue")
    },
    {
      path: "/documentation",
      name: "documentation",
      component: () =>
        import(/* webpackChunkName: "documentation" */ "./views/Documentation.vue")
    },
    {
      path: "/feedback",
      name: "feedback",
      component: () =>
        import(/* webpackChunkName: "feedback" */ "./views/Feedback.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Settings.vue")
    },
    {
      path: "/terms-and-conditions",
      name: "terms-and-conditions",
      component: () =>
        import(/* webpackChunkName: "termsAndConditions" */ "./views/TermsAndConditions.vue")
    },
    {
      path: "/user-manual",
      name: "user-manual",
      component: () =>
        import(/* webpackChunkName: "userManual" */ "./views/UserManual.vue")
    }
  ]
});
