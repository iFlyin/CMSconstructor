<template>
   <div class="svg-wrapper">
      <div 
         class="layout-item"
         :style="style"
         @click.stop.prevent="select({ id: item.props.id, type: 'Screen' })"
      >
         <div class="layout-item-wrapper">
            <screen-resize v-if="isSelected" :zoom="zoom" @resize="resize($event)"/>
            <div class="layout-item-content">
               <div class="layout-item-header" @drop.stop @mousedown.stop="movement($event)" :style="{
                  background: isSelected ? colorGreen : colorGrey
               }">
                  {{(item.props.id > 0) ? `${item.props.id} ${item.props.name}` : `${item.props.name}`}}
               </div>   
               <div 
                  class="layout-item-canvas"
                  @mousedown.stop.prevent
                  @dragover.stop.prevent
                  @drop.stop="drop({
                     event: $event,
                     id: item.props.id,
                  })"
               >  
                  <cms-element 
                     v-for="(component, id) of childsList" 
                     :key="id" :item="component"
                     :data-id="component.props.id"
                  />
               </div>
            </div>  
         </div>
      </div>
      <svg 
         xmlns="http://www.w3.org/2000/svg"
         width="100%"
         height="100%"
         :style="{
            position: 'relative',
            'z-index': 1000,
            overflow: 'visible',
         }"
         class="svg"
      >
         <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon 
                  :points="`0 0, ${10 * zoom} 3.5, 0 7`"
                  :fill="colorGreen"
              />
            </marker>
         </defs>
         <path
            v-for="(line, index) of lines" :key="index"
            :d="line"
            :stroke="colorDark"
            :stroke-width="1.2 / zoom"
            marker-end="url(#arrowhead)"
         />
      </svg>
   </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { snapshot, colors } from '@/mixins';
import CmsElement from './CMSElement.vue';
import intersect from 'path-intersection';
import ScreenResize from './CMSResize.vue';
import { Screen, CMS, Panel, AddCMS, Props, SetSize, Drag } from '@/interfaces';

@Component({
   components: {CmsElement, ScreenResize},
   props: { item: { type: Object, required: true } },
   mixins: [ snapshot, colors ],
})
export default class CMSScreen extends Vue {
   public item!: Screen;
   public colorGrey!: string

   public get zoom(): number { return this.$store.getters[`CMS/getZoom`]; }
   public get selected(): number { return this.$store.getters[`CMS/getSelected`]; }
   public get panel(): Panel { return this.$store.getters[`CMS/getPanel`]; }
   public get addProps(): Props { return this.$store.getters[`CMS/getProp`]; }
   public get id(): number { return this.$store.getters[`CMS/getID`]; }
   public get screenList(): Screen[] { return this.$store.getters[`CMS/getScreenList`]; }
   public get cmsList(): CMS[] { return this.$store.getters[`CMS/getCMSlist`]; }
   public get X(): number { return this.item.params.X; }
   public get Y(): number { return this.item.params.Y; }
   public get width(): number { return this.item.params.width; }
   public get height(): number { return this.item.params.height; }
   public get centerX(): number { return this.width/2; }
   public get centerY(): number { return this.height/2; }
   public get path(): string { return this.rectConstructor(this.X, this.Y, this.width, this.height); }
   public get isSelected(): boolean { return this.item.props.id === this.selected; }

   public get style(): any {
      const height: number = this.item.params.height;
      let minHeight!: number;
      this.$nextTick(function(){
         minHeight = this.minHeight;
      })

      return {
            'z-index': (this.childSelected)
                ? '1000000' : this.isSelected 
                    ? '1111' : '',
            left: this.item.params.X + 'px',
            top: this.item.params.Y + 'px',
            width: this.item.params.width + 'px',
            height: minHeight > height ? `${minHeight}px`: `${height}px`,
            'border-width': 2 / this.zoom + 'px',
            'border-color': this.colorGrey,
            'border-style': 'solid',
      }
      // const minHeight = this.minHeight;
      // return {
      //    'z-index': (this.childSelected)
      //           ? '1000000' : this.isSelected 
      //               ? '1111' : '',
      //    left: this.item.params.X + 'px',
      //    top: this.item.params.Y + 'px',
      //    width: this.item.params.width + 'px',
      //    height: `${height}px`,
      //    'border-width': 2 / this.zoom + 'px',
      //    'border-color': this.colorGrey,
      //    'border-style': 'solid',
      // }
   }
   
   public get childsList(): CMS[] {
      const id: number = this.item.props.id;
      const fixId: number | null = (id === - 1) ? null : id;
      return this.cmsList.filter(el => el.props.parent_id == fixId);
   }

   public get minWidth(): number {
      let minWidth: number = 300;
      if(this.childsList.length > 0) {
         for (const child of this.childsList) {
            const el: HTMLElement | null = this.$el.querySelector(`div[data-id="${child.props.id}"]`);
            if (el) { const childMaxX: number = child.params.X + child.params.width + (6 / this.zoom); 
               if (childMaxX > minWidth) { minWidth = childMaxX; }
            }
         }
      }
      return minWidth;
   }

   public get minHeight(): number {
      let minHeight: number = 200;
      if (this.childsList.length > 0) {
         for (const child of this.childsList) {
            const el: HTMLElement | null = this.$el.querySelector(`div[data-id="${child.props.id}"]`);
            if (el) { 
               // const header: HTMLElement | null = this.$el.querySelector(`.layout-item-header`);
               // const height: number = header ? header.offsetHeight : 0;
               const childMaxY = child.params.Y + el.offsetHeight + 60 + (8 / this.zoom);
               if (childMaxY > minHeight) { minHeight = childMaxY; }
            }
         }
      }
      return minHeight;
   }

   public get childSelected(): boolean {
      let result: boolean = false;
      for (const child of this.childsList) {if (child.props.id == this.selected) {return result = true;}}
      return result;
   }

   public get lines(): string[] {
      const childWithEffect: CMS[] = this.childsList.filter(el => {
         for (const screen of this.screenList) {
            if (el.props.id == screen.props.id) { return true }
         }
      });
      const lines: string[] = new Array();
      for (const obj of childWithEffect) {
         const startX: number = obj.params.X + (obj.params.width / 2) + this.X;
         const startY: number = obj.params.Y + (obj.params.height / 2) + this.Y + 40;
         const targetInd: number = this.screenList.findIndex(el => el.props.id == obj.props.id);
         const targetObj: Screen = this.screenList[targetInd];
         const targetX: number = targetObj.params.X - 10;
         const targetY: number = targetObj.params.Y - 10;
         const targetW: number = targetObj.params.width + 20;
         const targetH: number = targetObj.params.height + 20;

         const targetPath: string = this.rectConstructor(targetX, targetY, targetW, targetH);
         const path: string = `M${startX},${startY} L${targetX + (targetW/2)},${targetY + (targetH/2)}`;

         if(intersect(path, targetPath).length) {
            const realEndX = intersect(path, targetPath)[0].x;
            const realEndY = intersect(path, targetPath)[0].y;
            const realPath: string = this.lineConstructor(startX, startY, realEndX, realEndY);
            lines.push(realPath);
         }
      }
      return lines;
   }
   
   public saveSnapshot!: () => void;
   public select(payload: any): void { this.$store.commit(`CMS/setSelected`, payload); }
   public setID(payload: number): void { this.$store.commit(`CMS/setID`, payload); }
   public addCMS(payload: AddCMS): void { this.$store.commit(`CMS/add2cmsList`, payload); }

   public resize(payload: SetSize): void {
      const that = this;
      const layout: Element = this.$parent.$el;
      const e: MouseEvent = payload.event;
      const direction: string[] = payload.direction;
      const id: number = this.item.props.id;
      const index: number = this.screenList.findIndex(item => item.props.id == id);
      const scrollX: number = layout.scrollLeft;
      const scrollY: number = layout.scrollTop;
      const left: number = this.panel.left ? this.panel.left : 0;

      function onResize(e: MouseEvent) {
         const path = that.screenList[index].params;
         const newX: number = (e.clientX - left) / that.zoom + scrollX;
         const newY: number = (e.clientY - 30) / that.zoom + scrollY;
         const minWidth: number = that.minWidth;
         const minHeight: number = that.minHeight;
         const moveX: number = e.movementX / that.zoom;
         const moveY: number = e.movementY / that.zoom;

         if (direction.indexOf('left') !== -1) {
            if (newX > 0) {
               if (path.width - moveX > minWidth) {
                  path.width -= moveX; 
                  path.X = newX;
               } else { path.width =  minWidth; }
            } else { path.X = 0; }
         } else if (direction.indexOf('right') !== -1) { 
            if (path.width + moveX > minWidth) { path.width += moveX; } else { path.width =  minWidth; }
         }
         
         if (direction.indexOf('top') !== -1) {
            if (newY > 0) {
               if (path.height - moveY > minHeight) { 
                  path.height -= moveY; 
                  path.Y = newY; 
               } else { path.height = minHeight; }
            } else  { path.Y = 0; }
         } else if (direction.indexOf('bottom') !== -1) { 
            if (path.height + moveY > minHeight) { path.height += moveY; } else { path.height = minHeight; }
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

   public movement(e: MouseEvent): void {
      const that = this;
      const layout: Element = this.$parent.$el;
      const index: number = this.screenList.findIndex(el => el.props.id === this.item.props.id);
      const scrollX: number = layout.scrollLeft;
      const scrollY: number = layout.scrollTop;
      const offsetX: number = e.offsetX;
      const offsetY: number = e.offsetY;
      const left: number = this.panel.left ? this.panel.left : 0;
      
      function move(e: MouseEvent): void {
         let x: number = (e.clientX - offsetX - left) / that.zoom  + scrollX;
         if (x < 0) { x = 0; }
         let y: number = (e.clientY - 30 - offsetY) / that.zoom + scrollY;
         if (y < 0) { y = 0; }
         // заменить... с хард кода
         that.screenList[index].params.X = x;
         that.screenList[index].params.Y = y;
      }

      function clean(this: any, e: MouseEvent): void {
         this.removeEventListener('mousemove', move);
         this.removeEventListener('mouseup', clean);
         that.saveSnapshot();
      }

      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', clean);
   }

   public drop(this: any, payload: Drag): void {
      const e: any = payload.event;
      const id: number = payload.id;
      let item;
      try {
         item = JSON.parse(e.dataTransfer.getData('CMS')); 
      } catch (err) {
         console.log(err);
         return;
      }
      const centerX: number = item.params.width/2;
      const centerY: number = item.params.height/2;
      let posX: number = e.offsetX / this.zoom - centerX;
      const rightX: number = posX + item.params.width;
      if (posX < 2) { posX = 2 }
      if (rightX > this.width) { posX = this.width - item.params.width - (2 / this.zoom); }
      let posY: number = e.offsetY / this.zoom - centerY;
      const bottomY: number = posY + item.params.height;
      if (posY < 2) { posY = 2 }
      // 70 костыль, потому как точную высоту не узнать!
      if (bottomY > (this.height - 40)) { posY = (this.height - 70) - item.params.height - (2 / this.zoom); }
      item.params.X = posX;
      item.params.Y = posY;
      this.setID(this.id + 1);
      item.props.id = `${this.id}gen`;
      item.props.parent_id = (id === -1) ? null : id;
      for (const key in this.addProps) { item.props[key] = this.addProps[key];}
      this.addCMS({
         item: item,
         callback: this.saveSnapshot,
      });
      const focusEl: HTMLElement = this.$el;
      focusEl.focus();
   }

   public rectConstructor(x: number, y: number, w: number, h: number): string {
      return `M${x},${y}L${x + w},${y}L${x + w},${y + h}L${x},${y + h}Z`;
   }

   public lineConstructor(x1: number, y1: number, x2: number, y2: number): string {
      return `M${x1},${y1}L${x2},${y2}`
   }

   public mounted(): void {
      if(this.minHeight > this.item.params.height) {
         this.item.params.height = this.minHeight;
      }
      if(this.minWidth > this.item.params.width) {
         this.item.params.width = this.minWidth
      }
   }

   public beforeUpdate(): void {
      if(this.minHeight > this.item.params.height) {
         this.item.params.height = this.minHeight;
      }
      if(this.minWidth > this.item.params.width) {
         this.item.params.width = this.minWidth
      }
   }
}
</script>

<style lang="scss" scoped>
   .layout-item {
      box-sizing: border-box;
      position: absolute;
      z-index: 1001;
      border-style: solid;
      border-color: $colorGrey;
      // overflow: hidden;

      &-wrapper {
         position: relative;
         width: 100%;
         height: 100%;
      }
      
      &-content {
         position: absolute;
         flex-flow: column nowrap;
         display: flex;
         top: 0;
         left: 0;
         height: 100%;
         width: 100%;
      }

      &-header {
         box-sizing: border-box;
         display: flex;
         justify-content: center;
         align-items: center;
         width: 100%;
         min-height: 60px;
         padding: 10px;      
         user-select: none;
         cursor: move;
         background-color: $colorGrey;
         color: #fff;
      }

      &-canvas {
         position: relative;
         flex: 1 1 auto;
         overflow: auto;
      }
   }

   .svg-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 99%;
   }

</style>
