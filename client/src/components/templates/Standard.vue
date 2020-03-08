<template>
    <div class="base-template">
        <div class="page-wrapper">
            <div class="page-content" :class="{ space: nav }">
                <Topnav v-if="nav" />
                <slot />
                <!-- FOOTER -->
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .base-template {
        position: relative;

        width: 100%;
        height: 100%;

        > .page-wrapper {
            display: flex;
            height: 100%;
            min-height: 100%;

            flex-direction: column;

            > .page-content {
                display: flex;

                flex: 1 0 auto;
                flex-direction: column;

                &.space {
                    margin-top: 3.5rem;
                }
            }
        }
    }
</style>

<script>
    import Topnav from '@/components/structure/Topnav.vue';

    export default {
        props: {
            nav: {
                type: Boolean,
                default: true,
            },
            footer: {
                type: Boolean,
                default: true,
            },
        },
        components: {
            Topnav,
        },
    };
</script>
