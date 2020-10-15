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
        <header class="container-fluid bg-dark navbar-container">
            <nav class="navbar navbar-dark navbar-expand-xl bg-dark navigation-clean-button text-light">
                <div class="container">
                    <router-link class="navbar-brand pr-2 mr-0" to='/'><img class="navbar-brand__logo"
                            src="@/assets/logos/icon.svg" alt="Logo" height="100px">LolGag</router-link>
                    <button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1">
                        <span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navcol-1">
                        <MenuList :items="menuItems" :logged="currentUser.logValid" :admin="currentUser.isAdmin" />
                        <div class="d-lg-block d-flex justify-content-between ml-lg-4">
                            <button v-if="currentUser.logValid" class="btn btn-primary mr-lg-3 navbutton"
                                @click.prevent="disconnect()">Poster une image</button>
                            <button v-if="currentUser.logValid" class="btn btn-primary navbutton"
                                @click.prevent="disconnect()">Se déconnecter</button>
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
    //import {closeMenu} from '../router/index';

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
            }
        }
    }
</script>

<style lang="scss" scoped>
    // Fonts
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

    .navbar-brand {
        font-size: 3em;
        font-family: 'Bebas Neue', cursive;
    }

    .navbutton {
        font-size: 1.1em;
    }
</style>