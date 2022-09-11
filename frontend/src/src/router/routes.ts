import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import Home from "@/views/home/HomeView.vue";

import TagsView from "@/views/tags/TagsView.vue";
import TagsCreateEditView from "@/views/tags/TagsCreateEditView.vue";

import TagCategoriesView from "@/views/tags/tagCategories/TagCategoriesView.vue";
import TagCategoriesCreateEditView from "@/views/tags/tagCategories/TagCategoriesCreateEditView.vue"

import MembersView from "@/views/members/MembersView.vue";
import MemberCreateTempView from "@/views/members/MemberCreateTempView.vue";
import MemberEditUpdatePostView from "@/views/members/MemberEditUpdatePostView.vue";

import PostsView from "@/views/posts/PostsView.vue";
import PostsImportView from "@/views/posts/PostsImportView.vue";
import PostsSearchView from "@/views/posts/PostsSearchView.vue";
import NewsletterEditView from "@/views/posts/NewsletterEditView.vue";
import NewsletterSendView from "@/views/posts/NewsletterSendView.vue";

import PostSubjectsView from "@/views/posts/subjects/PostSubjectsView.vue"
import PostSubjectsCreateEditView from "@/views/posts/subjects/PostSubjectsCreateEditView.vue";

import RegisterView from "@/views/auth/RegisterView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import ResetTestView from "@/views/auth/ResetTestView.vue";


import axios from 'axios';
import { userStore } from '@/stores/userStore';

let mainMenuRoutes: RouteRecordRaw[] = [
  {
    // Posts
    path: "/posts",
    name: "posts",
    component: PostsView,
    children : [
      {
        // Import 
        path: "import",
        name: "postsImport",
        component: PostsImportView
      },
      {
        // Newsletter
        path: "newsletter/edit",
        name: "newsletterEdit",
        component: NewsletterEditView,
        children : [{
            // Send
            path: "newsletter/send",
            name: "newsletterSend",
            component: NewsletterSendView,
        }]
      }, 
      {
        // Subjects
        path: "postSubjects",
        name: "postSubjects",
        component:PostSubjectsView,
        children: [ 
          {
            // Create
            path: "create",
            name: "postSubjectsCreate",
            component: PostSubjectsCreateEditView
          },
          {
            // Edit
            path: "postSubjects/:id/edit",
            name: "postSubjectsEdit",
            component: PostSubjectsCreateEditView
          }
        ]
      }, {
        // Search
        path: "search",
        alias : "/posts",
        name: "search",
        component: PostsSearchView
      }
    ]
  },
  {
    // Tags
    path: "/tags",
    name: "tags",
    component: TagsView,
    children: [
      {
        // Create
        path: "/tags/create",
        name: "tagsCreate",
        component: TagsCreateEditView
      },
      {
        // Edit
        path: "/tags/:id/edit",
        name: "tagsEdit",
        component: TagsCreateEditView
      },
      {
        // Categories
        path: "/tagCategories",
        name: "tagCategories",
        component: TagCategoriesView,
        children: [ 
          {
            // Create
            path: "/tagCategories/create",
            name: "tagCategoriesCreate",
            component: TagCategoriesCreateEditView
          },
          {
            // Edit
            path: "/tagCategories/:id/edit",
            name: "tagCategoriesEdit",
            component: TagCategoriesCreateEditView
          }
        ]
      }
    ]
  }, {
    // Members
    path: "/members",
    name: "members",
    component: MembersView,
    children: [
      {
        path: "edit-update-post",
        name: "memberEditUpdatePost",
        component: MemberEditUpdatePostView
      }, {
        path: "edit-temporary/:id",
        name: "memberEditTemporary",
        component: MemberCreateTempView
      }, {
        path: "create-temporary",
        alias : "/members",
        name: "memberCreateTemporary",
        component: MemberCreateTempView
      }
    ]
  }
]

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

  const uStore = userStore();

  const publicPages = ['/login','/register','/resetTest'];
  const authRequired = !publicPages.includes(to.path);
  if (authRequired) {

    if ( to.path === '/logout' ) {

      uStore.logout(() => {
        router.push({ 'name' : 'login' });
      })

    } else if ( !uStore.getUser ) {
      uStore.setUnsuccessfullyAccessedRoute( to.path );
      next({ 'name' : 'login' } );
    } else {
      next();
    }

  } else {
    next();
  }
  
});

export default router;
