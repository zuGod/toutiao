<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败,点击重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api';
export default {
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    };
  },
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText,
        });
        // 2. 将数据添加到数组列表中
        console.log(data);
        this.list.push(...data.data.results);
        // 3. 将本次加载的loading关闭
        this.loading = false;
        // 4. 判断是否还有数据
        if (data.data.results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
        this.$toast('数据加载失败，请重新登录！');
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
