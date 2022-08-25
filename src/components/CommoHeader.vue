<template>
    <header>
        <div class="l-content">
            <el-button @click="hanleMenu" plain icon="el-icon-menu" size="mini"></el-button>
            <!-- <h3 style="color:#fff;">首页</h3> -->
            <!-- 面包屑组件 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }" class="myColor">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span>
                    <img :src="userImg" class="user" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </header>
</template>

<script>
//引入Vux
import {mapState} from 'vuex';
export default {
    name: 'CommoHeader',
    data() {
        return {
            userImg: require('../assets/images/user.png')
        }
    },
    methods: {
        // 左侧菜单栏的折叠：通过vuex改变iscollapse的值
        hanleMenu() {
            this.$store.commit('collapseMenu');
        },
        logOut(){
            this.$store.commit('clearToken');
            this.$store.commit('clearMenu');
            //跳转
            this.$router.push("/login")
        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabsList
        })
    }
}
</script>

<style lang="less" scoped>
header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}

.l-content {
    display: flex;
    align-items: center;

    .el-button {
        margin-right: 20px;
    }
}

.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
//重写面包屑的字体颜色
.myColor /deep/ .el-breadcrumb__inner {
        color: white ;
        font-size: 16px;
}
</style>