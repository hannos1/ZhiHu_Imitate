import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user',() => {
    let islogin = ref(false)
    function userLogin(data){
        localStorage.setItem('userToken',JSON.stringify(data))
        updateLogin()
    }

    function updateLogin(){
        let token = JSON.parse(localStorage.getItem('userToken'))
        if(token){
            islogin.value = true
        }else{
            islogin.value = false
        }
    }

    function exitLogin(){
        localStorage.removeItem('userToken')
        updateLogin()
    }
    return {
        islogin,
        updateLogin,
        userLogin,
        exitLogin
    }
})