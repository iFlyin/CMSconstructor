<template>
   <input type="text" :disabled="(val === '')" :value="val" @change="set($event.target.value)">
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({ props: { val: { required: true } } })
export default class Input extends Vue {
   private set(e: any): void {
      if(e === '') { e = null; }
      this.$emit('change', e);
   }
} 
</script>
