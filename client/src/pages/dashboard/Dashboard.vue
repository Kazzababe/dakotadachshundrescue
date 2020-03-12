<template>
    <s-template>
        dashboard {{ upload }}
        <UploadModal v-if="upload" :stage="stage" />
    </s-template>
</template>

<style lang="scss" scoped></style>

<script>
    import UploadModal from '@/components/upload/UploadModal.vue';

    export default {
        props: {
            stage: {
                type: String,
                default: undefined,
            },
        },
        data: () => ({
            upload: false,
        }),
        created() {
            this.upload = this.stage !== undefined;
        },
        components: {
            UploadModal,
        },
    };
</script>
