import http from './axios';
import Vue from 'vue';
import { Panel, PanelResize} from '@/interfaces';

interface State {
    init: boolean;
    panel: Panel;
    test: string;
}

export default {
    namespaced: true,
    state: {
        init: false,
        panel: {
            left: 0,
            right: 0,
            footer: 0,
        },
        test: 'РАБОТАЕТ!!!',
    },
    getters: {
        getInit(state: State): boolean { return state.init; },
        getPanel(state: State): Panel { return state.panel; },
        getTest(state: State): string { return state.test; },
    },
    mutations: {
        panelResize(state: State, payload: PanelResize): void {
            Vue.set(state.panel, payload.dir, payload.val);
        },
    },
    actions: {},
};
