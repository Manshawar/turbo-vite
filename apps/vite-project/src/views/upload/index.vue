<script setup lang="ts">
import { ref } from "vue";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile, UploadFiles } from "element-plus";
import { uploadApi, mergeApi } from "@/api/upload";
import PromiseSFC from "./promise.vue";
import MyWorker from "./work?worker";
import { handlePromise } from "./hooks/handlePromise";
import axios from "axios";
const hashWork = new MyWorker();
const upload = ref<UploadInstance>();
let fileBody = ref<{ chunkList: any[]; hash: string; fileName: string }>({
  chunkList: [],
  hash: "",
  fileName: "",
});
const CancelToken = axios.CancelToken;
const cancelIns = CancelToken.source();
const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
let realFile = null;

const submitUpload = async () => {
  // upload.value!.submit();
  if (fileBody.value) {
    handlePromise(fileBody.value.chunkList, async (resolve, reject, index) => {
      let formData = new FormData();
      formData.append("file", fileBody.value.chunkList[index].file);
      formData.append("name", fileBody.value.chunkList[index].name);
      formData.append("hash", fileBody.value.hash);
      formData.append("fileName", fileBody.value.fileName);
      uploadApi(formData)
        .then(res => {
          setTimeout(() => {
            resolve();
          }, 300);
        })
        .finally(async () => {
          if (index === fileBody.value.chunkList.length - 1) {
            await mergeApi({ fileName: fileBody.value.fileName, hash: fileBody.value.hash });
          }
        });
    });
  }
};
const handleFileChange = async file => {
  const originalFile = file.raw;
  hashWork.postMessage({ file: originalFile });
};
hashWork.onmessage = e => {
  Object.assign(fileBody.value, e.data);
};
hashWork.onerror = e => {
  console.log(e);
};
</script>

<template>
  <el-card style="width: 800px; margin: 80px 0 0 30px">
    <el-upload
      ref="upload"
      class="upload-demo"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :on-change="handleFileChange"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
      <el-button class="ml-3" type="success" @click="submitUpload">upload to server</el-button>
      <template #tip>
        <div class="el-upload__tip text-red">limit 1 file, new file will cover the old file</div>
      </template>
    </el-upload>

    <PromiseSFC />
  </el-card>
</template>

<style scoped lang="scss">
.upload-demo {
  display: flex;
  gap: 1rem;
}
</style>
