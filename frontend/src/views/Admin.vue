<template>
    <div class="container">
        <div class="row">
            <div class="col-6 border-right">
                <h3 class="text-center">Derniers commentaires</h3>
                <hr />
                <Comment @commentDeleted="refreshData" v-for="comment of lastComments" :key="comment.slug" :comment="comment" class="mx-2 text-white" />
            </div>
            <div class="col-6">
                <h3 class="text-center">Derniers inscrits</h3>
                <hr />
                 <UserCard @userDeleted="refreshData" v-for="user of filteredUsers" :key="user.slug" :user="user" class="mx-2 text-white" />
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getLastComments, 
        getLastUsers
    } from '@/js/fetchRequests';
    import Comment from '@/components/post/Comment';
    import UserCard from '@/components/post/UserCard';

    export default {
        name: "Admin",
        data() {
            return {
                lastComments: [],
                lastUsers: []
            }
        },
        computed:{
            filteredUsers(){
                return this.lastUsers.filter((user) => {
                    return !(user.slug.includes('admingroup'));
                })
            }
        },
        components: {
            Comment,
            UserCard
        },
        async beforeMount() {
            if (!(this.$store.state.currentUser.isAdmin)) {
                this.$router.push('/');
            } else {
                this.refreshData();
            }
        },
        methods:{
            async refreshData(){
                this.lastComments = await getLastComments();
                this.lastUsers = await getLastUsers();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>