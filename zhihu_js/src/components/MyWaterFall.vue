<template>
    <div class="waterFall_box">
        <div class="left_box">
            <div class="waterFall_item">
                <div class="item_img"></div>
                <div class="item_previewText"></div>
                <div class="item_info">
                    <div class="item_info__avatarImg"></div>
                    <div class="item_info__userName"></div>
                    <i class=""></i>
                    <div class="item_info__likes"></div>
                </div>
            </div>
        </div>
        <div class="right_box"></div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
    waterData:{
        type:Array,
        default:[]
    }
})

const state = reactive({  // 页面状态

})

</script>

<style lang="stylus" scoped>
.waterFall_box
    overflow-y scroll


</style>