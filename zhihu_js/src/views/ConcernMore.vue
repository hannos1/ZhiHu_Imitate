<template>
    <header>
        <SecondNavBar :if-show-more="true">
                <template #navBar_main>
                    <div class="navbar_title">用户广场</div>
                </template>
        </SecondNavBar>
    </header>
    <main>
        <div class="itemlist_container" ref="swiper">
            <div class="itemlist">
                <div class="item" v-for="item in state.concernList" :key="item.id">
                    <div class="item_avaterimg">
                        <img src="../assets/img/test.png" alt="">
                    </div>
                    <div class="item_main">
                        <div class="item_main__authorname">{{ item.name }}</div>
                        <div class="item_main__section">[{{item.section}}]领域答主</div>
                        <div class="item_main__figures">{{item.answer}}回答 · {{item.concern}}3422关注</div>
                    </div>
                    <div class="item_button">
                        <div class="concern_btn" @click="clickConcern(item)" :class="{nagetive:item.isConcerned}">
                            <div class="concern_btn__label" v-if="!item.isConcerned">+关注</div>
                            <div class="concern_btn__label" v-else>已关注</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer>

    </footer>
</template>

<script setup>
import SecondNavBar from '../components/SecondNavBar.vue';
import { onMounted,ref,reactive } from 'vue';
import BScroll from '@better-scroll/core';
import _ from 'lodash';
import {getConcernList} from '../service/concern';
import ObserveDOM from '@better-scroll/observe-dom';
import {useConcernStore} from '../store/concerned';

BScroll.use(ObserveDOM)

const state = reactive({
    concernList:[]
})

const concernstore = useConcernStore()

const swiper = ref(null)
let bs = null

function concernOne(id){
    concernstore.addAllList(id)
}

function cancleConcern(id){
    concernstore.popAllList(id)
}

function clickConcern(item){
    let id = item.id
    if(item.isConcerned){
        cancleConcern(id)
    }else{
        concernOne(id)
    }
}

onMounted(async () => {
    await concernstore.getList()
    state.concernList = concernstore.concernedList.allList
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
header
    box-shadow 0 -2px 10px rgba(0,0,0,0.6)
    .navbar_title
        width 100%
        height 100%
        display flex
        align-items center
        font-size .533333rem /* 20/37.5 */
main
    .itemlist_container
        width 100vw
        height calc(100vh - 1.28rem /* 48/37.5 */)
        overflow hidden
        .itemlist
            .item
                height 2.24rem /* 84/37.5 */
                display flex
                position relative
                .item_avaterimg
                    width 1.173333rem /* 44/37.5 */
                    height 2.24rem /* 84/37.5 */
                    margin-left .373333rem /* 14/37.5 */
                    overflow hidden
                    img
                        width 1.173333rem /* 44/37.5 */
                        height 1.173333rem /* 44/37.5 */
                        margin-top .32rem /* 12/37.5 */
                        border-radius 50%
                .item_main
                    flex 1
                    .item_main__authorname,.item_main__section,.item_main__figures
                        text-align left
                        margin-left .32rem /* 12/37.5 */
                    .item_main__authorname
                        margin-top .426667rem /* 16/37.5 */
                        height .426667rem /* 16/37.5 */
                        line-height .426667rem /* 16/37.5 */
                        font-weight 700
                        font-size .373333rem /* 14/37.5 */
                    .item_main__section
                        font-size .373333rem /* 14/37.5 */
                        margin-top .106667rem /* 4/37.5 */
                    .item_main__figures
                        font-size .32rem /* 12/37.5 */
                        color var(--color-light)
                        margin-top .106667rem /* 4/37.5 */
                .item_button
                    width 2.08rem /* 78/37.5 */
                    height 2.24rem /* 84/37.5 */
                    margin-right .426667rem /* 16/37.5 */
                    display flex
                    align-items center
                    .concern_btn
                        height .853333rem /* 32/37.5 */
                        width 2.08rem /* 78/37.5 */
                        border-radius .426667rem /* 16/37.5 */
                        background-color blue
                        display flex
                        align-items center
                        &.nagetive
                            background-color var(--color-light)
                        .concern_btn__label
                            font-size .373333rem /* 14/37.5 */
                            font-weight 700
                            width 2.08rem /* 78/37.5 */
                            text-align center
                            color var(--bgc-base)
                &:before
                    content ''
                    position absolute
                    left 1.653333rem /* 62/37.5 */
                    right 0
                    top 2.186667rem /* 82/37.5 */
                    bottom 0
                    border-bottom 1px solid rgba(0,0,0,0.3)
            




</style>