<template>
    <form @submit.prevent>
        <input
            v-model="post.title"
            class="input"
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
        <input
            v-bind:value="post.body"
            @input="post.body = $event.target.value"
            class="input"
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

form .input {
    width: 100%;
    border: 2px solid green;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
