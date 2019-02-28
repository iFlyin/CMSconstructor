<template>
    <div class="layout">
        <master-table/>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MasterTable from './SEMDMasterTable.vue';
@Component({
    components: { MasterTable }
})
export default class SEMDLayout extends Vue {

}
</script>

<style lang="scss" scoped>
    .layout {
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
</style>

