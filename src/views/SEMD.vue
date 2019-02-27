<template>
    <div id="constructor">
        <main-menu @newproject="initialize()" @initByID="asyncGetCMSbyId({
            id: $event,
            callback: clearHistory,
        })"/>
        <panel-left :width="panel.left" @resize="panelResize({dir: 'left', val: $event})">
            <div class="semdL"></div>
        </panel-left>
        <div class="flex-column">
            <div class="flex-row">
                <panel-canvas :width="canvasWidth" :height="canvasHeight">
                    <!-- <div class="semdL"></div> -->
                </panel-canvas>
                <panel-right :width="panel.right" :height="canvasHeight" @resize="panelResize({dir: 'right', val: $event})">
                    <div class="semdR"></div>
                </panel-right>
            </div>
        </div>  
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters, mapMutations } from 'vuex';
import MainMenu from '@/components/PanelMenu.vue';
import PanelLeft from '@/components/PanelLeft.vue';
import PanelRight from '@/components/PanelRight.vue';
import PanelFooter from '@/components/PanelFooter.vue';
import PanelCanvas from '@/components/PanelCanvas.vue';


@Component({
    components: { MainMenu, PanelLeft, PanelRight, PanelFooter, PanelCanvas }, 
    computed: {...mapGetters({ panel: 'getPanel' })},
    methods: {...mapMutations({ panelResize: 'panelResize' })},
})

export default class SEMD extends Vue {
    public panel!: any;
    private windowWidth: number = window.innerWidth;
    private windowHeight: number = window.innerHeight;
    private panelResize!: any;

    private get canvasWidth(): number {
        return this.windowWidth - this.panel.left - this.panel.right;
    }

    private get canvasHeight(): number {
        return this.windowHeight - 30 //- this.panel.footer;
    }

    public initialize(e: string) {
    const init = () => {
      this.panelResize({dir: 'left', val: 250});
      this.panelResize({dir: 'right', val: 320});
    }
    // if (!this.init) {
    //   init();
    // } else {
    //   this.clearAll();
    //   init();
    //   this.clearHistory();
    // }
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

    .semdL {
        background-color: red;
        height: 100%;
        width: 100%;
    }
    .semdR {
        background-color: blue;
        height: 100%;
        width: 100%;
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


