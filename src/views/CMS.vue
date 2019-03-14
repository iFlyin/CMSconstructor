<template>
	<div id="constructor" :style="{ cursor: loading ? 'wait': 'auto' }">
    	<!-- <main-menu @newproject="prompt()" @initByID="asyncGetCMSbyId({
      	id: $event,
      	callback: clearHistory,
    	})"/> -->
    	<main-menu :base="'CMS'" @upload="upload()">
      	<!-- <li class="menu-list-item">
          	<a class="menu-list-item-link" @click="prompt()">{{config.new}}</a>
        	</li> -->
        	<li class="menu-list-item">
          	<a class="menu-list-item-link" @click.stop>
            	{{config.load}}
          	</a>
         	<ul class="menu-side-list">
            	<li 
              	v-for="system of systemsList"
              	:key="system.uuid"
              	@click="getCMSbyId(system.id)"                        
            	>
              		<a class="menu-side-list-item">{{system.name}}</a>
            	</li>
         	</ul>
        	</li>
        	<li class="menu-list-item" >
          	<a class="menu-list-item-link" @click="upload()">
            	{{config.save}}
          	</a>
        	</li>
        	<li class="menu-list-item">
          	<a class="menu-list-item-link" id="save-to-file" @click="save($event.target)">
            	{{config.saveFile}}
          	</a>
        	</li>
        	<li class="menu-list-item">
          	<label for ="inputfile" class="menu-list-item-link" @click.stop>
            	{{config.loadFile}}
          	</label>
          	<input type="file" class="inputfile" id="inputfile" @change="load({
            	file: $event,
            	callback: clearHistory,
          	})">
        	</li>
    	</main-menu>
    	<panel-left :width="panel.left" @resize="panelResize({dir: 'left', val: $event})" v-if="init">
      	<!-- <accordion :list="[
        		{
         	 	name: 'СMS-web_look',
         	 	list: components,
         	 	d$d: true,
        		},
      	]"/> -->
        <cms-list :list="components"/>
    	</panel-left>
      <div class="flex-row">
        	<panel-canvas :width="canvasWidth" :height="canvasHeight">
          	<layout-b-l :left="panel.left"/>
        	</panel-canvas>
        	<panel-right :width="panel.right" :height="canvasHeight" @resize="panelResize({dir: 'right', val: $event})" v-if="init">
          	<cms-form/>
        	</panel-right>
      </div>
    	<modal-box v-if="ModalBox" :height="80" :width="20">
      	<template slot="header">
        		<div class="modal-box-header">
          		<span class="modal-header">Выберите систему:</span>
          		<close-button @close="ModalBox = false"/>
        	</div>
      	</template>
      	<template slot="footer">
        		<div class="modal-grp-button">
          		<input type="button" class="modal-button modal-button-accept" value="Выбор" @click="ModalBox = false">
          		<input type="button" class="modal-button modal-button-cancel" value="Отмена" @click="ModalBox = false" >
        		</div>
      	</template>
    	</modal-box>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// import { mapGetters, mapActions, mapMutations} from 'vuex';
import { history, snapshot, colors } from '@/mixins';
import PanelLeft from '@/components/PanelLeft.vue';
import PanelRight from '@/components/PanelRight.vue';
import PanelFooter from '@/components/PanelFooter.vue';
import PanelCanvas from '@/components/PanelCanvas.vue';
// import Accordion from '@/components/PanelAccordion.vue';
import LayoutBL from '@/components/CMSLayout.vue';
import cmsForm from '@/components/CMSForm.vue';
import MainMenu from '@/components/PanelTop.vue';
import ModalBox from '@/components/PanelModalBox.vue';
import CloseButton from '@/components/PanelCloseButton.vue';
import cmsList from '@/components/CMSList.vue';
import { configCMS } from '@/cfg';

@Component ({
  components: { MainMenu, PanelLeft, PanelRight, PanelFooter, PanelCanvas, LayoutBL, cmsForm, ModalBox, CloseButton, cmsList },
  mixins: [ history, snapshot, colors ],
  // computed: {
  //   ...mapGetters('CMS', {
  //     // system_id: 'getSystemID',
  //     // init: 'getInitStatus',
  //     // loading: 'getLoading',
  //     // panel: 'getPanel',  
  //   }),
  // },
  // methods: { 
  //   // ...mapActions('CMS', ['asyncGetImages']), 
  //   // ...mapMutations('CMS', {
  //   //   // addFirstScreen: 'initNewProject', 
  //   //   // clearAll: 'clearAll',
  //   //   // panelResize: 'panelResize',
  //   //   // setSystemId: 'setSystemId',
  //   //   panelResize: 'panelResize'
  //   // }),
  // },
})

export default class CMS extends Vue {
  public config = configCMS;
  // public panel!: any;
  private windowWidth: number = window.innerWidth;
  private windowHeight: number = window.innerHeight;
  // private asyncGetID!: any;
  // private asyncGetCMSbyId!: any;
  private screen!: any;
  private block!: any;
  // private system_id!: any;
  // private addFirstScreen!: any;
  // private clearAll!: any;
  // private init!: boolean;
  // private panelResize!: any;
  private clearHistory!: any;
  private saveSnapshot!: any;
  // private setSystemId!: any;
  private ModalBox: boolean = false;

  public get init(): boolean { return this.$store.getters['CMS/getInitStatus']; }
  public get loading(): boolean { return this.$store.getters['CMS/getLoading']; }
  public get panel(): any { return this.$store.getters['CMS/getPanel']; }

  public get systemsList(): any { return this.$store.getters['CMS/getSystemsList']; }

  public getCMSbyId(id: string) {
    this.$store.dispatch('CMS/asyncGetCMSbyId', {
      id,
      callback: this.clearHistory,
    })
  }

  private get components(): any[] {
    const newArr: any[] = new Array();
    const system_id = this.$store.getters['CMS/getSystemID'];
    const weblook = this.$store.getters['CMS/getWebLook'];
    for (const item of weblook) {
      const newItem = {
        params: {
          type: 'CMS',
          width: 180,
          height: 150,
        },
        props: {
          systems_id: system_id,
          look: item.id,
          effect: '',
        }
      }
      newArr.push(newItem);
    }
    return newArr;
  }

  private get canvasWidth(): number {
    return this.windowWidth - this.panel.left - this.panel.right;
  }

  private get canvasHeight(): number {
    return this.windowHeight - 30 //- this.panel.footer;
  }

  // private prompt() {
  //     const result = prompt('Укажите Systems ID для нового проекта');
  //     // валидация!!!
  //     result ?
  //       this.initialize(result)
  //       : alert('не верный ID');
	// }
	
	public upload(): void { this.$store.commit('CMS/saveToService'); }
	public save(payload: any): void { this.$store.commit('CMS/saveToFile', payload); }
	public load(payload: any): void { this.$store.commit('CMS/loadFromFile', payload); }

  // public initialize(e: string) {
  //   const init = () => {
  //     this.panelResize({dir: 'left', val: 240});
  //     this.panelResize({dir: 'right', val: 320});
  //     // this.setSystemId(e);
  //     this.addFirstScreen();
  //     // this.asyncGetID();
  //   }
  //   if (!this.init) {
  //     init();
  //   } else {
  //     this.clearAll();
  //     init();
  //     this.clearHistory();
  //   }
  // }

  private mounted(): void {
    const that = this;    
    window.addEventListener('resize', function(){
      that.windowWidth = window.innerWidth;
      that.windowHeight = window.innerHeight;
    })
  }

  private created(): void {
    this.$store.dispatch('CMS/asyncGetLook');
    this.$store.dispatch('CMS/asyncGetEffect');
    this.$store.dispatch('CMS/asyncGetWebScreen');
    this.$store.dispatch('CMS/asyncGetSystemsList');
  }
}
</script>

<style lang="scss" scoped>
  #constructor {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .flex {

    &-column {
      display: flex;
      flex-flow: column nowrap;
    }

    &-row {
      display: flex;
      flex-flow: row nowrap;
    }
  }

  .modal-box-header {
    display: flex;
    justify-content: space-between;
  }

  .modal-button {
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
    outline: none;

    &-cancel {
      background-color: lighten(red, 20%);
      border: 1px solid lighten(red, 10%);

      &:hover {
        background-color: lighten(red, 10%);
      }
    }

    &-accept {
      background-color: lighten(green, 40%);
      border: 1px solid lighten(green, 20%);

      &:hover {
        background-color: lighten(green, 20%);
      }
    }
  }

  .modal-grp-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  .inputfile {
    display: none;
  }

</style>

