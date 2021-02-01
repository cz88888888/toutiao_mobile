<template>
  <div class="update-gender">
    <van-picker show-toolbar :columns="columns" :default-index="value" @cancel="$emit('close')" @confirm="onConfirm" @change="onPickerChange" />
  </div>
</template>

<script>
import { UpdateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0,
      })
      try {
        const localGender = this.localGender
        await UpdateUserProfile({
          gender: localGender,
        })
        this.$emit('input', localGender)

        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onPickerChange(picker, value, index) {
      this.localGender = index
    },
  },
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>
