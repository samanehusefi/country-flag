<template>
    <div class="bg-[#F1F5F9] p-3 rounded-xl">
        <lable class="relative block bg-inherit flex items-center gap-2" v-if="lable" :for="id">
            <div class="border-r pr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_7_209)">
                        <path
                            d="M23.5612 21.4454L18.9161 16.7983C22.3918 12.1535 21.4441 5.57052 16.7993 2.0948C12.1546 -1.38092 5.57156 -0.433205 2.09584 4.21157C-1.37988 8.85634 -0.432167 15.4393 4.21261 18.9151C7.94367 21.7071 13.0682 21.7071 16.7993 18.9151L21.4464 23.5622C22.0304 24.1462 22.9773 24.1462 23.5612 23.5622C24.1452 22.9782 24.1452 22.0314 23.5612 21.4474L23.5612 21.4454ZM10.5447 18.0181C6.41664 18.0181 3.07023 14.6717 3.07023 10.5437C3.07023 6.4156 6.41664 3.06919 10.5447 3.06919C14.6727 3.06919 18.0192 6.4156 18.0192 10.5437C18.0148 14.6698 14.6709 18.0137 10.5447 18.0181Z"
                            fill="#374957" />
                    </g>
                    <defs>
                        <clipPath id="clip0_7_209">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <span class="sr-only">Search</span>
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input class="outline-none w-1/2 bg-inherit" placeholder="Search Country..."
             :type="type" :name="name"  v-model="localModelValue"/>
        </lable>
    </div>
</template>

<script setup>
import{string,oneOfType} from 'vue-types'

const props=defineProps({
    lable:string(),
    id:string(),
    name:string(),
    type:string().def('text'),
    modelValue:oneOfType([string()])
})
const { localModelValue} = useLocalModelValue({props})

</script>