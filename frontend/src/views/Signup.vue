<template>
    <div class="d-flex justify-content-center row">
        <div class="signup p-2 p-lg-4 border border-dark rounded col-11 col-lg-6 col-xl-5">
            <h1 class="m-0">Inscrivez vous!</h1>
            <hr />
            <form class="d-flex flex-column justify-content-center" @submit.prevent="submitSignup()">
                <div class="form-group">
                    <label for="email">Adresse E-mail</label>
                    <input v-model="formObject.email" type="email" class="form-control" id="email">
                </div>
                <div class="form-group">
                    <label for="nickname">Pseudo</label>
                    <input v-model="formObject.nickname" type="input" class="form-control" id="nickname">
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input v-model="formObject.password" type="password" class="form-control" id="password">
                </div>
                <div class="form-group">
                    <label for="password">Répétez le mot de passe</label>
                    <input v-model="formObject.passwordRepeat" type="password" class="form-control" id="passwordRepeat">
                </div>
                <button type="submit" class="btn btn-primary mx-auto signup__btn">S'identifier</button>
                <div v-if="alertMessage" class="text-center alert alert-warning fade show signup__alert mt-3 fluid"
                    role="alert">
                    {{alertMessage}}
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import signup from '../js/signup';

    export default {
        name: 'Signup',
        data() {
            return {
                formObject: {
                    email: '',
                    password: '',
                    passwordRepeat: '',
                    nickname: ''
                },
                alertMessage: ''
            }
        },
        methods: {
            async submitSignup() {
                this.alertMessage = await signup(this.formObject);
            }
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