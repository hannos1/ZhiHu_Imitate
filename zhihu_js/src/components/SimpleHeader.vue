<template>
    <div class="simpleheader_container">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="main">
            <slot name="main"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';
.simpleheader_container
    bc()
    display flex
    width 100vw
    align-items center
    .left,.main,.right
        height 100%
        display flex
        align-items center
    .main
        flex 1


</style>