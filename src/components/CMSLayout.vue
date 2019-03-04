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
            @change="changeId($event)"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapMutations, mapGetters } from 'vuex';
import CmsScreen from '@/components/CMSScreen.vue';
import { snapshot } from '@/mixins';

@Component({
    mixins: [ snapshot ],
    components: { CmsScreen },
    props: { left: { type: Number, required: true } },
    computed: {
        ...mapGetters('CMS', {
            zoom: 'getZoom',
            screenList: 'getScreenList',
            cmsList: 'getCMSlist',
            // Объединить в объект
            selected: 'getSelected',
            selectedType: 'getSelectedType',
            loading: 'getLoading',
        }),
        ...mapGetters({panel: 'getPanel'}),
    },
    methods: {
        ...mapMutations('CMS', {
            // где нибудь используется еще?
            add2screenList: 'add2screenList',
            deleteScreen: 'delFromScreenList',
            deleteCMS: 'deleteCMS',   
            // используетя ли еще?
            clearEffect: 'clearCMSeffect',         
            select: 'setSelected',
            setZoom: 'setZoom',
        }),
    },
})

export default class LayoutBL extends Vue {
    // описать интерфейс объекта и придать типу массива
    private screenList!: any[];          // getScreenList
    private add2screenList!: any;       
    private cmsList!: any[];             // getCMSlist
    private addCMS!: any;
    private id!: number;
    private setID: any;
    private left!: number;
    private selected!: number;
    private selectedType!: string;
    private zoom!: number;
    private saveSnapshot!: any;
    private panel!: any;
    // private undo!: any;
    // private redo!: any;
  
    private changeId!: any;
    private deleteScreen!: any;
    private clearEffect!: any;
    private deleteCMS!: any;
    private select!: any;
    private setZoom!: any;

    private del(): void {
        const selected = this.selected;
        const type = this.selectedType;
        let index: any = null;
        const clear = (id: any) => {
        const list = this.cmsList.filter((el: any) => el.props.parent_id == id);
            if (list.length > 0) {
                for (const child of list) {
                    clear(child.props.id);
                    const childIndex = this.cmsList.findIndex((el: any) => el.props.id == child.props.id);
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
                index = this.cmsList.findIndex((el: any) => el.props.id == selected);
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

    private wheel(e: any) { 
        this.setZoom({
            el: this.$el,
            e: e,
            callback: this.setScroll,
        });
    }

    private setScroll(e: any): void {
        const el = this.$el;
        const width = el.clientWidth;
        const height = el.clientHeight;
        const X = e.clientX - this.panel.left;
        const Y = e.clientY - 30;
        const offset = {
            X: X / (width * this.zoom),
            Y: Y / (height * this.zoom),
        };

        this.$nextTick(function() {
            const widthNext = el.clientWidth;
            const heightNext = el.clientHeight;
            const scrollX = width - widthNext;
            const scrollY = height - heightNext;
            const scrollLeft = scrollX * offset.X;
            const scrollTop = scrollY * offset.Y;

            this.$el.scrollLeft +=scrollLeft;
            this.$el.scrollTop +=scrollTop;
        });
    }

    private layoutMove(e: any) {
        const that = this;
        const el: any = that.$el;

        function move(e: MouseEvent): void {
            el.requestPointerLock();
            // that.$nextTick(function(){
                el.scrollLeft -= e.movementX;
                el.scrollTop -= e.movementY;
            // })
        }

        function clean(this: any, e: MouseEvent) {
            // el.exitPointerLock();
            this.removeEventListener('mousemove', move);
            this.removeEventListener('mouseup', clean);
            const doc: any =  document;
            doc.exitPointerLock();
        }

        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', clean);
        // window.addEventListener('mouse', clean);
    }

    private keyUpListner(e: KeyboardEvent): void {if(e.code === 'Delete'){this.del()} }

    private mounted(): void { document.addEventListener('keyup', this.keyUpListner) }
    private beforeDestroy(): void { document.removeEventListener('keyup', this.keyUpListner) }
}
</script>


<style lang="scss" scoped>
   .layout {
        min-width: 100%;
        min-height: 100%;
         display: flex;
        z-index: 1;
        position: relative;
        outline: none;
         overflow: auto;
    }

   .line-container {
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
   }
</style>
