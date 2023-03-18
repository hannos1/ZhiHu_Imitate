<template>
    <div class="scrollBar_container">
        <div class="scrollBar_swiper" ref="swiper"
        >
            <div class="scrollBar_swiper__content">
                <div class="scrollBar_swiper__item" v-for="item in props.pathList" :key="item.id">
                    <div class="scrollBar_swiper__label" :class="{active:state.current === item.path}" @click="changePath(item.path)">{{ item.title }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted,ref,reactive,onUpdated } from 'vue';
import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';

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

const state = reactive({ // 当前页面状态
    current:'',
})

onMounted(() => {
    state.current = props.current  // 初始化状态同步

    bs = new BScroll(swiper.value,{
        scrollX:true,
        scrollY:false,
        observeDOM:true,
        click:true,
        bounce:false,
        stopPropagation:true // 阻止事件冒泡 只会阻止touchstart事件的冒泡
    })
})


function changePath(path){
    // console.log(path)
    // state.current = path
    emits('changeCurrent',path)
}

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
    bc()
    .scrollBar_swiper
        width 8.96rem /* 336/37.5 */
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


</style>