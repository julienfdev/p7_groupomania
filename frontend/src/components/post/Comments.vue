<template>
    <div>
        <h4>Commentaires</h4>
        <div v-for="comment in commentArray" :key="comment.index" class="comments">
            <div class="row my-2 comments__content border border-dark">
                <div class="col-lg-10 d-flex py-2 px-3">
                    <div class="mr-3 comments__content__username">
                        <span class="font-weight-bold">{{comment.userName}} :</span>
                    </div>
                    <div class="comments__content__text text-justify"> {{comment.text}}</div>
                </div>
                <div class="col-lg-2 text-center my-2">
                    <button class="icon icon__trash mx-2"
                        v-if="currentUser.isAdmin || (comment.userSlug === currentUser.slug)" @click="deletion(comment)" />
                    <button class="icon icon__edit mx-2"
                        v-if="currentUser.isAdmin || (comment.userSlug === currentUser.slug)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

    export default {
        name: 'Comments',
        props: {
            commentArray: {
                type: Array,
                required: true
            }
        },
        computed:{
            ...mapState(['currentUser'])
        },
        methods: {
            async deletion(comment){
                console.log(comment)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comments {
        &__content {
            border-radius: 1em;

            &__username {
                min-width: 30%;
                flex-shrink: 0;
            }

            &__text {
                max-width: 70%;
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
        }

        &__trash {
            mask-image: url('../../assets/icons/trash.svg');

            &:hover {
                background-color: #fbb;
            }
        }
    }
</style>