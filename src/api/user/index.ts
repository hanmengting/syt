// 引入二次封装的axios
import request from "@/utils/request";
import { AddOrUpdateUser,submitOrder,OrderReponseData,orderCancel,OrderPaymentData,PayResult,UserInfoResponseData,CertationTypeResponseData,UserParams,UserOrderInfoResponseData,AllUserResponseData,AllOrderStateResponseData } from "./type"; 
// 枚举地址
enum API{
    // 提交订单，获取订单号码接口
    SUBMITORDER_URL='/order/orderInfo/auth/submitOrder/',
    // 获取订单详情的接口
    GETORDERINFO_URL='/order/orderInfo/auth/getOrderInfo/',
    // 取消订单的接口
    ORDERCANCEL_URL='/order/orderInfo/auth/cancelOrder/',
    // 获取订单支付二维码接口
    GETPAYMENT_URL='/order/weixin/createNative/',
    // 查询支付状态接口
    GETPAYRESULT_URL='/order/weixin/queryPayStatus/',
    // 获取当前帐号用户信息
    USERINFO_URL='/user/auth/getUserInfo',
    // 获取证件类型的接口地址
    CERTIFICATIONTYPE_URL='/cmn/dict/findByDictCode/',
    // 用户认证的接口
    USERCERTATION_URL='/user/auth/userAuah',
    // 获取用户所有就诊订单的数据
    USERORDERINFO_URL='/order/orderInfo/auth/',
    // 获取全部就诊人
    ALLUSER_URL='/user/patient/auth/findAll',
    // 获取订单状态
    ORDERSTATE_URL='/order/orderInfo/auth/getStatusList',
    // 获取城市的数据
    CITY_URL='/cmn/dict/findByParentId/',
    // 新增就诊人接口
    ADDUSER_URL='/user/patient/auth/save',
    // 修改就诊人信息接口
    UPDATEUSER_URL='/user/patient/auth/update',
    // 删除已有的就诊人
    DELETEUSER_URL='/user/patient/auth/remove/'
}
// 提交订单 
export const reqSubmitOrder=(hoscode:string,scheduleId:string,patientId:number)=>request.post<any,submitOrder>(API.SUBMITORDER_URL+`${hoscode}/${scheduleId}/${patientId}`)
// 获取订单详情的方法
export const reqGetOrderInfo=(id:string)=>request.get<any,OrderReponseData>(API.GETORDERINFO_URL+`${id}`)
// 取消订单
export const reqOrderCancel=(orderId:string)=>request.get<any,orderCancel>(API.ORDERCANCEL_URL+`${orderId}`)
// 获取订单支付二维码
export const reqGetPayment=(orderId:string)=>request.get<any,OrderPaymentData>(API.GETPAYMENT_URL+`${orderId}`)
// 查询支付状态
export const reqGetPayResult=(orderId:string)=>request.get<any,PayResult>(API.GETPAYRESULT_URL+`${orderId}`)
// 获取当前帐号用户信息
export const reqUserInfo=()=>request.get<any,UserInfoResponseData>(API.USERINFO_URL)
// 获取证件类型的方法
export const reqCertificationType=(certificatesType='certificatesType')=>request.get<any,CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL+`${certificatesType}`)
// 用户认证方法
export const reqUserCertation=(data:UserParams)=>request.post<any>(API.USERCERTATION_URL,data)
// 获取用户所有就诊订单的数据
export const reqUserOrderInfo = (page: number, limit: number, patientId: string, orderStatus: string) => request.get<any, UserOrderInfoResponseData>(API.USERORDERINFO_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
// 获取全部就诊人
export const reqAllUser=()=>request.get<any,AllUserResponseData>(API.ALLUSER_URL)
// 获取订单状态
export const reqOrderState=()=>request.get<any,AllOrderStateResponseData>(API.ORDERSTATE_URL)
// 获取城市的数据
export const reqCity=(parentId:string)=>request.get<any>(API.CITY_URL+`${parentId}`)
// 新增就诊人或修改就诊人信息
export const reqAddOrUpdateUser=(data:AddOrUpdateUser)=>{
    if(data.id){
        return request.put<any>(API.UPDATEUSER_URL,data)
    }else{
        return request.post<any>(API.ADDUSER_URL,data)
    }
}
// 删除已有的就诊人
export const reqDeleteUser=(id:number)=>request.delete<any>(API.DELETEUSER_URL+`${id}`)