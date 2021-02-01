<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-var" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search" to="/search">搜索</van-button>
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for=" channel in channels" :key="channel.id">
        <!-- 文章列表 -->
        <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup v-model="isChannelEditShow" closeable position="bottom" close-icon-position="top-left" :style="{ height: '100%' }">
      <channel-edit :my-channels="channels" :active="active" @update-active="onUpdateActive" />
    </van-popup>
  </div>
</template>


<script>
import { getUserchannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'homeIndex',
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      active: 0,
      // 频道列表
      channels: [],
      // 控制频道编辑弹出层的显示状态
      isChannelEditShow: false,
    }
  },
  methods: {
    async loadChannels() {
      // try {
      //   const { data } = await getUserchannels()
      //   this.channels = data.data.channels
      // } catch (err) {
      //   this.$toast('获取用户频道数据失败')
      // }
      let channels = []
      if (this.user) {
        const { data } = await getUserchannels()
        channels = data.data.channels
      } else {
        const localChannels = getItem('TOTIAO_CHANNELS')
        if (localChannels) {
          channels = localChannels
        } else {
          // 没有就用默认的
          const { data } = await getUserchannels()
          channels = data.data.channels
        }
      }

      this.channels = channels
    },
    onUpdateActive(index, isChannelEditShow = true) {
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    },
  },
  created() {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>


<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}

/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777;
  }
  .van-tab--active {
    color: #333;
  }
  .van-tabs__nav {
    padding-bottom: 0;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
    bottom: 8px;
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }

  .hamburger-btn {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>