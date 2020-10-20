<template>
    <div>
        <div class="container">
            <div class="row mt-2 mt-lg-3 d-flex justify-content-center">
                <div class="col-lg-9">
                    <Post :post="postObject.post" @postDeleted="deletion()"/>
                    <Comments :commentArray="postObject.commentList" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Post from '@/components/post/Post';
    import Comments from '@/components/post/Comments';
    import {
        getPost
    } from '../js/fetchRequests';

    export default {
        name: 'DetailPost',
        components: {
            Post,
            Comments
        },
        data() {
            return {
                postObject: {}
            }
        },
        async beforeMount() {
            this.postObject = await getPost(this.$route.params.slug);
        },
        methods: {
            // If the post is deleted, we go back to the home page
            deletion (){
                this.$router.push('/');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>