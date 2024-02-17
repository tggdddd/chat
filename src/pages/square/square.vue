<template>
  <view class="page">
    <view :style="{marginTop:topPlaceholder+'px'}" class="navbar">
      <view class="tabs">
        <view v-for="(item,index) in tabList" :class="{active:tabActive==index}" class="tab"
              @click.stop="tabClick(item,index)">
          <view class="text">{{ item }}</view>
        </view>
      </view>
      <view class="notice  dot iconfont icon-tongzhi"></view>
    </view>
    <view class="tags">
      <view v-for="(item,index) in tagList" :class="{active:tagActive==index}" class="tag"
            @click.stop="tagClick(item,index)">
        <view class="text">{{ item }}</view>
      </view>
    </view>
    <view class="body-content">
      <view v-for="(item,index) in 6" class="card" @click.stop="cardClick(item,index)">
        <view class="card-head flex-container">
          <view class="left">
            <image class="avatar" lazyLoad mode="aspectFill" src="@/static/images/avatar.jpg"></image>
          </view>
          <view class="content">
            <view class="row">
              <view class="nickname">搜索搜索只是梦哆</view>
              <view class="sub-tag">你的关注</view>
            </view>
            <view class="row">
              <view class="time">刚刚发布</view>
            </view>
          </view>
          <view class="right">
            <view class="concat-btn">私聊</view>
            <view class="more iconfont icon-More" @click.stop="actionClick(item,index)"></view>
          </view>
        </view>
        <view class="topics">
          <view v-for="i in 6" class="topic">
            <view class="text">的撒法发</view>
          </view>
        </view>
        <view class="content-text">{{ "搜索".repeat(234) }}
        </view>
        <view class="voice">
          <view class="play"></view>
          <view class="sequence">
            <image class="origin" src="@/static/images/voiceSequence.svg"></image>
            <view :style="{width: '50%'}" class="progress-wrap">
              <image class="progress" src="@/static/images/voiceSequenceActive.svg"></image>
            </view>
          </view>
          <view class="times">11s</view>
        </view>
        <view class="vote">
          <view class="vote-question">
            <view class="text">
              <text class="iconfont icon-toupiao"></text>
              你会单独发顺丰的方式发放是否阿发访问方法是分为氛围分为氛围分为氛围服务
            </view>
          </view>
          <view class="vote-options">
            <view class="vote-option">
              <text class="text">我阿道夫大师傅我阿道夫大师傅我阿道夫大师傅</text>
              <view class="count">19991人</view>
            </view>
          </view>
        </view>
        <view class="images">
          <view v-for="i in 6" class="imageWrap">
            <image class="image" lazyLoad mode="aspectFill" src="@/static/images/avatar.jpg"></image>
          </view>
        </view>
        <view class="card-footer">
          <view class="item me-auto" @click.stop="shareClick(item,index)">
            <view class="iconfont icon-share-"></view>
            <view class="text">4.2k</view>
          </view>
          <view class="item">
            <view class="iconfont icon-aixin1" @click.stop="loveClick(item,index)"></view>
            <view class="text">22.6k</view>
          </view>
          <view class="item">
            <view class="iconfont icon-pinglun"></view>
            <view class="text">1.2k</view>
          </view>
        </view>
      </view>
    </view>

    <!--    弹窗-->
    <ShareModal v-model="shareModal"></ShareModal>
    <ActionModal v-model="actionModal"></ActionModal>

    <Tabber :value="1"></Tabber>
  </view>
</template>

<script lang="ts" setup>
import Tabber from "@/components/tabber.vue";
import ShareModal from "@/pages/square/components/shareModal.vue";
import ActionModal from "@/pages/square/components/actionModal.vue";

// 动态点击
function cardClick(item: any, index: number) {
  uni.navigateTo({
    url: "/pages/square/pages/squareDetail"
  })
}

const actionModal = ref(false)

function actionClick(item: any, index: number) {
  actionModal.value = true
}

//     分享弹窗
const shareModal = ref(false)

function shareClick(item: any, index: number) {
  shareModal.value = true
}

function loveClick(item: any, index: number) {

}

// 顶部列表
const topPlaceholder = uni.getSystemInfoSync().statusBarHeight
const tabList = ["关注", "推荐", "同城"];
const tabActive = ref(0);

function tabClick(item: any, index: number) {
  tabActive.value = index
}

//  顶部标签
const tagList = ["关注", "推荐", "同城"];
const tagActive = ref(0);

function tagClick(item: any, index: number) {
  tagActive.value = index
}</script>


<style lang="scss" scoped>
.page {
  padding: 0 24rpx;
}

.navbar {
  width: 100%;
  @include flexbox(c, b);

  .tabs {
    @include flexbox(e, s);
    padding: 0 24rpx;
    margin: 24rpx 0;

    .tab {
      margin-right: 48rpx;
      color: rgba(168, 168, 168, 1);
      font-weight: bold;
      font-size: 30rpx;
      width: fit-content;
      position: relative;

      .text {
        position: relative;
        z-index: 2;
      }

      &.active {
        color: black;
        font-size: 36rpx;
        font-weight: 800;
        position: relative;

        &::before {
          content: "";
          z-index: 1;
          position: absolute;
          left: 0;
          bottom: 0;
          transform: translate(-40%, 0);
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          background: linear-gradient(135deg, $theme-color 0%, rgba($theme-color, .3) 50%, #ffffff00 100%);
        }
      }
    }
  }

  .notice {
    font-size: 42rpx;
    position: relative;

    &.dot::after {
      content: "";
      width: 10rpx;
      height: 10rpx;
      border-radius: 50%;
      background: #f14343;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}

.tags {
  @include flexbox(c, s);
  margin-right: -24rpx;
  width: 100%;
  overflow: scroll;
  box-sizing: border-box;
  margin-top: 18rpx;

  .tag {
    @include tag(1.8em, 1.25em);
    font-size: 28rpx;
    font-weight: bold;
    margin-right: 24rpx;
    background: #f2f2f2;
    color: #cbcbcb;
    box-sizing: border-box;
    box-shadow: 2rpx 2rpx 6rpx rgba(#000, 0.05);

    &.active {
      background: lighten($theme-color, 45%);
      color: $theme-color;
    }

    @include hover;
  }
}

.card {
  box-sizing: border-box;
  width: 100%;
  margin: 48rpx auto 48rpx auto;

  .card-head {
    width: 100%;

    .left {
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
          margin-bottom: 2rpx;
        }

        margin-right: -6rpx;
        @include flexbox(c, s);

        .nickname {
          white-space: nowrap;
          font-size: 30rpx;
          font-weight: bold;
          margin-right: 6rpx;
          color: #727272;
        }

        .tag {
          margin-right: 4rpx;
          font-size: 28rpx;
          padding: 4rpx 12rpx;
          white-space: nowrap;
        }

        .sub-tag {
          @include tag();
          font-size: 28rpx;
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
        @include tag;
        border: 1rpx solid $theme-color;
        background: white;
        color: $theme-color;
        font-weight: bold;
        margin-right: 24rpx;
        @include hover;
      }

      .more {
        font-weight: bold;
        font-size: 30rpx;
      }
    }
  }

  .topics {
    display: flex;
    flex-wrap: wrap;
    margin: 12rpx -24rpx 12rpx 80rpx;

    .topic {
      margin-right: 24rpx;

      .text {
        color: $theme-color;

        &:hover {
          opacity: .6;
        }

        &::before {
          content: "#";
        }
      }
    }
  }

  .content-text {
    margin-top: 12rpx;
    font-weight: bold;
    font-size: 26rpx;
    margin-left: 80rpx;
    line-height: 1.8em;
    @include text-overflow(4);
  }

  .voice {
    margin: 12rpx 0 12rpx 80rpx;
    width: fit-content;
    height: 64rpx;
    @include flexbox(c, b);
    padding: 12rpx;
    box-sizing: border-box;
    border-radius: 36rpx;
    background: $theme-color;

    .play {
      width: 42rpx;
      height: 42rpx;
      border-radius: 50%;
      background: white;
      position: relative;
      @include flexbox;

      &::before {
        content: "";
        position: absolute;
        width: 50%;
        height: 50%;
        background: $theme-color;
        clip-path: polygon(20% 0%, 100% 50%, 20% 100%);
      }

      &.active {
        &::before {
          clip-path: none;
          border-radius: 2rpx;
          transform: scale(0.8);
        }
      }
    }

    .sequence {
      margin: 0 24rpx;
      width: 180rpx;
      height: 100%;
      position: relative;

      .origin, .progress-wrap, .progress {
        @include bgImg;
        width: 180rpx;
      }

      .progress-wrap {
        overflow: hidden;
      }
    }

    .times {
      font-size: 24rpx;
      color: white;
      padding-right: 12rpx;
    }
  }

  .vote {
    margin: 12rpx 0 12rpx 80rpx;
    font-size: 25rpx;

    .vote-question {
      display: flex;

      .text {
        .iconfont {
          color: $theme-color;
          margin-right: 4rpx;
        }

        font-weight: bold;
      }
    }

    .vote-options {
      .vote-option {
        margin: 10rpx 0;
        width: 100%;
        border-radius: calc(.5em + 12rpx);
        background: lighten($theme-color, 46%);
        padding: 12rpx 168rpx 12rpx 12rpx;
        box-sizing: border-box;
        position: relative;

        .text {
          position: relative;
          color: #7e7e7e;
        }

        .count {
          position: absolute;
          right: 24rpx;
          top: 50%;
          opacity: .7;
          transform: translateY(-50%);
          font-size: .8em;
        }

        --per: 10%;

        &::before {
          content: "";
          width: var(--per);
          height: 100%;
          background: rgba(lighten($theme-color, 32%), .3);
          border-radius: inherit;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }

  .images {
    margin: 24rpx -12rpx 24rpx 80rpx;
    @include flexbox(c, s);
    flex-wrap: wrap;

    .imageWrap {
      position: relative;
      width: 180rpx;
      height: 180rpx;
      border-radius: 8rpx;
      overflow: hidden;
      margin-right: 12rpx;
      margin-bottom: 12rpx;

      .image {
        @include bgImg;
      }

      &:nth-child(6) {
        &::after {
          content: "查看更多+";
          font-size: 28rpx;
          text-align: center;
          @include flexbox;
          color: #cfcfcf;
          @include bgImg;
          background: rgba(#202020, .8);

        }
      }
    }

  }

  .card-footer {
    display: flex;
    margin: 24rpx 0 24rpx 80rpx;

    .item {
      font-size: 30rpx;
      @include flexbox(c, c);
      color: #b2b2b2;

      &:last-child {
        margin-left: 12rpx;
      }

      .iconfont {
        font-size: 38rpx;
        margin-right: 4rpx;
      }

      .text {

      }

    }
  }
}

</style>
