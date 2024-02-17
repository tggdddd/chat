<template>
  <u-popup :closeable="false"
           :custom-style="{
             width:'90%',
             margin:'0 auto 24rpx',
             borderRadius: '12px'
           }"
           :show="props.modelValue"
           @close="closeModal">
    <view class="body">
      <view class="action-item flex-container">
        <view class="left iconfont icon-jubao"></view>
        <view class="content">举报</view>
        <view class="right iconfont icon-arrow-right-copy"></view>
      </view>
      <view class="action-item flex-container">
        <view class="left iconfont icon-guanzhu"></view>
        <view class="content">关注</view>
        <view class="right plus iconfont icon-jiahao"></view>
      </view>
      <view class="action-item flex-container">
        <view class="left iconfont icon-ziyuan174"></view>
        <view class="content">取关</view>
        <view class="right sub"></view>
      </view>
      <view class="cancel">取消</view>
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
  .action-item {
    padding: 24rpx;
    font-size: 30rpx;
    font-weight: bold;
    height: 92rpx;
    box-sizing: border-box;
    @include hover() {
      opacity: .8;
      transform: none;
      box-shadow: none;
      background: #0000000e;
    }

    .left {
      margin-right: 24rpx;
    }

    .content {

    }

    .right {
      color: #e7e7e7;

      &.plus {
        @include flexbox;
        width: 86rpx;
        height: 48rpx;
        border-radius: 24rpx;
        background: linear-gradient(to right, lighten($theme-color, 16%), lighten($theme-color, 10%));
      }

      &.sub {
        &::before {
          content: "";
          height: 4rpx;
          border-radius: 2rpx;
          width: .5em;
          background: currentColor;
        }

        @include flexbox;
        width: 86rpx;
        height: 48rpx;
        border-radius: 24rpx;
        background: linear-gradient(to right, lighten($theme-color, 24%), lighten($theme-color, 10%));
      }
    }
  }

  .cancel {
    width: 92%;
    height: 80rpx;
    font-weight: bold;
    font-size: 30rpx;
    margin: 12rpx auto 24rpx;
    background: #f9fafc;
    border-radius: 40rpx;
    @include hover();
    text-align: center;
    @include flexbox;
  }
}
</style>