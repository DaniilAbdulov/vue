<template>
    <div>
        <h3>Список пользователей</h3>
        <post-item v-for="post in posts" :post="post" />
    </div>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
    components: {
        PostItem,
    },
    props: {
        posts: {
            type: Array,
            required: true,
        },
    },
};
</script>
<!--С помощью пропсов импортируем из App в строке <post-list :posts="posts" /> посты, которые в App указаны в     data() {
        return {
            posts: [
                { id: 1, title: "First", body: "Описание 1" },
            ],-->
<style></style>
