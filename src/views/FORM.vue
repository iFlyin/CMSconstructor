<template>
    <div id="constructor">
        <main-menu :base="'FORM'">
            <ul class="menu-list">
               <li class="menu-list-item">
                  <a class="menu-list-item-link" @click="$emit('newproject')">{{config.new}}</a>
               </li>
               <li class="menu-list-item">
                  <a class="menu-list-item-link" @click="reload()">{{config.save}}</a>
               </li>
               <li class="menu-list-item">
                  <a class="menu-list-item-link" @click.stop>{{config.saveFile}}</a>
               </li>
               <li class="menu-list-item">
                  <a class="menu-list-item-link" @click.stop>{{config.loadFile}}</a>
               </li>
               <li class="menu-list-item">
                  <a class="menu-list-item-link" @click="close()">{{config.exit}}</a>
               </li>
            </ul>    
        </main-menu>  
    </div>    
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MainMenu from '@/components/PanelTop.vue';
import { configFORM } from '@/cfg';

@Component({
    components: { MainMenu },
})

export default class FORM extends Vue {
    public config = configFORM;
}

</script>

<style lang="scss" scoped>

</style>

