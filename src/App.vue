<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { getAllChannelsAPI } from './api/index.js';
export default {
  async created() {
    try {
      const res = await getAllChannelsAPI();
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
<style scoped></style>
