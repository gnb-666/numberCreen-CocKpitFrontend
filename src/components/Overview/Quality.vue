  <template>
    <!-- <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;">产品质量</h2> -->
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;"><span
      style="font-size: 1.3vw;">产品质量</span></h2>
    <div class="chart">
      <div id="Quality" :style="{ height: '3rem' }"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  import { onMounted, onUnmounted } from "vue";
  import axios from '@/axios'
  export default {
    setup() {
      /// 声明定义一下echart
      let echart = echarts;
      const sourceData = [["product", "致密料比例", "菜花料比例","珊瑚料比例"]];

    let resLength = 100
    let inputdata = {};
    for (let i = 0; i < resLength; i++) {
      inputdata[`data${i}`] = [];

    }
      onMounted(() => {
        getproductqualityList()
        initChart();
      });
  
      onUnmounted(() => {
        echart.dispose;
      });
  
      // 基础配置一下Echarts
      function initChart() {
        let chart = echart.init(document.getElementById("Quality"));
        // 把配置和数据放这里
        chart.setOption({
          legend: {
            top: "5%",
            textStyle: {
              color: "white",
            },
          },
          color:["#ADEAEA", "#ED7C30","#3D7530"],
          dataset: {
            source: sourceData,
          },
          xAxis: {
            type: "category",
            axisLabel: {
              textStyle: {
                color: "white",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#FFF",
                width: 1,
              },
            },
          },
          yAxis: {
            min: 0,
            max: 50,
            interval: 10,
            splitLine: {
              lineStyle: {
                color: '#2F2F4F',
              },
            },
            axisLabel: {
              textStyle: {
                color: "white",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#FFF",
                width: 1,
              },
            },
          },
          series: [
          {
            type: "bar",
            color: {
              type: "linear",
              x: 0, //右
              y: 0, //下
              x2: 0, //左
              y2: 1, //上
              colorStops: [
                {
                  offset: 0,
                  color: "#2F4F4F", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#8FBC8F", // 100% 处的颜色
                },
              ],
            },
          },
          {
            type: "bar",
    
            color: {
              type: "linear",
              x: 0, //右
              y: 0, //下
              x2: 0, //左
              y2: 1, //上
              colorStops: [
                {
                  offset: 0,
                  color: "#11d56d", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#83bff6", // 100% 处的颜色
                },
              ],
            },
          },
          {
            type: "bar",
           
            color: {
              type: "linear",
              x: 0, //右
              y: 0, //下
              x2: 0, //左
              y2: 1, //上
              colorStops: [
                {
                  offset: 0,
                  color: "#CD7F32", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#D8D8BF", // 100% 处的颜色
                },
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
      const getproductqualityList = async () => {
      try {
        const res = await axios.get('/productquality');
        const resLength = res.length; // 获取数组的长度
        // 对res数组根据年份大小进行排序
        res.sort((a, b) => {
          // 将年份字符串转换为数字进行比较
          const yearA = parseInt(a.year);
          const yearB = parseInt(b.year);

          // 根据年份大小升序排序
          return yearA - yearB;
        });
        for (let i = 0; i < resLength; i++) {
          let datalist = res[i];
          inputdata[`data${i}`].push(datalist['name']);
          inputdata[`data${i}`].push(datalist['proportionofdensematerial']);
          inputdata[`data${i}`].push(datalist['proportionofcauliflowermate']);
          inputdata[`data${i}`].push(datalist['purificationsection']);
        }    
        // 遍历inputdata中的数据，将每个data数组添加到sourceData中
        for (let i = 0; i < resLength; i++) {
          let currentData = inputdata[Object.keys(inputdata)[i]];
          sourceData.push(currentData);
        }
        initChart(); // 确保数据填充完毕后再初始化图表
      } catch (error) {
        console.error(error);
      }
    };
      return { initChart };
    },
  };
  </script>
  
  <style scoped>
  .chart {
    margin-top: 0.125rem;
  }
  </style>
  