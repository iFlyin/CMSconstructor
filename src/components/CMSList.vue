<template>
    <div class="cms-list">
        <div class="cms-list-header">
            Weblook
        </div>
        <div class="cms-list-content">
            <div 
                v-for="(item, index) of list"
                :key="index"
                class="cms-list-item"
                :draggable="true"
                @dragstart="dragStart($event, item, item.params.type)"
            >
                <div class="cms-list-item-id">{{item.props.look}}</div>
                <dir class="cms-list-item-name">{{Weblook(item.props.look)}}</dir>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
@Component({ props: { list: { type: Array, required: true } }})
export default class CMSList extends Vue {
    public get Weblook(): string { return this.$store.getters['CMS/getLookName']; }
    public dragStart(e: any, item: any, type: string) { e.dataTransfer.setData(type, JSON.stringify(item)); }
}
</script>

<style lang="scss" scoped>
    .cms-list {
        box-sizing: border-box;
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
        width: 100%;
        padding: 2px;
        border-right: 2px solid $colorDark;
        overflow: hidden;
        background-color: #fff;
        color: #fff;
        font-size: 12px;

        &-header {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            background-color: $colorGreen;
        }

        &-content {
            height: calc(100% - 40px);
            overflow: auto;
        }

        &-item {
            box-sizing: border-box;
            display: flex;
            margin: 2px 0;
            border: 1px solid $colorDark;
            overflow: hidden;
            user-select: none;
            cursor: grab;

            &-id {
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                min-width: 40px;
                min-height: 100%;
                padding: 5px;
                background-color: $colorDark;
                color: #fff;
            }

            &-name {
                box-sizing: border-box; 
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: calc(100% - 40px);
                padding-left: 10px;
                color: $colorDark;
                text-align: left;
            }
        }
    }
</style>
