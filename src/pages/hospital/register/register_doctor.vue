<template>
    <div class="container">
        <div class="tip">确认挂号信息</div>
        <!-- 卡片：展示就诊人的信息 -->
        <el-card style="max-width: 100%" class="box-card">
            <template #header>
                <div class="card-header">
                    <span>请点击选择就诊人</span>
                    <el-button type="success" :icon="User" @click="goUser">添加就诊人</el-button>
                </div>
            </template>
            <!-- 卡片身体部分:就诊人信息 -->
            <div class="user">
                <Visitor v-for="(user,index) in userArr" :key="user.id" class="item" :user="user" @click="changeIndex(index)" :index="index" :currentIndex="currentIndex" />
            </div>
        </el-card>
        <!-- 卡片：展示医生的信息 -->
        <el-card style="max-width: 100%" class="box-card">
            <!-- 头部 -->
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <!-- 身体部分 -->
            <div class="doctor">
                <el-descriptions class="margin-top" :column="2"  border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">就诊日期:</div>
                        </template>
                        {{ selectDoctor?.workDate }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">就诊医院:</div>
                        </template>
                        {{ selectDoctor?.param.hosname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">就诊科室:</div>
                        </template>
                        {{ selectDoctor?.param.depname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">医生姓名:</div>
                        </template>
                        {{ selectDoctor?.docname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">医生职称:</div>
                        </template>
                        {{ selectDoctor?.title }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">医生专长:</div>
                        </template>
                        {{ selectDoctor?.skill }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">医事服务费:</div>
                        </template>
                        {{ selectDoctor?.amount }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </el-card>
        <div class="ack">
            <el-button type="primary" :disabled="currentIndex==-1?true:false" @click="submitOrder">确认挂号</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
// 引入获取就诊人信息的方法
import { reqGetUser,reqGetDoctor } from "@/api/hospital/index";
import { reqSubmitOrder } from "@/api/user/index";
import { onMounted,ref } from 'vue';
import { UserResponseData,UserArr,SelectDoctorResponseData,Doctor } from "@/api/hospital/type";
import { submitOrder } from "@/api/user/type";
import { useRoute,useRouter } from 'vue-router';
// @ts-ignore
import { ElMessage } from 'element-plus';
let $router=useRouter();
let $route=useRoute();
// 存储全部就诊人信息
let userArr=ref<UserArr>([])
// 存储所选医生的信息
let selectDoctor=ref<Doctor>()
// 存储用户确定就诊人的索引值,-1代表一开始谁都没有被选择
let currentIndex=ref<number>(-1)
onMounted(() => {
    fetchUserData();
    fetchDoctorData()
});
const fetchUserData=async()=>{
    let result:UserResponseData=await reqGetUser()
    // console.log(result);
    if(result.code==200){
        userArr.value=result.data
    }  
}
const fetchDoctorData=async()=>{
    // console.log($route.query.docId)
    let result:SelectDoctorResponseData=await reqGetDoctor($route.query.docId as string)
    if(result.code==200){
        selectDoctor.value=result.data
    }
    // console.log(selectDoctor.value);
    
}
// 点击就诊人子组件的回调，点击存储就诊人的索引值
const changeIndex=(index:number)=>{
    // 存储当前用户选中的就诊人的索引值
    currentIndex.value=index
    
}
// 确定挂号按钮的回调
const submitOrder=async ()=>{
    let result:submitOrder=await reqSubmitOrder(selectDoctor.value?.hoscode as string,selectDoctor.value?.id as string,userArr.value[currentIndex.value].id as number)
    // console.log(result);
    if(result.code==200){
        // 提交订单成功
        $router.push({path:'/user/order',query:{orderId:result.data}})
    }else{
        // 提交订单失败
        ElMessage({
            type:"error",
            message:result.message
        })
    }
    
}
// 点击添加就诊人，跳转到就诊人管理里边的添加就诊人
const goUser=()=>{
    $router.push({path:'/user/patient',query:{type:'add'}})
}
</script>

<style lang="scss" scoped>
.container {
    .tip {
        font-size: 20px;
        margin-bottom: 40px;
    }

    .box-card {
        margin: 20px 0;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .user {
            display: flex;
            flex-wrap: wrap;

            .item {
                width: 31%;
                margin: 10px;
            }
        }
    }
    .ack{
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
    }
}
</style>