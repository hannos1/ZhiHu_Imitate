<template>
    <div>
        <header>
            
        </header>
        <main>
            writing
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
    current:'/writing'
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';



</style>