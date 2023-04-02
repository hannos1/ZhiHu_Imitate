import {defineStore} from 'pinia'
import { reactive, ref } from 'vue'
import {getPathList} from '../service/pathlist'

export const usePathListStore = defineStore('pathlist',() => {
    const pathlist = reactive({
        opened:[],
        closed:[]
    })

    async function getList(){
        let {opened,closed} = await getPathList()
        pathlist.opened = opened
        pathlist.closed = closed
    }

    function updateList(open,close){
        pathlist.opened = open
        pathlist.closed = close
        // console.log('index.js')
    }

    return {
        pathlist,
        getList,
        updateList
    }
})