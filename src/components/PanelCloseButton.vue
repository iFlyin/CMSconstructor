<template>
    <div class="menu-close-button" @click="$emit('close')"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class CloseButton extends Vue {
   // public request(): void {
   //    const req: boolean = confirm('Все несохраненные данные будут утерены. Вы действительно хотите выйти?');
   //    if(req) {this.$emit('close');}
   // }
}
</script>


<style lang="scss" scoped>
   .menu-close-button {
      position: absolute;
      right: 0;
      top: 0;
      width: 32px;
      height: 30px;  
      cursor: pointer; 

      &:hover {
         background-color: red;
      }

      &::before, &::after {
         position: absolute;
         left: 15px;
         content: ' ';
         top: calc(50% - 9px);
         height: 18px;
         width: 2px;
         background-color: #fff;
      }   

      &::before {
         transform: rotate(45deg);
      }
      
      &::after {
         transform: rotate(-45deg);
      }
   }   
</style>
