import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme',() => {
    let theme = ref('')
    async function updateTheme(str){
        localStorage.setItem('theme',str)
    }

    async function getTheme(){
        let item = localStorage.getItem('theme') || 'dark'
        theme.value = item
    }

    return {
        theme,
        updateTheme,
        getTheme
    }
})