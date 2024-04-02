// 路由鉴权：路由能不能被访问的权限的设置，通过全局守卫完成
// 引入路由器
import router from "./router";
// 引入存有用户token的仓库
import pinia from "@/store";
import useUserStore from "./store/modules/user";
let userStore = useUserStore(pinia);
// 存储用户未登录可以访问的路由的路径
let List = [
  "/home",
  "/hospital/register",
  "/hospital/detail",
  "/hospital/notice",
  "/hospital/close",
  "/hospital/search",
];
// 引入进度条
import Nprogress from 'nprogress';
// // 引入进度条的样式
import 'nprogress/nprogress.css'
// // 进度条的加载小圆球不要
Nprogress.configure({showSpinner:false})

// 添加相应的全局守卫：前置守卫，后置守卫
// 前置守卫
// to要跳转到哪个路由
// from要从哪个路由跳转
// next放行函数
router.beforeEach((to, _from, next) => {
  // 访问路由组件之前，进度条开始动
  Nprogress.start();
  // 动态设置网页左上角标题
  document.title = `尚医通-${to.meta.title}`;
  // 判断用户是否登录了-token
  let token = userStore.userInfo.token;
  if (token) {
    next();
  } else {
    if (List.includes(to.path) || to.meta.isWechatLogin) {
      next();
    } else {
      userStore.visiable = true;
    }
  }
  // 错误，还需要放行微信扫码登陆页面
  // if (token) {
  //   next();
  // } else {
  //   // 用户未登录
  //   if (List.includes(to.path)) {
  //     next();
  //   } else {
  //     // 登录组件显示出来
  //     userStore.visiable = true;
  //   }
  // }
});

// 后置路由
router.afterEach((_to, _from) => {
  // 访问路由结束后，进度条消失
  Nprogress.done();
});
