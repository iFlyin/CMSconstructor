<template>
   <input :disabled="(val === '')" :value="val" type="number" step="1" min="1" @change="emitNum($event.target.value)">
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({ 
   props: { 
      val: {
         // type: [Number, String],
         required: true,
      } 
   } 
})
export default class DatePicker extends Vue {  
   public emitNum(e: any) {
      parseInt(e);
      this.$emit('change', e);
   }
} 
</script>
