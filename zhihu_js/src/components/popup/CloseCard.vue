<template>
    <div class="close_container">
            <div class="close_title">
                <div class="close_title__main">对{{ state.title }}</div>
                <div class="close_title__label">反馈：</div>
            </div>
            <div class="uninterested">
                <div class="uninterested_title">不感兴趣：</div>
                <div class="uninterested_list">
                    <div class="uninterested_list__icon">
                        <img src="../../assets/img/心碎.png" alt="">
                    </div>
                    <div class="uninterested_list__label" @click="close('recommend')">减少相似内容推荐</div>
                </div>
                <div class="uninterested_list">
                    <div class="uninterested_list__icon">
                        <img src="../../assets/img/减少用户.png" alt="">
                    </div>
                    <div class="uninterested_list__label">不看该作者: {{ state.authorName }}</div>
                </div>
            </div>
            <div class="uninterested">
                <div class="uninterested_title">内容反馈：</div>
                <div class="uninterested_list">
                    <div class="uninterested_list__icon">
                        <img src="../../assets/img/不喜欢.png" alt="">
                    </div>
                    <div class="uninterested_list__label">内容质量差</div>
                </div>
                <div class="uninterested_list">
                    <div class="uninterested_list__icon">
                        <img src="../../assets/img/举报.png" alt="">
                    </div>
                    <div class="uninterested_list__label">举报</div>
                </div>
            </div>
        </div>
</template>

<script setup>
import { reactive,onMounted,inject } from 'vue';
const props = defineProps({
    title:'',
    authorName:'',
    id:0
})

const state = reactive({
    title:'',
    authorName:'',
    id:0
})

const { removeById } = inject('closeCard')

const emits = defineEmits(['windowcontrol'])

function close(commond){
    emits('windowcontrol',false)
    removeById(state.id)
}

onMounted(() => {
    state.title = props.title
    state.authorName = props.authorName
    state.id = props.id
})

</script>

<style lang="stylus" scoped>
@import '../../assets/styl/mixin.styl';
.close_container
        width 100vw
        height 320px
        .close_title
            margin-top .533333rem /* 20/37.5 */
            width calc(100vw - 1.6rem /* 60/37.5 */)
            height .533333rem /* 20/37.5 */
            margin-left .533333rem /* 20/37.5 */
            .close_title__main
                max-width calc(100vw - 2.666667rem /* 100/37.5 */)
                height .533333rem /* 20/37.5 */
                display inline-block
                overflow hidden
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
                white-space: nowrap;
            .close_title__label
                display inline-block
                overflow hidden
                height .533333rem /* 20/37.5 */
        .uninterested
            height 124px
            width 100vw
            margin-top .533333rem /* 20/37.5 */
            .uninterested_title
                margin-left .533333rem /* 20/37.5 */
                color var(--color-light)
            .uninterested_list
                margin-left .533333rem /* 20/37.5 */
                height 1.44rem /* 54/37.5 */
                display flex
                align-items center
                border-bottom 1px solid rgba(0,0,0,0.3)
                margin-right .533333rem /* 20/37.5 */
                .uninterested_list__icon
                    width .64rem /* 24/37.5 */
                    height .64rem /* 24/37.5 */
                    img
                        width 100%
                        height 100%
                .uninterested_list__label
                    margin-left .373333rem /* 14/37.5 */
                    font-size .426667rem /* 16/37.5 */
                    bc()

</style>