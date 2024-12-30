<template>
  <el-menu :router="true" :default-active="route.meta.level.join('-')">
    <el-menu-item style="background-color: rgba(236, 245, 255, 0.8)">hello world</el-menu-item>
    <sidebarItem :item="item" v-for="item in wholeRoute" :key="item.path" />
  </el-menu>
</template>

<script setup>
import sidebarItem from "./sidebarItem.vue";
import { useRoute } from "vue-router";
import { routerStore } from "@/store/modules/router";

const { wholeRoute } = routerStore();
const route = useRoute();
</script>

<style></style>
