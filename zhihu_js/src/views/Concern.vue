<template>
    <div class="page_container">
        <header>
            <div class="title">关注</div>
            <div class="tags">
                <img src="../assets/img/搜索.png" alt="">
                <img src="../assets/img/提醒.png" alt="">
            </div>
        </header>
        <main>
            <div class="concern_container" ref="swiper">
                <div class="concern_content">
                    <div class="concern_getmore">
                        <div class="getmore_item">
                            <div class="getmore_item__img">
                                <img src="../assets/img/test.png" alt="">
                            </div>
                            <div class="getmore_item__title">
                                知乎日报
                            </div>
                        </div>
                        <div class="getmore_item">
                            <div class="getmore_item__img">
                                <img src="../assets/img/加号.png" alt="">
                            </div>
                            <div class="getmore_item__title">
                                关注更多
                            </div>
                        </div>
                    </div>
                    <div class="concern_swiper">
                        <div class="concern_swiper__navBar">
                            <div class="navBar_items">
                                <div class="navBar_items_label"
                                @click="changeCurrentIndex(0)"
                                :class="{active:state.currentindex === 0}">精选</div>
                                <div class="navBar_items_label" 
                                @click="changeCurrentIndex(1)"
                                :class="{active:state.currentindex === 1}">最新</div>
                                <div class="navBar_items_label" 
                                @click="changeCurrentIndex(2)"
                                :class="{active:state.currentindex === 2}">想法</div>
                            </div>
                            <div class="navBar_scrollBar" ref="navbar">
                                <div class="navBar_content">
                                    <div class="navBar_content__cursor"></div>
                                </div>
                            </div>
                        </div>
                        <div class="myswiper_container" ref="myswiper">
                            <div class="myswiper_content">
                                <MySwiper>

                                </MySwiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <MyTabBar :current="state.current" />
        </footer>
    </div>
</template>

<script setup>
import MyTabBar from '../components/MyTabBar.vue';
import { reactive,onMounted,ref } from 'vue';
import MySwiper from '../components/MySwiper.vue';
import BScroll from '@better-scroll/core';

const state = reactive({
  current:'/concern',
  currentindex:0
})

const swiper = ref(null)
const myswiper = ref(null)
const navbar = ref(null)
let pageBs = null
let bs = null
let navbs = null

function changeCurrentIndex(index){
    state.currentindex = index
    navbs.scrollTo(-59*(2-index),0,300)
}


onMounted(() => {
    pageBs = new BScroll(swiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        observeDOM:true,
        click:true,
        bounce:false
    })

    bs = new BScroll(myswiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        observeDOM:true,
        click:true,
        bounce:false
    })

    navbs = new BScroll(navbar.value,{
        probeType:3,
        scrollX:true,
        scrollY:false,
        observeDOM:true,
        click:true,
        startX:-59,
        bounce:false
    }) // 间隔59px

    navbs.disable()
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.page_container
    background-color #f6f6f6
    height calc(100vh - 1.44rem /* 54/37.5 */)
    width 100vw
    position fixed
    header
        height 1.066667rem /* 40/37.5 */
        width 100vw
        position relative
        overflow hidden
        z-index 999
        bc()
        .title
            height 1.066667rem /* 40/37.5 */
            width 1.066667rem /* 40/37.5 */
            display inline-block
            font-size .533333rem /* 20/37.5 */
            line-height 1.066667rem /* 40/37.5 */
            position absolute
            top 50%
            left 50%
            transform translate(-50%,-50%)
        .tags
            width 1.546667rem /* 58/37.5 */
            height 1.066667rem /* 40/37.5 */
            display flex
            justify-content space-around
            align-items center
            position absolute
            right .32rem /* 12/37.5 */
            top 0
            img
                height .64rem /* 24/37.5 */
                width .64rem /* 24/37.5 */
    main
        .concern_container
            height 15.306667rem /* 574/37.5 */
            .concern_content
                height 18.346667rem /* 688/37.5 */
                .concern_getmore
                    width 100vw
                    height 2.773333rem /* 104/37.5 */
                    bc()
                    overflow hidden
                    display flex
                    .getmore_item
                        height 2.773333rem /* 104/37.5 */
                        width  1.6rem /* 60/37.5 */
                        margin-left .373333rem /* 14/37.5 */
                        position relative
                        .getmore_item__img
                            width 1.493333rem /* 56/37.5 */
                            height 1.493333rem /* 56/37.5 */
                            border-radius 50%
                            margin-left .053333rem /* 2/37.5 */
                            margin-top .266667rem /* 10/37.5 */
                            overflow hidden
                            img
                                width 100%
                                height 100%
                                background-size cover
                        .getmore_item__title
                            width 100%
                            height .533333rem /* 20/37.5 */
                            line-height .533333rem /* 20/37.5 */
                            margin-top .213333rem /* 8/37.5 */
                            text-align center
                            font-size .32rem /* 12/37.5 */
                            color var(--color-light)
                        &:nth-child(2)
                            .getmore_item__img
                                border 1px dashed black
                                position relative
                                img
                                    width .533333rem /* 20/37.5 */
                                    height .533333rem /* 20/37.5 */
                                    position absolute
                                    top 50%
                                    left 50%
                                    transform translate(-50%,-50%)
                .concern_swiper
                    margin-top .266667rem /* 10/37.5 */  
                    height 15.306667rem /* 574/37.5 */   
                    bc()
                    .concern_swiper__navBar
                        height 1.28rem /* 48/37.5 */
                        width 100vw
                        overflow hidden
                        .navBar_items
                            width 4.053333rem /* 152/37.5 */
                            height .533333rem /* 20/37.5 */
                            margin-top .32rem /* 12/37.5 */
                            margin-left .373333rem /* 14/37.5 */
                            display flex
                            align-items center
                            justify-content space-between
                            .navBar_items_label
                                height .533333rem /* 20/37.5 */
                                font-size .426667rem /* 16/37.5 */
                                line-height .533333rem /* 20/37.5 */
                                font-weight 700
                                color #a9a9a9
                                &.active
                                    color black
                        .navBar_scrollBar
                            width 4.053333rem /* 152/37.5 */
                            margin-left .373333rem /* 14/37.5 */
                            height .213333rem /* 8/37.5 */
                            margin-top .106667rem /* 4/37.5 */
                            .navBar_content
                                width 7.253333rem /* 272/37.5 */
                                height .213333rem /* 8/37.5 */
                                display flex
                                align-items center
                                .navBar_content__cursor
                                    width .32rem /* 12/37.5 */
                                    height .106667rem /* 4/37.5 */
                                    border-radius .08rem /* 3/37.5 */
                                    background-color blue
                                    margin-left 3.44rem /* 129/37.5 */
                    .myswiper_container
                        background-color red
                        width 100vw
                        height 14.026667rem /* 526/37.5 */
                        .myswiper_content
                            width 100vw
                            height 1000px



</style>