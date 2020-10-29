<template>
    <div class="container">
        <div class="display-4 text-center">404!</div>
    </div>
</template>

<script>
    export default {
        mounted() {
            setTimeout(() => {
                this.$router.go(-1);
            },2000)
        }
    }
</script>

<style lang="scss" scoped>

</style>