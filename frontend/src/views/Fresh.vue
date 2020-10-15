<template>
  <div>
    <div class="container-fluid">
      <div class="row border text-center py-4">
        <div class="col">Placeholder Categories</div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-2 mt-lg-3 d-flex justify-content-center">
        <FreshPosts class="col-lg-8" />
      </div>
    </div>
  </div>
</template>

<script>
  import FreshPosts from '../components/FreshPosts';
  // @ is an alias to /src

  export default {
    name: 'Fresh',
    data() {
      return {};
    },
    components: {
      FreshPosts
    },
  }
</script>