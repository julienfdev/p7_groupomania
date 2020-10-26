<template>
    <div class="container border border-dark">
        <div class="row p-2 justify-content-center">
            <h2>Contributions :</h2>
        </div>
        <div class="container col-9">
            <div class="row" v-for="post of postArray" :key="post.slug">
                <Post :post="post" />
            </div>
            <div class="row" v-if="postArray.length == 0">
                <div class="col text-center">
                    <h3>{{userProfile.nickname}} n'a pas encore contribué! 😭</h3>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        mapState,
    } from 'vuex';
    import Post from '../post/Post'
    import {
        getUserPosts
    } from '@/js/fetchRequests';

    export default {
        name: "UserPosts",
        computed: {
            ...mapState(['currentUser', 'userProfile'])
        },
        data() {
            return {
                postArray: []
            }
        },
        components: {
            Post
        },
        async beforeMount() {
            this.postArray = await getUserPosts(this.$route.params.slug);
        }
    }
</script>

<style lang="scss" scoped>
</style>