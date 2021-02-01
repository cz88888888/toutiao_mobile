<template>
  <div class="channel-edit">
    <van-cell>
      <div slot="title" class="title-text">我的频道</div>
      <van-button type="danger" plain round size="mini" class="edit-btn" @click="isEdit = !isEdit">{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item class="grid-item" v-for="(channel,index) in myChannels" :key="index" @click="onMyChannelClick(channel,index)">
        <van-icon slot="icon" name="clear" v-show="isEdit && !flexdChannels.includes(channel.id)"></van-icon>
        <span class="text" :class="{active: index === active}" slot="text">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item class="grid-item" icon="plus" v-for="(channel,index) in recommendChannels" :key="index" :text="channel.name" @click="onAddChannel(channel)" />
    </van-grid>
  </div>
</template>


<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      flexdChannels: [0],
    }
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel(channel) {
      this.myChannels.push(channel)

      // 数据持久化处理
      if (this.user) {
        try {
          // 如果已登录，把数据请求放到线上
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length,
          })
        } catch (err) {
          this.$toast('保存频道失败，请稍后再试')
        }
      } else {
        // 如果未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 如果是固定频道，则不删除
        if (this.flexdChannels.includes(channel.id)) {
          return
        }

        // 删除频道
        this.myChannels.splice(index, 1)
        // 编辑状态 执行删除状态
        if (index <= this.active) {
          // 让激活频道索引减一
          this.$emit('update-active', this.active - 1, true)
        }

        // 处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态 执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel(channel) {
      if (this.user) {
        // 已登录，将数据更新到线上
        try {
          await deleteUserChannel(channel.id)
        } catch (err) {
          this.$toast('操作失败,请稍后重试')
        }
      } else {
        // 未登录，将数据更新到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
  },
  created() {
    this.loadAllChannels()
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      const channels = []
      this.allChannels.forEach((channel) => {
        const ret = this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id
        })
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    },
  },
}
</script>


<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }

  .edit-btn {
    width: 104px;
    height: 43px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
}
</style>