import { serve } from "./index";
export const uploadApi = (data, cancelToken?) => {
  return serve.post("/upload", data, {
    onUploadProgress: (progressEvent) => {
      console.log(progressEvent)
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    // cancelToken
  });
}

export const mergeApi = (data) => {
  return serve.get("/upload/merge", { params: data });

}