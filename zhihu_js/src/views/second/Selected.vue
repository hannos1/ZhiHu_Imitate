<template>
    <div class="selected_container" ref="myswiper">
        <div class="selected_content">
            <div class="selected_itemlist" v-for="item in 2">
                <div class="selected_header">
                    <div class="header_avaterImg">
                        <img src="../../assets/img/test.png" alt="">
                    </div>
                    <div class="header_info">
                        <div class="header_username">知乎日报</div>
                        <div class="header_time">4小时前</div>
                    </div>
                </div>
                <div class="selected_body">
                    <div class="selected_article">
                        心太软就是软弱吗心软和一个人的宜人性程度有关，宜人性翻译了一个人对其他人所持有的态度，高宜人性很少与人发生冲突，与此同时可能也会...
                    </div>
                    <div class="selected_getmore">查看详情</div>
                    <div class="selected_img">
                        <img src="../../assets/img/test.png" alt="">
                    </div>
                </div>
                <div class="selected_footer">
                    <div class="state">
                        <div class="state_item">
                            <img src="../../assets/img/爱心simple.png" alt="">
                            <div class="state_item_num">38</div>
                        </div>
                        <div class="state_item">
                            <img src="../../assets/img/五角星.png" alt="">
                            <div class="state_item_num">3</div>
                        </div>
                        <div class="state_item">
                            <img src="../../assets/img/气泡.png" alt="">
                            <div class="state_item_num">9</div>
                        </div>
                    </div>
                    <div class="popup_button">
                        <img src="../../assets/img/更多.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted,ref,onUpdated } from 'vue';
import BScroll from '@better-scroll/core';
import _ from 'lodash'

const props = defineProps({
    bsable:{
        type:Boolean,
        default:false
    }
})

const myswiper = ref(null)
let bs = null

const emits = defineEmits(['bsScroll'])


function bsScroll(num){
    if(bs.y < -num){
        // console.log('disable')
        emits('bsScroll',false)
    }else{
        emits('bsScroll',true)
        
    } 
}

onMounted(() => {
    bs = new BScroll(myswiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        observeDOM:true,
        click:true,
        bounce:false,
    })

    bs.on('scroll',bsScroll.bind(bs,0))
    bs.on('scrollEnd', () => {
        emits('bsScroll',true)
    })
    bs.disable()
})

onUpdated(() => {
    if(props.bsable){
        bs.enable()
    }else{
        bs.disable()
    }
})

</script>

<style lang="stylus" scoped>
@import '../../assets/styl/mixin.styl';
.selected_container
    width 100vw
    // background-color red
    height 14.026667rem /* 526/37.5 */
    z-index 999
    position relative
    overflow hidden
    .selected_content
        width 100vw
        .selected_itemlist
            .selected_header
                height 1.493333rem /* 56/37.5 */
                width 100vw
                display flex
                align-items center
                .header_avaterImg
                    width 1.066667rem /* 40/37.5 */
                    height 1.066667rem /* 40/37.5 */
                    margin-left .373333rem /* 14/37.5 */
                    border-radius 50%
                    overflow hidden
                .header_info
                    display flex
                    margin-left .106667rem /* 4/37.5 */
                    height 1.066667rem /* 40/37.5 */
                    flex 1
                    flex-direction column
                    flex-wrap wrap
                    justify-content space-between
                    .header_username
                        height .533333rem /* 20/37.5 */
                        line-height .533333rem /* 20/37.5 */
                        font-size .426667rem /* 16/37.5 */
                    .header_time
                        height .32rem /* 12/37.5 */
                        line-height .32rem /* 12/37.5 */
                        font-size .32rem /* 12/37.5 */
                        color var(--color-light)
            .selected_body
                width 100vw
                .selected_article
                    margin 0 .373333rem 0 .373333rem /* 14/37.5 */
                    line-height .8rem /* 30/37.5 */
                    word-break: break-all;
                    font-size .373333rem /* 14/37.5 */
                .selected_getmore
                    pc()
                    margin-left .373333rem /* 14/37.5 */
                .selected_img
                    height 5.866667rem /* 220/37.5 */
                    width calc(100vw - .746667rem /* 28/37.5 */)
                    margin .266667rem /* 10/37.5 */ .373333rem 0 .373333rem /* 14/37.5 */
                    overflow hidden
                    img
                        width 100%
                        height 100%
                        background-size cover
                        background-position -50% -50%
            .selected_footer
                height 1.066667rem /* 40/37.5 */
                margin-left .373333rem /* 14/37.5 */
                margin-right .373333rem /* 14/37.5 */
                display flex
                .state
                    flex 1
                    height 1.066667rem /* 40/37.5 */
                    display flex
                    .state_item
                        display flex
                        margin-right .533333rem /* 20/37.5 */
                        align-items center
                        height 1.066667rem /* 40/37.5 */
                        .state_item_num
                            height 1.066667rem /* 40/37.5 */
                            line-height 1.066667rem /* 40/37.5 */
                            text-align left
                            font-size .32rem /* 12/37.5 */
                            margin-left .16rem /* 6/37.5 */
                            color var(--color-light)
                        img
                            width .693333rem /* 26/37.5 */
                            height .693333rem /* 26/37.5 */
                            background-size cover
                .popup_button
                    height 1.066667rem /* 40/37.5 */
                    width .8rem /* 30/37.5 */
                    display flex
                    align-items center
                    justify-content right
                    img
                        width .693333rem /* 26/37.5 */
                        height .693333rem /* 26/37.5 */





</style>