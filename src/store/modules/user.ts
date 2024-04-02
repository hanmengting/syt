// 定义用户相关的仓库
import { defineStore } from "pinia";
// 引入获取验证码的请求方法
import { reqCode, reqUserLogin } from "../../api/hospital";
import type { LoginData, UserLoginResponseData } from "../../api/hospital/type";
import type { UserState } from "./interface/index";
import { GET_TOKEN, SET_TOKEN,REMOVE_TOKEN } from "../../utils/user";
const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      visiable: false, //空置登陆组件中的dialog的显示与隐藏
      // 存储用户的验证码
      code: "",
      userInfo: JSON.parse(GET_TOKEN() as string) || {},
    };
  },
  actions: {
    // 获取验证码的方法
    async getCode(phone: string) {
      // 服务器携带手机号，获取验证码
      // 正常开发时，只需要发一个请求，后台会将验证码推送到用户手机设备当中
      let result: any = await reqCode(phone);
      // console.log(result);
      if (result.code == 200) {
        this.code = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    // 用户手机号码登陆的方法
    async userLogin(loginData: LoginData) {
      let result: UserLoginResponseData = await reqUserLogin(loginData);
      // console.log(result);
      if (result.code == 200) {
        this.userInfo = result.data;
        // 本地存储持久化存储用户信息
        SET_TOKEN(JSON.stringify(this.userInfo));
        // 返回一个成功的Promise
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    // 退出登录的方法
    loginOut(){
      // 清空仓库的数据
      this.userInfo={name:'',token:''};
      // 清空本地存储的数据
      REMOVE_TOKEN();
    },
    // 查询微信扫码的结果，看本地存储是否已经存储数据
    queryState(){
      // 开启定时器，每隔一段时间监听一下本地仓库是否有用户信息
      let timer=setInterval(()=>{
        // 本地存储已经有数据，扫码成功
        if(GET_TOKEN()){
          //关闭对话框
          this.visiable=false;
          this.userInfo=JSON.parse(GET_TOKEN() as string);
          clearInterval(timer);
        }
      },1000)
    }
  },
  getters: {},
});
export default useUserStore;
