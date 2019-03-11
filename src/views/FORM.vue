<template>
    <div id="constructor">
        <main-menu/>  
    </div>    
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MainMenu from '@/components/FORMMenu.vue';

@Component({
    components: { MainMenu },
})

export default class FORM extends Vue {
    
}

</script>

<style lang="scss" scoped>

</style>

