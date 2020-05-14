import axios from "axios";
import { Toast } from 'vant'
const config = {
  'baseUrl_default': process.env.NODE_ENV === 'development'
    ? 'http://192.168.10.223:8800'
    : '',

  'form_test': 1,

  'img_url': process.env.NODE_ENV === 'development'
      ? 'http://192.168.10.223:8800'  
      : '',
};
const service = axios.create({
    baseURL: config.baseUrl_default,
    timeout: 540000
});

let loading

service.interceptors.request.use(
    config => {
      if (config.url.indexOf('getSummaryByName') === -1) {
        loading = Toast.loading({
          message: '加载中...',
          duration:0,
          forbidClick: true
        })
      }


        if (config.method === "post") {
            config.headers["Content-Type"] = "application/json";
        } else if (config.method === "get") {
            /*config.params = {
                ...config.data
            };*/
        }


        return config;
    },
    error => {
      if (process.env.NODE_ENV === 'development') {
        Toast.fail('请求超时!')
      }

      Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {

      if (loading) {
        loading.clear();
      }

        const res = response.data;
        const whiteList = [10000000, 10051205, 10074101, 10085501];
        if (res.retcode && whiteList.indexOf(res.retcode) === -1) {
          if (process.env.NODE_ENV === 'development') {
            Toast({
              message: res.msg
            });
          }

          // todo
          return Promise.reject(new Error(res.msg));
          // return Promise.resolve(res);
        } else {
          // todo
          if (res.retcode === 10085501) {
            if (process.env.NODE_ENV === 'development') {
              Toast({
                message: res.msg
              });
            }
          }


          return Promise.resolve(res);
        }
    },
    error => {
      if (error.response) {
        if (process.env.NODE_ENV === 'development') {
          Toast({
            message: error.message
          });
        }

          return Promise.reject(error);
      }
    }
);

export default service
