<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></ArticleItem>
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api';
import ArticleItem from '@/components/article-item/index.vue';
export default {
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
    };
  },
  methods: {
    async onRefresh() {
      // 请求获取数据
      //将数据追加到列表的顶部
      //关闭下拉刷新的列表状态
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, //频道id
          timestamp: this.timestamp || Date.now(),
        });
        this.list.unshift(...data.data.results);
        this.isLoading = false;
      } catch (err) {
        this.$toast('获取列表数据失败');
      }
    },
    async onLoad() {
      // 异步更新数据
      //1. 请求获取数据
      //2. 把请求结果数据放到list数组中
      //3. 本次数据加载结束之后要把状态设置为结束 loading关闭之后才能触发下一次的加载更多
      //4. 判断数据是否加载完成 finish设置为true
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, //频道id
          timestamp: this.timestamp || Date.now(),
        });
        //...数组的展开操作符
        this.list.push(...data.data.results);

        this.loading = false;
        if (data.data.results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.article-list {
  // //100%单位相对于父元素
  // height: 100%;
  height: 79vh;
  overflow-y: auto;
}
</style>
