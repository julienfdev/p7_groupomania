<template>
    <div class="col my-2">
        <h3>
            <router-link class="postlink" :to="`post/${post.slug}`">
                {{(post.title.length > 40) ? post.title.slice(0, 40) + '...' : post.title }}</router-link>
        </h3>
        <div class="d-flex justify-content-center">
            <img :src="post.image_url" :alt="post.title" class="img-fluid rounded shadow" />
        </div>
        <div class="d-flex justify-content-between mt-2">
            <div class="d-flex">
                <button class="icon icon__up mx-2"></button>
                <p class="mb-0 mt-1 font-weight-bold">{{post.likes}}</p>
                <button class="icon icon__down mx-2"></button>
            </div>
            <router-link :to="`/post/${post.slug}`">
                <div class="icon icon__comment mx-2" />
            </router-link>
            <!-- AJOUTER BOUTONS EDIT ET DELETE EN V-IF -->
            <!-- FREEZEFRAME -->
        </div>
        <hr />
    </div>
</template>

<script>
    export default {
        name: 'Post',
        props: {
            post: {
                type: Object,
                required: true
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
        }

        &__down {
            mask-image: url('../../assets/icons/thumbsDown.svg');

            &:hover {
                background-color: #f66;
            }
        }

        &__comment {
            mask-image: url('../../assets/icons/comment.svg');

            &:hover {
                background-color: #bbf;
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