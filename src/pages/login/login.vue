<template>
  <view class="page">
    <image class="bgImg" src="@/static/images/loginBg.png"></image>
    <view class="bgRest f-y-c-s">
      <image class="logo" src="@/static/logo.svg"></image>
      <view class="title">有趣的故事</view>
      <view class="form">
        <view class="login-btn" @click="phoneLoginClick">手机号登录/注册</view>
        <view class="third">
          <view class="login-item" @click="qqLoginClick">
            <image class="icon" src="@/static/images/qq.svg"></image>
          </view>
          <view class="login-item" @click="wxLoginClick">
            <image class="icon" src="@/static/images/wechat.svg"></image>
          </view>
        </view>
        <view class="confirm">
          <view :class="{active:confirm}" class="checkbox" @click="confirmClick"></view>
          <view class="text">
            <text>我已阅读并同意</text>
            <text class="light">《用户协议》</text>
            <text>与</text>
            <text class="light">《隐私政策》</text>
          </view>
        </view>
      </view>
    </view>
    <Modal v-model="confirmTipModal">
      <view class="confirm-tip-modal">
        <view class="tip-title">请阅读并同意一下条款</view>
        <view class="tip-content">
          <text class="light">《用户协议》</text>
          <text class="light">《隐私政策》</text>
        </view>
        <view class="confirm-btn" @click="confirmClick(true)">同意并继续</view>
      </view>
    </Modal>
  </view>
</template>

<script lang="ts" setup>
import Modal from "@/components/Modal.vue";

const confirm = ref(false);
const confirmTipModal = ref(false);

function confirmClick(force = false) {
  if (force) {
    confirm.value = true
    confirmTipModal.value = false
    return
  }
  confirm.value = !confirm.value
}

function phoneLoginClick() {
  if (!confirm.value) {
    confirmTipModal.value = true;
    return
  }
  uni.switchTab({
    url: "/pages/index/index"
  })
}

function qqLoginClick() {
  if (!confirm.value) {
    confirmTipModal.value = true;
    return
  }
}

function wxLoginClick() {
  if (!confirm.value) {
    confirmTipModal.value = true;
    return
  }
}
</script>
<style lang="scss" scoped>
.page {
  position: relative;
  width: 100vw;
  height: 100vh;

  .logo {
    width: 72px;
    height: 72px;
    margin-top: 40%;
    filter: blur(2px);
  }

  .title {
    margin-top: 42rpx;
    filter: blur(2px);
    font-size: 48px;
    font-weight: 400;
    letter-spacing: 1rpx;
    color: #FFFFFF;
    font-family: aliHei, aliRound, system-ui;
  }

  .form {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    @include flexbox(c, c, y);

    .login-btn {
      @include hover;
      width: 72%;
      height: 96rpx;
      border-radius: 48rpx;
      background: rgba(0, 0, 0, 0.4);
      box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.25);
      margin: 68rpx 0;
      letter-spacing: 4rpx;
      color: white;
      @include flexbox();
    }

    .third {
      margin-bottom: 68rpx;
      @include flexbox(c, c);
      margin-right: -98rpx;

      .login-item {
        margin-right: 98rpx;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        @include flexbox(c, c);
        @include hover();

        .icon {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }

    .confirm {
      margin-bottom: 120rpx;
      @include flexbox();
      color: white;

      .checkbox {
        @include checkbox(1.1em);

      }

      .light {
        color: $theme-color;
      }
    }
  }

  .confirm-tip-modal {
    @include flexbox(c, c, y);
    font-size: 30rpx;
    width: fit-content;
    background: #FFFFFF;
    border-radius: 24rpx !important;
    padding: 42rpx 80rpx;

    .tip-title {
      font-weight: bold;
    }

    .tip-content {
      font-weight: bold;

      .light {
        color: $theme-color;
      }

      margin: 82rpx 0;
    }

    .confirm-btn {
      width: 100%;
      background: $theme-color;
      height: 76rpx;
      border-radius: 38rpx;
      line-height: 76rpx;
      text-align: center;
      letter-spacing: 2rpx;
      font-weight: bold;
      @include hover;
    }
  }
}
</style>
