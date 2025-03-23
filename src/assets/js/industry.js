import * as echarts from 'echarts';
setTimeout(function(){
  // line1
  var line1 = document.getElementById('line1');
  var Chart_line1 = echarts.init(line1);
  var line1_option;
  
  line1_option = {
    title: {
      text: '物料消耗图',
      left:"center",
      top:"20px",
      textStyle:{
        color:'#fff'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    // legend: {
    //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        // saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel:{
        color:"#fff"
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#fff"
        }
      },
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };
  
  line1_option && Chart_line1.setOption(line1_option);
   
  //bar1
  var bar1 = document.getElementById('bar1');
  var Chart_bar1 = echarts.init(bar1);
  var bar1_option;

  bar1_option = {
    title: {
      text: '产物图',
      left:"center",
      top:"20px",
      textStyle:{
        color:'#fff'
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    xAxis: {
      type: 'category',
      data: ['产物1', '产物2', '产物3', '产物4', '产物5', '产物6', '产物7'],
      axisLabel:{
        color:"#fff"
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#fff"
        }
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    series: [
      {
        data: [
          120,
          {
            value: 200,
            itemStyle: {
              color: '#a90000'
            }
          },
          150,
          80,
          70,
          110,
          130
        ],
        type: 'bar'
      }
    ]
  };

  bar1_option && Chart_bar1.setOption(bar1_option);
  
  //pie1
  var pie1 = document.getElementById('pie1');
  var Chart_pie1 = echarts.init(pie1);
  var pie1_option;

  pie1_option = {
    title: {
      text: '能源结构',
      left:"center",
      top:"20px",
      textStyle:{
        color:'#fff'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left'
    // },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '电耗' },
          { value: 735, name: '氮气' },
          { value: 580, name: '新鲜水' },
          { value: 484, name: '软化水' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  pie1_option && Chart_pie1.setOption(pie1_option);

},1000)