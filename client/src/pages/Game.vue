<template>
    <standard-template>
        <template v-if="game">
            <Joining :game="game" :id="id" :username="username" v-if="game.phase === 0"></Joining>
            <Playing :game="game" :id="id" :username="username" v-else-if="game.phase === 1"></Playing>
            <Winner :game="game" :id="id" :username="username" v-else-if="game.phase === 2"></Winner>
        </template>
    </standard-template>
</template>

<style lang="scss" scoped></style>

<script>
import Joining from '@/components/game/client/Joining.vue';
import Playing from '@/components/game/client/Playing.vue';
import Winner from '@/components/game/client/Winner.vue';

export default {
    components: {
        Joining,
        Playing,
        Winner,
    },
    data: () => ({
        game: undefined,
        username: '',
        id: '',
    }),
    mounted() {
        this.game = this.$store.game;
        this.username = this.$store.username;
        this.id = this.$store.id;

        const socket = new WebSocket('ws://' + window.location.host);
        socket.addEventListener('open', (event) => {
            socket.send(JSON.stringify({
                page: 'GAME',
                message: 'JOIN',
                game: this.game,
                id: this.id,
                username: this.username,
            }));
        });
        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.page === 'GAME') {
                if (data.message === 'UPDATE') {
                    this.game = data.game;
                } else if (data.message === 'ping') {
                    socket.send(JSON.stringify({
                        page: 'GAME',
                        message: 'pong',
                    }));
                } else if (data.message === 'EXIT') {
                    window.location.href = '/';
                }
            }
        });
        window.socket = socket;
    },
};
</script>
