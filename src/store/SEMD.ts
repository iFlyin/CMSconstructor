import http from './axios';
import Vue from 'vue';
import { Panel, PanelResize, KeyValue } from '@/interfaces';

interface State {
    init: boolean;
    masterTable: Table;
    semds: SEMD[];
    semd: any;
    panel: Panel;
}

interface Table {
    name: string;
    details: Table[];
    table: KeyValue[];
}

interface SEMD {
    id: number;
    name: string;
}

export default {
    namespaced: true,
    state: {
        init: false,
        masterTable: {
            name: 'Мастер таблица',
            details: new Array(),
            table: [],
        },
        semds: new Array(),
        semd: new Object(),
        panel: {
            left: 320,
            right: 0,
            footer: 0,
        },
    },
    getters: {
        getInitStatus(state: State): boolean {  return state.init; },
        // getTable(state: State): TableRow[] { return state.table; },
        getSEMDs(state: State): SEMD[] { return state.semds; },
        getSEMD(state: State): any { return state.semd; },
        getPanel(state: State): Panel { return state.panel; },
        getName: (state: State) => (id: string): string => {
            console.log(id);
            return state.semds.filter((el: any) => el.id == id)[0].name;
        },
    },
    mutations: {
        // setInitFalse(state: State): void { state.init = false; },
        newSEMD(state: State): void {
            state.semd = new Object();
            state.init = true;
        },
        closeProject(state: State) {
            localStorage.clear();
            state.init = false;
            state.semd = new Object();
            state.semds = new Array();
        },
        setSEMDs(state: State, payload: SEMD[]) {
            state.semds = payload;
        },
        setSEMD(state: State, payload: any) {
            if (payload.data_structure) {
                payload.data_structure = JSON.parse(payload.data_structure);
            }
            state.semd = payload;
        },
        panelResize(state: State, payload: PanelResize): void {
            Vue.set(state.panel, payload.dir, payload.val);
        },
    },
    actions: {
        getSEMDs: async (context: any) => {
            try {
                const {data} = await http.get('get/get_semds');
                context.commit('setSEMDs', data);
            } catch (err) {
                console.log(err);
            }
        },
        getSEMDbyID: async (context: any, payload: number) => {
            try {
                // удалить тестовую строчку
                // const payload = 102;
                const {data} = await http.get(`get/get_semds?id=${payload}`);
                // console.log(data);
                context.commit('setSEMD', data[0]);
                if(context.state.init === false) {
                    context.commit('newSEMD');
                    context.commit('panelResize', {dir: 'right', val: 200});
                    context.commit('panelResize', {dir: 'footer', val: 200});
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
};
