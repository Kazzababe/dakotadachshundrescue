<template>
    <div v-if="game">
        <template v-if="game.roundPhase === 0">
            <template v-if="game.selectingCategory === username">
                <p>Select a category</p>
                <h3 v-for="index in game.categorySelection" @click="selectCategory(index)">
                    {{ game.questions[index].name }}
                </h3>
            </template>
            <p v-else>
                {{ game.selectingCategory }} is selecting a category.
            </p>
        </template>
        <template v-else-if="game.roundPhase === 1">
            <h3>{{ game.questions[game.selectedCategory].name }}</h3>
            <h2>{{ game.questions[game.selectedCategory].questions[0].question}}</h2>
            <p v-for="index in options">
                {{ index }}
            </p>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        game: Object,
        username: String,
    },
    methods: {
        selectCategory(index) {
            window.socket.send(JSON.stringify({
                page: 'GAME',
                message: 'SELECT_CATEGORY',
                game: this.game,
                username: this.username,
                index,
            }))
        }
    },
    computed: {
        options() {
            const options = this.game.questions[this.game.selectedCategory].questions[0].options;
            if (options === 'PLAYERS') {
                const players = [];
                for (let key in this.game.players) {
                    players.push(this.game.players[key].username);
                }
                return players;
            }
            return options;
        },
    },
}
</script>