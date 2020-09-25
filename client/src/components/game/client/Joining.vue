<template>
    <div>
        <header class="brand-header">
            <router-link class="back-arrow" to="/"><fa-icon icon="arrow-left"></fa-icon></router-link>
            <h1>MAJORITY RULES</h1>
        </header>
        <section class="user-info">
            <p class="username">{{ username }}</p>
            <p class="players">{{ Object.keys(game.players).length }} players</p>
            <form v-if="self.index === 0" class="ready-form" @submit.prevent="startGame">
                <button type="submit">Everybody's in!</button>
            </form>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.brand-header {
    position: relative;

    padding: 3rem;

    text-align: center;

    background-color: #2ecc71;
    border-bottom: 2px solid #27ae60;

    > .back-arrow {
        position: absolute;
        top: 1rem;
        left: 1rem;

        font-size: 1.5rem;

        color: #27ae60;

        transition: all 0.2s ease-in-out;

        &:hover {
            color: white;
        }
    }
    > h1 {
        margin: 0;

        font-family: 'Londrina Solid', cursive;
        font-size: 2.5rem;
        letter-spacing: 1px;
        -webkit-text-stroke: 1px black;

        color: white;
    }
}
.user-info {
    padding: 2rem 0;

    text-align: center;

    > p {
        margin: 0;
    }
    > .username {
        margin-bottom: 1rem;

        font-size: 3rem;
        letter-spacing: 1px;
        -webkit-text-stroke: 1px black;

        color: white;
    }
    > .players {
        font-size: 1.5rem;
    }
    > .ready-form {
        padding: 3rem 0;

        > button[type=submit] {
            padding: 1rem 2rem;

            font-family: 'Londrina Solid', cursive;
            font-size: 1.5rem;
            -webkit-text-stroke: 1px black;

            background-color: #2ecc71;
            border: 2px solid #27ae60;
            color: white;
            outline: none;

            cursor: pointer;
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
    computed: {
        self() {
            return this.game.players[this.id];
        },
    },
}
</script>