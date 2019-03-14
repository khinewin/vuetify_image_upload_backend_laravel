<template>
  <v-app>
      <toolbar></toolbar>
      <v-content>
      <router-view></router-view>
      </v-content>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar';
import VImageInput from  'vuetify-image-input';

export default {

  name: 'App',
  components: {
      Toolbar,
      VImageInput,

  },
  data () {
    return {
      //
    }
  }
}
</script>
