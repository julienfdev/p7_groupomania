<template>
  <div class="home d-flex flex-column align-items-center">
    <img alt="Vue logo" src="../assets/logo.png" class="img-fluid">
    <HelloWorld msg="Hot Page Placeholder"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import {getHotPosts} from '@/js/fetchRequests';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted(){
    getHotPosts();
  }
}
</script>
