<script setup lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { useLifecycle } from "@/composables/lifecycle";

useLifecycle().onLaunch()
</script>

<template>
  <a-config-provider :locale="zhCN">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <!-- 主要内容 -->
          <component :is="Component"></component>

          <!-- 加载中状态 -->
          <template #fallback> 正在加载... </template>
        </Suspense>
      </template>
    </RouterView>
  </a-config-provider>
</template>
