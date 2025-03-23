<template>
  <div class="container">
    <section class="left">
      <div class="videoContainer">
        <video id="videoMp4Player1" class="video-js" muted></video>
      </div>
      <div class="videoContainer">
        <video id="videoMp4Player2" class="video-js" muted></video>
      </div>
      <div class="videoContainer">
        <video id="videoMp4Player3" class="video-js" muted></video>
      </div>
    </section>
    <section class="mid">
        <div class="videoContainer">
        <video id="videoMp4Player4" class="video-js" muted></video>
      </div>
      <div class="videoContainer">
        <video id="videoMp4Player5" class="video-js" muted></video>
      </div>
      <div class="videoContainer">
        <video id="videoMp4Player6" class="video-js" muted></video>
      </div>
    </section>
    <section class="right">
        <div class="videoContainer">
        <video id="videoMp4Player7" class="video-js" muted></video>
      </div>
      <div class="videoContainer">
        <video id="videoMp4Player8" class="video-js" muted></video>
      </div>
      <div class="videoContainer">
        <video id="videoMp4Player9" class="video-js" muted></video>
      </div>
    </section>
  </div>
  <div class="button-container">
    <el-button-group>
      <el-button type="primary" @click="goTo4">四宫格</el-button>
      <el-button type="primary" @click="goTo9">九宫格</el-button>
    </el-button-group>

    <el-button-group class="ml-4">
      <el-button type="primary" @click="goToHomePage">返回</el-button>
    </el-button-group>
  </div>
</template>

<script>
 import "video.js/dist/video-js.css";
  import videojs from "video.js";
  import {
  ElButton,
  ElButtonGroup,
  ElIcon,
} from 'element-plus';
  export default {
    data() {
      return {
        videoHlsUrl:"http://220.161.87.62:8800/hls/0/index.m3u8",//m3u8格式视频流地址4电视台
      };
    },
    components: {
    ElButton,
    ElButtonGroup,
    ElIcon,
  },
    mounted() {
      this.$nextTick(() => {
        this.getVideo1(this.videoHlsUrl);
      });
      this.$nextTick(() => {
        this.getVideo2(this.videoHlsUrl);
      });
      this.$nextTick(() => {
        this.getVideo3(this.videoHlsUrl);
      });
      this.$nextTick(() => {
        this.getVideo4(this.videoHlsUrl);
      });
      this.$nextTick(() => {
        this.getVideo5(this.videoHlsUrl);
      });
      this.$nextTick(() => {
        this.getVideo6(this.videoHlsUrl);
      });
      this.$nextTick(() => {
        this.getVideo7(this.videoHlsUrl);
      });
      this.$nextTick(() => {
        this.getVideo8(this.videoHlsUrl);
      });
      this.$nextTick(() => {
        this.getVideo9(this.videoHlsUrl);
      });
      this.$nextTick(() => {
        this.logNetworkPerformance(this.videoHlsUrl)
      });
      
    },
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
        videojs("videoMp4Player1", options, function onPlayerReady() {});
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
        videojs("videoMp4Player2", options, function onPlayerReady() {});
      },
      getVideo3(url) {
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
        videojs("videoMp4Player3", options, function onPlayerReady() {});
      },
      getVideo4(url) {
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
        videojs("videoMp4Player4", options, function onPlayerReady() {});
      },
      getVideo5(url) {
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
        videojs("videoMp4Player5", options, function onPlayerReady() {});
      },
      getVideo6(url) {
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
        videojs("videoMp4Player6", options, function onPlayerReady() {});
      },
      getVideo7(url) {
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
        videojs("videoMp4Player7", options, function onPlayerReady() {});
      },
      getVideo8(url) {
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
        videojs("videoMp4Player8", options, function onPlayerReady() {});
      },
      getVideo9(url) {
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
        videojs("videoMp4Player9", options, function onPlayerReady() {});
      },
      goToHomePage() {
      this.$router.push('/HomePage/Overview');
    },
    goTo4() {
      this.$router.push('/4-page').then(() => {
        window.location.reload(); // 跳转完成后刷新页面;
      })},
      goTo9() {
      this.$router.push('/9-page').then(() => {
        window.location.reload(); // 跳转完成后刷新页面;
      })},
  }}




// calculateNetworkCost(m3u8Url);
</script>

<style scoped>
.container {
  display: flex;
  min-width: 15rem;
  max-width: 25.6rem;
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
.videoContainer {
  height: 3rem;

}
.videoMp4Player1-dimensions {
  width: 5.5rem;
  height: 3rem;
}
.videoMp4Player2-dimensions {
  width: 5.5rem;
  height: 3rem;
}
.videoMp4Player3-dimensions {
  width: 5.5rem;
  height: 3rem;
}
.videoMp4Player4-dimensions {
  width: 5.5rem;
  height: 3rem;
}
.videoMp4Player5-dimensions {
  width: 5.5rem;
  height: 3rem;
}
.videoMp4Player6-dimensions {
  width: 5.5rem;
  height: 3rem;
}
.videoMp4Player7-dimensions {
  width: 5.5rem;
  height: 3rem;
}
.videoMp4Player8-dimensions {
  width: 5.5rem;
  height: 3rem;
}
.videoMp4Player9-dimensions {
  width: 5.5rem;
  height: 3rem;
}
.vjs-tech {
  width: 5.5rem;
  height: 3rem;
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 0.1rem;
}
</style>