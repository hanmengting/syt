<template>
    <div class="user">
        <!-- 左侧导航区 -->
        <div class="menu">
            <div class="header">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span> / 会员中心</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/user/certification" @click="goUser('/user/certification')">
                    <el-icon><Postcard /></el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/user/order" @click="goUser('/user/order')">
                    <el-icon><Discount /></el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/user/patient" @click="goUser('/user/patient')">
                    <el-icon><User /></el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/user/profile" @click="goUser('/user/profile')">
                    <el-icon><Tickets /></el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/user/feedback" @click="goUser('/user/feedback')">
                    <el-icon><ChatLineRound /></el-icon>
                    <span>意见反馈</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧内容展示区：路由组件展示位置 -->
        <div class="content">
            <!-- 子组件展示结构的地方 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    HomeFilled,
    Discount,
    Postcard,
    User,
    Tickets,
    ChatLineRound,
} from '@element-plus/icons-vue'
import { useRouter,useRoute } from 'vue-router';
let $router= useRouter();
let $route=useRoute();
// 点击左侧菜单进行路由跳转
const goUser=(path:string)=>{
    $router.push({path:path})
}
</script>

<style scoped lang="scss">
.user {
    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;

        .header {
            display: flex;
            color: #7f7f7f;
        }
    }

    .content {
        flex: 8;
    }
}
</style>