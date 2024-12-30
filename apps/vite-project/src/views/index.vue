<template>
  <div>
    <el-button @click="reset">hello world</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "",
});
</script>
<script setup lang="ts">
import { reset } from "@/utils";
</script>
<style lang="scss" scoped></style>
