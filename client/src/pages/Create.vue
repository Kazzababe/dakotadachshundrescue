<template>
    <standard-template>
        <form @submit.prevent="createGame">
            <input type="text" v-model="name" placeholder="Username..." />
            <button type="submit">Create game</button>
        </form>
    </standard-template>
</template>

<style lang="scss" scoped></style>

<script>
export default {
    data: () => ({
        name: '',
    }),
    methods: {
        createGame() {
            if (this.name.length < 1 || this.name.length > 16) {
                alert('name must be between 1-16 characters');
                return;
            }
            fetch('/create', {
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

