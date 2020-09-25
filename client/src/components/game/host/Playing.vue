<template>
    <div class="page-container">
        <header class="brand-header">
            <router-link class="back-arrow" to="/"><fa-icon icon="arrow-left"></fa-icon></router-link>
            <h1>MAJORITY RULES</h1>
        </header>
        <transition name="component-fade" mode="out-in">
            <SelectCategory v-if="game.roundPhase === 0" v-bind="$props"></SelectCategory>
            <SelectingAnswers v-else-if="game.roundPhase === 1" v-bind="$props"></SelectingAnswers>
            <EndRound v-else-if="game.roundPhase === 2" v-bind="$props"></EndRound>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
.component-fade-enter-active, .component-fade-leave-active {
    transition: transform 0.4s ease;
    transform-origin: center;
}
.component-fade-enter, .component-fade-leave-to {
    transform: scale(0);
}
.page-container {
    display: flex;
    flex-direction: column;

    flex: 1;

    > .brand-header {
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
}
</style>

<script>
import SelectCategory from '@/components/game/host/playing/SelectCategory.vue';
import SelectingAnswers from '@/components/game/host/playing/SelectingAnswers.vue';
import EndRound from '@/components/game/host/playing/EndRound.vue';

export default {
    components: {
        SelectCategory,
        SelectingAnswers,
        EndRound,
    },
    props: {
        game: Object,
    },
    data: () =>  ({
        countdown: 60,
    }),
    mounted() {
        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.page === 'CREATE') {

            }
        });
    },
    methods: {
        startRound() {

        },
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