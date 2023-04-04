<template>
    <div class="after_container">
        <div class="user_info">
            <div class="user_avater">
                <img :src="state.avatarImg" alt="">
            </div>
            <div class="user_tags">
                <div class="user_labelbox">
                    <div class="user_name">{{ state.username }}</div>
                    <div class="user_center">个人中心 ></div>
                </div>
                <div class="user_energy">
                    <img src="../../assets/img/爱心.png" alt="">
                    <div class="energy_label">
                        知乎盐值: {{ state.userenergy }} >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {reactive,onMounted} from 'vue'
import {getUser} from '../../service/user'

const state = reactive({
    username:'',
    userenergy:0,
    avatarImg:''
})

onMounted(async () => {
    let userData = await getUser()
    if(userData){
        state.avatarImg = userData.avatarImg
        state.userenergy = userData.energy
        state.username = userData.username
    }
})

</script>

<style lang="stylus" scoped>
@import '../../assets/styl/mixin.styl';
.after_container
    height 2.4rem /* 90/37.5 */
    display flex
    .user_info
        margin-top .613333rem /* 23/37.5 */
        height 1.76rem /* 66/37.5 */
        width 100vw
        display flex
        .user_avater
            wh(1.76rem,1.76rem)
            margin-left .64rem /* 24/37.5 */
            img
                border-radius 50%
                wh(1.76rem,1.76rem)
                background-size cover
                background-position -50% -50%
        .user_tags
            margin-left .16rem /* 6/37.5 */
            display flex
            flex-direction column
            justify-content space-around
            .user_labelbox
                display flex
                width 6.773333rem /* 254/37.5 */
                .user_name
                    height .586667rem /* 22/37.5 */
                    width 4.266667rem /* 160/37.5 */
                    font-size .533333rem /* 20/37.5 */
                    font-weight 700
                    line-height .586667rem /* 22/37.5 */
                    margin-left .053333rem /* 2/37.5 */
                .user_center
                    height .586667rem /* 22/37.5 */
                    font-weight 500
                    line-height .586667rem /* 22/37.5 */
                    font-size .373333rem /* 14/37.5 */
                    opacity 0.7
            .user_energy
                height .64rem
                background-color #edf4ff
                border-radius .32rem /* 12/37.5 */
                display flex
                align-items center
                width 3.466667rem /* 130/37.5 */
                overflow hidden
                img 
                    wh(.32rem,.32rem)
                    margin-left .16rem /* 6/37.5 */
                .energy_label
                    pc()
                    font-size .32rem /* 12/37.5 */
                    height .64rem
                    line-height .64rem
                    margin-left .16rem /* 6/37.5 */


</style>