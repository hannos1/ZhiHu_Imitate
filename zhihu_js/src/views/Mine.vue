<template>
    <div class="mine_container">
        <header>
            <SimpleHeader>
                <template #left>
                    <div class="img_box__left">
                        <img src="../assets/img/扫码.png" alt="">
                    </div>
                </template>
                <template #main>
                    <div class="searchFrame" @click="gotoPage('/search')">
                        <img src="../assets/img/搜索.png" alt="">
                        <div class="placeHolder">搜索知乎内容</div>
                    </div>
                </template>
                <template #right>
                    <div class="img_box__right">
                        <img :src="`src/assets/img/${state.themeimg}.png`" alt="" @click="changeThemebtn">
                        <img src="../assets/img/设置.png" @click="exit" alt="">
                        <img src="../assets/img/提醒.png" alt="">
                    </div>
                </template>
            </SimpleHeader>
        </header>
        <main>
            <div class="page_container">
                <div class="page_swiper" ref="pageSwiper">
                    <div class="page_content">
                        <div class="login_section">
                            <BeforeLogin @gotoPage="gotoPage" v-if="!state.isLogin">
                            </BeforeLogin>
                            <AfterLogin v-else>
                            </AfterLogin>
                        </div>
                        <div class="user_info">
                            <div class="info_item" v-if="state.isLogin">
                                <div class="item_num" style="font-size:12px;font-weight:500;color:#64aafb;">未开通</div>
                                <div class="item_title">创作</div>
                            </div>
                            <div class="info_item">
                                <div class="item_num">{{ state.concern }}</div>
                                <div class="item_title">关注</div>
                            </div>
                            <div class="info_item">
                                <div class="item_num">{{ state.collection }}</div>
                                <div class="item_title">收藏</div>
                            </div>
                            <div class="info_item">
                                <div class="item_num">{{ state.recent }}</div>
                                <div class="item_title">最近浏览</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
        <footer>
            <MyTabBar :current="state.current" />
        </footer>
    </div>
</template>

<script setup>
import MyTabBar from '../components/MyTabBar.vue';
import { reactive,ref,onMounted,watch } from 'vue';
import SimpleHeader from '../components/SimpleHeader.vue';
import { useRouter } from 'vue-router';
import BScroll from '@better-scroll/core';
import BeforeLogin from '../components/login/BeforeLogin.vue'
import AfterLogin from '../components/login/AfterLogin.vue'
import {useUserStore} from '../store/user'
import {getUser} from '../service/user'
import {lighttheme,darktheme} from '../service/theme'
import {changetheme} from '../assets/js/theme'
import {useThemeStore} from '../store/theme'

let pageSwiper = ref(null)
let pageBs = null
const userStore = useUserStore()

const router = useRouter()

const themeStore = useThemeStore()

const state = reactive({
    current:'/mine',
    isLogin:false,
    userinfo:{},
    concern:0,
    collection:0,
    recent:0,
    themeimg:'dark',
    theme:lighttheme
})

function gotoPage(path,pramas){
    router.push(path + '?' + pramas)
}

function exit(){
    userStore.exitLogin()
    state.isLogin = userStore.islogin
    state.concern = 0
    state.collection = 0
    state.recent = 0
}

function changeThemebtn(){
    if(state.themeimg === 'dark'){ // 白天模式
        state.themeimg = 'light'
        state.theme = darktheme
        themeStore.updateTheme('light')
        changetheme(state.theme)
    }else{// 夜间模式
        state.themeimg = 'dark'
        themeStore.updateTheme('dark')
        state.theme = lighttheme
        changetheme(state.theme)
    }
}

onMounted(async () => {
    themeStore.getTheme()
    state.themeimg = themeStore.theme
    pageBs = new BScroll(pageSwiper.value,{
        probeType:3,
        scrollX:false,
        scrollY:true,
        observeDOM:true,
        click:true,
        bounce:false,
    })
    userStore.updateLogin() // 更新状态
    state.isLogin = userStore.islogin
    if(state.isLogin){
        let userData = await getUser()

        if(userData){
            state.concern = userData.concern
            state.collection = userData.collection
            state.recent = userData.recent
        }
    }
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.mine_container
    bc()
    position fixed
    header
        padding .266667rem 0
        img
            wh(.693333rem,.693333rem)
        .img_box__left
            wh(1.386667rem,.96rem)
        .img_box__right
            wh(3.2rem,.96rem)
        .img_box__left,.img_box__right
            display flex
            justify-content space-around
            align-items center
        .searchFrame
            wh(5.44rem,.8rem)
            background-color #fbfbfb
            border-radius .48rem /* 18/37.5 */
            margin auto 0
            // opacity 0.1
            position relative
            display flex
            align-items center
            img
                position relative
                display inline-block
                left .266667rem /* 10/37.5 */
                wh(.533333rem,.533333rem)
            .placeHolder
                position relative
                left .533333rem /* 20/37.5 */
                font-size .373333rem /* 14/37.5 */
                color var(--color-Readed)
    main
        .page_container
            width 100vw
            .page_swiper
                overflow hidden
                width 100vw
                height calc(100vh - 2.933333rem)
                .page_content
                    width 100vw
                    height 800px // auto
                    .login_section
                        // wh(100vw,3.68rem /* 138/37.5 */)
                        width 100vw
                        position relative
                    .user_info
                        display flex
                        height 1.866667rem /* 70/37.5 */
                        align-items center
                        .info_item
                            height 1.866667rem /* 70/37.5 */
                            flex 1
                            display flex
                            flex-direction column
                            justify-content center
                            align-items center
                            position relative
                            &:first-child::before
                                content ''
                                position absolute
                                right 0
                                left 0
                                bottom .266667rem /* 10/37.5 */
                                top 1.013333rem /* 38/37.5 */
                                border-right 2px solid #f4f4f4
                            &:last-child::before
                                content ''
                                position absolute
                                right 0
                                left 0
                                bottom .266667rem /* 10/37.5 */
                                top 1.013333rem /* 38/37.5 */
                                border-left 2px solid #f4f4f4
                            &:nth-child(3)::before
                                content ''
                                position absolute
                                right 0
                                left 0
                                bottom .266667rem /* 10/37.5 */
                                top 1.013333rem /* 38/37.5 */
                                border-left 2px solid #f4f4f4
                            .item_num
                                font-size .426667rem /* 16/37.5 */
                                font-weight 700
                                bc()
                                height .8rem /* 30/37.5 */
                                line-height .8rem /* 30/37.5 */
                            .item_title
                                font-size .32rem /* 12/37.5 */



                            




</style>