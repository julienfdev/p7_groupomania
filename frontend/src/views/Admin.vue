<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "Admin",
        beforeMount() {
            if(!(this.$store.state.currentUser.isAdmin)){
                this.$router.push('/');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>