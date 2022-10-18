<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :title="item.content"
        :comment="item"
      ></comment-item>
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api';
import CommentItem from './commit-item.vue';
export default {
  components: {
    CommentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      require: true,
    },
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      //1.请求获取数据
      //2.将数据添加到列表中
      //3. 将loading设置为false
      //4. 判断是否还有数据
      try {
        const { data } = await getComment({
          type: 'a', //评论类型
          source: this.source, //文章id
          offset: this.offset, //获取评论数据的偏移量
          limit: this.limit, //每页大小
        });
        const { results, total_count: totalCount } = data.data;
        this.list.push(...results);

        //把文章评论总数量传递
        this.$emit('onload-success', data.data);
        this.loading = false;

        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (err) {}
    },
  },
};
</script>

<style lang="less" scoped></style>
