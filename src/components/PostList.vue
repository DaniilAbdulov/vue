<template>
    <div v-if="posts.length != 0">
        <!--если массив постов пуст, то данный блок не будет выводиться, а выведется h2 v-else -->
        <h3>Список пользователей</h3>
        <post-item
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @remove="$emit('remove', post)"
        />
        <!--Так как пропсы изменять нельзя, то эмитим событие remove и отправляем его наверх, так же как в postItem-->
    </div>
    <h2 v-else style="color: red">List is empty</h2>
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
