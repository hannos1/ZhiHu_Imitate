<template>
    <div class="bar_container">
        <div class="bar_item" 
        :class="{active:state.pagePath === '/home'}"
        @click="pageTo('/home')"
        >
            <img src="../assets/img/首页.png" alt="" ref="home">
            <div class="bar_label">首页</div>
        </div>
        <div class="bar_item"
        :class="{active:state.pagePath === '/concern'}"
        @click="pageTo('/concern')"
        >
            <!-- <i class="el-icon-view"></i> -->
            <img src="../assets/img/我的关注.png" alt="" ref="concern">
            <div class="bar_label">关注</div>
        </div>
        <div class="bar_item circle"
        :class="{active:state.pagePath === '/writing'}"
        @click="pageTo('/writing')"
        >
            <!-- <i class="el-icon-circle-plus-outline"></i> -->
            <img src="../assets/img/写作.png" alt="" ref="writing">
        </div>
        <div class="bar_item"
        :class="{active:state.pagePath === '/member'}"
        @click="pageTo('/member')"
        >
            <!-- <i class="el-icon-star-off"></i> -->
            <img src="../assets/img/会员.png" alt="" ref="member">
            <div class="bar_label">会员</div>
        </div>
        <div class="bar_item"
        :class="{active:state.pagePath === '/mine'}"
        @click="pageTo('/mine')"
        >
            <!-- <i class="el-icon-user"></i> -->
            <img src="../assets/img/登录.png" alt="" ref="mine">
            <div class="bar_label">我的</div>
        </div>  
    </div>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue';
import {useRouter} from 'vue-router';

const props = defineProps({
    current:{
        type:String,
        default:''
    },
    carry:{
        type:Function,
        default:() => {
        return false
    }}
})

let writing = ref(null)
let mine = ref(null)
let concern = ref(null)
let home = ref(null)
let member = ref(null)

const state = reactive({
    pagePath:'',
    imgPath:'src/assets/img/'
})

const router = useRouter()

const pageTo = (e) => {
    let temp = props.carry()
    state.pagePath = e
    router.push(e)
}

onMounted(() => {
    state.pagePath = props.current
    if(state.pagePath === '/writing'){
        writing.value.src = state.imgPath + '写作check.png'
    }
    if(state.pagePath === '/home'){
        home.value.src = state.imgPath + '首页check.png'
    }
    if(state.pagePath === '/concern'){
        concern.value.src = state.imgPath + '我的关注check.png'
    }
    if(state.pagePath === '/member'){
        member.value.src = state.imgPath + '会员check.png'
    }
    if(state.pagePath === '/mine'){
        mine.value.src = state.imgPath + '登录check.png'
    }
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
        img
            background-position -50%
            background-size cover
            width .64rem /* 24/37.5 */
            height .64rem /* 24/37.5 */
            margin-top .213333rem /* 8/37.5 */
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
            img
                pc()
        &.circle
            wh(1.44rem /* 54/37.5 */,auto)
            position relative
            img
                width 45px
                height 1.2rem /* 45/37.5 */
                position relative
                top -.266667rem /* 10/37.5 */
                z-index 999
                border-radius 50%
                box-shadow 0 0 0 0
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