<template>
  <div class="layout-container">
    <router-view></router-view>

    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item to="/vide">
        <i slot="icon" class="iconfont icon-shipin"></i>
        视频</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" to="/my">{{
        $store.state.user ? '我的' : '未登录'
      }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped></style>
