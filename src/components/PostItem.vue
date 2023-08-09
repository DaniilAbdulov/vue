<template>
    <div class="post">
        <div>
            <div>id: {{ post.id }}</div>
            <div><strong>Название: </strong>{{ post.title }}</div>
            <div><strong>Описание: </strong>{{ post.body }}</div>
            <div v-if="post.time" class="timeCode">
                Время публикации: {{ post.time }}
            </div>
            <div v-else class="timeCode">Время публикации: -</div>
        </div>
        <div class="post__buttons">
            <my-button @click="$emit('remove', post)">Удалить</my-button>
            <!--Так как пропсы изменять нельзя, то эмитим событие remove и отправляем его наверх-->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style>
.post {
    padding: 15px;
    border: 2px solid black;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}
.timeCode {
    font-style: italic;
}
</style>
