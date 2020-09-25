<template>
    <div>
        <header class="brand-header">
            <router-link class="back-arrow" to="/"><fa-icon icon="arrow-left"></fa-icon></router-link>
            <h1>MAJORITY RULES</h1>
        </header>
        <section class="info-section">
            <div class="code-container">
                <h3>ROOM CODE</h3>
                <p class="code">{{ game.code }}</p>
            </div>
            <form class="ready-form" @submit.prevent="startGame">
                <button type="submit">Everybody's in!</button>
            </form>
            <div class="player-grid">
                <div class="player" v-for="player in game.players">
                    <fa-icon :icon="playerIcon(player)" class="icon"></fa-icon>
                    <p>{{ player.username }}</p>
                </div>
            </div>
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
        font-size: 5rem;
        letter-spacing: 1px;
        -webkit-text-stroke: 1px black;

        color: white;
    }
}
.info-section {
    padding-top: 3rem;

    text-align: center;

    > .code-container {
        display: flex;
        flex-direction: column;

        align-items: center;

        > h3 {
            margin: 0 0 1.5rem;

            font-size: 4rem;
        }
        > .code {
            padding: 3rem 8rem;
            margin: 0;

            font-size: 6rem;

            background-color: hsla(0, 0%, 0%, 0.35);
            color: white;
        }
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
    > .player-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);

        .player {
            > .icon {
                padding-bottom: 1rem;

                font-size: 6rem;
            }
            > p {
                margin: 0;

                font-family: 'Londrina Solid', cursive;
                font-size: 2rem;
                -webkit-text-stroke: 1px black;

                color: white;
            }
        }
    }
}
</style>

<script>
const icons = [
    'surprise',
    'smile-beam',
    'sad-cry',
    'meh-rolling-eyes',
    'meh-blank',
    'angry',
    'grin-squint-tears',
    'grin-hearts',
];

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
        playerIcon(player) {
            return ['far', icons[player.index]];
        },
    },
}
</script>