import {defineStore} from 'pinia'
import { reactive, ref } from 'vue'
import {getRecommendIndex} from '../service/recommend'

export const useHomeIndexStore = defineStore('homeindex',() => {
    const pagedata = reactive({
        data:[]
    })
    function updateData(){
        return new Promise(async (resolve) => {
            let data = await getRecommendIndex()
            pagedata.data = pagedata.data.concat(data)
            console.log('loading complate...')
            resolve()
        })
    }

    return {
        pagedata,
        updateData
    }
})

