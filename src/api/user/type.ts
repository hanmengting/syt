export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 提交订单接口返回的数据类型
export interface submitOrder extends ResponseData {
  data: number;
}

// 订单详情的数据类型
export interface OrderInfo {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    orderStatusString: string;
  };
  userId: number;
  outTradeNo: string;
  hoscode: string;
  hosname: string;
  depcode: string;
  depname: string;
  scheduleId: string;
  title: string;
  reserveDate: string;
  reserveTime: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  hosRecordId: string;
  number: number;
  fetchTime: string;
  fetchAddress: string;
  amount: number;
  quitTime: string;
  orderStatus: number;
}
export interface OrderReponseData extends ResponseData {
  data: OrderInfo;
}

// 取消订单
export interface orderCancel extends ResponseData {
  data: boolean;
}
// 获取订单支付二维码的ts数据类型
export interface OrderPayment {
  codeUrl: string;
  orderId: number;
  totalFee: number;
  resultCode: string;
}
export interface OrderPaymentData extends ResponseData {
  data: OrderPayment;
}

// 查询支付状态的数据类型
export interface PayResult extends ResponseData {
  data: boolean;
}

//代表一个用户信息的数据类型
export interface UserInfo {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {};
  openid: null;
  nickName: null;
  phone: string;
  name: string;
  certificatesType: string;
  certificatesNo: string;
  certificatesUrl: null;
  authStatus: number;
  status: number;
}

//获取用户信息接口返回的数据的ts类型
export interface UserInfoResponseData extends ResponseData {
  data: UserInfo;
}
// 代表证件类型的ts
export interface CertationType {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {};
  parentId: number;
  name: string;
  value: string;
  dictCode: string;
  hasChildren: boolean;
}
export type CertationArr = CertationType[];
export interface CertationTypeResponseData extends ResponseData {
  data: CertationArr;
}
// 用户认证携带的参数的类型
export interface UserParams {
  certificatesNo: string;
  certificatesType: string;
  certificatesUrl: string;
  name: string;
}

// 代表一个订单的ts类型
export interface Order {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    orderStatusString: string;
  };
  userId: number;
  outTradeNo: string;
  hoscode: string;
  hosname: string;
  depcode: string;
  depname: string;
  scheduleId: null;
  title: string;
  reserveDate: string;
  reserveTime: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  hosRecordId: string;
  number: number;
  fetchTime: string;
  fetchAddress: string;
  amount: number;
  quitTime: string;
  orderStatus: number;
}
export type Records = Order[];
// 获取接口订单的数据的ts类型
export interface UserOrderInfoResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    orders: [];
    hitCount: boolean;
    searchCount: boolean;
    pages: number;
  };
}

//代表就诊人ts类型
export interface User {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    certificatesTypeString: string;
    contactsCertificatesTypeString: string;
    cityString: string;
    fullAddress: string;
    districtString: string;
    provinceString: null;
  };
  userId: number;
  name: string;
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
//全部就诊人的数据ts类型
export type AllUser = User[];

//获取全部就诊人的ts类型
export interface AllUserResponseData extends ResponseData {
  data: AllUser;
}

//订单状态ts类型
export interface OrderState {
  comment: string;
  status: number;
}

export type AllOrderState = OrderState[];
//全部订单状态码接口返回的数据ts类型
export interface AllOrderStateResponseData extends ResponseData {
  data: AllOrderState;
}

//新增与修改已有的就诊人参数的数据ts类型
export interface AddOrUpdateUser {
  id?: string;
  name: string;
  certificatesType: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  isInsure: number;
  addressSelected: string[];
  address: string;
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
}

// // 新增就诊人或修改就诊人信息的参数的ts类型
export interface AddOrUpdateUser{
  id?:string,
  name:string,
  certificatesType:string,
  certificatesNo:string,
  sex:number,
  birthdate:string,
  phone:string,
  isMarry:number,
  isInsure:number,
  addressSelected:string[],
  address:string,
  contactsName:string,
  contactsCertificatesType:string,
  contactsCertificatesNo:string,
  contactsPhone:string
}
