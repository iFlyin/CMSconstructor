import Vue from 'vue';
import Vuex from 'vuex';
import CMS from './CMS';
import SEMD from './SEMD';
import createPersistedState from 'vuex-persistedstate';
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
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faEye, faEyeSlash, faUndoAlt, faRedoAlt,
  faCloudDownloadAlt, faCloudUploadAlt, faFileDownload,
  faFileUpload,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Vuex);



export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: { CMS, SEMD },
  state: {
       panel: {
           left: 0,
           right: 0,
           footer: 0,
       },
    },
    getters: {
        getPanel(state: any) { return state.panel; },
    },
    mutations: {
        panelResize(state: any, payload: any): void { state.panel[payload.dir] = payload.val; },
    },
});
