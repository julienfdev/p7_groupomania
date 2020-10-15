<template>
    <div>
        <div class="row" v-for="post in freshPosts" :key="post.slug">
            <Post :post="post"/>
        </div>
    </div>
</template>

<script>
    import {
        getPosts
    } from '@/js/fetchRequests';
    import Post from './post/Post';

    export default {
        name: 'FreshPosts',
        data() {
            return {
                freshPosts: []
            }
        },
        components: {
            Post
        },
        async beforeMount() {
            this.freshPosts = await getPosts('fresh');
        }
    }
</script>

<style lang="scss" scoped>

</style>