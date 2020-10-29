<template>
<!-- Identification form, signup or login depending on prop "signingUp" -->
    <form class="d-flex flex-column justify-content-center ident" @submit.prevent="submitSignup()">
        <div class="form-group">
            <label for="email">Adresse E-mail</label>
            <input v-model="formObject.email" type="email" class="form-control" id="email">
        </div>
        <div v-if="signingUp" class="form-group">
            <label for="nickname">Pseudo</label>
            <input v-model="formObject.nickname" type="input" class="form-control" id="nickname">
        </div>
        <div class="form-group">
            <label for="password">Mot de passe</label>
            <input v-model="formObject.password" type="password" class="form-control" id="password">
        </div>
        <div v-if="signingUp" class="form-group">
            <label for="password">Répétez le mot de passe</label>
            <input v-model="formObject.passwordRepeat" type="password" class="form-control" id="passwordRepeat">
        </div>
        <button type="submit"
            class="btn btn-primary mx-auto signup__btn">{{(signingUp)? 'S\'enregistrer' : 'S\'identifier' }}</button>
        <div v-if="alertMessage" class="text-center alert alert-warning fade show ident__alert mt-3 fluid" role="alert">
            {{alertMessage}}
        </div>
    </form>
</template>

<script>
    import login from '../../js/login'
    import signup from '../../js/signup';

    export default {
        name: 'Identification',
        props: {
            signingUp: {
                type: Boolean,
                required: true
            }
        },
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
                if (this.signingUp) {
                    this.alertMessage = await signup(this.formObject);
                } else {
                    this.alertMessage = await login(this.formObject);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ident {
        &__alert {
            text-shadow: none;
        }
    }
</style>