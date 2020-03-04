<template>
    <s-template :nav="false" :footer="false">
        <div class="page">
            <div class="work">

            </div>
            <div class="content">
                <div class="form-container">
                    <h4>Register</h4>
                    <p>Lorem ipsum deez nuts</p>
                    <form>
                        <cc-input v-model="username" placeholder="Username" />
                        <cc-input v-model="email" placeholder="Email address" />
                        <cc-input v-model="emailRepeat" placeholder="Repeat email address" />
                        <div class="block">
                            <cc-input class="block-item" type="password" v-model="password" placeholder="Password" />
                            <cc-input class="block-item" type="password" v-model="passwordRepeat" placeholder="Repeat password" />
                        </div>
                        <div class="submit-block">
                            <router-link to="/auth/login">Sign in instead</router-link>
                            <button type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </s-template>
</template>

<style lang="scss">
    .page {
        display: flex;
        height: 100%;

        > .work {
            position: relative;

            background: hsl(207, 100%, 25%);
            background: -webkit-linear-gradient(30deg, hsl(160, 49%, 42%), hsl(210, 62%, 41%));
            background: linear-gradient(30deg, hsl(160, 49%, 42%), hsl(210, 62%, 41%));

            flex: 1;

            &::after {
                position: absolute;
                bottom: 0;

                display: block;
                width: 100%;
                height: 100%;
                content: '';

                background-image: url('/static/boxartren.png');
                background-size: 100% auto;
                background-position: center bottom;
                background-repeat: no-repeat;
            }
        }
        > .content {
            display: flex;

            background-color: white;

            flex: 2;
            justify-content: center;
            align-items: center;

            > .form-container {
                width: 50%;
                min-width: 500px;

                > form {
                    display: flex;

                    flex-direction: column;

                    > .block {
                        display: flex;

                        > .block-item {
                            flex: 1;

                            &:not(:last-child) {
                                margin-right: 1rem;
                            }
                        }
                    }
                    > .submit-block {
                        display: flex;

                        align-items: center;
                        justify-content: space-between;
                    }
                    > * {
                        margin-bottom: 1rem;
                    }
                }
            }
        }
    }
</style>

<script>
    import Input from '@/components/structure/input/Input.vue';

    export default {
        data: () => ({
            username: '',
            password: '',
            passwordRepeat: '',
            email: '',
            emailRepeat: '',
        }),
        components: {
            Input,
        },
    };
</script>