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
      path: "/change-password",
      name: "change-password",
      component: () =>
        import(/* webpackChunkName: "ChangePassword" */ "./views/ChangePassword.vue")
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
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "Login" */ "./views/Login.vue")
    },
    {
      path: "/logout",
      name: "logout",
      component: () =>
        import(/* webpackChunkName: "Logout" */ "./views/Logout.vue")
    },
    {
      path: "/mhero",
      name: "mhero",
      component: () =>
        import(/* webpackChunkName: "MHero" */ "./views/MHero/Workflow.vue")
    },
    {
      path: "/mhero/reports",
      name: "mhero-reports",
      component: () =>
        import(/* webpackChunkName: "Mhero Reports" */ "./views/MHero/Reports.vue")
    },
    {
      path: "/mhero/review",
      name: "mhero-review",
      component: () =>
        import(/* webpackChunkName: "Mhero Review" */ "./views/MHero/Review.vue")
    },
    {
      path: "/people/search",
      name: "search-people",
      component: () =>
        import(/* webpackChunkName: "People" */ "./views/People/Search.vue")
    },
    {
      path: "/people/add",
      name: "add-people",
      component: () =>
        import(/* webpackChunkName: "AddPeople" */ "./views/People/Add.vue")
    },
    {
      path: "/people/add/:section/:id",
      name: "edit-people",
      component: () =>
        import(/* webpackChunkName: "EditPeople" */ "./views/People/AddSubsection.vue")
    },
    {
      path: "/people/edit/:id",
      name: "people-edit",
      component: () =>
        import(/* webpackChunkName: "ViewPeople" */ "./views/People/Edit.vue")
    },
    {
      path: "/people/view/:id",
      name: "people-view",
      component: () =>
        import(/* webpackChunkName: "ViewPeople" */ "./views/People/View.vue")
    },
    {
      path: "/relationship",
      name: "relationship",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Relationship/Relationship.vue")
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
