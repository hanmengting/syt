<template>
    <div class="top">
        <div class="content">
            <!-- 左侧 -->
            <div class="left" @click="goHome">
                <img src="../../assets/images/logo.png" alt="">
                <p>尚医通 预约挂号统一平台</p>
            </div>
            <!-- 右侧 -->
            <div class="right">
                <p class="help">帮助中心</p>
                <!-- 如果没有用户名字：显示登录注册 -->
                <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
                <!-- 如果有用户名字，显示用户名字，下拉菜单 -->
                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                        {{ userStore.userInfo.name }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
                            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import useUserStore from '../../store/modules/user';
// 引入路由器
import { useRouter } from 'vue-router';
let userStore = useUserStore();
// 创建路由对象
let $router = useRouter();
const goHome = () => {
    // 编程式导航跳转到首页
    $router.push({ path: '/home' })
}

// 点击登陆注册按钮的时候弹出对话框
const login = () => {
    userStore.visiable = true
}

// 退出登录的回调函数
const loginOut=()=>{
    // 通知pinia仓库清除用户相关的信息
    userStore.loginOut();
    // 编程式导航跳转到首页
    $router.push({ path: '/home' })
}
// 点击跳转到相应的会员中心
const goUser=(path:string)=>{
    $router.push({path:path})
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.el-dropdown-link:hover{
    color: var(--el-color-primary);
}
.top {
    position: fixed; //固定定位
    z-index: 999;
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: center;
}

.content {
    width: 1200px;
    height: 70px;
    background-color: white;
    display: flex;
    justify-content: space-between;

    .left {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }

        p {
            font-style: 20px;
            color: #55a6fe;
        }
    }

    .right {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #666;

        p {
            cursor: pointer;
        }

        .help {
            margin-right: 10px;
        }
    }
}
</style>