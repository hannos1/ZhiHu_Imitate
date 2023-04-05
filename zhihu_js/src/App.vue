<script setup>
import {useRouter} from 'vue-router'
import {useUserStore} from './store/user'
const router = useRouter()
const userStore = useUserStore()

router.beforeEach((to,from,next) => {
  if(to.meta.login){
    if(!userStore.islogin){
      next(`/login?redirect_url=${to.path}`)
      return 
    }else{
      next()
    }
  }else{
    next()
  }
})


</script>

<template>
    <router-view></router-view>
</template>



<style>
@import './assets/styl/reset.styl';


</style>
