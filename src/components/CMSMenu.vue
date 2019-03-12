<template>
   <div id="menu">
      <nav @click="menuActive = !menuActive">
         <div class="menu-container">
            <input type="button" class="menu-text-button" :value="cfg.file" @mouseover="active='file'">
            <ul class="menu-list" v-show="menuActive && (active==='file')">
               <li class="menu-list-item">
                  <a class="menu-list-item-link" @click="$emit('newproject')">{{cfg.new}}</a>
               </li>
               <li class="menu-list-item">
                  <a class="menu-list-item-link" @click.stop>
                     {{cfg.load}}
                  </a>
                  <ul class="menu-side-list">
                     <li 
                        v-for="system of systemsList"
                        :key="system.uuid"
                        @click="$emit('initByID', system.uuid)"                        
                     >
                     <a class="menu-side-list-item">{{system.name}}</a>
                     </li>
                  </ul>
               </li>
               <li class="menu-list-item" >
                  <a class="menu-list-item-link" @click="upload()">
                     {{cfg.save}}
                  </a>
               </li>
               <li class="menu-list-item">
                  <a class="menu-list-item-link" id="save-to-file" @click="save($event.target)">
                     {{cfg.saveFile}}
                  </a>
               </li>
               <li class="menu-list-item">
                  <label for ="inputfile" class="menu-list-item-link" @click.stop>
                     {{cfg.loadFile}}
                  </label>
                  <input type="file" class="inputfile" id="inputfile" @change="load({
                     file: $event,
                     callback: clearHistory,
                  })">
               </li>
               <li class="menu-list-item" >
                  <a class="menu-list-item-link" @click="close()">{{cfg.exit}}</a>
               </li>
            </ul>
         </div>
         <div class="menu-container">
            <input type="button" class="menu-text-button" :value="cfg.edit" @mouseover="active='edit'">
            <ul class="menu-list" v-show="menuActive && (active==='edit')">
               <li class="menu-list-item">
                  <a class="menu-list-item-link" :style="{ cursor: canUndo ? 'pointer' : 'not-allowed' }" @click="undo()">
                     <span>{{cfg.undo}}</span><font-awesome-icon icon="undo-alt"/>
                  </a>
               </li>
               <li class="menu-list-item">
                  <a class="menu-list-item-link" :style="{ cursor: canRedo ? 'pointer' : 'not-allowed' }" @click="redo()">
                     <span>{{cfg.redo}}</span><font-awesome-icon icon="redo-alt"/>
                  </a>
               </li>
            </ul>
         </div>
         <div class="menu-container">
            <input type="button" class="menu-text-button" :value="cfg.view" @mouseover="active='view'">
            <ul class="menu-list" v-show="menuActive && (active==='view')">
               <a class="menu-list-item-link" @click="panelToogle('left')">
                  <span>{{cfg.leftPanel}}</span><font-awesome-icon :icon="left?'eye':'eye-slash'"/>
               </a>
               <a class="menu-list-item-link" @click="panelToogle('right')">
                  <span>{{cfg.rightPanel}}</span><font-awesome-icon :icon="right?'eye':'eye-slash'"/>
               </a>
            </ul>
         </div>
      </nav>
      <close-button @close="close()"/>
   </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters, mapMutations } from 'vuex';
import { history } from '@/mixins';
import { configCMS } from '@/cfg';
import CloseButton from '@/components/PanelCloseButton.vue';
import { Panel, PanelResize } from '@/interfaces';

@Component ({
   components: { CloseButton },
   mixins: [history],
   computed: {
      ...mapGetters('CMS', {
         systemsList: 'getSystemsList',
         init: 'getInitStatus',
         panels: 'getPanel'
      })
   },
   methods: {
      ...mapMutations('CMS', {
         save: 'saveToFile',
         load: 'loadFromFile', 
         upload: 'saveToService',
         cleanState: 'closeProject', 
         panelResize: 'panelResize',
      }), 
   }
   // ...mapMutations({setPage: 'setPage'})}
})
export default class CMSMenu extends Vue {
   public cfg: any = configCMS;  // CFG
   public menuActive: boolean = false;
   public active: string = '';
   public panels!: Panel;
   public init!: boolean;

   public clearHistory!: () => void;
   public undo!: () => void;
   public redo!: () => void;
   public panelResize!: (payload: PanelResize) => void;
   public upload!: () => void;
   public save!: (payload: HTMLElement) => void;
   public cleanState!: () => void;
   public setPage!: (payload: string) => void;

   public get left(): boolean {
      return this.panels.left > 2 
         ? true
         : false;
   }

   public get right(): boolean {
      return this.panels.right > 2 
         ? true
         : false;
   }

   public panelToogle(this: any, dir: string) {
      if(this.init) {
         this.panelResize({
            dir: dir,
            val: this[dir] ? 2 : dir === 'left'
               ? 280 
               : 320,
         })
      }
   }

   private keyUpListner(e: KeyboardEvent): void {
      if(e.code === 'KeyZ' && e.ctrlKey === true) {this.undo()}
      if(e.code === 'KeyY' && e.ctrlKey === true) {this.redo()}
      if(e.code === 'ArrowLeft' && e.ctrlKey === true) {this.panelToogle('left')}
      if(e.code === 'ArrowRight' && e.ctrlKey === true) {this.panelToogle('right')}
      if(e.code === 'ArrowDown' && e.ctrlKey === true) {this.panelToogle('footer')}
      if(e.code === 'KeyS' && e.ctrlKey === true && e.shiftKey === true) {
         const el: HTMLElement | null = document.getElementById('save-to-file');
         if (el) { el.click(); }
      }
      if(e.code === 'KeyS' && e.ctrlKey === true && e.shiftKey !== true) {this.upload()}
      
   }

   private fixPrevent(e: KeyboardEvent) {
      if(e.code === 'KeyS' && e.ctrlKey === true) {e.preventDefault()}
   }

   private close() {
      const req: boolean = confirm('Все несохраненные данные будут утерены. Вы действительно хотите выйти?');
      if (req) {
         this.$store.commit('setPage', 'app-home')
         // this.setPage('app-home');
         this.cleanState();
         this.clearHistory();
         this.panelResize({dir: 'left', val: 0});
         this.panelResize({dir: 'right', val: 0});
         this.panelResize({dir: 'footer', val: 0});
      }
   }

   private mounted(): void {
      document.addEventListener('keyup', this.keyUpListner);
      document.addEventListener('keydown', this.fixPrevent, false);
   }

   private beforeDestroy(): void { 
      document.removeEventListener('keyup', this.keyUpListner);
      document.removeEventListener('keydown', this.fixPrevent, false);
   }
}
</script>

<style lang="scss" scoped>
   #menu {
      position: relative;
      flex: 0 0 auto;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 30px;
      background-color: $colorGreen;
      padding: 0 10px;
      z-index: 1000000;
   }

   nav {
      display: flex;
      flex-flow: row nowrap;
   }

   .menu {
      &-container {
         position: relative;
         display: flex;
      }

      &-list {
         position: absolute;
         box-sizing: border-box;
         top: 30px;
         left: 0;
         width: 160px;
         list-style: none;
         padding: 5px 0;
         margin: 0;
         background-color: $colorGreen;
         color: #fff;
         font-size: 12px;
         box-shadow: 2px 2px 8px rgba(0, 0, 0, .33);

         &-item {
            position: relative;
            
            &:hover {

               & .menu-side-list {
                  display: block;
               }
            }

            &-link {
               box-sizing: border-box;
               width: 100%;
               height: 100%;
               padding: 10px 25px;
               display: flex;
               flex-flow: row nowrap;
               justify-content: space-between;
               white-space: nowrap;
               user-select: none;
               cursor: pointer;
               color: #fff;
               text-decoration: none;

               &:hover {
                  background-color: grey;
               }
            }
         }

      }

      &-side-list {
         display: none;
         list-style: none;
         position: absolute;
         left: 160px;
         top: 0;
         padding: 5px 0;
         margin: 0;
         margin-top: -5px;
         background-color: $colorGreen;
         box-shadow: 2px 2px 8px rgba(0, 0, 0, .33);
         

         &-item {
            display: flex;
            justify-content: flex-start;
            padding: 10px 25px;
            cursor: pointer;
            text-decoration: none;
            color: #fff;
            text-align: left;

            &:hover {
               background-color: grey;
            }
         }
      }

      &-text-button {
         cursor: pointer;
         box-sizing: border-box;
         height: 30px;
         border: none;
         outline: none;
         background-color: transparent;
         color: #fff;
         padding: 0 10px;

         &:hover {
            background-color: grey;
         }
      }

      &-inside-button {
         width: 100%;
         height: 100;
         display: flex;
         justify-content: flex-start;
      }
   }

   .inputfile {
      display: none;
   }
</style>

