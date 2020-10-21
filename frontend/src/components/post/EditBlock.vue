<template>
    <div class="d-flex mb-2 justify-content-between">
        <input type="text" class="col-9 border bg-dark text-light border-dark rounded" v-model="currentTitle">
        <div class="col-3 justify-content-end d-flex">
            <button @click="cancelEdit" class="btn btn-secondary col-4 d-flex justify-content-center">
                <div class="icon icon__cancel" /></button>
            <button @click="validateEdit" class="btn btn-primary col-4 ml-2  d-flex justify-content-center">
                <div class="icon icon__check" /></button>
        </div>
    </div>
</template>

<script>
    import {
        updatePost
    } from "@/js/fetchRequests";

    export default {
        name: "EditBlock",
        data() {
            return {
                currentTitle: ""
            }
        },
        props: {
            post: {
                required: true,
                type: Object
            }
        },
        beforeMount() {
            this.currentTitle = this.post.title
        },
        methods: {
            cancelEdit() {
                this.currentTitle = this.post.title;
                this.$emit("deactivateEdit");
            },
            async validateEdit() {
                try {
                    if (this.currentTitle !== this.post.title) {
                        const updateObject = {
                            title: this.currentTitle,
                            slug: this.post.slug
                        };
                        const validatedEdit = await updatePost(updateObject, null, this.$store.state.currentUser);
                        if (validatedEdit) {
                            this.post.slug = validatedEdit
                            this.post.title = this.currentTitle;
                            this.
                            this.$emit("deactivateEdit");
                        } else {
                            this.cancelEdit();
                        }
                    } else {
                        throw "error";
                    }
                } catch (error) {
                    this.cancelEdit();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    input[type="text"] {
        background-color: #aaa;
        height: 1.4em;
        font-size: 1.8em;
        font-style: italic;

    }

    button {
        padding: 0;
        align-items: center;
    }

    .icon {
        background-color: #fff;
        mask: center no-repeat;
        mask-size: 100%;
        height: 2em;
        width: 2em;
        transition: background-color 200ms ease-in-out;

        &__cancel {
            mask-image: url('../../assets/icons/cancel.svg');
        }

        &__check {
            mask-image: url('../../assets/icons/check.svg');
        }
    }
</style>