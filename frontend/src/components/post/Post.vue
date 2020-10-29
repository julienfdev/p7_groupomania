<template>
    <div class="col my-2">
        <h3 v-if="!editToggle">
            <router-link class="postlink" :to="`/post/${post.slug}`">
                {{(post.title.length > 60) ? post.title.slice(0, 60) + '...' : post.title }}
            </router-link>
        </h3>
        <EditBlock v-if="editToggle" :post="post" @deactivateEdit="editToggle = false" />
        <div class="d-flex justify-content-center">
            <img :src="post.image_url" :alt="post.title" class="img-fluid rounded shadow freezeframe"
                :class="post.slug" />
        </div>
        <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center mt-2 mb-0">
            <div class="d-flex align-items-center">
                <button class="icon icon__up mx-2" @click='like(post)'
                    :class="{icon__up__liked: (post.likedByCurrentUser && post.liked === true), icon__up__disabled: (post.likedByCurrentUser && post.liked === false)}" />
                <p class="mb-0 mt-2 font-weight-bold">{{post.likes}}</p>
                <button class="icon icon__down mx-2" @click="dislike(post)"
                    :class="{icon__down__disliked: (post.likedByCurrentUser && post.liked === false), icon__up__disabled: (post.likedByCurrentUser && post.liked === true)}" />

                <p v-if="post.userSlug !== 'nobody'" class="ml-4 mb-0 align-self-end">par <router-link
                        :to="`/user/${post.userSlug}`"><span class="font-weight-bold">{{post.userName}}</span>
                    </router-link>
                </p>
                <p v-else class="ml-4 mb-0 align-self-end">par <span class="font-weight-bold">{{post.userName}}</span>
                </p>

            </div>
            <div class="d-flex">
                <ToggleButton v-if="currentUser.isAdmin" v-model="hotStatus" class="mx-2 mb-0" name="Hot"
                    :value="hotStatus" :labels="{checked: 'Hot !', unchecked: 'Fresh'}" :width="70" :height="24"
                    :color="{checked: '#217185', unchecked: '#343a40'}" :font-size="12" @change="toggleEvent" />
                <button class="icon icon__trash mx-2" v-if="currentUser.isAdmin || (post.userSlug === currentUser.slug)"
                    @click="deletion(post)" />
                <button @click="editToggling" class="icon icon__edit mx-2" :class="{icon__edit__disabled: editToggle}"
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
    import {
        mapState
    } from 'vuex';
    import {
        likePost,
        deletePost,
        updatePost
    } from '../../js/fetchRequests';
    import {
        ToggleButton
    } from 'vue-js-toggle-button'
    import EditBlock from './EditBlock'
    import Freezeframe from 'freezeframe'

    export default {
        name: 'Post',
        components: {
            ToggleButton,
            EditBlock
        },
        data() {
            return {
                hotStatus: this.post.is_hot,
                editToggle: false,
            }
        },
        computed: {
            ...mapState(['currentUser']),
            uniqueClass() {
                return ('.' + this.post.slug)
            }
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
                if (await deletePost(post.slug, this.currentUser.slug)) {
                    // If we successfully deleted the post, we emit an element to the parent to handle it (either by refreshing the dataset or pushing the home page)
                    this.$emit('postDeleted');
                }
            },
            async toggleEvent(event) {
                const postObject = {
                    slug: this.post.slug,
                    is_hot: event.value
                }
                if (await !updatePost(postObject, null, this.currentUser)) {
                    this.hotStatus = !this.hotStatus;
                }
            },
            editToggling() {
                if (!this.editToggle) {
                    this.editToggle = true;
                }
            }
        },
        mounted() {
            if (this.post.image_url) {
                if (this.post.image_url.slice(-3) === 'gif') {
                    new Freezeframe({
                        selector: this.uniqueClass,
                        trigger: 'click',
                        overlay: true
                    })
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