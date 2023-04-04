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
                    <div class="concern_getmore" ref="getmoreswiper">
                        <div class="getmore_content">
                            <div class="getmore_item">
                                <div class="getmore_item__img">
                                    <img src="../assets/img/test.png" alt="">
                                </div>
                                <div class="getmore_item__title">
                                    知乎日报
                                </div>
                            </div>
                            <div class="getmore_item" v-if="state.concernList.length !== 0" v-for="item in state.concernList" :key="item.id">
                                <div class="getmore_item__img">
                                    <img src="../assets/img/test.png" alt="">
                                </div>
                                <div class="getmore_item__title">
                                    {{ item.name }}
                                </div>
                            </div>
                            <div class="getmore_item" @click="gotoPage('/concernmore')">
                                <div class="getmore_item__img">
                                    <img src="../assets/img/加号.png" alt="">
                                </div>
                                <div class="getmore_item__title">
                                    关注更多
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="concern_swiper">
                        <div class="concern_swipercontent">
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
                            <div class="myswiper_container">
                                <div class="myswiper_content">
                                    <MySwiper 
                                    :totals="3" 
                                    :current="state.currentindex" 
                                    @increaseIndex="increaseIndex"
                                    >
                                        <template #listItem>
                                            <Selected :bsable="state.bsable" @bsScroll="bsScroll"></Selected>
                                            <Template style="width:100vw;z-index:999;position:relative;"></Template>
                                            <Template style="width:100vw;z-index:999;position:relative;"></Template>
                                        </template>
                                    </MySwiper>
                                </div>
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
import { reactive,onMounted,ref,onUpdated } from 'vue';
import MySwiper from '../components/MySwiper.vue';
import BScroll from '@better-scroll/core';
import Template from '../views/second/Template.vue';
import Selected from '../views/second/Selected.vue';
import _ from 'lodash';
import { useRouter } from 'vue-router';
import ObserveDOM from '@better-scroll/observe-dom';
import {useConcernStore} from '../store/concerned';

BScroll.use(ObserveDOM)

const state = reactive({
  current:'/concern',
  currentindex:0,
  pageBsable:true,
  bsable:false,
  concernList:[]
})

const router = useRouter()

const concernstore = useConcernStore()

const swiper = ref(null)
const navbar = ref(null)
const getmoreswiper = ref(null)
let pageBs = null
let navbs = null
let getmorebs = null


function changeCurrentIndex(index){
    state.currentindex = index
    navbs.scrollTo(-59*(2-index),0,300)
}

function increaseIndex(params){
    state.currentindex = params.p1
    navbs.scrollTo(-59*(2-state.currentindex),0,300)
}

function gotoPage(params){
    router.push(params)
}

function pageBsScroll(num){
    if(state.pageBsable){
        if(this.y > -num && this.y <= 0){
            state.bsable = false
        }else{
            state.bsable = true
        }
    }
}

function bsScroll(b){
    state.pageBsable = b 
    if(state.pageBsable){
        pageBs.enable()
    }else{
        pageBs.disable()
    }
}


onMounted(() => {
    state.concernList = concernstore.concernedList.list

    pageBs = new BScroll(swiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        click:true,
        bounce:false
    })

    getmorebs = new BScroll(getmoreswiper.value,{
        probeType:3,
        scrollX:true,
        scrollY:false,
        click:true,
        observeDOM:true,
        bounce:false,
    })

    navbs = new BScroll(navbar.value,{
        probeType:3,
        observeDOM:true,
        scrollX:true,
        scrollY:false,
        click:true,
        startX:-118,
        bounce:false
    }) // 间隔59px

    pageBs.on('scroll',_.throttle(pageBsScroll.bind(pageBs,114),30))
    navbs.disable()
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.page_container
    --hight-container:15.306667rem
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
            position relative
            overflow hidden
            z-index 997
            .concern_content
                height 18.346667rem /* 688/37.5 */
                .concern_getmore
                    width 100vw
                    height 2.773333rem /* 104/37.5 */
                    margin-bottom .266667rem /* 10/37.5 */
                    bc()
                    .getmore_content
                        // display flex
                        height 2.773333rem /* 104/37.5 */
                        position relative
                        display inline-block
                        // flex-wrap nowrap
                        white-space nowrap
                        .getmore_item
                            display inline-block
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
                                text-overflow ellipsis
                                overflow hidden
                                word-break break-all
                                white-space nowrap
                            &:last-child
                                margin-right .373333rem /* 14/37.5 */
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
                    height 15.306667rem /* 574/37.5 */   
                    bc()
                    .concern_swipercontent
                        .concern_swiper__navBar
                            height 1.28rem /* 48/37.5 */
                            width 100vw
                            overflow hidden
                            position relative
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
                            width 100vw
                            height 14.026667rem /* 526/37.5 */
                            position relative
                            overflow hidden
                            .myswiper_content
                                width 100vw
                                height 14.026667rem /* 526/37.5 */
                                overflow hidden



</style>