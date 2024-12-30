<template>
  <el-sub-menu
    v-if="isItemChildren(item) || isItemChildren(oneChild(item))"
    :route="item"
    :index="item.meta.level.join('-')"
  >
    <template #title>
      <div style="display: flex; gap: 0.5rem; align-items: center; position: relative">
        <SvgIcon :name="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </div>
    </template>
    <sidebar-item :item="route" v-for="route in item.children" :key="route.path" />
  </el-sub-menu>
  <el-menu-item v-else :index="oneChild(item).meta.level.join('-')" :route="oneChild(item).path">
    <div style="display: flex; gap: 0.5rem; align-items: center; position: relative">
      <SvgIcon :name="item.meta.icon" />
      <span>{{ oneChild(item).meta.title }}</span>
    </div>
  </el-menu-item>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  item: Object,
});
let isItemChildren = item => {
  if (item.children && item.children.length > 0) {
    return true;
  }
  return false;
};
let oneChild = item => {
  if (item.children && item.children.length === 1) {
    return item.children[0];
  }
  return item;
};
</script>

<style scoped></style>
