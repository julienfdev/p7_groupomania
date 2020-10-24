<template>
    <div class="d-flex mb-2 justify-content-between">
        <input type="text" class="border bg-dark text-light border-dark mr-2 mr-lg-3 shadow-sm flex-grow-1" v-model="currentText">
        <div class=" justify-content-end d-flex">
            <button @click="cancelEdit" class="btn btn-secondary col-6 d-flex shadow-sm justify-content-center">
                <div class="icon icon__cancel" /></button>
            <button @click="validateEdit" class="btn btn-primary col-6 ml-1 ml-lg-2 d-flex  shadow-sm justify-content-center">
                <div class="icon icon__check" /></button>
        </div>
    </div>
</template>

<script>
    import {
        updateComment, getPost
    } from "@/js/fetchRequests";
    import {mapActions, mapState} from 'vuex';

    export default {
        name: "EditComment",
        data() {
            return {
                currentText: ""
            }
        },
        props: {
            comment: {
                required: true,
                type: Object
            }
        },
        beforeMount() {
            this.currentText = this.comment.text
        },
        computed:{
            ...mapState(['currentPost'])
        },
        methods: {
            cancelEdit() {
                this.currentText = this.comment.text;
                this.$emit("deactivateEdit");
            },
            async validateEdit() {
                try {
                    if (this.currentText !== this.comment.text) {
                        const updateObject = {
                            text: this.currentText,
                            slug: this.comment.slug
                        };
                        const validatedEdit = await updateComment(updateObject, this.$store.state.currentUser);
                        if (validatedEdit) {
                            this.setPost((await getPost(this.$route.params.slug)));
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
            },
            ...mapActions(['setPost'])
        }
    }
</script>

<style lang="scss" scoped>
input[type="text"] {
        background-color: #aaa;
        height: 1.4em;
        font-size: 1em;
        padding-top : 0.2em;
        border-radius: 1em;
    }

    button {
        padding: 0;
        align-items: center;
    }

    .icon {
        background-color: #fff;
        mask: center no-repeat;
        mask-size: 100%;
        height: 1em;
        width: 1em;
        transition: background-color 200ms ease-in-out;

        &__cancel {
            mask-image: url('../../assets/icons/cancel.svg');
        }

        &__check {
            mask-image: url('../../assets/icons/check.svg');
        }
    }
</style>