<template>
    <div id="constructor">
        <main-menu @newproject="initialize()"/>
        <panel-left :width="panel.left" @resize="panelResize({dir: 'left', val: $event})">
            <app-list :list="SEMDs" @select="getSEMDbyID($event)"/>
        </panel-left>
        <div class="flex-column">
            <div class="flex-row">
                <panel-canvas :width="canvasWidth" :height="canvasHeight">
                    <semd-layout/>
                </panel-canvas>
                <panel-right :width="panel.right" :height="canvasHeight" @resize="panelResize({dir: 'right', val: $event})" v-if="init">
                    <app-config/>
                </panel-right>
            </div>
            <panel-footer :height="panel.footer" :width="canvasWidth + panel.right" @resize="panelResize({dir: 'footer', val: $event})" v-if="init">
                <text-editor/>
            </panel-footer>
        </div> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import MainMenu     from '@/components/SEMDMenu.vue';
import PanelLeft    from '@/components/PanelLeft.vue';
import PanelRight   from '@/components/PanelRight.vue';
import PanelFooter  from '@/components/PanelFooter.vue';
import PanelCanvas  from '@/components/PanelCanvas.vue';
import SemdLayout   from '@/components/SEMDLayout.vue';
import TextEditor   from '@/components/SEMDTextEditor.vue';
import AppConfig    from '@/components/SEMDConfig.vue';
import AppList      from '@/components/SEMDList.vue';

@Component({
    components: { MainMenu, PanelLeft, PanelRight, PanelFooter, PanelCanvas, SemdLayout, TextEditor, AppConfig, AppList }, 
    computed: {
        ...mapGetters('SEMD', {
            init: 'getInitStatus',
            SEMDs: 'getSEMDs',
            panel: 'getPanel',
        }),
    },
    methods: { 
        ...mapMutations('SEMD', { 
            newSEMD: 'newSEMD', 
            closeProject: 'closeProject', 
            panelResize: 'panelResize'
        }),
        ...mapActions('SEMD', ['getSEMDs', 'getSEMDbyID']),
    },
})

export default class SEMD extends Vue {
    public panel!: any;
    private windowWidth: number = window.innerWidth;
    private windowHeight: number = window.innerHeight;
    private panelResize!: any;
    private newSEMD!: any;
    private init!: any;
    private getSEMDs!: any;
    private getSEMDbyID!: any;


    private get canvasWidth(): number {
        return this.windowWidth - this.panel.left - this.panel.right;
    }

    private get canvasHeight(): number {
        // console.log(this.panel.footer);
        return this.windowHeight - 30 - this.panel.footer;
    }

    public initialize(e: string) {
        // console.log(this.newSEMD())
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

    public created(): void {
        this.getSEMDs();
    }

    // public console(e: any) {
    //     console.log(e);
    // }

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


