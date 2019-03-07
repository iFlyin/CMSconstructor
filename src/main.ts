import Vue from 'vue';
import App from './App.vue';
import store from './store/_main';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faEyeSlash,
  faUndoAlt,
  faRedoAlt,
  faCloudDownloadAlt,
  faCloudUploadAlt,
  faFileDownload,
  faFileUpload,
  faPlus,
  faTrash,
  faMinus,
  faSearch,
  faCheckSquare,
  faSquare,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faEye,
  faEyeSlash,
  faUndoAlt,
  faRedoAlt,
  faCloudDownloadAlt,
  faSearch,
  faCheckSquare,
  faSquare,
  faCloudUploadAlt,
  faFileDownload,
  faFileUpload,
  faPlus,
  faMinus,
  faTrash,
  faSortUp,
  faSortDown,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
