<template>
    <div class="table-wrapper">
        <div class="table" v-show="table.length > 0">
            <div class="table-wrapper-header">
                <div class="table-wrapper-header-left">
                    <span>{{root.id }} - {{name(root.id)}}</span>
                    <div class="table-wrapper-header-btn-group">
                        <button class="button button-add" title="Добавить строку"><font-awesome-icon icon="plus"/></button>
                        <button class="button button-del" title="Удалить строку"><font-awesome-icon icon="minus"/></button>
                    </div>
                </div>
                <button class="button button-trash" title="Удалить таблицу"><font-awesome-icon icon="trash"/></button>
            </div>
            <thead class="table-header">
                <tr>
                    <th v-for="(key, index) of thead" :key="index" class="table-header-cells table-cells" :title="key">
                        {{key}}
                        <i class="table-col-resize" @mousedown="colResize($event)"/>
                    </th>

                </tr>
            </thead>
            <tbody class="table-body">
                <tr v-for="(row, rowIndex) of table" :key="row['№ п.п.']" class="table-rows">
                    <td v-for="(key, index) of thead" :key="index" class="table-header-cells table-cells" :title="row[key]">
                        <span class="table-input" :contenteditable="!move" @blur="setValue($event, rowIndex, key)" :style="{'user-select': move ? 'none': ''}" v-html="row[key]"/>
                        <!-- <i class="table-row-resize" @mousedown="rowResize($event)" v-if="index === 0"/> -->
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
    computed: {...mapGetters('SEMD', { name: 'getName' })},
})
export default class AppTable extends Vue {
    public root!: any;
    public move: boolean = false;
    public table: any = new Array();

    public setValue(e: any, index: number, key: string) {
        this.table[index][key] = e.target.outerText;
        console.log(this.table[index][key]);
    }

    public colResize(e: MouseEvent) {
        const that = this;
        const target : any = e.target;
        const el: any = target.parentElement;

        function resize(e: MouseEvent) {
            that.move = true;
            console.log(el);
            el.style.minWidth = el.offsetWidth + e.movementX + 'px';
            el.style.maxWidth = el.offsetWidth + e.movementX + 'px';
            // el.style.width = el.offsetWidth + e.movementX + 'px';
        }

        function clean() {
            that.move = false
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', clean);
        }

        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', clean);
    }

    // public rowResize(e: MouseEvent) {
    //     const that = this;
    //     const el: Element = e.target.parentElement.parentElement;
    //     const fixEl: Element = e.target.parentElement;

    //     function resize(e: MouseEvent) {
    //         that.move = true;
    //         // el.style.minHeight = el.offsetHeight + e.movementY + 'px';
    //         // el.style.maxHeight = el.offsetHeight + e.movementY + 'px';
    //         el.style.height = el.offsetHeight + e.movementY + 'px';
    //     }

    //     function clean() {
    //         that.move = false
    //         window.removeEventListener('mousemove', resize);
    //         window.removeEventListener('mouseup', clean);
    //     }

    //     window.addEventListener('mousemove', resize);
    //     window.addEventListener('mouseup', clean);
    // }

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

    // public get name(): any { return this.$store.getters['FORM/getName']; }

    public async created() {
        // console.log(this.root);
        const table = await this.$store.dispatch('SEMD/asyncGetTable', {
            schema: this.root.schema,
            table: this.root.table,
        });
        table.sort(function(a: any, b: any){
            return a['№ п.п.'] - b['№ п.п.'];
        })
        this.table = table;
    }
}
</script>

<style lang="scss" scoped>
    .table {
        flex: 0 1 auto;
        border-collapse: collapse;
        box-sizing: border-box;
        margin-bottom: 5px;
        border: 2px solid #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, .66);
        font-size: 12px;

        &-col-resize {
            position: absolute;
            top: 0;
            right: 0px;
            width: 4px;
            height: 100%;
            // background: red;
            cursor: col-resize;
        }

        // &-row-resize {
        //     position: absolute;
        //     bottom: 0px;
        //     left: 0;
        //     width: 100%;
        //     height: 4px;
        //     // background: red;
        //     cursor: row-resize;
        // }

        &-input {
            // display: inline-block;
            position: absolute;
            width: calc(100% - 6px);
            height: calc(100% - 6px);
            top: 2px;
            left: 2px;
            overflow: hidden;
            padding: 5px;
            box-sizing: border-box;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: auto;

            &:focus {
                top: 0px;
                left: 0px;
                z-index: 10000;
                background-color: #fff;
                min-height: 100%;
                min-width: 100%;
                height: auto;
                width: auto;
                box-sizing: border-box;
                text-overflow: clip;
                white-space: normal;
                // padding: 12px 10px;
            }
        }


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
                line-height: 12px;

                & > th {
                    border: 1px solid $colorGrey;
                    border-top: 1px solid transparent;
                    text-align: center;
                    padding: 10px;
                    box-sizing: border-box;
                    position: relative;
                    user-select: none;
                    overflow: hidden;
                    overflow-wrap: break-word;

                    &:first-child, &:last-child {
                        border-left: none;
                        border-right: none;
                    }
                }
            }
        }

        &-body {
            // height: 100%;

            & > tr {
                color: $colorDark;
                height: 30px;
                overflow: hidden;
                // line-height: 12px;
                // table-layout: fixed;
                // overflow: hidden;
                padding: 0;

                & > td {
                    border: 1px solid $colorGrey;
                    padding: 2px;
                    box-sizing: border-box;
                    position: relative;
                    // height: 40px;

                    &:first-child, &:last-child {
                        border-left: none;
                        border-right: none;
                    }
                }
            }

            
        }

        &-cells {
            padding: 10px 8px;
            box-sizing: border-box;
            // width: 100%;
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
                    flex: 0 0 auto;
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


 