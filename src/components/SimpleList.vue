<script lang="ts" setup>
const emits = defineEmits(['fetchData'])
const pId = "A" + Math.random().toString().substring(2)
const lId = "B" + Math.random().toString().substring(2)

const props = withDefaults(defineProps<{
  thresholds?: number[],
  initialRatio?: number,
  observeAll?: boolean,
  data?: any,
  fetchFunc: Function,
  hasMore: boolean,
  boxStyle?: Record<any, any>,
  margins?: {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number
  }
}>(), {
  thresholds: [0.4],
  initialRatio: 0,
  observeAll: false,
  data: [],
  fetchFunc: () => {
    return true
  },
  hasMore: true,
  boxStyle: {},
  margins: {}
})
const loading = ref(false)

async function loadData() {
  if (!props.hasMore) {
    return
  }
  if (loading.value) {
    return
  }
  let result;
  loading.value = true
  try {
    result = await props.fetchFunc()
  } catch (e) {
    result = false
  }
  loading.value = false
}

let observer: UniApp.IntersectionObserver;
onMounted(() => {
  observer = uni.createIntersectionObserver(this, {
    thresholds: props.thresholds,
    initialRatio: props.initialRatio,
    observeAll: props.observeAll
  });
  observer.relativeToViewport(props.margins)
      .observe("#" + lId, (res) => {
        console.log(res)
        if (res.intersectionRatio > 0) {
          loadData()
        }
      })
})


onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
})

function isEmpty() {
  if (props.data == null) {
    return true
  }
  if (typeof props.data === "string") {
    return props.data.length == 0
  }
  if (Array.isArray(props.data)) {
    return props.data.length == 0
  }
  return props.data == 0
}
</script>

<template>
  <view :id="pId" :style="boxStyle">
    <slot></slot>
    <view :id="lId" style="min-height: 1rpx">
      <view v-show="!loading&&isEmpty()">
        <slot name="empty">
          <view class="empty">
            <view class="iconfont icon-shafa"></view>
            <view class="text">无人占领</view>
          </view>
        </slot>
      </view>
      <view v-show="loading">
        <slot name="loading">
          <view class="loadingBox">
            <view class="loading">
              <view v-for="i in 8" class="circle"></view>
            </view>
          </view>
        </slot>
      </view>
      <view v-show="!hasMore&&!isEmpty()" class="noMore">没有更多数据了</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>


.loadingBox {
  width: 100%;
  height: 80rpx;
  @include flexbox;

  .loading {
    position: relative;
    $size: 8;
    $dist: 24rpx;
    @keyframes rotate {
      from {
        transform: rotateZ(0);
      }
      to {
        transform: rotateZ(360deg);
      }
    }
    transform-origin: center;
    animation: rotate infinite steps(8) .8s;
    @for $i from 1 through $size {
      .circle:nth-child(#{$i}) {
        position: absolute;
        $deg: 360deg/$size *$i;
        transform: translate(-50%, -50%) rotateZ($deg) translateY($dist);
        width: $i * 1rpx + 4rpx;
        height: $i * 1rpx + 4rpx;
        border-radius: 50%;
        background: $theme-color;
      }
    }
  }
}

.empty {
  width: 100%;
  height: 380rpx;
  color: #00000016;
  @include flexbox(c, c, y);

  .iconfont {
    font-size: 180rpx;
  }

  .text {
    color: #00000044;
    font-size: 42rpx;
  }
}

.noMore {
  text-align: center;
  font-size: 18rpx;
  margin-top: 48rpx;
  color: #00000066;
}
</style>