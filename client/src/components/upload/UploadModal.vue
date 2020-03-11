<template>
    <cc-modal name="upload-modal" @close="onClose">
        <template v-slot:header>{{ titles[stage] }}</template>
        <div class="content">
            <component :is="component" />
        </div>
    </cc-modal>
</template>

<style lang="scss" scoped>
    .content {
        width: 800px;
        height: 600px;
    }
</style>

<script>
    import PostDetails from '@/components/upload/stages/PostDetails.vue';

    export default {
        props: {
            stage: String,
        },
        data() {
            return {
                titles: ['Upload files', 'Set post details', 'Review and finalize'],
                currentStage: this.stage ? parseInt(this.stage) : undefined,
            };
        },
        created() {
            if (this.currentStage < 0 || this.currentStage > 0 || isNaN(this.stage)) {
                this.$router.push({ path: '/dashboard/upload/0' });
            }
        },
        methods: {
            onClose() {
                this.$router.push({ path: '/dashboard' });
            },
        },
        computed: {
            component() {
                if (this.currentStage === 0) {
                    return PostDetails;
                }
            },
        },
    };
</script>
