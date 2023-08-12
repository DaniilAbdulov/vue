<template>
    <nav-bar />
    <div class="app">
        <router-view></router-view>
    </div>
</template>
<script>
import NavBar from "@/components/NavBar";
export default {
    components: {
        NavBar,
    },
};
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 0px 20px;
    max-width: 1200px;
    margin: 0 auto;
}
.app__btns {
    display: flex;
    justify-content: space-between;
}
</style>
