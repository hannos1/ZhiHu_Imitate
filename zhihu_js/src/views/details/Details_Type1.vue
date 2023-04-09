<template>
    <div class="detail_container" ref="pageswiper">
        <div class="detail_content">
            <div class="top_container" ref="swiper">
                <div class="top_content">
                    <header>
                        <SecondNavBar>
                            <template #navBar_main> 
                                <div class="navBar_mainbox">
                                    <div class="navBar_item">
                                        <van-icon name="friends-o" />
                                        <span>邀请</span>
                                    </div>
                                    <div class="navBar_item">
                                        <van-icon name="records" />
                                        <span>写回答</span>
                                    </div>
                                </div>
                            </template>
                        </SecondNavBar>
                    </header>
                    <main>
                        <div class="mian_container">
                            <div class="main_content">
                                <div class="main_title">
                                    <span>人工智能（AI）真的会带来大规模失业吗？</span>
                                    <span>知乎 · 929个回答 · 3870关注></span>
                                </div>
                                <div class="main_user">
                                    <div class="user_info">
                                        <div class="user_avaterimg">
                                            <img src="../../assets/img/test.png" alt="">
                                        </div>
                                        <div class="user_name">
                                            这是一个名字
                                        </div>
                                        <div class="concern_btn">
                                            <span>+关注</span>
                                        </div>
                                    </div>
                                    <div class="likes">52人赞同了该回答</div>
                                </div>
                                <div class="main_article">
                                    <title>一、 前言</title>
                                    <p>一苏联空军的法拉家纺独立思考拉萨看见对方洛克时代反击能力空间阿里可能发生看到</p>
                                    <p>数量大幅扩建2哦四季度佛哦四代机佛势力扩大解放偶是地方九年发送地方呢</p>
                                    <img src="../../assets/img/test.png" alt="">
                                    <p>数量大幅扩建2哦四季度佛哦四代机佛势力扩大解放偶是地方九年发送地方呢</p>
                                    <p>数量大幅扩建2哦四季度佛哦四代机佛势力扩大解放偶是地方九年发送地方呢</p>
                                </div>
                                <div class="comments_section">
                                    <div class="comments_title">评论 6</div>
                                    <div class="comments_item">
                                        <img src="../../assets/img/test.png" alt="">
                                        <div class="comment_content__box">
                                            <div class="comment_input">
                                                <span>写评论</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="comments_item" v-for="item in 2">
                                        <img src="../../assets/img/test.png" alt="">
                                        <div class="comment_content__box">
                                            <div class="comment_name">pika皮卡丘</div>
                                            <div class="comment_main">的时间哦覅较为哦设定覅哦偶是顶峰2i发动司法你设计的佛山的房间ops大家覅哦时间上的飞机2佛i是你的覅2Odis能否</div>
                                            <div class="comment_footer">
                                                <span>03-05 · IP属地合肥</span>
                                                <van-icon name="chat-o" />
                                                <span></span>
                                                <van-icon name="good-job-o" />
                                                <span>5</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="readmore">查看更多评论 ></div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <footer>
                <div class="comments_container">
                    <div class="btn_updown_mask">
                        <div class="btn_updown">
                            <span><i>▴</i>赞同 406</span>
                            <span><i>▾</i></span>
                        </div>
                    </div>
                    <div class="btn_primary">
                        <van-icon name="like-o" />
                        <span>22</span>
                    </div>
                    <div class="btn_primary">
                        <van-icon name="star-o" />
                        <span>86</span>
                    </div>
                    <div class="btn_primary">
                        <van-icon name="chat-o" />
                        <span>6</span>
                    </div>
                    <div class="btn_primary">
                        <img src="../../assets/img/test.png" alt="">
                    </div>
                </div>
            </footer>
            <div class="more_content">
                更多内容尽情期待
            </div>
        </div>
    </div>
    <div class="backtotop" @click="backtop">
        <van-icon name="back-top" />
    </div>
</template>

<script setup>
import SecondNavBar from '../../components/SecondNavBar.vue';
import {ref,onMounted,onUpdated} from 'vue';
import BScroll from '@better-scroll/core';
import _ from 'lodash';
import ObserveDOM from '@better-scroll/observe-dom';

BScroll.use(ObserveDOM)

const pageswiper = ref(null)
const swiper = ref(null)
let pagebs = null
let bs = null

function bsScroll(pagebs){
    if(this.y > this.maxScrollY + 5){
        pagebs.disable()
    }else{
        pagebs.enable()
    }
}

function pageBsScroll(bs){
    if(this.y < this.minScrollY - 5){
        bs.disable()
    }else{
        bs.enable()
    }
}

function delay(num){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, num);
    })
}

async function backtop(){
    if(bs&&pagebs){
        bs.enable()
        pagebs.enable()
        pagebs.scrollTo(0,0,300)
        await delay(10)
        bs.scrollTo(0, 0, 300)
        await delay(300)
        pagebs.disable()
    }
}

onMounted(() => {
    pagebs = new BScroll(pageswiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        observeDOM:true,
        click:true,
        bounce:false
    })

    bs = new BScroll(swiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        observeDOM:true,
        click:true,
        bounce:false
    })

    
    pagebs.on('scroll',_.throttle(pageBsScroll.bind(pagebs,bs),30))
    bs.on('scroll',_.throttle(bsScroll.bind(bs,pagebs),30))
    pagebs.disable()

    setTimeout(() => {  // 刷新页面滚动导致滚动不了，手动refresh一下
        bs.refresh()
        pagebs.refresh()
    },100);
})

</script>

<style lang="stylus" scoped>
@import '../../assets/styl/mixin.styl';
.detail_container
    position fixed
    width 100vw
    height 100vh
    overflow hidden
    background-color #f6f6f6
    .detail_content
        width 100vw
        .top_container
            height calc(100vh - 1.386667rem /* 52/37.5 */)
            width 100vw
            overflow hidden
            bc()
            .top_content
                position relative
                header
                    .navBar_mainbox
                        width 100%
                        display flex
                        height 1.28rem /* 48/37.5 */
                        align-items center
                        justify-content end
                        .navBar_item
                            margin-left .426667rem /* 16/37.5 */
                            font-size .426667rem /* 16/37.5 */
                            color blue
                            font-weight 700
                            span
                                display inline-block
                                margin-left .106667rem /* 4/37.5 */
                main
                    .mian_container
                        width 100vw
                        .main_content
                            margin 0 .426667rem /* 16/37.5 */
                            .main_title
                                font-size .533333rem /* 20/37.5 */
                                font-weight 700
                                margin-top .213333rem /* 8/37.5 */
                                margin-bottom .533333rem /* 20/37.5 */
                                position relative
                                span
                                    display block
                                    margin-top .32rem /* 12/37.5 */
                                    &:last-child
                                        font-size .373333rem /* 14/37.5 */
                                        color var(--color-light)
                                &:before
                                    content ''
                                    position absolute
                                    left -.426667rem
                                    right -.426667rem /* 16/37.5 */
                                    bottom -.48rem /* 18/37.5 */
                                    top 0
                                    border-bottom 1px solid rgba(0,0,0,0.1)
                        .main_user
                            height 2.986667rem /* 112/37.5 */
                            width 100%
                            overflow hidden
                            .user_info
                                display flex
                                height 1.066667rem /* 40/37.5 */
                                align-items center
                                margin-top .533333rem /* 20/37.5 */
                                .user_avaterimg
                                    width 1.066667rem /* 40/37.5 */
                                    height 1.066667rem /* 40/37.5 */
                                    border-radius 50%
                                    overflow hidden
                                    img
                                        width 100%
                                        height 100%
                                        background-size cover
                                .user_name
                                    flex 1
                                    font-size .426667rem /* 16/37.5 */
                                    font-weight 700
                                    margin-left 1em
                                .concern_btn
                                    width 2.08rem /* 78/37.5 */
                                    height .96rem /* 36/37.5 */
                                    display flex
                                    align-items center
                                    background-color #e9f5fe
                                    border-radius .48rem /* 18/37.5 */
                                    span
                                        width 100%
                                        text-align center
                                        font-size .373333rem /* 14/37.5 */
                                        font-weight 700
                                        color blue
                            .likes
                                margin-top .373333rem /* 14/37.5 */
                                font-size .32rem /* 12/37.5 */
                                color var(--color-light)
                        .main_article
                            color rgb(100,100,100)
                            title
                                font-size .426667rem /* 16/37.5 */
                                display block !important
                                font-weight 700
                                margin .533333rem 0
                            p
                                font-size .426667rem /* 16/37.5 */
                                font-weight 500
                                line-height 1.4em
                                margin .533333rem 0
                            img 
                                width 100%
                                background-size cover
                        .comments_section
                            .comments_title
                                height 1.013333rem /* 38/37.5 */
                                width 100%
                                font-size .373333rem /* 14/37.5 */
                                font-weight 700
                                text-align left
                            .comments_item
                                width 100%
                                display flex
                                align-items start
                                img
                                    width .96rem /* 36/37.5 */
                                    height .96rem /* 36/37.5 */
                                    border-radius 50%
                                    background-size cover
                                .comment_content__box
                                    flex 1
                                    margin-left .32rem /* 12/37.5 */
                                    font-size .373333rem /* 14/37.5 */
                                    .comment_input
                                        width 100%
                                        height 1.066667rem /* 40/37.5 */
                                        border-radius .533333rem /* 20/37.5 */
                                        background-color #f6f6f6
                                        margin-bottom .426667rem /* 16/37.5 */
                                        span
                                            height 1.066667rem /* 40/37.5 */
                                            line-height 1.066667rem /* 40/37.5 */
                                            margin-left .533333rem /* 20/37.5 */
                                            color var(--color-light)
                                    .comment_name
                                        font-weight 700
                                        height .533333rem /* 20/37.5 */
                                        line-height .533333rem /* 20/37.5 */
                                        margin-bottom .16rem /* 6/37.5 */
                                    .comment_main
                                        font-weight normal
                                        line-height 1.6em
                                        color #686868
                                        word-break: break-all;
                                        overflow hidden
                                        display -webkit-box
                                        -webkit-line-clamp 2
                                        -webkit-box-orient vertical
                                    .comment_footer
                                        height .853333rem /* 32/37.5 */
                                        display flex
                                        align-items center
                                        font-size .266667rem /* 10/37.5 */
                                        color var(--color-light)
                                        span
                                            display inline-block
                                            min-width .533333rem /* 20/37.5 */
                                            text-align center
                                            &:first-child
                                                flex 1
                                                text-align left
                                        i 
                                            font-size .48rem /* 18/37.5 */
                            .readmore
                                height 1.066667rem /* 40/37.5 */
                                line-height 1.066667rem /* 40/37.5 */
                                margin .266667rem 0
                                text-align center
                                width 100%
                                font-size .373333rem /* 14/37.5 */
                                color var(--color-light)
        footer
            bc()
            .comments_container
                position relative
                left 0
                bottom 0
                height 1.386667rem /* 52/37.5 */
                width 100vw
                display flex
                align-items center
                border-top .026667rem solid rgba(0,0,0,0.1)
                justify-content space-around
                .btn_primary
                    width 1.226667rem /* 46/37.5 */
                    height 1.386667rem /* 52/37.5 */
                    display flex
                    flex-direction column
                    justify-content center
                    text-align center
                    align-items center
                    i
                        font-size .64rem /* 24/37.5 */
                    span 
                        font-size .266667rem /* 10/37.5 */
                        font-weight 700
                        margin-top .053333rem /* 2/37.5 */
                    img
                        width 1.066667rem /* 40/37.5 */
                        height 1.066667rem /* 40/37.5 */
                        background-size cover
                        border-radius 50%
                .btn_updown_mask
                    width 4.48rem /* 168/37.5 */
                    height 1.386667rem /* 52/37.5 */
                    display flex
                    align-items center
                    justify-content center
                    .btn_updown
                        width 3.84rem /* 144/37.5 */
                        height .96rem /* 36/37.5 */
                        background-color #e9f5fe
                        border-radius .48rem /* 18/37.5 */
                        display flex
                        align-items center
                        span
                            display flex
                            align-items center
                            height .96rem /* 36/37.5 */
                            line-height .96rem /* 36/37.5 */
                            font-size .266667rem /* 10/37.5 */
                            font-weight 700
                            color blue
                            i
                                font-size .8rem /* 30/37.5 */
                            &:first-child
                                flex 2
                                margin-left .32rem /* 12/37.5 */
                            &:nth-child(2)
                                flex 1
                                text-align center
                                position relative
                                display flex
                                justify-content center
                                &:before
                                    content ''
                                    position absolute
                                    height .48rem /* 18/37.5 */
                                    left 0
                                    width .053333rem /* 2/37.5 */
                                    background-color #e1edf4
        .more_content
            bc()
            height 100vh
            width 100vw
            display flex
            align-items center
            justify-content center
            font-size .426667rem /* 16/37.5 */
            font-weight normal
            color var(--color-light)
            margin-top .266667rem /* 10/37.5 */
.backtotop
    position fixed
    top 50%
    right .426667rem /* 16/37.5 */
    width 40px
    height 40px
    border-radius 50%
    box-shadow 0 0 2px rgba(0,0,0,0.6)
    bc()
    display flex
    align-items center
    justify-content center
    i
        font-size .586667rem /* 22/37.5 */

</style>