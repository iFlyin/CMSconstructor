<template>
    <div class="structure">
        <app-table 
            v-for="(root, index) of getSEMD.data_structure" 
            :key="index"
            :root="root"
            :isRoot="true"
        />
        <div class="table-plus">
            <button @click.prevent class="table-plus-button">
                <font-awesome-icon icon="plus" size="2x"/>
            </button>
        </div>

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
// import { mapGetters } from 'vuex';

@Component({ 
    components: { AppTable },
    // computed: {...mapGetters('SEMD', ['getSEMD'])}
})
export default class SEMDStructure extends Vue {
    public getSEMD(): any { return this.$store.getters[`SEMD/getSEMD`] };
}
</script>


<style lang="scss" scoped>
    .structure {  
        box-sizing: border-box; 
        padding: 10px;
        height: 100%;
        overflow: auto;
    }

    .table-plus {
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
</style>
