<script lang="ts" setup>
import Tooltip from "@/components/Tooltip.vue";
// 筛选
const filterModel = ref(false)
const filterList = ref(['默认', '聊天室中', '有新动态'])
const filterCurrent = ref(0)

function filterModalOpen() {
  filterModel.value = true
}

function filterClick(item: any, index: number) {
  filterCurrent.value = index
}


const safeAreaBottom = ref(0);
onMounted(() => {
  const info = uni.getSystemInfoSync()
  safeAreaBottom.value = info.safeAreaInsets?.bottom || 0
})

function backClick() {
  uni.navigateBack()
}

</script>

<template>
  <view class="page">
    <u-navbar id="nav" :placeholder="true" bg-color="white">
      <template #left>
        <view class="iconfont icon-jiantou" style="font-size: 42rpx" @click.stop="backClick"></view>
      </template>
      <template #center>
        <text style="font-weight: bold;font-size: 28rpx">谁看过我</text>
      </template>
      <template #right>
        <Tooltip v-model="filterModel">
          <view class="list-header-right" @click="filterModalOpen">
            <text class="iconfont icon-shaixuan"></text>
            筛选
          </view>
          <template #content>
            <view class="sortTooltip">
              <view v-for="(item,index) in filterList" :class="{active:index==filterCurrent}"
                    class="sortTooltipItem iconfont icon-zhengquetishi" @click.stop="filterClick(item,index)">
                {{ item }}
              </view>
            </view>
          </template>
        </Tooltip>
      </template>
    </u-navbar>
    <view class="list-box">
      <view class="list">
        <view v-for="i in 3" class="item flex-container">
          <view class="left">
            <image class="avatar" lazyLoad mode="aspectFill" src="@/static/images/avatar.jpg"></image>
          </view>
          <view class="content">
            <view class="row">
              <view class="nickname">搜索搜索只是梦哆</view>
              <view class="sex iconfont icon-nv"></view>
            </view>
            <view class="row">
              <view class="time">12小时前</view>
              <view class="time ms-4">看过我的聊天室资料卡片</view>
            </view>
          </view>
          <view class="right">
            <view class="text">1次</view>
          </view>
        </view>
        <view v-for="i in 3" class="item flex-container">
          <view class="left">
            <image class="avatar" lazyLoad mode="aspectFill" src="@/static/images/avatar.jpg"></image>
          </view>
          <view class="content">
            <view class="row">
              <view class="nickname">搜索搜索只是梦哆</view>
              <view class="sex iconfont icon-nv"></view>
            </view>
            <view class="row">
              <view class="time">12小时前</view>
              <view class="time ms-4">看过我的资料</view>
            </view>
          </view>
          <view class="right">
            <view class="text">4次</view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<style lang="scss" scoped>
.page {
  padding: 0 24rpx;
  background: white;
  box-sizing: border-box;
  min-height: 100vh;
}

.list-header-right {
  font-weight: bold;
  font-size: 22rpx;

  .iconfont {
    font-size: 20rpx;
  }

  @include tag(2em);
  background-color: rgba(#000, 0.04);
}

.sortTooltip {
  @include flexbox(c, b, y);

  .sortTooltipItem {
    white-space: nowrap;
    box-sizing: border-box;
    border-bottom: 1rpx solid #00000010;
    @include flexbox(c, b);
    padding: 18rpx 86rpx 18rpx 24rpx;
    font-size: 20rpx;
    font-weight: bold;
    color: #2b2b2b;
    position: relative;
    width: 100%;

    &::before {
      position: absolute;
      right: 20rpx;
      top: 50%;
      transform: translateY(-50%);
      font-weight: normal;
      opacity: 0;
    }

    &.active {
      color: $theme-color;

      &::before {
        opacity: 1;
      }
    }
  }
}

.list-box {
  background: #FFF;
  box-shadow: 24rpx 0 #FFF, -24rpx 0 #FFF;
  box-sizing: border-box;
  border-bottom: 1rpx solid #FFF;

  .list {
    .item {
      width: 100%;
      margin-bottom: 24rpx;

      .left {
        @include flexbox();
        width: 120rpx;
        height: 120rpx;

        .avatar {
          width: 78rpx;
          height: 78rpx;
          border-radius: 50%;
          margin-right: 12rpx;
        }
      }

      .content {
        @include flexbox(s, b, y);

        .row {
          &:nth-child(1) {
            margin-bottom: 8rpx;
          }

          margin-right: -6rpx;
          @include flexbox(c, s);

          .nickname {
            white-space: nowrap;
            font-size: 26rpx;
            font-weight: bold;
            margin-right: 6rpx;
            color: #000000;
          }

          .sex {
            position: relative;
            @include flexbox;
            font-size: 22rpx;
            box-sizing: border-box;
            border-radius: 50%;
            color: black;
            width: 28rpx;
            height: 28rpx;
            margin-left: 4rpx;

            &.icon-nv {
              background: #f2c3e0;
            }

            &.icon-nan {
              background: #80dded;
            }
          }

          .tag {
            margin-right: 4rpx;
            font-size: 24rpx;
            padding: 4rpx 12rpx;
            white-space: nowrap;
          }

          .sub-tag {
            @include tag();
            font-size: 24rpx;
            color: #d2d2d2;
            background: #efefef;
            font-weight: bold;
            margin-left: 6rpx;
          }

          .time {
            font-size: 24rpx;
            color: #7e7e7e;
          }
        }
      }

      .right {
        @include flexbox;

        .text {
          font-size: 23rpx;
        }

        .concat-btn {
          font-size: 23rpx;
          height: 48rpx;
          border-radius: 24rpx;
          line-height: 48rpx;
          width: 128rpx;
          text-align: center;
          background: $theme-color;
          box-sizing: border-box;
          color: white;
          font-weight: bold;
          @include hover;

          &.plain {
            background: rgba(#000000, 0.04);
            color: $main-color;
          }
        }

        .more {
          font-weight: bold;
          font-size: 30rpx;
        }
      }
    }

  }
}
</style>