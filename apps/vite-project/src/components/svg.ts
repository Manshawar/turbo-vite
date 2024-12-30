import { h } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { ElIcon } from "element-plus";
// import svg from "./svg.module.scss";
import "./svg.scss"

export default {
  props: {
    name: {
      type: String,
      required: true,
    },

  },
  setup (props, { slots }) {
    return () => h(ElIcon, h(ElementPlusIconsVue[props.name]));
  },
};
