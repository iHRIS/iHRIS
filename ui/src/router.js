import Vue from "vue";
import Router from "vue-router";
import { store } from "./store.js";

Vue.use(Router);
var searchPeopleAllowedRoles=["Admin","Edit","View"];
var editPeopleAllowedRoles=["Admin","Edit"];
var viewPeopleAllowedRoles=["Admin","Edit","View"];
var relationshipsAllowedRoles=["Admin"];
var manageUserAllowedRoles=["Admin"];
let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      props: true,
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue"),
      beforeEnter (to, from, next) {
        var roles=store.state.roles;
        if(roles == "Admin" || roles == "Edit" || roles == "View")
        {
          store.state.allowToAccessTheNextPage = true;
          next();
        }
        else{
          next(false);
        }
      }
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
        import(/* webpackChunkName: "adminAddUser" */ "./views/Admin/AddUser.vue"),
        beforeEnter (to, from, next) {
          var routeName=to.name;
          var roles=store.state.roles;
          checkPageRole(roles,routeName);
          next();
        }
        
    },
    {
      path: "/admin/users",
      name: "admin-users",
      component: () =>
        import(/* webpackChunkName: "adminsUsers" */ "./views/Admin/Users.vue"),
        beforeEnter (to, from, next) {
          var routeName=to.name;
          var roles=store.state.roles;
          checkPageRole(roles,routeName);
          next();
        }
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
        import(/* webpackChunkName: "People" */ "./views/People/Search.vue"),
        beforeEnter (to, from, next) {
        
        var routeName=to.name;
        var roles=store.state.roles;
        checkPageRole(roles,routeName);
        next();
        }
    },
    {
      path: "/people/add",
      name: "add-people",
      component: () =>
        import(/* webpackChunkName: "AddPeople" */ "./views/People/Add.vue"),
        beforeEnter (to, from, next) {
          var routeName=to.name;
          var roles=store.state.roles;
          checkPageRole(roles,routeName);
          next();
        }
    },
    {
      path: "/people/add/:section/:id",
      name: "edit-people",
      component: () =>
        import(/* webpackChunkName: "EditPeople" */ "./views/People/AddSubsection.vue"),
        beforeEnter (to, from, next) {
          var routeName=to.name;
          var roles=store.state.roles;
          checkPageRole(roles,routeName);
          next();
        }
    },
    {
      path: "/people/edit/:id",
      name: "people-edit",
      component: () =>
        import(/* webpackChunkName: "ViewPeople" */ "./views/People/Edit.vue"),
        beforeEnter (to, from, next) {
          var routeName=to.name;
          var roles=store.state.roles;
          checkPageRole(roles,routeName);
          next();
        }
    },
    {
      path: "/people/view/:id",
      name: "people-view",
      component: () =>
        import(/* webpackChunkName: "ViewPeople" */ "./views/People/View.vue"),
        beforeEnter (to, from, next) {
          var routeName=to.name;
          var roles=store.state.roles;
          checkPageRole(roles,routeName);
          next();
        }
    },
    {
      path: "/relationship",
      name: "relationship",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Relationship/Relationship.vue"),
        beforeEnter (to, from, next) {
          var routeName=to.name;
          var roles=store.state.roles;
          checkPageRole(roles,routeName);
          next();
        }
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
    const config = require("@/config/config.json");

    if (
      to.path == "/" ||
      to.path == "/login" ||
      to.path == "/logout" ||
      config.demo
    ) {
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

function checkPageRole(roleName,routeName)
{
  var resCheck=false;
  switch(routeName)
  {
    case "search-people":
      if(searchPeopleAllowedRoles.includes(roleName))
      {
        store.state.allowToAccessTheNextPage = true;
      }
      else{
        store.state.allowToAccessTheNextPage = false;
      }
      break;
    case "add-people":
      if(editPeopleAllowedRoles.includes(roleName))
      {
        store.state.allowToAccessTheNextPage = true;
      }
      else{
        store.state.allowToAccessTheNextPage = false;
      }
      break;
    case "edit-people":
      if(editPeopleAllowedRoles.includes(roleName))
      {
        store.state.allowToAccessTheNextPage = true;
      }
      else{
        store.state.allowToAccessTheNextPage = false;
      }
      break;
      case "people-view":
        if(viewPeopleAllowedRoles.includes(roleName))
        {
          store.state.allowToAccessTheNextPage = true;
        }
        else{
          store.state.allowToAccessTheNextPage = false;
        }
        break;
        case "relationship":
          if(relationshipsAllowedRoles.includes(roleName))
          {
            store.state.allowToAccessTheNextPage = true;
          }
          else{
            store.state.allowToAccessTheNextPage = false;
          }
          break;
        case "admin-add-user":
          if(manageUserAllowedRoles.includes(roleName))
          {
            store.state.allowToAccessTheNextPage = true;
          }
          else{
            store.state.allowToAccessTheNextPage = false;
          }
          break;
          case "admin-users":
            if(manageUserAllowedRoles.includes(roleName))
            {
              store.state.allowToAccessTheNextPage = true;
            }
            else{
              store.state.allowToAccessTheNextPage = false;
            }
            break;
  }
};
export default router;
