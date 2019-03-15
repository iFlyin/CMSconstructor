<template>
    <div
        class="layout"
        :style="{ zoom: zoom }"
        @drop.stop="drop($event)"
        @click.prevent="select({
            id: 0,
            type: 'none',
        })"
        @mousedown="layoutMove($event)"
        @mousewheel.stop.prevent="wheel($event)"
        draggable="false"
    >
        <cms-screen 
            v-for="(screen, index) of screenList"
            :key="index"
            :item="screen"
            @select="select($event)"
            @movement="movement($event)"
            @resize="resize($event)"
            @drop="drop($event)"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CmsScreen from '@/components/CMSScreen.vue';
import { snapshot } from '@/mixins';
import { Screen, CMS, Panel, Selected, SetZoom } from '@/interfaces';

@Component({
    mixins: [ snapshot ],
    components: { CmsScreen },
    props: { left: { type: Number, required: true } },
})

export default class CMSLayout extends Vue {
    public left!: number;

    public get zoom(): number { return this.$store.getters[`CMS/getZoom`]; }
    public get panel(): Panel { return this.$store.getters[`CMS/getPanel`]; }
    public get selected(): number { return this.$store.getters[`CMS/getSelected`]; }
    public get selectedType(): string { return this.$store.getters[`CMS/getSelectedType`]; }
    public get screenList(): Screen[] { return this.$store.getters[`CMS/getScreenList`]; }
    public get cmsList(): CMS[] { return this.$store.getters[`CMS/getCMSlist`]; }

    public saveSnapshot!:() => void;
    public add2screenList(payload: Screen): void { this.$store.commit('CMS/add2screenList', payload); }
    public deleteScreen(payload: number): void { this.$store.commit(`CMS/delFromScreenList`, payload); }
    public clearEffect(payload: number) : void { this.$store.commit(`CMS/clearCMSeffect`, payload); }
    public deleteCMS(payload: number): void { this.$store.commit(`CMS/deleteCMS`, payload); }
    public select(payload: Selected): void { this.$store.commit(`CMS/setSelected`, payload) }
    public setZoom(payload: SetZoom) :void { this.$store.commit(`CMS/setZoom`, payload); }

    public del(): void {
        const selected = this.selected;
        const type = this.selectedType;
        let index: number | null = null;
        const clear = (id: number) => {
        const list = this.cmsList.filter((el: CMS) => el.props.parent_id == id);
            if (list.length > 0) {
                for (const child of list) {
                    clear(child.props.id);
                    const childIndex = this.cmsList.findIndex((el: CMS) => el.props.id == child.props.id);
                    this.deleteCMS(childIndex);
                }
            }
            const newIndex = this.screenList.findIndex(item => item.props.id == id);
            if (newIndex !== -1) {
                this.deleteScreen(newIndex);
            }
        }
        if (selected != 0 && selected !=-1) {
            if (type === 'Screen') {
                this.clearEffect(selected);
                clear(selected);
            } else if (type === 'CMS') {
                index = this.cmsList.findIndex((el: CMS) => el.props.id == selected);
                clear(selected);
                this.deleteCMS(index);
            } else {
                console.log('ошибка');
            }
        }
        this.saveSnapshot();
        this.select({
            id: 0,
            type: 'none',
        });
    }

    public wheel(e: WheelEvent) { 
        this.setZoom({
            el: this.$el,
            e: e,
            callback: this.setScroll,
        });
    }

    public setScroll(e: WheelEvent): void {
        const el: Element = this.$el;
        const width: number = el.clientWidth;
        const height: number = el.clientHeight;
        const left: number = this.panel.left ? this.panel.left : 0;
        const X: number = e.clientX - left;
        const Y: number = e.clientY - 30;
        const offset = {
            X: X / (width * this.zoom),
            Y: Y / (height * this.zoom),
        };

        this.$nextTick(function() {
            const widthNext: number = el.clientWidth;
            const heightNext: number = el.clientHeight;
            const scrollX: number = width - widthNext;
            const scrollY: number = height - heightNext;
            const scrollLeft: number = scrollX * offset.X;
            const scrollTop: number = scrollY * offset.Y;

            this.$el.scrollLeft +=scrollLeft;
            this.$el.scrollTop +=scrollTop;
        });
    }

    public layoutMove(e: MouseEvent) {
        const that = this;
        const el: any = that.$el;

        function move(e: MouseEvent): void {
            el.requestPointerLock();
            el.scrollLeft -= e.movementX;
            el.scrollTop -= e.movementY;
        }

        function clean(this: any, e: MouseEvent) {
            this.removeEventListener('mousemove', move);
            this.removeEventListener('mouseup', clean);
            const doc: any =  document;
            doc.exitPointerLock();
        }

        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', clean);
    }

    public keyUpListner(e: KeyboardEvent): void { if(e.code === 'Delete') { this.del(); } }

    public mounted(): void { document.addEventListener('keyup', this.keyUpListner) }
    public beforeDestroy(): void { document.removeEventListener('keyup', this.keyUpListner) }
}
</script>


<style lang="scss" scoped>
    .layout {
        position: relative;
        display: flex;
        min-width: 100%;
        min-height: 100%;
        z-index: 1;
        outline: none;
        overflow: auto;
    }

   .line-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
