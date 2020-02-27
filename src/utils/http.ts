import axios from 'axios';
import { notification } from 'antd';


// 环境的切换
if (process.env.REACT_APP_ENV === 'development') {
    axios.defaults.baseURL = 'http://10.1.100.80:19004/api';
}
else if (process.env.REACT_APP_ENV === 'test') {
    axios.defaults.baseURL = 'https://man-zuul-test.jiumama.cn/api';
}
else if (process.env.REACT_APP_ENV === 'production') {
    axios.defaults.baseURL = 'https://man-api.jiumama.cn/api';
} else {
    // 本地开发环境请求
    axios.defaults.baseURL = 'http://localhost:4000'; 
}
// 设置请求超时
axios.defaults.timeout = 10000;

// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断本地是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        const token = sessionStorage.getItem('token');
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.reject(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response.data);
        }
    },
    error => (
        notification.warning({
            message: '操作失败',
            description: error.msg,
            duration: 3
        })
    )
);


export default axios
