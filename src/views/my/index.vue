<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/3.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <div>
      <van-grid column-num="2" class="grid-nav" clickable>
        <van-grid-item class="grid-item">
          <i slot="icon" class="iconfont icon-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="iconfont icon-guanzhu1"></i>
          <span slot="text" class="text">关注</span>
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="onLogout()"
      clickable
    ></van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUserInfo } from '@/api';
export default {
  name: 'my',
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    onLogout() {
      //推出提示
      this.$dialog
        .confirm({
          title: '确认退出么？',
          message: '',
        })
        .then(() => {
          this.$store.commit('setUser', null);
        })
        .catch(() => {
          // on cancel
        });
      //清楚登陆状态
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo();
        this.userInfo = data.data;
      } catch (err) {
        this.$toast('获取数据失败，请重新登录！');
      }
    },
  },
  created() {
    if (this.user) {
      this.loadUserInfo();
    }
  },
};
</script>

<style lang="less" scoped>
.my-container {
  background-color: rgb(246, 246, 247);
  height: 100%;
  width: 100%;
  position: fixed;
  .header {
    height: 200px;
    background: url('~@/assets/1.jpg');
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50px;
        margin-bottom: 15px;
      }
      .text {
        color: aliceblue;
        font-size: 24px;
      }
    }
  }
  .user-info {
    .base-info {
      height: 140px;
      padding: 25px 14px 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          height: 70px;
          width: 70px;
          margin-right: 15px;
          border: 3px solid #fff;
        }
        .name {
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 60px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .count {
        font-size: 18px;
        color: #fff;
      }
      .text {
        font-size: 16px;
        color: #fff;
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 70px;
      i.iconfont {
        font-size: 25px;
      }
      .icon-shoucang {
        color: red;
      }
      .icon-guanzhu1 {
        color: rgb(196, 193, 15);
      }
      span.text {
        font-size: 15px;
      }
    }
  }
  .logout-cell {
    margin-top: 20px;
    text-align: center;
    color: red;
  }
}
</style>
