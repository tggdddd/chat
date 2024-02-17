<template></template>
<script lang="ts" setup></script>
<style lang="scss">
@import "uview-plus/index.scss";
@import "common.scss";

@font-face {
  font-family: "aliRound";
  src: url("~@/static/fonts/AlimamaFangYuanTiVF-Thin.ttf") format("truetype");
  font-display: swap;
}

@font-face {
  font-family: "aliHei";
  src: url("~@/static/fonts/AlimamaShuHeiTi-Bold.ttf") format("truetype");
  font-display: swap;
}

page,
body {
  font-family: aliRound, emojifont, -apple-system, system-ui;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: $bg-color;
  color: $main-color;
}

.uni-tabbar-bottom {
  display: none;
}
</style>