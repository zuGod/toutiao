<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-item">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fiexChannels.includes(channel.id)"
        ></van-icon>
        <span class="text" slot="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api';
import { mapState } from 'vuex';
import { setItem } from '@/utils/storage';
export default {
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false, //控制编辑状态的显示
      fiexChannels: [0],
    };
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      // const channels = [];
      // this.allChannels.forEach((channel) => {
      //find遍历数组，找到满足条件的元素项
      //   const ret = this.myChannels.find((myChannel) => {
      //     return myChannel.id === channel.id;
      //   });
      //   if (!ret) {
      //     channels.push(channel);
      //   }
      // });
      // return channels;
      return this.allChannels.filter((channel) => {
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id;
        });
      });
    },
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannelsAPI();
        this.allChannels = data.data.channels;
      } catch (err) {
        this.$toast('数据获取失败');
      }
    },
    onAddChannel(channel) {
      this.myChannels.push(channel);
      console.log(this.myChannels);
      //数据持久化处理
      if (this.user) {
        //
      } else {
        //未登录存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels);
      }
    },
    onMyChannelClick(channel, index) {
      //如果是编辑状态执行删除
      if (this.isEdit) {
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true);
        }
        this.myChannels.splice(index, 1);
      } else {
        //非编辑状态切换频道
        this.$emit('update-active', index);
      }
    },
  },
  created() {
    this.loadAllChannels();
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 44px 0;
  .title-text {
    font-size: 16px;
    color: #333333;
  }
  .edit-btn {
    width: 52px;
    height: 24px;
    font-size: 13px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 80px;
    height: 43px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-item {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 15px;
        color: #cacaca;
        z-index: 2;
      }
      .text {
        font-size: 14px;
        color: #222;
      }
      .active {
        color: #f85959;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        margin-top: 0;
      }
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 14px;
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
