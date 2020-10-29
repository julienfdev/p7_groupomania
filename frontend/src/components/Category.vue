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
            // When the categories change without rerendering the component (ie when not changing from fresh to a category), we watch the route and when the slug changes we update the posts
            async $route(to) {
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