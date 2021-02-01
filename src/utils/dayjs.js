import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)


// dayjs 默认语言是英文，我们这里配置中文 全局使用
dayjs.locale('zh-cn')


// 定义全局过滤器,然后可以在任何组件中使用
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})