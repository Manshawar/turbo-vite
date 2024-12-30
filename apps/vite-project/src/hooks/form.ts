import { reactive } from "vue";
export function formData(data) {
  if (typeof data === "object") {
    let res = reactive(data);
    function reset() {
      Object.keys(res).forEach(item => (res[item] = ""));
    }
    return [res, reset];
  }
}
