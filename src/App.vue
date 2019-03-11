<template>
	<div id="app">
		<components :is="page" @route="route($event)"/>
	<!-- <router-view/> -->
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters, mapMutations } from 'vuex';
import AppHome from '@/views/Home.vue';
import AppCms from '@/views/CMS.vue';
import AppSemd from '@/views/SEMD.vue';
import AppForm from '@/views/FORM.vue';

@Component({
  	components: {
    	AppHome, AppCms, AppSemd, AppForm,
	  },
	  computed: { ...mapGetters({
		  page: 'getPage',
	  })},
	  methods: { ...mapMutations({
		  setPage: 'setPage',
	  })}
})

export default class App extends Vue {
  public page!: string;
  public setPage!: any;
  
  public route(e: string) {
	  this.setPage(e);
  }
}
</script>


<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  color: #2c3e50;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

// input:disabled, textarea:disabled {
//   display: none;
// }

</style>
