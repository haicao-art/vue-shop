import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.BASE_API, // api的base_url process.env.BASE_API
  timeout: 5000,                  // 请求超时时间
  transformRequest: [function(data, headers) {
    let ret = ''
    for (let it in data) {
      if(typeof data[it] == 'object') {
        for (let param in data[it]) {
          if(typeof data[it][param] == 'object') {
            for (let pam in data[it][param]) {
              ret +=  encodeURIComponent(it) + '[' + encodeURIComponent(param) + '][' + encodeURIComponent(pam) + ']=' + encodeURIComponent(data[it][param][pam]) + '&'
            }
          } else {
            ret +=  encodeURIComponent(it) + '[' + encodeURIComponent(param) + ']=' + encodeURIComponent(data[it][param]) + '&'
          }
        }
      } else {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
    }
    return ret.substr(0, ret.length - 1);
    /*
    console.log(data);
    return Object.keys(data).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
    */
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

//instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// request拦截器
instance.interceptors.request.use(config => {
  //config.data = JSON.stringify(config.data);
  //config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  //console.log(config)
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
instance.interceptors.response.use(
  response => {
    let res = response.data
    if(res.code != 0) {
      console.log(res)
      if(res.code == 1100) {
        //登录过期
        store.dispatch('FedLogOut').then(() => {
          location.reload();
        });
      }
      return Promise.reject(res);
    } else {
      return response.data;
    }
  },
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
//  const res = response.data;
//     if (res.code !== 20000) {
//       Message({
//         message: res.message,
//         type: 'error',
//         duration: 5 * 1000
//       });
//       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('FedLogOut').then(() => {
//             location.reload();// 为了重新实例化vue-router对象 避免bug
//           });
//         })
//       }
//       return Promise.reject('error');
//     } else {
//       return response.data;
//     }
  error => {
    //console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default instance
