<template>
    <standard-template>
        <Joining v-if="game && game.phase === 0" :game="game"></Joining>
        <Playing v-else-if="game && game.phase === 1" :game="game"></Playing>
        <Winner v-else-if="game && game.phase === 2" :game="game"></Winner>
    </standard-template>
</template>

<style lang="scss" scoped></style>

<script>
import Joining from '@/components/game/host/Joining.vue';
import Playing from '@/components/game/host/Playing.vue';
import Winner from '@/components/game/host/Winner.vue';

export default {
    components: {
        Joining,
        Playing,
        Winner,
    },
    data: () => ({
        game: undefined,
    }),
    mounted() {
        const socket = new WebSocket('ws://' + window.location.host);
        socket.addEventListener('open', (event) => {
            socket.send(JSON.stringify({
                page: 'CREATE',
                message: 'new',
                code: this.$store.code,
            }));
        });
        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.page === 'CREATE') {
                if (data.message === 'data') {
                    this.game = data.game;
                } else if (data.message === 'error') {
                    alert(data.error);
                } else if (data.message === 'UPDATE') {
                    this.game = data.game;
                }
            } else if (data.page === 'GAME') {
                if (data.message === 'ping') {
                    socket.send(JSON.stringify({
                        page: 'GAME',
                        message: 'pong',
                    }));
                }
            }
        });
        window.socket = socket;
    },
    methods: {
        startGame() {

        },
    },
};
</script>

