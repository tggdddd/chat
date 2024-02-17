<script lang="ts" setup>
import Tabber from "@/components/tabber.vue";
import {onPageScroll} from "@dcloudio/uni-app";

// tab
const tabCurrent = ref(0)

function tabClick(index: number) {
  tabCurrent.value = index
}


const navBgColor = ref("#FFFFFF00")
onPageScroll((e) => {
  navBgColor.value = "#FFFFFF" + Math.min(e.scrollTop / 2, 255).toString(16)
});
const navHeight = ref(44)
onMounted(() => {
  navHeight.value = (uni.getSystemInfoSync().statusBarHeight || 0) + 44
})
</script>

<template>
  <view class="page">
    <u-navbar :bg-color="navBgColor">
      <template #left/>
      <template #right>
      </template>
    </u-navbar>
    <view :style="{paddingTop: navHeight+'px'}" class="box-1">
      <view class="userInfo flex-container">
        <image class="avatar left" mode="scaleToFill" src="@/static/images/avatar.jpg"></image>
        <view class="userInfoRight content">
          <view class="nickname">发生士大夫发</view>
          <view class="age">
            <view class="iconfont icon-nan"></view>
            <view class="text">22</view>
          </view>
        </view>
        <view class="right">
          <view class="soundBox">
            <view class="iconfont"></view>
            <view class="text">交友发言</view>
          </view>
        </view>
      </view>
      <view class="box-1-1">
        <view class="box-1-1-tabs">
          <view class="item">
            <view class="value">23</view>
            <view class="label">我关注</view>
          </view>
          <view class="item">
            <view class="value">23</view>
            <view class="label">关注度</view>
          </view>
          <view class="item">
            <view class="value">23</view>
            <view class="label">陪伴榜</view>
          </view>
        </view>
        <view class="box-1-1-love">
          <view class="iconfont icon-aixin1"></view>
          <view class="text">0</view>
        </view>
      </view>
      <view class="box-1-2">
        <view class="tags">
          <view v-for="i in 8" class="tag">白羊座</view>
        </view>
        <view class="plus">
          <view class="plus-body">
            <view class="iconfont icon-jiahao"></view>
            <view class="text">添加</view>
          </view>
        </view>
      </view>
      <view class="remark">
        今天也是元气慢慢的一天
        <view class="iconfont icon"></view>
      </view>
    </view>
    <view class="box-2">
      <view class="tabs">
        <view :class="{active:tabCurrent==0}" class="tab" @click.stop="tabClick(0)">动态</view>
        <view :class="{active:tabCurrent==1}" class="tab" @click.stop="tabClick(1)">亲密挚友</view>
      </view>
      <view class="list">
        <view class="list-item">
          <view class="list-item-header">
            <view class="date"></view>
            <view class="iconfont icon-more"></view>
          </view>
          <view class="content"></view>
          <view class="location"></view>
        </view>
      </view>
    </view>
    <Tabber :active="4"/>
  </view>
</template>
<style lang="scss" scoped>
.page {
  width: 100%;
  box-sizing: border-box;
}

.box-1 {
  background: radial-gradient(farthest-corner at top left, darken($theme-color, 5%) 0%, darken($theme-color, 40%) 100%);
  color: #ffffff;
  padding: 48rpx 0;

  .userInfo {
    padding: 24rpx;
    position: relative;

    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      margin-right: 24rpx;
    }

    .userInfoRight {
      @include flexbox(s, c, y);

      .nickname {
        font-size: 34rpx;
        font-weight: bold;
        white-space: nowrap;
      }

      .age {
        font-size: 22rpx;
        margin-top: 12rpx;
        @include flexbox;
        @include tag(1.25em, .6em);
        background: #02e1fe;

        .iconfont {
          font-size: 0.9em;
          margin-right: 4rpx;
          font-weight: normal;
        }

        .text {
        }
      }
    }

    .right {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;

      .soundBox {
        @include flexbox;
        background: linear-gradient(to right, adjust-hue(lighten($theme-color, 30%), .5), desaturate($theme-color, 10%) 100%);
        padding: 24rpx 12rpx 24rpx 64rpx;
        height: 72rpx;
        font-size: 24rpx;
        box-sizing: border-box;
        border-top-left-radius: 36rpx;
        border-bottom-left-radius: 36rpx;
        font-weight: bold;
        position: relative;

        &::before, &::after {
          content: "";
          position: absolute;
          right: 0;
          width: 16rpx;
          height: 12rpx;
        }

        &::before {
          top: -12rpx;
          background: radial-gradient(farthest-corner at 0 0, transparent 60%, darken($theme-color, 4%) 50%);
          border-bottom: 1.5rpx solid darken($theme-color, 4%);

        }

        &::after {
          border-top: 1.5rpx solid darken($theme-color, 4%);
          bottom: -12rpx;
          background: radial-gradient(farthest-corner at 0 100%, transparent 60%, darken($theme-color, 4%) 50%);
        }

        .iconfont {
          position: absolute;
          left: 12rpx;
          border-radius: 50%;
          top: 50%;
          color: inherit;
          transform: translateY(-50%);
          border: 1rpx solid currentColor;
          width: 40rpx;
          height: 40rpx;
          background: linear-gradient(-35deg, adjust-hue($theme-color, .2), lighten($theme-color, 40%));

          &::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 0;
            height: 0;
            border: 10rpx solid transparent;
            border-right-width: 14rpx;
            border-left: 14rpx currentColor solid;
            transform: translate(-20%, -50%);
          }
        }

        .text {
        }
      }
    }
  }

  .box-1-1 {
    @include flexbox(c, b);
    padding: 0 24rpx;
    margin-top: 24rpx;

    .box-1-1-tabs {
      @include flexbox(c, s);

      .item {
        width: 160rpx;

        .value {
          font-size: 34rpx;
          font-weight: bold;
        }

        .label {
          margin-top: 12rpx;
          font-size: 24rpx;
          color: rgba(white, .7);
        }
      }
    }

    .box-1-1-love {
      @include flexbox(c, c);

      .iconfont {
        font-size: 38rpx;
        margin-right: 12rpx;
        font-weight: 400;
        opacity: .7;
      }

      .text {
        font-size: 28rpx;
      }
    }
  }

  .box-1-2 {
    position: relative;
    margin-top: 24rpx;
    box-sizing: border-box;
    padding: 0 24rpx;
    @include flexbox(c, b);
    height: 32rpx;

    .tags {
      @include flexbox(c, s);
      overflow: scroll;
      flex-grow: 1;

      .tag {
        font-size: 24rpx;
        white-space: nowrap;
        color: rgba(white, .8);
        margin-right: 12rpx;
      }
    }

    .plus {
      flex-shrink: 0;
      padding-left: 24rpx;
      margin-left: -24rpx;
      border-top-left-radius: .5em;
      border-bottom-left-radius: .5em;
      overflow: hidden;
      height: 100%;

      .plus-body {
        border-top-left-radius: .5em;
        border-bottom-left-radius: .5em;
        height: 110%;
        @include flexbox;
        color: #FFFFFFA0;
        font-size: 22rpx;
        white-space: nowrap;
        box-shadow: 0 0 24rpx #ffffffa0;
        line-height: 1;

        .iconfont {
          font-size: 22rpx;
        }

        .text {
          white-space: nowrap;
        }
      }
    }

    .remark {
      .iconfont {
      }
    }
  }

  .remark {
    font-size: 24rpx;
    white-space: nowrap;
    color: rgba(white, .8);
    margin-top: 12rpx;
    box-sizing: border-box;
    padding: 0 24rpx;
  }
}

.box-2 {
  margin-top: -24rpx;
  background: white;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  padding: 24rpx;

  .tabs {
    @include flexbox(c, s);

    .tab {
      font-weight: bold;
      font-size: 28rpx;
      margin-right: 48rpx;
      box-sizing: border-box;
      height: 48rpx;
      position: relative;
      color: $sub-color;

      &.active {
        color: $main-color;

        &::before {
          content: "";
          width: 24rpx;
          height: 4rpx;
          border-radius: 2rpx;
          background: currentColor;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>
