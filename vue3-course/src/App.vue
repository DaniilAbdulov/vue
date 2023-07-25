<!-- https://www.youtube.com/watch?v=XzLuMtDelGk&t=537s&ab_channel=UlbiTV 25:38    -->
<template>
    <div class="app">
        <form>
            <input
                class="input"
                type="text"
                name=""
                placeholder="Название"
                id=""
            />
            <input
                class="input"
                type="text"
                name=""
                placeholder="Описание"
                id=""
            />
            <button class="btn">Создать</button>
        </form>
        <div class="post" v-for="post in posts">
            <!--v-for - это директива для работы с массивами. Только что мы запустили цикл по итерации оъектов post в массиве postS-->
            <div><strong>Название: </strong>{{ post.title }}</div>
            <div><strong>Описание: </strong>{{ post.body }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: [
                { id: 1, title: "First", body: "Описание 1" },
                { id: 2, title: "Second", body: "Описание 2" },
                { id: 3, title: "Third", body: "Описание 3" },
                { id: 3, title: "Four", body: "Описание 4" },
            ],
        };
    },
    methods: {},
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
}
form {
    display: flex;
    flex-direction: column;
}
.btn {
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
}
.post {
    padding: 15px;
    border: 2px solid black;
    margin-top: 15px;
}
form .input {
    width: 100%;
    border: 2px solid green;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
