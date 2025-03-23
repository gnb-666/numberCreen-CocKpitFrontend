<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu"
      mode="horizontal"
      :ellipsis="false"
      style="border-bottom: none"
    >
      <el-menu-item index="1" style="width: 15vw;" @click="choose(0)">
        <router-link
          to="/HomePage/ProducingManagement"
          style="text-decoration: none "
        >
          <span style="display: block; text-align: center;">
            <h2 :class="{ left: itemStates[0].isNotChosen, left_chosen: itemStates[0].isChosen }" style="font-size: 1vw;">
              生产管理
            </h2>
          </span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="2" style="width: 15vw;" @click="choose(1)">
        <router-link
          to="/HomePage/SecurityDetection"
          style="text-decoration: none"
        >
          <span style="display: block; text-align: center;">
            <h2 :class="{ left: itemStates[1].isNotChosen, left_chosen: itemStates[1].isChosen }" style="font-size: 1vw;">
              安全管理
            </h2>
          </span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="3" style="width: 40vw;" @click="chooseMid">
        <router-link to="/HomePage/Overview" style="text-decoration: none; ">
          <span
            style="display: block; text-align: center;margin-top: -5vh;"
          >
            <h1 style="font-size: 1.5vw;">新疆戈恩斯多晶硅绿色智能制造工业互联网平台</h1></span
          >
        </router-link>
      </el-menu-item>
      <el-menu-item index="4" style="width: 15vw;" @click="choose(2)">
        <router-link
          to="/HomePage/EquipmentManagement"
          style="text-decoration: none"
        >
          <span style="display: block; text-align: center;">
            <h2 :class="{ right: itemStates[2].isNotChosen, right_chosen: itemStates[2].isChosen }" style="font-size: 1vw;">
              设备管理
            </h2>
          </span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="5" style="width: 15vw;" @click="choose(3)">
        <router-link
          to="/HomePage/EnvironmentalManagement"
          style="text-decoration: none"
        >
          <span style="display: block; text-align: center;">
            <h2 :class="{ right: itemStates[3].isNotChosen, right_chosen: itemStates[3].isChosen }" style="font-size: 1vw;"> 
              环保管理
            </h2>
          </span>
        </router-link>
      </el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "default",
  data() {
    return {
      activeIndex: 0,
      itemStates: [
        { isNotChosen: true, isChosen: false },
        { isNotChosen: true, isChosen: false },
        { isNotChosen: true, isChosen: false },
        { isNotChosen: true, isChosen: false }
      ]
    };
  },
  methods: {
    choose(index) {
      this.activeIndex = index;
      this.itemStates.forEach((state, i) => {
        state.isNotChosen = i!== index;
        state.isChosen = i === index;
      });
    },
    chooseMid() {
      this.activeIndex = -1;
      this.itemStates.forEach(state => {
        state.isNotChosen = true;
        state.isChosen = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu {
  background: url("~@/assets/images/background.png") top center no-repeat;
  background-size: 100%;
  width: 100vw;
  height: 12vh;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: none;
}
.el-menu-item:hover {
  background-color: transparent !important;
}

.left,
.left_chosen,
.right,
.right_chosen {
  will-change: background-image;
}

h1 {
  color: rgb(255, 255, 255);
  font-size: calc(45/1321*100vh);
}

h2 {
  width: 8.4vw;
  height: 5.2vh;
  line-height: 5.2vh;
  font-size: calc(28/1321*100vh);
  color: rgb(255, 255, 255);
}

.left {
  background: url("~@/assets/images/l.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 1.5vh;
}
.left_chosen {
  background: url("~@/assets/images/lChosen.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 1.5vh;
}
.right {
  background: url("~@/assets/images/r.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 1.5vh;
}
.right_chosen {
  background: url("~@/assets/images/rChosen.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 1.5vh;
}
</style>    