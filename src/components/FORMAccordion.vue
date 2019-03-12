<template>
    <div class="accordion">
        <div 
            class="accordion-item"
            :class="(activePanel===index) ? 'accordion-active' : ''"
        >
            <div class="accordion-header">
                Компоненты
            </div>
            <div class="accordion-content">
                <div 
                    class="accordion-content-item"
                    v-for="(item, index) of components"
                    :key="index"
                >
                    <div class="accordion-content-item-id">
                        {{index}}
                    </div>
                    <div class="accordion-content-item-name">
                        {{item}}
                    </div>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <div class="accordion-header">
                СЭМД
            </div>
        </div>
        <div class="accordion-item">
            <div class="accordion-header">
                Пользовательские компоненты
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({})
export default class Accordion extends Vue {
    public get components(): any { return this.$store.getters['FORM/getComponents']}
}
</script>


<style lang="scss" scoped>
    .accordion {
        box-sizing: border-box;
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
        width: 100%;
        overflow: hidden;
        background-color: #fff;
        border-right: 2px solid $colorDark;
        padding: 2px;

        &-item {
            &:first-child {
                & > .accordion-header {
                    margin: 0;
                }
            }
        }

        &-header {
            height: 40px;
            background-color: $colorGreen;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2px;
        }

        &-active {
            flex: 1 1 auto;
        }

        &-content {
            &-item {
                margin: 2px 0;
                display: flex;
                border: 1px solid $colorDark;
                user-select: none;
                overflow: hidden;
                box-sizing: border-box;

                &-id {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    // border-right: 1px solid $colorDark;
                    min-height: 100%;
                    width: 40px;
                    min-width: 40px;
                    padding: 5px;
                    box-sizing: border-box;
                    background-color: $colorDark;
                    color: #fff;
                }

                &-name {
                    // padding: 2px 2px 2px 10px;
                    padding-left: 10px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    text-align: left;
                    width: calc(100% - 40px);
                    color: $colorDark;
                }
            }
        }
    }
</style>

