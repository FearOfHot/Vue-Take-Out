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
    name: "UserIndex",
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
          xAxis: [
            {
              type: "category",
              data: [],
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
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: "{value} 份"
              }
            },
          ],
          series: [
            {
              name: "菜品总销量排名前六",
              type: "bar",
              yAxisIndex: 0,
              data: []
            },
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
          .post('/dish/top/six/name', {}).then((result) => {
            this.options.xAxis[0].data = result.data.obj;
            this.$axios
                .post('/dish/top/six/sales', {}).then((result) => {
                    this.options.series[0].data = result.data.obj;
                    this.paintChart();
            })
        })
      },
    },
    mounted() {
      this.queryDishData();

    }
  };
</script>

<style scoped>
</style>


