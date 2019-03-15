<template>
   <div class="cms-form-wrapper">
      <div class="cms-form-header">Параметры</div>
      <form class="cms-form">
         <app-input 
            v-for="(item, key, index) of params" :key="index"
            :label="key"
            :component="item.type"
            :cms="CMS"
            @change="change()"
         />
      </form>
   </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppInput from '@/components/inputs/Label.vue';
import { CMS, PropType } from '@/interfaces';
@Component({ components: { AppInput } })

export default class CMSForm extends Vue {
   private get params(): PropType { return this.$store.getters[`CMS/getPropList`]; };
   private get selected(): number { return this.$store.getters[`CMS/getSelected`]; };
   private get checkSelected(): string { return this.$store.getters[`CMS/getSelectedType`]; };
   private get cmsList(): CMS[] { return this.$store.getters[`CMS/getCMSlist`]; };

   private get CMS(): CMS | object {
      const type: string = this.checkSelected;
      const id: number = this.selected;
      if (type === 'CMS') {
         const index = this.cmsList.findIndex((el: CMS) => el.props.id === id);
         return index !== -1 
            ? this.cmsList[index]
            : {};
      } else {
         return {};
      }
   }
}
</script>

<style lang="scss" scoped>
   .cms-form {
      box-sizing: border-box;
      // padding: 2px;
      width: 100%;
      height: calc(100% - 40px);
      background-color: #fff;
      color: $colorDark;
      font-size: 12px;
      
      overflow-y: auto;

      &-wrapper {
         box-sizing: border-box;
         padding: 2px;
         border-left: 2px solid $colorDark;
         overflow: hidden;
         width: 100%;
         height: 100%;
      }

      &-header {
         background-color: $colorGreen;
         color: #fff;
         display: flex;
         justify-content: center;
         align-items: center;
         height: 40px;
         margin-bottom: 2px;
      }
   }
</style>
