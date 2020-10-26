<template>
    <div class="row my-2 comments__content border border-dark d-flex px-2 py-2">
        <div class="col">
            <div class="mr-3 comments__content__username">
                <span class="font-weight-bold">
                    <router-link :to="`/user/${comment.userSlug}`">{{comment.userName}} :</router-link>
                </span>
            </div>
            <div v-if='!editToggle' class="text-justify"> {{comment.text}}</div>
            <EditComment class="" :comment='comment' v-if="editToggle" @deactivateEdit="editToggle = false" />
        </div>
        <div class="col-lg-2 text-center py-2">
            <button class="icon icon__trash mx-2" v-if="currentUser.isAdmin || (comment.userSlug === currentUser.slug)"
                @click="deletion(comment)" />
            <button class="icon icon__edit mx-2" :class="{icon__edit__disabled: editToggle}"
                v-if="currentUser.isAdmin || (comment.userSlug === currentUser.slug)" @click='editToggling' />
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    import EditComment from './EditComment';
    import {
        deleteComment
    } from '@/js/fetchRequests';

    export default {
        name: "Comment",
        data() {
            return {
                editToggle: false
            }
        },
        computed: {
            ...mapState(['currentUser'])
        },
        components: {
            EditComment
        },
        props: {
            comment: {
                type: Object,
                required: true
            }
        },
        methods: {
            editToggling() {
                if (!this.editToggle) {
                    this.editToggle = true;
                }
            },
            async deletion(comment) {
                if (await deleteComment(comment, this.currentUser)) {
                    this.$emit('commentDeleted');
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .comments {
        &__content {
            border-radius: 1em;
            background-color: darken(#4b545c, 5);
        }

        a {
            color: #fff;
            transition: color 150ms ease-in-out;

            &:hover {
                text-decoration: none;
                color: #aaa;
            }
        }
    }

    .icon {
        background-color: #fff;
        mask: center no-repeat;
        mask-size: 100%;
        height: 1.5em;
        width: 1.5em;
        transition: background-color 200ms ease-in-out;

        &__edit {
            mask-image: url('../../assets/icons/edit.svg');

            &:hover {
                background-color: #bbf;
            }

            &__disabled {
                background-color: #aaa;

                &:hover {
                    background-color: #aaa !important;
                    cursor: default;
                }
            }
        }

        &__trash {
            mask-image: url('../../assets/icons/trash.svg');

            &:hover {
                background-color: #fbb;
            }
        }
    }
</style>