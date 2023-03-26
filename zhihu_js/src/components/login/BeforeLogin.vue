<template>
    <div class="before_container">
        <div class="login_btn">
            <div class="login_label" @click="gotopage">点我登录</div>
            <img src="../../assets/img/右箭头.png" alt="">
        </div>
        <div class="login_actions">
            <img src="../../assets/img/手机.png" alt="">
            <img src="../../assets/img/微博.png" alt="">
            <img src="../../assets/img/微信.png" alt="">
            <img src="../../assets/img/icon_QQ.png" alt="">
        </div>
    </div>
</template>

<script setup>
const emits = defineEmits(['gotoPage'])

function gotopage(){
    emits('gotoPage','/login','一些参数...')
}


</script>

<style lang="stylus" scoped>
@import '../../assets/styl/mixin.styl';
.before_container
    position relative
    overflow hidden
    height 3.68rem /* 138/37.5 */
    bc()
    .login_btn
        height .746667rem /* 28/37.5 */
        display flex
        width calc(100vw - .64rem)
        margin-left .64rem /* 24/37.5 */
        margin-top 1.066667rem /* 40/37.5 */
        z-index 999
        .login_label
            font-size .64rem /* 24/37.5 */
            height .746667rem /* 28/37.5 */
            line-height .746667rem /* 28/37.5 */
            font-weight 700 
            z-index 999
        img
            wh(.746667rem,.746667rem /* 28/37.5 */)
    .login_actions
        height 1.066667rem /* 40/37.5 */
        width 4.8rem /* 180/37.5 */
        margin-top .213333rem /* 8/37.5 */
        display flex
        justify-content space-between
        margin-left .64rem /* 24/37.5 */
        img
            width .906667rem /* 34/37.5 */
            height .906667rem /* 34/37.5 */
            z-index 999
    &:before
        content ''
        position absolute
        left .32rem /* 12/37.5 */
        right .32rem /* 12/37.5 */
        bottom 0
        top 0
        border-bottom 2px solid #f4f4f4
        z-index 1
        // background-color #f4f4f4


</style>