<template>
  <div>
        <CategoriesBar />
    <div class="container">
      <div class="row mt-2 mt-lg-3 d-flex justify-content-center">
        <FreshPosts class="col-lg-9" />
      </div>
    </div>
  </div>
</template>

<script>
  import FreshPosts from '@/components/FreshPosts';
  import CategoriesBar from '@/components/CategoriesBar'
  // @ is an alias to /src

  export default {
    name: 'Fresh',
    data() {
      return {};
    },
    components: {
      FreshPosts,
      CategoriesBar
    },
  }
</script>