<!-- https://www.youtube.com/watch?v=XzLuMtDelGk&t=537s&ab_channel=UlbiTV 1:25:07    -->
<template>
    <div>
        <h1 style="color: red">Page with posts</h1>
        <my-input
            v-focus
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Search"
        />
        <div class="app__btns">
            <my-button
                @click="showDialog"
                style="margin-top: 10px; margin-bottom: 10px"
                >Create post</my-button
            >
            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
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
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            dialogVisible: false,
        };
    },
    methods: {
        ...mapMutations({
            setPostPage: "post/setPostPage",
            setSearchQuery: "post/setSearchQuery",
            setSelectedSort: "post/setSelectedSort",
        }),
        ...mapActions({
            loadMorePosts: "post/loadMorePosts",
            fetchPosts: "post/fetchPosts",
            createPost: "post/createPost",
            removePost: "post/removePost",
        }),
        showDialog() {
            this.dialogVisible = true;
        },
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        ...mapState({
            posts: (state) => state.post.posts,
            loadingList: (state) => state.post.loadingList,
            selectedSort: (state) => state.post.selectedSort,
            searchQuery: (state) => state.post.searchQuery,
            postPage: (state) => state.post.postPage,
            postLimit: (state) => state.post.postLimit,
            totalPage: (state) => state.post.totalPage,
            sortOptions: (state) => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPosts: "/post/sortedPosts",
            sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
        }),
    },
    watch: {},
};
</script>

<style>
.observer {
    height: 30px;
    border: 1px solid black;
}
</style>
