<template>
    <div class="swiperPage">
        <!-- <div class="scrollBar_box"
        @touchstart="changeControl(false)" 
        @touchmove="changeControl(false)"
        @touchend="changeControl(true)"
        > -->
        <div class="scrollBar_box">
            <ScrollBar  :pathList="state.pathList" :current="state.currentPath" @changeCurrent="changeCurrent" />
        </div>
        <MySkeleton class="MySkeleton" :isReady="state.isReady">
            <template #skeleton_main>
                <router-view class="router-view" v-slot="{Component}">
                    <transition :name="state.transitionName">
                        <component :is="Component" />  
                    </transition>
                </router-view>
            </template>
        </MySkeleton>
    </div>
</template>

<script setup>
import { onMounted,reactive,onUpdated,watch } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import MySkeleton from '../components/MySkeleton.vue'
import ScrollBar from '../components/ScrollBar.vue'

const router = useRouter()
const route = useRoute()

const state = reactive({
    isReady:true,
    pathList:[],
    currentPath:'/home/tags',
    transitionName:'slide-left'
})

// const emits = defineEmits(['changeControl'])

// function changeControl(e){
//     emits('changeControl',e)
// }

function changeCurrent(e){
    // console.log(e)
    state.currentPath = e
    router.push(e)
}

onMounted(() => {
    router.push(state.currentPath) // 子路由首页
    state.pathList = [
        {
            id:1,
            title:'全站',
            path:'/home/tags'
        },{
            id:2,
            title:'直播',
            path:'/home/live'
        },{
            id:3,
            title:'法律',
            path:'/home/laws'
        },{
            id:4,
            title:'美食',
            path:'/home/delicacies'
        },{
            id:5,
            title:'旅行',
            path:'/home/travel'
        },{
            id:5,
            title:'旅行',
            path:'/home/travel'
        },{
            id:6,
            title:'旅行',
            path:'/home/travel'
        },{
            id:7,
            title:'旅行',
            path:'/home/travel'
        },{
            id:8,
            title:'旅行',
            path:'/home/travel'
        },{
            id:9,
            title:'旅行',
            path:'/home/travel'
        }
    ]
    // console.log(route.path)
    state.currentPath = route.path
})
//     const sleep = (t) => {
//     return new Promise((resolve,reject) => {
//       setTimeout(() => {
//         resolve(t)
//       },t)
//     })
//   }
  
//   const data = await Promise.all([sleep(4000),sleep(2000),sleep(1000)]);

router.beforeEach((to,from) => {  // next是下一步去哪里
  console.log(to.meta.index,from.meta.index,'..')
  if(to.meta.index > from.meta.index){
    // 上级页面去子页
    state.transitionName = 'slide-left'
  }else if(to.meta.index < from.meta.index){
    // 子页面回上级页面
    state.transitionName = 'slide-right'
  }else{
    state.transitionName = ''
  }
})

watch(route,() => {
    // console.log('////')
    state.currentPath = route.path
})


onUpdated(() => {
    
})
</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.swiperPage
    display flex
    flex-direction column
    .scrollBar_box
        width auto
        height 1.066667rem /* 40/37.5 */
    .MySkeleton
        width 100vw
        flex 1


</style>