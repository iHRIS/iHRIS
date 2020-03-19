import ConfigSettings from "@/mixins/ConfigSettings.js";
import Vue from "vue";
import Router from "vue-router";
import { store } from "./store.js";

const mheroEnabled = ConfigSettings.methods.isMHeroEnabled();

Vue.use(Router);

var vueInstance=new Vue(
{
  props:{
    error:String
  },
  methods:{
    displayError(msg){
      this.$nextTick(() => { 
        this.error=msg;
        serverBus.$emit("errorGenerated",this.error);
      });
    }
  }
});
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
        import(
          /* webpackChunkName: "adminAddUser" */ "./views/Admin/AddUser.vue"
        )
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
        import(
          /* webpackChunkName: "ChangePassword" */ "./views/ChangePassword.vue"
        )
    },
    {
      path: "/documentation",
      name: "documentation",
      component: () =>
        import(
          /* webpackChunkName: "documentation" */ "./views/Documentation.vue"
        )
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
        mheroEnabled
          ? import(/* webpackChunkName: "Mhero" */ "./views/MHero/Workflow.vue")
          : import(
              /* webpackChunkName: "Mhero" */ "./views/MHero/NotAvailable.vue"
            )
    },
    {
      path: "/mhero/reports",
      name: "mhero-reports",
      component: () =>
        mheroEnabled
          ? import(
              /* webpackChunkName: "Mhero Reports" */ "./views/MHero/Reports.vue"
            )
          : import(
              /* webpackChunkName: "Mhero Reports" */ "./views/MHero/NotAvailable.vue"
            )
    },
    {
      path: "/mhero/user-manual",
      name: "mhero-user-manual",
      component: () =>
        mheroEnabled
          ? import(
              /* webpackChunkName: "Mhero User Manual" */ "./views/MHero/UserManual.vue"
            )
          : import(
              /* webpackChunkName: "Mhero User Manual" */ "./views/MHero/NotAvailable.vue"
            )
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
        import(
          /* webpackChunkName: "EditPeople" */ "./views/People/AddSubsection.vue"
        )
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
        import(
          /* webpackChunkName: "about" */ "./views/Relationship/Relationship.vue"
        )
    },
    {
      path: "/terms-and-conditions",
      name: "terms-and-conditions",
      component: () =>
        import(
          /* webpackChunkName: "termsAndConditions" */ "./views/TermsAndConditions.vue"
        )
    },
    {
      path: "/user-manual",
      name: "user-manual",
      component: () =>
        import(/* webpackChunkName: "userManual" */ "./views/UserManual.vue")
    }
    ,
    {
      path: "/noaccess",
      name: "noaccess",
      component: () =>
        import(/* webpackChunkName: "NotAllowed" */ "./views/noaccess.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!store.state.authentication.username) {
    const config = require("@/config/config.json");

    if (
      
      to.path == "/login" ||
      to.path == "/logout" ||
      config.demo
    ) {
      next();
    } 
    else {
      next({
        path: "/login"
      });
    }
  } else {
    
      var routeName=to.name;
      var roles=store.state.roles;
      var allowed=checkPageRole(roles,routeName);
      if(allowed){
        next();
      }
      else
      {
        var error = "The user does not have the necessary privileges to access the page : "+routeName;
        next({
              path: "/noaccess",
            });
        
        vueInstance.displayError(error);
      }
  }
});

function checkPageRole(roleName,routeName)
{
  let roles = [];
  switch(routeName)
  {
    case "search-people":
      roles = ["Admin", "Edit", "View"];
      break;
    case "add-people":
      roles = ["Admin", "Edit"];
      break;
    case "edit-people":
      roles = ["Admin", "Edit"];
      break;
    case "people-edit":
      roles = ["Admin", "Edit"];
      break;
    case "people-view":
      roles = ["Admin","Edit","View"];
      break;
    case "home":
      roles = ["Admin","Edit","View"];
      break;
    case "relationship":
      roles = ["Admin"];
      break;
    case "admin-add-user":
      roles = ["Admin"];
      break;
    case "admin-users":
      roles = ["Admin"];
      break;
    default:
      return true;
  }
  return roles.includes(roleName) && roles.length;
};
export default router;
