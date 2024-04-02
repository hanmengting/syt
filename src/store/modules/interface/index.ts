import type { HosPitalDetail,DepartmentArr,UserInfo } from "../../../api/hospital/type";
// 定义仓库内部存储数据state的ts类型

export interface DetailState{
    hospitalInfo:HosPitalDetail,
    departmentArr:DepartmentArr
}

// 用户仓库相关state数据的ts类型定义
export interface UserState{
    visiable:boolean,//空置登陆组件中的dialog的显示与隐藏
    // 存储用户的验证码
    code:string,
    userInfo:UserInfo
}