<template>
    <!-- 展示订单详情的结构 -->
    <el-card style="max-width: 100%">
        <!-- 卡片头部结构 -->
        <template #header>
            <div class="card-header">挂号详情</div>
        </template>
        <!-- 卡片中间 -->
        <div class="body">
            <!-- 左侧标签 -->
            <el-tag type="success" effect="dark">
                <div class="tag">
                    <el-icon>
                        <Check />
                    </el-icon>
                    <span>{{ OrderInfo?.param.orderStatusString }}</span>
                </div>
            </el-tag>
            <!-- 右侧二维码 -->
            <div class="QR">
                <img src="../../../../assets/images/code_app.png" alt="">
                <div>
                    <p>
                        微信
                        <svg t="1711766451438" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2583" width="16" height="16">
                            <path
                                d="M1024 619.52c0-143.36-138.24-256-307.2-256s-307.2 112.64-307.2 256 138.24 256 307.2 256c30.72 0 61.44-5.12 92.16-10.24l97.28 51.2-25.6-76.8c87.04-51.2 143.36-128 143.36-220.16z m-414.72-40.96c-30.72 0-51.2-20.48-51.2-51.2s20.48-51.2 51.2-51.2 51.2 20.48 51.2 51.2c0 25.6-25.6 51.2-51.2 51.2z m209.92 0c-30.72 0-51.2-20.48-51.2-51.2s20.48-51.2 51.2-51.2 51.2 20.48 51.2 51.2c0 25.6-25.6 51.2-51.2 51.2z"
                                fill="#4CBF00" p-id="2584"></path>
                            <path
                                d="M358.4 609.28c0-158.72 153.6-286.72 348.16-286.72h15.36C680.96 189.44 542.72 87.04 368.64 87.04 163.84 87.04 0 225.28 0 394.24c0 107.52 66.56 204.8 168.96 256l-30.72 92.16L256 686.08c35.84 10.24 71.68 15.36 112.64 15.36h10.24c-15.36-30.72-20.48-61.44-20.48-92.16z m138.24-414.72c35.84 0 66.56 30.72 66.56 66.56s-30.72 66.56-66.56 66.56c-35.84-5.12-66.56-35.84-66.56-71.68s30.72-61.44 66.56-61.44z m-250.88 128c-35.84 0-61.44-30.72-61.44-66.56s30.72-66.56 66.56-66.56 61.44 30.72 61.44 66.56-30.72 66.56-66.56 66.56z"
                                fill="#4CBF00" p-id="2585"></path>
                        </svg>
                        关注 "北京114预约挂号"
                    </p>
                    <p>"快速预约挂号"</p>
                </div>

            </div>
        </div>
        <!-- 卡片底部:订单详情 -->
        <template #footer>
            <div class="bottom">
                <div class="left">
                    <el-descriptions class="margin-top" :column="1" border>
                        <el-descriptions-item align="center">
                            <template #label>
                                <div class="cell-item">
                                    就诊人信息
                                </div>
                            </template>
                            {{ OrderInfo?.patientName }}
                        </el-descriptions-item>
                        <el-descriptions-item align="center">
                            <template #label>
                                <div class="cell-item">
                                    就诊日期
                                </div>
                            </template>
                            {{ OrderInfo?.reserveDate }}
                        </el-descriptions-item>
                        <el-descriptions-item align="center">
                            <template #label>
                                <div class="cell-item">
                                    就诊医院
                                </div>
                            </template>
                            {{ OrderInfo?.hosname }}
                        </el-descriptions-item>
                        <el-descriptions-item align="center">
                            <template #label>
                                <div class="cell-item">
                                    就诊科室
                                </div>
                            </template>
                            {{ OrderInfo?.depname }}
                        </el-descriptions-item>
                        <el-descriptions-item align="center">
                            <template #label>
                                <div class="cell-item">
                                    医生职称
                                </div>
                            </template>
                            {{ OrderInfo?.title }}
                        </el-descriptions-item>
                        <el-descriptions-item align="center">
                            <template #label>
                                <div class="cell-item">
                                    医事服务费
                                </div>
                            </template>
                            {{ OrderInfo?.amount }}
                        </el-descriptions-item>
                        <el-descriptions-item align="center">
                            <template #label>
                                <div class="cell-item">
                                    挂号订单
                                </div>
                            </template>
                            {{ OrderInfo?.outTradeNo }}
                        </el-descriptions-item>
                        <el-descriptions-item align="center">
                            <template #label>
                                <div class="cell-item">
                                    挂号时间
                                </div>
                            </template>
                            {{ OrderInfo?.createTime }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <div class="btn" v-if="OrderInfo?.orderStatus == 0 || OrderInfo?.orderStatus == 1">
                        <el-button plain @click="open">取消预约</el-button>
                        <el-button type="primary" v-if="OrderInfo?.orderStatus == 0" plain
                            @click="openDialog()">支付</el-button>
                    </div>
                </div>
                <div class="right">
                    <el-card class="box-card" shadow="never">
                        <template #header>
                            <div class="card-header">
                                <span>注意事项</span>
                            </div>
                        </template>
                        <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
                        <p style="color: red">
                            2.【取号】就诊当天需在{{ OrderInfo?.fetchTime }}在医院取号，未取号视为爽约，该号不退不换；
                        </p>
                        <p>
                            3.【退号】在{{ OrderInfo?.quitTime }}前可在线退号 ，逾期将不可办理退号退费；
                        </p>
                        <p>
                            4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
                        </p>
                        <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                    </el-card>
                </div>
            </div>
        </template>
    </el-card>
    <!-- 展示支付二维码的结构 -->
    <!-- 对话框通过v-model去控制对话框的显示与隐藏 -->
    <el-dialog v-model="dialogFormVisible" title="微信支付" width="350">
        <!-- 身体部分：微信支付二维码展示区 -->
        
        <div class="payment">
            <img :src="imgUrl" alt="">
            <p>请使用微信扫一扫</p>
            <p>扫描微微码支付</p>
        </div>
        
        <!-- 页脚：关闭窗口 -->
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">关闭窗口</el-button>
            </div>
        </template>
    </el-dialog>
</template>


<script setup lang="ts">
import { Check } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { reqGetOrderInfo, reqOrderCancel,reqGetPayment,reqGetPayResult } from "@/api/user/index";
import type { OrderReponseData, OrderInfo,OrderPaymentData,PayResult } from "@/api/user/type";
import { useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
// @ts-ignore
import QRCode from 'qrcode'
let $route = useRoute();
// 存储订单详情信息
let OrderInfo = ref<OrderInfo>()
// 定义存储支付二维码的路径
let imgUrl=ref()
// 控制对话框的显示与隐藏
const dialogFormVisible = ref(false)
onMounted(() => {
    fetchOrderDetail();
});
// 获取订单详情的回调
const fetchOrderDetail = async () => {
    let result: OrderReponseData = await reqGetOrderInfo($route.query.orderId as string)
    // console.log(result);
    if (result.code == 200) {
        OrderInfo.value = result.data
    }
}
// 取消预约的回调函数 订单有三种状态：orderStatus   -1取消预约   0预约但没有支付   1预约并支付成功
const cancel = async () => {
    try {
        // 取消预约成功
        await reqOrderCancel($route.query.orderId as string)
        // 再次获得订单详情
        fetchOrderDetail()
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '取消失败'
        })
    }
}
// 是否确认取消预约的弹出框
const open = () => {
    ElMessageBox.confirm(
        '确认取消预约吗?',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '取消成功',
            })
            cancel()
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消失败',
            })
        })
}
// 获取订单支付二维码的回调
// 点击支付按钮的回调
const openDialog=async()=>{
    // 展示对话框
    dialogFormVisible.value = true
    // 获取支付需要的信息
    let result:OrderPaymentData=await reqGetPayment($route.query.orderId as string)
    // console.log(result);
    // 根据服务器返回的二维码信息生成二维码图片
    imgUrl.value=await QRCode.toDataURL(result.data.codeUrl)
    // 询问服务器当前交易的支付结果
    // 只要二维码出来，每隔几秒询问一次服务器是否支付成功
    let timer = setInterval(async()=>{
        let result:PayResult=await reqGetPayResult($route.query.orderId as string)
        console.log(result);
        // 如果服务器返回的数据data:true表示支付成功
        if(result.data){
            // 关闭对话框
            dialogFormVisible.value=false
            ElMessage({
                type:'success',
                message:'支付成功'
            })
            // 清除定时器
            clearInterval(timer)
            // 再次获取订单详情数据
            fetchOrderDetail()
        }
        if(!dialogFormVisible.value){
            clearInterval(timer)
        }
        
    },1000)
    
    
    
}
</script>

<style lang="scss" scoped>
.card-header {
    font-size: 18px;
}

.body {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tag {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .QR {
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            width: 50px;
            height: 50px;
            margin-right: 5px;
        }

        p {
            line-height: 25px;
            font-size: 15px;
            font-weight: 900;
        }
    }
}

.bottom {
    display: flex;
    margin: 20px 0;

    .left {
        flex: 4;
        margin-right: 30px;

        .btn {
            margin-top: 15px;
        }
    }

    .right {
        flex: 6;

        .box-card {
            p {
                line-height: 30px;
                font-size: 16px;
            }
        }
    }
}
.payment{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
    padding: 20px 0;
    p{
        line-height: 30px;
    }
}
</style>