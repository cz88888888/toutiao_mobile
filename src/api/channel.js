// 频道请求模块
import request from '@/utils/request'


// 获取所有频道列表接口
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels',
    })
}

// 添加用户频道接口
export const addUserChannel = (channel) => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}

// 删除用户指定频道接口
export const deleteUserChannel = (channelId) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channelId}`,
    })
}