<template>
   <input :disabled="(val === '')" :value="val" type="number" step="1" min="1" max="99" @change="emitNum($event.target.value)">
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
      this.set(parseInt(e));
   }

   private set(e: any): void {
      if(e === '') { e = null; }
      if(e > 99) { e = 99; }
      this.$emit('change', e);
   }
} 
</script>
