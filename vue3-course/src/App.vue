<!-- https://www.youtube.com/watch?v=XzLuMtDelGk&t=537s&ab_channel=UlbiTV 1:25:07    -->
<template>
    <div class="app">
        <h1>Page with posts</h1>
        <my-button
            @click="showDialog"
            style="margin-top: 10px; margin-bottom: 10px"
            >Create post</my-button
        >
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list v-if="!loadingList" :posts="posts" @remove="removePost" />
        <div v-else>Loading...</div>
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
            posts: [],
            title: "",
            body: "",
            dialogVisible: false,
            loadingList: false,
        };
    },
    methods: {
        //обязательно передаем post в функцию
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter((p) => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            try {
                this.loadingList = true;
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts?_limit=5"
                );
                if (!response.ok) {
                    throw new Error("Error");
                }
                this.posts = await response.json();
            } catch (error) {
                alert(error);
            } finally {
                this.loadingList = false;
            }
        },
    },
    mounted() {
        this.fetchPosts();
        //mounted - это хук жизненного цикла/ Вызывается после монтирования экземпляра
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
</style>
