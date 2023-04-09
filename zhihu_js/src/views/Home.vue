<template>
    <div class="home_container">
        <header class="home_header">
            <div class="header_history">
                <img src="../assets/img/分层.png" @click="gotoPage()" alt="">
            </div>
            <div class="header_pages">
                <div class="header_page" 
                :class="{active:state.pageindex === 0}"
                @click="goto(0)"
                >想法</div>
                <div class="header_page" 
                :class="{active:state.pageindex === 1}"
                @click="goto(1)"
                >推荐</div>
                <div class="header_page" 
                :class="{active:state.pageindex === 2}"
                @click="goto(2)"
                >热榜</div>
            </div>
            <div class="header_message">
                <img src="../assets/img/提醒.png" @click="gotoPage()" alt="">
            </div>
            <div class="header_search" v-if="state.showSearch||state.pageindex!==1">
                <img src="../assets/img/搜索.png" @click="gotoPage('/search')" alt="">
            </div>
        </header>
        <main class="home_main">
            <MySwiper ref="pageSwiper" 
            :totals="3" 
            :current="state.pageindex" 
            @increaseIndex="increaseIndex"
            >
                <template #listItem>
                    <Idea />
                    <Recommend @changSearch="changSearch" ref="recommend" />
                    <Hot />
                </template>
            </MySwiper>
        </main>
        <footer class="home_footer">
            <MyTabBar :current="state.current" :carry="backtop" />
        </footer>
    </div>
</template>

<script setup>
import MyTabBar from '../components/MyTabBar.vue';
import MySwiper from '../components/MySwiper.vue';
import Hot from '../views/Hot.vue';
import Recommend from '../views/Recommend.vue';
import Idea from '../views/Idea.vue'
import {ref,reactive,onMounted} from 'vue'
import { useRouter } from 'vue-router';

let pageSwiper = ref(null)

const router = useRouter()

const state = reactive({
    pageindex:1,
    current:'/home',
    showSearch:false,

})

const recommend = ref(null)

const increaseIndex = (params) => {
    state.pageindex = params.p1
}

function changSearch(e){
    state.showSearch = e
}

const goto = (e) => {
    state.pageindex = e
}

const gotoPage = (e) => {
    if(e){
        router.push(e)
    }
    else{
        alert('还在开发中')
    }
}

function backtop(){
    recommend.value.backtop()
    return true
}

onMounted(() => {

})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.home_container
    .home_header
        position relative
        display flex
        position fixed
        z-index 999
        width 100vw
        bc()
        justify-content space-between
        border-bottom .026667rem solid #f7f7f7
        .header_history,.header_message
            wh(1.6rem /* 60/37.5 */,1.28rem /* 48/37.5 */)
            display flex
            align-items center
            justify-content center
            img
                width .64rem /* 24/37.5 */
                height .64rem /* 24/37.5 */
            i
                font-size .533333rem /* 20/37.5 */
        .header_pages
            // flex 1
            width 5.066667rem /* 190/37.5 */
            display flex
            justify-content space-around
            .header_page
                font-size .373333rem /* 14/37.5 */
                lc()
                wh(.853333rem /* 32/37.5 */,100%)
                line-height 1.28rem /* 48/37.5 */
                text-align center
                position relative
                &.active
                    color var(--color-base)
                    font-size .426667rem /* 16/37.5 */
                    font-weight 700
                    &:before
                        content ''
                        position absolute
                        bottom .373333rem /* 14/37.5 */
                        top .8rem /* 30/37.5 */
                        border-radius .053333rem /* 2/37.5 */
                        left -.053333rem /* 2/37.5 */
                        right -.053333rem /* 2/37.5 */
                        background-color blue
                        opacity 0.6
        .header_search
            height 1.28rem /* 48/37.5 */
            position absolute
            right 1.333333rem /* 50/37.5 */
            top 0
            font-size .533333rem /* 20/37.5 */
            display flex
            align-items center
            justify-content center
            img
                background-position -50%
                background-size cover
                width .64rem /* 24/37.5 */
                height .64rem /* 24/37.5 */
</style>