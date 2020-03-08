<template>
    <div class="nav-container" :class="{ top }">
        <nav class="primary">
            <router-link to="/" class="brand nav-link">BrandName</router-link>
            <router-link to="/browse" class="nav-link">Search</router-link>
            <router-link to="/dashboard/upload" class="nav-link" v-if="$store.user">Upload</router-link>
        </nav>
        <nav class="user">
            <template v-if="$store.user">
                <div class="dropdown" @mouseenter="dropdown = true" @mouseleave="dropdown = false">
                    <router-link to="/dashboard" class="nav-link">{{ $store.user.username }}</router-link>
                    <div class="content" v-if="dropdown">
                        <router-link to="/dashboard/settings" class="nav-link">Settings</router-link>
                        <router-link to="/auth/logout" class="nav-link">Logout</router-link>
                    </div>
                </div>
            </template>
            <template v-else>
                <router-link to="/auth/login" class="nav-link">Login</router-link>
                <router-link to="/auth/register" class="nav-link">Register</router-link>
            </template>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
    .nav-container {
        position: fixed;
        top: 0;

        display: flex;
        width: 100%;
        height: 3.5rem;
        padding: 0 6rem;

        background-color: white;
        box-shadow: 0 1px 3px 0 hsla(0, 0%, 0%, 0.1),0 1px 2px 0 hsla(0, 0%, 0%, 0.06) !important;

        align-items: center;
        justify-content: space-between;

        box-sizing: border-box;
        transition: box-shadow 0.2s ease-in-out;

        > .primary,
        > .user {
            font-family: 'Open Sans', sans-serif;
            font-weight: bold;
            text-transform: uppercase;

            color: hsl(222, 14%, 15%);

            .nav-link {
                text-decoration: none;

                color: hsl(222, 14%, 15%);

                transition: all 0.2s ease-in-out;

                &:hover {
                    color: hsl(250, 100%, 50%);
                }
            }
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
            }
        }
        > .user {
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

                        &:hover {
                            background-color: hsl(0, 0%, 90%);
                            color: hsl(222, 14%, 15%);
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
            top: false,
        }),
        mounted() {
            window.addEventListener('scroll', this.onScroll);

            this.onScroll();
        },
        destroyed() {
            window.removeEventListener('scroll', this.onScroll);
        },
        methods: {
            onScroll() {
                this.top = window.scrollY <= 5;
                console.log(window.scrollY);
            },
        },
    };
</script>
