<template>
    <div class="nav-container">
        <nav class="primary">
            <router-link to="/" class="brand">BrandName</router-link>
            <router-link to="/browse">Search</router-link>
        </nav>
        <nav class="user">
            <template v-if="$store.user">
                <div class="dropdown">
                    <router-link to="/dashboard">{{ $store.user.username }}</router-link>
                    <div class="content">
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
                    right: 0;

                    display: flex;

                    flex-direction: column;

                    > a {
                        padding: 0.5rem 1rem;
                    }
                }
            }
        }
    }
</style>
