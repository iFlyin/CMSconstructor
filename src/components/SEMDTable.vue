<template>
    <div class="table-wrapper">
        <div class="table">
            <div class="table-wrapper-header">
                <div class="table-wrapper-header-left">
                    <span>{{root.id}} - {{name(root.id)}}</span>
                    <div class="table-wrapper-header-btn-group">
                        <button class="button button-add" title="Добавить строку"><font-awesome-icon icon="plus"/></button>
                        <button class="button button-del" title="Удалить строку"><font-awesome-icon icon="minus"/></button>
                    </div>
                </div>
                <button class="button button-trash" title="Удалить таблицу"><font-awesome-icon icon="trash"/></button>
            </div>
            <thead class="table-header">
                <tr>
                    <th v-for="(key, index) of thead" :key="index" class="table-header-cells table-cells">
                        {{key}}
                    </th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr v-for="(row, index) of table" :key="index" class="table-rows">
                    <td v-for="(key, index) of thead" :key="index" class="table-header-cells table-cells">
                        {{row[key]}}
                    </td>
                </tr>
            </tbody>
        </div>
        <div class="table-wrapper-cascade">
            <div class="table-wrapper-cascade-plus">
                <button @click.prevent class="table-wrapper-cascade-plus-button">
                    <font-awesome-icon icon="plus" size="2x"/>
                </button>
            </div>
            <div class="table-wrapper-cascade-child">
                <app-table v-for="(table, index) of root.child" :key="index" :root="table"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
    name: 'AppTable',
    props: {
        root: {
            type: Object,
            required: true,
        },
        isRoot: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        ...mapGetters('SEMD', { name: 'getName' }),
    }
})
export default class AppTable extends Vue {
    public table: any = [
        { 
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
            key4: 'value3',
            key5: 'value3',
            key6: 'value3',
            key7: 'value3',
            key8: 'value3',
        },
        { 
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
            key4: 'value3',
            key5: 'value3',
            key6: 'value3',
            key7: 'value3',
            key8: 'value3',
        },
        { 
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
            key4: 'value3',
            key5: 'value3',
            key6: 'value3',
            key7: 'value3',
            key8: 'value3',
        },
    ];

    public get thead(): string[] {
        const header = new Array();
        for (const row of this.table) {
            for (const key in row) {
                const check = (header.findIndex((el: any) => el === key)) === -1
                    ? true
                    : false;
                if (check) { header.push(key); }
            }
        };
        return header;
    }
}
</script>

<style lang="scss" scoped>
    .table {
        border-collapse: collapse;
        box-sizing: border-box;
        margin-bottom: 5px;
        border: 2px solid #fff;
        box-shadow: 2px 4px 6px rgba(0, 0, 0, .33);

        &-rows {
            background-color: #fff;
            &:nth-child(2n - 1) {
                background-color: $colorLightGrey;
            }
        }

        &-header {
            background-color: $colorGreen;
            color: #fff;

            & > tr {
                height: 30px;

                & > th {
                    border: 1px solid $colorGrey;
                    border-top: 1px solid transparent;
                    text-align: center;
                    padding: 10px;
                    box-sizing: border-box;

                    &:first-child, &:last-child {
                        border-left: none;
                        border-right: none;
                    }
                }
            }
        }

        &-body {
            height: 100%;

            & > tr {
                color: $colorDark;

                & > td {
                    border: 1px solid $colorGrey;

                    &:first-child, &:last-child {
                        border-left: none;
                        border-right: none;
                    }
                }
            }

            
        }

        &-cells {
            padding: 10px 8px;
            width: 100%;
        }
       
        &-wrapper {
            // width: 100%;
            box-sizing: border-box;
            // border: 1px solid $colorDark;
            margin-bottom: 5px;
            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;

            &-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                // width: 100%;
                background-color: $colorDark;
                color: #fff;
                padding: 1px 8px;
                box-sizing: border-box;

                &-left {
                    display: flex;

                    & > span {
                        display: flex;
                        align-items: center;
                    } 
                }

                &-btn-group {
                    margin-left: 20px;
                }
            }

            &-cascade {
                margin-top: 10px;
                display: flex;
                justify-content: flex-start;
                // align-items: flex-end;

                &-plus {
                    width: 50px;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                   

                    &-button {
                        border: none;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        color: $colorGreen;
                        background-color: transparent;
                        outline: none;
                        cursor: pointer;

                        &:hover {
                            background-color: $colorGreen;
                            color: #fff;
                        }

                    }
                }

                &-child {
                    flex: 0 1 auto;
                    padding: 0 5px;
                    box-sizing: border-box;
                }
            }
        }
    }

    .button {
        border: none;
        background-color: transparent;
        color: #fff;
        cursor: pointer;
        height: 25px;
        width: 25px;
        outline: none;

        &-add {
           &:hover {
               background-color: $colorGreen;
           }
        }

        &-del, &-trash {
            &:hover {
                background-color: red;
            }
        }
    }
</style>


 