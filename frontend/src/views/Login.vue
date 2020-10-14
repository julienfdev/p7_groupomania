<template>
    <div class="d-flex justify-content-center">
        <div class="login p-2 p-lg-4 border border-dark rounded col-11 col-lg-6 col-xl-5">
            <h1 class="m-0">Identification</h1>
            <hr />
            <form class="d-flex flex-column justify-content-center" @submit.prevent="submitLogin()">
                <div class="form-group">
                    <label for="email">Adresse E-mail</label>
                    <input v-model="formObject.email" type="email" class="form-control" id="email">
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input v-model="formObject.password" type="password" class="form-control"
                        id="password">
                </div>
                <button type="submit" class="btn btn-primary mx-auto login__btn">S'identifier</button>
                <div v-if="alertMessage" class="text-center alert alert-warning fade show login__alert mt-3 fluid" role="alert">
                    {{alertMessage}}
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import login from '../js/login';

    export default {
        name: 'Login',
        data() {
            return {
                formObject: {
                    email: '',
                    password: ''
                },
                alertMessage: ''
            }
        },
        methods: {
            async submitLogin() {
                this.alertMessage = await login(this.formObject);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login{
        &__alert{
            text-shadow: none;
        }
    }
</style>