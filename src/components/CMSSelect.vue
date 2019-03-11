<template>
   <div class="select">
      <div class="list-wrapper" v-if="show" @click.stop="show=false" @wheel="(show = !show)"></div>
      <label class="select-label" @click="(show = !show), getPos()">
         {{ selectedEffect }}
      </label>
      <template v-if="show">
         <div 
            class="option-list"
            @mouseover="focus()"
            @mousewheel.stop
            tabindex="0"
            :style="{
               top: this.top + 'px',
               left: this.left + 'px',
            }"
         >
            <div class="option-item" value="" @click="select('')">Нет</div>
            <div 
               class="option-item"
               v-for="(option, index) of options"
               :key="index"
               @click="select(option.id)"
               :class="{'active-item': selected === option.id}"
            >
               {{(option[name] &lt; 0) ? -(option[name]) : option.name}}
               <!-- {{option}} -->
            </div>
         </div>
      </template>
   </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

interface options {
   [option: string]: option;
}

interface option {
   id: number;
   name: string;
}

@Component({
   props: {
      options: {
         type: Array,
         default: [],
      },
      selected: { required: true },
      label: {
         type: String,
         default: ''
      },
      name: {
         type: [String, Number],
         required: true,
      }
   }, 
   computed: {...mapGetters('CMS', {zoom: 'getZoom'})},
})
export default class ElSelect extends Vue{
   private show: boolean = false;
   private selected!: number;
   private options!: options;
   private top: number = 0;
   private left: number = 0;
   private zoom!: number;

   private select(v: number): void {
      this.show = false;
      this.$emit('select', v);
   }

   private focus(): void {
      const el: any = this.$el;
      el.focus();
   }

   private getPos(): void {
      const el: any = this.$parent.$el;
      const parent: any = this.$parent.$parent.$el.firstChild;
      const canvas: any = this.$parent.$parent.$parent;
      const scrollLeft: any = canvas.$el.scrollLeft;
      const scrollTop: any = canvas.$el.scrollTop;
      this.top = el.offsetTop + parent.offsetTop + el.offsetHeight + 44 + (30 / this.zoom) - scrollTop;
      this.left = el.offsetLeft + parent.offsetLeft + 4 +(canvas.left / this.zoom) - scrollLeft;
   }

   private get selectedEffect(this: any): string {
      const index: number = this.options.findIndex((el: option) => el.id === this.selected)
      const effectName = index !== -1
         ? this.options[index] 
         : '';
      return effectName.name;
   }
}
</script>


<style lang="scss" scoped>
   .select {
      width: 100%;
      position: relative;
      display: flex;

      &-label {
         width: 100%;
         min-height: 30px;
         display: flex;
         justify-content: center;
         align-items: center;
         cursor: pointer;
         padding: 5px 10px;
         user-select: none;
         box-sizing: border-box;
      }

      &-button {
         user-select: none;
         position: relative;
         display: flex;
         justify-content: center;
         align-items: center;
         height: 100%;
         box-sizing: border-box;
         width: 40px;
      }

      &-icon {
         position: absolute;
         top: 0;
         right: 0;
         padding: 0 5px;
      }
   }

   .option-list {
      // margin-top: 160px;
      user-select: none;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100000000;
      width: auto;
      min-width: 156px;
      max-height: 200px;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: snow;
      outline: 2px solid $colorGreen;
      color: $colorDark;
   }

   .option-item {
      user-select: none;
      padding: 5px;
      text-align: left;

      &:hover {
         background-color: $colorGreen;
         color: #fff;
      }
   }

   .active-item {
      background-color: $colorDark;
      color: #fff;
   }

   .list-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
   }
</style>
