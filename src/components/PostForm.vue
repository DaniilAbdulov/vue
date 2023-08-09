<template>
    <form @submit.prevent>
        <my-input
            v-model="post.title"
            type="text"
            name=""
            placeholder="Название"
            id=""
        />
        <!-- v-bind:value="post.title"
            @input="post.title = $event.target.value"  всю эту конструкцию можно заменить на:
        v-model="post.title"
        -->

        <!--v-bind:value="..." связывает данные с каким-то компонентом
                 @input="inputTitle" - подписываемся на событие инпут и из инпута забирать вэлью
            -->
        <my-input
            v-model="post.body"
            type="text"
            name=""
            placeholder="Описание"
            id=""
        />
        <!--@input="body = $event.target.value" - то же самое, что и вызов функции inputTitle
            -->
        <my-button @click="createPost">Создать</my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: "",
                body: "",
            },
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.post.time = new Intl.DateTimeFormat("ru", {
                dateStyle: "long",
                timeStyle: "short",
                timeZone: "Asia/Yekaterinburg",
            }).format(Date.now());
            this.$emit("create", this.post);
            this.post = {
                title: "",
                body: "",
            };
        },
    },
};
</script>
<!--функци emit принимает название события, вторым аргументы, которые будут попадать в функцию. В родительском компоненете(App) необходимо на это событие подписаться-->
<style>
form {
    display: flex;
    flex-direction: column;
}
</style>
