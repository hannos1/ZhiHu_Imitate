<script setup>
// import MySwiper from './components/MySwiper.vue';
// import Recommend from './views/Recommend.vue';
// import Hot from './views/Hot.vue';
// import Idea from './views/Idea.vue';
import {onMounted} from 'vue';

// let  pageobj = ref(null); // 拿到swiper的节点，以此拿到当前item的索引值
// const pagePlay = reactive({
//     index:1
// })

// provide('current',pagePlay.value) // 依赖注入，但子组件无法拿到响应数据


onMounted(() => {
    // console.log(pageobj.value.state.index)
    // setInterval(() => {
    //     console.log(pageobj.value.state.index,'///')
    //     // pagePlay.index = (pagePlay.index+1)%3
    // }, 1000);


})


</script>

<template>
    <!-- <MySwiper ref="pageobj" :totals="3" :current="pagePlay.index">
        <template #listItem >
            <Recommend />
            <Hot />
            <Idea />
        </template>
    </MySwiper> -->

    <router-view></router-view>
</template>

<style>
@import './assets/styl/reset.styl'


</style>
