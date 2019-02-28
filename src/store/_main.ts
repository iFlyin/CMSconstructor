import Vue from 'vue';
import Vuex from 'vuex';
import CMS from './CMS';
import SEMD from './SEMD';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

interface State {
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
    panel: {
      left: 0,
      right: 0,
      footer: 0,
    },
  },
  getters: {
    getPanel(state: State): Panel { return state.panel; },
  },
  mutations: {
    panelResize(state: State, payload: PanelResize): void {
      Vue.set(state.panel, payload.dir, payload.val);
    },
  },
});
