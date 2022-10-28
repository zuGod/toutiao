<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
      left-text="返回"
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image
          round
          width="30"
          height="30"
          fit="cover"
          class="avatar"
          :src="user.photo"
        />
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="isUpdateNameShow = true"
      />
      <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
    <!-- 编辑昵称 -->
    <van-popup v-model="isUpdateNameShow" style="height: 100%" position="bottom"
      ><UpdateName
        @close="isUpdateNameShow = false"
        v-model="user.name"
      ></UpdateName
    ></van-popup>
  </div>
</template>

<script>
import UpdateName from './components/update-name.vue';
import { getUserProfile } from '@/api';
export default {
  name: 'UserIndex',
  components: {
    UpdateName,
  },
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
    };
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile();
        this.user = data.data;
      } catch (err) {
        this.$toast('数据获取失败，请重新登录！');
      }
    },
  },
};
</script>
<style lang="less" scoped>
.avatar {
  width: 30px;
  height: 30px;
}
/deep/ .van-nav-bar__text {
  color: #fff;
}
</style>
