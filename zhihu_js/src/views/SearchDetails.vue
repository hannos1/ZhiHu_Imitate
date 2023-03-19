<template>
    <div>
        <header>
            <SecondNavBar :if-show-more="false">
                
            </SecondNavBar>
        </header>
        <main>
            这是搜索后的详情内容
        </main>
        <footer>

        </footer>
    </div>
</template>

<script setup>
import SecondNavBar from '../components/SecondNavBar.vue';

</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin.styl';

</style>