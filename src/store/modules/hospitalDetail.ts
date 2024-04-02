import { defineStore } from "pinia";
import { reqHospitalDetail, reqHospitaldepartment } from "../../api/hospital";
// 引入详情数据的ts类型
import type {
  HospitalDetail,
  DepartmentResponseData,
} from "../../api/hospital/type";
import type { HosPitalDetail } from "../../api/hospital/type";
// pinia仓库写法：组合式API，选择式API
import type { DetailState } from "./interface";
const useDetailStore = defineStore("Detail", {
  // 存储返回数据
  state: (): DetailState => {
    return {
      // 医院详情的数据
      hospitalInfo: {} as HosPitalDetail,
      // 获取医院科室数据
      departmentArr: [],
    };
  },
  actions: {
    // 获取医院详情的方法
    async getHospital(hoscode: string) {
      let result: HospitalDetail = await reqHospitalDetail(hoscode);
      // console.log(result);
      if (result.code == 200) {
        this.hospitalInfo = result.data;
      }
    },
    // 获取医院科室数据的方法
    async getDepartment(hoscode: string) {
      let result: DepartmentResponseData = await reqHospitaldepartment(hoscode);
      // console.log(result);
      if (result.code == 200) {
        this.departmentArr = result.data;
      }
    },
  },
  getters: {},
});
// 获取仓库的方法对外暴露
export default useDetailStore;
