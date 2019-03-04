<template>
    <div class="structure">
        <app-table 
            v-for="(root, index) of getSEMD.structure" 
            :key="index"
            :root="root"
        />
        <!-- <div class="table-plus">
            <button @click.prevent class="table-plus-button">
                <font-awesome-icon icon="plus" size="2x"/>
            </button>
        </div> -->
        <!-- <div class="wrapper">
            <div class="header">
                <div class="left">
                    <div>Мастер-таблица</div>
                    <div class="btn-group">
                        <button class="trash-button"><font-awesome-icon icon="plus"/></button>
                        <button class="trash-button"><font-awesome-icon icon="minus"/></button>
                    </div>
                </div>
                <button class="trash-button"><font-awesome-icon icon="trash"/></button>
            </div>
            <app-table/>
        </div> -->
        <!-- {{getSEMD}} -->
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppTable from '@/components/SEMDTable.vue';
import { mapGetters } from 'vuex';

@Component({ 
    components: { AppTable },
    computed: {...mapGetters('SEMD', ['getSEMD'])}
})
export default class SEMDStructure extends Vue {
    public getSEMD!: any;
}
</script>


<style lang="scss" scoped>

    .structure {  
        width: 100%;
        // height: 200px;
        // background-color: #b3b3b3;
        box-sizing: border-box; 
        padding: 5px;

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
                cursor: pointer;

                &:hover {
                    background-color: $colorGreen;
                    color: #fff;
                }
            }
        }
    }

    .wrapper {
        width: 100%;
        height: 100%;
        border: 1px solid $colorDark;
        // background-color: red;

        & > .header {
            background-color: $colorDark;
            color: #fff;
            height: 30px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 10px;
            box-sizing: border-box;

            & > .left {
                height: 100%;
                flex: 1 1 auto;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
            }
        }
    }

    .trash-button {
        border: none;
        background-color: transparent;
        height: 25px;
        width: 25px;
        color: #fff;
        outline: none;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover{
            background-color: red;
        }
    }

    .btn-group {
        display: flex;
        margin-left: 20px;
    }
</style>
