<template>
    <div class="waterFall_box">
        <div class="left_box" :style="`height:${state.maxheight/state.windowWidth}rem`">
            <lazy-component>
            <div class="waterFall_item" v-for="item in state.leftList" :key="item.id" @click="goto(item.path,item.pramas)">
                <div class="item_img"
                :style="`height:${item.height/state.windowWidth}rem;background-image:url('${item.pic}');`"></div>
                <div class="item_previewText">{{ item.title }}</div>
                <div class="item_info">
                    <div class="item_info__avatarImg" :style="`background-image:url('${item.avatarImg}');`"></div>
                    <div class="item_info__userName">{{ item.authorName }}</div>
                    <div class="item_likes__box">
                        <div class="item_info__likes">{{ item.likes }}</div>
                        <i class="el-icon-magic-stick"></i>
                    </div>
                </div>
                <div class="item_tag">
                    <div class="item_tag_box" v-for="itemtag in item.tags" :key="itemtag.id">
                        <div class="item_tag__item" v-if="itemtag !== ''">{{ itemtag.tag }}</div>
                    </div>
                </div>
            </div>
            </lazy-component>
        </div>
        <div class="right_box" :style="`height:${state.maxheight/state.windowWidth}rem`">
            <lazy-component>
            <div class="waterFall_item" v-for="item in state.rightList" :key="item.id" @click="goto(item.path,item.pramas)">
                <div class="item_img" 
                :style="`height:${item.height/state.windowWidth}rem;background-image:url('${item.pic}');`"></div>
                <div class="item_previewText">{{ item.title }}</div>
                <div class="item_info">
                    <div class="item_info__avatarImg" :style="`background-image:url('${item.avatarImg}');`"></div>
                    <div class="item_info__userName">{{ item.authorName }}</div>
                    <div class="item_likes__box">
                        <div class="item_info__likes">{{ item.likes }}</div>
                        <van-icon name="like-o" />
                    </div>
                </div>
                <div class="item_tag">
                    <div class="item_tag_box" v-for="itemtag in item.tags" :key="itemtag.id">
                        <div class="item_tag__item" v-if="itemtag !== ''">{{ itemtag.tag }}</div>
                    </div>
                </div>
            </div>
            </lazy-component>
        </div>
    </div>
</template>

<script setup>
import { onUpdated, reactive } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    waterData:{
        type:Array,
        default:[]
    }
})

const router = useRouter()

const state = reactive({  // 页面状态
    leftList:[],
    rightList:[],
    heights:[0,0], // 两列的高度
    maxheight:0,
    allList:[],
    windowWidth:0
})

const getMinHeight = (heights) => {
  let minHeight = Math.min(...heights)
  return heights.indexOf(minHeight)
}

function goto(path,pramas){
    router.push(path + '?' + pramas)
}

onUpdated(() => {
  state.windowWidth = document.documentElement.clientWidth / 10
  if(props.waterData !== state.allList){
        const data = props.waterData;
        let leftTempGoods = [],
        rightTempGoods = [],
        heights = [0,0];  // 一次计算完

        for(let i = 0;i < data.length; i++){
            let minHeightIndex = getMinHeight(heights)
            let titleHeight = data[i].title.length > 9 ? 44 : 22
            let avatarHeight = 32
            let tagHeight = data[i].tags[0] !== ''? 0 : 21
            if(minHeightIndex == 0){
            leftTempGoods.push(data[i])
            }else{
            rightTempGoods.push(data[i])
            }
            heights[minHeightIndex] += data[i].height + titleHeight + avatarHeight + tagHeight + 50
        }
        state.heights = heights
        state.maxheight = Math.max(...state.heights) + 300  // 增加点误差容错
        state.allList = props.waterData
        setTimeout(() => {
            state.leftList = leftTempGoods;
            state.rightList = rightTempGoods;
        },0.5);
    }
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.waterFall_box
    overflow-y scroll
    display flex
    width calc(100vw - .64rem /* 24/37.5 */)
    height calc(100vh - 2.72rem)
    // justify-content space-evenly  // 兼容性不好
    justify-content space-between
    margin-left .32rem /* 12/37.5 */
    .left_box,.right_box
        display flex
        width 4.533333rem /* 170/37.5 */
        // height 5000px
        flex-direction column
        .waterFall_item
            bc()
            width 4.533333rem /* 170/37.5 */
            margin-bottom .426667rem /* 16/37.5 */
            border-radius .266667rem /* 10/37.5 */
            overflow hidden
            .item_img
                width 4.533333rem /* 170/37.5 */
                // height 5.333333rem /* 200/37.5 */
                // background-image url('../assets/img/test.png')
                margin-bottom .266667rem /* 10/37.5 */
            .item_previewText
                line-height .586667rem /* 22/37.5 */
                width 4rem /* 150/37.5 */
                margin 0 .266667rem .266667rem .266667rem
                font-size .426667rem /* 16/37.5 */
                text-align left
                max-height 1.173333rem /* 44/37.5 */
                min-height .586667rem /* 22/37.5 */
                white-space pre-wrap
                overflow hidden
                position relative
                word-break break-all
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical
                &:after
                    content ''
                    position absolute
                    right 0
                    top .586667rem /* 22/37.5 */
                    left 2.933333rem /* 110/37.5 */
                    bottom 0
                    // background-image linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 30%,rgba(255,255,255,0.7) 50%,rgba(255,255,255,0.9) 70%,rgba(255,255,255,1) 100%)
            .item_info,.item_tag
                width 4rem /* 150/37.5 */
                height .586667rem /* 22/37.5 */
                margin 0 .266667rem .2666667rem .266667rem
                display flex
                overflow hidden
                color var(--color-light)
                .item_info__avatarImg
                    width .533333rem /* 20/37.5 */
                    height .533333rem /* 20/37.5 */
                    margin-top .026667rem /* 1/37.5 */
                    border-radius 50%
                    background-color var(--color-base)
                    // background-color black
                .item_info__userName
                    width 2.133333rem /* 80/37.5 */
                    margin-left .133333rem /* 5/37.5 */
                    height .586667rem /* 22/37.5 */
                    font-size .373333rem /* 14/37.5 */
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                .item_likes__box
                    flex 1
                    position relative
                    overflow hidden
                    .item_info__likes,i
                        float right
                        height .586667rem /* 22/37.5 */
                        text-align center
                        line-height .586667rem /* 22/37.5 */
                    i
                        margin-right .16rem /* 6/37.5 */
            .item_tag
                justify-content left 
                display flex
                height auto
                .item_tag_box
                    .item_tag__item
                        border 1px solid var(--color-light)
                        // color rgba(0,0,0,0.2)
                        color var(--color-light)
                        line-height .533333rem /* 20/37.5 */
                        padding 0 .133333rem 0 .133333rem /* 5/37.5 */
                        border-radius .16rem /* 6/37.5 */
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                    &:last-child
                        .item_tag__item
                            margin-left .16rem /* 6/37.5 */
    &::-webkit-scrollbar
        display none             





</style>