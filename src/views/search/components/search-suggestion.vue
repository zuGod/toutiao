<template>
  <div class="search-suggestion">
    <van-cell
      :title="text"
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api';
import { debounce } from 'lodash';

export default {
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [],
    };
  },
  watch: {
    searchText: {
      //当searchText发生改变的时候就会调用handler函数
      //注意：handler函数名称是固定的
      // handler(value) {
      //   this.loadSearchSuggestions(value);
      // },
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value);
      }, 200),
      immediate: true, //该回调将会在侦听开始周后立即调用
    },
  },
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(this.searchText);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast('获取数据失败，请重新登录！');
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
