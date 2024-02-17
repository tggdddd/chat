<template>
  <view
      @touchmove.stop.prevent="()=>{}"
      @wheel.stop.prevent="()=>{}">
    <view
        :style="{display:modal?'block':'none'}"
        class="modal"
        @click="maskCloseClick"/>
    <view class="realContent">
      <slot></slot>
      <view :class="{
      show:container,
      hide:!container,
      animate:animate}" class="tooltip"
            @click.stop="()=>{}" @transitionstart.stop="transitionstart"
            @transitionend.stop="transitionend">
        <view class="tooltip-body">
          <slot name="content"></slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
      maskCloseable?: boolean,
      animate?: boolean,
      modelValue: boolean
    }>(), {
      maskCloseable: true,
      animate: true,
      modelValue: false
    })
const {maskCloseable, animate, modelValue} = props
const modal = ref(false)
const container = ref<boolean | undefined>(false)
const emits = defineEmits(['update:modelValue'])
watchEffect(() => {
  if (props.modelValue) {
    modal.value = true
  }
  nextTick(() => {
    setTimeout(() => {
      container.value = props.modelValue
    }, 25)
  })
});

function transitionstart() {
  if (container.value) {
    modal.value = true
  }
}

function transitionend() {
  if (!container.value) {
    modal.value = false
  }
}

function maskCloseClick() {
  if (maskCloseable) {
    closeAction()
  }
}

function closeAction() {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.modal {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(#000000, 0.75);
  overflow: hidden;
}

.realContent {
  position: relative;
  z-index: 999;

  .tooltip {
    --color: white;
    $color: var(--color);
    display: grid;
    width: max-content;

    .tooltip-body {
      overflow: hidden;
    }

    &.show {
      opacity: 1;

      &.animate {
        grid-template-rows: 1fr;

        .tooltip-body {
        }
      }
    }

    &.hide {
      opacity: 0.6;
      grid-template-rows: 0fr;

      &.animate {
        .tooltip-body {
        }
      }
    }

    transition: all 0.2s ease-in-out;
    position: absolute;
    background-color: $color;
    box-sizing: border-box;
    border-radius: 16rpx;
    //.rightBottom {
    right: 0;
    top: 100%;
    margin-top: 18rpx;

    &::after {
      content: "";
      background: $color;
      border-radius: 20%;
      border: 7rpx solid transparent;
      border-right-color: $color;
      border-top-color: $color;
      transform: rotateZ(-45deg);
      position: absolute;
      right: 20rpx;
      top: -6.48rpx;
    }

    //}
  }
}
</style>
