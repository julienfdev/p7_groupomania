<template>
    <div>
        <div class="container">
            <div class="row mt-2 mt-lg-3 d-flex justify-content-center">
                <div class="col-lg-8" v-if="postObject.post">
                    <Post :post="postObject.post" />
                    <Comments :commentArray="postObject.commentList" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Post from '../components/post/Post';
    import Comments from '../components/post/Comments';
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
        }
    }
</script>

<style lang="scss" scoped>

</style>