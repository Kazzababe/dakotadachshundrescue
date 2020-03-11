<template>
    <transition name="fade" @enter="visible = true" appear>
        <div class="overlay-mask" @click="close">
            <transition name="slide">
                <div class="modal-container" v-if="visible" @click.stop>
                    <div class="modal">
                        <header>
                            <h3 class="title"><slot name="header" /></h3>
                            <fa-icon class="close-icon" icon="times" @click="close" />
                        </header>
                        <main>
                            <slot />
                        </main>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
    .slide-enter-active,
    .slide-leave-active {
        transition: all 0.4s;
    }
    .slide-enter,
    .slide-leave-to {
        margin-top: -20px;
        opacity: 0;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .overlay-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background-color: hsla(0, 0%, 0%, 0.4);

        align-items: center;
        justify-content: center;

        > .modal-container {
            position: absolute;
            left: 50%;
            top: 50%;

            min-width: 600px;

            transform: translate(-50%, -50%);

            > .modal {
                background-color: white;
                border-radius: 6px;
                box-shadow: 0 3px 6px hsla(0, 0%, 0%, 0.16), 0 3px 6px hsla(0, 0%, 0%, 0.23);

                > header {
                    display: flex;
                    padding: 1rem;

                    border-bottom: 1px solid hsl(210, 14%, 89%);
                    color: hsl(222, 14%, 15%);

                    align-items: center;
                    justify-content: space-between;

                    > .title {
                        margin: 0;
                    }
                    > .close-icon {
                        padding: 0.5rem;

                        font-size: 1.25rem;

                        cursor: pointer;
                    }
                }
                > main {
                    padding: 1rem;
                }
            }
        }
    }
</style>

<script>
    export default {
        data: () => ({
            visible: false,
        }),
        methods: {
            close() {
                this.$emit('close');
            },
        },
    };
</script>
