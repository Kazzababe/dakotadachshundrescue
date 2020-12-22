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