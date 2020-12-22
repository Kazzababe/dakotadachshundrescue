<template>
    <standard-template>
        <header>
            <PrimaryNavigation />
            <div class="attention">
                <div class="brand-info">
                    <h3 class="title headline">ADOPT TODAY.</h3>
                    <h3 class="title">FIND YOUR NEW BEST FRIEND.</h3>
                    <p class="description">
                        They're more than just a pet, they're your family.
                    </p>
                </div>
            </div>
        </header>
    </standard-template>
</template>

<style lang="scss" scoped>
header {
    display: flex;
    height: 100vh;

    flex-direction: column;

    background-color: #ffffff;

    > .attention {
        display: flex;
        padding: 0 10vw;

        flex: auto;
        flex-direction: row;
        justify-content: space-between;

        background-image: url('/static/dachshund-2.png');
        background-repeat: no-repeat;
        background-position-x: 100%;
        background-size: auto 100%;

        > .brand-info {
            display: flex;
            max-width: 65%;

            flex-direction: column;
            justify-content: center;

            > .title {
                margin: 0;

                font-family: 'Playfair Display', serif;
                font-size: 5rem;

                align-self: flex-start;

                &.headline {
                    color: #0abde3;
                }
            }
            > .description {
                margin: 3rem 0 0;

                font-size: 2rem;

                color: #818181;
            }
        }
    }
}
</style>

<script>
import PrimaryNavigation from "@/components/structure/PrimaryNavigation";

export default {
    components: {
        PrimaryNavigation,
    },
};
</script>
