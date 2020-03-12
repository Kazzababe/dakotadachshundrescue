<template>
    <div class="container">
        <div
            class="icon-container noselect"
            :class="{ hover }"
            @mouseenter="hover = true"
            @mouseleave="hover = false"
            @click="deleteFile"
        >
            <fa-icon :icon="hover ? 'times' : type" fixed-width />
        </div>
        <div class="info">
            <p class="name">{{ file.name }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        display: flex;
        padding: 0.5rem 0;
        max-width: 100%;

        &:first-child {
            padding-top: 0;
        }
        &:last-child {
            padding-bottom: 0;
        }

        align-items: center;

        > .icon-container {
            height: 3rem;
            padding-right: 1rem;

            font-size: 3rem;
            line-height: 3rem;

            color: hsl(210, 9%, 40%);

            &.hover {
                color: red;

                cursor: pointer;
            }
        }
        > .info {
            min-width: 0;

            > .name {
                font-weight: bold;
                text-overflow: ellipsis;
                white-space: nowrap;

                color: hsl(210, 9%, 27%);

                overflow: hidden;
            }
        }
    }
</style>

<script>
    const validImageTypes = ['image/png', 'image/jpeg'];

    export default {
        props: {
            fileObject: {
                type: Object,
                default: undefined,
            },
        },
        data: () => ({
            hover: false,
        }),
        methods: {
            deleteFile() {
                if (this.hover) {
                    this.$emit('delete');
                }
            },
        },
        computed: {
            file() {
                console.log(this.fileObject);
                return this.fileObject.file;
            },
            imageSrc() {
                return URL.createObjectURL(this.file);
            },
            type() {
                if (this.file.type && validImageTypes.includes(this.file.type)) {
                    return 'image';
                } else {
                    const ext = this.file.name.substring(this.file.name.lastIndexOf('.') + 1);
                    if (ext === 'zip' || ext === 'rar') {
                        return 'file-archive';
                    } else if (ext === 'package' || ext === 'ts4script') {
                        return 'file-code';
                    }
                    return 'file-alt';
                }
            },
        },
    };
</script>
