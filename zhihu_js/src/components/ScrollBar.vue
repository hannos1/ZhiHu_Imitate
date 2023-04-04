<template>
    <div class="scrollBar_container">
        <div class="scrollBar_swiper" ref="swiper">
            <div class="scrollBar_swiper__content">
                <div class="scrollBar_swiper__item" v-for="item in state.opened" :key="item.id">
                    <div class="scrollBar_swiper__label" :class="{active:state.current === '/home' + item.path}" @click="changePath(item.path,item.id)">{{ item.name }}</div>
                </div>
            </div>
        </div>
        <div class="listSwitch">
                <img src="../assets/img/列表.png" alt="" 
                @touchstart="clickon"
                @touchmove="stoptouch"
                @touchend="stoptouch"
                >
        </div>
    </div>
    <van-popup
        v-model:show="showBottom"
        position="bottom"
        round
        teleport="body"
        :close-on-click-overlay="false"
        :style="{ height: '100%' }"
        @close="updatestateList"
    >
        <PathList :opened="state.opened" :closed="state.closed" :isupdate="state.isupdate" />
    </van-popup>
</template>

<script setup>
import { onMounted,ref,reactive,onUpdated,provide } from 'vue';
import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
import PathList from './popup/PathList.vue';
import { usePathListStore } from '../store/pathlist';

const props = defineProps({
    pathList:{
        type:Array,
        default:[]
    },
    current:{
        type:String,
        default:''
    }
})

BScroll.use(ObserveDOM)  // 添加新的拓展属性  动态dom

const emits = defineEmits(['changeCurrent'])


const swiper = ref(null) 
let bs = null // betterscroll的初始值

const pathListStore = usePathListStore()

const state = reactive({ // 当前页面状态
    current:'',
    opened:[],
    closed:[],
    isupdate:false   // 每次点击关闭按钮就会修改这个值，让传入的值发生变化
})

let showBottom = ref(false)


async function updatestateList(){  // 点击关闭按钮  必须保证父组件取到最新值
    state.opened = pathListStore.pathlist.opened
    state.closed = pathListStore.pathlist.closed
    state.isupdate = !state.isupdate
}

async function updateStore(opened,closed){  // 点击完成按钮就触发，通过依赖注入来让子组件调用
    await pathListStore.updateList(opened,closed)
}


function changePath(path,id){
    moveToCenter(id)
    emits('changeCurrent','/home' + path)
}

function changePathList(b){  // 打开关闭弹层
    showBottom.value = b
}

function clickon(e){
    e.stopPropagation()
    changePathList(true)
}

function stoptouch(e){
    e.stopPropagation()
}

function closeTag(id){
    let items = state.opened.filter((i) => i.id !== id)
    let closeitem = state.opened.filter((i) => i.id === id)
    state.opened = items
    state.closed = state.closed.concat(closeitem)
}

function openTag(id){
    let items = state.closed.filter((i) => i.id !== id)
    let openitem = state.closed.filter((i) => i.id === id)
    state.closed = items
    state.opened = state.opened.concat(openitem)
}

provide('complatelist', {
    changePathList,
    updateStore,
    closeTag,
    openTag
})

onMounted(async () => {
    bs = new BScroll(swiper.value,{
        scrollX:true,
        scrollY:false,
        observeDOM:true,
        click:true,
        bounce:false,
        stopPropagation:true // 阻止事件冒泡 只会阻止touchstart事件的冒泡
    })

    state.current = props.current  // 初始化状态同步
    await pathListStore.getList()
    state.opened = pathListStore.pathlist.opened
    state.closed = pathListStore.pathlist.closed   
})

function moveToCenter(id){ // 让点击的板块显示在合适位置
    let index = 0
    let suitX = 0  // 一般为负值
    for(let i = 0;i < state.opened.length;i++){
        if(state.opened[i].id === id){
            index = i;
            // console.log(i,'////')
        }
    }
    suitX = -(index * 44) + 20
    if(suitX > bs.minScrollX){
        suitX = bs.minScrollX
    }
    if(suitX < bs.maxScrollX){
        suitX = bs.maxScrollX
    } // 边界情况处理
    bs.scrollTo(suitX, 0, 300)
}

provide('moveToCenter',{  // 依赖注入
    moveToCenter
})

onUpdated(() => {
    if(state.current !== props.current){
        // console.log('///')
        state.current = props.current
    }
})
</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.scrollBar_container
    width 100vw
    height 1.066667rem /* 40/37.5 */
    position relative
    z-index 999
    display flex
    bc()
    .scrollBar_swiper
        // width 8.96rem /* 336/37.5 */
        flex 1
        height 1.066667rem /* 40/37.5 */
        position relative
        overflow hidden
        white-space nowrap
        .scrollBar_swiper__content
            display inline-block
            .scrollBar_swiper__item
                display inline-block
                width auto
                height 1.066667rem /* 40/37.5 */
                line-height 1.066667rem /* 40/37.5 */
                padding 0 .133333rem /* 5/37.5 */
                .scrollBar_swiper__label
                    text-align center
                    width 1.173333rem /* 44/37.5 */
                    font-size .373333rem /* 14/37.5 */
                    font-weight 500
                    color var(--color-Readed)
                    &.active
                        color var(--color-base)
                        font-weight 700
    .listSwitch
        height 1.066667rem /* 40/37.5 */
        width 1.066667rem /* 40/37.5 */
        z-index 3000
        display flex
        justify-content center
        align-items center
        i
            pc()
            font-size 16px
        img
            background-position -50%
            background-size cover
            wh(.426667rem,.426667rem)



</style>