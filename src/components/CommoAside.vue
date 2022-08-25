<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse">
        <h3>{{isCollapse ? '后台':'通用后台管理系统'}}</h3>
        <!-- el-menu-item 一级菜单 -->
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <el-submenu  index="1" v-for="item in hasChildren"  :key="item.path">
            <template slot="title">
                <i :class="'el-icon-'+item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <!-- 二级菜单 el-menu-item-group-->
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path" >
                <el-menu-item  @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            menu: [ 
                // {
                //     path: '/',
                //     name: 'HomeIndex',
                //     label: '首页',
                //     icon: 's-home',
                //     url: '/Home/HomeIndex'
                // },
                // { 
                //     path: '/mall',
                //     name: 'MallIndex',
                //     label: '商品管理',
                //     icon: 'video-play',
                //     url: 'Mall/MallIndex'
                // },
                // {
                //     path: '/user',
                //     name: 'UserIndex',
                //     label: '用户管理',
                //     icon: 'user',
                //     url: 'User/UserIndex'
                // },
                // {
                //     label: '其他',
                //     icon: 'location',
                //     children: [
                //         {
                //             path: '/page1',
                //             name: 'PageOne',
                //             label: '页面1',
                //             icon: 'setting',
                //             url: 'Other/PageOne'
                //         },
                //         {
                //             path: '/page2',
                //             name: 'PageTwo',
                //             label: '页面2',
                //             icon: 'setting',
                //             url: 'Other/PageTwo'
                //         }
                //     ]
                // }
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item){
            //点击跳转
            this.$router.push({
                name:item.name
            })
            //面包屑
            this.$store.commit('selectMenu',item)
            console.log(this);
        }
    },
    computed:{
        noChildren(){
            return this.asyncMenu.filter(item=>!item.children)
        },
        //获取有指向的
        hasChildren(){
            return this.asyncMenu.filter(item=>item.children)
        },
        //接收到isCollapse的值，来决定是否折叠
        isCollapse(){
            return  this.$store.state.tab.isCollapse;
        },
        asyncMenu(){
            return  this.$store.state.tab.menu;
        }
    }
}
</script>

<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-menu {
        height: 100%;
        border: none;
        h3 {
            color:#fff;
            text-align:center;
            line-height: 48px;
        }
    }
</style>