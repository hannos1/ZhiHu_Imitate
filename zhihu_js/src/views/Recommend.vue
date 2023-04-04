<template>
    <div class="swiperPage"  ref="pageSwiper">
        <div class="swiperContent">
            <div class="scrollBar_box">
                <ScrollBar :current="state.currentPath" @changeCurrent="changeCurrent" />
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
    </div>
</template>

<script setup>
import { ref,onMounted,reactive,onUpdated,watch,provide } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import MySkeleton from '../components/MySkeleton.vue';
import ScrollBar from '../components/ScrollBar.vue';
import BScroll from '@better-scroll/core';
import _ from 'lodash';
import ObserveDOM from '@better-scroll/observe-dom';

BScroll.use(ObserveDOM)

const swiper = ref(null) 
const pageSwiper = ref(null)
let pageBs = null
let bs = null

const router = useRouter()
const route = useRoute()

const emits = defineEmits(['changSearch'])

const state = reactive({
    isReady:false,
    currentPath:'/home/tags',
})

function changeCurrent(e){  // 该变当前二级导航路由
    state.currentPath = e
    router.push(e)
}

provide('changeCurrent', {  // 让子组件通过这个修改路径
    changeCurrent
})

function bsScroll(pos){
    if(route.path === '/home/tags'){
        if(pos.y > -20){
            emits('changSearch',false)
        }else{
            emits('changSearch',true)
        }

        if(pos.y<0){
            pageBs.disable()
        }else{
            pageBs.enable()
        }
    }
}

function changeReady(b){  // 是否隐藏骨架屏
    state.isReady = b
}

provide('isReady', {  // 依赖注入
  changeReady
})

function pageBsScroll(bs){
    if(route.path === '/home/tags'){
        if(this.y > -40 && this.y < 0){
            bs.disable()
        }else{
            bs.enable()
        }   
    }
}

onMounted(async () => {
    router.push(state.currentPath) // 子路由首页
    state.currentPath = route.path
    emits('changSearch',false)

    pageBs = new BScroll(pageSwiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        observeDOM:true,
        click:true,
        bounce:false,
    })

    bs = new BScroll(swiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        observeDOM:true,
        click:true,
        bounceTime:500,
    })

    pageBs.on('scroll',_.throttle(pageBsScroll.bind(pageBs,bs),30))

    bs.on('scroll',_.throttle(bsScroll,30))

    watch(route,() => {
        state.currentPath = route.path
        // console.log(route.path)
        if(route.path !== '/home/tags'){
            if(route.path !== ''){
                emits('changSearch',true)
            }
            pageBs.disable()
        }else{
            emits('changSearch',false)
            pageBs.enable()
        }
    })
})



</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.swiperPage
    --enable-scroll:17.466667rem
    bc()
    overflow hidden
    .swiperContent
        height 17.466667rem /* 655/37.5 */
        .scrollBar_box
            width auto
            height 1.066667rem /* 40/37.5 */
            position relative
        .MySkeleton
            width 100vw
            .page_container
                width 100%
                height 100%
                background-color #f6f5fb
                overflow hidden
                .page_swiper
                    width 100%
                    height 16.4rem /* 615/37.5 */
                    overflow hidden
                    .page_content
                        width 100%
                        height auto


</style>