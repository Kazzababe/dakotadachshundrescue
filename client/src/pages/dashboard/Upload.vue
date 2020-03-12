<template>
    <s-template>
        <template v-slot:header>{{ titles[stage] }}</template>
        <div class="content">
            <keep-alive>
                <component :is="component" @setStage="setStage" />
            </keep-alive>
        </div>
    </s-template>
</template>

<style lang="scss" scoped>
    .content {
        width: 800px;
        height: 600px;
    }
</style>

<script>
    import PostDetails from '@/components/upload/stages/PostDetails.vue';
    import ImageSelect from '@/components/upload/stages/ImageSelect.vue';

    export default {
        props: {
            stage: String,
        },
        data() {
            return {
                titles: ['Post Details', 'Select images'],
                currentStage: this.stage ? parseInt(this.stage) : undefined,
                images: [],
            };
        },
        created() {
            if (this.currentStage < 0 || this.currentStage > 1 || isNaN(this.stage)) {
                this.$router.push({ path: '/dashboard/upload/0' });
                this.currentStage = 0;
            }
        },
        methods: {
            setStage(stage) {
                this.$router.push({ path: `/dashboard/upload/${stage}` });
                this.currentStage = stage;
            },
            updateImages(images) {
                this.images = images;
            },
        },
        computed: {
            component() {
                if (this.currentStage === 0) {
                    return PostDetails;
                } else if (this.currentStage === 1) {
                    return ImageSelect;
                }
            },
        },
    };
</script>
