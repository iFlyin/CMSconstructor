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
@Component({
    props: {
        list: {
            type: Array,
            required: true,
        }
    }
})
export default class CMSList extends Vue {
    public get Weblook(): any {
        return this.$store.getters['CMS/getLookName'];
    }

    public dragStart(e: any, item: any, type: string) {
      e.dataTransfer.setData(type, JSON.stringify(item));
   }
}
</script>

<style lang="scss" scoped>
    .cms-list {
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
        width: 100%;
        overflow: hidden;
        background-color: #fff;
        color: #fff;
        padding: 2px;
        box-sizing: border-box;
        border-right: 2px solid $colorDark;

        &-header {
            background-color: $colorGreen;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &-content {
            height: calc(100% - 40px);
            overflow: auto;
        }

        &-item {
            // background-color: $colorDark;
            // padding: 10px;
            margin: 2px 0;
            display: flex;
            border: 1px solid $colorDark;
            user-select: none;
            overflow: hidden;
            box-sizing: border-box;
            cursor: grab;

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
</style>
