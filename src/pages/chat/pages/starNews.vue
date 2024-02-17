<script lang="ts" setup>
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
        <text style="font-weight: bold;font-size: 28rpx">最新关注</text>
      </template>
    </u-navbar>
    <view class="list-box">
      <view class="list-title">最新</view>
      <view class="list">
        <view v-for="i in 3" class="item flex-container">
          <view class="left">
            <image class="avatar" lazyLoad mode="aspectFill" src="@/static/images/avatar.jpg"></image>
          </view>
          <view class="content">
            <view class="row">
              <view class="nickname">搜索搜索只是梦哆</view>
              <view class="text">
                关注了你
              </view>
            </view>
            <view class="row">
              <view class="time">12小时前</view>
            </view>
          </view>
          <view class="right">
            <view class="concat-btn  plain">
              聊天
            </view>
          </view>
        </view>
        <view v-for="i in 3" class="item flex-container">
          <view class="left">
            <image class="avatar" lazyLoad mode="aspectFill" src="@/static/images/avatar.jpg"></image>
          </view>
          <view class="content">
            <view class="row">
              <view class="nickname">搜索搜索只是梦哆</view>
              <view class="text">
                喜欢你的动态
              </view>
            </view>
            <view class="row">
              <view class="time">12小时前</view>
            </view>
          </view>
          <view class="right">
            <view class="concat-btn plain">
              回关
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<style lang="scss" scoped>
.page {
  padding: 0 24rpx;
  box-sizing: border-box;
  min-height: 100vh;
  background: #FEFEFE;
}

.list-box {
  background: #fefefe;
  box-shadow: 24rpx 0 #FEFEFE, -24rpx 0 #FEFEFE;

  .list-title {
    height: 60rpx;
    line-height: 60rpx;
    font-size: 22rpx;
    color: $sub-color;
  }

  .list {
    background: #FFF;
    box-shadow: 24rpx 0 #FFF, -24rpx 0 #FFF;
    box-sizing: border-box;
    border-bottom: 1rpx solid #FFF;

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
            color: $main-color;
          }

          .text {
            white-space: nowrap;
            font-size: 26rpx;
            font-weight: bold;
            margin-right: 6rpx;
            color: $sub-color;

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