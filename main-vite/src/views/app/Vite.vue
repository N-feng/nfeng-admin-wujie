<script setup lang="ts">
import { uResolve } from "@/utils/path";
import hostMap from "@/wujie/hostMap";
const { path } = uResolve(useRoute().path);
const viteUrl = hostMap("//localhost:7500") + path;
console.log('viteUrl: ', viteUrl);
</script>

<template>
  <!--单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由 -->
  <WujieVue
    name="vite"
    width="100%"
    height="100%"
    :style="{ position: 'relative' }"
    :url="viteUrl"
    :sync="true"
    :alive="true"
  ></WujieVue>
</template>
