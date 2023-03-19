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
                <router-view></router-view>
            </template>
        </MySkeleton>
    </div>
</template>

<script setup>
import { onMounted,reactive,onUpdated,watch } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import MySkeleton from '../components/MySkeleton.vue'
import ScrollBar from '../components/ScrollBar.vue'
import {getRecommend} from '../service/recommend'

const router = useRouter()
const route = useRoute()

const state = reactive({
    isReady:true,
    pathList:[],
    currentPath:'/home/tags'
})

// const emits = defineEmits(['changeControl'])

// function changeControl(e){
//     emits('changeControl',e)
// }

function changeCurrent(e){
    state.currentPath = e
    router.push(e)
}

onMounted(async () => {
    router.push(state.currentPath) // 子路由首页
    state.pathList = await getRecommend()
    state.currentPath = route.path
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


</style>