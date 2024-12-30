import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '系统首页',
          noAuth: true,
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
      },
      {
        path: '/system-user',
        name: 'system-user',
        meta: {
          title: '用户管理',

        },
        component: () => import(/* webpackChunkName: "system-user" */ '../views/system/user.vue'),
      },
      {
        path: '/system-role',
        name: 'system-role',
        meta: {
          title: '角色管理',

        },
        component: () => import(/* webpackChunkName: "system-role" */ '../views/system/role.vue'),
      },
      {
        path: '/system-menu',
        name: 'system-menu',
        meta: {
          title: '菜单管理',

        },
        component: () => import(/* webpackChunkName: "system-menu" */ '../views/system/menu.vue'),
      },
      {
        path: '/table',
        name: 'basetable',
        meta: {
          title: '基础表格',

        },
        component: () => import(/* webpackChunkName: "table" */ '../views/table/basetable.vue'),
      },
      {
        path: '/table-editor',
        name: 'table-editor',
        meta: {
          title: '可编辑表格',

        },
        component: () => import(/* webpackChunkName: "table-editor" */ '../views/table/table-editor.vue'),
      },
      {
        path: '/schart',
        name: 'schart',
        meta: {
          title: 'schart图表',

        },
        component: () => import(/* webpackChunkName: "schart" */ '../views/chart/schart.vue'),
      },
      {
        path: '/echarts',
        name: 'echarts',
        meta: {
          title: 'echarts图表',

        },
        component: () => import(/* webpackChunkName: "echarts" */ '../views/chart/echarts.vue'),
      },

      {
        path: '/icon',
        name: 'icon',
        meta: {
          title: '图标',

        },
        component: () => import(/* webpackChunkName: "icon" */ '../views/pages/icon.vue'),
      },
      {
        path: '/ucenter',
        name: 'ucenter',
        meta: {
          title: '个人中心',
        },
        component: () => import(/* webpackChunkName: "ucenter" */ '../views/pages/ucenter.vue'),
      },
      {
        path: '/editor',
        name: 'editor',
        meta: {
          title: '富文本编辑器',

        },
        component: () => import(/* webpackChunkName: "editor" */ '../views/pages/editor.vue'),
      },
      {
        path: '/markdown',
        name: 'markdown',
        meta: {
          title: 'markdown编辑器',

        },
        component: () => import(/* webpackChunkName: "markdown" */ '../views/pages/markdown.vue'),
      },
      {
        path: '/export',
        name: 'export',
        meta: {
          title: '导出Excel',

        },
        component: () => import(/* webpackChunkName: "export" */ '../views/table/export.vue'),
      },
      {
        path: '/import',
        name: 'import',
        meta: {
          title: '导入Excel',

        },
        component: () => import(/* webpackChunkName: "import" */ '../views/table/import.vue'),
      },
      {
        path: '/theme',
        name: 'theme',
        meta: {
          title: '主题设置',

        },
        component: () => import(/* webpackChunkName: "theme" */ '../views/pages/theme.vue'),
      },
      {
        path: '/calendar',
        name: 'calendar',
        meta: {
          title: '日历',

        },
        component: () => import(/* webpackChunkName: "calendar" */ '../views/element/calendar.vue'),
      },
      {
        path: '/watermark',
        name: 'watermark',
        meta: {
          title: '水印',

        },
        component: () => import(/* webpackChunkName: "watermark" */ '../views/element/watermark.vue'),
      },
      {
        path: '/carousel',
        name: 'carousel',
        meta: {
          title: '走马灯',

        },
        component: () => import(/* webpackChunkName: "carousel" */ '../views/element/carousel.vue'),
      },
      {
        path: '/tour',
        name: 'tour',
        meta: {
          title: '分步引导',

        },
        component: () => import(/* webpackChunkName: "tour" */ '../views/element/tour.vue'),
      },
      {
        path: '/steps',
        name: 'steps',
        meta: {
          title: '步骤条',

        },
        component: () => import(/* webpackChunkName: "steps" */ '../views/element/steps.vue'),
      },
      {
        path: '/form',
        name: 'forms',
        meta: {
          title: '表单',

        },
        component: () => import(/* webpackChunkName: "form" */ '../views/element/form.vue'),
      },
      {
        path: '/upload',
        name: 'upload',
        meta: {
          title: '上传',

        },
        component: () => import(/* webpackChunkName: "upload" */ '../views/element/upload.vue'),
      },
      {
        path: '/statistic',
        name: 'statistic',
        meta: {
          title: '统计',

        },
        component: () => import(/* webpackChunkName: "statistic" */ '../views/element/statistic.vue'),
      },
    ],
  },
  {
    path: '/login',
    meta: {
      title: '登录',
      noAuth: true,
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/pages/login.vue'),
  },
  {
    path: '/register',
    meta: {
      title: '注册',
      noAuth: true,
    },
    component: () => import(/* webpackChunkName: "register" */ '../views/pages/register.vue'),
  },
  {
    path: '/reset-pwd',
    meta: {
      title: '重置密码',
      noAuth: true,
    },
    component: () => import(/* webpackChunkName: "reset-pwd" */ '../views/pages/reset-pwd.vue'),
  },
  {
    path: '/403',
    meta: {
      title: '没有权限',
      noAuth: true,
    },
    component: () => import(/* webpackChunkName: "403" */ '../views/pages/403.vue'),
  },
  {
    path: '/404',
    meta: {
      title: '找不到页面',
      noAuth: true,
    },
    component: () => import(/* webpackChunkName: "404" */ '../views/pages/404.vue'),
  },
  { path: '/:path(.*)', redirect: '/404' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const role = localStorage.getItem('vuems_name');
  const permiss = usePermissStore();

  // if (!role && to.meta.noAuth !== true) {
  //   next('/login');
  // } else if (typeof to.meta.permiss == 'string' && !permiss.key.includes(to.meta.permiss)) {
  //   // 如果没有权限，则进入403
  //   next('/403');
  // } else {
  //   next();
  // }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
