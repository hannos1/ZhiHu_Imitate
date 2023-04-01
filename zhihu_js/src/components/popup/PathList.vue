<template>
    <div class="pathlist_container">
        <div class="pathlist_title">全部板块</div>
        <div class="pathlist_my">
            <div class="pathlist_pathtitle">我的板块</div>
            <div class="complated">完成</div>
            <div class="pathlist_des">点击进入板块</div>
            <div class="pathlist_box">
                <div class="pathlist_button" v-for="item in 10">
                    <div class="button_box">
                        <div class="button_close">
                            x
                        </div>
                        <div class="button_label">电竞</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pathlist_closed">
            <div class="pathlist_pathtitle">更多板块</div>
            <div class="pathlist_des">点击添加板块</div>
            <div class="pathlist_box">
                <div class="pathlist_button" v-for="item in 10">
                    <div class="button_box">
                        <div class="button_close">
                            +
                        </div>
                        <div class="button_label">电竞</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="stylus" scoped>
@import '../../assets/styl/mixin.styl';
.pathlist_container
    width 100vw
    margin-top .533333rem /* 20/37.5 */
    .pathlist_title
        margin-left .48rem /* 18/37.5 */
        font-size .426667rem /* 16/37.5 */
        font-weight 700
        text-align left
        height .586667rem /* 22/37.5 */
        line-height .586667rem /* 22/37.5 */
    .pathlist_my,.pathlist_closed
        margin-left .48rem /* 18/37.5 */
        margin-top .693333rem /* 26/37.5 */
        margin-right .48rem /* 18/37.5 */
        position relative
        .pathlist_pathtitle
            font-size .373333rem /* 14/37.5 */
            font-weight 500
            height .533333rem /* 20/37.5 */
            line-height .533333rem /* 20/37.5 */
            display inline-block
        .pathlist_des
            display inline-block
            height .533333rem /* 20/37.5 */
            line-height .533333rem /* 20/37.5 */
            font-size .32rem /* 12/37.5 */
            margin-left .16rem /* 6/37.5 */
            color var(--color-light)
        .complated
            display inline-block
            position absolute
            right 0
            font-size .373333rem /* 14/37.5 */
            pc()
        .pathlist_box
            width 100%
            display flex
            flex-wrap wrap
            .pathlist_button
                width 25%
                height 1.546667rem /* 58/37.5 */
                display flex
                align-items center
                justify-content center
                .button_box
                    width 80%
                    height 1.226667rem /* 46/37.5 */
                    border-radius .613333rem /* 23/37.5 */
                    background-color #f6f6f6
                    position relative
                    display flex
                    align-items center
                    .button_close
                        position absolute
                        top 0
                        right 0
                        width .426667rem /* 16/37.5 */
                        height .426667rem /* 16/37.5 */
                        background-color #d1d1d1
                        border-radius 50%
                        display flex
                        justify-content center
                        color white
                    .button_label
                        height .426667rem /* 16/37.5 */
                        width 100%
                        font-size .373333rem /* 14/37.5 */
                        line-height .426667rem /* 16/37.5 */
                        text-align center
    .pathlist_my
        .pathlist_box
            .pathlist_button
                &:first-child,&:nth-child(2)
                    .button_close
                        visibility hidden
                    .button_label
                        color var(--color-light)
    .pathlist_closed
        .pathlist_box
            .pathlist_button
                .button_box
                    background-color white
                    border 1px dashed black

                    



</style>