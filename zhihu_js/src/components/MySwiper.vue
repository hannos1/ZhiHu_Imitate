<template>
    <div class="swiper_container">
        <div class="swiper_block"
         ref="swiper" 
         @touchstart="swiperTouch" 
         @touchmove="swiperMove" 
         @touchend="swiperEnd"
         :style="`--scroll-left: ${state.basicX}`+'px;'+`--itemWidth:${state.total*100}`+'vw'"
        :class="{transitioning:!state.isEnd}"
         >
            <!-- :class="state.isEnd?'transitionEnd':'transitioning'" -->
            <!-- <div class="swiper_item" v-for="item in items">
                <slot name="item" v-bind="item"></slot>
            </div>  -->  
            <slot name="listItem"></slot>
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted,reactive, nextTick,onUpdated,inject, watch} from 'vue'
const props = defineProps({
    totals:{
        type:Number,
        default:3
    },
    current:{
        type:Number,
        default:0
    }
})

const state = reactive({
    firstX:0,    // 当前的偏移距离
    basicX:0,   // 实时触摸点
    touchX:0,  // 按下时的触摸点
    // index:currentIndex.index,    // 当前页面索引
    total:props.totals,    // 总页面数
    isEnd:false,    // 是否停止触摸 用于设置动态类名
    isTouch:false,  // 是否是由触摸翻页
    windowWidth:375, //当前设备的屏幕宽度 默认375
    propsIndex:0,  // 缓存父组件传入的索引
})

const currentIndex = reactive({
    index:0 // 当前页面索引
})

// watch(currentIndex,(newx) => {
//     // console.log(newx.index)
// })  // 监听当前的索引值

defineExpose({currentIndex})  // 向父组件暴露这个接口值


// const items = [
//     {
//         id:1,
//         color:'background-color:blue;'
//     },
//     {
//         id:2,
//         color:'background-color:green;'
//     },
//     {
//         id:3,
//         color:'background-color:yellow;'
//     }
// ]

const swiper = ref(null)

const swiperTouch = (event) => {
    // console.log('鼠标按下了..')
    state.touchX = event.touches[0].screenX
    state.isTouch = true;
    // console.log(state.touchX)
    state.isEnd = false
    // state.isTouch = true
}

const swiperMove = (event) => {
    // console.log('鼠标移动了..',event)
    let moveX = event.touches[0].screenX
    if(state.basicX + moveX - state.touchX <= 0&&state.basicX + moveX - state.touchX>-(state.windowWidth*(state.total-1))){ // 如果越界了就不让它动
        state.basicX += moveX - state.touchX
        state.touchX = moveX
    }
    
    // console.log(state.basicX,state.firstX)
}

const swiperEnd = (event) => {
    // console.log('停止移动',event)
    state.isEnd = true
    let move = state.firstX - state.basicX

    if(move < 0 && Math.abs(move) > 60){// 说明要向左移动 
        if(state.firstX <= -state.windowWidth){
            state.basicX = state.firstX + state.windowWidth
            state.firstX = state.basicX
            // state.index--
            currentIndex.index--
            // defineExpose({currentIndex})
            // console.log(state.index)
        }else{
            state.basicX = state.firstX
        }
    }else if(move > 0 && Math.abs(move) > 60){
        // console.log('hhhh')
        if(state.firstX >= -(state.windowWidth*(state.total-1))){
            state.basicX = state.firstX - state.windowWidth
            state.firstX = state.basicX
            // state.index++
            currentIndex.index++
            // defineExpose({currentIndex})
            // console.log(state.index)
        }else{
            state.basicX = state.firstX
        }
    }else{
        state.basicX = state.firstX
    }
    // state.isTouch = false
    // setTimeout(() => {
    //     state.isTouch = false
    // }, 1000);
    state.isTouch = false;
}



onMounted(() => {
    // console.log(swiper.value)  //查看swiper节点
    // console.log(document.documentElement.clientWidth)
    state.windowWidth = document.documentElement.clientWidth
    // console.log(state.total)
})

nextTick(() => {
    state.basicX = -props.current*state.windowWidth
    state.firstX = state.basicX
    currentIndex.index = props.current
    state.propsIndex = props.current
})

onUpdated(() => {
    if(state.propsIndex !== props.current && state.isTouch === false){
        state.isEnd = false
        state.basicX = -props.current*state.windowWidth
        state.firstX = state.basicX
        state.propsIndex = props.current  // 继续缓存
        currentIndex.index = props.current  // 属性同步
        console.log('kkkk',props.current,currentIndex.index)
        state.isEnd = true
        // defineExpose({currentIndex})
    }
})

</script>

<style lang="stylus">


.swiper_container
    --scroll-left:0
    --itemWidth:0
    background-color red
    position relative
    overflow hidden
    // transition: left 0.2s ease-in-out;
    .swiper_block
        position relative
        display flex
        left calc(var(--scroll-left))
        top 0
        width calc(var(--itemWidth))
        height auto
        transform translate(0,0,0)
        transition: all 0.2s ease-in-out;
        // &.transitionEnd
        //     transition: left 0.2s ease-in-out;
        &.transitioning
            transition: all 0s ease-in-out;


</style>