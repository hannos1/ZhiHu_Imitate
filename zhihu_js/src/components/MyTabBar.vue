<template>
    <div class="bar_container">
        <div class="bar_item" 
        :class="{active:state.pagePath === '/home'}"
        @click="pageTo('/home')"
        >
            <i class="el-icon-house"></i>
            <div class="bar_label">首页</div>
        </div>
        <div class="bar_item"
        :class="{active:state.pagePath === '/concern'}"
        @click="pageTo('/concern')"
        >
            <i class="el-icon-view"></i>
            <div class="bar_label">关注</div>
        </div>
        <div class="bar_item circle"
        :class="{active:state.pagePath === '/writing'}"
        @click="pageTo('/writing')"
        >
            <i class="el-icon-circle-plus-outline"></i>
        </div>
        <div class="bar_item"
        :class="{active:state.pagePath === '/member'}"
        @click="pageTo('/member')"
        >
            <i class="el-icon-star-off"></i>
            <div class="bar_label">会员</div>
        </div>
        <div class="bar_item"
        :class="{active:state.pagePath === '/mine'}"
        @click="pageTo('/mine')"
        >
            <i class="el-icon-user"></i>
            <div class="bar_label">我的</div>
        </div>  
    </div>
</template>

<script setup>
import { reactive,onMounted } from 'vue';
import {useRouter} from 'vue-router';

const state = reactive({
    pagePath:'',
})

const router = useRouter()

const pageTo = (e) => {
    state.pagePath = e
    router.push(e)
}

onMounted(() => {
    // console.log(router.currentRoute.value.path)
    state.pagePath = router.currentRoute.value.path
    // console.log(state.pagePath)
})


</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.bar_container
    z-index 998
    box-sizing inherit
    wh(100vw,1.44rem /* 54/37.5 */)
    font-size .426667rem /* 16/37.5 */
    display flex
    justify-content space-around
    position fixed
    bottom 0
    left 0
    bc()
    // box-shadow 0 -4px 20px rgba(105,105,105,0.1)
    box-shadow 0 -4px 20px var(--shadow-base)
    .bar_item
        box-sizing border-box
        display flex
        flex-direction column
        align-items center
        // justify-content space-around
        i
            bc()
            text-align center
            font-size .746667rem /* 28/37.5 */
            margin-top .213333rem /* 8/37.5 */
            
        .bar_label
            bc()
            font-weight 700
            font-size .266667rem /* 10/37.5 */
            margin-bottom .213333rem /* 8/37.5 */
        &.active
            .bar_label
                pc()
                font-weight 700
            i
                pc()
        &.circle
            wh(1.44rem /* 54/37.5 */,auto)
            position relative
            i
                font-size 1.226667rem /* 46/37.5 */
                position relative
                top -.266667rem /* 10/37.5 */
                z-index 999
                border-radius 50%
                box-shadow 0 0 0 0
            &:before
                content ''
                position absolute
                top -.213333rem /* 8/37.5 */
                left 0
                bottom .213333rem /* 8/37.5 */
                right 0
                bc()
                z-index 99
                border-radius 50%
</style>