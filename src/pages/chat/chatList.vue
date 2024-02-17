<script lang="ts" setup>
import Tabber from "@/components/tabber.vue";
import {ChatListSortEnum} from "@/interface";
import Tooltip from "@/components/Tooltip.vue";
// 顶部列表
const topPlaceholder = uni.getSystemInfoSync().statusBarHeight
const tabList = ["通讯录", "消息"];
const tabActive = ref(1);
const sortTooltipModel = ref(false);
const sortTooltipList = ref(['默认排序', '当前在线', '聊天室中', '未读']);
const sortTooltipCurrent = ref<ChatListSortEnum>(ChatListSortEnum.UNREAD);

function sortTooltipClick(item: any, index: number) {
  sortTooltipCurrent.value = index
  sortTooltipModel.value = false
}

const emits = defineEmits(["change"])

function tabClick(item: any, index: number) {
  // tabActive.value = index
  emits("change", index)
}

function sortClick() {
  sortTooltipModel.value = true
}

function starClick() {
  uni.navigateTo({
    url: "/pages/chat/pages/starNews"
  })
}

function lookClick() {
  uni.navigateTo({
    url: "/pages/chat/pages/whoSeeMe"
  })
}

function loveClick() {
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
      <view class="right-actions">
        <Tooltip v-model="sortTooltipModel">
          <view class="right-action" @click.stop="sortClick">
            <view class="text">排序</view>
            <view class="icon down"></view>
          </view>
          <template #content>
            <view class="sortTooltip">
              <view v-for="(item,index) in sortTooltipList" :class="{active:index==sortTooltipCurrent}"
                    class="sortTooltipItem iconfont icon-zhengquetishi" @click.stop="sortTooltipClick(item,index)">
                {{ item }}
              </view>
            </view>
          </template>
        </Tooltip>
        <view class="right-action">
          <view class="text tag">
            已读
          </view>
        </view>
      </view>
    </view>
    <view class="searchBar">
      <view class="iconfont icon-sousuo"></view>
      <input class="input" placeholder="添加好友" type="text"/>
      <!--    //todo 搜索列表 下拉-->
    </view>
    <view class="tags">
      <view class="tagItem" @click.stop="starClick">
        <image class="icon" mode="aspectFill" src="@/static/images/color/star.svg"></image>
        <view class="text">最新关注</view>
      </view>
      <view class="tagItem" @click.stop="lookClick">
        <image class="icon" mode="aspectFill" src="@/static/images/color/time.svg"></image>
        <view class="text">谁看过我</view>
      </view>
      <view class="tagItem" @click.stop="loveClick">
        <image class="icon" mode="aspectFill" src="@/static/images/color/love.svg"></image>
        <view class="text">谁喜欢我</view>
      </view>
    </view>
    <view class="list">
      <view v-for="i in 30" class="list-item flex-container">
        <image class="avatar left" mode="aspectFill" src="@/static/images/avatar.jpg"/>
        <view class="content">
          <view class="row">
            <view class="nickname">帆帆发现</view>
            <!--            <-- //todo 标签 -->
            <view class="tag">412</view>
          </view>
          <view class="message">尬得噶哈嘎嘎王鹏飞万富翁发我发我尬得噶哈嘎嘎王鹏飞万富翁发我发我</view>
        </view>
        <view class="right">
          <view class="time">现在</view>
        </view>
      </view>
    </view>
    <Tabber :active="3"/>
  </view>
</template>

<style lang="scss" scoped>
.page {
  padding: 0 24rpx;
  background: white;
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
  background: white;

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

  .right-actions {
    @include flexbox;
    margin-right: -24rpx;

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

    .right-action {
      @include hover {
        opacity: .72;
        box-shadow: unset;
        transform: unset;
      }
      margin-right: 24rpx;
      @include flexbox;

      .text {
        font-size: 26rpx;
        color: #1a1a1a;
        font-weight: bold;

        &.tag {
          background: #cccccc;
          width: 3.2em;
          font-size: 24rpx;
          box-sizing: border-box;
          height: 32rpx;
          line-height: 32rpx;
          border-radius: 10rpx;
          text-align: center;
          color: #fcfcfc;
        }
      }

      .icon {
        margin-left: 6rpx;
        width: 0;
        height: 0;
        border: 8rpx solid transparent;
        border-top-color: #2b2b2b;
        transform: translateY(25%);
      }

      .iconfont {

      }
    }
  }
}

.searchBar {
  background: rgba(#000000, .04);
  width: 100%;
  height: 62rpx;
  line-height: 62rpx;
  border-radius: 34rpx;
  box-sizing: border-box;
  position: relative;
  padding: 0 72rpx;

  .iconfont {
    position: absolute;
    left: 24rpx;
    top: 50%;
    transform: translateY(-50%);
    color: #c4c4c4;
  }

  input {
    font-size: 23rpx;
    line-height: 62rpx;
    height: 62rpx;
  }
}

.tags {
  @include flexbox(c, a);
  margin-top: 24rpx;

  .tagItem {
    @include flexbox(c, s, y);

    .icon {
      width: 72rpx;
      height: 72rpx;
    }

    .text {
      margin-top: 6rpx;
      font-size: 22rpx;
      font-weight: bold;
      text-align: center;
    }
  }
}

.list {
  box-sizing: border-box;

  .list-item {
    box-sizing: border-box;
    margin: 48rpx 0;

    .avatar {
      box-sizing: border-box;
      width: 84rpx;
      height: 84rpx;
      border-radius: 50%;
      margin-right: 36rpx;
    }

    .content {
      @include flexbox(s, c, y);
      box-sizing: border-box;

      .row {
        margin-top: 2rpx;
        @include flexbox(c, c);
        box-sizing: border-box;

        .nickname {
          font-size: 30rpx;
          font-weight: bold;
        }

        .tag {
          margin-left: 6rpx;
          font-size: 26rpx;
          font-weight: bold;
        }
      }

      .message {
        box-sizing: border-box;
        font-size: 29rpx;
        color: #b0b0b0;
        margin-top: 16rpx;
        @include text-overflow(1);
      }
    }

    .right {
      box-sizing: border-box;
      font-size: 24rpx;
      color: #b0b0b0;
      align-self: flex-start;
    }
  }
}
</style>