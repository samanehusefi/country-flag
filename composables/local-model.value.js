export const useLocalModelValue=({props, property = 'modelValue'})=>{
const localModelValue=ref(unref(props[property]))
const currentInstance=getCurrentInstance()



watch(localModelValue,()=>{
    currentInstance.emit(`update:${property}`,localModelValue.value)
})

watch(()=>props[property],(newValue)=>{
    localModelValue.value=newValue
})

return {
    localModelValue
}
}