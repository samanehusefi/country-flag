<template>
    <section class="w-full">
        <div class="flex ">
            <div
                :class="['bg-slate-200 h-screen  content-center flex flex-wrap items-center justify-center', showScreen ? '-ml-[25%] basis-1/2' : 'basis-1/3']">
                <div class="h-[350px] w-[350px] relative" @click="showForm()">
                    <img src="../images/tomato-4-svgrepo-com.svg" alt="" class="svg-time" />

                </div>
                <div class="basis-full content-center flex flex-wrap items-center justify-center">
                    <h2 class="basis-full text-center text-6xl" v-if="showTimer">
                        {{ timer.minutes }} : {{ timer.seconds }}
                    </h2>
                </div>
                <div class="content-center flex items-center justify-center mx-auto">

                    <button class="w-[150px] border rounded-full bg-gray-300  text-zinc-500 m-3 p-3 text-[14px]"
                        @click="timer.pause()">Small Break</button>
                    <button class="w-[150px] border rounded-full bg-gray-300  text-zinc-500 m-3 p-3 text-[14px]"
                        @click="timer.resume()">Long Break</button>
                </div>
            </div>
            <div class="basis-2/3  bg-white">
                <div class="container px-2 mx-3">
                    <div v-show="palyform" class="content-center flex items-center justify-center h-screen ">
                        <img src="../images/hourglass-wait.svg" alt="" class="w-[50px] " />
                    </div>
                    <div v-show="showforms" class="px-2 mx-3">
                        <div class="basis-full gap-x-36 flex justify-end mt-3 mx-5">
                            <span>Statistic</span>
                            <span>Profile</span>
                        </div>
                        <div class="basis-full gap-x-36 flex  mt-3">
                            <div class="flex flex-wrap mx-auto my-3">
                                <p class="font-bold text-2xl p-1 m-2">New Task</p>
                                <FormInput name="Name" placeholder="Enter Your Name" type="text"
                                    v-model="formInfo.Name.content" :validation="validationNameForm" />
                                <FormInput name="Email" placeholder="Enter Your email" type="Email"
                                    v-model="formInfo.Email.content" :validation="validationEmailForm" />
                                <button class="basis-full border rounded-full bg-black text-white m-3 p-2" type="submit"
                                    @click="start()">Start</button>
                                <button class="basis-full border rounded-full bg-slate-200 text-black m-3 p-2"
                                    @click="reset()">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script setup>

import { useTimer } from 'vue-timer-hook';

const time = new Date();
time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
const timer = useTimer(time);

const formInfo = ref({
    Name: {
        content: ''
    },
    Email: {
        content: ''
    },
});



let showforms = ref(false);
let palyform = ref(true);
const validation = ref(false);
const validateEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

const showTimer = ref(false)
const showScreen = ref()
const showForm = () => {
    palyform.value = false;
    showforms.value = true;
    showScreen.value = true;
}
const reset = () => {
    palyform.value = true;
    showforms.value = false;
    showScreen.value = false;
    timer.autostart = false;
    showTimer.value = false;
    timer.restart(time);
    clearValidation();
}

const start = () => {
    debugger;
    validation.value = true;

    if (validationNameForm.value.showError===false && validationEmailForm.value.showError===false) {
        showTimer.value = true;
        palyform.value = true;
        showforms.value = false;
        showScreen.value = false;
        clearValidation();
    }

}
const validationNameForm = computed(() => {
    debugger;
    let validationError = {
        showError: false,
        errorMassage: null,
    }
    if (!formInfo.value.Name.content.length && validation.value) {
        validationError.showError = true;
        validationError.errorMassage = 'Please Enter Your Name'
    } else if (formInfo.value.Name.content.length > 4 && validation.value) {
        validationError.showError = true;
        validationError.errorMassage = 'The Name Must Be More Than 3 Letters'
    } else {
        validationError.showError = false;
    }
    console.log("Name=>", formInfo.value.Name.content.length)
    return validationError
})
const validationEmailForm = computed(() => {
    debugger;
    let validationError = {
        showError: false,
        errorMassage: null,
    };
    if (!formInfo.value.Email.content.length && validation.value) {
        validationError.showError = true;
        validationError.errorMassage = 'Please Enter Your Email'
    } else if (!formInfo.value.Email.content.match(validateEmail) && validation.value) {
        validationError.showError = true;
        validationError.errorMassage = 'Please Enter a Correct Email'
    } else {
        validationError.showError = false;
    }
    console.log("Email=>", formInfo.value.Email.content.length)
    return validationError
})


const clearValidation = () => {
    formInfo.value.Name.content = '';
    formInfo.value.Email.content = '';
    formInfo.value.Name.content.length = 0;
    formInfo.value.Email.content.length = 0;
    validation.value = false;
}

</script>




<style>
.svg-time {
    position: absolute;
    content: "../images/Play.svg";
}
</style>