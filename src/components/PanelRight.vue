<template>
   <div 
      id="panel-right"
      :style="{ 
         width: width + 'px',
         height: height + 'px',
      }"
   >
      <div 
         class="ew-resize"
         :style="{ right: (width - 5) + 'px' }"
         @mousedown.prevent="resize()"
      />
      <slot></slot>
   </div>
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import cmsForm from './CMSForm.vue';

@Component({
   components: { cmsForm },
   props: {
      width: {
         type: Number,
         required: true,
      },
      height: {
         type: Number,
         required: true,
      }
   },
})
export default class RightAsidePanel extends Vue {
   public width!: number;
   public height!: number;

   public resize(this: any): void {
      const that: any = this;
      const maxWidth: number = this.$el.parentNode.clientWidth - 4;

      function move(this: any, e: MouseEvent): void {
         const innerWidth = this.innerWidth;
         const X: number = this.innerWidth - e.clientX;
         let emitWidth;
         if (X < 1) {
            emitWidth = 1;
            that.$emit('resize', emitWidth)
         } else if (X > maxWidth) {
            emitWidth = maxWidth;
            that.$emit('resize', emitWidth)
         } else {
            emitWidth = X;
            that.$emit('resize', emitWidth)
         }
      }

      function clear(e: MouseEvent) {
         window.removeEventListener('mousemove', move);
         window.removeEventListener('mouseup', clear);
      }

      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', clear);
   }
}
</script>


<style lang="scss" scoped>
   #panel-right {
      position: relative;
      background-color: #fff;
      overflow: auto;
      box-sizing: border-box;
   }

   .ew-resize {
      position: absolute;
      width: 10px;
      height: 100%;
      cursor: ew-resize;
   }
</style>
