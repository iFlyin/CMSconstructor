<template>
    <div class="layout" :style="{ background: getInitStatus ? '#fff': 'transparent' }">
        <structure v-if="getInitStatus"/>
        <span v-else class="show-text">Выберите документ..</span>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Structure from './SEMDStructure.vue';
@Component({
    components: { Structure },
    computed: {...mapGetters('SEMD', ['getInitStatus'])}
})
export default class SEMDLayout extends Vue {}
</script>

<style lang="scss" scoped>
    .layout {
        width: 100%;
        height: 100%;
        // background-color: #fff;
    }

    .show-text {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        width: 100%;
        height: 90%;
        color: $colorDark;
        text-shadow: 1px 1px 1px $colorDark;
    }
</style>

