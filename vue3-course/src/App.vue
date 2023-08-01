<!-- https://www.youtube.com/watch?v=XzLuMtDelGk&t=537s&ab_channel=UlbiTV 58:14    -->
<template>
    <div class="app">
        <post-form @create="createPost" />
        <post-list :posts="posts" @remove="removePost" />
        <!--можно заместо v-bind:posts="posts" написать :posts="posts" -->
        <!--прослушиваем событие remove -->
    </div>
</template>

<script>
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            posts: [
                { id: 1, title: "First", body: "Описание 1" },
                { id: 2, title: "Second", body: "Описание 2" },
                { id: 3, title: "Third", body: "Описание 3" },
                { id: 4, title: "Four", body: "Описание 4" },
            ],
            title: "",
            body: "",
        };
    },
    methods: {
        //обязательно передаем post в функцию
        createPost(post) {
            this.posts.push(post);
        },
        removePost(post) {
            this.posts = this.posts.filter((p) => p.id !== post.id);
        },
    },
};
//пробегаемся по массиву и оставляем посты с теми id, которые не равны post.id
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
</style>
