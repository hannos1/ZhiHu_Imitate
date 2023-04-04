<template>
    <div class="login_container">
        <header>
            <div class="btn">
                <div class="btn_back" @click="back"></div>
                <div class="btn_help">帮助</div>
            </div>
        </header>
        <main>
            <form class="form" @submit="sendForm" method="POST">
                <div class="title">{{ state.title }}</div>
                <input type="text" class="account" name="account" 
                v-model="state.account"
                placeholder="手机号或邮箱"
                />
                <input type="password" class="password" name="password"
                v-model="state.password" 
                placeholder="密码" 
                />
                <input type="password" class="repassword" name="repassword" 
                v-model="state.repassword"
                placeholder="确认密码" 
                style="margin-bottom:32px;"
                v-if="state.type !== 'login'"
                />
                <div class="argumentBox" v-else>
                    <input type="radio" name="argument" @click="isArgument" :checked="state.isArgument" />
                    <div class="rawlabel">我已经知晓<i style="color:blue;">《xxx协议》</i></div>
                </div>
                <button class="submit" :disabled="!verify()" :class="{cative:verify()}" type="submit">{{ state.button }}</button>
            </form>
        </main>
        <footer>
            <div class="register" @click="changeType('register')" v-if="state.type === 'login'">注册</div>
            <div class="login" @click="changeType('login')" v-else>密码登录</div>
        </footer>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import {useRouter} from 'vue-router'
import {login,register} from '../service/login'
import { showToast,closeToast } from 'vant';
import md5 from 'js-md5'
import {useUserStore} from '../store/user'

const router = useRouter()
const userStore = useUserStore()

const state = reactive({
    title:'密码登录',
    type:'login',
    button:'登录',
    account:'',
    password:'',
    repassword:'',
    isArgument:false
})

function loginForm(){
    return {
        account:state.account,
        password:md5(state.password),
        isArgument:state.isArgument?1:0
    }
}

function registerForm(){
    return {
        account:state.account,
        password:md5(state.password),
        repassword:md5(state.repassword)
    }
}

function verify(){
    if(state.account === ''){
        return false
    }
    if(state.password === ''){
        return false
    }
    if(state.type === 'login'){
        if(!state.isArgument){
            return false
        }
    }else{
        if(state.repassword === ''){
            return false
        }
        if(state.password !== state.repassword){
            return false
        }
    }
    return true
}


async function sendForm(e){
    e.preventDefault()
    let data = {}
    let returnData = {}
    if(verify()){
        if(state.type === 'login'){
            data = loginForm()
            showToast({
                message:'正在登录中...',
                forbidClick:true,
            })
            returnData = await login(data)
        }else{
            data = registerForm()
            showToast({
                message:'请稍后...',
                forbidClick:true,
            })
            returnData = await register(data)
        }
    }
    closeToast()
    if(returnData.code === 200){
        await userStore.userLogin(returnData.token)
        router.go(-1)
    }else if(returnData.code === 300){
        changeType('login')
    }else{
        console.log('登录失败...')
    }
}

function changeType(e){
    state.type = e
    if(e === 'login'){
        state.title = '密码登录'
        state.button = '登录'
    }else{
        state.title = '设置密码'
        state.button = '确认'
    }
    state.account = ''
    state.password = ''
    state.repassword = ''
    state.isArgument = false
}

function back(){
    router.go(-1)
}

function isArgument(){
    state.isArgument = !state.isArgument
}


</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.login_container
    bc()
    width 100vw
    height 100vh
    position fixed
    header
        .btn
            box-sizing border-box
            width 100vw
            height .64rem /* 24/37.5 */
            margin-top .32rem /* 12/37.5 */
            padding 0 .373333rem /* 14/37.5 */
            display flex
            align-items center
            justify-content space-between
            position relative
            .btn_back
                background-image url('../assets/img/叉号.png')
                width .64rem /* 24/37.5 */
                height .64rem /* 24/37.5 */
                background-size contain
                background-position -50% -50%
            .btn_help
                font-size .32rem /* 12/37.5 */
                font-weight 500
    main
        .form
            height 11.2rem /* 420/37.5 */
            width 100vw
            display flex
            flex-direction column
            justify-content space-around
            overflow hidden
            position relative
            box-sizing border-box
            padding .853333rem /* 32/37.5 */
            .title
                height .746667rem /* 28/37.5 */
                line-height .746667rem /* 28/37.5 */
                margin 0 .106667rem /* 4/37.5 */
                font-size .64rem /* 24/37.5 */
                font-weight 700
                text-align left
            .account,.password,.repassword
                border-color transparent
                height .853333rem /* 32/37.5 */
                margin 0 .106667rem /* 4/37.5 */
                position relative
                outline none
                display inline-block
                border-bottom .026667rem solid rgba(0,0,0,0.1)
                font-size .426667rem /* 16/37.5 */
                line-height .853333rem /* 32/37.5 */
                text-align left
            .argumentBox
                display flex
                .rawlabel
                    font-size .32rem /* 12/37.5 */
                    color var(--color-Readed)
            .submit
                width 100%
                height 1.546667rem /* 58/37.5 */
                background-color #b3d4f8
                border-color transparent
                color white
                border-radius .773333rem /* 29/37.5 */
                position relative
                top -30px
                &.cative
                    background-color blue
    footer
        .register,.login
            height .586667rem /* 22/37.5 */
            line-height .586667rem /* 22/37.5 */
            color var(--color-light)
            font-size .32rem /* 12/37.5 */
            text-align center
            position relative
            top -70px
            width 1.6rem /* 60/37.5 */
            left 50%
            transform translate(-50%,0)
</style>