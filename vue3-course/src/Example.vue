Базовая структура
<template>
    <div>
        <button v-on:click="addLike">Like</button>
        <!-- v-on:click - это слушатель событий для кнопки, который вызывает
        функцию -->
        <button @click="addDislike">Dislike</button>
        <!-- v-on: можно заменить на @ -->
    </div>
    <div>
        Количество лайков <strong>{{ likes }}</strong>
    </div>
    <!-- Двойные скобки это интерполяция -->
    <div>
        Количество дизлайков <strong>{{ dislikes }}</strong>
    </div>
</template>

<script>
export default {
    data() {
        return {
            likes: 0, //данное значение добавится в блок template
            dislikes: 0,
        };
    },
    methods: {
        addLike() {
            //данная функция вызовется при срабатывании кнопки
            this.likes += 1;
        },
        addDislike() {
            this.dislikes += 1;
        },
    },
};
</script>

<style></style>
