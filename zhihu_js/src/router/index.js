import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import children from './second'

const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        name:'home',
        component:Home,
        redirect:'/home/tags',
        children:children
    },
    {
        path:'/concern',
        name:'concern',
        meta:{
            description:'关注'
        },
        component:() => import('../views/Concern.vue')
    },
    {
        path:'/writing',
        name:'writing',
        meta:{
            description:'写作',
            login:true
        },
        component:() => import('../views/Writing.vue')
    },
    {
        path:'/member',
        name:'member',
        meta:{
            description:'会员'
        },
        component:() => import('../views/Member.vue')
    },
    {
        path:'/mine',
        name:'mine',
        meta:{
            description:'我的'
        },
        component:() => import('../views/Mine.vue')
    },
    {
        path:'/search',
        name:'search',
        meta:{
            description:'搜索页面'
        },
        component:() => import('../views/Search.vue')
    },
    {
        path:'/searchDetails',
        name:'searchDetails',
        meta:{
            description:'搜索后的列表页面'
        },
        component:() => import('../views/SearchDetails.vue')
    },
    {
        path:'/details/1',
        name:'details_type1',
        meta:{
            description:'文章详情页，类型1'
        },
        component:() => import('../views/details/Details_Type1.vue')
    },
    {
        path:'/login',
        name:'login',
        meta:{
            description:'登录页...'
        },
        component:() => import('../views/Login.vue')
    },
    {
        path:'/concernmore',
        name:'concernmore',
        meta:{
            description:'关注列表...'
        },
        component:() => import('../views/ConcernMore.vue')
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})


export default router