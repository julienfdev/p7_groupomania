<template>
    <div class="modal fade" id="addPostModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Poster une image</h5>
                </div>
                <form class="form" id="addPostForm" novalidate @submit.prevent>
                    <div class="modal-body">
                        <div class="form-row">
                            <div class="col">
                                <div class="col">
                                    <div class="form-group">
                                        <label class="form__title" for="addPostTitle">Titre</label>
                                        <input class="form-control" type="text" name="addPostTitle" id="addPostTitle">
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center">
                            <div class="previewer m-0 p-0 shadow d-flex flex-column">
                                <img src="@/assets/image-placeholder.jpg" alt="Image" class="img-fluid"
                                    id='filePreviewer'>
                                <div class="form-group m-0">
                                    <label class='fileSelector__label text-center text-white m-0 p-0'
                                        for="fileSelector">Ajouter</label>
                                    <input type="file" name="fileSelector" id="fileSelector" class="fileSelector"
                                        @change="previewImage" multiple="false"
                                        accept="image/jpg, image/jpeg, image/png, image/gif">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Poster</button>
                        <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddModal",
        methods: {
            previewImage(files) {
                const acceptedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
                const maxSize = 1024 * 1024;
                const reader = new FileReader();
                const fileUploaded = files.target.files[0];
                if (acceptedTypes.includes(fileUploaded.type) && !(maxSize < fileUploaded.size)) {
                    reader.readAsDataURL(fileUploaded);
                } else {
                    document.querySelector('#fileSelector').value = null;
                }
                reader.onload = () => {
                    const img = document.querySelector('#filePreviewer');
                    img.setAttribute('src', reader.result);
                }
            },
            closeModal() {
                document.querySelector('#addPostForm').reset();
                document.querySelector('#fileSelector').value = null;
                const img = document.querySelector('#filePreviewer');
                img.setAttribute('src', require('@/assets/image-placeholder.jpg'));

                window.$('#addPostModal').modal('hide');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../sass/vendors/overrides';

    .modal {
        color: black;
        text-shadow: none;
    }

    .previewer {
        width: 75%;
        border-radius: 1em;
        border: 1px solid #aaa;
        overflow: hidden;
    }

    .fileSelector {
        width: 70%;
        height: 0px;
        position: absolute;
        left: 15%;
        //z-index: -1;

        &__label {
            position: relative;
            ;
            display: flex;
            width: 100%;
            height: 3em;
            background-color: $primary;
            align-items: center;
            justify-content: center;
            font-size: 1.5em;
            transition: background-color 200ms ease-in-out;

            &:hover {
                background-color: darken($primary, 10);
            }
        }

        #filePreviewer {
            object-fit: cover;
        }

        .form {
            &__title {
                width: 100%;
            }
        }
    }
</style>