import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'

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
        children:[
            {
                path:'/home/tags',
                name:'tags',
                component:() => import('../views/second/Index.vue'),
                meta:{
                    index:1
                }
            },{
                path:'/home/live',
                name:'live',
                component:() => import('../views/second/Live.vue'),
                meta:{
                    index:2
                }
            },{
                path:'/home/laws',
                name:'laws',
                component:() => import('../views/second/Laws.vue'),
                meta:{
                    index:3
                }
            },{
                path:'/home/delicacies',
                name:'delicacies',
                component:() => import('../views/second/Delicacies.vue'),
                meta:{
                    index:4
                }
            },{
                path:'/home/travel',
                name:'travel',
                component:() => import('../views/second/Travel.vue'),
                meta:{
                    index:5
                }
            }
        ]
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
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})


export default router