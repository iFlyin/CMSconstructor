<template>
  <div class="home">
    <a href="#"><img alt="ИМЦ логотип" src="../assets/logo.png"></a>
    <div id="nav">
      <a @click="$emit('route', 'app-semd')">Документы</a> |
      <a class="disabledLink" to="/">Формы</a> |
      <a @click="$emit('route', 'app-cms')">Процессы</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
  .home {
    height: 80%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: $colorDark;
      cursor: pointer;
      user-select: none;
      
      &:hover {
        color: $colorGreen;
      }
    }
  }

  .disabledLink {
    cursor: not-allowed !important;
  }
</style>

