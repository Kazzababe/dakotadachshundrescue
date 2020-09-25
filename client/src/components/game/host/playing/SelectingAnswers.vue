<template>
    <main>
        <div class="category-info">
            <h3 class="category">Round {{ game.round + 1 }} - {{ game.questions[game.selectedCategory].name }}</h3>
            <h3 class="question">{{ question.question }}</h3>
        </div>
        <div class="answers" :class="`${options.length > 2 ? 'grid' : ''} ${options.length === 3 ? 'three' : ''}`">
            <p class="answer" v-for="answer in options" :style="answerWidth > 0 ? { width: answerWidth + 'px' } : {}">
                {{ answer }}
            </p>
        </div>
        <div class="player-grid">
            <div class="player" v-for="player in game.players" :class="{ answered: player.selectedAnswer }">
                <fa-icon :icon="playerIcon(player)" class="icon"></fa-icon>
                <p>{{ player.username }}</p>
            </div>
        </div>
        <p class="countdown" :class="{ close: time <= 10 }" ref="countdown">{{ time }}</p>
    </main>
</template>

<style lang="scss" scoped>
main {
    position: relative;

    display: flex;
    width: 100%;
    flex-direction: column;

    text-align: center;

    align-items: center;
    flex: 1;

    > .player-grid {
        position: absolute;
        bottom: 0;

        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-gap: 2rem;

        .player {
            > .icon {
                padding-bottom: 1rem;

                font-size: 6rem;

                color: #e74c3c;
            }
            > p {
                margin: 0;

                font-family: 'Londrina Solid', cursive;
                font-size: 2rem;
                -webkit-text-stroke: 1px black;

                color: white;
            }
            &.answered > .icon {
                color: #2ecc71;
            }
        }
    }
    > .answers {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;

        align-items: center;

        &.grid {
            display: grid;

            grid-gap: 1rem;
            grid-template-columns: repeat(4, 1fr);

            &.three {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        > .answer {
            margin: 0;
            padding: 1rem 2rem;

            font-size: 2rem;
            font-weight: bold;

            background-color: #ffcc33;
            box-sizing: border-box;

            &:nth-child(even) {
                transform: rotate(2.5deg);
            }
            &:nth-child(odd) {
                transform: rotate(-2.5deg);
            }
            &:not(:last-child) {
                margin-bottom: 1rem;
            }
        }
    }
    > .category-info {
        padding: 3rem;

        > h3 {
            margin: 0;
        }
        > .category {
            font-family: 'Londrina Solid', cursive;
            font-size: 3rem;
            letter-spacing: 1px;
            text-transform: uppercase;

            color: black;

            transform: rotateX(15deg);
        }
        > .question {
            font-family: 'Londrina Solid', cursive;
            font-size: 4.5rem;
            letter-spacing: 1px;
            -webkit-text-stroke: 1px black;

            color: white;
        }
    }
    > .options-container {
        margin-top: 25%;

        text-align: center;

        > .option {
            margin: 0.5rem 0;

            font-family: 'Londrina Solid', cursive;
            font-size: 2.5rem;
            letter-spacing: 1px;
            -webkit-text-stroke: 1px black;

            color: white;

            cursor: pointer;
            transition: all 0.2s ease-in-out;

            &:hover {
                transform: scale(1.05);
            }
        }
    }
}
.countdown {
    position: absolute;
    top: 3rem;
    left: 3rem;

    margin: 0;

    font-size: 2.5rem;

    transition: all 0.2s linear;

    &.close {
        color: #e74c3c;
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
        game: {},
    },
    data: () => ({
        answerWidth: 0,
    }),
    methods: {
        playerIcon(player) {
            return ['far', icons[player.index]];
        },
    },
    computed: {
        category() {
            return this.game.questions[this.game.selectedCategory];
        },
        question() {
            return this.category.questions[this.game.selectedQuestion];
        },
        time() {
            return this.game.timeRemaining;
        },
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
    },
    watch: {
        time() {
            const countdown = this.$refs.countdown;
            countdown.style.transform = 'scale(1)';
            setTimeout(() => {
                countdown.style.transform = 'scale(0)';
            }, 750);
        },
        options() {
            const answers = document.getElementsByClassName('answer');
            for (let i = 0; i < answers.length; i++) {
                const el = answers[i];
                console.log(el);
                console.log(el.offsetWidth);
                this.answerWidth = Math.max(this.answerWidth, el.offsetWidth);
            }
        },
    },
}
</script>