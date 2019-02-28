import http from './axios';

interface State {
    init: boolean;
    table: TableRow[];
}

interface TableRow {
    key: string;
    key2: string;
    key3: string;
}

export default {
    namespaced: true,
    state: {
        init: false,
        table: [
            {
                key: 'string',
                key2: 'number',
                key3: 'data',
            },
            {
                key: 'string2',
                key2: 'number3',
                key3: 'data14',
            },
            {
                key: 'string1231',
                key2: 'number123',
                key3: 'data13231',
            },
            {
                key: 'string3123',
                key2: 'number131',
                key3: 'data123',
            },
        ],
    },
    getters: {
        getInitStatus(state: State): boolean {  return state.init; },
        getTable(state: State): TableRow[] { return state.table; },
    },
    mutations: {
        // setInitFalse(state: State): void { state.init = false; },
        newSEMD(state: State): void {
            state.init = true;
        },
        closeProject(state: any) {
            localStorage.clear();
            state.init = false;
        },
    },
};
