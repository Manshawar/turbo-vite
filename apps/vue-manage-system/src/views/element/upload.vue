<template>
  <div class="container">
    <div class="content-title">支持拖拽</div>
    <div class="plugins-tips">
      Element Plus自带上传组件。 访问地址：
      <a href="https://element-plus.org/zh-CN/component/upload.html" target="_blank">
        Element Plus Upload
      </a>
    </div>
    <el-upload
      class="upload-demo"
      drag
      action="http://jsonplaceholder.typicode.com/api/posts/"
      multiple
      :on-change="handle"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>

    <div class="content-title">支持裁剪</div>
    <div class="plugins-tips">
      vue-cropper：一个简单的vue图片裁剪插件。 访问地址：
      <a href="https://github.com/xyxiao001/vue-cropper" target="_blank">vue-cropper</a>
      。 示例请查看
      <router-link to="/ucenter">个人中心-我的头像</router-link>
    </div>
    <el-button-group>
      <el-button>
        <i class="el-icon-upload2 el-icon--left" size="mini"></i>
        选择文件
        <input type="file" :multiple="true" class="select-file-input" @change="handleFileChange" />
      </el-button>
      <el-button>
        <i class="el-icon-upload el-icon--left" size="mini"></i>
        上传
      </el-button>
      <el-button>
        <i class="el-icon-video-pause el-icon--left" size="mini"></i>
        暂停
      </el-button>
      <el-button>
        <i class="el-icon-video-play el-icon--left" size="mini"></i>
        恢复
      </el-button>
      <el-button>
        <i class="el-icon-video-play el-icon--left" size="mini"></i>
        清空
      </el-button>
    </el-button-group>
  </div>
</template>

<script setup lang="ts">
const tempFilesArr = [];
const fileStatus = {
  wait: "wait",
  uploading: "uploading",
  success: "success",
  error: "error",
  secondPass: "secondPass",
  pause: "pause",
  resume: "resume",
};
const handle = (rawFile: any) => {
  console.log(rawFile);
};
const handleFileChange = (e: any) => {
  const files = e.target.files;
  if (!files) return;
  var index = 0;
  // console.log(e.target.files);
  for (const key in e.target.files) {
    const file = e.target.files[key];
    pushTempFile(file, index);
    index++;
  }
};
function pushTempFile(file, index) {
  // 额外的初始值
  const obj = {
    status: fileStatus.wait,
    chunkList: [],
    uploadProgress: 0,
    hashProgress: 0,
    index,
  };
  for (const k in file) {
    obj[k] = file[k];
  }
  console.log("pushTempFile -> obj", obj);
  tempFilesArr.push(obj);
}
function createFileChunk(file, size = chunkSize) {
  const fileChunkList = [];
  var count = 0;
  while (count < file.size) {
    fileChunkList.push({
      file: file.slice(count, count + size),
    });
    count += size;
  }
  return fileChunkList;
}
</script>

<style scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}

.upload-demo {
  width: 360px;
}
.simple-upload-container {
  width: 100%;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  background-color: #fff;
  padding-bottom: 15px;
  padding: 10px;
  .progress-box {
    width: 100%;
  }
  .total-progress {
    margin-bottom: 15px;
    .btns {
      position: relative;
      .select-file-input {
        position: absolute;
        display: inline-block;
        left: 0;
        top: 0;
        border: none;
        opacity: 0;
        width: 96px;
        height: 28px;
      }
    }
  }

  .file-list {
    .list-item {
      padding: 8px 10px;
      display: flex;
      justify-content: center;
      justify-items: center;
      line-height: 25px;
      position: relative;
      &:hover .item-chunk-box {
        display: block;
      }
      div {
        flex: 1;
        margin-top: 6px;
      }
      .item-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 6px;
        .svg-icon {
          font-size: 22px;
          vertical-align: sub;
        }
      }
      .item-status {
        flex: 0 0 10%;
        text-align: center;
        text-align: left;
        .el-icon-circle-check {
          color: #67c23a;
        }
        .el-icon-circle-close {
          color: #f00;
        }
      }
      .item-chunk-box {
        display: none;
        transition: all 3s;
        position: absolute;
        top: 0;
        left: 40px;
        z-index: 10;
      }
      .item-progress {
        flex: 0 0 60%;
      }
    }
  }

  .upload-tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
  }

  .el-progress {
    width: 80%;
    display: inline-block;
  }

  >>> .el-collapse-item__header {
    height: auto;
  }
}
</style>
