<template>
    <main>
        <template v-for="player in game.players">
            <p v-if="player.selectedAnswer">{{ player.username }} voted for {{ player.selectedAnswer }}.</p>
            <p v-else>{{ player.username }} didn't vote :( -2 points</p>
        </template>
        <template v-for="vote in votes">
            <p :style="`color: ${vote.winner ? 'green' : 'red' }`">{{ vote.option }} got {{ vote.count }} votes.</p>
        </template>
        <canvas class="votes" ref="votes"></canvas>
    </main>
</template>

<style lang="scss" scoped>
main {
    flex: 1;

    > .votes {
        min-width: 400px;
        max-width: 400px;
    }
}
</style>

<script>
import Chart from 'chart.js';

export default {
    props: {
        game: {},
    },
    mounted() {
        const chart = new Chart(this.$refs.votes, {
            type: 'pie',
            data: {
                datasets: [{
                    data: this.chartVotes,
                }],
                labels: this.options,
            },
            options: {}
        });
    },
    computed: {
        category() {
            return this.game.questions[this.game.selectedCategory];
        },
        question() {
            return this.category.questions[this.game.selectedQuestion];
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
        votes() {
            const votes = {};
            for (let index in this.options) {
                const option = this.options[index];
                votes[option] = {
                    count: 0,
                    option,
                    winner: false,
                }
            }
            for (let key in this.game.players) {
                const player = this.game.players[key];
                if (!player.selectedAnswer) {
                    continue;
                }
                votes[player.selectedAnswer] && votes[player.selectedAnswer].count++;
            }

            let maxVote;
            for (const key in votes) {
                const vote = votes[key];
                if (!maxVote || vote.count > maxVote.count) {
                    maxVote = vote;
                }
            }
            maxVote.winner = true;
            return votes;
        },
        chartVotes() {
            const votes = [];
            for (let index in this.options) {
                votes[index] = 0;
                const option = this.options[index];
                for (let key in this.game.players) {
                    const player = this.game.players[key];
                    if (player.selectedAnswer === option) {
                        votes[index]++;
                    }
                }
            }
            return votes;
        }
    },
}
</script>