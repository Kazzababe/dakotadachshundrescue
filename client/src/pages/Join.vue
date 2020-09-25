<template>
    <standard-template>
        <header class="brand-header">
            <router-link class="back-arrow" to="/"><fa-icon icon="arrow-left"></fa-icon></router-link>
            <h1>MAJORITY</h1>
            <h1>RULES</h1>
        </header>
        <main>
            <form class="game-form" @submit.prevent="joinGame">
                <div class="input-container">
                    <label for="code">ROOM CODE</label>
                    <input id="code" v-model="code" type="text" maxlength="4" placeholder="Enter code..."/>
                </div>
                <div class="input-container">
                    <label for="username">NAME</label>
                    <input id="username" v-model="name" type="text" maxlength="16" placeholder="Enter name..."/>
                </div>
                <button type="submit">JOIN GAME</button>
            </form>
        </main>
    </standard-template>
</template>

<style lang="scss" scoped>
.brand-header {
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
        font-size: 2.5rem;
        letter-spacing: 1px;
        -webkit-text-stroke: 1px black;

        color: white;
    }
}
main {
    padding: 2rem;

    > .game-form {
        display: flex;
        flex-direction: column;

        > .input-container {
            display: flex;
            flex-direction: column;
            margin-bottom: 2rem;

            > label {
                margin-bottom: 6px;

                font-size: 1.25rem;
                font-weight: bold;
            }
            input[type=text] {
                padding: 0.75rem;
            }
        }
        > button[type=submit] {
            padding: 1rem;

            font-family: 'Londrina Solid', cursive;
            font-size: 1.5rem;
            -webkit-text-stroke: 1px black;

            background-color: #2ecc71;
            border: 2px solid #27ae60;
            color: white;
            outline: none;

            cursor: pointer;
        }
    }
}
</style>

<script>
export default {
    data: () => ({
        code: '',
        name: '',
    }),
    watch: {
        code(val) {
            this.code = val.toUpperCase();
        }
    },
    methods: {
        joinGame() {
            if (this.code.length !== 4) {
                alert('code must be 4 characters in length \"' + this.code + '\"');
                return;
            }
            if (this.name.length < 1 || this.name.length > 12) {
                alert('name must be between 1-12 characters');
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
