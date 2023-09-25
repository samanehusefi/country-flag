<template>
    <section class="w-full">
        <div class="flex ">
            <div
                :class="['bg-slate-200 h-screen  content-center flex flex-wrap items-center justify-center', showScreen ? '-ml-[25%] basis-1/2' : 'basis-1/3']">
                <div class="h-[350px] w-[350px] relative" @click="showForm()">
                    <img src="../images/tomato-4-svgrepo-com.svg" alt="tomato" />
                    <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute left-[35%] top-[45%]">
                        <path
                            d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"
                            stroke="#fff" stroke-width="2" stroke-linejoin="round" />
                    </svg>
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

    if (validationNameForm.value.showError === false && validationEmailForm.value.showError === false) {
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




