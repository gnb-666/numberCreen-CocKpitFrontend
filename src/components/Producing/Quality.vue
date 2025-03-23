<template>
  <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.34rem;line-height: 0.45rem;">
    <span style="font-size: 1.3vw;">多晶硅产品质量</span>
  </h2>
  <div class="container">
    <section class="left">
      <div id="Quality1Chart" :style="{ height: '2.7rem', width: '5rem' }"></div>
    </section>
    <section class="right">
      <div id="Quality2Chart" :style="{ height: '2.7rem', width: '5rem' }"></div>
    </section>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";
import axios from "@/axios";

// 使用 ref 管理响应式数据
const chart1 = ref(null);
const chart2 = ref(null);
const polyData = ref([]);
const xPolyData = ref([]);

// 生成图表1配置对象的函数
const getChart1Options = (data) => ({
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "5%",
    bottom: "20%",
    textStyle: {
      color: "#ffffff", // 字体颜色
    },
  },
  color: ["#ADEAEA", "#ED7C30"],
  series: [
    {
      label: {
        normal: {
          formatter: "{c}: ({d}%)",
          textStyle: {
            fontWeight: "normal",
            fontSize: 10,
          },
        },
      },
      name: "Access From",
      type: "pie",
      radius: "50%",
      left: "10%",
      data: data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

// 生成图表2配置对象的函数
const getChart2Options = (data) => ({
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "5%",
    bottom: "20%",
    textStyle: {
      color: "#ffffff", // 字体颜色
    },
  },
  color: ["#ADEAEA", "#ED7C30"],
  series: [
    {
      label: {
        normal: {
          formatter: "{c}: ({d}%)",
          textStyle: {
            fontWeight: "normal",
            fontSize: 10,
          },
        },
      },
      name: "Access From",
      type: "pie",
      radius: "50%",
      left: "15%",
      data: data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

// 初始化图表1
const initChart1 = () => {
  const targetElement = document.getElementById("Quality1Chart");
  if (!targetElement) return;

  chart1.value = echarts.init(targetElement);
  chart1.value.setOption(getChart1Options(polyData.value));

  // 监听窗口大小变化
  const resizeHandler = () => {
    if (chart1.value) {
      chart1.value.resize();
    }
  };
  window.addEventListener("resize", resizeHandler);

  // 在组件卸载时移除监听器并销毁图表
  onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler);
    if (chart1.value) {
      chart1.value.dispose();
    }
  });
};

// 初始化图表2
const initChart2 = () => {
  const targetElement = document.getElementById("Quality2Chart");
  if (!targetElement) return;

  chart2.value = echarts.init(targetElement);
  chart2.value.setOption(getChart2Options(xPolyData.value));

  // 监听窗口大小变化
  const resizeHandler = () => {
    if (chart2.value) {
      chart2.value.resize();
    }
  };
  window.addEventListener("resize", resizeHandler);

  // 在组件卸载时移除监听器并销毁图表
  onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler);
    if (chart2.value) {
      chart2.value.dispose();
    }
  });
};

// 获取多晶硅产品质量数据
const getsiproductionqualityList = async () => {
  try {
    const res = await axios.get("/siproductionquality");

    res.forEach((datalist) => {
      const value = parseInt(datalist["num"], 10);
      const name = datalist["name"];

      if (datalist["type"] === "多晶硅") {
        polyData.value.push({ value, name });
      } else if (datalist["type"] === "X型多晶硅") {
        xPolyData.value.push({ value, name });
      }
    });

    // 初始化图表
    initChart1();
    initChart2();
  } catch (error) {
    console.error("获取多晶硅产品质量数据失败:", error);
  }
};

// 在组件挂载时获取数据
onMounted(() => {
  getsiproductionqualityList();
});
</script>

<style scoped>
.container {
  margin-top: 0.125rem;
  display: flex;
}

.container .left {
  flex: 2;
}

.container .right {
  flex: 2;
}
</style>