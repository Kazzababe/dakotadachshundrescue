<template>
    <cc-modal name="upload-modal" @close="onClose">
        <template v-slot:header>{{ titles[stage] }}</template>
        <div class="content" :class="{ empty: stage === 0 && files.length === 0 }">
            <template v-if="stage === 0">
                
            </template>
            <template v-else-if="stage === 1">
                <!--<template v-for="image in imageFiles">
                    <img :src="getImageSrc(image)" alt />
                </template>-->
                <template v-if="files.length === 0">

                </template>
                <template v-else>
                    <div class="grid-containers">
                        <div class="image-grid grid">
                            <FilePreview v-for="file in imageFiles" :fileObject="{ file }" @delete="deleteFile(file)" />
                        </div>
                        <div class="file-grid grid">
                            <FilePreview v-for="file in nonImageFiles" :fileObject="{ file }" @delete="deleteFile(file)" />
                        </div>
                    </div>
                </template>
                <div class="upload-container" :class="{ bottom: files.length > 0 }">
                    <div class="upload-input">
                        <input id="file-upload2" type="file" @change="checkFile" multiple />
                        <label for="file-upload2">Select File</label>
                    </div>
                    <cc-button @click="stage = 1" v-if="imageFiles.length > 0 && nonImageFiles.length > 0">Next Step</cc-button>
                </div>
            </template>
            <template v-else-if="stage === 2">
                xd
            </template>
        </div>
    </cc-modal>
</template>

<style lang="scss" scoped>
    .content {
        display: flex;
        width: 800px;
        height: 600px;

        flex-direction: column;

        &.empty {
            align-items: center;
            justify-content: center;
        }

        .grid-containers {
            display: flex;
            height: 525px;

            .image-grid {
                border: 1px dashed black;

                > img {
                    max-height: 50px;
                    width: 100%;
                }
            }

            .grid {
                padding: 1rem;
                margin: 0.5rem;

                background-color: hsl(0, 0%, 99%);
                border: 2px dashed hsl(0, 0%, 91%);
                border-radius: 6px;

                flex: 1;
                flex-basis: 50%;

                overflow-y: auto;
            }
        }
        .upload-container {
            display: flex;

            justify-content: center;

            &.bottom {
                margin-top: auto;

                > .upload-input {
                    margin-right: 1rem;
                }
            }

            > .upload-input {
                > input {
                    display: none;
                }
                > label {
                    display: inline-block;
                    padding: 1rem 2rem;

                    font-family: 'Sims Sans', sans-serif;
                    font-size: 0.85rem;
                    font-weight: bold;
                    text-transform: uppercase;

                    background-color: white;
                    border: 1px solid hsla(0, 0%, 0%, 0.2);
                    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.25), 0 1px 2px hsla(0, 0%, 0%, 0.24);
                    border-radius: 1000px;
                    color: hsl(215, 61%, 42%);
                    outline: none;

                    cursor: pointer;
                    transition: all 0.25s ease-in-out;

                    &:hover {
                        box-shadow: 0 10px 20px hsla(0, 0%, 0%, 0.19), 0 6px 6px hsla(0, 0%, 0%, 0.23);
                    }
                }
            }
        }
    }
</style>

<script>
    import FilePreview from '@/components/upload/FilePreview.vue';

    const validImageTypes = ['image/png', 'image/jpeg'];

    export default {
        data: () => ({
            title: '',
            description: '',
            stage: 0,
            titles: ['Post Details', 'Upload Images', 'Upload Files', 'Finalize and Review'],
            files: [],
        }),
        methods: {
            onClose() {
                this.$router.push({ path: '/dashboard' });
            },
            checkFile(event) {
                for (let i = 0; i < event.target.files.length; i++) {
                    const file = event.target.files[i];
                    if (validImageTypes.includes(file.type)) {
                        if (this.imageFiles.length < 10) {
                            this.files.push(file);
                        } else {
                            // Disallow with error 'Too many images'
                        }
                    } else {
                        this.files.push(file);
                    }
                }
            },
            deleteFile(file) {
                console.log('pls delete');
                this.$delete(this.files, this.files.indexOf(file));
            },
        },
        computed: {
            imageFiles() {
                return this.files.filter(file => {
                    return validImageTypes.includes(file.type);
                });
            },
            nonImageFiles() {
                return this.files.filter(file => {
                    return !validImageTypes.includes(file.type);
                });
            },
        },
        components: {
            FilePreview,
        },
    };
</script>
