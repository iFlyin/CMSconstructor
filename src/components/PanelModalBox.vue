<template>
    <div class="modal-box-wrapper">
        <div 
            class="modal-box" 
            :style="{
                width: `${width}%`,
                height: `${height}%`,
                top: `calc(50% - ${height / 2}%)`,
                left: `calc(50% - ${width / 2}%)`,
            }"
        >
            <div class="header">
                <slot name="header"></slot>
            </div>
            <div class="main">
                <slot name="default"></slot>
            </div>
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
    props: {
        width: {
            type: Number,
            default: 40,
        },
        height: {
            type: Number,
            default: 40,
        }
    },
})
export default class ModalBox extends Vue {}
</script>

<style lang="scss" scoped>
    .modal-box {
        position: fixed;
        border: 2px solid $colorDark;
        outline: 1px solid rgba(100%, 100%, 100%, .8);
        background-color: #fff;
        color: $colorDark;
        display: flex;
        flex-flow: column nowrap;
        box-sizing: border-box;
        height: 100%;

        &-wrapper {
            z-index: 10000000000;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0, .2);
        }
    }

    .header {
        flex: 0 0 32px;
        width: 100%;
        display: flex;
        align-items: center;
        // height: 30px;
        padding: 5px 10px;
        box-sizing: border-box;
        background-color: $colorDark;
        color: #fff;
        height: 32px;
    }

    .main {
        padding: 20px 10px;
        flex: 0 1 auto;
        // padding: 10px;
        height: 100%;
        max-height: 100%;
        overflow: auto;
    }

    .footer {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        box-sizing: border-box;
        flex: 0 0 60px;
        padding: 20px 10px;
        background-color: $colorDark;
    }
</style>


