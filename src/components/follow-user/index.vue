<template>
  <van-button v-if="value" class="follow-btn" round size="small" :loading="loading" @click="onFollow">已关注</van-button>
  <van-button v-else class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" :loading="loading" @click="onFollow">关注</van-button>
</template>


<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async onFollow() {
      this.loading = true
      try {
        if (this.value) {
          // 已关注
          await deleteFollow(this.userId)
        } else {
          // 未关注
          await addFollow(this.userId)
        }
        // this.$emit('update-is_followed', !this.value)
        this.$emit('input', !this.value)
      } catch (err) {
        let message = '操作失败，请重试'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false
    },
  },
}
</script>