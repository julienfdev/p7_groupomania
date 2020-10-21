<template>
    <div>
        <h4>Commentaires</h4>
        <div v-for="comment of currentPost.commentList" :key="comment.slug" class="comments">
            <Comment :comment="comment" @commentDeleted="onDelete()" />
        </div>
    </div>
</template>

<script>
    import Comment from './Comment';
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
            Comment
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

</style>