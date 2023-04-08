<template>
    <div class="page_searchdetail">
        <header>
            <SecondNavBar :if-show-more="false" :back-path="'/home/tags'">
                <template #navBar_main>
                    <div class="navBar_main__container">
                        <div class="navBar_main__input" @click="gotoPage('/search',`?placeholder=半导体大涨&content=${state.inputcontent}`)">
                            <img src="../assets/img/搜索.png" alt="">
                            <span>{{ state.inputcontent }}</span>
                        </div>
                    </div>
                </template>
            </SecondNavBar>
        </header>
        <main>
            <div class="nav_container" :style="`--nav-top:${state.navtop}px;`">
                <div class="nav_scroll__container" ref="navswiper">
                    <div class="nav_scroll_content">
                        <div class="nav_scroll__item" 
                        v-for="item in state.typeList"
                        :key="item.id"
                        :class="{active:state.activeItem === item.id}"
                        @click="choseNavItem(item.id,item.params)" 
                        :style="`--animation-width:${state.itemwidth}px;
                        --animation-height:${state.itemheight}px;
                        --animation-opacity:${state.itemopacity};`">
                            {{ item.value }}
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
                        <div class="filter_item" 
                        v-for="item in state.contenttypelist"
                        :key="item.id"
                        :class="{active:state.contenttype === item.id}" 
                        @click="changeData(0,item.id)">
                            {{ item.value }}
                        </div>
                    </div>
                </div>
                <div class="filter_items">
                    <div class="filter_itemcontent">
                        <div class="filter_item" 
                        v-for="item in state.contentsortlist"
                        :key="item.id"
                        :class="{active:state.contentsort === item.id}" 
                        @click="changeData(1,item.id)">
                            {{ item.value }}
                        </div>
                    </div>
                </div>
                <div class="filter_items" ref="ctswiper">
                    <div class="filter_itemcontent">
                        <div class="filter_item" 
                        v-for="item in state.contenttimelist"
                        :key="item.id"
                        :class="{active:state.contenttime === item.id}" 
                        @click="changeData(2,item.id)">
                            {{ item.value }}
                        </div>
                    </div>
                </div>
            </div>
            <MySkeleton class="MySkeleton" :isReady="state.isReady">
                <template #skeleton_main>
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
                </template>
            </MySkeleton>
        </main>
        <footer>

        </footer>
    </div>
</template>

<script setup>
import SecondNavBar from '../components/SecondNavBar.vue';
import { useRouter,useRoute } from 'vue-router';
import { reactive,onMounted,ref } from 'vue';
import PreviewCard from '../components/PreviewCard.vue';
import {getRecommendIndex} from '../service/recommend';
import {getTypeList} from '../service/searchdetails'
import BScroll from '@better-scroll/core';
import MySkeleton from '../components/MySkeleton.vue';
import _ from 'lodash';
import ObserveDOM from '@better-scroll/observe-dom';
import {contenttypelist,contentsortlist,contenttimelist} from '../service/simpledata'

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
    contenttypelist:[],
    contentsortlist:[],
    contenttimelist:[],
    filterheight:0,
    maskheight:40,
    articleList:[],
    typeList:[],
    isReady:false,
    navtop:0,
    inputcontent:''
})

const pageswiper = ref(null)
let pageBs = null
const navswiper = ref(null)
let navBs = null
const ctswiper = ref(null)
let ctBs = null

const router = useRouter()
const route = useRoute()

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

function moveToCenter(id){
    let index = 0
    let suitX = 0 
    let wordsnum = 0
    for(let i = 0;i < state.typeList.length;i++){
        if(state.typeList[i].id === id){
            index = i
            break
        }
        wordsnum += state.typeList[i].value.length
    }
    suitX = -(index * 20 + wordsnum * 14) + 120
    if(suitX > navBs.minScrollX){
        suitX = navBs.minScrollX
    }
    if(suitX < navBs.maxScrollX){
        suitX = navBs.maxScrollX
    } // 边界情况处理
    navBs.scrollTo(suitX, 0, 300)
}

const getmainData =  _.debounce(async () => {
        state.isReady = false
        state.articleList = await getRecommendIndex()
        await delay(()=>{},1000)
        state.isReady = true
    },300)

async function choseNavItem(id){
    state.activeItem = id
    getmainData()
    moveToCenter(id)
    clearTimeout(state.timer)
    state.itemwidth = 150
    state.itemheight = 150
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

function pageBsScroll(y){
    if(this.y < -y){
        state.navtop = -40
    }else{
        state.navtop = 0
    }

    if(this.y < 0){
        state.filterheight = 0
        state.maskheight = 40
    }
}

onMounted(async () => {
    let data = await Promise.all([getRecommendIndex(),getTypeList()])
    state.articleList = data[0]
    state.typeList = data[1]
    setTimeout(() => {
        state.isReady = true
    },1000)

    state.contenttypelist = contenttypelist
    state.contentsortlist = contentsortlist
    state.contenttimelist = contenttimelist
    state.inputcontent = route.query.content

    pageBs = new BScroll(pageswiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        observeDOM:true,
        click:true,
        bounce:false,
    })

    pageBs.on('scroll',_.throttle(pageBsScroll.bind(pageBs,20),30))

    navBs = new BScroll(navswiper.value,{
        probeType:3,
        scrollX:true,
        scrollY:false,
        observeDOM:true,
        click:true,
        bounce:false,
    })

    ctBs = new BScroll(ctswiper.value,{
        probeType:3,
        scrollX:true,
        scrollY:false,
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
    --nav-top:40px
    position fixed
    display flex
    flex-direction column
    header
        height 1.28rem /* 48/37.5 */
        width 100vw
        z-index 1000
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
            top var(--nav-top)
            left 0
            overflow hidden
            z-index 999
            transition top 0.6s
            .nav_scroll__container
                flex 1
                height 1.066667rem /* 40/37.5 */
                overflow hidden
                .nav_scroll_content
                    height 1.066667rem /* 40/37.5 */
                    display inline-block
                    position relative
                    white-space nowrap
                    box-sizing border-box
                    bc()
                    .nav_scroll__item
                        display inline-block
                        height 1.066667rem /* 40/37.5 */
                        line-height .48rem /* 18/37.5 */
                        font-size .373333rem /* 14/37.5 */
                        box-sizing border-box
                        padding 8px 10px 12px 10px
                        position relative
                        text-align center
                        overflow hidden
                        &:after
                            content ''
                            position absolute
                            transition all 0.6s
                            left 50%
                            top 50%
                            transform translate(-50%,-50%)
                            width 0
                            height 0
                            border-radius 50%
                            opacity 0
                            background-color rgb(160,160,160)
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
                overflow hidden
                bc()
                .filter_itemcontent
                    display inline-block
                    height 100%
                    padding-left .426667rem /* 16/37.5 */
                    white-space nowrap
                    position relative
                    .filter_item
                        display inline-block
                        height .853333rem /* 32/37.5 */
                        box-sizing border-box
                        margin-top .16rem /* 6/37.5 */
                        padding 0 .32rem /* 12/37.5 */
                        border-radius .16rem /* 6/37.5 */
                        line-height .853333rem /* 32/37.5 */
                        font-size .373333rem /* 14/37.5 */
                        color var(--color-light)
                        &.active
                            color #4181c4
                            background-color #e7f5fe
        .MySkeleton
            width 100vw
            height calc(100vh - 1.28rem /* 48/37.5 */)
            bc()
            .main_container
                height calc(100vh - 1.28rem /* 48/37.5 */)
                width 100vw
                position relative
                overflow hidden
                background-color #f6f6f6
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