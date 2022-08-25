//引入Vue核心库
import Vue from 'vue'
//引入Vux
import Vuex from 'vuex';
//使用Vuex插件
import tab from './tab'

import user from './user'

Vue.use(Vuex) 


//创建store
const store =new Vuex.Store({
    modules:{
        tab,
        user
    }
})

//导出store
export default store