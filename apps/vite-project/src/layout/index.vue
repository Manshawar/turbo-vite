<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <main class="container">
        <aside class="menu"><Menu /></aside>
        <section>
          <transition>
            <keep-alive>
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </section>
      </main>
    </router-view>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Layout",
});
</script>
<script setup>
import { useRouter } from "vue-router";
import Menu from "./components/menu.vue";
const router = useRouter();
const nav = () => {};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  min-height: 100vh;
}
// @media screen and (min-width: 720px) {
.menu {
  width: 250px;
}
// }
</style>
