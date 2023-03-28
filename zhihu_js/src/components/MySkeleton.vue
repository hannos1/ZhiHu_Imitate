<template>
    <div class="skeleton_container">
        <div class="skeleton_temp" :hidden="props.isReady">
            <ul class="floor1"  :style="`--scrollColor:${state.scrollColor}`">
                <li class="floor2">
                    <ul class="floor3">
                        <li class="floor4"></li>
                        <li class="floor4"></li>
                        <li class="floor4"></li>
                        <li class="floor4"></li>
                    </ul>
                </li>
                <li class="floor2">
                    <ul class="floor3">
                        <li class="floor4"></li>
                        <li class="floor4"></li>
                        <li class="floor4"></li>
                        <li class="floor4"></li>
                    </ul>
                </li>
                <li class="floor2">
                    <ul class="floor3">
                        <li class="floor4"></li>
                        <li class="floor4"></li>
                        <li class="floor4"></li>
                        <li class="floor4"></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="skeleton_content" :hidden="!props.isReady">
            <slot name="skeleton_main">

            </slot>
        </div>
    </div>
</template>

<script setup>
import { reactive,onMounted,onUpdated } from 'vue';


const props = defineProps({
    isReady:{
        type:Boolean,
        default:false
    }
})

const state = reactive({
    // scrollColor:'#d6d6d6'
    scrollColor:100,
    skeletonControl:null,
})

onMounted(() => {
    state.skeletonControl = setInterval(() => {  // 给骨架屏加点动态效果 记得清除这个定时器
        // if(state.scrollColor === '#d6d6d6'){
        //     state.scrollColor = '#fff'
        // }else{
        //     state.scrollColor = '#d6d6d6'
        // }
        if(state.scrollColor === 100){
            state.scrollColor = 0
        }else{
            state.scrollColor = 100
        }
    },700)
    // setTimeout(() => {
    //     clearInterval(skeletonControl)
    // },5000)
})

onUpdated(() => {
    if(props.isReady === true){
        clearInterval(state.skeletonControl)
    }
})


</script>

<style lang="stylus" scoped>
.skeleton_temp
    --scrollColor:''
    width 100vw
    height calc(100vh - 3.786667rem)
    .floor1
    // ul
        width 100%
        height 100%
        display flex
        flex-direction column
        list-style none
        .floor2
        // li
            flex 1
            margin-bottom .266667rem /* 10/37.5 */
            .floor3
            // ul
                height 80%
                display flex
                flex-direction column
                list-style none
                .floor4
                // li
                    flex 1
                    position relative
                    &:before
                        content ''
                        position absolute
                        // background-color var(--scrollColor)
                        // transition background-color 0.5s
                        background-color #d6d6d6
                        opacity var(--scrollColor)
                        transition opacity 0.7s
                        top .293333rem /* 11/37.5 */
                        bottom .293333rem /* 11/37.5 */
                        left .266667rem /* 10/37.5 */
                        right .266667rem /* 10/37.5 */
                        border-radius .133333rem /* 5/37.5 */
                    &:last-child:before
                        right 5.333333rem /* 200/37.5 */
.skeleton_content
    height 100%
    width 100%
                        


</style>