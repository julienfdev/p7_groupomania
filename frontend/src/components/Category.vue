<template>
    <div>
        <div class="row" v-for="post in posts" :key="post.slug">
            <Post :post="post" @postDeleted="onDelete()" />
        </div>
    </div>
</template>

<script>
    import {
        getCategoriesPosts
    } from '../js/fetchRequests';
    import Post from "./post/Post"

    export default {
        name: "Category",
        data() {
            return {
                posts: []
            }
        },
        props: {
            slug: {
                type: String,
                required: true
            }
        },
        async beforeMount() {
            this.posts = await getCategoriesPosts(this.slug);
        },
        watch: {
            async $route(to) {
                console.log('coucou')
                this.posts = await getCategoriesPosts(to.params.slug);
            }
        },
        methods: {
            async onDelete() {
                this.posts = await getCategoriesPosts(this.$route.params.slug);
            }
        },
        components: {
            Post
        }
    }
</script>

<style lang="scss" scoped>

</style>