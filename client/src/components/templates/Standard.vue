<template>
    <div class="base-template">
        <div class="page-wrapper">
            <div class="page-content">
                <!-- TOPNAV -->
                <slot />
                <!-- FOOTER -->
            </div>
        </div>
    </div>
</template>

<style lang="scss">
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
            }
        }
    }
</style>

<script>
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
    };
</script>