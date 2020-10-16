<template>
    <div class="col my-2">
        <h3>
            <router-link class="postlink" :to="`/post/${post.slug}`">
                {{(post.title.length > 60) ? post.title.slice(0, 60) + '...' : post.title }}</router-link>
        </h3>
        <div class="d-flex justify-content-center">
            <img :src="post.image_url" :alt="post.title" class="img-fluid rounded shadow" />
        </div>
        <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center mt-2">
            <div class="d-flex">
                <button class="icon icon__up mx-2" @click='like(post)'
                    :class="{icon__up__liked: (post.likedByCurrentUser && post.liked === true), icon__up__disabled: (post.likedByCurrentUser && post.liked === false)}" />
                <p class="mb-0 mt-1 font-weight-bold">{{post.likes}}</p>
                <button class="icon icon__down mx-2" @click="dislike(post)"
                    :class="{icon__down__disliked: (post.likedByCurrentUser && post.liked === false), icon__up__disabled: (post.likedByCurrentUser && post.liked === true)}" />
                <p class="ml-4">par <span class="font-weight-bold">{{post.userName}}</span></p>
            </div>
            <div class="d-flex">
                <button class="icon icon__trash mx-2"
                    v-if="currentUser.isAdmin || (post.userSlug === currentUser.slug)" @click="deletion(post)"/>
                <button class="icon icon__edit mx-2"
                    v-if="currentUser.isAdmin || (post.userSlug === currentUser.slug)" />
                <router-link :to="`/post/${post.slug}`">
                    <div class="icon icon__comment mx-2" />
                </router-link>
            </div>

            <!-- AJOUTER BOUTONS EDIT ET DELETE EN V-IF -->
            <!-- FREEZEFRAME -->
        </div>
        <hr />
    </div>
</template>

<script>
import {mapState} from 'vuex';
    import {
        likePost, deletePost
    } from '../../js/fetchRequests';


    export default {
        name: 'Post',
        data() {
            return {
            }
        },
        computed: {
            ...mapState(['currentUser'])
        },
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        methods: {
            async like(post) {
                if (post.likedByCurrentUser && post.liked === true) {
                    if (await likePost(post.slug, this.currentUser.slug, 0)) {
                        post.likes--;
                        post.likedByCurrentUser = false;
                    }
                } else if (!post.likedByCurrentUser) {
                    if (likePost(post.slug, this.currentUser.slug, 1)) {
                        post.likes++;
                        post.likedByCurrentUser = true;
                        post.liked = true;
                    }
                }
            },
            async dislike(post) {
                if (post.likedByCurrentUser && post.liked === false) {
                    if (await likePost(post.slug, this.currentUser.slug, 0)) {
                        post.likes++;
                        post.likedByCurrentUser = false;
                    }
                } else if (!post.likedByCurrentUser) {
                    if (await likePost(post.slug, this.currentUser.slug, -1)) {
                        post.likes--;
                        post.likedByCurrentUser = true;
                        post.liked = false;
                    }
                }
            },
            async deletion(post) {
                if(await deletePost(post.slug, this.currentUser.slug)){
                    // If we successfully deleted the post, we emit an element to the parent to handle it (either by refreshing the dataset or pushing the home page)
                this.$emit('postDeleted');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    h3 {
        font-style: italic;
    }

    img {
        object-fit: cover;
        min-width: 100%;
    }

    .icon {
        background-color: #fff;
        mask: center no-repeat;
        mask-size: 100%;
        height: 1.5em;
        width: 1.5em;
        transition: background-color 200ms ease-in-out;

        &__up {
            mask-image: url('../../assets/icons/thumbsUp.svg');

            &:hover {
                background-color: #6f6;
            }

            &__liked {
                background-color: #6f6;
            }

            &__disabled {
                background-color: #aaa;

                &:hover {
                    background-color: #aaa !important;
                }
            }
        }

        &__down {
            mask-image: url('../../assets/icons/thumbsDown.svg');

            &:hover {
                background-color: #f66;
            }

            &__disliked {
                background-color: #f66;
            }

            &__disabled {
                background-color: #aaa;

                &:hover {
                    background-color: #aaa !important;
                }
            }
        }

        &__comment {
            mask-image: url('../../assets/icons/comment.svg');

            &:hover {
                background-color: #bbf;
            }
        }

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

    a {
        color: #fff;
        transition: color 150ms ease-in-out;

        &:hover {
            text-decoration: none;
            color: #aaa;
        }
    }

    button {
        border: none;
    }
</style>