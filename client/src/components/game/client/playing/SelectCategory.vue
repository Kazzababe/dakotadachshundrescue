<template>
    <main>
        <div class="category-info">
            <template class="categories" v-if="game.selectingCategory === id">
                <p class="title">Select a category</p>
                <div class="category" v-for="index in game.categorySelection" @click="selectCategory(index)">
                    {{ game.questions[index].name }}
                </div>
            </template>
            <p class="selecting" v-else>
                {{ game.players[game.selectingCategory].username }} is selecting a category.
            </p>
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    display: flex;
    width: 100%;
    flex-direction: column;

    > .category-info {
        margin-top: 25%;

        text-align: center;

        > .title {
            padding: 0.5rem;

            font-family: 'Londrina Solid', cursive;
            font-size: 2.5rem;
            letter-spacing: 1px;
            -webkit-text-stroke: 1px black;

            background-color: hsla(0, 0%, 0%, 0.35);
            color: white;
        }
        > .category {
            margin: 0.5rem 0;

            font-family: 'Londrina Solid', cursive;
            font-size: 2rem;
            letter-spacing: 1px;
            -webkit-text-stroke: 1px black;

            color: white;

            cursor: pointer;
            transition: all 0.2s ease-in-out;

            &:hover {
                transform: scale(1.05);
            }
        }
        > .selecting {
            font-family: 'Londrina Solid', cursive;
            font-size: 2rem;
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
        username: String,
        id: String,
    },
    methods: {
        selectCategory(index) {
            window.socket.send(JSON.stringify({
                page: 'GAME',
                message: 'SELECT_CATEGORY',
                game: this.game,
                id: this.id,
                index,
            }))
        },
    },
}
</script>