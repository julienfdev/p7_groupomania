<template>
<!-- displays hot posts -->
    <div>
        <div class="row" v-for="post in hotPosts" :key="post.index">
            <Post :post="post" @postDeleted='onDelete()'/>
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
        methods: {
            async onDelete() {
                this.hotPosts = await getPosts('hot');
            }
        },
        async beforeMount() {
            const hotPosts = await getPosts('hot');
            if(hotPosts){
            this.hotPosts = hotPosts;
            }
            else{
                this.$router.push('/login');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>