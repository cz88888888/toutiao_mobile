<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/" class="search-form">
      <van-search v-model="searchText" show-action background="#3296fa" placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" @focus="isResultShow = false" />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch" />

    <!-- 搜索历史记录 -->
    <search-history v-else :search-histories="searchHistories" @clear-search-histories="searchHistories = []" @search="onSearch" />
  </div>
</template>


<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  props: {},
  data() {
    return {
      searchText: '',
      // 控制搜索结果的展示状态
      isResultShow: false,
      // 搜索历史记录数据
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [],
    }
  },
  methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索结果,但不要有重复数据，最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 展示搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
  },
  watch: {
    searchHistories(value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    },
  },
}
</script>


<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }

  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>