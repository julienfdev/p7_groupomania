<template>
    <div class="d-flex justify-content-center">
        <div class="login p-2 p-lg-4 border border-dark rounded col-11 col-lg-6 col-xl-5">
            <h1 class="m-0">Identification</h1>
            <hr />
            <Identification :signingUp="false" />
        </div>
    </div>
</template>

<script>
    import Identification from '../components/id/Identification';

    export default {
        name: 'Login',
        components: {
            Identification
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        &__alert {
            text-shadow: none;
        }
        &.col-xl-5{
            max-width: 600px;
        }
    }
</style>