<template>
    <div class="base-template">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .base-template {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
</style>
<style lang="scss">
body {
    background-image: url('/static/geometry.png');
    background-size: 35%;

    animation-name: background;
    animation-duration: 60s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
@keyframes background {
    from {
        background-position: 0 0;
    }
    to {
        background-position: 700% 100%;
    }
}
</style>
