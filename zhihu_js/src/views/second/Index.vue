<template>
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
            <div v-for="item in 7" :key="item">
                <PreviewCard></PreviewCard>
            </div>
        </div>
    </main>
    <footer></footer>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PreviewCard from '../../components/PreviewCard.vue';

const router = useRouter()

function gotoPage(path,pramas){
    router.push(path + '?' + pramas)
}

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
        
</style>