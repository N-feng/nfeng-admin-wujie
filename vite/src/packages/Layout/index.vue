<script setup lang="ts">
import { useSystemStore } from '@/stores/system'

const { refresh, keepAliveComponents } = storeToRefs(useSystemStore())

</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="refresh ? [] : keepAliveComponents">
      <component :is="Component" v-if="!refresh" :key="$route.fullPath" />
    </KeepAlive>
  </RouterView>
</template>