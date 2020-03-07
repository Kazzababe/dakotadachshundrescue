<template>
    <s-template :nav="false" :footer="false">
        <div class="page">
            <div class="work">
                <router-link to="/">Back to main site</router-link>
            </div>
            <div class="content">
                <div class="form-container">
                    <h4>Login</h4>
                    <p>Lorem ipsum deez nuts</p>
                    <form @submit.prevent="submit">
                        <cc-input class="input" v-model="username" placeholder="Username" :undertext="usernameError" />
                        <cc-input
                            class="input"
                            v-model="password"
                            placeholder="Password"
                            :undertext="passwordError"
                            type="password"
                        />
                        <div class="submit-block">
                            <router-link to="/auth/register">No account? Register</router-link>
                            <cc-button type="submit">Login</cc-button>
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
    export default {
        data: () => ({
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
            submitting: false,
        }),
        methods: {
            validateForm() {
                if (this.username.length >= 6 && this.username.length <= 28) {
                    this.usernameError = '';
                } else {
                    this.usernameError = 'Username must be between 6 and 28 characters long';
                }
                if (this.password.length >= 8) {
                    this.passwordError = '';
                } else {
                    this.passwordError = 'Password must be a minimum of 8 characters long';
                }
            },
            submit() {
                if (!this.submitting) {
                    this.validateForm();

                    if (this.usernameError === '' && this.passwordError === '') {
                        this.submitting = true;

                        fetch('/auth/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username: this.username,
                                password: this.password,
                            }),
                        })
                            .then(res => res.json())
                            .then(res => {
                                if (res.error) {
                                    if (res.errors) {
                                        this.usernameError = res.errors.username;
                                        this.passwordError = res.errors.password;
                                    } else if (res.message) {
                                        console.log(res.message);
                                    }
                                } else {
                                    // Redirect
                                    this.$router.push({ path: '/' });
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
    };
</script>
