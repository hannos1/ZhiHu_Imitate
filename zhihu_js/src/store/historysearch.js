import {defineStore} from 'pinia'
import { reactive } from 'vue'

export const useHistorySearchStore = defineStore('historysearch',() => {
    const words = reactive({
        word:[{
            content:'怎样改变性格'
        }],
        remainder:[]
    })

    let maxlenght = 4
     
    function setWords(item){
        if(!hasWord(item.content)){
            if(words.word.length < maxlenght){
                words.word.push(item)
            }else{
                setInRemainder()
                words.remainder.push(item)
            }
            return true
        }else{
            return false
        }
    }

    function removeall(){
        words.word = []
        words.remainder = []
    }

    function removeByContent(str){
        let index = -1
        index = findItemIndexByStr(str,words.word)
        if(index !== -1){
            words.word.splice(index,1)
        }else{
            index = findItemIndexByStr(str,words.remainder)
            words.remainder.splice(index,1)
        }
    }

    function findItemIndexByStr(str,list){
        let index = -1
        for(let i = 0;i < list.length;i++){
            if(list[i].content === str)index = i
        }
        return index
    }

    function hasWord(str){
        let items = words.word
        let remainderitems = words.remainder
        let hasword = false
        items.forEach((item) => {
            if(item.content === str){
                hasword = true
            }
        })
        remainderitems.forEach((item) => {
            if(item.content === str){
                hasword = true
            }
        })
        return hasword
    }

    function setInRemainder(){
        let wordslenght = words.word.length
        if(wordslenght > maxlenght){
            words.remainder = words.remainder.concat(words.word.splice(maxlenght,wordslenght-maxlenght))
        }
    }

    function setInWords(){
        words.word = words.word.concat(words.remainder)
        words.remainder = []
    }

    return {
        words,
        maxlenght,
        setWords,
        removeByContent,
        removeall,
        hasWord,
        setInRemainder,
        setInWords
    }
})