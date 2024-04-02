<template>
    <!-- 展示全部的订单信息 -->
    <el-card style="width: 100%; margin: 0 0 30px 0;">
        <template #header>
            <div class="card-header">
                <span>挂号订单</span>
            </div>
        </template>
        <!-- 可以提供用户选择的下拉菜单 -->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="就诊人">
                <el-select placeholder="请选择就诊人" v-model="patientId" @change="change">
                    <el-option v-for="item in allUser" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select placeholder="请选择订单状态" v-model="OrderStatus" @change="change">
                    <el-option v-for="(item,index) in allOrderState" :key="index" :label="item.comment" :value="item.status"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <!-- 表格展示订单数据 -->
        <el-table :data="allOrderArr">
            <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
            <el-table-column label="医院" prop="hosname"></el-table-column>
            <el-table-column label="科室" prop="depname"></el-table-column>
            <el-table-column label="医生" prop="title"></el-table-column>
            <el-table-column label="服务费" prop="amount"></el-table-column>
            <el-table-column label="就诊人" prop="patientName"></el-table-column>
            <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
            <el-table-column label="操作">
                <template #="{ row }">
                    <el-button type="primary" text @click="goDetail(row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="demo-pagination-block" style="margin-top: 20px;">
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                layout="prev, pager, next, jumper,-> ,sizes,total" :total="total" @current-change="handler" @size-change="sizeHandler" />
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqUserOrderInfo,reqAllUser,reqOrderState } from "@/api/user/index";
import type { AllUser,AllOrderState,UserOrderInfoResponseData, Records,AllUserResponseData,AllOrderStateResponseData } from "@/api/user/type";
import { useRouter } from 'vue-router';
let $router=useRouter()
// 当前分页器处于第几页(默认值为1)
let pageNo = ref<number>(1)
// 当前页码没页几条数据
let pageSize = ref<number>(10)
// 收集就诊人的id
let patientId = ref<string>('')
// 收集订单状态
let OrderStatus = ref<string>('')
// 存储全部订单数据
let allOrderArr = ref<Records>([])
// 存储一共有多少条数据
let total = ref<number>(0)
// 存储所有就诊人信息
let allUser=ref<AllUser>([])
// 存储所有订单状态信息
let allOrderState=ref<AllOrderState>([])
onMounted(() => {
    // 获取订单的方法
    getAllOrder()
    // 获取全部就诊人的信息以及获取全部订单的状态
    getData()
});
// 发请求得到所有就诊人信息
const getAllOrder = async () => {
    let result: UserOrderInfoResponseData = await reqUserOrderInfo(pageNo.value, pageSize.value, patientId.value, OrderStatus.value)
    if (result.code == 200) {
        allOrderArr.value = result.data.records
        total.value = result.data.total
    }

}
// 详情插槽
const goDetail=(row:any)=>{
    // row是父组件数据数组中其中一个，即是你所点击的就诊人的就诊详细记录,以此可以转跳到详情页面
    // console.log(row);
    $router.push({path:'/user/order',query:{orderId:row.id}})
}
// 分页器组件当前页码的回调
const handler=(pager:number)=>{
    pageNo.value=pager
    getAllOrder()
}
// 分页器组件一页展示几条数据回调
const sizeHandler=(pageSizes:number)=>{
    pageSize.value=pageSizes
    getAllOrder()
}
// 获取全部就诊人的信息以及获取全部订单的状态的回调
const getData=async()=>{
    // 获取全部就诊人信息
    const resultPatient:AllUserResponseData=await reqAllUser()
    // console.log(resultPatient);
    const resultState:AllOrderStateResponseData=await reqOrderState()
    // console.log(resultState);

    allUser.value=resultPatient.data
    allOrderState.value=resultState.data
}
// 就诊人下拉菜单选择更新
// 订单状态下拉菜单选择更新
const change=()=>{
    // 根据就诊人id获取就诊人信息
    // 根据订单状态获取就诊人信息
    getAllOrder()
}

</script>

<style lang="scss" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
