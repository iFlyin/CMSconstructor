import http from './axios';

interface State {
    init: boolean;
    masterTable: Table;
    semds: SEMDs[];
}

interface Table {
    name: string;
    details: Table[];
    table: KeyValue[];
}

interface KeyValue {
    [key: string]: string;
}

interface SEMDs {
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
    },
    getters: {
        getInitStatus(state: State): boolean {  return state.init; },
        // getTable(state: State): TableRow[] { return state.table; },
        getSEMDs(state: State): SEMDs[] { return state.semds; },
    },
    mutations: {
        // setInitFalse(state: State): void { state.init = false; },
        newSEMD(state: State): void {
            state.init = true;
        },
        closeProject(state: State) {
            localStorage.clear();
            state.init = false;
        },
        setSEMDs(state: State, payload: SEMDs[]) {
            state.semds = payload;
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
                const {data} = await http.get(`get/get_single_semd?id=${payload}`);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        },
    },
};
