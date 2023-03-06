<script setup>
import MySwiper from './components/MySwiper.vue';
import MySwiperItem from './components/MySwiperItem.vue';

</script>

<template>
<MySwiper>
        <template #item="{id,color}">
            <MySwiperItem :style="color"></MySwiperItem>
        </template>
</MySwiper>
</template>

<style>
@import './assets/styl/reset.styl'


</style>
