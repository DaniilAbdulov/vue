<template>
    <div class="page__wrapper" :value="modelValue">
        <div
            v-for="pageNumber in totalPage"
            :key="pageNumber"
            class="page"
            :class="{
                'current-page': postPage === pageNumber,
            }"
            @click="changePage(pageNumber)"
        >
            {{ pageNumber }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        totalPage: {
            type: Array,
            required: true,
        },
        postPage: {
            type: Number,
            required: true,
        },
    },
    methods: {
        changePage(pageNumber) {
            this.$emit("update:modelValue", pageNumber);
        },
    },
};
</script>
<style>
.page__wrapper {
    margin-top: 20px;
    display: flex;
    gap: 1px;
}
.page {
    border: 1px solid black;
    padding: 5px;
}
.current-page {
    border: 2px solid green;
}
</style>
