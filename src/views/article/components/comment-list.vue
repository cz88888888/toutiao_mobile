<template>
  <van-list :immediate-check="false" v-model="loading" :finished="finished" finished-text="没有更多了" :error="error" error-text="获取失败,请重试" @load="onLoad">
    <comment-item v-for="(item,index) in list" :key="index" :comment="item" @reply-click="$emit('reply-click',$event)" />
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  components: {
    CommentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      // 自定义 prop 数据校验
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a',
    },
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      // 获取下一页数据的标记
      offset: null,
      limit: 10,
      error: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    // 当手动初始 onLoad() 并不会加载 loading,所以loading也要手动
    this.loading = true
    this.onLoad()
  },
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 请求获取数据
        const { data } = await getComment({
          // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          type: this.type,
          // 源id，文章id或评论id
          source: this.source.toString(),
          // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          offset: this.offset,
          limit: this.limit,
        })
        // 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        // 将文章评论总数传递到外部
        this.$emit('onload-success', data.data)

        // 将loading设置为false
        this.loading = false
        // 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>