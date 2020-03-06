<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss" scoped>
    #app {
        width: 100%;
        height: 100%;
    }
</style>

<style lang="scss">
    :root {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
    }
    html,
    body {
        position: relative;

        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;

        background-color: hsl(0, 0%, 98%);
    }
    .noselect {
        user-select: none; /* supported by Chrome and Opera */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none;
    }
    @font-face {
        font-family: 'Sims Sans';
        src: url('/static/fonts/SimsSans.woff') format('woff');
    }
</style>
