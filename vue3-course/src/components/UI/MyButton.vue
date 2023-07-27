<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: "my-botton",
};
</script>

<style>
.btn {
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
}
</style>
