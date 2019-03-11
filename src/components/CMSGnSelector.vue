<template>
    <div class="group-number-selector">
        <span>{{value}}</span>
        <div class="btn-group">
            <font-awesome-icon icon="sort-up" class="btn btn-up" @click="$emit('set', value + 1)"/>
            <font-awesome-icon icon="sort-down" class="btn btn-down" @click="$emit('set', value - 1)"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ props: { value: { type: Number, default: 1 } } })
export default class GroupNumberSelector extends Vue {}
</script>

<style lang="scss" scoped>
    .group-number-selector {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row nowrap;

        & span {
            padding: 0 5px;
        }

        & .btn-group {
            display: flex;
            flex-flow: column nowrap;
        }

        & .btn {
            cursor: pointer;
            width: 20px;
            height: 20px;
            box-sizing: border-box;
            border: 1px solid #fff;
            font-size: 5px;

            &-up {
                padding: 5px 5px 0 5px; 
            }

            &-down {
                padding: 0px 5px 5px 5px;
            }

            &:hover {
                background-color: $colorGreen;
                color: #fff;
            }

        }
    }
</style>
