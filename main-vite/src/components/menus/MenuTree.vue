<script setup lang="ts">
import type { IMenu } from '@/typings/menu';
defineProps<{
  menus?: IMenu[]
  baseUrl?: string
}>()

const selectedKeys = ref<string[]>([])
</script>
<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
    <a-menu-item key="1">nav 1</a-menu-item>
    <a-menu-item key="2">nav 2</a-menu-item>
    <a-menu-item key="3">nav 3</a-menu-item>
    <template v-for="menu in menus">
      <a-menu-item
        v-if="!menu.menus || menu.menus.length === 0"
        :key="`${baseUrl}${menu.url}`">
        {{ menu.menuName }}
      </a-menu-item>
      <a-sub-menu
        v-if="menu.menus && menu.menus.length > 0"
        :key="`${baseUrl}${menu.url}`">
        <!-- 如果一级菜单没有设置icon，则默认展示menu-outlined -->
        <template #icon v-if="menu.icon || menu.level === 1">
          <component :is="menu.icon || 'menu-outlined'" />
        </template>
        <template #title>
          <span>{{ menu.menuName }}</span>
        </template>
        <MenuTree :menus="menu.menus" :base-url="baseUrl" />
      </a-sub-menu>
    </template>
  </a-menu>
</template>