<template>
    <div v-if="game">
        <p>game code {{ game.code }}</p>
        <p>{{ game.host === username ? 'You are the host' : game.host + ' is the host' }}</p>
        <p>username {{ username }}</p>
        <p>players in game: {{ game.players.length }}</p>
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