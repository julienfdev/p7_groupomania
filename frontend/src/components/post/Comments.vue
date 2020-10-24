<template>
    <div class="container">
        <h4 class="row">Commentaires</h4>
        <div v-for="comment of currentPost.commentList" :key="comment.slug" class="comments">
            <Comment :comment="comment" @commentDeleted="onDelete()" />
        </div>
        <hr/>
        <PostComment />
    </div>
</template>

<script>
    import Comment from './Comment';
    import PostComment from './PostComment';
    import {getPost} from '@/js/fetchRequests';
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'Comments',
        data() {
            return {}
        },
        props: {
        },
        computed:{
            ...mapState(['currentPost'])
        },
        components: {
            Comment,
            PostComment
        },
        methods: {
            async onDelete() {
            this.setPost((await getPost(this.$route.params.slug)));
            },
            ...mapActions(['setPost'])
        }
    }
</script>

<style lang="scss" scoped>
    hr{
        width: 70%;
    }
</style>