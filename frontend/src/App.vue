<template>
  <div id="app" class="px-0">
    <Navbar class="navbarComponent mb-2 mb-lg-4" />
    <router-view />
    <AddModal />
  </div>
</template>

<style lang="scss">
  @import '@/sass/main.scss';

  body {
    background-color: darken($secondary, 40);
    color: $light;
    text-shadow: 1px 1px 2px rgba(black, 0.8);
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #ba4d55;
      }
    }
  }

  .navbarComponent {
    box-shadow: 0 0 3px black;
    position: sticky;
    top: 0;
    z-index: 900;
  }
</style>

<script>
  import Navbar from '@/components/Navbar';
  import AddModal from '@/components/AddModal';
  import {
    getCategories
  } from '@/js/fetchRequests.js'

  export default {
    name: 'App',
    components: {
      Navbar,
      AddModal
    },
    async beforeMount() {
      if (this.$store.state.currentUser.logValid) {
        this.$store.commit('CATEGORIES_POPULATE', await getCategories());
      }
    }
  }
</script>