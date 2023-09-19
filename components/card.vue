<template>
    <component class="card" :is="tag">
        <slot></slot>
    </component>
</template>

<script setup>
defineProps({
    tag: {
        type: String,
        default: 'div'
    }
})
</script>



<style>
.card {
    @apply bg-white rounded-xl
}
</style>
