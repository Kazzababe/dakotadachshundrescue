<template>
    <main>
        <div class="container">
            <h3>{{ game.players[game.selectingCategory].username }} is selecting a category.</h3>
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    position: relative;
    flex: 1;

    > .container {
        position: absolute;
        top: 33%;
        left: 50%;

        padding: 2rem;

        transform: translate(-50%, -50%);

        > h3 {
            margin: 0;

            font-family: 'Londrina Solid', cursive;
            font-size: 4rem;
            letter-spacing: 1px;
            -webkit-text-stroke: 1px black;

            color: white;
        }
    }
}
</style>

<script>
export default {
    props: {
        game: {},
    },
    computed: {
        category() {
            return this.game.questions[this.game.selectedCategory];
        },
        question() {
            return this.category.questions[this.game.selectedQuestion];
        },
    },
}
</script>