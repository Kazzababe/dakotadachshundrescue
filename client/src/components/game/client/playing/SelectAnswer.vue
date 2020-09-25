<template>
    <main>
        <div class="options-container">
            <template v-if="game.players[id].selectedAnswer">
                <p>You selected {{ game.players[id].selectedAnswer }}</p>
            </template>
            <template v-else>
                <p class="option" v-for="(index, i) in options" @click="selectAnswer(index)">
                    {{ i + 1 }}. {{ index }}
                </p>
            </template>
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    display: flex;
    width: 100%;
    flex-direction: column;

    > .options-container {
        margin-top: 25%;

        text-align: center;

        > .option {
            margin: 0.5rem 0;

            font-family: 'Londrina Solid', cursive;
            font-size: 2.5rem;
            letter-spacing: 1px;
            -webkit-text-stroke: 1px black;

            color: white;

            cursor: pointer;
            transition: all 0.2s ease-in-out;

            &:hover {
                transform: scale(1.05);
            }
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
        selectAnswer(answer) {
            window.socket.send(JSON.stringify({
                page: 'GAME',
                message: 'SELECT_ANSWER',
                game: this.game,
                id: this.id,
                answer,
            }))
        },
    },
    computed: {
        options() {
            const options = this.question.options;
            if (options === 'PLAYERS') {
                const players = [];
                for (let key in this.game.players) {
                    players.push(this.game.players[key].username);
                }
                return players;
            }
            return options;
        },
        category() {
            return this.game.questions[this.game.selectedCategory];
        },
        question() {
            return this.category.questions[this.game.selectedQuestion];
        },
    },
}
</script>