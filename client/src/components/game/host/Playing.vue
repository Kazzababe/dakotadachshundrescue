<template>
    <div>
        <h2>Code = {{ game.code }}</h2>
        <h2>Players in game: {{ Object.keys(game.players).length }}</h2>
        <div>
            <h3 v-if="game.roundPhase === 0">{{ game.selectingCategory }} is selecting a category.</h3>
            <h3 v-else-if="game.roundPhase === 1">{{ game.questions[game.selectedCategory].name }}</h3>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        game: Object,
    },
    data: () =>  ({
        roundPhase: 0,
    }),
    methods: {
        startRound() {

        },
    },
}
</script>