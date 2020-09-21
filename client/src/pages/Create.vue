<template>
    <standard-template>
        <Joining v-if="game && game.phase === 0" :game="game"></Joining>
        <Playing v-else-if="game && game.phase === 1" :game="game"></Playing>
    </standard-template>
</template>

<style lang="scss" scoped></style>

<script>
import Joining from '@/components/game/host/Joining.vue';
import Playing from '@/components/game/host/Playing.vue';

export default {
    components: {
        Joining,
        Playing,
    },
    data: () => ({
        game: undefined,
    }),
    mounted() {
        this.code = this.$store.code;

        const socket = new WebSocket('ws://' + window.location.host);
        socket.addEventListener('open', (event) => {
            socket.send(JSON.stringify({
                page: 'CREATE',
                message: 'new',
                code: this.code,
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
                } else if (data.message === 'ping') {
                    socket.send(JSON.stringify({
                        page: 'GAME',
                        message: 'pong',
                    }));
                }
            }
        });
    },
    methods: {
        startGame() {

        },
    },
};
</script>

