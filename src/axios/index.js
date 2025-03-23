import axios from "axios";
import qs from "qs";
import {
    ElMessageBox
} from 'element-plus';
// axios.defaults.baseURL = '/api' //正式
axios.defaults.baseURL = 'http://localhost:9091/' //测试
//post请求头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
//设置超时
axios.defaults.timeout = 10000;
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        ElMessageBox(JSON.stringify(error), '请求异常', {
            confirmButtonText: '确定',
            callback: action => {}
        });
    }
);
export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'post',
                    url,
                    data: qs.stringify(data),
                })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    },
    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'get',
                    url,
                    params: data,
                })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
};


/**
 ** @param {object} obj 需要销毁的对象 
*/
function disposeObj(obj) {
    if (!obj) return;
    // 遍历对象及所有后代对象
    obj.traverse(function (obj) {
      // 废置几何体及材质
      if (obj.geometry) {
        obj.geometry.dispose();
      }
      if (obj.material) {
        obj.material.dispose();
      }
    });
    // 场景中移除对象
    scene.remove(obj);
  }


