<script lang="ts" setup>
import Tabber from "@/components/tabber.vue";

const livingCount = ref(0)
onMounted(() => {
  renderBox()
})
const others = ref([
  {
    avatar: "/static/images/avatar.jpg",
    nickname: "方法是的",
    distance: '123km'
  }
])
for (let i = 1; i < 20; i++) {
  others.value.push({
    avatar: "/static/images/avatar.jpg",
    nickname: "方法是的",
    distance: '123km'
  })
}

function viewUserClick(item: any, index: number) {
  uni.showToast({
    title: index
  })
}

function renderBox() {

}

function computeOtherStyle(item: any, index: number) {
  let count = others.value.length;
  let per = count / 3
  let curP = Math.ceil(index / per)
  let curI = index % per
  let radius = 360 / per;
  let initDistance = 20;
  let stepDistance = 8
  let vD = initDistance + curP * stepDistance;
  let vR = radius * curI
  return {
    "--y": vD + "vw",
    "--deg": vR + "deg",
    "--delay": Math.random() * index * 1000 + "ms"
  }
}

const topPlaceholder = uni.getSystemInfoSync().statusBarHeight
</script>

<template>
  <view class="page">
    <view :style="{marginTop:topPlaceholder+'px'}" class="navbar">
      <image class="scanner" src="@/static/images/scanner.svg"></image>
      <view class="filter">
        <image class="icon" src="@/static/images/filter.svg"></image>
        筛选
      </view>
    </view>
    <view class="view-box">
      <view class="item-box">
        <image class="avatar" mode="aspectFill" src="@/static/images/avatar.jpg"></image>
        <view class="nickname">我自己</view>
      </view>
      <view class="others">
        <view v-for="(item,index) in others" :style="computeOtherStyle(item,index)" class="item-box-wrap">
          <view class="line"></view>
          <view class="distance">{{ item.distance }}</view>
          <view class="item-box" @click="viewUserClick(item,index)">
            <image :src="item.avatar" class="avatar" mode="aspectFill"></image>
            <view class="nickname">{{ item.nickname }}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="info-live-number">
      当前
      <text class="theme-color" style="margin: 0 6rpx;">{{ livingCount }}</text>
      人在线
    </view>
    <view class="actions-view">
      <view class="action-view-1">
        <view class="title-t">
          <view class="label">在线匹配</view>
          <view class="desc">今日剩余20次</view>
        </view>
        <view class="action">开始匹配</view>
      </view>
      <view class="action-view-width" style="margin-bottom: -20rpx;">
        <view class="action-view-2">
          <view class="title-t">
            <view class="label">语音匹配</view>
          </view>
          <view class="action">开始匹配</view>
        </view>
        <view class="action-view-2">
          <view class="title-t">
            <view class="label">群聊派对</view>
          </view>
          <view class="action">开始匹配</view>
        </view>
      </view>
    </view>
    <view class="actions-view" style="margin-top:20rpx">
      <view class="action-view-width" style="margin-bottom: -20rpx;">
        <view class="action-view-2">
          <view class="title-t">
            <view class="label">小游戏</view>
          </view>
          <view class="action">开始匹配</view>
        </view>
      </view>
    </view>
    <view style="height: 24rpx"></view>
    <Tabber/>
  </view>
</template>
<style lang="scss" scoped>
.page {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 42rpx;
  background: radial-gradient(farthest-corner at 0 0, rgb(180 0 255 / 32%) 0, rgb(231 0 255 / 59%) 70vw, rgb(0 0 0 / 0%) 100vw), radial-gradient(farthest-corner at 100vw 0, rgb(255 255 255 / 33%) 0, rgb(255 255 255) 70vw, rgb(97 63 145) 100vw), linear-gradient(184deg, rgb(255 50 50) 0%, rgb(255 0 0) 100%);
  //background: radial-gradient(
  //        farthest-corner at 0 0,
  //        #05F7F354 0,
  //        #05F7F300 70vw,
  //        #00000000 100vw),
  //radial-gradient(
  //        farthest-corner at 100vw 0,
  //        #A0FA7D54 0,
  //        #A0FA7D00 70vw,
  //        #00000000 100vw),
  //linear-gradient(180deg,
  //        rgba(255, 255, 255, 0) 0%,
  //        rgba(255, 255, 255, 0) 20%,
  //        rgba(255, 255, 255, 0.19) 20%,
  //        rgba(166, 141, 242, 0.07) 100%);

  .navbar {
    @include flexbox(c, b);
    box-sizing: border-box;
    width: 100%;
    padding-top: 42rpx;

    .scanner {
      width: 68rpx;
      height: 68rpx;
      @include hover;

      &:hover, &:active {
        box-shadow: unset;
      }
    }

    .filter {
      @include tag(58rpx, 32rpx);
      color: #2c2c2c;
      background: #FFFFFF;
      font-size: 24rpx;
      font-weight: bold;
      box-sizing: border-box;
      @include hover;

      .icon {
        width: 34rpx;
        height: 34rpx;
        margin-right: 8rpx;
      }
    }
  }

  .view-box {
    position: relative;
    width: 100%;
    height: 100vw;

    .item-box {
      @include flexbox(c, c, y);
      box-sizing: border-box;
      position: absolute;
      width: 82rpx;
      height: 82rpx;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
      z-index: 2;

      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      .nickname {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        font-size: 22rpx;
        text-align: center;
        margin-top: 6rpx;
        white-space: nowrap;
        @include flexbox;
      }
    }

    .others {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .item-box-wrap {
        position: absolute;
        left: 50%;
        top: 50%;
        --y: 200px;
        --deg: 30deg;
        --delay: 20ms;
        transform: translate(-50%, -50%) rotateZ(var(--deg));
        $boxDu: 600ms;
        $lineDu: 1000ms;
        $disDu: 200ms;

        .line {
          position: absolute;
          z-index: 1;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          width: 1rpx;
          height: var(--y);
          background: rgba(#000000, 0.2);
          @keyframes line {
            from {
              height: 0;
            }
            to {
              height: var(--y);
            }
          }
          @keyframes iLine {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          animation: line backwards ease-in $lineDu calc(var(--delay) + #{$boxDu}),
          iLine linear infinite both alternate-reverse 5s calc(var(--delay) + #{$lineDu + $boxDu});
        }

        .distance {
          position: absolute;
          left: 50%;
          bottom: calc(var(--y) / 2);
          width: 1rpx;
          font-size: 18rpx;
          transform: translateX(-50%) translateY(50%) rotateZ(calc(-1 * var(--deg)));
          @keyframes distance {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          animation: distance linear both $disDu calc(var(--delay) + #{$boxDu+ $lineDu * 0.75});
        }

        .item-box {
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes rr {
            0% {
              transform: translate(-50%, -50%) translateY(calc(-1 * var(--y))) rotateZ(calc(-1 * var(--deg))) scale(1);
            }
            50% {
              transform: translate(-50%, -50%) translateY(calc(-1 * var(--y))) rotateZ(calc(-1 * var(--deg))) scale(1.04);
            }
            100% {
              transform: translate(-50%, -50%) translateY(calc(-1 * var(--y))) rotateZ(calc(-1 * var(--deg))) scale(1);
            }
          }
          @keyframes brink {
            from {

            }
            to {

            }
          }
          animation: fade-in ease-in backwards #{$boxDu - 400ms} var(--delay), rr ease-in-out both 400ms;
          transform: translate(-50%, -50%) translateY(calc(-1 * var(--y))) rotateZ(calc(-1 * var(--deg)));
        }
      }
    }

  }

  .info-live-number {
    width: 100%;
    text-align: center;
    margin: 64rpx 0 58rpx;
  }

  .actions-view {
    @include flexbox(s, b);

    .action-view-1 {
      @extend .action-view;
      height: 360rpx;
    }

    .action-view-2 {
      @extend .action-view;
      margin-bottom: 20rpx;
      width: 100% !important;
      height: 170rpx;

      .desc {
        margin-top: 0rpx !important;
      }
    }
  }
}

.action-view-width {
  width: 46%;

}

.action-view {
  @extend .action-view-width;
  box-sizing: border-box;
  padding: 32rpx 20rpx;
  @include flexbox(s, b, y);
  border-radius: 36rpx;
  //background: linear-gradient(312deg,
  //    rgba(42, 130, 228, 0.87) 0.56%,
  //    rgba(41, 227, 140, 0.24) 80%);
  background: linear-gradient(312deg, rgb(94 42 228 / 87%) 0.56%, rgb(255 191 191 / 24%) 80%);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.06), -2px -2px 6px rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(1px);

  .title-t {
    .label {
      font-size: 36rpx;
      color: hsl(249 75% 36% / 1);
      font-weight: bold;
    }

    .desc {
      font-size: 24rpx;
      margin-top: 18rpx;
    }
  }

  .action {
    @include hover;
    @include tag(2.2em, 1.4em);
    font-size: 24rpx;
    font-weight: bold;
    color: hsl(247.92deg 53% 51%);
    background: #c586bb;
  }
}
</style>
