<template>
    <div class="content-container">
        <header class="brand-header">
            <h1>MAJORITY RULES</h1>
        </header>
        <SelectCategory v-if="game.roundPhase === 0" v-bind="$props"></SelectCategory>
        <SelectAnswer v-else-if="game.roundPhase === 1" v-bind="$props"></SelectAnswer>
        <EndRound v-else-if="game.roundPhase === 2" v-bind="$props"></EndRound>
        <div v-if="game.roundPhase !== 2" class="countdown-bar" :style="{ width: `${game.timeRemaining / game.totalTime * 100}%` }"></div>
    </div>
</template>

<style lang="scss" scoped>
.countdown-bar {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;

    height: 1rem;

    background-color: #2ecc71;

    transition: width 1s linear;
}
.content-container {
    height: 100%;
    width: 100%;

    > .brand-header {
        position: relative;

        padding: 1rem;

        text-align: center;

        background-color: #2ecc71;
        border-bottom: 2px solid #27ae60;

        > h1 {
            margin: 0;

            font-family: 'Londrina Solid', cursive;
            font-size: 2rem;
            letter-spacing: 1px;
            -webkit-text-stroke: 1px black;

            color: white;
        }
    }
}
</style>

<script>
import SelectCategory from "@/components/game/client/playing/SelectCategory.vue";
import SelectAnswer from '@/components/game/client/playing/SelectAnswer.vue';
import EndRound from '@/components/game/client/playing/EndRound.vue';

export default {
    components: {
        SelectCategory,
        SelectAnswer,
        EndRound,
    },
    props: {
        game: Object,
        username: String,
        id: String,
    },
    computed: {
        category() {
            return this.game.questions[this.game.selectedCategory];
        },
        question() {
            return this.category.questions[this.game.selectedQuestion];
        },
    },
}
</script>