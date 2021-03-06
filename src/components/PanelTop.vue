<template>
   <div id="menu">
      <nav @click="menuActive = !menuActive" v-clickOutside="closeMenu">
         <div class="menu-container">
            <input type="button" class="menu-text-button" @mouseover="active='file'" :value="config.file">
            <ul class="menu-list" v-show="menuActive && (active==='file')">
               <slot></slot>
               <li class="menu-list-item"><a class="menu-list-item-link" @click="close()" v-html="config.exit"/></li>
            </ul>
         </div>
         <div class="menu-container">
            <input type="button" class="menu-text-button" :value="config.edit" @mouseover="active='edit'">
            <ul class="menu-list" v-show="menuActive && (active==='edit')">
               <li class="menu-list-item">
                  <a class="menu-list-item-link" :style="{ cursor: canUndo ? 'pointer' : 'not-allowed' }" @click="undo()">
                     <span v-html="config.undo"/><font-awesome-icon icon="undo-alt"/>
                  </a>
               </li>
               <li class="menu-list-item">
                  <a class="menu-list-item-link" :style="{ cursor: canRedo ? 'pointer' : 'not-allowed' }" @click="redo()">
                     <span v-html="config.redo"/><font-awesome-icon icon="redo-alt"/>
                  </a>
               </li>
            </ul>
         </div>
         <div class="menu-container">
            <input type="button" class="menu-text-button" :value="config.view" @mouseover="active='view'">
            <ul class="menu-list" v-show="menuActive && (active==='view')">
               <li class="menu-list-item">
                  <a v-for="(panel, key) of panels" :key="key" class="menu-list-item-link" @click="panelToggle(key)">
                     <span v-html="config[`${key}Panel`]"/><font-awesome-icon :icon="VueComponent[key] ?'eye':'eye-slash'"/>
                  </a>
               </li>
            </ul>
         </div>
      </nav>
      <close-button @close="close()"/>
   </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { menuConfig } from '@/cfg';
import { history, colors } from '@/mixins';
import { clickOutside } from '@/directives';
import { Panel, PanelResize } from '@/interfaces';
import CloseButton from '@/components/PanelCloseButton.vue';

@Component({
   components: { CloseButton },
   props: {base: { type: String, required: true }},
   mixins: [history, colors],
   directives: { clickOutside },
})

export default class PanelTop extends Vue {
   public base!: string;
   public config = menuConfig;
   public menuActive: boolean = false;
   public active: string = '';
   
   public get VueComponent(): any { return this; }
   public get init(): boolean { return this.$store.getters[`${this.base}/getInitStatus`]; }
   public get panels(): Panel { return this.$store.getters[`${this.base}/getPanel`]; }
   public get left(): boolean { return this.panels.left && this.panels.left > 2 ? true : false; }
   public get right(): boolean { return this.panels.right && this.panels.right > 2 ? true : false; }
   public get footer(): boolean { return this.panels.footer && this.panels.footer > 2 ? true : false; }

   public closeMenu(): void { this.menuActive = false; }

   public panelToggle(this: any, dir: string) {
      if(this.init) {
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

   public clearHistory!: () => void;
   public undo!: () => void;
   public redo!: () => void;

   public clean(): void { return this.$store.commit(`${this.base}/closeProject`); }

   public panelResize(payload: PanelResize): void { this.$store.commit(`${this.base}/panelResize`, payload); }

   public close() {
      const req: boolean = confirm('Все несохраненные данные будут утерены. Вы действительно хотите выйти?');
      if (req) {
         this.$store.commit('setPage', 'app-home')
         this.clean();
         this.clearHistory();
         for (const dir in this.panels) {
            const val = this.base === 'SEMD' && dir === 'left' ? 320 : 0;
            this.panelResize({dir, val})
         }
      }
   }

   // Listners

   private keyUpListner(e: KeyboardEvent): void {
      if(e.code === 'KeyZ' && e.ctrlKey === true) {this.undo()}
      if(e.code === 'KeyY' && e.ctrlKey === true) {this.redo()}
      if(e.code === 'ArrowLeft' && e.ctrlKey === true) {this.panelToggle('left')}
      if(e.code === 'ArrowRight' && e.ctrlKey === true) {this.panelToggle('right')}
      if(e.code === 'ArrowDown' && e.ctrlKey === true) {this.panelToggle('footer')}
      if(e.code === 'KeyS' && e.ctrlKey === true && e.shiftKey === true) {
         const el: HTMLElement | null = document.getElementById('save-to-file');
         if (el) { el.click(); }
      }
      if(e.code === 'KeyS' && e.ctrlKey === true && e.shiftKey !== true) { this.$emit('upload') }
   }

   public fixPrevent(e: KeyboardEvent) { if(e.code === 'KeyS' && e.ctrlKey === true) {e.preventDefault()}; }

   public mounted(): void {
      document.addEventListener('keyup', this.keyUpListner);
      document.addEventListener('keydown', this.fixPrevent, false);
   }

   public beforeDestroy(): void { 
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
            background-color: $colorLightGrey;
            color: $colorDark
         }
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
                  background-color: $colorLightGrey;
                  color: $colorDark;
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
               background-color: $colorLightGrey;
               color: $colorDark;
            }
         }
      }
   }
</style>
