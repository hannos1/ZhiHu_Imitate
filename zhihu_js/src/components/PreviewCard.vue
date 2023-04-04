<template>
    <div class="article_item" 
    :class="{active:state.isTouch}"
    :style="`--before-width:${state.beforeWidth}px;--before-height:${state.beforeHeight}px;--before-opacity:${state.beforeOpacity}`" 
    @touchstart="cardTouch" 
    @touchmove="cardMove"
    @touchend="cardEnd"
    ref="card">
        <div class="article_title">{{ state.data.title }}</div>
        <div class="article_info">
            <div class="article_avatarimg"></div>
            <div class="article_username">{{ state.data.authorName }}</div>
            <div class="article_usertag">{{ state.data.tag }}</div>
        </div>
        <div class="article_main">{{ state.data.aritcle }}</div>
        <div class="article_footer">
            <div class="article_comments">{{ state.data.likes }} 赞同 · {{ state.data.collection }} 收藏</div>
            <div class="article_close" 
            @touchstart="stopPro" 
            @touchmove="stopPro" 
            @touchend="closeArticle">x</div>
        </div>
    <van-popup
        v-model:show="showBottom"
        position="bottom"
        closeable
        round
        lazy-render
        :close-on-click-overlay="false"
        teleport="body"
    >
        <CloseCard 
        :title="state.data.title" 
        :authorName="state.data.authorName" 
        :id="state.data.id"
        @windowcontrol="windowcontrol"
         />
    </van-popup>
    </div>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import _ from "lodash"
import CloseCard from './popup/CloseCard.vue';

const router = useRouter()

const props = defineProps({
    data:{
        type:Object,
        default:{}
    }
})

const state = reactive({
    data:{},
    beforeWidth:0,
    beforeHeight:0,
    beforeOpacity:0,
    isTouch:false,  // 动态类名 是否触摸
    timer:0, // 计时器id
    pagePath:'',  // 路径 由父组件传递
    end:false,  // 是否直接触发结束动画
    pramas:'',
})

const card = ref(null)

let showBottom = ref(false)

function gotoPage(path,pramas){
    state.timer = setTimeout(()=> { 
        router.push(path + '?' + pramas)
    },200)
}

function closeArticle(event){
    event.stopPropagation() // 阻止事件冒泡
    showBottom.value = true
}

function windowcontrol(b){
    showBottom.value = b
}

function cardTouch(){
    clearTimeout(state.timer)
    state.isTouch = true
    state.beforeWidth = card.value.clientWidth*1.5
    state.beforeHeight = card.value.clientHeight*1.5
    state.beforeOpacity = 0.2
    state.timer = setTimeout(async () => {  // 长按自动消除
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

async function cardMove(){ // 如果移动了就是要翻页
    clearTimeout(state.timer)  // 清除之前的timer
    state.end = true  // 翻页不用跳转
    state.timer = setTimeout(async () => {
        if(state.isTouch){
            state.beforeOpacity = 0.1
            await delay(200)
            state.beforeOpacity = 0
            await delay(200)
            state.isTouch = false
            state.beforeWidth = card.value.clientWidth*0.6
            state.beforeHeight = card.value.clientHeight*0.6
        }
    },0)
}


async function cardEnd(){  // 短按会跳转
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
    state.data = props.data
    state.pagePath = props.data.path
    state.pramas = props.data.pramas
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