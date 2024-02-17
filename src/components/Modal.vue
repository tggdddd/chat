<template>
  <view
      :style="{display:modal?'block':'none'}"
      class="modal"
      @touchmove.stop.prevent="()=>{}"
      @wheel.stop.prevent="()=>{}"
      @click.self="maskCloseClick"
  >
    <view
        :class="{
      show:container,
      hide:!container,
      scale:scale}"
        class="actionSheet"
        @click.stop="()=>{}" @transitionstart.stop="transitionstart"
        @transitionend.stop="transitionend">
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
      maskCloseable?: boolean,
      scale?: boolean,
      modelValue: boolean
    }>(), {
      maskCloseable: true,
      scale: true,
      modelValue: false
    })
const {maskCloseable, scale, modelValue} = props
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

.actionSheet {
  &.show {
    opacity: 1;

    &.scale {
      transform: scale(1);
    }
  }

  &.hide {
    opacity: 0;

    &.scale {
      transform: scale(0);
    }
  }

  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
