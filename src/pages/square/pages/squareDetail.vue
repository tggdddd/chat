<script lang="ts" setup>
import ActionModal from "@/pages/square/components/actionModal.vue";
import ShareModal from "@/pages/square/components/shareModal.vue";
import emojiMap from "@/static/emojMap.json"
import SimpleList from "@/components/SimpleList.vue";

const thumb = ref(false)
//输入
const commentInput = ref("")
const emojiList = ref(emojiMap)
const emojiListPage = ref(Math.floor((emojiMap.length + 23) / 24))
const emojiPanelShow = ref(false)
const commentInputFocus = ref(false)
const emojiPageCurrent = ref(0)
// 评论
const commentList = ref<any>([]);
const commentHasMore = ref(true)
const commentTarget = ref(0)
const commentTargetUser = ref<null | string>(null)

function fetchCommentData() {
  return new Promise((resolve) => {
    setTimeout(
        () => {
          if (commentList.value.length > 20) {
            resolve(false);
            commentHasMore.value = false
            return
          }
          commentList.value = [
            ...commentList.value,
            1, 2, 3, 4, 5
          ]
          resolve(true)
        }, 2000)
  })
}

function commentToComment(item: any, index: number) {
  // todo 对接修改为id
  commentTarget.value = item
  commentTargetUser.value = "回复" + item + "："
  commentInputFocus.value = true
}


function sendCommentClick() {
  commentInput.value = ""
}

function commentInputDel() {
  if (commentInput.value.length) {
    commentInput.value = commentInput.value.substring(0, commentInput.value.length - 1)
  }
}

function emojiClick(item: any) {
  commentInput.value += item.code
}

function keyboardHeightChange(e) {
  if (e.detail.height == 0) {
    commentTargetUser.value = null;
    commentTarget.value = 0
    commentInputFocus.value = false;
  }
}

function changeEmojiPageClick(e: any) {
  emojiPageCurrent.value = e.detail.current
}

function thumbsClick() {
  thumb.value = !thumb.value;
  if (!thumb.value) {
    commentInputFocus.value = true
  }
}

const tagList = ref(['评论', '点赞'])
const tagActive = ref(0)

function tagClick(item: any, index: number) {
  tagActive.value = index
}

const actionModal = ref(false)
const shareModal = ref(false)

function shareClick(item: any, index: number) {
  shareModal.value = true
}

function commentClick() {
  commentTargetUser.value = null;
  commentTarget.value = 0
  commentInputFocus.value = true;
}

function backClick() {
  uni.navigateBack()
}

function inputEmojiClick() {
  emojiPanelShow.value = !emojiPanelShow.value
}

function moreClick() {
  actionModal.value = true
}

const safeAreaBottom = ref(0);
onMounted(() => {
  const info = uni.getSystemInfoSync()
  safeAreaBottom.value = info.safeAreaInsets?.bottom || 0
})
</script>

<template>
  <view class="page">
    <u-navbar id="nav" :placeholder="true" bg-color="#f4f4f4">
      <template #left>
        <view class="iconfont icon-jiantou" style="font-size: 42rpx" @click.stop="backClick"></view>
      </template>
      <template #center>
        <text style="font-weight: bold;font-size: 28rpx">动态详情</text>
      </template>
      <template #right>
        <view class="iconfont icon-shenglvehao" style="font-size: 42rpx" @click.stop="moreClick"></view>
      </template>
    </u-navbar>
    <view class="card">
      <view class="card-head flex-container">
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
          <view class="concat-btn">私聊</view>
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
            <text class="text">我阿道夫大师傅我阿道夫大师傅我阿道夫大傅</text>
            <view class="count">19991人</view>
          </view>
        </view>
      </view>
      <view class="images">
        <view v-for="i in 6" class="imageWrap">
          <image class="image" lazyLoad mode="aspectFill" src="@/static/images/avatar.jpg"></image>
        </view>
      </view>
      <view class="location">
        <view class="iconfont icon-weizhi"></view>
        <view class="text">广东</view>
      </view>
      <view class="card-footer">
        <view class="item" @click="thumbsClick">
          <view :class="[thumb?'icon-aixin':'icon-aixin1']" class="iconfont"></view>
          <view class="text">22.6k</view>
        </view>
        <view class="item" @click="commentClick">
          <view class="iconfont icon-pinglun"></view>
          <view class="text">1.2k</view>
        </view>
        <view class="item" @click.stop="shareClick">
          <view class="iconfont icon-share-"></view>
          <view class="text">4.2k</view>
        </view>
      </view>
    </view>
    <view id="box" class="panelBox">
      <view class="panelBox-header" style="position:sticky;top: 44px;">
        <view class="tags">
          <view v-for="(item,index) in tagList" :class="{active:tagActive==index}" class="tag"
                @click.stop="tagClick(item,index)">{{ item }}
          </view>
        </view>
        <view class="number">
          19{{ tagActive == 0 ? ' 评论' : ' 点赞' }}
        </view>
      </view>
      <SimpleList :data="commentList" :fetchFunc="fetchCommentData"
                  :has-more="commentHasMore">
        <view v-for="(item,index) in commentList" class="comment">
          <view class="comment-head flex-container">
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
              <view class="iconfont icon-pinglun-pinglunxiamian" @click.stop="commentToComment(item,index)"></view>
            </view>
          </view>
          <view class="comment-text">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</view>

          <view class="comment-response">
            <view v-for="(iitem,iindex) in 3" class="comment">
              <view class="comment-head flex-container">
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
                  <view class="iconfont icon-pinglun-pinglunxiamian"
                        @click.stop="commentToComment(iitem,iindex)"></view>
                </view>
              </view>
              <view class="comment-text">
                <text class="tips">回复空白格：</text>
                啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
              </view>
            </view>
          </view>
        </view>
      </SimpleList>
    </view>
    <view style="height: 120rpx;"></view>
    <view :style="{paddingBottom:safeAreaBottom}" class="footer-box">
      <view class="input-box">
        <view class="input-box-bar">
          <input v-model="commentInput" :focus="commentInputFocus"
                 :hold-keyboard="true" :placeholder="commentTargetUser==null?'请输入消息....':commentTargetUser"
                 type="text" @keyboardheightchange="keyboardHeightChange"/>
          <view :class="[emojiPanelShow?'icon-jianpanb':'icon-xiaolian']" class="icon iconfont"
                @click.stop="inputEmojiClick"></view>
        </view>
        <view class="right-box" @click.stop="thumbsClick">
          <view :class="[thumb?'icon-aixin':'icon-aixin1']" class="iconfont"></view>
          <view :class="{active:commentInput.length>0}" class="sendBtn" @click.stop="sendCommentClick">发送</view>
        </view>
      </view>
      <view :class="{active:emojiPanelShow}" class="emojiPanel">
        <swiper :acceleration="false" :current="emojiPageCurrent" class="emojiPanelSwiper"
                @change="changeEmojiPageClick">
          <swiper-item v-for="(i,j) in emojiListPage">
            <view class="emojiPanelSwiperItem">
              <template v-for="(item,index) in 24">
                <view v-if="(index+j*24)<emojiList.length" class="item" @click.stop="emojiClick(emojiList[index+j*24])">
                  <view class="text">{{ emojiList[index + j * 24].code }}</view>
                  <view class="desc">{{ emojiList[index + j * 24].name }}</view>
                </view>
              </template>
            </view>
          </swiper-item>
        </swiper>
        <view class="emojiPanel-dots">
          <view v-for="(i,j) in emojiListPage" :class="{active:emojiPageCurrent==j}" class="dot"></view>
          <view class="emojiPanel-close iconfont icon-icon_close" @click.stop="commentInputDel"></view>
        </view>
      </view>
    </view>
    <!--    弹窗-->
    <ShareModal v-model="shareModal"></ShareModal>
    <ActionModal v-model="actionModal"></ActionModal>
  </view>
</template>

<style lang="scss" scoped>
.page {
  padding: 0 24rpx;

  .card {
    box-sizing: border-box;
    width: 100%;
    margin: 12rpx auto 28rpx auto;

    .card-head {
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
            font-size: 28rpx;
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
          @include tag(2.125em, 1.2em);
          //border: 1rpx solid white;
          background: $theme-color;
          box-sizing: border-box;
          color: white;
          font-weight: bold;
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
      margin: 12rpx -24rpx 12rpx 12rpx;
      font-size: 28rpx;

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
      margin-left: 12rpx;
      line-height: 1.5em;
      letter-spacing: .5rpx;
      color: #3c3c3c;
    }

    .voice {
      margin: 12rpx 0 12rpx 12rpx;
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
      margin: 12rpx 0 12rpx 12rpx;
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
      margin: 24rpx -12rpx 12rpx 12rpx;
      @include flexbox(c, s);
      flex-wrap: wrap;

      .imageWrap {
        position: relative;
        width: 220rpx;
        height: 220rpx;
        border-radius: 12rpx;
        overflow: hidden;
        margin-right: 12rpx;
        margin-bottom: 12rpx;

        .image {
          @include bgImg;
        }
      }

    }

    .location {
      @include flexbox;
      @include tag();
      font-size: 22rpx;
      background: lighten($theme-color, 42%);
      color: #00000083;
      font-weight: bold;

      .iconfont {
        margin-right: 4rpx;
        color: $theme-color;
      }

      .text {
        color: #3c3c3c;
      }
    }

    .card-footer {
      display: flex;
      margin: 24rpx 0 24rpx 12rpx;
      @include flexbox(c, s);

      .item {
        margin-right: 12rpx;
        font-size: 30rpx;
        @include flexbox(c, c);
        color: #b2b2b2;

        .iconfont {
          font-size: 38rpx;
          margin-right: 4rpx;

          &.icon-aixin {
            color: #ff4c4d;
          }
        }

        .text {

        }

      }
    }
  }

  .panelBox {
    border-top: 1rpx solid #dedede;
    box-sizing: border-box;

    .panelBox-header {
      @include flexbox(c, b);
      color: #c4c4c4;
      font-size: 26rpx;
      font-weight: bold;
      box-sizing: border-box;
      height: 92rpx;
      padding: 6rpx 12rpx;
      background: $bg-color;
      z-index: 2;

      .tags {
        @include flexbox(e, s);
        align-self: flex-start;

        .tag {
          margin-right: 36rpx;
          white-space: nowrap;
          width: fit-content;

          &.active {
            color: black;
            font-size: 30rpx;
            background-image: radial-gradient(closest-side at center, lighten($theme-color, 26%) 0%, #00000000);
            background-position: center;;
            background-size: 1em 1em;
            background-repeat: no-repeat;
          }
        }
      }

      .number {
        font-size: 26rpx;
      }
    }

    .comment {
      .comment-head {
        width: 100%;

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
          box-sizing: border-box;

          .row {
            &:not(:last-child) {
              margin-bottom: 4rpx;
            }

            margin-right: -6rpx;
            @include flexbox(c, s);

            .nickname {
              white-space: nowrap;
              font-size: 28rpx;
              font-weight: bold;
              margin-right: 6rpx;
              color: #3c3c3c;
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

          .iconfont {
            font-size: 34rpx;
            color: #0000005c;
            font-weight: bold;
            @include hover;
          }
        }
      }

      .comment-text {
        font-size: 24rpx;
        font-weight: bold;
        margin-top: -12rpx;
        padding-left: 120rpx;
        padding-right: 48rpx;
        color: #4d4d4d;
      }

      .comment-response {
        padding-left: 100rpx;
        margin-top: 12rpx;
        border-top: 1rpx solid #00000012;
        margin-bottom: 24rpx;

        .comment-head {
          margin-bottom: 0;

          .left {
            @include flexbox();
            width: 100rpx;
            height: 100rpx;

            .avatar {
              width: 70rpx;
              height: 70rpx;
              border-radius: 50%;
              margin-right: 12rpx;
            }
          }

          .content {
            .row {
              &:nth-child(1) {
                margin-bottom: 6rpx;
              }

              margin-right: -6rpx;

              .nickname {
                font-size: 24rpx;
                margin-right: 6rpx;
              }

              .sex {
                font-size: 20rpx;
                width: 26rpx;
                height: 26rpx;
                margin-left: 2rpx;
              }

              .tag {
                margin-right: 4rpx;
                font-size: 22rpx;
                padding: 4rpx 12rpx;
              }

              .sub-tag {
                font-size: 20rpx;
                margin-left: 4rpx;
              }

              .time {
                font-size: 20rpx;
              }
            }
          }

          .right {
            @include flexbox;

            .iconfont {
            }
          }
        }

        .comment-text {
          font-size: 22rpx;
          margin-top: -12rpx;
          padding-left: 100rpx;

          .tips {
            color: #00000054;
          }
        }
      }
    }


  }

  .footer-box {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background: $bg-color;
    box-sizing: border-box;
    overflow: hidden;
    z-index: 3;

    .input-box {
      height: 120rpx;
      padding: 24rpx 24rpx 28rpx 24rpx;
      width: 100%;
      box-sizing: border-box;
      @include flexbox(e, b);

      .input-box-bar {
        height: 68rpx;
        background: #ececec;
        box-shadow: 0 0 4rpx 0 rgba(#ffffff, 0.3);
        border-radius: 34rpx;
        flex-grow: 1;
        padding-right: 78rpx;
        padding-left: 32rpx;
        box-sizing: border-box;
        @include flexbox;
        position: relative;

        input {
          width: 100%;
          line-height: 68rpx;
          font-size: 26rpx;
          height: 68rpx;
        }

        .icon {
          position: absolute;
          right: 0;
          top: 0;
          height: 68rpx;
          width: 78rpx;
          font-size: 42rpx;
          color: #7c7c7c;
          @include flexbox;
        }
      }

      .right-box {
        height: 68rpx;
        width: 68rpx;
        @include flexbox;
        padding-left: 24rpx;
        overflow: hidden;
        position: relative;

        .sendBtn {
          font-size: 26rpx;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) translateX(150%);
          color: white;
          background: $theme-color;
          white-space: nowrap;
          height: 44rpx;
          @include flexbox;
          width: 3.4em;
          border-radius: 12rpx;

          &.active {
            transform: translate(-50%, -50%);
          }

          @include hover {
            transform: translate(-50%, -50%) scale(0.96);
          }
        ;
        }

        .iconfont {
          font-size: 42rpx;
          color: #ff4c4d;

          &.icon-aixin1 {
          }
        }
      }
    }

    .emojiPanel {
      box-sizing: border-box;
      height: 480rpx;
      width: 100%;
      background: #ececec;
      box-shadow: inset 0 2rpx 4rpx #00000003;
      margin-bottom: -480rpx;
      transition: all .2s;

      &.active {
        margin-bottom: 0;
      }

      .emojiPanelSwiper {
        width: 100%;
        height: calc(100% - 48rpx);

        .emojiPanelSwiperItem {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr 1fr;
          grid-gap: 12rpx;
          box-sizing: border-box;
          padding: 12rpx;

          .item {
            border-radius: 12rpx;
            background: white;
            @include flexbox(c, c, y);
            @include hover;

            .text {
              font-size: 32rpx;
            }

            .desc {
              font-size: 22rpx;
              margin-top: 8rpx;
            }
          }
        }
      }

      .emojiPanel-dots {
        @include flexbox;
        margin-right: -12rpx;
        width: 100%;
        position: relative;
        height: 48rpx;

        .dot {
          width: 8rpx;
          height: 8rpx;
          border-radius: 50%;
          margin-right: 12rpx;
          background: #bebebe;

          &.active {
            background: #7e7e7e;
          }
        }

        .emojiPanel-close {
          font-size: 20rpx;
          color: #FFFFFF;
          position: absolute;
          right: 24rpx;
          top: 50%;
          background: #99999991;
          border-radius: 10rpx;
          width: 40rpx;
          height: 40rpx;
          padding-left: 20rpx;
          padding-right: 6rpx;
          clip-path: polygon(0% 50%, 33% 0%, 100% 0%, 100% 100%, 33% 100%);
          @include flexbox;
          backdrop-filter: blur(2px);

          transform: translateY(-50%);
          @include hover {
            transform: translateY(-50%) scale(0.98);
            opacity: 0.9;
            box-shadow: unset;
          }
        ;
        }
      }
    }
  }
}
</style>