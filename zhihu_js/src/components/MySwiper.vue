<template>
    <div class="swiper_container">
        <div class="swiper_block"
         ref="swiper" 
         @touchstart="swiperTouch" 
         @touchmove="swiperMove" 
         @touchend="swiperEnd"
         :style="`--scroll-left: ${state.basicX}`+'px'"
         :class="state.isEnd?'transitionEnd':'transitioning'"
         >
            <div class="swiper_item" v-for="item in items">
                <slot name="item" v-bind="item"></slot>
            </div>
            <slot name="pageItem"></slot>
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted,reactive} from 'vue'
const state = reactive({
    firstX:0,    // 当前的偏移距离
    basicX:0,   // 实时触摸点
    touchX:0,  // 按下时的触摸点
    index:0,    // 当前页面索引
    tatal:3,    // 总页面数
    isEnd:false,    // 是否停止触摸 用于设置动态类名
    windowWidth:375, //当前设备的屏幕宽度 默认375
})

const items = [
    {
        id:1,
        color:'background-color:blue;'
    },
    {
        id:2,
        color:'background-color:green;'
    },
    {
        id:3,
        color:'background-color:yellow;'
    }
]

const swiper = ref(null)

const swiperTouch = (event) => {
    // console.log('鼠标按下了..')
    state.touchX = event.touches[0].screenX
    // console.log(state.touchX)
    state.isEnd = false
}

const swiperMove = (event) => {
    // console.log('鼠标移动了..',event)
    let moveX = event.touches[0].screenX
    if(state.basicX + moveX - state.touchX <= 0&&state.basicX + moveX - state.touchX>-(state.windowWidth*(state.tatal-1))){ // 如果越界了就不让它动
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
        }else{
            state.basicX = state.firstX
        }
    }else if(move > 0 && Math.abs(move) > 60){
        // console.log('hhhh')
        if(state.firstX >= -(state.windowWidth*(state.tatal-1))){
            state.basicX = state.firstX - state.windowWidth
            state.firstX = state.basicX
        }else{
            state.basicX = state.firstX
        }
    }else{
        state.basicX = state.firstX
    }
}



onMounted(() => {
    // console.log(swiper.value)  //查看swiper节点
    // state.windowWidth = // 可以设置成全局的属性

})

</script>

<style lang="stylus">


.swiper_container
    --scroll-left:0
    background-color red
    position relative
    overflow hidden
    .swiper_block
        position relative
        display flex
        left calc(var(--scroll-left))
        top 0
        transform translateZ(0)
        &.transitionEnd
            transition: left 0.2s ease-in-out;
        &.transitioning
            transition: all 0s ease-in-out;


</style>