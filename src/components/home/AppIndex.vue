<template>

  <div>
    <div>
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-discount"></i>
        <span>首页</span>
      </el-card>
    </div>

    <div
      id="main"
      style="width: 100%;height:600px;"
    ></div>
  </div>
</template>

<script>
    import * as echarts from "echarts";
    import {setInterval} from 'timers';

    export default {
        name: "AppIndex",
        data() {
            return {
                options: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "cross",
                            crossStyle: {
                                color: "#999"
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ["line", "bar"]},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['菜品总销量', '订单总金额', '平均订单金额']
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: [
                                "1月",
                                "2月",
                                "3月",
                                "4月",
                                "5月",
                                "6月",
                                "7月",
                                "8月",
                                "9月",
                                "10月",
                                "11月",
                                "12月"
                            ],
                            axisPointer: {
                                type: "shadow"
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            name: "份数",
                            min: 0,
                            max: 500,
                            interval: 50,
                            axisLabel: {
                                formatter: "{value} 份"
                            }
                        },
                        {
                            type: "value",
                            name: "价格",
                            min: 0,
                            max: 1000,
                            interval: 100,
                            axisLabel: {
                                formatter: "{value} RMB"
                            }
                        }

                    ],
                    series: [
                        {
                            name: "菜品总销量",
                            type: "bar",
                            yAxisIndex: 0,
                            data: []
                        },
                        {
                            name: "订单总金额",
                            type: "bar",
                            yAxisIndex: 1,
                            data: []
                        },
                        {
                            name: "平均订单金额",
                            type: "line",
                            yAxisIndex: 1,
                            data: []
                        }
                    ]
                },
                showType: false
            };
        },
        methods: {
            paintChart() {
                var myChart = echarts.init(document.getElementById("main"));
                myChart.setOption(this.options);

            },
            queryDishData() {
                this.$axios
                    .post('/data/dish/number', {}).then((result) => {
                    this.options.series[0].data = result.data.obj;
                    this.$axios
                        .post('/data/order/total/price', {}).then((result) => {
                        this.options.series[1].data = result.data.obj;
                        this.$axios
                            .post('/data/order/average/price', {}).then((result) => {
                            this.options.series[2].data = result.data.obj;
                            this.paintChart();

                        })
                    })

                })
            },
        },
        mounted() {
            this.queryDishData();

            // setInterval(() => {
            //     this.paintChart();
            //     this.options.series.forEach((_, index) => {
            //         for (let i = 0; i < 12; i++) {
            //             if (index < 2 && this.showType) {
            //                 _.data[i] = 200 * Math.random()
            //             } else {
            //                 _.data[i] = 2 + 30 * Math.random()
            //             }
            //             this.showType = !this.showType;
            //
            //         }
            //     })
            // }, 1000)

        }
    };
</script>

<style scoped>
</style>


