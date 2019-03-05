<template>
    <div class="modal-box">

    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class ModalBox extends Vue {}
</script>

<style lang="scss" scoped>
    .modal-box {
        position: fixed;
        width: 40%;
        height: 40%;
        top: calc(50% - 20%);
        left: calc(50% - 20%);
        border: 2px solid $colorDark;
        background-color: #fff;
    }
</style>


