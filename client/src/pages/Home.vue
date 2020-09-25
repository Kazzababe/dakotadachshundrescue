<template>
    <standard-template class="template">
        <header class="brand-header">
            <h1>MAJORITY</h1>
            <h1>RULES</h1>
        </header>
        <section class="links-section">
            <div class="links">
                <router-link to="create">CREATE A GAME</router-link>
                <router-link to="join">JOIN A GAME</router-link>
            </div>
        </section>
    </standard-template>
</template>

<style lang="scss" scoped>
.template {
    display: flex;
    flex-direction: column;
}
.brand-header {
    padding: 3rem;

    text-align: center;

    background-color: #2ecc71;
    border-bottom: 2px solid #27ae60;

    > h1 {
        margin: 0;

        font-family: 'Londrina Solid', cursive;
        font-size: 2.5rem;
        letter-spacing: 1px;
        -webkit-text-stroke: 1px black;

        color: white;
    }
}
.links-section {
    position: relative;

    display: flex;
    flex-direction: column;
    text-align: center;
    flex: 1;

    align-items: center;
    justify-content: center;

    > .links {
        position: absolute;
        top: 33%;
        left: 50%;

        display: flex;
        flex-direction: column;

        align-items: center;
        transform: translate(-50%, -50%);

        > a {
            width: 10rem;
            padding: 1rem;
            margin-bottom: 1rem;

            font-family: 'Londrina Solid', cursive;
            font-size: 1.5rem;
            text-decoration: none;
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
        mounted() {

        },
    };
</script>
