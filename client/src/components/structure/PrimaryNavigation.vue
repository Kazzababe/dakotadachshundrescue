<template>
    <nav class="topnav">
        <div class="brand-container">
            <img src="/static/logo.jpeg" alt="Dakota Dachshund Rescue" />
        </div>
        <div class="links-container">
            <a href="#">NEWS</a>
            <a href="#">ADOPT</a>
            <a href="#">VOLUNTEER</a>
            <a href="#">DONATE</a>
            <a href="#">ABOUT</a>
            <a href="#">CONTACT</a>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.topnav {
    display: flex;
    height: 120px;
    padding: 0 3rem;

    align-items: center;
    justify-content: space-between;

    background-color: white;

    > .brand-container {
        display: flex;

        align-items: center;

        > img {
            height: 100px;
        }
    }
    > .links-container {
        display: flex;
        height: 100%;

        align-items: center;

        > a {
            display: flex;
            height: 100%;
            padding: 0 1.5rem;

            font-size: 1.1rem;
            text-decoration: none;

            align-items: center;

            color: hsl(0, 3%, 18%);
        }
    }
}
</style>

<script>
export default {

}
</script>