<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:20px">
            <!-- 人员介绍部分 -->
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" />
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>
                        上次登录的时间：
                        <span>
                            2022-7-7
                        </span>
                    </p>
                    <p>
                        上次登录的地点：
                        <span>
                            湖南
                        </span>
                    </p>
                </div>
            </el-card>
            <!-- 表格 -->
            <el-card style="margin-top:20px;height:460px">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in  tableLabel" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <!-- 组件订单展示 -->
        <el-col style="margin-top:20px" :span="16">
            <!-- 组件订单展示 -->
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{ dispaly: 'flex', padding: 0 }">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="num" style="">￥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <!-- 折线图 -->
            <el-card style="height:280px">
                <div style="height:260px" ref="echarts"></div>
            </el-card>
            <!-- 饼图和柱状图-->
            <div class="graph">
                <!-- 柱状图 -->
                <el-card style="height:260px">
                    <div style="height:240px" ref="userEcharts"></div>
                </el-card>
                <!-- 饼图 -->
                <el-card style="height:260px">
                    <div style="height:240px" ref="videoEcharts"></div>
                </el-card>
            </div>
        </el-col>

    </el-row>
</template>

<script>
// import {getMenu} from '../../../api/data.js'
import { getData } from '../../../api/data.js'
//引入echarts
import * as echarts from 'echarts'

export default {
    name: 'HomeIndex',
    data() {
        return {
            userImg: require('../../assets/images/user.png'),
            tableData: [],
            tableLabel: {
                name: '课程',
                todayBuy: '当日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],


        }
    },
    mounted() {
        getData().then(res => {
            // 解构赋值
            const { code, data } = res.data
            if (code === 20000) {
                this.tableData = data.tableData

                const order = data.orderData
                const xData = order.date
                const keyArray = Object.keys(order.data[0])
                const series_ = []
                keyArray.forEach(key => {
                    series_.push({
                        name: key,
                        data: order.data.map(item => item[key]),
                        type: 'line'
                    })
                })

                // 指定图表的配置项和数据
                const option = {
                    // title: {
                    //     text: 'ECharts 入门示例'
                    // },
                    tooltip: {},
                    legend: {
                        data: keyArray
                    },
                    xAxis: {
                        data: xData,
                    },
                    yAxis: [
                        {
                            name: '销售量',
                            max: 8500,
                            position: 'left',
                            interval: 1500
                        },
                    ],
                    series: series_
                };

                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(this.$refs.echarts);
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);


                // 用户图
                const userOption = {
                    legend: {
                        // 图例文字颜色
                        textStyle: {
                            color: "#333",
                        },
                    },
                    grid: {
                        left: "20%",
                    },
                    // 提示框
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        type: "category", // 类目轴
                        data: data.userData.map(item => item.date),
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                        axisLabel: {
                            interval: 0,
                            color: "#333",
                        },
                    },
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    color: "#17b3a3",
                                },
                            },
                        },
                    ],
                    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                    series: [
                        {
                            name: '新增用户',
                            data: data.userData.map(item => item.new),
                            type: 'bar'
                        },
                        {
                            name: '活跃用户',
                            data: data.userData.map(item => item.active),
                            type: 'bar'
                        },

                    ],
                }

                // 基于准备好的dom，初始化echarts实例
                const userChart = echarts.init(this.$refs.userEcharts);
                // 使用刚指定的配置项和数据显示图表。
                userChart.setOption(userOption);

                //饼状图
                const videoOption = {
                    tooltip: {
                        trigger: "item",
                    },
                    color: [
                        "#0f78f4",
                        "#dd536b",
                        "#9462e5",
                        "#a6a6a6",
                        "#e1bb22",
                        "#39c362",
                        "#3ed1cf",
                    ],
                    series:[
                        {
                            data:data.videoData,
                            type:'pie'
                        }
                    ],
                };
                // 基于准备好的dom，初始化echarts实例
                const pieChart = echarts.init(this.$refs.videoEcharts);
                // 使用刚指定的配置项和数据显示图表。
                pieChart.setOption(videoOption);
            }

            console.log(res)
            console.log(res.data.data.userData[0])
        })
    }
}
</script>

<style lang="less" scoped>
.home {
    .user {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }

        &info {
            .name {
                font-size: 32px;
                margin-bottom: 10px;
            }

            .access {
                color: #999999;
            }
        }
    }

    .login-info {
        p {
            line-height: 28px;
            font-size: 14px;
            color: #999999;

            span {
                color: #666666;
                margin-left: 60px;
            }
        }
    }

    .num {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 20px;
        }

        .icon {
            font-size: 30px;
            width: 80px;
            height: 80px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }

        .detail {
            // margin-top:-55px;
            display: flex;
            // flex-direction: column;
            justify-content: center;
            height: 80px;
            float: right;
            width: 182px;

            .num {
                font-size: 30px;
                margin-left: 35px;
                margin-bottom: 10px;

            }

            .txt {
                font-size: 14px;
                color: #999999;
            }
        }
    }

    .graph {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .el-card {
            width: 48%;
        }
    }
}
</style>