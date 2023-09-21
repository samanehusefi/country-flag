<template>
    <section>
        <div class="flex w-screen">
            <div class="basis-1/3 bg-slate-200 h-screen  content-center flex flex-wrap items-center justify-center">
                <div class="h-[350px] w-[350px] relative" @click="showForm()">
                    <img src="../images/tomato-4-svgrepo-com.svg" alt="" class="svg-time" />

                </div>
                <div class="content-center flex items-center justify-center mx-auto">
                    <button class="w-[150px] border rounded-full bg-gray-300  text-zinc-500 m-3 p-3 text-[14px]">Small Break</button>
                    <button class="w-[150px] border rounded-full bg-gray-300  text-zinc-500 m-3 p-3 text-[14px]">Long Break</button>
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
                                    v-model="form.Name.text" />
                                <span v-show="form.Name.isError == true" class="text-red-900">
                                    {{ form.Name.error }}
                                </span>
                                <FormInput name="Email" placeholder="Enter your email" required type="email"
                                    v-model="form.Email.text" />
                                <span v-show="form.Email.isError == true" class="text-red-900">
                                    {{ form.Email.error }}
                                </span>
                                <button class="basis-full border rounded-full bg-black text-white m-3 p-2"
                                    @click="validForm(form.value.Email.text)">Start</button>
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
const reset = () => {

}
let showforms = ref(false);
let palyform = ref(true);

const showForm = () => {
    palyform.value = false;
    showforms.value = true;
}
//  validateEmail(email) {
//       if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//         return
//       } 
//       else {
//         alert("Email invalid!")
//       }
//     };

const form = ref({
    Name: {
        error: "Name Not Empty",
        isError: false,
        text: ""
    },
    Email: {
        error: "Not Valid",
        isError: false,
        text: ""
    }
})

const validForm = computed((email) => {
    if (!form.value.Name.text.length || !form.value.Email.text.length) {
        debugger;
        form.value.Name.isError = true;
    }
    else {
        form.value.Name.isError = false;
        form.value.Email.isError = false;
    }



})

</script>
<style>
.svg-time {
    position: absolute;
    content: "../images/Play.svg";
}
</style>