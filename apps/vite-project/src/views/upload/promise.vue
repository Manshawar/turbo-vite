<template>
  <div style="margin-top: 20px">
    <el-button @click="clickHandler">promise并发处理</el-button>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="index" label="index" width="180" />
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const tableData = ref([]);
let count = ref(0);

let arr = Array.from({ length: 10 });
function deferHandler(resolve, reject) {
  setTimeout(() => {
    count.value++;

    // if (count.value % 3 === 0) {
    //   reject("error");
    // } else {
    tableData.value.push({ index: count.value });
    resolve(count.value);
    // }
  }, 1000);
}
function clickHandler() {
  handlePromise(arr, deferHandler);
}

function handlePromise(arr: any[], cb: (resolve, reject, index) => void | any, limit = 3) {
  let cbIndex = 0;
  function run() {
    try {
      new Promise((resolve, reject) => {
        cbIndex++;
        cb(resolve, reject, cbIndex);
      })
        .then(res => {
          if (cbIndex < arr.length) {
            run();
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    } catch (error) {
      console.log("err", error);
    }
  }
  for (let index = 0; index < limit; index++) {
    run();
  }
}
</script>
<style lang="scss" scoped></style>
