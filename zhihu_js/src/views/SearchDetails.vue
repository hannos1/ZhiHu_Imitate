<template>
    <div class="page_searchdetail">
        <header>
            <SecondNavBar :if-show-more="false" :back-path="'/home/tags'">
                <template #navBar_main>
                    <div class="navBar_main__container">
                        <div class="navBar_main__input">
                            <img src="../assets/img/搜索.png" alt="">
                            <span>因ai失业</span>
                        </div>
                    </div>
                </template>
            </SecondNavBar>
        </header>
        <main>
            <div class="nav_container">
                <div class="nav_scroll__container">
                    <div class="nav_scroll_content">
                        <div class="nav_scroll__item">
                            综合
                        </div>
                        <div class="nav_scroll__item" 
                        :class="{active:state.activeItem === 0}"
                        @click="choseNavItem" 
                        :style="`--animation-width:${state.itemwidth}px;
                        --animation-height:${state.itemheight}px;
                        --animation-opacity:${state.itemopacity};`">
                            综合
                        </div>
                        <div class="nav_scroll__item">
                            综合
                        </div>
                    </div>
                </div>
                <div class="nav_btn__filter" @click="showfilter">
                    <div class="filter_img">
                        <img src="../assets/img/_筛选.png" alt="">
                    </div>
                    <span>
                        筛选
                    </span>
                </div>
            </div>
            <div class="filter_container" :style="`--filter-height:${state.filterheight}px;`">
                <div class="nav_mask"></div>
                <div class="filter_items">
                    <div class="filter_itemcontent">
                        <div class="filter_item" :class="{active:state.contenttype === 0}" @click="changeData(0,0)">不限类型</div>
                        <div class="filter_item">只看回答</div>
                        <div class="filter_item">只看文章</div>
                        <div class="filter_item">只看视频</div>
                    </div>
                </div>
                <div class="filter_items">
                    <div class="filter_itemcontent">
                        <div class="filter_item" :class="{active:state.contentsort === 0}" @click="changeData(1,0)">综合排序</div>
                        <div class="filter_item">最多赞同</div>
                        <div class="filter_item">最新发布</div>
                    </div>
                </div>
                <div class="filter_items">
                    <div class="filter_itemcontent">
                        <div class="filter_item" :class="{active:state.contenttime === 0}" @click="changeData(2,0)">不限事件</div>
                        <div class="filter_item">一天内</div>
                        <div class="filter_item">一周内</div>
                        <div class="filter_item">一月内 用数据来改变</div>
                    </div>
                </div>
            </div>
            <div class="main_container" ref="pageswiper">
                <div class="main_content">
                    <div class="nav_mask" :style="`--mask-height:${state.maskheight}px;`"></div>
                    <div class="content_list">
                        <div class="article_list">
                            <div class="articel_card" v-for="item in state.articleList" :key="item.id" >
                                <PreviewCard :data="item" :isclose="false"></PreviewCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer>

        </footer>
    </div>
</template>

<script setup>
import SecondNavBar from '../components/SecondNavBar.vue';
import { useRouter } from 'vue-router';
import { reactive,onMounted,ref } from 'vue';
import PreviewCard from '../components/PreviewCard.vue';
import {getRecommendIndex} from '../service/recommend';
import BScroll from '@better-scroll/core';
import _ from 'lodash';
import ObserveDOM from '@better-scroll/observe-dom';

BScroll.use(ObserveDOM)

const state = reactive({
    itemwidth:20,
    itemheight:20,
    itemopacity:0,
    activeItem:0,
    timer:0,
    contenttype:0,
    contentsort:0,
    contenttime:0,
    filterheight:0,
    maskheight:40,
    articleList:[]
})

const pageswiper = ref(null)
let pageBs = null

const router = useRouter()

function gotoPage(path,param){
    router.push(path + param)
}

function delay(fn,s){
    return new Promise((resolve) => {
        state.timer = setTimeout(() => {
            fn()
            resolve()
        },s)
    })
}

async function choseNavItem(){
    clearTimeout()
    state.itemwidth = 100
    state.itemheight = 100
    state.itemopacity = 0.6
    await delay(()=>{
        state.itemwidth = 50
        state.itemheight = 50
        state.itemopacity = 0.1
    },300)
    state.itemopacity = 0
    await delay(()=>{
        state.itemwidth = 0
        state.itemheight = 0
    },300)
}

function changeData(target,data){
    if(target === 0){
        state.contenttype = data
    }else if(target === 1){
        state.contentsort = data
    }else{
        state.contenttime = data
    }
}

function showfilter(){
    if(state.filterheight === 0){
        state.filterheight = 176
        state.maskheight = 0
    }else{
        state.filterheight = 0
        state.maskheight = 40
    }
}

onMounted(async () => {
    state.articleList = await getRecommendIndex()

    pageBs = new BScroll(pageswiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        observeDOM:true,
        click:true,
        bounce:false,
    })
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.page_searchdetail
    --filter-height:0px
    --animation-width:10px
    --animation-height:10px
    --animation-opacity:0
    --mask-height:40px
    position fixed
    display flex
    flex-direction column
    header
        height 1.28rem /* 48/37.5 */
        width 100vw
        .navBar_main__container
                height 100%
                display flex
                align-items center
                justify-content start
                overflow hidden
                .navBar_main__input
                    width 8.266667rem /* 310/37.5 */
                    height 1.013333rem /* 38/37.5 */
                    border-radius .506667rem /* 19/37.5 */
                    background-color #f6f6f6
                    display flex
                    align-items center
                    overflow hidden
                    img
                        display inline-block
                        width .533333rem /* 20/37.5 */
                        height .533333rem /* 20/37.5 */
                        background-size cover
                        margin-left .533333rem /* 20/37.5 */
                        margin-right .266667rem /* 10/37.5 */
                    span 
                        display inline-block
                        flex 1
                        height 1.013333rem /* 38/37.5 */
                        line-height 1.013333rem /* 38/37.5 */
                        background-color #f6f6f6
                        font-size .426667rem /* 16/37.5 */
    main
        width 100vw
        position relative
        background-color #f6f6f6
        .nav_container
            width 100vw
            height 1.066667rem /* 40/37.5 */
            position absolute
            display flex
            top 0
            left 0
            overflow hidden
            z-index 999
            .nav_scroll__container
                flex 1
                height 1.066667rem /* 40/37.5 */
                overflow hidden
                .nav_scroll_content
                    height 1.066667rem /* 40/37.5 */
                    width 13.333333rem /* 500/37.5 */
                    display flex
                    bc()
                    .nav_scroll__item
                        height 1.066667rem /* 40/37.5 */
                        line-height .48rem /* 18/37.5 */
                        font-size .373333rem /* 14/37.5 */
                        box-sizing border-box
                        padding 8px 10px 12px 10px
                        position relative
                        text-align center
                        overflow hidden
                        &.active
                            font-weight 700
                            &:before
                                content ''
                                position absolute
                                bottom 4px
                                left 50%
                                transform translate(-50%)
                                height .106667rem /* 4/37.5 */
                                width .426667rem /* 16/37.5 */
                                border-radius .053333rem /* 2/37.5 */
                                background-color blue
                            &:after
                                content ''
                                position absolute
                                transition all 0.6s
                                left 50%
                                top 50%
                                transform translate(-50%,-50%)
                                width var(--animation-width)
                                height var(--animation-height)
                                border-radius 50%
                                opacity var(--animation-opacity)
                                background-color rgb(160,160,160)
            .nav_btn__filter
                width 1.546667rem /* 58/37.5 */
                height 1.066667rem /* 40/37.5 */
                bc()
                display flex
                justify-content end
                .filter_img
                    width .533333rem /* 20/37.5 */
                    height .8rem /* 30/37.5 */
                    display flex
                    align-items center
                    img
                        height .533333rem /* 20/37.5 */
                        width .533333rem /* 20/37.5 */
                span
                    display inline-block
                    width 1.013333rem /* 38/37.5 */
                    color var(--color-light)
                    height .8rem /* 30/37.5 */
                    line-height .8rem /* 30/37.5 */
                    font-size .373333rem /* 14/37.5 */
                    text-align left 
        .filter_container
            height var(--filter-height)
            width 100vw
            display flex
            flex-direction column
            transition height 0.3s
            overflow hidden
            box-sizing border-box
            .nav_mask
                height 1.066667rem /* 40/37.5 */
                width 100vw
            .filter_items
                width 100vw
                flex 1
                bc()
                .filter_itemcontent
                    display flex
                    align-items center
                    height 100%
                    padding-left .426667rem /* 16/37.5 */
                    overflow hidden
                    white-space nowrap
                    .filter_item
                        height .853333rem /* 32/37.5 */
                        box-sizing border-box
                        padding 0 .32rem /* 12/37.5 */
                        border-radius .16rem /* 6/37.5 */
                        line-height .853333rem /* 32/37.5 */
                        font-size .373333rem /* 14/37.5 */
                        color var(--color-light)
                        &.active
                            color #4181c4
                            background-color #e7f5fe
        .main_container
            height calc(100vh - 1.28rem /* 48/37.5 */)
            width 100vw
            position relative
            overflow hidden
            .main_content
                width 100vw
                overflow hidden
                .nav_mask
                    width 100vw
                    height var(--mask-height)
                    bc()
                .content_list
                    width 100vw
                    margin-top .266667rem /* 10/37.5 */
                    .article_list
                        .articel_card
                            bc()
                            margin-bottom .266667rem /* 10/37.5 */


</style>