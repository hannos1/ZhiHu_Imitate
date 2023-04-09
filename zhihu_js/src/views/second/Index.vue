<template>
    <header>
        <div class="icon_logo">
            <img src="../../assets/img/test.png" alt="">
        </div>
        <div class="icon_search">
            <div class="search_box">
                <div class="placeHolder" @click="gotoPage('/search',`placeholder=${state.hotword}`)">{{ state.hotword }}</div>
                <div class="button_label" @click="gotoPage('/searchDetails',`content=${state.hotword}`)">搜索</div>
            </div>
        </div>
    </header>
    <main>
        <div class="article_list" v-if="state.pageData.length !== 0">
            <div v-for="item in state.pageData" :key="item.id" :class="{negative:state.closeId === item.id}">
                <PreviewCard :data="item"></PreviewCard>
            </div>
            <div v-for="item in state.loaddata.data" :key="item.id" :class="{negative:state.closeId === item.id}">
                <PreviewCard :data="item"></PreviewCard>
            </div>
        </div>
    </main>
    <footer>
        <div class="loading">loading...</div>
    </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PreviewCard from '../../components/PreviewCard.vue';
import {onMounted,inject,reactive,ref,provide} from 'vue'
import {getRecommendIndex} from '../../service/recommend'
import {useHomeIndexStore} from '../../store/homeindex'

const { changeReady } = inject('isReady')

const router = useRouter()
const state = reactive({
    pageData:[],
    isready:false,
    closeId:-1,
    hotword:'高校优化学科布点',
    loaddata:{}
})

const datastore = useHomeIndexStore()

function gotoPage(path,pramas){
    router.push(path + '?' + pramas)
}

async function removeById(id){  // 这里做数据删除
    state.closeId = id
    await setTimeout(() => {
        state.pageData = state.pageData.filter((item) => item.id !== id)
        state.loaddata.data = state.loaddata.data.filter((item) => item.id !== id)
        state.closeId = -1
    },600)
}

provide('closeCard', {
    removeById
})

onMounted(async () => {
    state.pageData = await getRecommendIndex()
    state.loaddata = datastore.pagedata
    await changeReady(true)
})

</script>

<style lang="stylus" scoped>
@import '../../assets/styl/mixin.styl';
header
    bc()
    height 1.386667rem /* 52/37.5 */
    width 100%
    display flex
    align-items center
    .icon_logo
        width 1.706667rem /* 64/37.5 */
        height 100%
        display flex
        align-items center
        justify-content center
        img
            display inline-block
            width 40px
            height 40px
            border-radius 50%
            background-position -50%
            background-size cover
    .icon_search
        height 100%
        flex 1
        display flex
        align-items center
        justify-content start
        .search_box
            width 7.786667rem /* 292/37.5 */
            height .96rem /* 36/37.5 */
            border 2px solid var(--color-primary)
            border-radius .48rem /* 18/37.5 */
            display flex
            align-items center
            .placeHolder
                flex 1
                margin-left .426667rem /* 16/37.5 */
                margin-right .426667rem /* 16/37.5 */
                height .96rem /* 36/37.5 */
                line-height .96rem /* 36/37.5 */
                font-size .373333rem /* 14/37.5 */
                color var(--color-Readed)
                text-overflow ellipsis
                overflow hidden
                word-break break-all
                white-space nowrap
            .button_label
                width 1.6rem /* 60/37.5 */
                height .96rem /* 36/37.5 */
                line-height .96rem /* 36/37.5 */
                font-size .373333rem /* 14/37.5 */
                text-align center
                font-weight 700
                pc()
                position relative
                &:before
                    content ''
                    position absolute
                    top .32rem /* 12/37.5 */
                    bottom .32rem /* 12/37.5 */
                    left 0
                    right 0
                    border-left 1px solid var(--color-primary)
main
    .article_list
        width 100vw
        div
            transition all 0.3s
        .negative
            opacity 0
footer
    .loading
        height 1.066667rem /* 40/37.5 */
        display flex
        align-items center
        justify-content center
        font-size .373333rem /* 14/37.5 */
        color var(--color-light)
</style>