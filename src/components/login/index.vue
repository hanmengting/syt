<template>
    <div class="login_container">
        <!-- title是对话框右上角的标题 v-model是控制对话框的显示与隐藏 -->
        <el-dialog v-model="userStore.visiable" title="用户登录" @close="close">
            <!-- 对话框身体部分结构 -->
            <div class="content">
                <el-row>
                    <!-- 左侧收集号码登录 -->
                    <el-col :span="12">
                        <div class="login">
                            <div v-show="scene == 0">
                                <el-form :model="loginParam" :rules="rules" ref="form">
                                    <el-form-item prop="phone">
                                        <el-input placeholder="请输入手机号码" :prefix-icon="User"
                                            v-model="loginParam.phone"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="code">
                                        <el-input placeholder="请输入手机验证码" :prefix-icon="Lock"
                                            v-model="loginParam.code"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button :disabled="!isPhone || flag ? true : false" @click="getCode">
                                            <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                                            <span v-else>获取验证码</span>
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                                <div class="bottom">
                                    <el-button style="width: 100%;" type="primary" size="default"
                                        :disabled="!isPhone || loginParam.code.length < 6 ? true : false"
                                        @click="login">用户登录</el-button>
                                    <div class="show_login" @click="changeScene0">
                                        <p>微信扫码登录</p>
                                        <svg t="1711430202005" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" p-id="4321" width="32" height="32">
                                            <path
                                                d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                                fill="#28C445" p-id="4322"></path>
                                            <path
                                                d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                                fill="#28C445" p-id="4323"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="webChat" v-show="scene == 1">
                                <div id="login_container"></div>
                                <div class="show_login" @click="changeScene1">
                                    <p class="verity">手机短信码验证登录</p>
                                    <svg t="1711434913085" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="23612" width="32" height="32">
                                        <path
                                            d="M512 512m-428.218182 0a428.218182 428.218182 0 1 0 856.436364 0 428.218182 428.218182 0 1 0-856.436364 0Z"
                                            fill="#257AE7" p-id="23613"></path>
                                        <path
                                            d="M611.644509 688.872727H421.664582c-19.502545 0-35.337309-15.490327-35.337309-34.583272V614.4h260.654545v39.889455c0 19.083636-15.825455 34.583273-35.337309 34.583272z"
                                            fill="#80B7F9" p-id="23614"></path>
                                        <path
                                            d="M540.8768 633.018182h-48.444509c-7.177309 0-13.014109 6.255709-13.014109 13.963636s5.8368 13.963636 13.014109 13.963637h48.444509c7.177309 0 13.014109-6.255709 13.014109-13.963637s-5.808873-13.963636-13.014109-13.963636z"
                                            fill="#FFFFFF" p-id="23615"></path>
                                        <path
                                            d="M603.908655 325.818182H420.091345c-28.886109 0-52.382255 23.784727-52.382254 53.033891v266.295854c0 29.249164 23.496145 53.033891 52.382254 53.033891h183.81731c28.886109 0 52.382255-23.784727 52.382254-53.033891V378.852073c0-29.230545-23.496145-53.033891-52.382254-53.033891z m-183.81731 24.482909h183.81731c15.546182 0 28.206545 12.8 28.206545 28.550982v218.093382H391.8848V378.852073c0-15.750982 12.660364-28.560291 28.206545-28.560291z m183.81731 323.425745H420.091345c-15.546182 0-28.206545-12.809309-28.206545-28.560291v-23.738181h240.2304v23.738181c0 15.750982-12.660364 28.560291-28.206545 28.560291z"
                                            fill="#FFFFFF" p-id="23616"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="right">
                            <div class="top">
                                <div class="item">
                                    <img src="../../assets/images/code_login_wechat.png  " alt="">
                                    <svg t="1711431406919" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="9880" width="16" height="16">
                                        <path
                                            d="M308.73856 119.23456C23.65696 170.15296-71.37024 492.23936 155.392 639.66464c12.43392 7.99232 12.43392 7.104-6.21824 62.76096l-15.98464 47.65952 57.43104-30.784 57.43104-30.78656 30.49216 7.40096c31.96928 7.99232 72.82432 13.61664 100.0576 13.61664l16.28416 0-5.62688-21.61152c-44.70016-164.5952 109.82912-327.71072 310.8352-327.71072l27.2384 0-5.62432-19.53792C677.59616 186.43456 491.392 86.67136 308.73856 119.23456zM283.87072 263.40352c30.1952 20.4288 31.97184 64.5376 2.95936 83.48416-47.06816 30.78656-102.1312-23.38816-70.45632-69.57056C230.28736 256.59648 263.74144 249.78688 283.87072 263.40352zM526.62016 263.40352c49.73568 33.45408 12.43392 110.71744-43.22304 89.40288-40.25856-15.39328-44.99712-70.75072-7.40096-90.5856C490.79808 254.22848 513.88928 254.81984 526.62016 263.40352zM636.44928 385.37216c-141.2096 25.7536-239.19872 132.91776-233.57184 256.06656 7.40096 164.89472 200.71168 278.56896 386.32448 227.65312l21.90592-5.92128 46.1824 24.8704c25.4592 13.9136 46.77376 23.97696 47.36512 22.79168 0.59392-1.47968-4.43648-19.24352-10.95168-39.6672-14.79936-45.59104-15.09632-42.33472 4.73856-56.54272C1121.64864 654.464 925.67552 332.97408 636.44928 385.37216zM630.82496 518.28992c12.4288 8.28928 18.944 29.01248 13.61408 44.1088-11.24864 32.26624-59.49952 34.63424-72.52992 3.55328C557.10976 530.13248 597.9648 496.97536 630.82496 518.28992zM828.57472 521.84576c19.53792 18.64704 16.2816 50.32448-6.51264 62.16448-34.93376 17.76128-71.63904-17.76128-53.58336-51.80416C780.32128 510.2976 810.81344 504.97024 828.57472 521.84576z"
                                            fill="#272636" p-id="9881"></path>
                                    </svg>
                                    <p>微信扫一扫关注</p>
                                    <p>"快速预约挂号"</p>
                                </div>
                                <div class="item">
                                    <img src="../../assets/images/code_app.png" alt="">
                                    <svg t="1711431376358" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="8781" width="16" height="16">
                                        <path
                                            d="M789.333333 0A64 64 0 0 1 853.333333 64v896a64 64 0 0 1-64 64h-554.666666A64 64 0 0 1 170.666667 960v-896A64 64 0 0 1 234.666667 0zM768 85.333333H256v853.333334h512V85.333333z m-213.333333 682.666667a42.666667 42.666667 0 0 1 0 85.333333h-85.333334a42.666667 42.666667 0 0 1 0-85.333333h85.333334z"
                                            fill="#191919" p-id="8782"></path>
                                    </svg>
                                    <p>扫一扫下载</p>
                                    <p>"预约挂号"APP</p>
                                </div>
                            </div>
                            <p class="tip">尚医通官方指定平台</p>
                            <p class="tip">快速挂号 安全放心</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="userStore.visiable = false" @close="close">关闭窗口</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 引入微信扫码登陆的请求
import { reqWxLogin } from "../../api/hospital/index";
// 引入倒计时模块
import CountDown from '../countdown/index.vue'
import { ref, reactive, computed, watch } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
// 获取user仓库中的数据(visiable)可以控制login组件的对话框的显示与隐藏
import useUserStore from '../../store/modules/user';
import { ElMessage } from 'element-plus';
import type { WXLoginResponseData } from "../../api/hospital/type";
// 获取form组件实例
let form = ref<any>()
// 定义一个响应式数据控制倒计时组件显示与隐藏
let flag = ref<boolean>(false)//flag为真开启倒计时，为假并未开启倒计时
let userStore = useUserStore();
let scene = ref<number>(0)//0代表收集号码登录，1表示微信扫码登录
// 收集表单数据--手机号码
let loginParam = reactive({
    phone: '',
    // 手机验证码
    code: ''
})
// 计算出当前表单元素收集的内容是否是手机号码格式
let isPhone = computed(() => {
    // 手机号码的正则表达式
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    // 返回布尔值，真代表手机号码，假代表不是手机号码
    return reg.test(loginParam.phone)

})
// 获取验证码的回调
const getCode = async () => {
    // 开启倒计时模式，倒计时组件显示
    flag.value = true
    // 通知pinia仓库存储验证码
    try {
        // 获取验证码成功
        await userStore.getCode(loginParam.phone);
        loginParam.code = userStore.code;
    } catch (error) {
        // 获取验证码失败
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
}
// 显示手机短信码验证登录还是微信扫码登录
const changeScene0 = async () => {
    // 点击之后变为微信扫码登录页面
    scene.value = 1;
    //发请求获取微信扫码二维码需要参数
    //咱们在想硅谷学校的服务器发请求,获取微信扫码登录页面参数
    //还需要携带一个参数:告诉学校服务器用户授权成功以后重定向项目某一个页面
    let redirect_URL = encodeURIComponent(window.location.origin + "/wxlogin");
    let result: WXLoginResponseData = await reqWxLogin(redirect_URL);
    //生成微信扫码登录二维码页面
    //@ts-ignore
    new WxLogin({
        self_redirect: true, //true:手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
        id: "login_container", //显示二维码容器设置
        appid: result.data.appid, //应用位置标识appid
        scope: "snsapi_login", //当前微信扫码登录页面已经授权了
        redirect_uri: result.data.redirectUri, //填写授权回调域路径,就是用户授权成功以后，微信服务器向公司后台推送code地址
        state: result.data.state, //state就是学校服务器重定向的地址携带用户信息
        style: "black",
        href: "",
    });
}
const changeScene1 = () => {
    scene.value = 0
}
// 计数器子组件绑定的一个自定义事件
// 倒计时为0时，通知父组件倒计时组件应该隐藏
const getFlag = (val: boolean) => {
    flag.value = val
}


// 点击用户登录按钮回调
const login = async () => {
    // validate保证表单校验的两个条件都是正确的才能正确执行登录
    await form.value.validate();
    // 发起登录请求
    // 请求成功，顶部组件需要展示用户名字，对话框关闭
    // 请求失败，弹出对应登陆失败的错误信息
    try {
        // 用户登陆成功
        await userStore.userLogin(loginParam);
        // 对话框关闭
        userStore.visiable = false;
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
}


// 自定义校验规则:手机号自定义校验规则
const validatorPhone = (_rule: any, value: any, callback: any) => {
    // rule:即为表单校验的规则对象
    // value:即为当前文本的内容
    // callBack:回调函数
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的手机号'))
    }
}
// 自定义校验规则:验证码自定义校验规则
const validatorCode = (_rule: any, value: any, callBack: any) => {
    // rule:即为表单校验的规则对象
    // value:即为当前文本的内容
    // callBack:回调函数
    if (/^\d{6}$/.test(value)) {
        callBack();
    } else {
        callBack(new Error('请输入正确的验证码'));
    }
}

// 表单校验的规则对象
// required:代表当前字段务必校验
// message:代表的校验错误的提示信息
// trigger:代表表带校验触发的时机  change:文本发生变化的时候进行校验  blur:失去焦点的时候触发校验
// min:代表最小位数
// max:代表最大位数
const rules = {
    // 手机号校验
    // phone:[
    //     {required:true,message:'请输入正确的手机号',trigger:'change',min:11}
    // ],
    // code:[
    // {required:true,message:'验证码错误',trigger:'blur',min:6}
    // ]

    // 自定义校验规则
    phone: [{ trigger: 'change', validator: validatorPhone }],
    code: [{ trigger: 'change', validator: validatorCode }]
}

// 对话框关闭事件的回调
const close = () => {
    // 清空收集到的数据
    // Object.assign(loginParam,{phone:'',code:''})
    // 清除上一次表单校验的结果和收集到的数据
    form.value.resetFields();
}

// 监听场景的值
watch(() => scene.value, (val: number) => {
    if (val == 1) {
        userStore.queryState();
    }
})
</script>

<style lang="scss" scoped>
.login_container {
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .content {
        margin: 20px 0;

        .login {
            border: 1px solid #ccc;
            padding: 20px;

            .show_login {
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
            }

            .bottom {
                display: flex;
                flex-direction: column;
                align-items: center;

                p {
                    margin: 10px 0;
                }
            }
        }

        .webChat {
            display: flex;
            flex-direction: column;
            align-items: center;

            p {
                margin-bottom: 5px;
            }
        }

        .right {
            .top {
                display: flex;
                justify-content: space-around;

                .item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    img {
                        width: 130px;
                        height: 130px;
                    }

                    p {
                        margin-top: 10px;
                    }
                }
            }

            .tip {
                text-align: center;
                margin-top: 20px;
                font-size: 18px;
                font-weight: 900;
                font-style: italic;
            }
        }
    }
}
</style>