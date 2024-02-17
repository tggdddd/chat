<script lang="ts" setup>
import ChatList from "@/pages/chat/chatList.vue";
import ConcatList from "@/pages/chat/concatList.vue";

const current = ref(1)

function currentChange(index: number) {
  current.value = index
}
</script>

<template>
  <view>
    <ConcatList v-show="current==0" @change="currentChange"/>
    <ChatList v-show="current==1" @change="currentChange"/>
  </view>
</template>

<style lang="scss" scoped>

</style>