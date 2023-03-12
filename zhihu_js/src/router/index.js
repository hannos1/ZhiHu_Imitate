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
        children:[
            {
                path:'/tags',
                name:'tags',
                component:() => import('../views/second/Index.vue'),
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