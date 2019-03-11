<template>
   <form class="cms-form">
      <app-input 
         v-for="(item, key, index) of params" :key="index"
         :label="key"
         :component="item.type"
         :cms="CMS"
         @change="change()"
      />
   </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import AppInput from '@/components/inputs/Label.vue';
import { CMS, PropType } from '@/interfaces';
@Component({
   components: { AppInput },
   computed: {...mapGetters('CMS', { 
      params: 'getPropList',
      checkSelected: 'getSelectedType',
      selected: 'getSelected',
      cmsList: 'getCMSlist',
   })}
})

export default class CMSForm extends Vue {
   private params!: PropType;
   private selected!: number;
   private checkSelected!: string;
   private cmsList!: CMS[];

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
      padding: 5px;
      width: 100%;
      height: 100%;
      background-color: $colorDark;
      color: #fff;
      overflow-x: hidden;
      overflow-y: auto;
   }
</style>
