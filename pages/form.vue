<template>
    <div class="conatiner">
        <div class="flex flex-wrap basis-1/3 w-[700px] justify-center ">
            <div class="container">
                <div class="flex justify-center flex-wrap w-full">
                    <input class="w-full m-3 p-3 border-2 border  border-green-300 rounded-lg" v-bind="firstNameModel"
                        placeholder="FirstName">
                    <span class="text-red-300">{{ errors.firstName }}</span>
                    <input class="w-full m-3 p-3 border-2 border  border-green-300 rounded-lg" v-bind="lastNameModel"
                        placeholder="LastName">
                    <span class="text-red-300">{{ errors.lastName }}</span>
                    <input class="w-full m-3 p-3 border-2 border  border-green-300 rounded-lg" v-bind="phoneModel"
                        placeholder="PhoneNumber">
                    <span class="text-red-300">{{ errors.phoneNumber }}</span>
                    <input class="w-full m-3 p-3 border-2 border  border-green-300 rounded-lg" v-bind="emailModel"
                        placeholder="EmailAddress" />
                    <span class="text-red-300">{{ errors.emailSchema }}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

import { useForm } from 'vee-validate'
import * as yup from 'yup';

const schema = yup.object({
    emailSchema:yup.string().required("Please Enter Email").email("Please Enter a Correct Email"),
    firstName: yup.string().min(2).max(100).required(),
    lastName: yup.string().min(10).max(256).required(),
    phoneNumber: yup.string().required().test((value, context) => {
        const customPhoneCondition = valid(value)
        return customPhoneCondition || context.createError({ message: "Please Enter a Correct Phone Number" })
    })

});



const phoneNumberValidation = /^((\+98|0)?9\d{9})$/;


const valid = (phone) => {
 console.log("phoneNumber==>",phone)
    return phone.length && phone.test(phoneNumberValidation)
 
    
}

const { defineInputBinds, errors } = useForm({
    validationSchema: schema
})

const emailModel = defineInputBinds('emailSchema')
const firstNameModel = defineInputBinds('firstName')
const lastNameModel = defineInputBinds('lastName')
const phoneModel = defineInputBinds('phoneNumber')
</script>