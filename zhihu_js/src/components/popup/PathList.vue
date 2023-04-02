<template>
    <div class="pathlist_container">
        <div class="pathlist_title">全部板块</div>
        <div class="closeable" @click="complatedChange">x</div>
        <div class="pathlist_my">
            <div class="pathlist_pathtitle">我的板块</div>
            <div class="complated" @click="changeModel">{{ state.modellabel }}</div>
            <div class="pathlist_des">{{ state.modeldescription }}</div>
            <div class="pathlist_box">
                <div class="pathlist_button" v-for="item in props.opened" :key="item.id">
                    <div class="button_box" @click="opentouched(item.id,'/home' + item.path)">
                        <div class="button_close" v-if="state.model === 0">
                            x
                        </div>
                        <div class="button_label" :class="{negative:state.model === 0 && (item.id === 0 || item.id === 1)}">{{ item.name }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pathlist_closed">
            <div class="pathlist_pathtitle">更多板块</div>
            <div class="pathlist_des">点击添加板块</div>
            <div class="pathlist_box">
                <div class="pathlist_button" v-for="item in props.closed" :key="item.id">
                    <div class="button_box" @click="openpropTag(item.id)">
                        <div class="button_close">
                            +
                        </div>
                        <div class="button_label">{{ item.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive,onMounted,inject,watch,onUpdated } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    opened:{
        type:Array,
        default:[]
    },
    closed:{
        type:Array,
        default:[]
    },
})

const route = useRoute()

const state = reactive({
    model:0,
    modellabel:'完成',
    modeldescription:'长按拖动排序'
})

const { changePathList,updateStore,closeTag,openTag } = inject('complatelist')
const {changeCurrent} = inject('changeCurrent')
const {moveToCenter} = inject('moveToCenter')

function closepropTag(id){
    closeTag(id)
}

function openpropTag(id){
    openTag(id)
}

function changeModel(){
    if(state.model === 0){
        state.modellabel = '编辑'
        state.model = 1
        state.modeldescription = '点击进入板块'
    }else{
        state.modellabel = '完成'
        state.model = 0
        state.modeldescription = '长按拖动排序'
    }
}

function opentouched(id,path){
    if(state.model === 0){
        if(id !== 0 && id !== 1){
            closepropTag(id)
        }
    }else{
        changePath(path,id)
    }
}

async function complatedChange(){ // 把当前变化推送到store中去 并且关闭弹层
    let currentPath = route.path  // 修改后可能会改变排序需要重新movetocenter
    let id = -1
    for(let i = 0;i < props.opened.length;i++){
        if('/home' + props.opened[i].path === currentPath){
            id = props.opened[i].id
            break
        }
    }
    if(id === -1 ){ // 如果没找到,就跳到首页
        changeCurrent('/home/tags')
        id = 0
    }
    moveToCenter(id)
    await updateStore(props.opened,props.closed)
    changePathList(false)
}

async function changePath(path,id){  // 点击按钮跳转到响应模块 点击也应该更新推送数据
    changeCurrent(path)
    moveToCenter(id)
    await updateStore(props.opened,props.closed)  // 每次都请求可能会导致卡顿 有优化空间
    changePathList(false)
}

onMounted(async () => {

})

</script>

<style lang="stylus" scoped>
@import '../../assets/styl/mixin.styl';
.pathlist_container
    width 100vw
    margin-top .533333rem /* 20/37.5 */
    position relative
    .pathlist_title
        margin-left .48rem /* 18/37.5 */
        font-size .426667rem /* 16/37.5 */
        font-weight 700
        text-align left
        height .586667rem /* 22/37.5 */
        line-height .586667rem /* 22/37.5 */
    .closeable
        position absolute
        width .64rem /* 24/37.5 */
        height .64rem /* 24/37.5 */
        background-color #f6f6f6
        text-align center
        font-size .48rem /* 18/37.5 */
        border-radius 50%
        line-height .64rem /* 24/37.5 */
        color var(--color-light)
        top 0
        right .533333rem /* 20/37.5 */
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
                        &.negative
                            color var(--color-light)
    .pathlist_closed
        .pathlist_box
            .pathlist_button
                .button_box
                    background-color white
                    border 1px dashed black

                    



</style>