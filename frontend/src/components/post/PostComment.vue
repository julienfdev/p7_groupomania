<template>
    <div class="row d-flex justify-content-between mb-5">
        <input type="text" placeholder="Ecrivez quelque chose..." class="flex-grow-1" v-model="commentText" />
        <button @click="addComment" class="btn btn-primary d-flex shadow-sm col-2 col-lg-1 ml-3 justify-content-center">
            <div class="icon icon__envelope" /></button>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex';
    import {
        postComment,
        getPost
    } from '@/js/fetchRequests';

    export default {
        name: "PostComment",
        data() {
            return {
                commentText: ""
            }
        },
        computed:{
            ...mapState(['currentPost', 'currentUser'])
        },
        methods: {
            async addComment() {
                const validatedPost = await postComment(this.commentText, this.currentPost, this.currentUser);
                if (validatedPost) {
                    this.setPost((await getPost(this.$route.params.slug)));
                    this.commentText = "";
                }
            },
            ...mapActions(['setPost'])
        }

    }
</script>

<style lang="scss" scoped>
    .icon {
        background-color: #fff;
        mask: center no-repeat;
        mask-size: 100%;
        height: 1.2em;
        width: 1.4em;
        transition: background-color 200ms ease-in-out;

        &__envelope {
            mask-image: url('../../assets/icons/envelope.svg');
        }
    }
</style>