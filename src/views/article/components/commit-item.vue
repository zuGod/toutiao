<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        @click="onCommentLike()"
        class="like-btn"
        :class="{ liked: comment.is_liking }"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :loading="loading"
      >
        {{ comment.like_count > 0 ? comment.like_count : '赞' }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button class="reply-btn" round>{{
          comment.reply_count
        }}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike } from '@/api';
import { deleteCommentLike } from '@/api';
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    async onCommentLike() {
      this.loading = true;
      try {
        if (this.comment.is_liking) {
          await deleteCommentLike(this.comment.com_id);
          this.comment.like_count--;
        } else {
          await addCommentLike(this.comment.com_id);
          this.comment.like_count++;
        }
        this.comment.is_liking = !this.comment.is_liking;
      } catch (err) {
        this.$toast('操作失败');
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 13px;
    }
  }
  .comment-content {
    font-size: 16px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 9px;
    color: #222;
    margin-right: 13px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 67px;
    height: 24px;
    line-height: 24px;
    font-size: 11px;
    color: #222;
  }
  .like-btn {
    height: 15px;
    padding: 0;
    border: none;
    font-size: 9px;
    line-height: 15px;
    margin-right: 4px;
    .van-icon {
      font-size: 15px;
    }
    /deep/ &.liked {
      color: #e5645f;
    }
  }
}
</style>
