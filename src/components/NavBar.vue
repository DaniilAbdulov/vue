<template>
    <div class="navbar">
        <div @click="$router.push('/')">Abdulov</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/about')">About</my-button>
            <my-button @click="$router.push('/posts')">Posts</my-button>
            <my-button @click="$router.push('/store')">Vuex</my-button>
            <my-button
                style="margin-left: 20px"
                @click="$router.push('/composition')"
                >Composition</my-button
            >
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style>
.nabar {
    height: 50px;
    background-color: black;
    display: flex;
    align-items: center;
}
.navbar__btns {
    margin-left: auto;
}
</style>
