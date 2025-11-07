import { createRouter, createWebHistory } from "vue-router";
import Users from "../views/Users.vue";
import Products from "../views/Products.vue";
import Machines from "../views/Machines.vue";
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Services from '../views/Services.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: "/users", component: Users },
  { path: "/products", component: Products },
  { path: "/machines", component: Machines },
    { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/services', component: Services },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
