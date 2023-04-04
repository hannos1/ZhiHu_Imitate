import {defineStore} from 'pinia'
import { reactive } from 'vue'
import {getConcernList} from '../service/concern';

export const useConcernStore = defineStore('concerned',() => {
    const concernedList = reactive({
        list:[],
        allList:[]
    })

    async function getList(){
        if(concernedList.allList.length === 0){
            concernedList.allList = await getConcernList()
            concernedList.list = []
        }
    }

    function addAllList(id){
        let index = getItemIndex(id)
        if(index !== -1){
            concernedList.allList[index].isConcerned = true
            updateList()
            return true
        }else{
            return false
        }
    }

    function popAllList(id){
        let index = getItemIndex(id)
        if(index !== -1){
            concernedList.allList[index].isConcerned = false
            updateList()
            return true
        }else{
            return false
        }
    }

    function getItemIndex(id){
        let index = -1
        for(let i = 0;i < concernedList.allList.length;i++){
            if(concernedList.allList[i].id === id){
                index = i
            }
        }
        return index
    }

    function updateList(){
        concernedList.list = concernedList.allList.filter((item) => item.isConcerned)
    }

    return {
        getList,
        addAllList,
        popAllList,
        updateList,
        concernedList
    }
})