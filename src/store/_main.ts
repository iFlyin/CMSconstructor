import Vue from 'vue';
import Vuex from 'vuex';
import CMS from './CMS';
import SEMD from './SEMD';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

interface State {
  page: string;
  panel: Panel;
}

interface Panel {
  left: number;
  right: number;
  footer: number;
}

interface PanelResize {
  dir: string;
  val: number;
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: { CMS, SEMD },
  state: {
    page: 'app-home',
    panel: {
      left: 0,
      right: 0,
      footer: 0,
    },
  },
  getters: {
    getPanel(state: State): Panel { return state.panel; },
    getPage(state: State) { return state.page; },
  },
  mutations: {
    panelResize(state: State, payload: PanelResize): void {
      Vue.set(state.panel, payload.dir, payload.val);
    },
    setPage(state: State, payload: string): void {
      state.page = payload;
    },
  },
});
