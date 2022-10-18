<template>
  <div class="collect-article">
    <van-button
      :icon="value ? 'star' : 'star-o'"
      :class="{
        collected: value,
      }"
      :loading="loading"
      @click="onCollect"
    >
    </van-button>
  </div>
</template>

<script>
import { addCollect } from '@/api';
import { deleteCollect } from '@/api';

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onCollect() {
      this.loading = true;
      try {
        if (this.value) {
          //已收藏，取消收藏
          await deleteCollect(this.articleId);
        } else {
          await addCollect(this.articleId);
        }

        //更新视图
        this.$emit('input', !this.value);

        this.$toast.success(!this.value ? '收藏成功' : '取消收藏');
      } catch (err) {
        this.$toast('失败');
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.collect-article {
  .collected {
    .van-icon {
      color: #ffa500;
    }
  }
}
</style>
