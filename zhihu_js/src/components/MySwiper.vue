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
            <slot name="listItem" ></slot>
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted,reactive,onUpdated} from 'vue'
import _ from 'lodash'
const props = defineProps({
    totals:{ // 总页面数
        type:Number,
        default:3
    },
    current:{  // 传入的页面索引接口
        type:Number,
        default:0
    },
    ifControl:{
        type:Boolean,
        default:true
    }
})

const emits = defineEmits(['increaseIndex']) // 子组件修改父组件状态接口

const state = reactive({
    firstX:0,    // 当前的偏移距离
    basicX:0,   // 实时触摸点
    touchX:0,  // 按下时的触摸点
    index:0,    // 当前页面索引
    total:props.totals,    // 总页面数
    isEnd:false,    // 是否停止触摸 用于设置动态类名
    isTouch:false,  // 是否是由触摸翻页
    windowWidth:375, //当前设备的屏幕宽度 默认375
    propsIndex:0,  // 缓存父组件传入的索引
    ifControl:false,  // 是否可以执行滚动 多层嵌套scroll时使用
})


defineExpose({state})  // 向父组件暴露这个接口值


const swiper = ref(null)  // swiper节点dom

const swiperTouch = (event) => {  // 触摸时触发的函数
    // event.preventDefault();
    // console.log('touch')
    // event.stopPropagation()
    // if(props.ifControl){
    state.touchX = event.touches[0].screenX
    state.isTouch = true
    state.isEnd = false
    state.ifControl = true  // 如果这个函数被执行了说明可以滚动
    // }
}


const swiperMove = (event) => {  // 拖动时触发的函数
    // event.preventDefault();
    // console.log('scroll')
    // event.stopPropagation()
    // if(props.ifControl){
    if(state.ifControl){
    let moveX = event.touches[0].screenX
    if(state.basicX + moveX - state.touchX <= 0&&state.basicX + moveX - state.touchX>-(state.windowWidth*(state.total-1))){ // 如果越界了就不让它动
        state.basicX += moveX - state.touchX
        state.touchX = moveX
    }      
  }
}

const swiperEnd = (event) => {  // 松开手时触发的函数
    // event.preventDefault();
    // console.log('end')
    // event.stopPropagation()
    // if(props.ifControl){
    if(state.ifControl){
    state.isEnd = true
    let move = state.firstX - state.basicX

    if(move < 0 && Math.abs(move) > 60){// 说明要向左移动 
        if(state.firstX <= -state.windowWidth){
            state.basicX = state.firstX + state.windowWidth
            state.firstX = state.basicX
            state.index--
            emits('increaseIndex', {p1:state.index})
        }else{
            state.basicX = state.firstX
        }
    }else if(move > 0 && Math.abs(move) > 60){
        if(state.firstX >= -(state.windowWidth*(state.total-1))){
            state.basicX = state.firstX - state.windowWidth
            state.firstX = state.basicX
            state.index++
            emits('increaseIndex', {p1:state.index})
        }else{
            state.basicX = state.firstX
        }
    }else{
        state.basicX = state.firstX
    }
    state.isTouch = false;
  }
  state.ifControl = false;
}



onMounted(() => {
    state.windowWidth = document.documentElement.clientWidth  // 初始化屏幕宽度为整个屏幕宽度
    state.basicX = -props.current*state.windowWidth  // 初始化组件的x轴坐标
    state.firstX = state.basicX
    state.index = props.current
    state.propsIndex = props.current  // 初始化组件的索引
})


onUpdated(() => { // 当拖动时组件索引发生改变时触发
    if(state.propsIndex !== props.current && state.isTouch === false){
        state.isEnd = false
        state.basicX = -props.current*state.windowWidth
        state.firstX = state.basicX
        state.propsIndex = props.current  // 继续缓存
        state.index = props.current
        state.isEnd = true
    }
})

</script>

<style lang="stylus">
@import '../assets/styl/mixin.styl';

.swiper_container
    --scroll-left:0
    --itemWidth:0
    bc()
    // background-color red
    // position relative
    // top 0
    // left 0
    position fixed
    overflow hidden
    // transition: left 0.2s ease-in-out;
    .swiper_block
        z-index 999
        // overflow hidden
        position relative
        display flex
        left calc(var(--scroll-left))
        top 0
        width calc(var(--itemWidth))
        height auto
        transform: translateX(0)
        transition: all 0.2s ease-in-out;
        // &.transitionEnd
        //     transition: left 0.2s ease-in-out;
        &.transitioning
            transition: all 0s ease-in-out;


</style>