import SparkMD5 from "spark-md5"
var spark = new SparkMD5();
let resFile = {
  hash: '',
  chunkList: [],
};
interface data {
  file: any;
  size?: number;
  hashOffest?: number;
  hashgap?: number;
}
self.onmessage = async function (e: { data: data, }) {
  let data = e.data

  let file = data.file;
  let hash = dealType['hash'](file, data.hashOffest, data.hashgap);
  let fileName = file.name;

  let chunkList = dealType['slice'](file, data.size)
  Promise.allSettled([hash, chunkList]).then((res: any) => {
    let hash = res[0].value;
    let chunkList = res[1].value.map((item, index) => { return { file: item.file, name: hash + "-" + index } });

    self.postMessage({
      fileName,
      hash,
      chunkList
    })
  })
};
let dealType = {
  async hash(file, offset, gap) {
    let chunkList = await createHashChunkList(file, offset, gap)
    let res = await calHash(chunkList);
    return res
  },
  async slice(file, size) {
    return createFileChunk(file, size)
  }
}
function calHash(chunkList) {

  let hash = ""

  return new Promise((resolve, reject) => {
    dealHandler();
    function dealHandler(index = 0) {
      let chunk = chunkList[index];
      if (!chunk) return
      let file = new FileReader();
      file.readAsArrayBuffer(chunk.file)

      file.onload = function () {
        spark.append(chunk);
        if (index < chunkList.length) {
          // let percentage = (index + 1) / chunkList.length * 100;

          if (index + 1 >= chunkList.length) {
            hash = spark.end();
            resolve(hash)
          }
          index++;
          dealHandler(index)
        }
      }


    }
  })
}
async function createHashChunkList(file, offset = Math.floor(2 * 1024 * 1024), gap = 2) {
  let index = offset;
  let chunkInit = [{ file: file.slice(0, offset) }];
  while (index < file.size) {
    if (index + offset > file.size) {
      chunkInit.push({ file: file.slice(index) });
    } else {
      chunkInit.push(
        { file: file.slice(index, index + gap) },
        { file: file.slice(index + offset - gap, index + offset) }
      );
    }
    index += offset;
  }
  return chunkInit;
}

function createFileChunk(file, size = 2 * 1024 * 1024) {
  const fileChunkList = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunkList.push({
      file: file.slice(cur, cur + size),
    });
    cur += size;
  }
  return fileChunkList;
}