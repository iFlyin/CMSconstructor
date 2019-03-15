<template>
   <div class="accordion">
      <div 
         class="accordion-item" 
         :class="(activePanel===index) ? 'accordion-active' : ''"
         v-for="(panel, index) of list" :key="index"
      >
         <div class="accordion-header" @click="activePanel=index">
            {{panel.name}}
         </div>
         <div class="accordion-content">
            <div 
               class="accordion-content-item" 
               v-for="(item, index) of panel.list" 
               :key="index"
               :draggable="panel.d$d"
               @dragstart="dragStart($event, item, item.params.type)"
            >
            {{weblookName(item.props.look)}}
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
   components: {},
   props: {
      list: {
         type: Array,
         required: true,
      }
   },
})
export default class Accordion extends Vue {
   public activePanel: number = 0;
   public get weblookName(): string { return this.$store.getters[`getLookName`]; };
   public dragStart(e: any, item: any, type: string) {
      e.dataTransfer.setData(type, JSON.stringify(item));
   }
}
</script>

<style lang="scss" scoped>
   .accordion {
      display: flex;
      flex-flow: column nowrap;
      height: 100%;
      width: 100%;
      overflow: hidden;
      background-color: #fff;

      &-item {
         display: flex;
         flex-flow: column nowrap;
      }

      &-active {
         flex: 1 1 auto;

         & .accordion-content {
            display: block;
            flex: 1 1 auto;
            padding: 5px;
            overflow: auto;

            &-item {
               box-sizing: border-box;
               padding: 10px;
               border: 1px dashed $colorDark;
               margin-left: 10px;
               margin-right: 5px;
               margin-top: 7px;
               user-select: none;
               background-color: $colorDark;
               color: white;
               opacity: 0.95;
               border: 1px solid grey;
            }
         }
      }

      &-header {
         height: 44px;
         background-color: $colorDark;
         color: #fff;
         border-bottom: 1px solid grey;
         box-sizing: border-box;
         display: flex;
         justify-content: flex-start;
         align-items: center;
         padding: 20px;
         font-size: 15px;
         font-weight: bold;
         user-select: none;
      }

      &-content {
         display: none;
         box-sizing: border-box;
      }
   }
</style>
