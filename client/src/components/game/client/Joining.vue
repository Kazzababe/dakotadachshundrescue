<template>
    <div v-if="game">
        <p>game code {{ game.code }}</p>
        <p>username {{ username }}</p>
        <p>players in game: {{ Object.keys(game.players).length }}</p>
    </div>
</template>

<script>
export default {
    props: {
        game: {},
        username: String,
    },
}
</script>