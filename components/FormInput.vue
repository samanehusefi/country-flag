<template>
    <input class="border p-2 basis-full bg-inherit m-3" :placeholder="placeholder" :name="name" :type="type"
        v-model="localModelValue" />

    <span class="text-red-400 mt-1" v-show="validation.showError">{{ validation.errorMassage }}</span>
</template>

<script setup>
//import { string} from 'vue-types';

const props = defineProps({
    name: String,
    type: String,
    placeholder: String,
    validation: Object,
    modelValue: String
})
const { localModelValue } = useLocalModelValue({ props })

</script>