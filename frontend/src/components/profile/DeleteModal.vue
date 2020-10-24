<template>
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Suppression</h5>
                </div>
                <div class="modal-body">
                    <h5 class="row px-3">Voulez vous vraiment supprimer {{pronoun}} profil?</h5>
                    <div class="col" v-if="selfDelete">
                        <div class="form-group">
                            <label for="confirmPassword">Entrez votre mot de passe pour confirmer</label>
                            <input type="password" name="password" id="confirmPassword">
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="deleteRoutine" type="button" class="btn btn-danger">Confirmer</button>
                    <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    import {
        deleteUser
    } from '@/js/fetchRequests';

    export default {
        name: "DeleteModal",
        data() {
            return {}
        },
        computed: {
            ...mapState(['currentUser', 'userProfile']),
            pronoun() {
                return (this.currentUser.slug === this.userProfile.slug) ? 'votre' : 'ce'
            },
            selfDelete() {
                return (this.currentUser.slug === this.userProfile.slug)
            }
        },
        methods: {
            closeModal() {
                window.$('#deleteModal').modal('hide');
            },
            async deleteRoutine() {
                const passwordField = this.$el.querySelector('#confirmPassword');
                if (await deleteUser(this.userProfile.slug, this.currentUser, (passwordField) ? passwordField
                        .value : undefined)) {
                    window.$('#deleteModal').modal('hide');
                    if (this.userProfile.slug === this.currentUser.slug) {
                        localStorage.removeItem('currentUser');
                    }
                }
                this.$router.push('/');
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../sass/vendors/overrides';

    .modal {
        color: black;
        text-shadow: none;
    }
</style>