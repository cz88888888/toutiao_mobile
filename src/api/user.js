// 用户相关的请求文件

import request from '@/utils/request'
// import store from '@/store'

// 请求登录注册接口
export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data,
    })
}

// 请求发送验证码接口 每手机号每分钟1次
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}

// 获取用户自己的信息接口
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user',
        // 发送请求头数据 ,已经统一在请求拦截器中设置了
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

// 获取用户频道列表接口
export const getUserchannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels',
    })
}

// 关注用户
export const addFollow = (target) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/user/followings',
        data: {
            target
        }
    })
}

// 取消关注用户
export const deleteFollow = (target) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${target}`,
    })
}

// 获取当前登录用户的个人资料
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/profile',
    })
}

// 更新用户个人资料
export const UpdateUserProfile = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/profile',
        data
    })
}

// 更新用户照片资料
export const UpdateUserPhoto = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/photo',
        data
    })
}