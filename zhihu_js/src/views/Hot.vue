<template>
    <div class="swiperPage">
        <div class="hotList_container" ref="swiper">
            <div class="hotlist_content">
                <div class="hotlist_box">
                    <div class="hotlist_item" v-for="item in state.hotList" :key="item.id">
                        <div class="rank">
                            <span>{{ item.id + 1 }}</span>
                        </div>
                        <div class="main">
                            <div class="aritcle">{{ item.aritcle }}</div>
                            <div class="hotnum">{{item.hotnum}}万热度</div>
                        </div>
                        <div class="preImg">
                            <img src="../assets/img/test.png" alt="">
                        </div>
                    </div>
                    <div class="getmore_btn" @click="getmoreHot" v-if="state.frequency < 2">
                        <span>展开更多 ▾</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {getHots} from '../service/hot'
import { onMounted,reactive,ref } from 'vue';
import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';

BScroll.use(ObserveDOM)

const state = reactive({
    hotList:[],
    frequency:0
})

const swiper = ref(null)
let bs = null

async function getmoreHot(){
    state.frequency += 1
    if(state.frequency > 2){
        return 
    }
    let backData = await getHots('start=' + state.frequency)
    let oldData = state.hotList
    let newData = oldData.concat(backData)
    state.hotList = newData
}


onMounted(async () => {
    state.hotList = await getHots('start=' + state.frequency)

    bs = new BScroll(swiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        click:true,
        observeDOM:true,
        bounce:false
    })
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.swiperPage
    .hotList_container
        width 100vw
        height calc(100vh - 2.72rem)
        bc()
        overflow hidden
        .hotlist_content
            width 100vw
            .hotlist_box
                .hotlist_item
                    display flex
                    margin-left .426667rem /* 16/37.5 */
                    margin-right .426667rem /* 16/37.5 */
                    margin-bottom .426667rem /* 16/37.5 */
                    position relative
                    .rank,.main,.preImg
                        margin-top .426667rem /* 16/37.5 */
                    .rank
                        width .64rem /* 24/37.5 */
                        span
                            display inline-block
                            width .64rem /* 24/37.5 */
                            height .64rem /* 24/37.5 */
                            line-height .64rem /* 24/37.5 */
                            font-size .426667rem /* 16/37.5 */
                            color var(--color-hot)
                            text-align left
                    .main
                        flex 1
                        display flex
                        flex-direction column
                        .aritcle
                            width 100%
                            font-size .426667rem /* 16/37.5 */
                            font-weight 700
                            line-height .64rem /* 24/37.5 */
                        .hotnum
                            width 100%
                            margin-top .106667rem /* 4/37.5 */
                            height .426667rem /* 16/37.5 */
                            text-align left
                            color var(--color-light)
                    .preImg
                        width 1.706667rem /* 64/37.5 */
                        height 1.706667rem /* 64/37.5 */
                        overflow hidden
                        border-radius .16rem /* 6/37.5 */
                        margin-left .266667rem /* 10/37.5 */
                        img
                            width 100%
                            height 100%
                            background-size cover
                    &:before
                        content ''
                        position absolute
                        right 0
                        left 0
                        bottom -.426667rem /* 16/37.5 */
                        top 0
                        border-bottom 2px solid rgba(100,100,100,0.3)
                .getmore_btn
                    height 1.226667rem /* 46/37.5 */
                    display flex
                    align-items center
                    justify-content center
                    span
                        font-size .426667rem /* 16/37.5 */
                        color var(--color-light)
                    
</style>