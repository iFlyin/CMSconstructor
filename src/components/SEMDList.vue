<template>
    <div class="tree">
        <div class="tree-header">
            Список документов
        </div>
        <label class="search">
            <input type="text" v-model="filter">
            <font-awesome-icon class="search-icon" icon="search"/>
        </label>
        <ul class="tree-list">
            <li v-for="SEMD of getList" :key="SEMD.id" class="tree-list-item" @click="$emit('select', SEMD.id)">
                <div class="tree-list-item-id">{{SEMD.id}}</div>
                <div class="tree-list-item-name" :title="SEMD.description">{{SEMD.name}}</div>
                <!-- <div class="tree-list-item-icon">
                    <font-awesome-icon 
                        class="search-icon" 
                        :icon="SEMD.has_filters ? 'check-square' : 'square'"
                        :title="`has_filters = ${SEMD.has_filters}`"
                    />
                    <font-awesome-icon 
                        class="search-icon" 
                        :icon="SEMD.internal_semd ? 'check-square' : 'square'"
                        :title="`internal_semd = ${SEMD.internal_semd}`"
                    />
               </div> -->
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({props: {list: { type: Array, default: new Array() }}})
export default class Tree extends Vue {
    public list!: any[];

    public get semds(): any[] {
        return this.list.filter((el: any) => el.title_semd === true);
    }

    public filter: any = '';

    public get getList(): any[] {
        const regexp: RegExp = new RegExp(this.filter, 'i');
        return this.semds.filter((el: any) => regexp.test(el.name));
    };

}
</script>


<style lang="scss" scoped>
    .tree {
        width: 100%;
        height: 100%;
        // background-color: $colorGrey;
        padding: 2px;
        // margin-top: 2px;
        border-right: 2px solid $colorDark;
        // overflow: hidden;
        

        &-header {
            height: 40px;
            width: 100%;
            background-color: $colorGreen;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &-list {
            list-style: none;
            margin: 0;
            padding: 0;
            overflow-x: hidden; 
            overflow-y: auto;
            height: calc(100% - 80px);

            &-item {
                display: flex;
                // padding: 10px;
                border: 1px solid $colorDark;
                margin: 2px 0;
                cursor: pointer;
                user-select: none;
                overflow: hidden;
                box-sizing: border-box;
                // height: 100%;

                &-id {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    // border-right: 1px solid $colorDark;
                    min-height: 100%;
                    width: 40px;
                    min-width: 40px;
                    padding: 10px;
                    box-sizing: border-box;
                    background-color: $colorDark;
                    color: #fff;
                }

                &-name {
                    padding: 5px 5px 5px 10px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    text-align: left;
                    width: calc(100% - 65px);
                    color: $colorDark;
                }

                &-icon {
                    width: 25px;
                    min-width: 25px;
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: flex-start;
                    align-items: center;
                    background-color: $colorDark;
                }
            }
        }
    }

    .search {
        box-sizing: border-box;
        padding: 5px;
        margin-bottom: 2px;
        background-color: $colorDark;
        color: #fff;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        overflow: hidden;

        &-icon {
            padding: 5px;
            width: 25px;
            height: 25px;
            box-sizing: border-box;
            background-color: $colorDark;
            color: #fff;
        }

        & > input {
            width: calc(100% - 30px);
            flex: 1 1 auto;
        }
    }
</style>
