<template>
    <div class="swiperPage">
        <div class="scrollBar_box">
            <ScrollBar :pathList="state.pathList" :current="state.currentPath" @changeCurrent="changeCurrent" />
        </div>
        <MySkeleton class="MySkeleton" :isReady="state.isReady">
            <template #skeleton_main>
                <div class="page_container">
                    <div class="page_swiper" ref="swiper">
                        <div class="page_content">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </template>
        </MySkeleton>
    </div>
</template>

<script setup>
import { ref,onMounted,reactive,onUpdated,watch } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import MySkeleton from '../components/MySkeleton.vue'
import ScrollBar from '../components/ScrollBar.vue'
import {getRecommend} from '../service/recommend'
import BScroll from '@better-scroll/core';


const swiper = ref(null) 
let bs = null

const router = useRouter()
const route = useRoute()

const state = reactive({
    isReady:true,
    pathList:[],
    currentPath:'/home/tags'
})

function changeCurrent(e){
    state.currentPath = e
    router.push(e)
}

onMounted(async () => {
    router.push(state.currentPath) // 子路由首页
    state.pathList = await getRecommend()
    state.currentPath = route.path

    bs = new BScroll(swiper.value,{
        scrollX:false,
        scrollY:true,
        observeDOM:true,
        click:true,
        bounceTime:500,
    })
})

watch(route,() => {
    state.currentPath = route.path
})



</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.swiperPage
    display flex
    flex-direction column
    bc()
    .scrollBar_box
        width auto
        height 1.066667rem /* 40/37.5 */
        position relative
    .MySkeleton
        width 100vw
        flex 1
        .page_container
            width 100%
            height 100%
            background-color #f6f5fb
            overflow hidden
            .page_swiper
                width 100%
                height 14.133333rem /* 530/37.5 */
                overflow hidden
                .page_content
                    width 100%
                    height auto


</style>