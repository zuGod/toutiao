<template>
  <van-cell class="article-item" :to="'/article/' + article.art_id">
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" :src="img" fit="cover" />
        </div>
      </div>
      <div class="label-info-warp">
        <span>{{ article.aut_name }}</span
        ><span>{{ article.comm_count }}评论</span
        ><span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      class="right-cover"
      slot="default"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    padding-left: 15px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .label-info-warp span {
    font-size: 11px;
    color: #b4b4b4;
    margin-right: 12px;
  }
  .cover-wrap {
    display: flex;
    padding: 15px 0px;
    .cover-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 2px;
      }
      .cover-item-img {
        width: 100%;
        height: 73px;
      }
    }
  }
}
</style>
