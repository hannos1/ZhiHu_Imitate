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
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted,reactive} from 'vue'
const state = reactive({
    firstX:0,
    basicX:0,
    touchX:0,
    index:0,
    isEnd:false
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
    if(state.basicX + moveX - state.touchX <= 0&&state.basicX + moveX - state.touchX>-750){ // 如果越界了就不让它动
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
        if(state.firstX <= -375){
            state.basicX = state.firstX + 375
            state.firstX = state.basicX
        }else{
            state.basicX = state.firstX
        }
    }else if(move > 0 && Math.abs(move) > 60){
        // console.log('hhhh')
        if(state.firstX >= -750){
            state.basicX = state.firstX - 375
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