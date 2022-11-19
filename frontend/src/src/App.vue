<script lang="ts" setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { getAuthStore } from './stores/authStore';
import { useI18n } from "vue-i18n";


const authStore = getAuthStore();
const { t } = useI18n({ inheritLocale: true });

const appTitle = ref<string>(t('title'));

function isLoginPage() {
  const router = useRouter();
  return (router.currentRoute.value.name == 'login');
}

const sortByMetaPriority = (a: any, b: any) => {
  if (a.meta.priority < b.meta.priority) {
    return -1;
  }
  if (a.meta.priority > b.meta.priority) {
    return 1;
  }
  return 0;
}

const getMainRoutes = () => {
  const router = useRouter();
  return router.getRoutes()
    .filter((route) => { return ( route.meta.showInMainMenu && ( route.meta.parent == null ) ) })
    .sort(sortByMetaPriority);
}
</script>

<template>
  <div class="container-fluid bg-dark navigation">
    <div class="container" style="padding-bottom: 0; padding-left: 0; padding-right: 0">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="padding-left: 0; padding-right: 0">
        <router-link to="/" class="navbar-brand">{{ appTitle }}</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="main-menu">
            <li v-for="route in getMainRoutes()" class="nav-item">
              <router-link :to="route.path" class="nav-link" :data-name="route.name">{{
                  t('route.title.' + (route.name as string))
              }}</router-link>
            </li>
          </ul>
        </div>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/login" v-if="!authStore.getUser && !isLoginPage">{{ t('Login') }}
            </router-link>
            <a href="/logout" class="nav-link" v-if="authStore.getUser" id="logoutBtn">
              {{ t('Logout') }} (<span id="usernameLoggedIn">{{ authStore.getUser.name }}</span>)
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="container content">
    <router-view />
  </div>
</template>

<i18n lang="json">{
  "da": {
    "title" : "Når tiden kommer",
    "Login": "Log ind",
    "Log ud": "Log ud",
    "route": {
      "title": {
        "currencyCreate" : "Opret valuta",
        "currencyEdit" : "Rediger valuta",
        "currencyIndex" : "Valutaoversigt"
      }
    }
  },
  "en": {
    "title" : "myBudget",
    "route": {
      "title": {
      }
    }
  }
}</i18n>

<style lang="less">
body {
  padding-bottom: 50px;
}

#app {
  .navigation {
    position: fixed;
    z-index: 2;
    box-shadow: 0px 0px 10px #000;
  }

  .content {
    position: relative;
    padding-top: 100px;
    z-index: 1;
  }

  /* Define an animation behavior */
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  /* This is the class name given by the Font Awesome component when icon contains 'spinner' */
  .fa-arrows-rotate {
    /* Apply 'spinner' keyframes looping once every second (1s)  */
    animation: spinner 1s linear infinite;
  }

  h1 .fa-arrows-rotate {
    font-size: 0.5em;
    vertical-align: middle;
  }

  .form-group+* {
    margin-top: 1rem;
  }

  h1 {
    margin-bottom: 1rem;
  }
}
</style>
