<template>
    <el-container style="height:100%">
        <el-aside width="auto">
            <CommoAside></CommoAside>
        </el-aside>
            <el-container>
                <el-header>
                    <CommoHeader></CommoHeader>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
    </el-container>
</template>

<script>

import CommoAside from '@/components/CommoAside.vue'
import CommoHeader from '@/components/CommoHeader.vue'
export default {
    name: 'MyHome',
    components: {
        CommoAside,
        CommoHeader
    },
    data() {
        return {

        }
    },

}
</script>

<style lang="less" scoped>
.el-header {
    background-color: #333;

}

.el-main {
    padding: 0;
}
</style>