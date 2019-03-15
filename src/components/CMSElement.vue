<template>
    <div 
        :class="{'layout-cms': true, 'layout-cms-active': isSelected}" 
        :style="layoutCMSstyle"
        @click.stop.prevent="select({ id: item.props.id, type: 'CMS' })"
    >
        <div 
            class="layout-cms-header" 
            @mousedown.stop="movement($event, item.props.id)" 
            v-html="lookName(item.props.look)"
        />
        <div class="layout-cms-content">
            <div class="layout-cms-row">
                <div class="layout-cms-id" :style="{'border-width' : 1 / zoom + 'px'}" v-html="item.props.id"/>
                <div class="layout-cms-name" v-html="item.props.name"/>
                <div class="layout-cms-gn" :style="{'border-width' : 1 / zoom + 'px'}">
                    <gn-selector :value="groupNumber" @set="setGroupNumber($event)"/>  
                </div>
                <div class="element-resize" @mousedown.stop="resize($event)"/>
            </div>
            <div class="layout-cms-row">
                <el-select 
                    :options="webEffect"
                    :selected="item.props.effect"
                    :label="'Эффект'"
                    :name="'name'"
                    @select="setEffect({
                        v: $event,
                        id: item.props.id,
                        callback: saveSnapshot,
                    })"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters, mapMutations } from 'vuex';
import { snapshot} from '@/mixins';
import ElSelect from '@/components/CMSSelect.vue';
import GnSelector from '@/components/CMSGnSelector.vue';
import { 
    CMS,
    CmsStyle,
    Panel,
    Screen,
    WebEffect,
    SetValue,
    SetCMSwidth,
    SetCMSeffect,
    Selected,
    SetPosition,
} from '@/interfaces';

@Component({
    components: { ElSelect, GnSelector },
    props: { item: { type: Object, required: true, } },
    mixins: [ snapshot ],
    computed: {
        ...mapGetters('CMS', {
            cmsList: 'getCMSlist',
            screenList: 'getScreenList',
            zoom: 'getZoom',
            selected: 'getSelected',
            lookName: 'getLookName',
            webEffect: 'getWebEffect',
            panel: 'getPanel'
        }),
    },
    methods: {
        ...mapMutations('CMS', {
            setEffect: 'setCMSeffect',
            select: 'setSelected',
            setXY: 'setXY',
            setValue: 'setValue',
            setPosition: 'setPosition',
            setCMSwidth: 'setCMSwidth',
        }),
    },
})
export default class CMSElement extends Vue {
    public item!: CMS;
    public zoom!: number;
    public selected!: number;
    public panel!: Panel;
    public cmsList!: CMS[];
    public screenList!: Screen[];
    public webEffect!: WebEffect[];
    public lookName!: string;

    public saveSnapshot!: () => void;
    public setValue!: (payload: SetValue) => void;
    public setPosition!: (payload: SetPosition) => void;
    public setCMSwidth!: (payload: SetCMSwidth) => void;
    public setEffect!: (payload: SetCMSeffect) => void;
    public select!: (payload: Selected) => void;

    public get layoutCMSstyle(): CmsStyle {
        return {
            'z-index': this.item.props.id === this.selected
                ? '1000000'
                : '',
            'top': this.item.params.Y + 'px',
            'left': this.item.params.X + 'px',
            'width': this.item.params.width + 'px',
            'border-width': 2 / this.zoom + 'px',
        }
    }

    public get isSelected(): boolean { return this.item.props.id === this.selected; }

    public get groupNumber(): number | null { return this.item.props.group_number; }
    
    public setGroupNumber(v: number) {
        if (v >= 1) {
            this.setValue({
                v: v,
                key: 'group_number',
                id: this.item.props.id,
                callback: this.saveSnapshot,
            });
        }
    }

    // добавить тип для элемента HTML или Element 
    private movement(e: MouseEvent, id: number): void {
        const that = this;
        const layout: Element = this.$parent.$parent.$el;
        const parent_id: number = this.item.props.parent_id === null
            ? -1
            : this.item.props.parent_id;
        const index: number = this.cmsList.findIndex((item: CMS) => item.props.id === id);
        const parentIndex: number = this.screenList.findIndex((el: Screen) => el.props.id === parent_id);
        const parent: Screen = this.screenList[parentIndex];
        const parentOffsetX: number = parent.params.X;
        const parentOffsetY: number = parent.params.Y + 60;
        const scrollX: number = layout.scrollLeft;
        const scrollY: number = layout.scrollTop;
        const offsetX: number = e.offsetX;
        const offsetY: number = e.offsetY;
        const left: number = this.panel.left ? this.panel.left : 0;

        // добавить тип для элемента HTML или Element 

        const el: any = this.$el;
        const cmsHeight: number = el.offsetHeight;
        
        const maxX: number = parent.params.width - this.item.params.width - (5 / this.zoom);
        const maxY: number = (parent.params.height - 60) - cmsHeight - (5 / this.zoom);
      
        function move(e: MouseEvent): void {
            let x: number = (e.clientX - offsetX - left) / that.zoom  + scrollX - parentOffsetX;
            if (x < 2) { x = 2; }
            if (x > maxX - 2 && maxX - 2 > 2) { x = maxX - 2} else if (x > maxX - 2 && maxX - 2 <= 2) { x = 2 }
            let y: number = (e.clientY - 30 - offsetY) / that.zoom + scrollY - parentOffsetY;
            if (y < 2) { y = 2; }
            if (y > maxY - 2 && maxY - 2 > 2) { y = maxY - 2} else if (y > maxY - 2 && maxY - 2 <= 2) { y = 2 }

            that.setPosition({
                id: that.item.props.id,
                x,
                y,
                callback: that.saveSnapshot,
            });
        }

        function clean(this: any, e: MouseEvent): void {
            this.removeEventListener('mousemove', move);
            this.removeEventListener('mouseup', clean);
            that.saveSnapshot();
        }

        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', clean);
    }

    private resize(e: MouseEvent) {
        const that: any = this;
        const layout: Element = this.$parent.$el;
        const id: number = this.item.props.id;
        const index: number = this.cmsList.findIndex((item: CMS) => item.props.id == id);
        const scrollX: number = layout.scrollLeft;
        const scrollY: number = layout.scrollTop;
        const parent: any = this.$parent;
        const thatX: number = this.item.params.X;

        function onResize(e: MouseEvent) {
            const path = that.cmsList[index].params;
            const move: number = that.item.params.width + e.movementX / that.zoom;
            const maxX: number = parent.width - thatX - (4 / that.zoom) - 2;
            if (move <= 180) {
                that.setCMSwidth({
                    val: 180,
                    id: that.item.props.id,
                })
            } else if ( move > maxX) {
                that.setCMSwidth({
                    val: maxX,
                    id: that.item.props.id,
                })
            } else {
                that.setCMSwidth({
                    val: move,
                    id: that.item.props.id,
                })
            }
        }   

        function clean(this: any, e: MouseEvent) {
            this.removeEventListener('mousemove', onResize);
            this.removeEventListener('mouseup', clean);
            that.saveSnapshot();
        }

        window.addEventListener('mousemove', onResize);
        window.addEventListener('mouseup', clean);
    }
}
</script>

<style lang="scss" scoped>

.layout-cms {
    box-sizing: border-box;
    position: absolute;
    z-index: 100;
    background-color: $colorDark;
    border-style: solid;
    border-color: transparent;
    border-radius: 10px;
    color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);

    &-active {
        border-color: $colorGreen !important;
        background-color: $colorGreen;

        & .layout-cms-id {
            border-color: $colorGreen;
        }
        
        & .layout-cms-gn {
            border-color: $colorGreen;
        }
    }

    &-header {
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        justify-content: center;
        padding: 10px;
        cursor: move;
        user-select: none;
    }
      
    &-content {
        display: flex;
        flex-flow: column nowrap;
        user-select: none;
    }

    &-row {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        // min-height: 40px;
         
        &:first-child{
            background-color: #fff;
            color: $colorDark;
        }
    }

    &-gn {
        display: flex;
        justify-content: center;
        align-items: center;
        // padding: 5px;
        border-left: 1px solid $colorDark;
    }

    &-id {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        border-right: 1px solid $colorDark;
    }

    &-name {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;  
        flex: 1 1 auto;
        overflow: hidden;
    }
}

.element-resize {
    width: 6px;
    height: 100%;
    z-index: 19999;
    position: absolute;
    top: 0;
    right: -3px;
    cursor: ew-resize;
}
</style>
