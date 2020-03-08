<template>
    <cc-modal name="upload-modal" @close="onClose">
        <template v-slot:header>{{ titles[stage] }}</template>
        <template v-if="stage === 0">
            Stage 1 yo
        </template>
    </cc-modal>
</template>

<style lang="scss" scoped>

</style>

<script>
    export default {
        data: () => ({
            title: '',
            description: '',
            stage: 0,
            titles: [
                'Upload files',
                'Set post details',
                'Review and finalize',
            ]
        }),
        methods: {
            onClose() {
                this.$router.push({ path: '/dashboard' });
            },
        },
    };
</script>
