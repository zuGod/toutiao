<template>
  <div class="collect-article">
    <van-button
      :icon="value === 1 ? 'good-job' : 'good-job-o'"
      :class="{
        liked: value === 1,
      }"
      :loading="loading"
      @click="onCollect"
    >
    </van-button>
  </div>
</template>

<script>
import { addLiked } from '@/api';
import { deleteLiked } from '@/api';

export default {
  props: {
    value: {
      type: Number,
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
        let status = -1;
        if (this.value === 1) {
          //已收藏，取消收藏
          await deleteLiked(this.articleId);
        } else {
          await addLiked(this.articleId);
          status = 1;
        }

        //更新视图
        this.$emit('input', status);

        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞');
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
  .liked {
    color: #e5645f;
  }
}
</style>
