<template>
    <div class="container">
        <InfoBlock />
        <hr />
        <UserPosts />
    </div>
</template>

<script>
    import UserPosts from '@/components/profile/UserPosts';
    import InfoBlock from '@/components/profile/InfoBlock';
    import {
        mapActions, mapState
    } from 'vuex';
    import {
        getUser
    } from '@/js/fetchRequests';

    export default {
        name: "Profile",
        components: {
            UserPosts,
            InfoBlock
        },
        computed: {
            ...mapState(['currentUser'])
        },
        async beforeMount() {
            const profile = await getUser(this.$route.params.slug);
            if (profile) {
                if (this.currentUser.isAdmin || (this.currentUser.slug === this.$route.params.slug)) {
                    profile.user.showExtended = true;
                }
                this.setProfile(profile.user);
            } else {
                this.$router.push('/error/404');
            }
        },
        methods: {
            ...mapActions(['setProfile'])
        }
    }
</script>

<style lang="scss" scoped>

</style>