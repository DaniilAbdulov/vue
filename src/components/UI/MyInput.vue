<template>
    <input :value="modelValue" @input="updateInput" type="text" class="input" />
</template>

<script>
export default {
    name: "my-input",
    props: {
        modelValue: [String, Number],
    },
    methods: {
        updateInput(event) {
            this.$emit("update:modelValue", event.target.value);
        },
    },
};
</script>

<style>
.input {
    width: 100%;
    border: 2px solid green;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
