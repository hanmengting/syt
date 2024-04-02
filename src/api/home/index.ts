// 统一管理首页模块接口（封装首页所有相关的请求）
import request from '../../utils/request'
import type { HospitalResponseData , HospitalLevelAndRegionResponseData, HospitalInfo} from './type'
// 通过枚举管理首页模块的接口地址
enum API{
    // 获取已有的医院的数据接口地址
    HOSPITAL_URL='/hosp/hospital/',
    HOSPITALLEVELANDREGION_URL='/cmn/dict/findByDictCode/',
    HOSPITALINFO_URL='/hosp/hospital/findByHosname/'
}
// 获取医院的数据
export const reqHospital=(page:number,limit:number,hostype='',districtCode='')=>request.get<any,HospitalResponseData>(API.HOSPITAL_URL+`${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
export const reqHospitalLevelAndRegion=(dictCode:string)=>request.get<any,HospitalLevelAndRegionResponseData>(API.HOSPITALLEVELANDREGION_URL+`${dictCode}`)
export const reqHospitalInfo=(hosname:string)=>request.get<any,HospitalInfo>(API.HOSPITALINFO_URL+`${hosname}`)