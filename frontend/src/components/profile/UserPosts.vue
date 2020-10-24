<template>
    <div class="container">
    </div>
</template>

<script>
    import {
        mapState,
    } from 'vuex';

    export default {
        name: "UserPosts",
        computed: {
            ...mapState(['currentUser, userProfile'])
        },
        data() {
            return {
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>