<template>
  <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)">
    <router-link v-if="online" to="/dashboard/index"><el-button>去首页</el-button></router-link>
    <router-link v-else to="/login"><el-button>去登陆</el-button></router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "",
});
</script>
<script setup lang="ts">
import { userStore } from "@/store/modules/user";
const { online } = userStore();
</script>
<style lang="scss" scoped></style>
