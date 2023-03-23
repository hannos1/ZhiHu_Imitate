<template>
    <div class="page_container">
        <div class="page_swiper" ref="swiper">
            <div class="page_content">
                <header>
                    <div class="icon_logo">
                        <img src="../../assets/img/test.png" alt="">
                    </div>
                    <div class="icon_search">
                        <div class="search_box">
                            <div class="placeHolder" @click="gotoPage('/search','placeholder')">一些热词jfksfjksdfsdfsdfsdfsdfsdfsdfsdfdjfkdjfkdfj</div>
                            <div class="button_label" @click="gotoPage('/searchDetails','一些热词')">搜索</div>
                        </div>
                    </div>
                </header>
                <main>
                    <div class="article_list">
                        <div class="article_item" v-for="item in 5" @click="gotoPage('/details/1','一些热词')">
                            <div class="article_title">大学没怎么学时刻提防就是立刻搭街坊昆仑山搭街坊立刻东非南非你你都开始ljfksdjfki</div>
                            <div class="article_info">
                                <div class="article_avatarimg"></div>
                                <div class="article_username">风地带覅</div>
                                <div class="article_usertag">附近的疾风地带覅</div>
                            </div>
                            <div class="article_main">我是一个角度上看附件上都是非法喂奶粉上帝就发我i恩覅owni愤怒的神佛i内非农哦i你身份为你服务念佛我发你十多年佛恩覅own发i粉丝佛i你问富翁偶分呢飞鸟我i发</div>
                            <div class="article_footer">
                                <div class="article_comments">0000 赞同 · 0000 收藏</div>
                                <div class="article_close" @click="closeArticle">x</div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer></footer>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted,ref,reactive } from 'vue';
import BScroll from '@better-scroll/core';
import { useRouter } from 'vue-router';
import MySkeleton from '../../components/MySkeleton.vue';

const router = useRouter()

const swiper = ref(null) 
let bs = null

function gotoPage(path,pramas){
    router.push(path + '?' + pramas)
}

function closeArticle(event){
    event.stopPropagation() // 阻止事件冒泡
    alert('是否关闭？')
}

onMounted(() => {
    bs = new BScroll(swiper.value,{
        scrollX:false,
        scrollY:true,
        observeDOM:true,
        click:true,
        bounceTime:500,
        stopPropagation:true // 阻止事件冒泡 只会阻止touchstart事件的冒泡
    })
})

</script>

<style lang="stylus" scoped>
@import '../../assets/styl/mixin.styl';
.page_container
    width 100%
    height 100%
    background-color #f6f5fb
    overflow hidden
    .page_swiper
        width 100%
        height 14.133333rem /* 530/37.5 */
        overflow hidden
        .page_content
            width 100%
            height auto
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
                    .article_item
                        bc()
                        width calc(100vw - .64rem)
                        height auto
                        padding .426667rem .32rem 0 .32rem
                        margin-bottom .213333rem
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
</style>