<template>
    <div class="article_item" 
    :class="{active:state.isTouch}"
    :style="`--before-width:${state.beforeWidth}px;--before-height:${state.beforeHeight}px;--before-opacity:${state.beforeOpacity}`" 
    @touchstart="cardTouch" 
    @touchend="cardEnd"
    ref="card">
        <div class="article_title">大学没怎么学时刻提防就是立刻搭街坊昆仑山搭街坊立刻东非南非你你都开始ljfksdjfki</div>
        <div class="article_info">
            <div class="article_avatarimg"></div>
            <div class="article_username">风地带覅</div>
            <div class="article_usertag">附近的疾风地带覅</div>
        </div>
        <div class="article_main">我是一个角度上看附件上都是非法喂奶粉上帝就发我i恩覅owni愤怒的神佛i内非农哦i你身份为你服务念佛我发你十多年佛恩覅own发i粉丝佛i你问富翁偶分呢飞鸟我i发</div>
        <div class="article_footer">
            <div class="article_comments">0000 赞同 · 0000 收藏</div>
            <div class="article_close" 
            @touchstart="stopPro" 
            @touchend="closeArticle">x</div>
        </div>
    </div>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import _ from "lodash"

const router = useRouter()

const state = reactive({
    beforeWidth:0,
    beforeHeight:0,
    beforeOpacity:0,
    isTouch:false,
    timer:0,
    pagePath:'/details/1',
    end:false,
})

const card = ref(null)

function gotoPage(path,pramas){
    state.timer = setTimeout(()=> { 
        router.push(path + '?' + pramas)
    },200)
}

function closeArticle(event){
    event.stopPropagation() // 阻止事件冒泡
    // alert('是否关闭？')
    console.log('///',event.target)
}

function cardTouch(){
    clearTimeout(state.timer)
    state.isTouch = true
    state.beforeWidth = card.value.clientWidth*1.5
    state.beforeHeight = card.value.clientHeight*1.5
    state.beforeOpacity = 0.2
    state.timer = setTimeout(async () => {
        clearTimeout(state.timer)
        state.beforeOpacity = 0.1
        await delay(200)
        state.beforeOpacity = 0
        await delay(200)
        state.isTouch = false
        state.beforeWidth = card.value.clientWidth*0.6
        state.beforeHeight = card.value.clientHeight*0.6
        state.end = true
    },600)
}

function delay(s){
    return new Promise((resolve) => {
        state.timer = setTimeout(()=> {
            resolve()
        },s)
    })
}

function stopPro(event){
    event.stopPropagation()
}


async function cardEnd(){
    if(!state.end){
        clearTimeout(state.timer)
        state.beforeOpacity = 0.1
        await delay(200)
        state.beforeOpacity = 0
        await delay(200)
        state.isTouch = false
        state.beforeWidth = card.value.clientWidth*0.6
        state.beforeHeight = card.value.clientHeight*0.6
        gotoPage(state.pagePath,'一些奋进')
    }
    state.end = false
}

onMounted(() => {
    state.beforeWidth = card.value.clientWidth*0.6
    state.beforeHeight = card.value.clientHeight*0.6
})
</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.article_item
    --before-width:0
    --before-height:0
    --before-opacity:0
    overflow hidden
    bc()
    width calc(100vw - .64rem)
    height auto
    padding .426667rem .32rem 0 .32rem
    margin-bottom .213333rem
    position relative
    .article_title
        font-size .426667rem /* 16/37.5 */
        font-weight 700
    .article_info
        box-sizing border-box
        height .853333rem /* 32/37.5 */
        width 100%
        padding .133333rem 0
        position relative
        display flex 
        align-items center
        .article_avatarimg
            width .586667rem /* 22/37.5 */
            height .586667rem /* 22/37.5 */
            border-radius 50%
            background-color red
            background-position -50%
            background-size cover
            display inline-block
        .article_username
            display inline-block
            font-size .373333rem /* 14/37.5 */
            font-weight 700
            padding 0 .213333rem /* 8/37.5 */
            color var(--color-Readed)
        .article_usertag
            font-size .373333rem /* 14/37.5 */
            font-weight 500
            color var(--color-Readed)
    .article_main
        word-break break-all
        overflow hidden
        display -webkit-box
        -webkit-line-clamp 2
        -webkit-box-orient vertical
        font-size .373333rem /* 14/37.5 */
        font-weight normal
        line-height 160%
        color var(--color-discription)
    .article_footer
        display flex
        position relative
        align-items center
        height .96rem /* 36/37.5 */
        width 100%
        .article_comments
            font-size .373333rem /* 14/37.5 */
            font-weight normal
            color var(--color-Readed)
        .article_close
            width .64rem /* 24/37.5 */
            height .64rem /* 24/37.5 */
            text-align right 
            line-height .64rem /* 24/37.5 */
            font-size .426667rem /* 16/37.5 */
            color var(--color-Readed)
            position absolute
            right 0
    &::before
        content ''
        position absolute
        wh(var(--before-width),var(--before-height))
        z-index 999
        transform translate(-50%,-50%)
        top 50%
        left 50%
        opacity var(--before-opacity)
        background  var(--color-base)
        border-radius 30%
    &.active::before
        transition all .6s
</style>