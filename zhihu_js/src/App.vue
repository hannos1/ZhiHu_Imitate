<script setup>
import MySwiper from './components/MySwiper.vue';
import MySwiperItem from './components/MySwiperItem.vue';
import MyRouter from './components/MyRouter.vue'

</script>

<template>
<MySwiper>
        <template #item="{color}">
            <MySwiperItem :style="color">
                
            </MySwiperItem>
            <!-- <MyRouter :myPath="某个路径"></MyRouter> -->
        </template>
</MySwiper>
</template>

<style>
@import './assets/styl/reset.styl'


</style>
