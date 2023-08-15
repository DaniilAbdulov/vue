import axios from "axios";
export const PostModule = {
    state: () => ({
        posts: [],
        title: "",
        body: "",
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
    }),
    getters: {
        sortedPosts(state) {
            return [
                ...state.posts.sort((a, b) => {
                    if (
                        typeof a[state.selectedSort] === "string" &&
                        typeof b[state.selectedSort] === "string"
                    ) {
                        return a[state.selectedSort]?.localeCompare(
                            b[state.selectedSort]
                        );
                    } else {
                        return a[state.selectedSort] - b[state.selectedSort];
                    }
                }),
            ];
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(
                (post) =>
                    post.title.includes(state.searchQuery) ||
                    post.body.includes(state.searchQuery)
            );
        },
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.loadingList = bool;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setPostPage(state, postPage) {
            state.postPage = postPage;
        },
        setTotalPage(state, totalPage) {
            state.totalPage = totalPage;
        },
        CREATE_POST(state, newPost) {
            state.posts.push(newPost);
        },
        REMOVE_POST(state, postToRemove) {
            state.posts = state.posts.filter(
                (post) => post.id !== postToRemove.id
            );
        },
    },
    actions: {
        async fetchPosts({ state, commit }) {
            try {
                commit("setLoading", true);
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts`,
                    {
                        params: {
                            _page: state.postPage,
                            _limit: state.postLimit,
                        },
                    }
                );
                if (response.status >= 400) {
                    throw new Error("Error");
                }

                commit(
                    "setTotalPage",
                    Math.ceil(
                        response.headers["x-total-count"] / state.postLimit
                    )
                );
                commit("setPosts", response.data);
            } catch (error) {
                alert(error);
            } finally {
                commit("setLoading", false);
            }
        },
        async loadMorePosts({ state, commit }) {
            try {
                commit("setPostPage", (state.postPage += 1));
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?_page=${state.postPage}&_limit=${state.postLimit}`
                );

                if (!response.ok) {
                    throw new Error("Error");
                }

                const totalCount = parseInt(
                    response.headers.get("x-total-count"),
                    10
                );
                commit("setTotalPage", Math.ceil(totalCount / state.postLimit));
                const data = await response.json();
                commit("setPosts", [...state.posts, ...data]);
            } catch (error) {
                alert(error);
            }
        },
        createPost({ commit }, post) {
            commit("CREATE_POST", post);
        },
        removePost({ commit }, post) {
            commit("REMOVE_POST", post);
        },
    },
    namespaced: true,
};
