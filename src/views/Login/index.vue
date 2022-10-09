<template>
  <div>
    <van-nav-bar title="头条 - 登录" />
    <div>
      <van-form @submit="onSubmit" ref="loginFrom">
        <van-field
          v-model="user.mobile"
          required
          name="mobile"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[
            {
              required: true,
              message: '请填写手机号',
              pattern: /^1[3-9]\d{9}$/,
            },
          ]"
        />
        <van-field
          v-model="user.code"
          required
          type="password"
          name="code"
          label="密码"
          placeholder="密码(246810)"
          :rules="[
            { required: true, message: '请填写验证码', pattern: /^\d{6}$/ },
          ]"
        >
          <template #button v-if="isCountDownShow">
            <van-button
              class="send-sms-btn"
              round
              size="small"
              type="default"
              @click="onSendSms"
              native-type="button"
              ><van-count-down
                :time="60000"
                format="ss s"
                @finish="isCountDownShow = false"
            /></van-button>
          </template>
          <template #button v-else>
            <van-button
              class="send-sms-btn"
              round
              size="small"
              type="default"
              @click="onSendSms"
              native-type="button"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { loginAPI, sendSmsApi } from '@/api';

export default {
  data() {
    return {
      user: {
        mobile: '', //手机号
        code: '', //验证码(密码)246810
      },
      isCountDownShow: false, //是否展示倒计时
    };
  },
  methods: {
    async onSubmit() {
      //1. 获取表单数据
      //2. 表单验证
      //在组件中必须通过this.$toast来调用Toast组件
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0, //持续时间，默认是2000，如果为0则持续展示
      });
      //3. 提交表单请求登录
      try {
        const { data } = await loginAPI(this.user);
        this.$store.commit('setUser', data.data);
        this.$toast.success('登录成功');
      } catch (err) {
        console.log(err);
        this.$toast.fail('登录失败');
      }
      //4. 根据请求响应结果处理后续操作
      // const res = await loginAPI(this.user);
      // console.log(res);
    },
    async onSendSms() {
      //1. 校验手机号
      try {
        await this.$refs.loginFrom.validate('mobile');
        this.$toast.success('验证成功');
      } catch (err) {}

      //2. 验证通过，显示倒计时
      this.isCountDownShow = true;
      //3. 请求发送验证码
      try {
        await sendSmsApi(this.user.mobile);
        this.$toast.success('发送成功');
      } catch (err) {
        if (err.response.status === 404) {
          this.$toast.fail('手机号码不正确');
        } else {
          this.$toast.fail('信息错误');
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.send-sms-btn {
  background-color: #ededed;
  color: #666;
}
</style>
