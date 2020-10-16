<template>
    <div class="d-flex justify-content-center row">
        <div class="signup p-2 p-lg-4 border border-dark rounded col-11 col-lg-6 col-xl-5">
            <h1 class="m-0">Inscrivez vous!</h1>
            <hr />
            <Identification :signingUp="true" />
        </div>
    </div>
</template>

<script>
    import Identification from '@/components/id/Identification';

    export default {
        name: 'Signup',
        components:{
            Identification
        }
    }
</script>

<style lang="scss" scoped>
    .signup {
        &__alert {
            text-shadow: none;
        }
    }
</style>