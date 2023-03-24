<template>
    <div>
        <header>

        </header>
        <main>

        </main>
        <footer>
            <MyTabBar :current="state.current" />
        </footer>
    </div>
</template>

<script setup>
import MyTabBar from '../components/MyTabBar.vue';
import { reactive,onMounted } from 'vue';

const state = reactive({
  current:'/concern'
})

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';



</style>