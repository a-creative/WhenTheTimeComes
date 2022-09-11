import { createApp } from "vue";
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import App from "@/App.vue";
import router from "@/router/routes";
import i18n from "@/i18n";
import FontAwesomeIcon from "@/utils/fontawesome-icons";
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://localhost:7012';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.withCredentials = true;
    config.headers = {
      "Accept": "application/json"
    };
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const pinia = createPinia()
pinia.use(piniaPersist)

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(i18n)
  .use(pinia)
  .use(VueAxios, axios)
  .mount("#app");
