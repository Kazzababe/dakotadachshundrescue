<template>
    <main>
        <div class="end-container">
            <p>Tallying Votes</p>
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    display: flex;
    width: 100%;
    flex-direction: column;

    > .end-container {
        margin-top: 25%;

        text-align: center;

        > p {
            margin: 0;

            font-family: 'Londrina Solid', cursive;
            font-size: 2.5rem;
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