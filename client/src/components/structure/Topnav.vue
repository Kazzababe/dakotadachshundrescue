<template>
    <div class="nav-container">
        <nav class="primary">
            <router-link to="/" class="brand">BrandName</router-link>
            <router-link to="/browse">Search</router-link>
            <router-link to="/dashboard/upload" v-if="$store.user">Upload</router-link>
        </nav>
        <nav class="user">
            <template v-if="$store.user">
                <div class="dropdown" @mouseenter="dropdown = true" @mouseleave="dropdown = false">
                    <router-link to="/dashboard">{{ $store.user.username }}</router-link>
                    <div class="content" v-if="dropdown">
                        <router-link to="/dashboard/settings">Settings</router-link>
                        <router-link to="/auth/logout">Logout</router-link>
                    </div>
                </div>
            </template>
            <template v-else>
                <router-link to="/auth/login">Login</router-link>
                <router-link to="/auth/register">Register</router-link>
            </template>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
    .nav-container {
        display: flex;
        width: 100%;
        padding: 0 6rem;

        background-color: hsl(202, 100%, 46%);

        align-items: center;
        justify-content: space-between;

        box-sizing: border-box;

        > .primary,
        > .user {
            font-family: 'Open Sans', sans-serif;
            font-weight: bold;
            text-transform: uppercase;

            color: white;
        }
        > .primary {
            display: flex;

            align-items: center;

            > .brand {
                margin-right: 1rem;
            }
            > a {
                display: block;
                padding: 1rem 0.5rem;

                text-decoration: none;

                color: white;
            }
        }
        > .user {
            a {
                text-decoration: none;

                color: white;
            }
            > a {
                padding: 1rem 0.5rem;
            }
            > .dropdown {
                position: relative;

                > a {
                    display: block;
                    padding: 1rem;
                }
                > .content {
                    position: absolute;
                    top: 100%;
                    left: 50%;

                    display: flex;
                    padding: 0.5rem 0;

                    text-align: left;

                    background-color: white;
                    border-radius: 6px;
                    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.25), 0 1px 2px hsla(0, 0%, 0%, 0.24);

                    flex-direction: column;

                    transform: translateX(-50%);

                    > a {
                        padding: 0.5rem 2rem;

                        font-size: 0.75rem;

                        color: black;

                        &:hover {
                            background-color: hsl(0, 0%, 90%);
                        }
                    }
                }
            }
        }
    }
</style>

<script>
    export default {
        data: () => ({
            dropdown: false,
        }),
    };
</script>
