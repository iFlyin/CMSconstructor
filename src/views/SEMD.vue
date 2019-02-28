<template>
    <div id="constructor">
        <main-menu @newproject="initialize()"/>
        <panel-left :width="panel.left" @resize="panelResize({dir: 'left', val: $event})" v-if="init">
            <div class="semd"></div>
        </panel-left>
        <div class="flex-column">
            <div class="flex-row">
                <panel-canvas :width="canvasWidth" :height="canvasHeight">
                    <semd-layout v-if="init"/>
                </panel-canvas>
                <panel-right :width="panel.right" :height="canvasHeight" @resize="panelResize({dir: 'right', val: $event})" v-if="init">
                    <div class="semd"></div>
                </panel-right>
            </div>
            <panel-footer :height="panel.footer" :width="canvasWidth + panel.right" @resize="panelResize({dir: 'footer', val: $event})" v-if="init">
                <div class="semd"></div>
            </panel-footer>
        </div> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters, mapMutations } from 'vuex';
import MainMenu from '@/components/SEMDMenu.vue';
import PanelLeft from '@/components/PanelLeft.vue';
import PanelRight from '@/components/PanelRight.vue';
import PanelFooter from '@/components/PanelFooter.vue';
import PanelCanvas from '@/components/PanelCanvas.vue';
import SemdLayout from '@/components/SEMDLayout.vue';

@Component({
    components: { MainMenu, PanelLeft, PanelRight, PanelFooter, PanelCanvas, SemdLayout }, 
    computed: {...mapGetters({ panel: 'getPanel' }), ...mapGetters('SEMD', {init: 'getInitStatus'})},
    methods: { 
        ...mapMutations({ panelResize: 'panelResize' }), 
        ...mapMutations('SEMD', { newSEMD: 'newSEMD', closeProject: 'closeProject'}),
    },
})

export default class SEMD extends Vue {
    public panel!: any;
    private windowWidth: number = window.innerWidth;
    private windowHeight: number = window.innerHeight;
    private panelResize!: any;
    private newSEMD!: any;
    private init!: any;

    private get canvasWidth(): number {
        return this.windowWidth - this.panel.left - this.panel.right;
    }

    private get canvasHeight(): number {
        console.log(this.panel.footer);
        return this.windowHeight - 30 - this.panel.footer;
    }

    public initialize(e: string) {
        console.log(this.newSEMD())
        const init = () => {
            this.panelResize({dir: 'left', val: 250});
            this.panelResize({dir: 'right', val: 320});
            this.panelResize({dir: 'footer', val: 200});
            this.newSEMD();
        }
    if (!this.init) {
      init();
    } else {
    //   this.clearAll();
      init();
    //   this.clearHistory();
    }
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

    .semd {
        box-sizing: border-box;
        background-color: #b3b3b3;
        height: 100%;
        width: 100%;
        border: 1px solid #fff;
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


