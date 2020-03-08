<template>
    <s-template>
        dashboard {{ upload }}
        <UploadModal v-if="upload" />
    </s-template>
</template>

<style lang="scss" scoped></style>

<script>
    import UploadModal from '@/components/upload/UploadModal.vue';

    export default {
        props: {
            upload: {
                type: Boolean,
                default: false,
            },
        },
        components: {
            UploadModal,
        },
    };
</script>
