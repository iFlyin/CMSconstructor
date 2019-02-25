<template>
    <div id="constructor">
        <main-menu @newproject="initialize()" @initByID="asyncGetCMSbyId({
            id: $event,
            callback: clearHistory,
        })"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainMenu from '@/components/PanelMenu.vue';

@Component({
    components: { MainMenu }
})

export default class SEMD extends Vue {} 
</script>

<style lang="scss" scoped>
    #constructor {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>


