<template>

  <div @click="open" style="cursor: pointer;">
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;"><span
      style="font-size: 1.3vw;">实时监控</span></h2>
  </div>

  <div class="container">
    <section class="left">
      <span>厂区监控</span>
      <!-- <img src="~@/assets/images/Overview_images/Monitor1.png" alt="error" style="margin-left:0.07rem;margin-top:0.07rem"> -->
      <div class="videoContainer">
        <!-- id="videoHlsPlayer1" -->
        <video
          id="monitorTest"
          class="video-js vjs-default-skin"
          muted
        ></video>
      </div>
    </section>
    <section class="mid">
      <span>道路监控</span>
      <!-- <img src="~@/assets/images/Overview_images/Monitor2.png" alt="error" style="margin-left:0.1rem;margin-top:0.07rem"> -->
      <div class="videoContainer">
        <video id="videoMp4Player" class="video-js" muted></video>
      </div>
    </section>
    <section class="right">
      <span>系统监控</span>
      <!-- <img src="~@/assets/images/Overview_images/Monitor3.png" alt="error" style="margin-left:0.03rem;margin-top:0.07rem"> -->
      <div class="videoContainer">
        <video
          ref="videoPlayer"
          class="video-js vjs-default-skin"
          controls
          autoplay
          muted
        >
          <source src="../../assets/video/1.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  </div>

  <div>
    <el-dialog
      v-model="dialogVisible"
      title="视频监控"
      center
      custom-class="customDialogClass"
      width="82%"
      color=#373e41
      top="5%"
      draggable="true"
      :fullscreen="dialogFullScreen"
      :class="[dialogFullScreen ? 'fullscreen' : 'no_fullscreen']"
      :before-close="handleClose"
    >
    <!-- <div class="custom_dialog_menu" @click="dialogFullScreen = !dialogFullScreen">
            <el-icon class="icon"><FullScreen /></el-icon>
        </div> -->

     <!-- <el-card class="box-card" :body-style="{ padding: '0px' }">
      <div
        id="monitor"
        ref="targetRef"
        style="width: 14rem; height: 60vh; background: #373e41;"
      >
      
       <Monitor9/>
      </div>
    </el-card>  -->
    <RealTime></RealTime>
  </el-dialog>
  </div>
</template>

<script>
  import "video.js/dist/video-js.css";
  import videojs from "video.js";
  import { ElMessageBox } from "element-plus";
  import { ref, nextTick } from "vue";
  import Monitor9 from "./Monitor9.vue";
  import Monitor4 from "./Monitor4.vue";
  import RealTime from '@/components/Overview/RealTimeVedios.vue'
   
  export default {
    name: "fullSreen",
    components: {
      Monitor4,
      Monitor9,
      RealTime
  },
    data() {
      return {
        // videoUrl: "https://v7.dious.cc/20220802/qyRQEXdQ/index.m3u8", //m3u8格式视频流地址1电影
        // videoHlsUrl1: "http://kbs-dokdo.gscdn.com/dokdo_300/_definst_/dokdo_300.stream/playlist.m3u8", //m3u8格式视频流地址2摄像头
        viedoHlsUrl1:"http://220.161.87.62:8800/hls/0/index.m3u8",
        // videoUrl:"http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8"//m3u8格式视频流地址3倒计时
        videoHlsUrl2:"http://220.161.87.62:8800/hls/0/index.m3u8",//m3u8格式视频流地址4电视台
        // videoUrl:"http://www.w3school.com.cn/i/movie.mp4"//MP4格式视频流地址1熊捕食
        // videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"//MP4格式视频流地址2兔子
        // videoMp4Url1:"http://vjs.zencdn.net/v/oceans.mp4"//MP4格式视频流地址3纪录片
        // videoMp4Url1:"https://media.w3.org/2010/05/sintel/trailer.mp4",//MP4格式视频流地址4动画片
        // monitorTest: "http://10.172.0.137:8000/hls/test.m3u8",
        monitorTest:"http://220.161.87.62:8800/hls/0/index.m3u8",
        videoLocalMp4Url: "D:/视频/电影/4.mp4",
        customDialogClass: 'custom-dialog-style',
        dialogFullScreen: false,
        //测试
        // monitorTest:"http://www.w3school.com.cn/i/movie.mp4"//MP4格式视频流地址1熊捕食
      };
    },
    mounted() {
      this.$nextTick(() => {
        // this.getVideo1(this.videoHlsUrl1);
        this.getVideo1(this.monitorTest);
      });
      this.$nextTick(() => {
        this.getVideo2(this.videoHlsUrl2);
      });
      this.initializePlayer();
    },
  //   beforeUnmount() {
  //   this.destroyPlayer();
  // },
    methods: {
      getVideo1(url) {
        let options = {
          autoplay: true, // 设置自动播放
          controls: true, // 显示播放的控件
          sources: [
            //如果需要切换视频源，src需要动态设置
            {
              src: url,
              type: "application/x-mpegURL", // 告诉videojs,这是一个m3u8流
              // type: "video/mp4",// 告诉videojs,这是一个mp4流
            },
          ],
        };
        // videojs的第一个参数表示的是，文档中video的id
        // videojs("videoHlsPlayer1", options, function onPlayerReady() {});
        videojs("monitorTest", options, function onPlayerReady() {});
      },
      getVideo2(url) {
        let options = {
          autoplay: true, // 设置自动播放
          controls: true, // 显示播放的控件
          sources: [
            //如果需要切换视频源，src需要动态设置
            {
              src: url,
              type: "application/x-mpegURL", // 告诉videojs,这是一个m3u8流
              // type: "video/mp4",// 告诉videojs,这是一个mp4流
            },
          ],
        };
        // videojs的第一个参数表示的是，文档中video的id
        videojs("videoMp4Player", options, function onPlayerReady() {});
      },
      initializePlayer() {
      this.player = videojs(this.$refs.videoPlayer, {}, function () {
        // Player initialization complete
      });
    },
    destroyPlayer() {
      if (this.player) {
        this.player.dispose();
      }
    },
    openVideoGridInNewTab() {
      this.$router.push('/4-page').then(() => {
        window.location.reload(); // 跳转完成后刷新页面;
      })},
    },

    setup() {
    const targetRef = ref(null);
    const dialogVisible = ref(false);

    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    const open = () => {
      dialogVisible.value = true;
    };
    return {
      handleClose,
      dialogVisible,
      open,
      targetRef,
    };
  }
  };

const memoryInfo = window.performance.memory;
// 获取所有网络资源的性能条目
const resourceEntries = window.performance.getEntriesByType('resource');
// 将字节转换为千兆字节
const bytesToGigaBytes = bytes => {
  return (bytes / (1024 * 1024 * 1024)).toFixed(2);
};
  // 将字节转换为兆字节
  const bytesToMegabytes = bytes => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

console.log('总内存限制:', bytesToGigaBytes(memoryInfo.jsHeapSizeLimit), 'GB');
console.log('已分配的内存:', bytesToGigaBytes(memoryInfo.totalJSHeapSize), 'GB');
console.log('当前使用的内存:', bytesToGigaBytes(memoryInfo.usedJSHeapSize), 'GB');
// 遍历资源条目，获取加载时间和消耗
resourceEntries.forEach(entry => {
    console.log('资源 URL:', entry.name);
    console.log('传输大小:', bytesToMegabytes(entry.transferSize), 'MB');
  });
</script>

<style lang="less" scoped>
.container {
  display: flex;
}
.container .left {
  flex: 1;
}
.container .mid {
  flex: 1;
}
.container .right {
  flex: 1;
}
span {
  color: rgb(255, 255, 255);
  display: block;
  text-align: center;
  margin-top: 0.2rem;
}

.videoContainer {
  height: 80%;
  width: 100%;
}

.videoPlayer-dimensions {
  width: 3.6rem;
  height: 3rem;
}
.vjs-tech {
  width: 3.6rem;
  height: 2rem;
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
}
.video-js {
  width: 97%;
  height: 97%;
  margin-top: 0.1rem;
  margin-left: 0.1rem;
}
.dialog {
  height: 10rem;
}
.el-dialog__header {
  height: 0.1rem;
}
.custom-dialog-style .el-dialog__footer {
  height: 0.1rem;
}

.fullscreen {
  /deep/ .el-dialog {
    width: 100%;
  }
}
.no_fullscreen {
  /deep/ .el-dialog {
    width: 40%;
  }


}

/deep/ .custom_dialog_menu {
  padding: 6px 30px 0 0;
  width: 0.2rem;
  height: 0.3rem;
}
/deep/ .custom_dialog_menu i {
  font-size: 15px;
}
.icon{
  margin-left: 0.1rem;
}

:deep(.el-dialog__body){
  padding: 0px;
}

:deep(.el-dialog--center .el-dialog__body){
  padding: 0px;
}
// /deep/ .el-dialog__body{
//     padding: 0;
//   }
</style>
