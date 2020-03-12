<template>
    <div class="stage-container">
        <input type="file" @change="onChange" />
    </div>
</template>

<style lang="scss" scoped></style>

<script>
    /**
     * 1. Select files
     * 2. Upload files,
     * 3.
     */
    const validImageTypes = ['image/png', 'image/jpeg', 'image/gif'];

    export default {
        data: () => ({
            images: [],
        }),
        methods: {
            onChange(event) {
                for (let i = 0; i < event.target.files; i++) {
                    const file = event.target.files[i];
                    if (file.type && validImageTypes.includes(file.type)) {
                        const data = {
                            file,
                            progress: 0,
                            stage: 0,
                        };
                        this.images.push(data);
                        this.uploadFile(data);
                    }
                }
            },
            uploadFile(file) {

            },
        },
    };
</script>
