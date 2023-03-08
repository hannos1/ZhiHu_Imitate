import {defineStore} from 'pinia'
import { ref } from 'vue'

export const usePageStore = defineStore('page',() => {
    let pageIndex = ref(0)
    async function updatePage(e=0){
        console.log('页面跳转..',e)
        pageIndex = e
    }

    return {
        pageIndex,
        updatePage
    }
})





