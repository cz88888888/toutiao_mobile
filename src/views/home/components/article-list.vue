<template>
  <div class="article-list">
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration="1500">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
        <article-item v-for="(article,index) in list" :key="index" :article="article" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      // 控制失败的提示状态
      error: false,
      // 控制下拉刷新
      isRefreshLoading: false,
      // 下拉刷新成功提示文本
      refreshSuccessText: '刷新成功',
    }
  },
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getAticles({
          // 频道 id
          channel_id: this.channel.id,
          // 简单理解就是请求的页码，请求第一页数据就是当前时间戳
          // 请求下一页的数据时间戳会在当前请求结果中返回
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        })
        const { results } = data.data
        // 2. 把请求结果放到 list 数组中
        this.list.push(...results)

        // 3. 本次数据加载结束后把加载状态设置为结束
        this.loading = false

        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了,不再加载更多
          this.finished = true
        }
      } catch (err) {
        // 展示错误提示
        this.error = true
        this.loading = false
      }
    },
    // 当下拉刷新触发该函数
    async onRefresh() {
      try {
        // 请求获取数据
        const { data } = await getAticles({
          // 频道 id
          channel_id: this.channel.id,
          // 简单理解就是请求的页码，请求第一页数据就是当前时间戳
          // 请求下一页的数据时间戳会在当前请求结果中返回
          timestamp: Date.now(),
          with_top: 1,
        })
        const { results } = data.data
        // 将数据追加到列表的顶部
        this.list.unshift(...data.data.results)
        // 关闭下拉刷新状态
        this.isRefreshLoading = false
        // 更新下拉刷新成功提示文本
        this.refreshSuccessText = `刷新成功,更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isRefreshLoading = false
      }
    },
  },
}
</script>


<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>