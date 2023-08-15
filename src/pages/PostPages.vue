<!-- https://www.youtube.com/watch?v=XzLuMtDelGk&t=537s&ab_channel=UlbiTV 1:25:07    -->
<template>
    <div>
        <h1>Page with posts</h1>
        <my-input v-focus v-model="searchQuery" placeholder="Search" />
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
        <div v-intersection="loadMorePosts" class="observer"></div>
        <list-of-page
            v-model="postPage"
            :totalPage="totalPage"
            :postPage="postPage"
        ></list-of-page>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import ListOfPage from "@/components/ListOfPage.vue";
import axios from "axios";
export default {
    components: {
        PostForm,
        PostList,
        ListOfPage,
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
        // changePage(pageNumber) {
        //     this.postPage = pageNumber;
        // },
        async fetchPosts() {
            try {
                this.loadingList = true;
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts`,
                    {
                        params: {
                            _page: this.postPage,
                            _limit: this.postLimit,
                        },
                    }
                );
                if (response.status >= 400) {
                    throw new Error("Error");
                }

                this.totalPage = Math.ceil(
                    response.headers["x-total-count"] / this.postLimit
                );
                this.posts = await response.data;
            } catch (error) {
                alert(error);
            } finally {
                this.loadingList = false;
            }
        },
        async loadMorePosts() {
            try {
                // this.loadingList = true;
                this.postPage += 1;
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?_page=${this.postPage}&_limit=${this.postLimit}`
                );

                if (!response.ok) {
                    throw new Error("Error");
                }

                const totalCount = parseInt(
                    response.headers.get("x-total-count"),
                    10
                );
                this.totalPage = Math.ceil(totalCount / this.postLimit);
                const data = await response.json();
                this.posts = [...this.posts, ...data];
            } catch (error) {
                alert(error);
            }
            // finally {
            //     this.loadingList = false;
            // }
        },
    },
    mounted() {
        this.fetchPosts();
        //  console.log(this.$refs.observer); // <div ref="observer" class="observer"></div> Таким способом во Vue монжно получить доступ к DOM элементу
        // let options = {
        //     rootMargin: "0px",
        //     threshold: 1.0,
        // };
        // const callback = (entries, observer) => {
        //     if (entries[0].isIntersecting && this.postPage < this.totalPage) {
        //         this.loadMorePosts();
        //     }
        // };
        // let observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer);
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
        // postPage() {
        //     this.fetchPosts();
        // },
    },
};
</script>

<style>
.observer {
    height: 30px;
    border: 1px solid black;
}
</style>
