<template>
    <div class="table-wrapper">
        <div class="table-wrapper-header">{{root.node}}</div>
        <thead class="header">
            <tr>
                <th v-for="(key, index) of thead" :key="index" class="table-header">
                    {{key}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) of table" :key="index">
                <td v-for="(key, index) of thead" :key="index">
                    {{row[key]}}
                </td>
            </tr>
        </tbody>
        {{root}}
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
    props: {
        root: {
            type: Object,
            required: true,
        }
    }
})
export default class Table extends Vue {
    // public table!: any;

    public get thead(): string[] {
        // const header = new Array();
        // for (const row of this.table) {
        //     for (const key in row) {
        //         const check = (header.findIndex((el: any) => el === key)) === -1
        //             ? true
        //             : false;
        //         if (check) { header.push(key); }
        //     }
        // };
        return []; //header;
    }
}
</script>

<style lang="scss" scoped>

    .table-wrapper {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid $colorDark;
        margin-bottom: 5px;

        &-header {
            width: 100%;
            background-color: $colorDark;
            color: #fff;
            padding: 5px;
            box-sizing: border-box;
        }
    }
    

    // .table {
    //         // background-color: red;
    //         flex: 1 1 auto;
    //         // display: flex;
    //         // flex-flow: column nowrap;
    //         // border: 1px dashed red;
    //         // box-sizing: border-box;
    //         padding: 5px;
    //         border-collapse: collapse;
    //         width: 100%;
    //         box-sizing: border-box;

    //         & tbody {
    //             height: 100%;
    //         }

    //         & td {
    //             border: 1px solid $colorGrey;
    //             height: 100%;
    //         }
    //     }

    
    // .header {
    //     background-color: $colorGreen;
    //     color: #fff;

    //     & > tr {
    //         height: 30px;

    //         & > th {
    //             border: 1px solid $colorGrey;
    //             text-align: center;
    //             padding: 10px;
    //             box-sizing: border-box;
    //         }
    //     }
    // }




</style>


 