import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router/index"
import ElementPlus from 'element-plus';
import preInstall from "@/hooks/componentPreInstall";
import setupStore from './store';
import 'element-plus/dist/index.css'
let app = createApp(App);

app.use(router).use(ElementPlus).use(preInstall).use(setupStore).mount('#app');
