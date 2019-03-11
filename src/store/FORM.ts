import http from './axios';
import Vue from 'vue';
import { Panel, PanelResize} from '@/interfaces';

interface State {
    init: boolean;
    panel: Panel;
}

// interface Panel {
//     left: number;
//     right: number;
//     footer: number;
// }

// interface PanelResize {
//     dir: string;
//     val: number;
// }

export default {
    namespaced: true,
    state: {
        init: false,
        panel: {
            left: 0,
            right: 0,
            footer: 0,
        }
    },
    getters: {
        getInit(state: State): boolean { return state.init; },
        getPanel(state: State): Panel { return state.panel; },
    },
    mutations: {
        panelResize(state: State, payload: PanelResize): void {
            Vue.set(state.panel, payload.dir, payload.val);
        },
    },
    actions: {},
};
