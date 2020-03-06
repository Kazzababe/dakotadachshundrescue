<template>
    <s-template :nav="false" :footer="false">
        <div class="page">
            <div class="work">
                <router-link to="/">Back to main site</router-link>
            </div>
            <div class="content">
                <div class="form-container">
                    <h4>Register</h4>
                    <p>Lorem ipsum deez nuts</p>
                    <form @submit.prevent="submit">
                        <cc-input class="input" v-model="username" placeholder="Username" :undertext="usernameError" />
                        <cc-input class="input" v-model="email" placeholder="Email address" :undertext="emailError" />
                        <cc-input
                            class="input"
                            v-model="emailRepeat"
                            placeholder="Repeat email address"
                            :undertext="emailError"
                        />
                        <div class="block">
                            <cc-input
                                class="input block-item"
                                type="password"
                                v-model="password"
                                placeholder="Password"
                                :undertext="passwordError"
                            />
                            <cc-input
                                class="input block-item"
                                type="password"
                                v-model="passwordRepeat"
                                placeholder="Repeat password"
                                :undertext="passwordError"
                            />
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

<style lang="scss" scoped>
    .page {
        display: flex;
        height: 100%;

        > .work {
            position: relative;

            background-image: url('/static/boxartren.png'),
                linear-gradient(30deg, hsl(160, 49%, 42%), hsl(210, 62%, 41%));
            background-size: 100% auto;
            background-position: center bottom;
            background-repeat: no-repeat;

            flex: 1;
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

                    .input /deep/ p {
                        font-weight: bold;

                        color: hsl(341, 76%, 50%);
                    }
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
            usernameError: '',
            passwordError: '',
            emailError: '',
            submitting: false,
        }),
        methods: {
            validateForm() {
                if (this.username.length >= 6 && this.username.length <= 28) {
                    this.usernameError = '';
                } else {
                    this.usernameError = 'Username must be between 6 and 28 characters long';
                }
                if (this.password.length >= 8 && this.password === this.passwordRepeat) {
                    this.passwordError = '';
                } else {
                    if (this.password !== this.passwordRepeat) {
                        this.passwordError = 'Passwords must match';
                    } else {
                        this.passwordError = 'Password must be a minimum of 8 characters long';
                    }
                }
                if (/\S+@\S+\.\S+/.test(this.email) && this.email === this.emailRepeat) {
                    this.emailError = '';
                } else {
                    if (this.email !== this.emailRepeat) {
                        this.emailError = 'Emails must match';
                    } else {
                        this.emailError = 'Please input a valid email address';
                    }
                }
            },
            submit() {
                console.log('submit');
                if (!this.submitting) {
                    this.validateForm();

                    if (this.usernameError === '' && this.passwordError === '' && this.emailError === '') {
                        // Simple client side verification is done, lets post to the server now
                        this.submitting = true;
                        fetch('/auth/register', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username: this.username,
                                email: this.email,
                                emailRepeat: this.emailRepeat,
                                password: this.password,
                                passwordRepeat: this.passwordRepeat,
                            }),
                        })
                            .then(res => res.json())
                            .then(res => {
                                if (res.error) {
                                    if (res.errors) {
                                        this.usernameError = res.errors.username;
                                        this.emailError = this.errors.email;
                                        this.passwordError = this.errors.password;
                                    } else if (res.message) {
                                        console.log(res.message);
                                    }
                                } else {
                                    alert('good to go');
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            .finally(() => {
                                this.submitting = false;
                            });
                    }
                }
            },
        },
        components: {
            Input,
        },
    };
</script>
