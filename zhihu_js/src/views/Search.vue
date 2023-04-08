<template>
    <div class="page_search">
        <header>
            <SecondNavBar :if-show-more="false" :back-path="'/home/tags'">
                <template #navBar_main>
                    <div class="navBar_main__container">
                        <div class="navBar_main__input">
                            <img src="../assets/img/搜索.png" alt="">
                            <input ref="input" v-model="state.content" :placeholder="state.placeholder" type="text" @keydown="keyDownEvent">
                            <div class="input_del">
                                <img src="../assets/img/叉号圆形.png" alt="" @click="deleteInput" v-if="state.content.length > 0" >
                            </div>
                        </div>
                        <div class="navBar_main__button" @click="search(state.content)">搜索</div>
                    </div>
                </template>
            </SecondNavBar>
        </header>
        <main>
            <div class="search_container" ref="swiper">
                <div class="search_content" v-bind:hidden="!(state.content.length === 0)">
                    <div class="search_history" v-if="state.historyList.word && state.historyList.word.length > 0">
                        <div class="search_nav">
                            <div class="nav_icon">
                                <span>历史搜索</span>
                            </div>
                            <div class="history_btn__del">
                                <span v-if="state.delmodel" @click="removeHistory">全部删除</span>
                                <span v-if="state.delmodel" @click="changeDelmodel">完成</span>
                                <img src="../assets/img/ashbin.png" v-else alt="" @click="changeDelmodel">
                            </div>
                        </div>
                        <div class="history_itemlist" :style="`--hov:'${state.hov}'`">
                            <div class="history_item" v-for="item in state.historyList.word">
                                <span @click="search(item.content)">{{ item.content }}</span>
                                <img src="../assets/img/叉号.png" alt="" v-if="state.delmodel" @click="removeByContent(item.content)">
                            </div>
                            <div class="history_item btn" v-if="!state.delmodel&&state.ishov" @click="hiddenOrVisibility">
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div class="search_guess">
                        <div class="search_nav">
                            <div class="nav_icon">
                                <span>猜你想搜</span>
                            </div>
                        </div>
                        <div class="guess_item" v-for="item in state.guessList">
                            <span @click="search(item.content)">{{ item.content }}</span>
                            <i :class="{hotword:item.ishot}"></i>
                        </div>
                    </div>
                </div>
                <div class="seolist" v-if="!(state.content.length === 0)">
                    <ul>
                        <li v-for="item in state.searchwords" :key="item.id">
                            <div class="seoitem" @click="search(item.content)">
                                <div class="searchicon">
                                    <img src="../assets/img/搜索.png" alt="">
                                </div>
                                <div class="searchlabel">
                                    {{ item.content }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
        <footer>

        </footer>
    </div>
</template>

<script setup>
import SecondNavBar from '../components/SecondNavBar.vue';
import { reactive,onMounted,ref,computed,onUnmounted,onUpdated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {useHistorySearchStore} from '../store/historysearch';
import ObserveDOM from '@better-scroll/observe-dom';
import BScroll from '@better-scroll/core';
import {getHotwords,getSearchwords} from '../service/search';
import _ from 'lodash'

BScroll.use(ObserveDOM)

const state = reactive({
    placeholder:'',
    inputfocu:false,
    content:'',
    historyList:{},
    guessList:[],
    searchwords:[],
    hov:'▾',
    ishov:computed(() => {
        return (state.historyList.word && state.historyList.remainder && state.historyList.word.length > 4 || state.historyList.remainder.length > 0)
    }) // ▴▾
})

const input = ref(null)
const swiper = ref(null)
let bs = null
const historySearchStore = useHistorySearchStore()

const route = useRoute()
const router = useRouter()

const seoWords =  _.debounce(async () => {
       state.searchwords = await getSearchwords(state.content)
    },300)

function keyDownEvent(e){
    seoWords()

    if(e.keyCode === 13){ // 13回车
        search(state.content)
    }
}

function search(str){
    let item = {
        content:str.trim()
    }
    if(item.content === ''){
        item.content = state.placeholder
    }
    historySearchStore.setWords(item)
    router.push('/searchDetails?content=' + item.content)
}

function deleteInput(){
    state.content = ''
    state.searchwords = []
}

function removeHistory(){
    historySearchStore.removeall()
    changeDelmodel()
}

function changeDelmodel(){
    state.delmodel = !state.delmodel
    if(state.delmodel){
        state.hov = '▴'
        historySearchStore.setInWords()
    }else{
        state.hov = '▾'
        historySearchStore.setInRemainder()
    }
}

function removeByContent(str){
    historySearchStore.removeByContent(str)
}

function hiddenOrVisibility(){
    if(state.hov === '▾'){
        state.hov = '▴'
        historySearchStore.setInWords()
    }else{
        state.hov = '▾'
        historySearchStore.setInRemainder()
    }
}

onMounted(async () => {
    state.placeholder = route.query.placeholder || ''
    state.content = route.query.content || ''
    state.historyList = historySearchStore.words
    state.guessList = await getHotwords()

    if(state.content.length > 0){
        input.value.focus()
    }

    bs = new BScroll(swiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        click:true,
        observeDOM:true,
        bounce:false
    })
})

onUpdated(() => {
    if(bs){
        bs.refresh()
    }
})

onUnmounted(() => {
    bs.destroy()
    historySearchStore.setInRemainder() // 销毁的话收回来
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.page_search
    --hov:'▾'
    position fixed
    .navBar_main__container
        height 100%
        display flex
        align-items center
        justify-content space-around
        overflow hidden
        .navBar_main__input
            flex 1
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
            input
                display inline-block
                width 4.266667rem /* 160/37.5 */
                outline none
                height .64rem /* 24/37.5 */
                background-color #f6f6f6
                border none
                line-height .64rem /* 24/37.5 */
                font-size .426667rem /* 16/37.5 */
            .input_del
                display inline-block
                width .533333rem /* 20/37.5 */
                height .533333rem /* 20/37.5 */
                overflow hidden
                margin-right .48rem /* 18/37.5 */
                margin-left .533333rem /* 20/37.5 */
                img
                    margin 0
                    width .533333rem /* 20/37.5 */
                    height .533333rem /* 20/37.5 */
                    border-radius 50%
        .navBar_main__button
            width 1.6rem /* 60/37.5 */
            height .586667rem /* 22/37.5 */
            line-height .586667rem /* 22/37.5 */
            text-align center
            font-size .426667rem /* 16/37.5 */
            font-weight 700
            color blue
    main
        .search_container
            width 100vw
            height calc(100vh - 1.28rem /* 48/37.5 */)
            overflow hidden
            .search_content
                position relative
                overflow hidden
                .search_history,.search_guess
                    margin-top .533333rem /* 20/37.5 */
                    width 100vw
                    .search_nav
                        height .586667rem /* 22/37.5 */
                        display flex
                        align-items center
                        justify-content space-between
                        margin-left .426667rem /* 16/37.5 */
                        margin-right .426667rem /* 16/37.5 */
                        .nav_icon
                            flex 1
                            height .586667rem /* 22/37.5 */
                            display flex
                            span
                                flex 1
                                font-size .373333rem /* 14/37.5 */
                                font-weight 700
                                margin-left .266667rem /* 10/37.5 */
                                position relative
                                &:before
                                    content ''
                                    position absolute
                                    left -10px
                                    top .133333rem /* 5/37.5 */
                                    bottom .133333rem /* 5/37.5 */
                                    right 0
                                    border-left 4px solid blue
                        .history_btn__del
                            width 2.56rem /* 96/37.5 */
                            height .533333rem /* 20/37.5 */
                            margin-right .16rem /* 6/37.5 */
                            display flex
                            align-items center
                            font-size .32rem /* 12/37.5 */
                            color var(--color-light)
                            justify-content space-between
                            position relative
                            img
                                position absolute
                                right 0
                                width .533333rem /* 20/37.5 */
                                height .533333rem /* 20/37.5 */
                .search_history
                    .history_itemlist
                        margin 0 .426667rem /* 16/37.5 */ 
                        display flex
                        flex-wrap wrap
                        .history_item
                            height .96rem /* 36/37.5 */
                            line-height .96rem /* 36/37.5 */
                            border-radius .48rem /* 18/37.5 */
                            margin .266667rem .266667rem .266667rem 0
                            background-color #f6f6f6
                            text-align center
                            font-size .373333rem /* 14/37.5 */
                            color var(--color-light)
                            display flex
                            align-items center
                            position relative
                            span
                                margin 0 .48rem /* 18/37.5 */
                                display inline-block
                                max-width calc(100vw - 2.72rem)
                                text-overflow ellipsis
                                overflow hidden
                                word-break break-all
                                white-space nowrap
                            img
                                display inline-block
                                width .426667rem /* 16/37.5 */
                                height .426667rem /* 16/37.5 */
                                margin-right .48rem /* 18/37.5 */
                            &.btn
                                &:before
                                    content var(--hov)
                                    position absolute
                                    top 0
                                    left 0
                                    bottom 0
                                    right 0
                                    font-size 28px
                .search_guess
                    margin-bottom 1.066667rem /* 40/37.5 */
                    .guess_item
                        margin-left .426667rem /* 16/37.5 */
                        height 1.12rem /* 42/37.5 */
                        line-height 1.12rem /* 42/37.5 */
                        width 90vw
                        display flex
                        span
                            position relative
                            display inline-block
                            font-size .48rem /* 18/37.5 */
                            max-width calc(90vw - .8rem /* 30/37.5 */)
                            text-overflow ellipsis
                            overflow hidden
                            word-break break-all
                            white-space nowrap
                        i
                            position relative
                            display inline-block
                            &.hotword
                                &:after
                                    content '热'
                                    font-size .266667rem /* 10/37.5 */
                                    position absolute
                                    right -.746667rem /* 28/37.5 */
                                    width .533333rem /* 20/37.5 */
                                    height 16px
                                    line-height 16px
                                    border-radius .106667rem /* 4/37.5 */
                                    background-color #c56a72
                                    top 50%
                                    transform translate(0,-50%)
                                    text-align center
                                    color white
            .seolist
                width 100vw
                ul
                    li
                        .seoitem
                            width 100vw
                            height .96rem /* 36/37.5 */
                            display flex
                            overflow hidden
                            .searchicon
                                width 1.066667rem /* 40/37.5 */
                                height .96rem /* 36/37.5 */
                                img
                                    width .533333rem /* 20/37.5 */
                                    height .533333rem /* 20/37.5 */
                                    margin .213333rem /* 8/37.5 */ .266667rem /* 10/37.5 */
                            .searchlabel
                                height .96rem /* 36/37.5 */
                                line-height .96rem /* 36/37.5 */
                                flex 1
                                font-size .426667rem /* 16/37.5 */
                                padding-left .213333rem /* 8/37.5 */
                                max-width 7.466667rem /* 280/37.5 */
                                text-overflow ellipsis
                                overflow hidden
                                word-break break-all
                                white-space nowrap
</style>