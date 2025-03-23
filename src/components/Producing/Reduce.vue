<!-- 能耗实时监测 -->
<template>
  <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.34rem;line-height: 0.5rem;">能耗实时监测</h2>
  <section class="container" style="height: 6rem; width: 10rem">
    <section class="itemLeft">
        <span class="icon">
          <h3 style="text-align: center; color: rgb(255, 255, 255);height:0.1rem;line-height: 0.5rem;">综合能耗（kgce/kg）</h3>
        </span>
        <span
          id="Reduce1Chart"
          :style="{ height: '3rem', width: '5rem' }"
        ></span>
        <span class="icon">
          <h3 style="text-align: center; color: rgb(255, 255, 255);height:0.1rem;line-height: 0.5rem;">汽耗（kg/kg）</h3>
        </span>
      <span
        id="Reduce2Chart"
        :style="{ height: '3rem', width: '5rem' }"
      ></span>
    </section>
    <section class="itemRight">
      <span class="icon">
          <h3 style="text-align: center; color: rgb(255, 255, 255);height:0.1rem;line-height: 0.5rem;">电耗（KWH/kg）</h3>
        </span>
      <span
        id="Reduce3Chart"
        :style="{ height: '3rem', width: '5rem' }"
      ></span>
      <span class="icon">
          <h3 style="text-align: center; color: rgb(255, 255, 255);height:0.1rem;line-height: 0.5rem;">水耗（kg/kg）</h3>
        </span>
      <span
        id="Reduce4Chart"
        :style="{ height: '3rem', width: '5rem' }"
      ></span>
    </section>
  </section>
</template>

<script>
import * as echarts from "echarts";
import "echarts-liquidfill";
import { onMounted, onUnmounted } from "vue";

export default {
  setup() {
    /// 声明定义一下echart
    let echart = echarts;

    onMounted(() => {
      initChart1();
      initChart2();
      initChart3();
      initChart4();
    });

    onUnmounted(() => {
      echart.dispose;
    });

    // 基础配置一下Echarts
    function initChart1() {
      let chart = echart.init(document.getElementById("Reduce1Chart"));
      // 把配置和数据放这里
      chart.setOption({

        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "20%",
          left: "center",
          textStyle: {
            color: "white",
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            top: "20%",
            radius: ["45%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "电耗" },
              { value: 735, name: "汽耗" },
              { value: 580, name: "水耗" },
            ],
          },
          {
            name: "",
            z: -1,
            type: "gauge",
            radius: "-50%",
            center: [`50%`, `60%`],
            // 配置中间的数字
            detail: {
              // 调节数字位置
              offsetCenter: [0, 20],
              fontSize: 15,
              color: "white",
            },
            title: {
              textStyle: {
                fontWeight: "bolder",
                fontSize: 15,
                color: "white",
              },
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            // 中间的字和数字 数据
            data: [
              {
                value: 20,
                name: "总量",
              },
            ],
          },
        ],
      });
      window.onresize = function () {
        //自适应大小
        chart.resize();
      };
    }

    function initChart2() {
      let chart = echart.init(document.getElementById("Reduce2Chart"));
      // 把配置和数据放这里
      chart.setOption({
        series: [
          {
            type: "gauge",
            progress: {
              show: true,
              width: 12,
            },
            axisLine: {
              lineStyle: {
                width: 12,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 5,
              lineStyle: {
                width: 2,
                color: "#999",
              },
            },
            axisLabel: {
              distance: 15,
              color: "#999",
              fontSize: 10,
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 20,
              itemStyle: {
                borderWidth: 10,
              },
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              fontSize: 30,
              offsetCenter: [0, "50%"],
            },
            data: [
              {
                value: 70,
              },
            ],
          },
        ],
      });
      window.onresize = function () {
        //自适应大小
        chart.resize();
      };
    }

    function initChart3() {
      let chart = echart.init(document.getElementById("Reduce3Chart"));
      // 把配置和数据放这里
      chart.setOption({
        grid:{

        top:'35%',
        right:'10%',
        bottom:'25%',
        left:'20%'
    },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          // prettier-ignore
          data: ['07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00'],
          axisLine: {
            lineStyle: {
              color: "#FFF",
              width: 1,
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "white",
            },
          },
          axisPointer: {
            snap: true,
          },
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 6,
              color: "green",
            },
            {
              gt: 6,
              lte: 8,
              color: "red",
            },
            {
              gt: 8,
              lte: 14,
              color: "green",
            },
            {
              gt: 14,
              lte: 17,
              color: "red",
            },
            {
              gt: 17,
              color: "green",
            },
          ],
        },
        series: [
          {
            name: "Electricity",
            type: "line",
            smooth: true,
            // prettier-ignore
            data: [200, 180, 150, 160, 170, 200, 450, 400, 300, 290, 280, 290, 300, 400],
            markArea: {
              itemStyle: {
                color: "rgba(255, 173, 177, 0.4)",
              },
              data: [
                [
                  {
                    name: "晚高峰",
                    xAxis: "15:00",
                  },
                  {
                    xAxis: "17:30",
                  },
                ],
              ],
            },
          },
        ],
      });
      window.onresize = function () {
        //自适应大小
        chart.resize();
      };
    }

    function initChart4() {
      let chart = echart.init(document.getElementById("Reduce4Chart"));
      // 把配置和数据放这里
      chart.setOption({
        legend: {
          top: "10%",
          left: "47%",
          textStyle: {
            color: "white",
          },
        },
        series: [
          {
            type: "liquidFill",
            center: ["53%", "50%"],
            radius: "55%",
            outline: {
              show: false,
            },
            waveAnimation: false,
            animationDuration: 0,
            animationDurationUpdate: 0,
            name: "2吨",
            data: [
              0.75,
              {
                value: 0.65,
                direction: "left", //波形向左移动
                itemStyle: {
                  color: "#ADEAEA", //波形颜色
                },
              },
            ],
            color: ["#70DBDB"], //设置波形颜色
            label: {
              formatter: "{a}\n{b}",
              fontSize: 12,
              position: ["50%", "60%"],
            },
          },
        ],
      });
      window.onresize = function () {
        //自适应大小
        chart.resize();
      };
    }

    return { initChart1, initChart2, initChart3, initChart4 };
  },
};
</script>

<style scoped>
.container {
  margin-top: 0.125rem;
  display: flex;
}

.container .itemLeft {

  flex: 1;
}
.container .itemRight {
  flex: 1;
}
.container .icon {
  background: url("~@/assets/images/reduce_icon.jpg") top center no-repeat;
  background-size: 100%;
}
</style>
