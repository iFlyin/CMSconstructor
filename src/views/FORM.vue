<template>
    <div id="constructor">
        <main-menu :base="'FORM'">
            <li class="menu-list-item">
               <a class="menu-list-item-link" v-html="config.new" @click="initialize()"/>
            <li class="menu-list-item">
               <a class="menu-list-item-link" v-html="config.save" @click.stop/>
            </li>
            <li class="menu-list-item">
               <a class="menu-list-item-link" v-html="config.saveFile" @click.stop/>
            </li>
            <li class="menu-list-item">
               <a class="menu-list-item-link" v-html="config.loadFile" @click.stop/>
            </li>
        </main-menu>
        <panel-left :width="panel.left" :height="canvasHeight" @resize="panelResize({dir: 'left', val: $event})" v-if="init">
            <panel-accordion>
            </panel-accordion>
        </panel-left>
        <div class="flex-column">
            <div class="flex-row">
                <panel-canvas :width="canvasWidth" :height="canvasHeight">
                    {{panel}}
                </panel-canvas>
                <panel-right :width="panel.right" :height="canvasHeight" @resize="panelResize({dir: 'right', val: $event})" v-if="init">
                    <div class="right"></div>
                </panel-right>
            </div>
            <panel-footer :height="panel.footer" :width="canvasWidth + panel.right" @resize="panelResize({dir: 'footer', val: $event})" v-if="init">
                <div class="footer"></div>
            </panel-footer>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { configFORM } from '@/cfg';
import { Panel, PanelResize } from '@/interfaces';
import MainMenu from '@/components/PanelTop.vue';
import PanelLeft from '@/components/PanelLeft.vue';
import PanelRight from '@/components/PanelRight.vue';
import PanelFooter from '@/components/PanelFooter.vue';
import PanelCanvas from '@/components/PanelCanvas.vue';
import PanelAccordion from '@/components/FORMAccordion.vue';

@Component({
    components: { MainMenu, PanelLeft, PanelRight, PanelFooter, PanelCanvas, PanelAccordion },
})

export default class FORM extends Vue {
    public config = configFORM;
    private windowWidth: number = window.innerWidth;
    private windowHeight: number = window.innerHeight;
    public get init(): boolean { return this.$store.getters['FORM/getInitStatus']; }
    public get panel(): Panel { return this.$store.getters['FORM/getPanel']; }

    private get canvasWidth(): number {
        const left = this.panel.left ? this.panel.left : 0;
        const right = this.panel.right ? this.panel.right : 0;
        return this.windowWidth - left - right;
    }

    private get canvasHeight(): number {
        const footer = this.panel.footer ? this.panel.footer : 0;
        return this.windowHeight - 30 - footer;
    }

    public panelResize(payload: PanelResize): void { this.$store.commit('FORM/panelResize', payload); }

    public initialize() { 
        this.$store.commit('FORM/initialize');
        this.panelResize({dir: 'left', val: 250});
        this.panelResize({dir: 'right', val: 320});
        this.panelResize({dir: 'footer', val: 200});
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

    .left {
        width: 100%;
        height: 100%;
        background-color: green;
    }

    .footer {
        width: 100%;
        height: 100%;
        background-color: blue;
    }

    .right {
        width: 100%;
        height: 100%;
        background-color: red;
    }
</style>

