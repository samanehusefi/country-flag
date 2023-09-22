<template>
    <input class="border p-2 basis-full bg-inherit m-3" :placeholder="placeholder" :name="name" :type="type"
        v-model="modelValue" />
  
</template>

<script setup>
import { string, oneOfType, object } from 'vue-types';

const props = defineProps({
    name: string(),
    type: string().def('text'),
    placeholder: string(),
    modelValue: oneOfType([string()])
})
const { modelValue } = useLocalModelValue({ props })
</script>