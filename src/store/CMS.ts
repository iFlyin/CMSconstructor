import Vue from 'vue';
import http from './axios';
import intersect from 'path-intersection';
import {
   Panel,
   Selected,
   Screen,
   CMS,
   WebLook,
   WebEffect,
   NumValue,
   PropType,
   Props,
   SetZoom,
   PanelResize,
   AddCMS,
   SetCMSeffect,
   SetValue,
   SetCMSwidth,
   ExtraProps,
   FileLoad,
   GetWebLook,
   GetWebEffect,
   GetCMSbyID,
   GetCMSlist,
   SetPosition,
   Effect2creen,
   StringString
} from '@/interfaces';
import axios from './axios';
// import { weblook, webeffect } from './localhost';

interface State {
   init: boolean;
   panel: Panel;
   systems_id: string;
   selected: Selected;
   id: number;
   zoom: number;
   loading: boolean;
   screenList: Screen[];
   cmsList: CMS[];
   deleteList: number[];
   weblook: WebLook[];
   webeffect: WebEffect[];
   effect2screen: {
      [key: number]: Effect2creen;
   };
   look2screen: NumValue;
   prop_type: PropType;
   prop_default: Props;
   images: string[];

   // ЗАМЕНИТЬ!!!
   systems_list: StringString[];
}

export default {
   namespaced: true,
   state: {
      init: false,
      panel: {
         left: 0,
         right: 0,
      },
      systems_list: [
         {
            uuid: '57f7d380-15bc-4bf4-9137-27182bb69826',
            name: 'РИИСЗ',
         },
         {
            uuid: 'b8a99645-0bd6-4052-a0f8-aaf612328274',
            name: 'СИСЗЛ',
         },
         {
            uuid: 'fe0b9fbc-0b8b-4a3a-96ee-332ae84b5fa8',
            name: 'ИС МВ',
         },
         {
            uuid: '1cb87d64-6bb1-4762-abc9-f9f5a81291a7',
            name: 'Паллиативная помощь',
         },
      ],
      systems_id: 'New system',
      selected: {
         id: 0,
         type: 'none',
      },
      id: 0,
      zoom: 1,
      screenList: new Array(),
      cmsList: new Array(),
      deleteList: new Array(),
      weblook: new Array(),
      webeffect: new Array(),
      effect2screen: new Object(),
      look2screen: {
         16: 'Дерево',
         17: 'Контейнер с ячейками',
      },
      prop_type: {
         look: {
            desc: 'Как нарисовать элемент на экране',
            type: 'el-readonly',
         },
         systems_id: {
            desc: 'Cистема (подсистема), в которой используется данный раздел/СЭМД',
            type: 'el-readonly',
         },
         id: {
            desc: 'Код элемента(уник.)',
            type: 'el-readonly',
         },
         parent_id: {
            desc: 'Код родительского элемента веб-приложения',
            type: 'el-readonly',
         },
         group_number: {
            desc: 'Порядковый номер элемента внутри группы с заданным parent_id',
            type: 'el-input-number',
         },
         name: {
            desc: 'Экранное краткое наименование элемента при прорисовке веб-интерфейса',
            type: 'el-input',
         },
         fullname: {
            desc: 'Экранное полное наименование элемента при прорисовке веб-интерфейса',
            type: 'el-input',
         },
         description: {
            desc: 'Описание элемента',
            type: 'el-textarea',
         },
         effect: {
            desc: 'Что делать по инициации элемента',
            type: 'el-select',
         },
         add_params: {
            desc: 'Дополнительные параметры прорисовки веб-приложения',
            type: 'el-textarea',
         },
         d_start: {
            desc: 'Дата создания записи в РИИСЗ',
            type: 'el-datepicker',
         },
         d_fin: {
            desc: 'Дата логического удаления записи при обновлении/удалении данных в РИИСЗ',
            type: 'el-datepicker',
         },
         d_modif: {
            desc: 'Дата актуализации записи при любом обновлении данных в РИИСЗ',
            type: 'el-datepicker',
         },
         db_function_name: {
            desc: 'Наименование функции БД, вызываемой из данного веб-элемента',
            type: 'el-textarea',
         },
         db_function_params: {
            desc: 'Параметры функции db_function_name',
            type: 'el-textarea',
         },
         fields_list: {
            desc: 'Список полей для хранеия списка заголовков таблицы',
            type: 'el-textarea',
         },
         gui_icon: {
            desc: 'Наименование ресурса веб-приложения, соответствующего иконке элемента',
            type: 'el-imagepicker',
         },
         check_right: {
            desc: 'Код права, наличие которого у пользователя, разрешает доступ к данному веб-элементу',
            type: 'el-input-number',
         },
      },
      prop_default: {
         add_params: null,
         check_right: null,
         d_start: null,
         f_fin: null,
         d_modif: null,
         db_function_name: null,
         db_function_params: null,
         fields_list: null,
         name: null,
         fullname: null,
         description: null,
         group_number: 1,
         gui_icon: null,
      },
      loading: false,
      images: new Array(),
   },
   getters: {
      getInitStatus(state: State): boolean { return state.init; },
      getPanel(state: State): Panel { return state.panel; },
      getZoom(state: State): number {return state.zoom; },
      getScreenList(state: State): Screen[] { return state.screenList; },
      getCMSlist(state: State): CMS[] { return state.cmsList; },
      getWebLook(state: State): WebLook[] { return state.weblook; },
      getWebEffect(state: State): WebEffect[] { return state.webeffect; },
      getProp(state: State): Props { return state.prop_default; },
      getPropList(state: State): PropType { return state.prop_type; },
      getSelected(state: State): number { return state.selected.id; },
      getSelectedType(state: State): string { return state.selected.type; },
      getSystemID(state: State): string { return state.systems_id; },
      getLookName: (state: State) => (id: number): string => {
         const index = state.weblook.findIndex((el: any) => el.id === id);
         return (index > -1)
            ? state.weblook[index].name
            : 'Без внешнего вида';
      },
      getEffectName: (state: State) => (id: number): string => {
         const index = state.webeffect.findIndex((el: any) => el.id === id);
         return (index > -1)
            ? state.webeffect[index].name
            : 'Не задан';
      },
      getLoading(state: State): boolean { return state.loading; },
      getImages(state: State): string[] { return state.images; },
      // поменять
      getSystemsList(state: State): any { return state.systems_list; },
      getID(state: State): number { return state.id; },
   },
   mutations: {
      panelResize(state: State, payload: PanelResize): void {
         Vue.set(state.panel, payload.dir, payload.val);
      },
      setZoom(state: State, payload: SetZoom): void {
         const clearZoom: number = Math.round((state.zoom * 10));
         const event: WheelEvent = payload.e;

         if (event.deltaY > 0) {
            if (clearZoom === 3) {
               state.zoom = 0.3;
            } else {
               state.zoom -= 0.1;
            }
         }
         if (event.deltaY < 0) {
            if (clearZoom === 15) {
               state.zoom = 1.5;
            } else {
               state.zoom += 0.1;
               payload.callback(event, scrollX, scrollY);
            }
         }
      },
      loadTrue(state: State): void { state.loading = true; },
      loadFalse(state: State): void { state.loading = false; },
      add2screenList(state: State, payload: Screen): void {
         state.screenList.push(payload);
      },
      add2cmsList(state: State, payload: AddCMS): void {
         state.cmsList.push(payload.item);
         payload.callback();
      },
      delFromScreenList(state: State, payload: number): void {
         state.screenList.splice(payload, 1);
      },
      deleteCMS(state: State, payload: number): void {
         const id = state.cmsList[payload].props.id;
         state.deleteList.push(id);
         state.cmsList.splice(payload, 1);
      },
      clearCMSeffect(state: State, payload: number): void {
         const index = state.cmsList.findIndex((el: CMS) => el.props.id === payload);
         if (index > -1) {state.cmsList[index].props.effect = null; }
      },
      saveWebLook(state: State, payload: WebLook[]): void {
         state.weblook = payload;
      },
      saveWebEffect(state: State, payload: WebEffect[]): void {
         state.webeffect = payload;
      },
      setCMSeffect(state: State, payload: SetCMSeffect): void {
         const CMSindex: number = state.cmsList.findIndex((el: CMS) => el.props.id === payload.id);
         const CMSpath: CMS = state.cmsList[CMSindex];
         CMSpath.props.effect = payload.v;
         const parentID: number | null = CMSpath.props.parent_id;
         const fixParentID: number = (parentID) ? parentID : -1;
         const parentIndex: number = state.screenList.findIndex((el: Screen) => el.props.id === fixParentID);
         const parentPath: Screen = state.screenList[parentIndex];
         const parent = {
            X: parentPath.params.X,
            Y: parentPath.params.Y,
            W: parentPath.params.width,
            H: parentPath.params.height,
         };
         // console.log(payload);

         // tslint:disable-next-line:no-shadowed-variable
         const CMS = {
            X: CMSpath.params.X + parent.X,
            Y: CMSpath.params.Y + parent.Y,
            W: CMSpath.params.width,
            H: CMSpath.params.height,
         };

         const CMScenter = {
            X: CMS.X + (CMS.W / 2),
            Y: CMS.Y + (CMS.H / 2),
         };

         const path1: string = rectConstructor(parent.X, parent.Y, parent.W, parent.H);
         const path2: string = lineConstructor(CMScenter.X, CMScenter.Y, CMScenter.X, CMScenter.Y + 10000);

         let X: number = ((CMScenter.X - 200) > 0) ? (CMScenter.X - 200) : 0;
         let Y: number = intersect(path1, path2)[0].y + 100;
         const effect: number | null = CMSpath.props.effect;
         const look: number | null = CMSpath.props.look;

         const childIndex: number = state.screenList.findIndex((el: Screen) => el.props.id === payload.id);

         if (childIndex !== -1) {
            X = state.screenList[childIndex].params.X;
            Y = state.screenList[childIndex].params.Y;
            clear(payload.id);
         }
         if (effect !== null) {
            const check: boolean = effect in state.effect2screen;
            if (check) {
               const name = state.effect2screen[effect].name.split(' ').slice(2).join(' ');
               // console.log(name);
               newScreen(name);
            }
         }
         if (look !== null) {
            const check: boolean = look in state.look2screen;
            if (check) { newScreen(state.look2screen[look]); }
         }

         function newScreen(name: string): void {
            const screen: Screen = {
               props: {
                  id: payload.id,
                  name,
               },
               params: {
                  type: 'Screen',
                  X,
                  Y,
                  width: 400,
                  height: 300,
               },
            };
            state.screenList.push(screen);
         }

         if (payload.callback) {
            payload.callback();
         }

         function rectConstructor(x: number, y: number, w: number, h: number): string {
            return `M${x},${y}L${x + w},${y}L${x + w},${y + h}L${x},${y + h}Z`;
         }

         function lineConstructor(x1: number, y1: number, x2: number, y2: number): string {
            return `M${x1},${y1}L${x2},${y2}`;
         }

         function clear(id: number) {
            const list = state.cmsList.filter((el: CMS) => el.props.parent_id === id);
            if (list.length > 0) {
               for (const child of list) {
                  clear(child.props.id);
                  state.cmsList.splice(state.cmsList.findIndex((el: CMS) => el.props.id === child.props.id), 1);
               }
            }
            const newIndex = state.screenList.findIndex((item: Screen) => item.props.id === id);
            if (newIndex !== -1) {
               state.screenList.splice(newIndex, 1);
            }
         }
      },
      setSelected(state: State, payload: Selected): void {
         state.selected.id = payload.id;
         state.selected.type = payload.type;
      },
      setValue(state: State, payload: SetValue): void {
         const key: string = payload.key;
         const value: string | number | null = payload.v;
         const index: number = state.cmsList.findIndex((item: CMS) => item.props.id === payload.id);
         const cms: CMS = state.cmsList[index];
         Vue.set(cms.props, key, value);
         payload.callback();
      },
      setPosition(state: State, payload: SetPosition) {
         const index: number = state.cmsList.findIndex((item: CMS) => item.props.id === payload.id);
         const cms: CMS = state.cmsList[index];
         Vue.set(cms.params, 'X', payload.x);
         Vue.set(cms.params, 'Y', payload.y);
         payload.callback();
      },
      setCMSwidth(state: State, payload: SetCMSwidth): void {
         const id: number = payload.id;
         const val: number = payload.val;
         state.cmsList.filter((el: CMS) => el.props.id === id)[0].params.width = val;
      },
      initNewProject(state: State): void {
         state.init = true;
         state.deleteList = new Array();
         const newScreen: Screen = {
            props: {
               id: -1,
               name: 'Главный экран',
            },
            params: {
               type: 'Screen',
               X: 120,
               Y: 40,
               width: 400,
               height: 300,
            },
         };
         state.screenList.push(newScreen);
      },
      closeProject(state: State): void {
         localStorage.clear();
         state.init = false;
         state.deleteList = new Array();
         state.cmsList = new Array();
         state.screenList = new Array();
      },
      clearAll(state: State): void {
         state.systems_id = 'New system';
         state.selected.id = 0;
         state.zoom = 1;
         state.selected.type = 'none';
         state.screenList = new Array();
         state.cmsList = new Array();
      },
      pushAll(state: State, payload: ExtraProps[]): void {
         (function pushNew(parentID: number | null) {
            // tslint:disable-next-line:no-shadowed-variable
            const CMS: ExtraProps[] = payload.filter((el: ExtraProps) => el.parent_id === parentID);
            for (const CMSitem of CMS) {
               const item: CMS = {
                  params: {
                     type: 'CMS',
                     width: 180,
                     height: 150,
                     X: 110,
                     Y: 10,
                  },
                  props: CMSitem,
               };
               state.cmsList.push(item);
               pushNew(CMSitem.id);
            }
         })(null);
      },
      saveToFile(state: State, payload: HTMLElement): void {
         const json = {
            cms: state.cmsList,
            screen: state.screenList,
         };
         const el: HTMLElement = payload;
         const filename = 'obj.json';
         const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
         el.setAttribute('href', window.URL.createObjectURL(blob));
         el.setAttribute('download', filename);
         el.dataset.downloadurl = ['application/json', filename, window.URL.createObjectURL(blob)].join(':');
      },
      loadFromFile(state: State, payload: FileLoad): void {
         const file = payload.file.target.files ? payload.file.target.files[0] : null;
         if ( file !== null) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
               const json = JSON.parse(e.target.result);
               state.cmsList = json.cms;
               state.screenList = json.screen;
               payload.callback();
            };
            reader.readAsText(file);
         }
      },
      saveToService(state: State): void {
         // tslint:disable-next-line:no-shadowed-variable
         for (const CMS of state.cmsList) {
            const obj = JSON.stringify(CMS.props);
            const params = JSON.stringify({
               id: CMS.props.id,
               systems_id: CMS.props.systems_id,
               json: JSON.stringify(CMS.params),
            });
            console.log(obj);
            console.log(params);
         }
         // console.log(state.deleteList);
      },
      setID(state: State, payload: number): void {
         state.id = payload;
      },
      setSystemId(state: State, payload: string): void {
         state.systems_id = payload;
      },
      setImages(state: State, payload: string[]) {
         state.images = payload;
      },
      setEffect2screen(state: State, payload: any) {
         state.effect2screen = payload;
      },
      setSystemsList(state: State, payload: StringString[]) {
         // console.log(payload);
         state.systems_list = payload;
      },
   },
   actions: {
      asyncGetLook: async (context: any): Promise<any> => {
         try {
            const {data}: GetWebLook = await http.get('get/get_web_look');
            context.commit('saveWebLook', data);
         } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
         }
      },
      asyncGetEffect: async (context: any): Promise<any> => {
         try {
            const {data}: GetWebEffect = await http.get('get/get_web_effect');
            context.commit('saveWebEffect', data);
         } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
         }
      },
      asyncGetID: async (context: any): Promise<any> => {
         try {
            const resp: any = await http.get('get/get_cms');
            const sortById: any[] = resp.data.sort((a: any, b: any) => {
               if (a.id < b.id) {
                  return -1;
               } else if (a.id > b.id) {
                  return 1;
               } else {
                  return;
               }
            });
            const length = sortById.length;
            const lastID = sortById[length - 1].id;
            context.commit('setID', lastID);
         } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
         }
      },
      asyncGetCMSbyId: async (context: any, payload: GetCMSbyID): Promise<any> => {
         try {
            context.commit('loadTrue');
            const id = payload.id;
            context.commit('clearAll');
            const {data}: GetCMSlist = await http.get(`/get/get_cms?systems_id=${id}`);
            context.commit('setSystemId', id);
            context.commit('initNewProject');
            context.commit('panelResize', {dir: 'left', val: 250});
            context.commit('panelResize', {dir: 'right', val: 320});
            context.commit('pushAll', data);
            const cmsList = context.getters.getCMSlist;
            for (const obj of cmsList) {
               context.commit('setCMSeffect', {
                  v: obj.props.effect,
                  id: obj.props.id,
               });
            }
            payload.callback();
            context.commit('loadFalse');
         } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
         }
      },
      asyncGetImages: async (context: any, payload: string): Promise<any> => {
         try {
            const {data} = await http.get(`getListFiles?dir=${payload}&mask=.%2B\.jpg,.%2B\.png&type=array`);
            const images = new Array();
            for (const src of data) {
               const arr = src.split('\\');
               arr.splice(0, 3);
               const str = arr.join('/');
               images.push(str);
            }
            // console.log(data);
            context.commit('setImages', images);
         } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
         }
      },
      asyncGetWebScreen: async (context: any): Promise<any> => {
         try {
            const obj: any = new Object();
            const {data} = await http.get(`/get/get_web_screen`);
            // console.log(data);
            for (const effect of data) {
               const id: number = effect.id;
               obj[id] = effect;
            }
            context.commit('setEffect2screen', obj);
         } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
         }
      },
      asyncGetSystemsList: async (context: any): Promise<any> => {
         try {
            const {data} = await http.get(`get/get_systems`);
            // console.log(data);
            context.commit('setSystemsList', data);
         } catch (err) {
            console.log(err);
         }
      },
   },
};
