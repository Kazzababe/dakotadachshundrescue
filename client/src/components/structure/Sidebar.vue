<template>
    <div class="sidebar" :class="{ expanded }">
        <nav class="sidenav">
            <div class="item" @click="expanded = !expanded">
                <span class="icon">
                    <fa-icon icon="home"></fa-icon>
                </span>
                <span class="text">Dashboard</span>
            </div>
            <div class="item">
                <span class="icon">
                    <fa-icon icon="chart-pie"></fa-icon>
                </span>
                <span class="text">Account Metrics</span>
            </div>
            <div class="item">
                <span class="icon">
                    <fa-icon icon="list"></fa-icon>
                </span>
                <span class="text">Account Specs</span>
            </div>
            <div class="item">
                <span class="icon">XD</span>
                <span class="text">Menu item 1</span>
            </div>
        </nav>
    </div>
</template>

<style lang="scss">
    .sidebar {
        display: inline-flex;
        height: 100%;
        width: 75px;

        background-color: hsl(300, 100%, 25%);
        box-shadow: inset -4px 0 20px hsla(0, 0%, 0%, 0.2);
        overflow-x: hidden;

        flex-direction: column;

        transition: width 0.2s ease-in-out;

        &.expanded {
            width: 250px;
        }

        > .sidenav {
            display: flex;

            flex-direction: column;

            > .item {
                display: flex;

                align-items: center;
                flex-wrap: nowrap;

                cursor: pointer;

                > .icon,
                > .text {
                    padding: 2rem;

                    box-sizing: border-box;
                    color: white;
                }
                > .icon {
                    display: flex;
                    min-width: 75px;
                    width: 75px;

                    font-size: 1.25rem;

                    align-items: center;
                    justify-content: center;
                }
                > .text {
                    padding-left: 0.5rem;

                    white-space: nowrap;
                }
            }
        }
    }
</style>

<script>
    export default {
        data: () => ({
            expanded: false,
        }),
        methods: {},
    };
</script>
