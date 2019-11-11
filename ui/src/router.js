import Vue from "vue";
import Router from "vue-router";
import {store} from './store.js';

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      props: true,
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/account",
      name: "account",
      component: () =>
        import(/* webpackChunkName: "account" */ "./views/Account.vue")
    },
    {
      path: "/admin/add-user",
      name: "admin-add-user",
      component: () =>
        import(/* webpackChunkName: "adminAddUser" */ "./views/Admin/AddUser.vue")
    },
    {
      path: "/admin/users",
      name: "admin-users",
      component: () =>
        import(/* webpackChunkName: "adminsUsers" */ "./views/Admin/Users.vue")
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

router.beforeEach((to, from, next) => {
  if (!store.state.authentication.username) {
    if (to.path == "/" || to.path == "/login" || to.path == "/logout") {
      next();
    } else {
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});

export default router;
