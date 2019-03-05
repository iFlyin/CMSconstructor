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
                  <a class="menu-list-item-link" @click="reload()">{{cfg.save}}</a>
               </li>
               <li class="menu-list-item">
                  <a class="menu-list-item-link" @click.stop>{{cfg.saveFile}}</a>
               </li>
               <li class="menu-list-item">
                  <a class="menu-list-item-link" @click.stop>{{cfg.loadFile}}</a>
               </li>
               <li class="menu-list-item">
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
               <a class="menu-list-item-link" @click="panelToogle('footer')">
                  <span>{{cfg.footer}}</span><font-awesome-icon :icon="footer?'eye':'eye-slash'"/>
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
import { configSEMD } from '@/cfg';
import CloseButton from '@/components/PanelCloseButton.vue';

@Component ({
   components: { CloseButton },
   mixins: [history],
   computed: {...mapGetters('SEMD', { init: 'getInitStatus', panels: 'getPanel' })},
   methods: {...mapMutations('SEMD', {cleanState: 'closeProject', panelResize: 'panelResize'})},
})
export default class CMSMenu extends Vue {
   public cfg: any = configSEMD;
   public menuActive: boolean = false;
   public clearHistory!: any;
   public active: string = '';
   public panels!: any;
   public panelResize!: any;
   public undo!: any;
   public redo!: any;
   public upload!: any;
   public save!: any;
   public cleanState!: any;
   public init!: any;

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
   
   public get footer(): boolean {
      return this.panels.footer > 2 
         ? true
         : false;
   }

   public panelToogle(this: any, dir: string) {
      if(this.init || dir === 'left') {
         this.panelResize({
            dir: dir,
            val: this[dir] ? 2 : dir === 'left'
               ? 280 
               : dir === 'right'
                  ? 320
                  : 200,
         });
      }
   }

   private close() {
      const req: boolean = confirm('Все несохраненные данные будут утерены. Вы действительно хотите выйти?');
      if (req) {
         this.$router.push({ path: '/' });
         this.cleanState();
         this.clearHistory();
         this.panelResize({dir: 'left', val: 320});
         this.panelResize({dir: 'right', val: 0});
         this.panelResize({dir: 'footer', val: 0});
      }
   }

   private keyUpListner(e: KeyboardEvent): void {
      // console.log(e);
      if(e.code === 'KeyZ' && e.ctrlKey === true) {this.undo()}
      if(e.code === 'KeyY' && e.ctrlKey === true) {this.redo()}
      if(e.code === 'ArrowLeft' && e.ctrlKey === true) {this.panelToogle('left')}
      if(e.code === 'ArrowRight' && e.ctrlKey === true) {this.panelToogle('right')}
      if(e.code === 'ArrowDown' && e.ctrlKey === true) {this.panelToogle('footer')}
      if(e.code === 'KeyS' && e.ctrlKey === true && e.shiftKey === true) {
         const el: any = document.getElementById('save-to-file');
         el.click();
      }
      if(e.code === 'KeyS' && e.ctrlKey === true && e.shiftKey !== true) {this.upload()}
      
   }

   private fixPrevent(e: KeyboardEvent) {
      if(e.code === 'KeyS' && e.ctrlKey === true) {e.preventDefault()}
   }

   private mounted(): void {
      document.addEventListener('keyup', this.keyUpListner);
      document.addEventListener('keydown', this.fixPrevent, false);
   }

   private beforeDestroy(): void { 
      document.removeEventListener('keyup', this.keyUpListner);
      document.removeEventListener('keydown', this.fixPrevent, false);
   }

   private reload(): void {
      location.reload();
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
      background-color: $colorDark;
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
         background-color: $colorDark;
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
         background-color: $colorDark;
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