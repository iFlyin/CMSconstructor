import Vue from 'vue';
import VuexHistory from 'vuex-history';
import store from './store/_main';

Vue.use( VuexHistory );
const maxHistoryLength: number = 20;
const watchStateNames: string[] = ['CMS/screenList', 'CMS/cmsList', 'CMS/deleteList'];
const vuexHistory = new VuexHistory(store, watchStateNames, maxHistoryLength);

export const history = {
    computed: {
        canUndo() { return vuexHistory.canUndo; },
        canRedo() { return vuexHistory.canRedo; },
    },
    methods: {
        clearHistory() { vuexHistory.clearHistory(); },
        undo() { vuexHistory.undo(); },
        redo() { vuexHistory.redo(); },
    },
};

export const snapshot = {
    methods: { saveSnapshot() { vuexHistory.saveSnapshot(); } },
};

export const colors = {
    data: () => ({
        colorDark: '#2c3e50',
        colorGreen: '#009688',
    }),
}
