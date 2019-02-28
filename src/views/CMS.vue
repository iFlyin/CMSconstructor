<template>
  <div id="constructor" :style="{ cursor: loading ? 'wait': 'auto' }">
    <main-menu @newproject="prompt()" @initByID="asyncGetCMSbyId({
      id: $event,
      callback: clearHistory,
    })"/>
    <panel-left :width="panel.left" @resize="panelResize({dir: 'left', val: $event})" v-if="init">
      <accordion :list="[
        {
          name: 'СMS-web_look',
          list: components,
          d$d: true,
        },
      ]"/>
    </panel-left>
      <div class="flex-row">
        <panel-canvas :width="canvasWidth" :height="canvasHeight">
          <layout-b-l :left="panel.left"/>
        </panel-canvas>
        <panel-right :width="panel.right" :height="canvasHeight" @resize="panelResize({dir: 'right', val: $event})" v-if="init">
          <cms-form/>
        </panel-right>
      </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters, mapActions, mapMutations} from 'vuex';
import { history, snapshot } from '@/mixins';
import PanelLeft from '@/components/PanelLeft.vue';
import PanelRight from '@/components/PanelRight.vue';
import PanelFooter from '@/components/PanelFooter.vue';
import PanelCanvas from '@/components/PanelCanvas.vue';
import Accordion from '@/components/PanelAccordion.vue';
import LayoutBL from '@/components/CMSLayout.vue';
import cmsForm from '@/components/CMSForm.vue';
import MainMenu from '@/components/CMSMenu.vue';

@Component ({
  components: { MainMenu, PanelLeft, PanelRight, PanelFooter, PanelCanvas, Accordion, LayoutBL, cmsForm },
  mixins: [ history, snapshot ],
  computed: {
    ...mapGetters('CMS', {
      weblook: 'getWebLook', 
      system_id: 'getSystemID',
      init: 'getInitStatus',
      loading: 'getLoading',
    }),
    ...mapGetters({ panel: 'getPanel',  })
  },
  methods: { 
    ...mapActions('CMS', ['asyncGetLook', 'asyncGetEffect', 'asyncGetCMSbyId', 'asyncGetID', 'asyncGetImages']), 
    ...mapMutations('CMS', {
      addFirstScreen: 'initNewProject', 
      clearAll: 'clearAll',
      // panelResize: 'panelResize',
      setSystemId: 'setSystemId',
    }),
    ...mapMutations({ panelResize: 'panelResize' })
  },
})

export default class CMS extends Vue {
  public panel!: any;
  private windowWidth: number = window.innerWidth;
  private windowHeight: number = window.innerHeight;
  private asyncGetLook!: any;
  private asyncGetEffect!: any;
  private asyncGetID!: any;
  private asyncGetCMSbyId!: any;
  private weblook!: any[];
  private screen!: any;
  private block!: any;
  private system_id!: any;
  private addFirstScreen!: any;
  private clearAll!: any;
  private init!: boolean;
  private panelResize!: any;
  private clearHistory!: any;
  private saveSnapshot!: any;
  private setSystemId!: any;

  private get components(): any[] {
    const newArr: any[] = new Array();
    // console.log(this.weblook);
    for (const item of this.weblook) {
      const newItem = {
        params: {
          type: 'CMS',
          width: 180,
          height: 150,
        },
        props: {
          systems_id: this.system_id,
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

  private prompt() {
      const result = prompt('Укажите Systems ID для нового проекта');
      // валидация!!!
      result ?
        this.initialize(result)
        : alert('не верный ID');
   }

  public initialize(e: string) {
    const init = () => {
      this.panelResize({dir: 'left', val: 240});
      this.panelResize({dir: 'right', val: 320});
      this.setSystemId(e);
      this.addFirstScreen();
      this.asyncGetID();
    }
    if (!this.init) {
      init();
    } else {
      this.clearAll();
      init();
      this.clearHistory();
    }
  }

  private mounted(): void {
    const that = this;    
    window.addEventListener('resize', function(){
      that.windowWidth = window.innerWidth;
      that.windowHeight = window.innerHeight;
    })
  }

  private created(): void {
    this.asyncGetLook();
    this.asyncGetEffect();
    // this.asyncGetImages();
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

</style>

