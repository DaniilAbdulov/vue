<template>
    <div v-if="posts.length != 0">
        <!--если массив постов пуст, то данный блок не будет выводиться, а выведется h2 v-else -->
        <h3>Список пользователей</h3>
        <transition-group name="post-list">
            <post-item
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            />
        </transition-group>
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
<style>
.post-list-item {
    display: inline-block;
    margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
.post-list-move {
    transition: transform 0.3s ease;
}
</style>
