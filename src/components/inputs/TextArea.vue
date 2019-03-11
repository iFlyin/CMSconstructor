<template>
   <textarea :style="{resize: 'vertical', width: '100%', height: '72px', flex: '1 1 auto'}" :disabled="(val === '')" :value="val"  @change="set($event.target.value)"></textarea>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({ props: { val: { required: true } } })
export default class TextArea extends Vue {
   private set(e: any): void {
      if(e === '') { e = null; }
      this.$emit('change', e);
   }
} 
</script>