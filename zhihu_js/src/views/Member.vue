<template>
    <div>
        <header>
            
        </header>
        <main>
            member
        </main>
        <footer>
            <MyTabBar :current="state.current" />
        </footer>
    </div>
</template>

<script setup>
import MyTabBar from '../components/MyTabBar.vue';
import { reactive } from 'vue';
const state = reactive({
    current:'/member'
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';



</style>