<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
      class="page-nav-bar"
    />
    <van-field
      v-model.trim="localName"
      rows="2"
      autosize
      maxlength="10"
      type="textarea"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api';
export default {
  props: {
    value: { type: String, required: true },
  },
  data() {
    return {
      localName: this.value,
    };
  },
  methods: {
    async onConfirm() {
      try {
        const localName = this.localName;
        if (!localName.length) {
          this.$('昵称不能为空');
          return;
        }
        await updateUserProfile({
          name: localName,
        });
        this.$emit('input', localName);

        this.$emit('close');

        this.$toast.success('更新成功');
      } catch (err) {
        this.$toast.fail('更新失败，请重新登录！');
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__left .van-nav-bar__arrow {
  color: #fff;
  z-index: 2;
}
/deep/ .van-nav-bar__text {
  color: #fff;
}
</style>
