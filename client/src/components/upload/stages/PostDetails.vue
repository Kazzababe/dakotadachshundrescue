<template>
    <div class="stage-container">
        <cc-input v-model="title" placeholder="Enter post title..." />
        <cc-input v-model="description" placeholder="Enter post description..." type="textarea" class="description" />
    </div>
</template>

<style lang="scss" scoped>
    .stage-container {
        > .description /deep/ textarea {
            height: 300px;

            resize: none;
        }
    }
</style>

<script>
    let saveTimer;

    export default {
        data: () => ({
            title: '',
            description: '',
            category: 0,
        }),
        created() {
            if (this.$cookies.isKey('title_draft')) {
                this.title = this.$cookies.get('title_draft');
            }
            if (this.$cookies.isKey('description_draft')) {
                this.description = this.$cookies.get('description_draft');
            }
        },
        destroyed() {

        },
        methods: {
            beginSaveDetails() {
                if (saveTimer) {
                    saveTimer = clearTimeout(saveTimer);
                }
                saveTimer = setTimeout(this.saveDetails, 2500);
            },
            saveDetails() {
                this.$cookies.set('title_draft', this.title, '1d');
                this.$cookies.set('description_draft', this.description, '1d');
            },
        },
        watch: {
            title() {
                this.beginSaveDetails();
            },
            description() {
                this.beginSaveDetails();
            },
        },
    };
</script>
