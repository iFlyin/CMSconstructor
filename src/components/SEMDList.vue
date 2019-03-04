<template>
    <div class="tree">
        <div class="tree-header">
            Список СЭМДов
        </div>
        <label class="search">
            <span>Поиск: </span>
            <input type="text" v-model="filter">
            <font-awesome-icon icon="search"/>
        </label>
        <div class="tree-list-wrapper">
            <ul class="tree-list">
                <li v-for="SEMD of getList" :key="SEMD.id" class="tree-list-item" v-html="SEMD.name" @click="$emit('select', SEMD.id)"/>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({props: {list: { type: Array, default: new Array() }}})
export default class Tree extends Vue {
    public list!: any[];

    public filter: any = '';

    public get getList(): any[] {
        const regexp: RegExp = new RegExp(this.filter, 'i');
        return this.list.filter((el: any) => regexp.test(el.name));
    };
}
</script>


<style lang="scss" scoped>
    .tree {
        width: 100%;
        height: 100%;
        // background-color: $colorGrey;
        padding: 5px;
        border-right: 2px solid $colorDark;
        overflow: auto;
        

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
            padding: 5px;
            overflow: auto;

            &-item {
                display: flex;
                justify-content: flex-start;
                text-align: left;
                padding: 10px;
                border: 1px dashed $colorDark;
                margin: 5px;
                cursor: pointer;
                user-select: none;
            }
        }
    }

    .search {
        box-sizing: border-box;
        padding: 5px;
        background-color: $colorDark;
        color: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>
