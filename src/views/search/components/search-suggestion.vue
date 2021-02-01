<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(text,index) in suggestion" :key="index" @click="$emit('search',text)">
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>


<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // 联想建议数据列表
      suggestion: [],
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 监视 searchText 发生变化时会调用 handler 函数
      // handler 函数名是固定写法
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value)
      }, 200),
      // 该回调会在侦听开始后立即调用
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestion = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    },
  },
}
</script>


<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>