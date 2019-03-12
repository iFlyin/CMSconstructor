import http from './axios';
import Vue from 'vue';
import { Panel, PanelResize} from '@/interfaces';

interface State {
    init: boolean;
    panel: Panel;
    components: {
        [key: number]: string;
    };
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
        components: {
            1: 'checkbox',
            2: 'combobox',
            3: 'datepicker',
            4: 'datetimepicker',
            5: 'edit',
            6: 'updown',
            7: 'manual',
            8: 'memo',
            9: 'button',
            10: 'bitbutton',
            11: 'hyperlink',
            12: 'passwordedit',
            13: 'label',
            14: 'textbox',
            15: 'separator',
            16: 'controlgrid',
            17: 'linebreak',
            18: 'controlgrid',
            19: 'panel',
            20: 'groupbox',
            21: 'multichoice_combobox',
          },
    },
    getters: {
        getInitStatus(state: State): boolean { return state.init; },
        getPanel(state: State): Panel { return state.panel; },
        getComponents(state: State): any { return state.components; },
    },
    mutations: {
        panelResize(state: State, payload: PanelResize): void {
            Vue.set(state.panel, payload.dir, payload.val);
        },
        initialize(state: State) {
            state.init = true;
        },
        closeProject(state: State): void {
            localStorage.clear();
            state.init = false;
        },
    },
    actions: {},
};
