import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import Dashboard from "@/components/Dashboard.vue";
import User from "@/components/User.vue";
import Profiles from "@/components/Profiles.vue";
import Registration from "@/components/Registration.vue";
import userRegistration from "@/components/userRegistration.vue";
// import { component } from "vue/types/umd";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/Registration",
    name: "Registration",
    component: Registration,

  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [{
      path: "User",
      name: "User",
      component: User,
    },
    {
      path: "Profiles",
      name: "Profiles",
      component: Profiles,
    },
    {
      path: "userRegistration",
      name: "userRegistration",
      component: userRegistration,
    },
    ]
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
