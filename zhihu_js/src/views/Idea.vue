<template>
    <div class="swiperPage page_container">
            <MyWaterFall  :waterData="state.data"/>
    </div>
</template>

<script setup>
import { onMounted, reactive,onUpdated } from 'vue';
import MyWaterFall from '../components/MyWaterFall.vue'
import { getIdeas } from '../service/idea'

const state = reactive({
    data:[]
})



onMounted(async () => {
    const data = await getIdeas()
    state.data = data
})

onUpdated(() => {
    // console.log(state.data,'////')
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.page_container
    pc()
</style>