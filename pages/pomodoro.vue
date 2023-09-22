<template>
    <section class="container">
        <div class="flex ">
            <div :class="['bg-slate-200 h-screen  content-center flex flex-wrap items-center justify-center' , showScreen ? '-ml-[17%] basis-1/2': 'basis-1/3']">
                <div class="h-[350px] w-[350px] relative" @click="showForm()">
                    <img src="../images/tomato-4-svgrepo-com.svg" alt="" class="svg-time"/>

                </div>
                <div class="basis-full content-center flex flex-wrap items-center justify-center">
                    <h2 class="basis-full text-center text-6xl" v-if="showTimer">
                        {{ timer.minutes }} : {{ timer.seconds }}
                    </h2>
                </div>
                <div class="content-center flex items-center justify-center mx-auto">
                   
                    <button class="w-[150px] border rounded-full bg-gray-300  text-zinc-500 m-3 p-3 text-[14px]"
                    @click="timer.pause()" >Small Break</button>
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
                                <FormInput name="Name" placeholder="Enter your Name" required type="text"
                                    v-model="form.Name.text" :validation="validName" />
                                <span class="text-red-900">
                                    error
                                    <!-- {{validName.validationNameMessage.message}} -->
                                </span>


                                <FormInput name="Email" placeholder="Enter your email" required type="email"
                                    v-model="form.Email.text" :validation="validEmail" />


                                <button class="basis-full border rounded-full bg-black text-white m-3 p-2"
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
import { onMounted } from 'vue'
import { useTimer } from 'vue-timer-hook';



const time = new Date();
time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
const timer = useTimer(time);
const restartFive = () => {
    // Restarts to 5 minutes timer
    const time = new Date();
    time.setSeconds(time.getSeconds() + 300);
    timer.restart(time);
}
onMounted(() => {
  watchEffect(async () => {
    if(timer.isExpired.value) {
        console.warn('IsExpired')
    }
  })
})



let showforms = ref(false);
let palyform = ref(true);
const validation = ref(false);
const validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const showTimer = ref(false)
const showScreen=ref()
const showForm = () => {
    palyform.value = false;
    showforms.value = true;
    showScreen.value=true;
}




const reset = () => {
    palyform.value = true;
    showforms.value = false;
    showScreen.value=false;
    timer.autostart=false;
    showTimer.value = false;
    timer.restart(time);
}
const form = ref({
    Name: {
        text: ""
    },
    Email: {
        text: ""
    }
})

const validName = computed(() => {
    debugger;
    let validationNameMessage = {
        showValidation: false,
        message: null,
    };
    if (!form.value.Name.text.length && validation.value) {
        validationNameMessage.showValidation = true;
        validationNameMessage.message = "Please Enter Your Name";
    }
    else if (validation.value && form.value.Name.text.length < 3) {
        validationNameMessage.showValidation = true;
        validationNameMessage.message = "Please Enter Your Name";
    }
    else {
        validationNameMessage.showValidation = false;
    }

    console.log("emanail==>", validationNameMessage.message)
    return validationNameMessage;
})

const validEmail = computed(() => {
    debugger;
    let validationMessage = {
        showValidation: false,
        message: null,

    };

    if (!form.value.Email.text.length && validation.value) {
        validationMessage.showValidation = true;
        validationMessage.massege = "Please Your Email";
    }
    else if (validation.value && form.value.Email.text.match(validateEmail)) {
        validationMessage.showValidation = true;
        validationMessage.massege = "Please Enter a Correct Your Email";

    }
    else {
        validationMessage.showValidation = false;
    }

    console.log("email==>", validationMessage.message)
    return validationMessage;
})

const start = () => {
    validation.value = true;
    showTimer.value = true;
    palyform.value = true;
    showforms.value = false;
    showScreen.value=false;
    if (!validName.value && !validEmail.value) {

    }

}

</script>




<style>
.svg-time {
    position: absolute;
    content: "../images/Play.svg";
}
</style>