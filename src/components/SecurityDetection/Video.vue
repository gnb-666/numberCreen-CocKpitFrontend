<template>
  <div class="videoPlay">
    <video
      ref="m3u8_video"
      class="video-js vjs-default-skin vjs-big-play-centered"
      controls
    >
      <source :src="props.videoSrc" />
    </video>
  </div>
</template>
<script  setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
// import zh from "video.js/dist/lang/zh-CN";
// const props = withDefaults(
//   defineProps<{
//     videoSrc: string;
//     autoPlay?: boolean;
//   }>(),
//   { autoPlay: false }
// );
// const props = reactive({
//   videoSrc: '',
//   // videoSrc: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
//   autoPlay: false,
// })
const props = defineProps({
  videoSrc:'',
  autoPlay:false
})
const m3u8_video = ref();
const player = ref(null)
const initPlay = async () => {
  // videojs.addLanguage("zh-CN", zh);
  await nextTick();
  const options = {
    muted: true,
    controls: true,
    autoplay: false,
    loop: true,
    language: "zh-CN",
    techOrder: ["html5"],
  };
  player.value = videojs(m3u8_video.value, options, () => {
    videojs.log("播放器已经准备好了!");
    if (props.autoPlay && props.videoSrc) {
      player.value.play();
    }
    player.value.on("ended", () => {
      videojs.log("播放结束了!");
    });
    player.value.on("error", () => {
      videojs.log("播放器解析出错!");
    });
  });
};
onMounted(() => {
  initPlay();
});
//直接改变路径测试
watch(
  () => props.videoSrc,
  () => {
    player.value.pause();
    player.value.src(props.videoSrc);
    player.value.load();
    if (props.videoSrc) {
      player.value.play();
    }
  }
);
onBeforeUnmount(() => {
  player.value?.dispose();
});
</script>
<style lang="less" scoped>
.videoPlay {
  width: 100%;
  height: 100%;
  .video-js {
    height: 100%;
    width: 100%;
    object-fit: fill;
  }
}

:deep(.vjs-tech) {
  object-fit: fill;
}
</style>
   
