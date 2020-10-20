<template>
    <div class="container">
        <div class="row d-flex justify-content-around ">
            <CategoryItem v-for="category in categories" :key="category.index" :category="category"/>
        </div>
        <hr/> 
    </div>
</template>

<script>
    import CategoryItem from "./categories/CategoryItem"
    import {
        getCategories
    } from "../js/fetchRequests";

    export default {
        name: "CategoriesBar",
        data() {
            return {
                categories: []
            }
        },
        components: {
            CategoryItem
        },
        async beforeMount() {
            this.categories = await getCategories();
        }
    }
</script>

<style lang="scss" scoped>

</style>