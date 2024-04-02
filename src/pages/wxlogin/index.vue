<template>
    <div>
        
    </div>
</template>

<script setup lang="ts">
// 获取用户信息
import { useRoute } from "vue-router";
// 本地存储信息
import { SET_TOKEN } from "@/utils/user";
// 获取路由对象
let $route=useRoute();
// console.log($route.query);
// 持久化存储用户信息
SET_TOKEN(JSON.stringify($route.query))
// 访问此路由组件代码执行：授权成功
let html:any =document.querySelector('html')
html.style.display='none'
</script>

<style lang="scss" scoped>
    
</style>