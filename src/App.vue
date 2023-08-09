<!-- https://www.youtube.com/watch?v=XzLuMtDelGk&t=537s&ab_channel=UlbiTV 1:25:07    -->
<template>
    <div class="app">
        <h1>Page with posts</h1>
        <my-input v-model="searchQuery" placeholder="Search" />
        <div class="app__btns">
            <my-button
                @click="showDialog"
                style="margin-top: 10px; margin-bottom: 10px"
                >Create post</my-button
            >
            <my-select v-model="selectedSort" :options="sortOptions" />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list
            v-if="!loadingList"
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
        />
        <div v-else>Loading...</div>
        <post-pages
            v-model="postPage"
            :totalPage="totalPage"
            :postPage="postPage"
        ></post-pages>
    </div>
</template>

<script>
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import PostPages from "./components/PostPages.vue";
export default {
    components: {
        PostForm,
        PostList,
        PostPages,
    },
    data() {
        return {
            posts: [],
            title: "",
            body: "",
            dialogVisible: false,
            loadingList: false,
            selectedSort: "",
            searchQuery: "",
            postPage: 1,
            postLimit: 10,
            totalPage: 0,
            sortOptions: [
                { value: "title", name: "По названию" },
                { value: "body", name: "По содержимому" },
                { value: "id", name: "По дате" },
            ],
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
        changePage(pageNumber) {
            this.postPage = pageNumber;
        },
        async fetchPosts() {
            try {
                this.loadingList = true;
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?_limit=${this.postLimit}&_page=${this.postPage}`
                );
                if (!response.ok) {
                    throw new Error("Error");
                }
                this.posts = await response.json();
                this.totalPage = Math.ceil(
                    response.headers.get("x-total-count") / this.postLimit
                );
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
    computed: {
        sortedPosts() {
            return [
                ...this.posts.sort((a, b) => {
                    if (
                        typeof a[this.selectedSort] === "string" &&
                        typeof b[this.selectedSort] === "string"
                    ) {
                        return a[this.selectedSort]?.localeCompare(
                            b[this.selectedSort]
                        );
                    } else {
                        return a[this.selectedSort] - b[this.selectedSort];
                    }
                }),
            ];
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(
                (post) =>
                    post.title.includes(this.searchQuery) ||
                    post.body.includes(this.searchQuery)
            );
        },
    },
    watch: {
        postPage() {
            this.fetchPosts();
        },
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
