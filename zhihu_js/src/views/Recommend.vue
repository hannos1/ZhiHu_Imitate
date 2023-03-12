<template>
    <div class="swiperPage">
        <SecondTabBar />
        <MySkeleton class="MySkeleton" :isReady="state.isReady">
            <template #skeleton_main>
                <router-view></router-view>
            </template>
        </MySkeleton>
        
    </div>
</template>

<script setup>
import { onMounted,reactive } from 'vue';
import { useRouter } from 'vue-router';
import MySkeleton from '../components/MySkeleton.vue'
import SecondTabBar from '../components/SecondTabBar.vue'
const router = useRouter()

const state = reactive({
    isReady:false
})

onMounted(() => {
    router.push('/tags') // 子路由首页
    setTimeout(() => {
        state.isReady = true
    },5000)
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.swiperPage
    display flex
    flex-direction column
    .MySkeleton
        width 100vw
        flex 1


</style>