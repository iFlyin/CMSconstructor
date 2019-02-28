import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/_main';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, faUndoAlt, faRedoAlt, faCloudDownloadAlt, faCloudUploadAlt,
faFileDownload, faFileUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faEye, faEyeSlash, faUndoAlt, faRedoAlt, faCloudDownloadAlt,
  faCloudUploadAlt, faFileDownload, faFileUpload, faPlus,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
