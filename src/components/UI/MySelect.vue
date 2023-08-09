<template>
    <select :value="modelValue" @change="changeOptions">
        <option disabled value="">Choose</option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script>
export default {
    name: "my-select",
    props: {
        modelValue: {
            type: [String, Number],
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        changeOptions(event) {
            this.$emit("update:modelValue", event.target.value);
        },
    },
};
</script>
<!--
1)Создаем компонент MySelect
2)в тег select помещаем два тега option. Один дефолтный с пустым значением. Второй будет итерироваться
в массиве options.
3)Массив options - это переданный через props массив sortOptions из App. 
:options="sortOptions" />
            sortOptions: [
                { value: "title", name: "По названию" },
4)Во втором теге option после итерации будет выводится option.name - например, "По названию"
5) Двухстороннее связывание реализовано в теге select. При нажатии срабатывает changeOptions, которая
принимает аргументом event. И с помощью $emit апдэйтит в компоненте App <my-select v-model="selectedSort"
6) С помощью <select :value="modelValue" и     props: {
        modelValue: {
            type: String,
        }, 
    передается из App значение selectedSort: "", которое изначально - пустая строка
7) После срабатывания changeOptions новое значение selectedSort попадает в App
8) В методе     computed: {
        sortedPosts() {
            return [
                ...this.posts.sort((a, b) => {
                    return a[this.selectedSort]?.localeCompare(
                        b[this.selectedSort]
                    );
    Происходит сортировка массива, согласно значения selectedSort, которое было передано.
-->
<style></style>
