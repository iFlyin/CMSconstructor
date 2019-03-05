<template>
    <div class="layout" :style="{ background: getInitStatus ? '': 'transparent' }">
        <structure v-if="getInitStatus"/>
        <span v-else class="show-text" :style="{width: `calc(100% - ${getPanel.left}px)`}">Выберите документ..</span>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Structure from './SEMDStructure.vue';
@Component({
    components: { Structure },
    computed: {...mapGetters('SEMD', ['getInitStatus', 'getPanel'])}
})
export default class SEMDLayout extends Vue {}
</script>

<style lang="scss" scoped>
    .layout {
        // width: 100%;
        height: 100%;
        // background-color: #fff;
        padding: 2px;
        // overflow: auto;
    }

    .show-text {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        // width: 50%;
        height: calc(100% - 120px);
        color: $colorDark;
        text-shadow: 1px 1px 1px $colorDark;
    }
</style>

