// 定义详情页面的数据的ts类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
// 代表医院详情的数据
export interface HosPitalDetail {
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
  hospital: {
    id: string;
    createTime: string;
    updateTime: string;
    isDeleted: number;
    param: {
      hostypeString: string;
      fullAddress: string;
    };
    hoscode: string;
    hosname: string;
    hostype: string;
    provinceCode: string;
    cityCode: string;
    districtCode: string;
    address: string;
    logoData: string;
    intro: null;
    route: string;
    status: number;
    bookingRule: null;
  };
}
// // 医院详情返回数据
export interface HospitalDetail extends ResponseData {
  data: HosPitalDetail;
}

// 代表医院科室的数据
export interface Department {
  depcode: string;
  depname: string;
  children?: Department[];
}
// 代表存储科室的数组类型
export type DepartmentArr = Department[];
// 获取科室接口返回的数据类型
export interface DepartmentResponseData extends ResponseData {
  data: DepartmentArr;
}
// 用户登录接口需要携带的参数的类型
export interface LoginData {
  phone: string;
  code: string;
}
// 登录接口返回用户信息数据
export interface UserInfo {
  name: string;
  token: string;
}
// 登录接口返回的数据的ts类型
export interface UserLoginResponseData extends ResponseData {
  data: UserInfo;
}

// 定义微信扫码登录返回的数据的ts类型
export interface WXLogin {
  redirectUri: string;
  appid: string;
  scope: string;
  state: string;
}
export interface WXLoginResponseData extends ResponseData {
  data: WXLogin;
}

export interface BaseMap {
  workDateString: string;
  releaseTime: string;
  bigname: string;
  stopTime: string;
  depname: string;
  hosname: string;
}
export interface WorkData {
  workDate: string;
  workDateMd: string;
  dayOfWeek: string;
  docCount: number;
  reservedNumber: number;
  availableNumber: number;
  status: number;
}
export interface HospitalWorkData extends ResponseData {
  data: {
    total: number;
    bookingScheduleList: WorkData[];
    baseMap: BaseMap;
  };
}

// 科室排班数据类型
// 代表医生的数据
export interface Doctor {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    dayOfWeek: string;
    depname: string;
    hosname: string;
  };
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}
// 数组包含全部医生
export type DocArr = Doctor[];
// 获取医生排班接口返回数据
export interface DoctorResponseData extends ResponseData {
  data: DocArr;
}

// 就诊人信息
export interface User {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    certificatesTypeString: string;
    contactsCertificatesTypeString: string;
    cityString: null;
    fullAddress: string;
    districtString: null;
    provinceString: null;
  };
  userId: number;
  name: number;
  certificatesType: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  provinceCode: null;
  cityCode: null;
  districtCode: null;
  address: string;
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
  isInsure: number;
  cardNo: null;
  status: string;
}
export type UserArr = User[];
export interface UserResponseData extends ResponseData {
  data: UserArr;
}

// 获取挂号医生信息的ts数据类型
export interface SelectDoctorResponseData extends ResponseData{
  data:Doctor
}
