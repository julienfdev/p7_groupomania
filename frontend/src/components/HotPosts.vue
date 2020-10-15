<template>
    <div>
        <div class="row" v-for="post in hotPosts" :key="post.slug">
            <Post :post="post"/>
        </div>
    </div>
</template>

<script>
    import {
        getPosts,
    } from '@/js/fetchRequests';
    import Post from './post/Post';

    export default {
        name: 'HotPosts',
        data() {
            return {
                hotPosts: []
            }
        },
        components: {
            Post
        },
        async beforeMount() {
            this.hotPosts = await getPosts('hot');
        }
    }
</script>

<style lang="scss" scoped>

</style>