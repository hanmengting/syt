<template>
    <div class="search">
        <el-autocomplete clearable placeholder="请输入医院名称" v-model="hosname" :fetch-suggestions="fetchData"
            :trigger-on-focus="false" @select="goDetail" />
        <el-button type="primary" :icon="Search"></el-button>
    </div>
</template>

<script setup lang="ts">
// 引入@element-plus提供图标
import { Search } from '@element-plus/icons-vue'
import { ref } from "vue";
// 引入请求方法
import { reqHospitalInfo } from "../../../api/home/index";
import { HospitalInfo } from "../../../api/home/type";
import { useRouter } from "vue-router";
// 创建路由对象
let $router=useRouter();
// 收集搜索的关键字（医院的名字）
let hosname = ref<string>('')
// 顶部组件的回调，keyWord是输入框中你输入的值，cb是一个回调函数，调用你所需要展示的数据
const fetchData = async (keyWord: string, cb: any) => {
    let result: HospitalInfo = await reqHospitalInfo(keyWord)
    // 整理数据变成组件需要的数据格式
    let showData=result.data.map(item=>{
        return{
            value:item.hosname,//展示的是医院的名字
            hoscode:item.hoscode//存储的是医院的编码
        }
    })
    // 给组件提供展示的数据
    cb(showData)
}
// 点击某一个推荐项,item为你选择的那一项
const goDetail=(item:any)=>{
    // 点击推荐项目进入医院的详情页，将来需要携带query参数(医院的编码)
    $router.push({path:'/hospital/register',query:{hoscode:item.hoscode}})
    
}
</script>

<style scoped lang="scss">
.search {
    width: 100%;
    height: 50px;
    margin: 25px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    // 深度选择器
    ::v-deep(.el-input__wrapper) {
        width: 600px;
    }
}
</style>