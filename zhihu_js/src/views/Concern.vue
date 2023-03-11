<template>
    <div>
        <header>
            
        </header>
        <main>
            <div class="swiperPage page_container">
            <MyWaterFall :waterData="state.waterFallData" />
            </div>
        </main>
        <footer>
            <MyTabBar />
        </footer>
    </div>
</template>

<script setup>
import MyTabBar from '../components/MyTabBar.vue';
import { reactive } from 'vue';
import MyWaterFall from '../components/MyWaterFall.vue'

const state = reactive({
    waterFallData:[{
        img:'',
        previewText:'',
        avatarImg:'',
        userName:'',
        likes:100,
        imgheight:100
    },
  ]
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';



</style>