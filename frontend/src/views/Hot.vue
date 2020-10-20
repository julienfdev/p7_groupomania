<template>
  <div>
        <CategoriesBar />
    <div class="container">
      <div class="row mt-2 mt-lg-3 d-flex justify-content-center">
        <HotPosts class="col-lg-9" />
      </div>
    </div>
  </div>
</template>

<script>
  import HotPosts from '@/components/HotPosts';
  import CategoriesBar from '@/components/CategoriesBar'
  // @ is an alias to /src

  export default {
    name: 'Hot',
    data() {
      return {};
    },
    components: {
      HotPosts,
      CategoriesBar
    },
  }
</script>