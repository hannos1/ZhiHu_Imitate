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
        redirect:'/home/tags', // 走弯路了，应该使用三级路由，但是踩坑必不可少吧
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
        component:() => import('../views/Concern.vue')
    },
    {
        path:'/writing',
        name:'writing',
        component:() => import('../views/Writing.vue')
    },
    {
        path:'/member',
        name:'member',
        component:() => import('../views/Member.vue')
    },
    {
        path:'/mine',
        name:'mine',
        component:() => import('../views/Mine.vue')
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})


export default router