<template>
    <div class="row my-2 user__content border border-dark d-flex px-2 py-2">
        <div class="col">
            <div class="mr-3 comments__content__username">
                <span class="font-weight-bold">
                    {{user.nickname}}
                </span>
            </div>
            <div class="text-justify">{{user.email}}</div>
        </div>
        <div class="col-lg-2 text-center py-2">
            <button class="icon icon__trash mx-2" v-if="currentUser.isAdmin" @click="deleteUserRoutine" />
            <button class="icon icon__invisible" />

        </div>

    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    import {
        deleteUser
    } from "@/js/fetchRequests";

    export default {
        name: 'UserCard',
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapState(['currentUser'])
        },
        methods: {
            async deleteUserRoutine() {
                if (await deleteUser(this.user.slug, this.currentUser)) {
                    this.$emit('userDeleted');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user {
        &__content {
            border-radius: 1em;
            background-color: darken(#4b545c, 5);
        }
    }

    .icon {
        background-color: #fff;
        mask: center no-repeat;
        mask-size: 100%;
        height: 1.5em;
        width: 1.5em;
        transition: background-color 200ms ease-in-out;

        &__trash {
            mask-image: url('../../assets/icons/trash.svg');

            &:hover {
                background-color: #fbb;
            }
        }

        &__invisible {
            opacity: 0;
        }
    }
</style>