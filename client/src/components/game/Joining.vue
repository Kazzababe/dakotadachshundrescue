<template>
    <div v-if="game">
        <p>game code {{ game.code }}</p>
        <p>{{ game.host === username ? 'You are the host' : game.host + ' is the host' }}</p>
        <p>username {{ username }}</p>
        <p>players in game: {{ game.players.length }}</p>
        <div v-if="username === game.host">
            <form @submit.prevent="startGame">
                <button type="submit">Everybody's in, start the game!</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        game: {},
        username: String,
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
                    name: this.username,
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