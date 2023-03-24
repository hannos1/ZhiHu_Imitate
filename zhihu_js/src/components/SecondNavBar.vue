<template>
    <div class="navBar_container">
        <div class="navBar_basictag" @click="backPage">
            <!-- <i class="el-icon-arrow-left"></i> -->
            <img src="../assets/img/返回.png" alt="">
        </div>
        <div class="navBar_main">
            <slot name="navBar_main"></slot>
        </div>
        <div class="navBar_basictag" @click="getMore" v-if="props.ifShowMore">
            <!-- <i class="el-icon-more"></i> -->
            <img src="../assets/img/更多.png" alt="">
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    ifShowMore:{
        type:Boolean,
        default:true
    }
})

const router = useRouter()

function backPage(){
    router.go(-1)
}

function getMore(){
    alert('getmore还在开发中...')
}

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.navBar_container
    bc()
    height 1.28rem /* 48/37.5 */
    width 100vw
    display flex
    overflow hidden
    img
        background-position -50%
        background-size cover
        width .64rem /* 24/37.5 */
        height .64rem /* 24/37.5 */
    .navBar_basictag
        width 1.28rem /* 48/37.5 */
        height 1.28rem /* 48/37.5 */
        display flex
        justify-content center
        align-items center
        font-size .693333rem /* 26/37.5 */
        &:last-child
            font-size 22px
        
    .navBar_main
        flex 1

</style>