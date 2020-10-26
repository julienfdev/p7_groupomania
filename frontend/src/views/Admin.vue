<template>
    <div class="container">
        <div class="row">
            <div class="col-6 border-right">
                <h3 class="text-center">Derniers commentaires</h3>
                <hr />
                <Comment v-for="comment of lastComments" :key="comment.slug" :comment="comment" class="mx-2 text-white" />
            </div>
            <div class="col-6">
                <h3 class="text-center">Derniers inscrits</h3>
                <hr />
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getLastComments
    } from '@/js/fetchRequests';
    import Comment from '@/components/post/Comment';

    export default {
        name: "Admin",
        data() {
            return {
                lastComments: []
            }
        },
        components: {
            Comment
        },
        async beforeMount() {
            if (!(this.$store.state.currentUser.isAdmin)) {
                this.$router.push('/');
            } else {
                this.lastComments = await getLastComments();
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>