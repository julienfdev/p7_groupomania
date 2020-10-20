<template>
    <div class="col-12 col-lg-4">
        <router-link :to="`/${category.slug}`">
            <div class="col wrapper d-flex align-items-center my-2">
                <div class="badge border d-flex shadow p-0 mr-4">{{firstLetter}}</div>
                <div class="content h3 py-0 my-0">{{category.name}}</div>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "CategoryItem",
        props: {
            category: {
                type: Object,
                required: true
            }
        },
        computed: {
            firstLetter() {
                return this.category.name.slice(0, 1).toUpperCase();
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../sass/vendors/overrides";

    .badge {
        width: 2em;
        height: 2em;
        font-size: 2em;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        background-color: $primary;
    }

    a {
        color: white;
        transition: color 200ms ease-in-out;
        &:hover {
            text-decoration: none;
            color: darken(white, 20);
        }
    }
</style>