<template>
    <h2 style="text-align: center; color: rgb(255, 255, 255);height:0.3rem;line-height: 0.5rem;"><span style="font-size: 1.3vw;">设备构成</span></h2>
    <div class="container">
        <section class="Left">
            <p><img src="~@/assets/images/Equipment_images/Equipment_icon1.jpg" alt="error" /><text>{{num1}}</text></p>
            <span style="font-size: 0.8vw; margin-left: 1vw;">{{ name1 }}</span>
            <p><img src="~@/assets/images/Equipment_images/Equipment_icon3.jpg" alt="error" /><text>{{num2}}</text></p>
            <span style="font-size: 0.8vw; margin-left: 1vw;">{{ name2 }}</span>
        </section>
        <section class="Middle">
            <p><img src="~@/assets/images/Equipment_images/Equipment_icon2.jpg" alt="error" /><text>{{num3}}</text></p>
            <span style="font-size: 0.8vw; margin-left: 1vw;">{{ name3 }}</span>
            <p><img src="~@/assets/images/Equipment_images/Equipment_icon4.jpg" alt="error" /><text>{{num4}}</text></p>
            <span style="font-size: 0.8vw; margin-left: 1vw;">{{ name4 }}</span>
        </section>
        <section class="Right">
            <p><img src="~@/assets/images/Equipment_images/Equipment_icon2.jpg" alt="error" /><text>{{num5}}</text></p>
            <span style="font-size: 0.8vw; margin-left: 1vw;">{{ name5 }}</span>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios';

// 定义响应式数据
const name1 = ref('');
const name2 = ref('');
const name3 = ref('');
const name4 = ref('');
const name5 = ref('');
const num1 = ref('');
const num2 = ref('');
const num3 = ref('');
const num4 = ref('');
const num5 = ref('');

// 定义获取数据的函数
const getHistoryList = () => {
    axios.get('/deviceconfiguration')
       .then((res) => {
            if (res.length > 0) {
                const firstObject1 = res[0];
                name1.value = firstObject1.devicename;
                num1.value = firstObject1.devicenumber;
                const firstObject2 = res[1];
                name2.value = firstObject2.devicename;
                num2.value = firstObject2.devicenumber;
                const firstObject3 = res[2];
                name3.value = firstObject3.devicename;
                num3.value = firstObject3.devicenumber;
                const firstObject4 = res[3];
                name4.value = firstObject4.devicename;
                num4.value = firstObject4.devicenumber;
                const firstObject5 = res[4];
                name5.value = firstObject5.devicename;
                num5.value = firstObject5.devicenumber;
            }
        });
};

// 在组件挂载后调用获取数据的函数
onMounted(() => {
    getHistoryList();
});
</script>

<style scoped>
.container {
    display: flex;
}

.container .Left {
    flex: 1;
}

.container .Middle {
    flex: 1;
}

.container .Right {
    flex: 1;
}

img {
    margin-top: 0.2rem;
    margin-left: 0.4rem;
    width: 30%;
    height: 30%;
    display: inline-block;
}

span {
    margin-left: 0rem;
    margin-top: 0rem;
    color: rgb(255, 255, 255);
    width: 0.8rem;
    height: 0.2rem;
}

text {
    margin-left: 0.2rem;
    color: rgb(255, 255, 255);
    font-size: 1.2vw;
}
</style>