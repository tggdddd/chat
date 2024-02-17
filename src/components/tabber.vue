<template>
  <u-tabbar :border="false"
            :placeholder="false"
            :value="current"
            active-color="#FF0000FF"
            class="tabber"
            safeAreaInsetBottom
            @change="change">
    <u-tabbar-item :badge="newChatsNum" icon="chat" text="首页"></u-tabbar-item>
    <u-tabbar-item :badge="newFriendsNum" icon="man-add" text="广场"></u-tabbar-item>
    <u-tabbar-item>
      <template #inactive-icon>
        <view class="publish">
          <view>分享</view>
          <view>瞬间</view>
        </view>
      </template>
    </u-tabbar-item>
    <u-tabbar-item icon="photo" text="聊天"></u-tabbar-item>
    <u-tabbar-item icon="account" text="我的"></u-tabbar-item>
  </u-tabbar>
</template>

<script lang="ts" setup>
const props = defineProps({
  active: {
    type: Number,
    default: 0,
  },
});
const newChatsNum = ref(2);
const newFriendsNum = ref(0);
const current = ref(props.active);

function change(index: number) {
  if (index == 2) {
    return
  }
  if (index == 0) {
    uni.switchTab({
      url: "/pages/index/index"
    });
  } else if (index == 1) {
    uni.switchTab({
      url: "/pages/square/square"
    })
  } else if (index == 3) {
    uni.switchTab({
      url: "/pages/chat/index"
    })
  } else if (index == 4) {
    uni.switchTab({
      url: "/pages/my/my"
    })
  }

}
</script>
<style lang="scss" scoped>
.tabber {
  flex-grow: 0;
  flex-shrink: 0;

}

.publish {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: linear-gradient(24deg, $theme-color, lighten($theme-color, 1%));
  @include flexbox(c, c, y);
  box-shadow: 0 0 0 10px #ffffff;
  transform: translateY(-6px);

  view {
    font-size: 12px;
    color: white;
    letter-spacing: 2rpx;
    text-align: center;
    line-height: 1.25;
    font-weight: bold;
  }
}
</style>