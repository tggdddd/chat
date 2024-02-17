<template>
  <u-popup :closeable="false" :show="props.modelValue" round="12" @close="closeModal">
    <view class="body">
      <view class="headTop"></view>
      <view class="title">分享至好友</view>

      <view class="friends">
        <view v-for="i in 5" class="friend">
          <image class="avatar" mode="aspectFill" src="@/static/images/avatar.jpg"></image>
          <view class="nickname">贷方发生发射点发射点发</view>
        </view>
        <view class="friend">
          <view class="avatar plus"></view>
          <view class="nickname">选择</view>
        </view>
      </view>

      <view class="gap-line"></view>
      <view class="friends">
        <view class="friend">
          <view class="avatar iconfont icon-weixin" style="background: #12d26c;color: white"></view>
          <view class="nickname">微信</view>
        </view>
        <view class="friend">
          <view class="avatar iconfont icon-pengyouquan" style="background:#63cf23;color: white"></view>
          <view class="nickname">朋友圈</view>
        </view>
        <view class="friend">
          <view class="avatar iconfont icon-QQ" style="background:#21bcf3;color: white"></view>
          <view class="nickname">QQ</view>
        </view>
        <view class="friend">
          <view class="avatar iconfont icon-qqkongjian" style="background:#fdcd01;color: white"></view>
          <view class="nickname">QQ空间</view>
        </view>
        <view class="friend">
          <view class="avatar iconfont icon-xinlangweibo" style="background:#fe5458;color: white"></view>
          <view class="nickname">微博</view>
        </view>
        <view class="friend">
          <view class="avatar iconfont icon-shenglvehao"></view>
          <view class="nickname">更多</view>
        </view>
      </view>
      <view class="friends">
        <view class="friend">
          <view class="avatar iconfont icon-siliao"></view>
          <view class="nickname">私聊</view>
        </view>
        <view class="friend">
          <view class="avatar iconfont icon-guanzhu"></view>
          <view class="nickname">关注</view>
        </view>
        <view class="friend">
          <view class="avatar iconfont icon-ziyuan174"></view>
          <view class="nickname">不喜欢</view>
        </view>
        <view class="friend">
          <view class="avatar iconfont icon-jubao"></view>
          <view class="nickname">举报</view>
        </view>
        <view class="friend">
          <view class="avatar iconfont icon-fuzhilianjie"></view>
          <view class="nickname">复制链接</view>
        </view>
      </view>
    </view>
  </u-popup>
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{
  modelValue: boolean
}>(), {})
const emits = defineEmits(['update:modelValue'])

function closeModal() {
  emits('update:modelValue', false)
}
</script>
<style lang="scss" scoped>
.body {
  padding: 24rpx;

  .headTop {
    width: 100%;
    height: 48rpx;
    box-sizing: border-box;
    position: relative;
    margin-top: -24rpx;

    &::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 72rpx;
      height: 6rpx;
      border-radius: 3rpx;
      background: #e4e4e4;
    }

  }

  .title {
    font-weight: bold;
    font-size: 28rpx;
    text-align: center;
    margin-bottom: 48rpx;
  }

  .friends {
    display: flex;
    overflow: scroll;
    align-items: center;
    margin-right: -24rpx;
    margin-bottom: 24rpx;

    .friend {
      @include flexbox(c, s, y);
      margin-right: 24rpx;
      width: 100rpx;

      .avatar {
        width: 82rpx;
        height: 82rpx;
        border-radius: 50%;
        color: #333333;
        font-size: 42rpx;
        @include flexbox();

        &.iconfont {
          background: #f7f7f7;

        }

        &.plus {
          background: #f7f7f7;

          &::before {
            content: "+";
          }
        }
      }

      .nickname {
        margin-top: 12rpx;
        font-size: 20rpx;
        font-weight: bold;
        text-align: center;
        width: inherit;
        @include text-overflow;
      }
    }
  }

  .gap-line {
    margin: 24rpx 0;
    width: 100%;
    height: 1rpx;
    border-radius: .5rpx;
    background: rgba(#000000, .1);
  }
}
</style>