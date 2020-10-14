<template>
  <div id="app" class=" px-0">
    <Navbar class="navbarComponent" />
    <router-view />
  </div>
</template>

<style lang="scss">
  @import '@/sass/main.scss';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>

<script>
  import Navbar from './components/Navbar'

  export default {
    name: 'App',
    components: {
      Navbar
    }
  }
</script>