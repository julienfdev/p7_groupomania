<template>
  <div>
        <CategoriesBar />
    <div class="container">
      <div class="row mt-2 mt-lg-3 d-flex justify-content-center">
        <Category :slug="$route.params.slug" class="col-lg-9" />
      </div>
    </div>
  </div>
</template>

<script>
import CategoriesBar from '@/components/CategoriesBar';
import Category from '@/components/Category';

    export default {
        name: "CategoryPage",
        components: {
            CategoriesBar,
            Category
        }
    }
</script>

<style lang="scss" scoped>

</style>