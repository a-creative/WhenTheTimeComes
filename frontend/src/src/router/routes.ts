import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import Home from "@/views/home/HomeView.vue";

import RegisterView from "@/views/auth/RegisterView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import ResetTestView from "@/views/auth/ResetTestView.vue";

import { getAuthStore } from '@/stores/authStore';

let mainMenuRoutes: RouteRecordRaw[] = []

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/resetTest",
    name: "resetTest",
    component: ResetTestView
  }
];

const traverseRoute = ( route?: RouteRecordRaw, level = 0 ): RouteRecordRaw[] => {
  let routes: RouteRecordRaw[] = (route ? route.children : mainMenuRoutes) as RouteRecordRaw[];
  let newRoutes: RouteRecordRaw[] = [];
  level++;
  routes.forEach( ( childRoute: RouteRecordRaw, priority:number ) => {
    if ( typeof(childRoute.meta) === 'undefined' ) {
      childRoute.meta = {};
    }
    childRoute.meta.showInMainMenu = ( 'showInMainMenu' in childRoute.meta ? childRoute.meta.showInMainMenu : true );
    childRoute.meta.priority = priority;
    childRoute.meta.level = level;
    childRoute.meta.parent = route;

    if (childRoute.children){
      childRoute.children = traverseRoute(childRoute,level);
    }

    newRoutes.push( childRoute );
  });

  return newRoutes;
}

mainMenuRoutes = traverseRoute();

let myRoutes = routes.concat(mainMenuRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes: myRoutes
});

router.beforeEach((to, from,next) => {

  const authStore = getAuthStore();

  const publicPages = ['/login','/register','/resetTest'];
  const authRequired = !publicPages.includes(to.path);
  if (authRequired) {

    if ( to.path === '/logout' ) {

      authStore.logout(() => {
        router.push({ 'name' : 'login' });
      })

    } else if ( !authStore.getUser ) {

      authStore.setUnsuccessfullyAccessedRoute( to.path );
      next({ 'name' : 'login' } );
    } else {
      next();
    }

  } else {
    next();
  }
  
});

export default router;
