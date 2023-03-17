<script setup lang="ts">
import WujieVue from "wujie-vue3";
import { uResolve } from "@/utils/path";
import { useTabStore } from "@/stores/tab";
import { useMenuStore } from "@/stores/menu";
import { SelectEventHandler } from "ant-design-vue/es/menu/src/interface";

const router = useRouter();
const { activeKey } = storeToRefs(useTabStore());
const { headerSelectedKeys, systemMenus } = storeToRefs(useMenuStore());

const handleSelect: SelectEventHandler = ({ key }) => {
  router.push(`${key}`);
  activeKey.value = key as string;

  const { app } = uResolve(key as string);
  WujieVue.bus.$emit(`${app}:navigate`, key);
};
</script>
<template>
  <a-menu
    mode="horizontal"
    v-model:selectedKeys="headerSelectedKeys"
    @select="handleSelect"
  >
    <a-menu-item key="/shortcut/home">快捷菜单</a-menu-item>
    <a-menu-item v-for="menu in systemMenus" :key="menu.baseUrl">
      {{ menu.name }}
    </a-menu-item>
    <template #overflowedIndicator>
      <div :style="{ color: '#fff' }">
        更多
        <down-outlined :style="{ fontSize: '16px' }" />
      </div>
    </template>
  </a-menu>
</template>
<style lang="scss">
.ant-menu-horizontal {
  width: calc(100% - 276px);
  background-color: #ff6720;
  border-bottom: none;

  & > .ant-menu-item {
    color: #fff !important;

    &:hover,
    &.ant-menu-item-selected {
      font-weight: 500;

      &::after {
        border-color: #fff !important;
      }
    }
  }
}
</style>
