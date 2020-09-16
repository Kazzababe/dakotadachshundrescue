<template>
    <standard-template>
        <template v-if="game">
            <Joining :game="game" :username="username" v-if="game.phase === 0"></Joining>
        </template>
    </standard-template>
</template>

<style lang="scss" scoped></style>

<script>
import Joining from '@/components/game/Joining.vue';

export default {
    components: {
        Joining,
    },
    data: () => ({
        game: undefined,
        username: '',
    }),
    mounted() {
        this.game = this.$store.game;
        this.username = this.$store.username;

        const socket = new WebSocket('ws://localhost:3000');
        socket.addEventListener('open', (event) => {
            socket.send(JSON.stringify({
                page: 'GAME',
                message: 'JOIN',
                game: this.game,
                username: this.username,
            }));
        });
        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.page === 'GAME') {
                if (data.message === 'UPDATE') {
                    this.game = data.game;
                    console.log('new player');
                }
                if (data.message === 'ping') {
                    socket.send(JSON.stringify({
                        page: 'GAME',
                        message: 'pong',
                    }));
                }
            }
        });
    },
};
</script>
