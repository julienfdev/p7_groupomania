<template>
<!-- contains information about the user and a delete button if the user logged appears to have the right to delete the User (double checked by the backend anyway) -->
    <div class="container border border-dark rounded">
        <div class="row p-2 p-lg-4 d-flex flex-lg-row flex-column align-items-center justify-content-between">
            <div class="d-flex align-items-center my-lg-0 mt-1 mb-3">
                <div class="user__pin border d-flex align-items-center justify-content-center">
                    {{userProfile.nickname.slice(0,1)}}</div>
                <h2 class="pt-3 ml-1 user__name">{{userProfile.nickname.slice(1)}}</h2>
            </div>
            <div>
                Inscrit depuis le <span class="font-weight-bold">{{dateInscription}}</span>
            </div>
        </div>
        <div v-if="userProfile.showExtended">
            <hr />
            <div class="row text-center justify-content-center mb-3">
                <button class="btn btn-danger" @click="deleteUserRoutine">Supprimer le profil</button>
            </div>
            <DeleteModal />
        </div>
    </div>
</template>

<script>
    import {
        mapState,
    } from 'vuex';
    import DeleteModal from './DeleteModal';

    export default {
        name: "InfoBlock",
        computed: {
            ...mapState(['currentUser', 'userProfile']),
            dateInscription() {
                const dateCreation = new Date(this.userProfile.createdAt);
                const options = {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                };
                return dateCreation.toLocaleDateString('fr-fr', options);
            }
        },
        data() {
            return {}
        },
        components: {
            DeleteModal
        },
        methods: {
            deleteUserRoutine() {
                window.$('#deleteModal').modal({
                    show: true
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../sass/vendors/overrides";

    .user {
        &__pin {
            border-radius: 50%;
            padding-top: 0.2em;
            width: 1.5em;
            height: 1.5em;
            font-size: 4em;
            background-color: $primary;
            ;
        }

        &__name {
            max-width: 75%;
            font-size: 1.7em;
        }
    }
</style>