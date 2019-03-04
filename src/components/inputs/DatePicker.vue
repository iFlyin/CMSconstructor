<template>
   <div>
      <input type="date" :value="val" :disabled="(val === '')" @input="set($event.target.value)">
      <!-- {{check}} -->
   </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({ props: { val: { required: true } } })
export default class DatePicker extends Vue {
   private val!: any;

   private set(e: any): void {
      if(e === '') { e = null; }
      this.$emit('change', e);
   }

   private get check(): any{
      return console.log(this.val);
   }
} 
</script>