<script lang="ts" setup>
import Tabber from "@/components/tabber.vue";
import Tooltip from "@/components/Tooltip.vue";
// 顶部列表
const topPlaceholder = uni.getSystemInfoSync().statusBarHeight
const tabList = ["通讯录", "消息"];
const tabActive = ref(0);
const emits = defineEmits(["change"])

function tabClick(item: any, index: number) {
  emits("change", index)
}

// 聊天顶部
const listTabCurrent = ref(0)

function listTabClick(index: number) {
  listTabCurrent.value = index
}

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
</script>

<template>
  <view class="page">
    <view style="height: 44px;"></view>
    <view :style="{paddingTop:topPlaceholder+'px'}" class="navbar">
      <view class="tabs">
        <view v-for="(item,index) in tabList" :class="{active:tabActive==index}" class="tab"
              @click.stop="tabClick(item,index)">
          <view class="text">{{ item }}</view>
        </view>
      </view>
    </view>
    <view class="infoList">
      <view class="item flex-container">
        <view class="content">关注我</view>
        <view class="right">
          <view class="text">2</view>
          <view class="iconfont icon-arrow-right-copy"></view>
        </view>
      </view>
      <view class="item flex-container">
        <view class="content">好友</view>
        <view class="right">
          <view class="text">2</view>
          <view class="iconfont icon-arrow-right-copy"></view>
        </view>
      </view>
      <view class="item flex-container">
        <view class="content">亲密挚友</view>
        <view class="right">
          <view class="text">2</view>
          <view class="iconfont icon-arrow-right-copy"></view>
        </view>
      </view>
      <view class="item flex-container">
        <view class="content">备注过</view>
        <view class="right">
          <view class="text">2</view>
          <view class="iconfont icon-arrow-right-copy"></view>
        </view>
      </view>
      <view class="item flex-container">
        <view class="content">群聊</view>
        <view class="right">
          <view class="text">2</view>
          <view class="iconfont icon-arrow-right-copy"></view>
        </view>
      </view>
    </view>
    <view class="list-box">
      <view class="list-header">
        <view class="list-header-tabs">
          <view :class="{active:listTabCurrent==0}" class="list-header-tab" @click.stop="listTabClick(0)">我关注（24）
          </view>
          <view :class="{active:listTabCurrent==1}" class="list-header-tab" @click.stop="listTabClick(1)">
            我是TA的铁粉（0）
          </view>
        </view>
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

      </view>
      <view class="list">
        <view v-for="i in 5" class="item flex-container">
          <view class="left">
            <image class="avatar" lazyLoad mode="aspectFill" src="@/static/images/avatar.jpg"></image>
          </view>
          <view class="content">
            <view class="row">
              <view class="nickname">搜索搜索只是梦哆</view>
              <view class="sex iconfont icon-nv"></view>
            </view>
            <view class="row">
              <view class="time">刚刚发布</view>
            </view>
          </view>
          <view class="right">
            <view class="concat-btn">邀请回关</view>
          </view>
        </view>
        <view class="item flex-container">
          <view class="left">
            <image class="avatar" lazyLoad mode="aspectFill" src="@/static/images/avatar.jpg"></image>
          </view>
          <view class="content">
            <view class="row">
              <view class="nickname">搜索搜索只是梦哆</view>
              <view class="sex iconfont icon-nv"></view>
            </view>
            <view class="row">
              <view class="time">刚刚发布</view>
            </view>
          </view>
          <view class="right">
            <view class="concat-btn plain">聊天</view>
          </view>
        </view>
      </view>
    </view>
    <Tabber :active="3"/>
  </view>
</template>

<style lang="scss" scoped>
.page {
  background: $bg-color;
  padding: 0 24rpx;
}

.navbar {
  z-index: 2;
  padding: 0 24rpx;
  width: 100%;
  @include flexbox(c, b);
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  height: 44px;
  background: #FFF;

  .tabs {
    @include flexbox(e, s);
    padding: 0 24rpx;
    margin: 24rpx 0;

    .tab {
      margin-right: 48rpx;
      color: rgba(168, 168, 168, 1);
      font-weight: bold;
      font-size: 28rpx;
      width: fit-content;
      position: relative;

      .text {
        position: relative;
        z-index: 2;
      }

      &.active {
        color: black;
        font-size: 32rpx;
        font-weight: 800;
        position: relative;

        &::before {
          content: "";
          z-index: 1;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate(-50%, 0);
          width: 50rpx;
          height: 16rpx;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba($theme-color, .4) 0%, rgba($theme-color, .1) 100%);
          box-shadow: 0 0 26rpx rgba($theme-color, .3);
        }
      }
    }
  }
}

.infoList {
  background: #FFF;
  box-shadow: 24rpx 0 #FFF, -24rpx 0 #FFF;

  .item {
    @include hover {
      transform: none;
      opacity: .8;
      background: #eeeeee;
      box-shadow: 36rpx 0 #eeeeee, -36rpx 0 #eeeeee;
    }

    &:not(:last-child) {
      border-bottom: 1rpx solid #00000008;
    }

    box-sizing: border-box;
    padding: 24rpx 12rpx;

    .content {
      font-weight: bold;
      font-size: 28rpx;
    }

    .right {
      @include flexbox;
      font-size: 22rpx;
      font-weight: bold;
      color: #9f9f9f;

      .iconfont {
        font-weight: normal;
        color: #cfcfcf;
        margin-left: 12rpx;
      }
    }
  }
}

.list-box {

  background: #FFF;
  box-shadow: 24rpx 0 #FFF, -24rpx 0 #FFF;
  box-sizing: border-box;
  margin-top: 24rpx;
  border-bottom: 1rpx solid #FFF;

  .list-header {
    @include flexbox(c, b);
    padding: 24rpx 0 24rpx 12rpx;
    box-sizing: border-box;
    border-bottom: 1rpx solid #00000008;

    .list-header-tabs {
      @include flexbox(c, s);
      margin-right: -24rpx;

      .list-header-tab {
        font-size: 26rpx;
        font-weight: bold;
        color: $sub-color;
        margin-right: 24rpx;

        &.active {
          color: $main-color;
        }
      }
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

  }

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