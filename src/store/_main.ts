import Vue from 'vue';
import Vuex from 'vuex';
import CMS from './CMS';
import SEMD from './SEMD';
import FORM from './FORM';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

interface State {
  page: string;
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: { CMS, SEMD, FORM },
  state: {
    page: 'app-home',
  },
  getters: {
    getPage(state: State) { return state.page; },
  },
  mutations: {
    setPage(state: State, payload: string): void {
      state.page = payload;
    },
  },
});
