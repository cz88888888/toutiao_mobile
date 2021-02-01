// 请求模块


import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
    // 接口的基准路径
    baseURL: 'http://ttapi.research.itcast.cn/',

    // 自定义后端返回的原始数据类型
    transformResponse: [function (data) {
        // return data
        try {
            return JSONBig.parse(data)
        } catch (err) {
            return data
        }
    }]
})

// 请求拦截器
request.interceptors.request.use(
    function (config) {
        // 请求发送成功
        const { user } = store.state
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`
        }
        // 这里必须返回 config，否则请求一直停在这里
        return config
    }, function (err) {
        // 请求发送失败
        return Promise.reject(err)
    }
)

// 响应拦截器

export default request