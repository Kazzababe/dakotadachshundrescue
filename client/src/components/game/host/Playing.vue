<template>
    <div>
        <h2>Code = {{ game.code }}</h2>
        <h2>Players in game: {{ Object.keys(game.players).length }}</h2>
        <h1>Lets fucking go, game is starting</h1>
    </div>
</template>

<script>
export default {
    props: {
        game: Object,
    },
    methods: {

    },
}
</script>