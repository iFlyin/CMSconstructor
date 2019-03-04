<template>
    <div class="config">1</div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class Config extends Vue{}
</script>

<style lang="scss" scoped>
    .config {
        width: 100%;
        height: 100%;
        border-left: 2px solid $colorDark;
        box-sizing: border-box;
    }
</style>
