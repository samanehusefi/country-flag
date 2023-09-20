<template>
    <section class="container">
        <div class="flex w-screen">
            <div class="basis-1/3 bg-slate-200 h-screen  content-center flex items-center justify-center">
                <div class="h-[350px] w-[350px] rounded-full bg-black " @click="showForm()"></div>
            </div>
            <div class="basis-2/3 px-2 mx-3">
                <div v-show="palyform">
                    Search
                </div>
                <div v-show="showforms">
                    <div class="basis-full gap-x-36 flex justify-end mt-3">
                    <span>Profile</span>
                    <span>Statistic</span>
                </div>
                <div class="basis-full gap-x-36 flex justify-end mt-3">
                  <div class="flex flex-wrap mx-auto my-3">
                    <p class="font-bold text-2xl p-1 m-2">New Task</p>
                    <FormInput name="Name" placeholder="Name" type="text" v-model="form.Name.text"/>
                    <span v-show="form.Name.isError==true" class="text-red-900">
                        {{ form.Name.error }}
                    </span>
                    <FormInput name="Email" placeholder="Email" type="email" v-model="form.Email.text"/>
                    <span v-show="form.Email.isError==true" class="text-red-900">
                        {{ form.Email.error }}
                    </span>
                    <button class="basis-full border rounded-xl bg-black text-white m-3 p-2" @click="validForm()">Start</button>
                    <button class="basis-full border rounded-xl bg-slate-200 text-black m-3 p-2" @click="reset()">Cancel</button>
                  </div>
                </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script setup>
const form=ref({
    Name:{
        error:"Name Not Empty",
        isError:false,
        text:""
    },
    Email:{
        error:"Not Valid",
        isError:false,
        text:""
    }
})

const validForm=computed(()=>{
    if(!form.value.Name.text.length){
        debugger;
        form.value.Name.isError = true;
    }
    else{
        form.value.Name.isError = false;
    }
    if(!form.value.Email.text.length){
        form.value.Email.isError = true;
    }
    else{
        form.value.Email.isError = false;
    }
return  form.value.Name.isError

})
const reset=()=>{

}
let showforms=ref(false);
let palyform=ref(true);

const showForm=()=>{
    palyform.value=false;
    showforms.value=true;
}
</script>