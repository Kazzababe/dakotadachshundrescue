<template>
    <div class="container">
        <input
            ref="input"
            class="input"
            :type="type"
            :placeholder="placeholder"
            :value="content"
            @input="updateValue($event.target.value)"
        />
        <p class="undertext" v-if="undertext.length > 0">{{ undertext }}</p>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        > .input {
            padding: 1rem;
            width: 100%;

            font-size: 1rem;

            background-color: hsl(0, 0%, 98%);
            border: none;
            border-radius: 4px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.19) inset;
            color: hsl(0, 0%, 32%);
            outline: none;

            box-sizing: border-box;
        }
        > .undertext {
            padding: 0 4px;
            margin: 8px 0 0;

            font-size: 0.8rem;
        }
    }
</style>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'text',
            },
            placeholder: {
                type: String,
                default: '',
            },
            value: [String, Number],
            undertext: {
                type: String,
                default: '',
            },
        },
        data: (vue = this) => ({
            content: vue.value,
        }),
        methods: {
            updateValue(value) {
                this.content = value;
                this.$emit('input', value);
            },
        },
    };
</script>
