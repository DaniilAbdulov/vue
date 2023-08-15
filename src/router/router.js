import { createRouter, createWebHistory } from "vue-router";
import PostPages from "@/pages/PostPages";
import Main from "@/pages/Main";
import About from "@/pages/About";
import PostIdPage from "@/pages/PostIdPage";
import PostPagesWithVuex from "@/pages/PostPagesWithVuex";

const routes = [
    {
        path: "/",
        component: Main,
    },
    {
        path: "/posts",
        component: PostPages,
    },
    {
        path: "/about",
        component: About,
    },
    {
        path: "/posts/:id",
        component: PostIdPage,
    },
    {
        path: "/store",
        component: PostPagesWithVuex,
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
});

export default router;
