<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>
    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></SearchSuggestion>

    <!-- 搜索历史记录 -->
    <SearchHistory v-else></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue';
import SearchResult from './components/search-result.vue';
import SearchSuggestion from './components/search-suggestion.vue';
export default {
  data() {
    return {
      searchText: '',
      isResultShow: false, //控制搜索结果的展示
    };
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion,
  },
  methods: {
    onSearch(val) {
      this.searchText = val;
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 54px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
