<template>
    <!--
    Requires Vuex with a menuItems array in store state
    menuItems: [
    {
        name: String,
        text: String,
        root: String,
        active: Boolean,
        showLog: Boolean
    },...
    ]
    
 -->
    <div>
        <header class="container-fluid navbar-container">
            <nav class="navbar navbar-dark navbar-expand-xl navigation-clean-button text-light">
                <div class="container">
                    <span class="navbar-brand pr-2 mr-0"><img class="navbar-brand__logo" src="@/assets/logos/icon.svg"
                            alt="Logo Groupomania" height="100px">
                        <h1>
                            Groupomania
                        </h1>
                    </span>
                    <button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1">
                        <span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navcol-1">
                        <MenuList :items="menuItems" :logged="currentUser.logValid" :admin="currentUser.isAdmin" />
                        <div class="d-lg-block d-flex justify-content-between ml-lg-4">
                            <button v-if="currentUser.logValid" class="btn btn-primary mr-lg-3 navbutton"
                                @click="addPost()">Poster</button>
                            <button v-if="currentUser.logValid" class="btn btn-primary navbutton"
                                @click.prevent="disconnect()">Deconnexion</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    import MenuList from './navbar/MenuList';
    import {
        getCategories
    } from '../js/fetchRequests';

    export default {
        name: 'Navbar',
        data() {
            return {

            }
        },
        computed: {
            ...mapState(['menuItems', 'currentUser'])
        },
        components: {
            MenuList
        },
        methods: {
            async disconnect() {
                this.$store.commit('USER_SET_VALID', false);
                localStorage.removeItem('currentUser');
                this.$router.push('/login');
            },
            async addPost() {
                this.$store.commit('CATEGORIES_POPULATE', await getCategories());
                window.$('#addPostModal').modal({
                    backdrop: 'static',
                    show: true
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    // Fonts
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    @import '@/sass/vendors/_overrides';

    .navbar-container {
        background-color: darken($secondary, 50);
    }

    .navbar-brand {
        font-size: 3em;
        font-family: 'Bebas Neue', cursive;

        & h1 {
            display: inline;
        }
    }

    .navbutton {
        font-size: 1.1em;
    }
</style>