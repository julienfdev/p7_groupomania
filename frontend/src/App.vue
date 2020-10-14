<template>
  <div id="app" class="px-0">
    <Navbar class="navbarComponent mb-2 mb-lg-4" />
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import '@/sass/main.scss';
  body {
    background-color: lighten($dark, 10);
    color: $light;
    text-shadow: 1px 1px 2px rgba(black, 0.8) ;
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
        color: #42b983;
      }
    }
  }
  .navbarComponent{
    box-shadow: 0 0 3px black;
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