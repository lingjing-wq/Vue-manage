import MyHome from '@/views/MyHome.vue'
// import HomeIndex from '@/views/Home/HomeIndex.vue'
// import UserIndex from '@/views/User/UserIndex.vue'
// import MallIndex from '@/views/Mall/MallIndex.vue'
// import PageOne from '@/views/Other/PageOne.vue'
// import PageTwo from '@/views/Other/PageTwo.vue'
import LoginIndex from '@/views/Login/LoginIndex.vue'
//引入VueRouter
import VueRouter from 'vue-router'

const routes = [
    {
        path:'/',
        name:'MyHome',
        component:MyHome,
        redirecct:'/home',
        children:[ 
            // {
            //     path:'/home',
            //     name:'HomeIndex',
            //     component:HomeIndex,
            // },
            // {
            //     path:'/user',
            //     name:'UserIndex',
            //     component:UserIndex,
            // },
            // {
            //     path:'/mall',
            //     name:'MallIndex',
            //     component:MallIndex,
            // },
            // {
            //     path:'/page1',
            //     name:'PageOne',
            //     component:PageOne,
            // },
            // {
            //     path:'/page2',
            //     name:'PageTwo',
            //     component:PageTwo,
            // }
        ] 
    },
    {
        path:'/login',
        name:'LoginIndex',
        component:LoginIndex
    }
]

//创建路由器
const router =new VueRouter({
    base:'/',
    mode:'hash',
    routes,
})

//暴露路由器
export default router