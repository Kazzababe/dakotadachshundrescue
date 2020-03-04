<template>
    <input ref="input" class="input" :type="type" :placeholder="placeholder" :value="value" />
</template>

<style lang="scss">
    .input {
        padding: 1rem;

        border: 1px solid gray;
        border-radius: 4px;
        outline: none;
    }
</style>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: "text",
            },
            placeholder: {
                type: String,
                default: "",
            },
            value: [String, Number],
        },
    };
</script>