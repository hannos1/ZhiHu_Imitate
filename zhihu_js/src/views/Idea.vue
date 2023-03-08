<template>
    <div class="swiperPage page_container">
            <MyWaterFall :waterData="state.waterFallData" />
    </div>
</template>

<script setup>
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
.page_container
    // bc()
    

</style>