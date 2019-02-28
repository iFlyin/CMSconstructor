<template>
    <div class="table-wrapper">
        <div class="table-plus">
            <button @click.prevent class="table-plus-button">
                <font-awesome-icon icon="plus" size="2x"/>
            </button>
        </div>
        
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex'
@Component({
    computed: {
        ...mapGetters('SEMD', { table: 'getTable' }),
    }
})
export default class SEMDTable extends Vue {
    public table!: any;

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
        &-wrapper {
            display: flex;
            width: 100%;
            height: 200px;
            // background-color: #b3b3b3;
            box-sizing: border-box;
            padding: 5px;
        }

        &-plus {
            width: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;

            &-button {
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                color: $colorGreen;
                background-color: #fff;
                outline: none;

                &:hover {
                    background-color: $colorGreen;
                    color: #fff;
                }
            }
        }

        &-table {
            // background-color: red;
            flex: 1 1 auto;
            display: flex;
            flex-flow: column nowrap;
            // border: 1px dashed red;
            // box-sizing: border-box;
            padding: 5px;
            border-collapse: collapse;
        }

    
        &-header {
            background-color: $colorGreen;
            color: #fff;
            // width: 100%;
            height: 30px;
            border: 1px dashed red;
            border-spacing: 0;
        }
    }
</style>
