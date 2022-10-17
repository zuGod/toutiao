<template>
  <div class="home-container">
    <van-nav-bar fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs animated swipeable class="channel-tabs" v-model="active">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList :channel="item"></ArticleList>
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      ><ChannelEdit
        :my-channels="channels"
        :active="active"
        @update-active="unUpdateActive"
      ></ChannelEdit
    ></van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api';
import ArticleList from './components/article-list.vue';
import ChannelEdit from './components/channel-edit.vue';
export default {
  name: 'home',
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      channels: [],
      isChannelEditShow: false,
      active: 0,
    };
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels();
        this.channels = data.data.channels;
      } catch (err) {
        this.$toast('获取频道数据失败');
      }
    },
    unUpdateActive(index, isChannelEditShow = true) {
      this.active = index;
      this.isChannelEditShow = isChannelEditShow;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 40px;
  padding-top: 90px;
  .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    max-width: 100%;
  }
  .search-btn {
    width: 270px;
    height: 30px;
    background-color: #5babfb;
    border: none;
    font-size: 16px;
    .van-icon {
      font-size: 14px;
    }
  }
  /deep/ .channel-tabs {
    .placeholder {
      width: 40px;
      height: 40px;
      // 不让参与布局计算
      flex-shrink: 0;
    }
    .van-tabs__wrap {
      height: 40px;
      position: fixed;
      top: 46px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab {
      min-width: 65px;
      border-right: 1px solid #f4f5f8;
      font-size: 14px;
      color: #777777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 40px !important;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.iconfont {
        font-size: 18px;
      }
    }
  }
}
</style>
