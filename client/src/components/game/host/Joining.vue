<template>
    <div>
        <h2>Code = {{ game.code }}</h2>
        <h2>Players in game: {{ Object.keys(game.players).length }}</h2>
        <form @submit.prevent="startGame">
            <button type="submit">Everybody's in!</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        game: Object,
    },
    methods: {
        startGame() {
            fetch('/game/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: this.game.code,
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.code !== 100) {
                        alert(res.message);
                    }
                });
        },
    },
}
</script>