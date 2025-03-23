<template>
  <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.34rem;line-height: 0.45rem;"><span style="font-size: 1.3vw;">能耗实时监测</span></h2>
  <section class="container" style="height: 6rem; width: 10rem">
    <section class="itemLeft">
      <span class="icon">
        <h3 style="text-align: center; color: rgb(255, 255, 255);height:0.1rem;line-height: 0.5rem;">综合能耗（kgce/kg）</h3>
      </span>
      <span id="Reduce1Chart" :style="{ height: '3rem', width: '5rem' }"></span>
      <span class="icon">
        <h3 style="text-align: center; color: rgb(255, 255, 255);height:0.1rem;line-height: 0.5rem;">汽耗（kg/kg）</h3>
      </span>
      <span id="Reduce2Chart" :style="{ height: '3rem', width: '5rem' }"></span>
    </section>
    <section class="itemRight">
      <span class="icon">
        <h3 style="text-align: center; color: rgb(255, 255, 255);height:0.1rem;line-height: 0.5rem;">电耗（KWH/kg）</h3>
      </span>
      <span id="Reduce3Chart" :style="{ height: '3rem', width: '5rem' }"></span>
      <span class="icon">
        <h3 style="text-align: center; color: rgb(255, 255, 255);height:0.1rem;line-height: 0.5rem;">水耗（kg/kg）</h3>
      </span>
      <span id="Reduce4Chart" :style="{ height: '3rem', width: '5rem' }"></span>
    </section>
  </section>
</template>

<script setup>
import * as echarts from "echarts";
import "echarts-liquidfill";
import { onMounted, onUnmounted, ref } from "vue";

// 使用 ref 管理 ECharts 实例
const chart1 = ref(null);
const chart2 = ref(null);
const chart3 = ref(null);
const chart4 = ref(null);

// 图表1的配置函数
const getChart1Options = () => ({
  // 配置内容不变
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
      center: ["50%", "60%"],
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

// 图表2的配置函数
const getChart2Options = () => ({
  // 配置内容不变
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

// 图表3的配置函数
const getChart3Options = () => ({
  // 配置内容不变
  grid: {
    top: "35%",
    right: "10%",
    bottom: "25%",
    left: "20%",
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
    data: [
      "07:30",
      "08:45",
      "10:00",
      "11:15",
      "12:30",
      "13:45",
      "15:00",
      "16:15",
      "17:30",
      "18:45",
      "20:00",
    ],
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
      data: [
        200, 180, 150, 160, 170, 200, 450, 400, 300, 290, 280, 290, 300, 400,
      ],
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

// 图表4的配置函数
const getChart4Options = () => ({
  // 配置内容不变
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

// 初始化图表1的函数
const initChart1 = () => {
  const targetElement = document.getElementById("Reduce1Chart");
  if (!targetElement) return;

  chart1.value = echarts.init(targetElement);
  chart1.value.setOption(getChart1Options());

  const resizeHandler1 = () => {
    if (chart1.value) {
      chart1.value.resize();
    }
  };
  window.addEventListener("resize", resizeHandler1);

  return () => {
    window.removeEventListener("resize", resizeHandler1);
    if (chart1.value) {
      chart1.value.dispose();
    }
  };
};

// 初始化图表2的函数
const initChart2 = () => {
  const targetElement = document.getElementById("Reduce2Chart");
  if (!targetElement) return;

  chart2.value = echarts.init(targetElement);
  chart2.value.setOption(getChart2Options());

  const resizeHandler2 = () => {
    if (chart2.value) {
      chart2.value.resize();
    }
  };
  window.addEventListener("resize", resizeHandler2);

  return () => {
    window.removeEventListener("resize", resizeHandler2);
    if (chart2.value) {
      chart2.value.dispose();
    }
  };
};

// 初始化图表3的函数
const initChart3 = () => {
  const targetElement = document.getElementById("Reduce3Chart");
  if (!targetElement) return;

  chart3.value = echarts.init(targetElement);
  chart3.value.setOption(getChart3Options());

  const resizeHandler3 = () => {
    if (chart3.value) {
      chart3.value.resize();
    }
  };
  window.addEventListener("resize", resizeHandler3);

  return () => {
    window.removeEventListener("resize", resizeHandler3);
    if (chart3.value) {
      chart3.value.dispose();
    }
  };
};

// 初始化图表4的函数
const initChart4 = () => {
  const targetElement = document.getElementById("Reduce4Chart");
  if (!targetElement) return;

  chart4.value = echarts.init(targetElement);
  chart4.value.setOption(getChart4Options());

  const resizeHandler4 = () => {
    if (chart4.value) {
      chart4.value.resize();
    }
  };
  window.addEventListener("resize", resizeHandler4);

  return () => {
    window.removeEventListener("resize", resizeHandler4);
    if (chart4.value) {
      chart4.value.dispose();
    }
  };
};

let cleanupFunctions = [];

onMounted(() => {
  cleanupFunctions.push(initChart1());
  cleanupFunctions.push(initChart2());
  cleanupFunctions.push(initChart3());
  cleanupFunctions.push(initChart4());
});

onUnmounted(() => {
  cleanupFunctions.forEach((cleanup) => cleanup());
});
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