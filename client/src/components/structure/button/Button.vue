<template>
    <router-link v-if="href" :to="href" class="button" @click="$emit('click', $event)"><slot /></router-link>
    <button v-else class="button" :class="variant" :type="type" @click="$emit('click', $event)"><slot /></button>
</template>

<style lang="scss" scoped>
    .button {
        display: inline-block;
        padding: 1rem 2rem;

        border: none;
        border-radius: 1000px;
        outline: none;

        cursor: pointer;
        transition: all 0.25s ease-in-out;

        &.default {
            font-family: 'Sims Sans', sans-serif;
            font-size: 0.85rem;
            font-weight: bold;
            text-transform: uppercase;

            background-color: white;
            border: 1px solid hsla(0, 0%, 0%, 0.2);
            box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.25), 0 1px 2px hsla(0, 0%, 0%, 0.24);
            color: hsl(215, 61%, 42%);

            &:hover {
                box-shadow: 0 10px 20px hsla(0, 0%, 0%, 0.19), 0 6px 6px hsla(0, 0%, 0%, 0.23);
            }
        }
    }
</style>

<script>
    export default {
        props: {
            href: {
                type: String,
                default: undefined,
            },
            type: {
                type: String,
                default: 'button',
            },
            variant: {
                type: String,
                default: 'default',
            },
        },
    };
</script>
