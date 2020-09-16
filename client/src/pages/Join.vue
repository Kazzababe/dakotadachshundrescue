<template>
    <standard-template>
        <form @submit.prevent="joinGame">
            <input v-model="code" type="text" placeholder="Enter code..."/>
            <input v-model="name" type="text" placeholder="Enter name..."/>
            <button type="submit">Join game</button>
        </form>
    </standard-template>
</template>

<style lang="scss" scoped></style>

<script>
export default {
    data: () => ({
        code: '',
        name: '',
    }),
    methods: {
        joinGame() {
            if (this.code.length !== 4) {
                alert('code must be 4 characters in length');
                return;
            }
            if (this.name.length < 1 || this.name.length > 16) {
                alert('name must be between 1-16 characters');
                return;
            }
            fetch('/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: this.code,
                    name: this.name,
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.code !== 100) {
                        alert(res.message);
                        return;
                    }
                    window.location.href = res.url;
                });
        },
    },
};
</script>
