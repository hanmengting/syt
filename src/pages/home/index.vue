<template>
  <div>
    <!-- 轮播图 -->
    <Carousel />
    <!-- 首页搜索框 -->
    <Search />
    <!-- 医院等级 -->
    <el-row>
      <el-col :span="20">
        <!-- 等级子组件 -->
        <Level @getLevel="getLevel" />
        <!-- 地区子组件 -->
        <Region @getRegion="getRegion" />
        <!-- 医院卡片子组件 -->
        <div class="hospital" v-if="hasHospitalArr.length > 0">
          <Card class="item" v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo="item" />
        </div>
        <el-empty v-else description="暂无数据" />
        <!-- 分页器 -->
        <el-pagination class="page" v-model:current-page="pageNo" v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]" layout=" prev, pager, next, jumper, ->,sizes,total" :total="total"
          @current-change="currentChange" @size-change="sizeChange" />
      </el-col>
      <el-col :span="4">
        <Tip />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { onMounted, ref } from 'vue';
import { reqHospital } from '../../api/home';
// 引入首页轮播图组件
import Carousel from './carousel/index.vue';
// 引入首页搜索组件
import Search from './search/index.vue';
// 引入首页等级组件
import Level from './level/index.vue';
// 引入首页地区选择的组件
import Region from './region/index.vue';
// 展示医院新的卡片组件
import Card from './card/index.vue';
// 引入右侧组件
import Tip from './tip/index.vue'
import type { Content, HospitalResponseData } from '../../api/home/type';

// 分页器所需要的数据

// 分页器初始页码
let pageNo = ref<number>(1)
// 一页展示几条数据
let pageSize = ref<number>(10)
// 存储已有医院的所有数据
let hasHospitalArr = ref<Content>([]);
// 存储医院的总个数
let total = ref(0);
// 存储医院等级响应式数据
let hostype = ref<string>('')
// 存储医院地区响应式数据
let districtCode = ref<string>('')
// 组件挂在完毕，发送一次请求
onMounted(() => {
  getHospitalInfo();
});
// 获取已有的医院的数据
const getHospitalInfo = async () => {
  // 获取医院的数据：默认的获取第一页，一页10个医院的数据
  let result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value, hostype.value, districtCode.value);
  // console.log(result);
  if (result.code == 200) {
    // 存储医院的数据
    hasHospitalArr.value = result.data.content;
    // 存储医院的总个数
    total.value = result.data.totalElements;
    // console.log(result);

  }

}

// 分页器页码发生变化时候回调
const currentChange = () => {
  getHospitalInfo();
};

// 分页器下拉菜单发生变化时会触发
const sizeChange = () => {
  getHospitalInfo();
}
// 子组件的自定义事件：获取儿子给父亲传递过来的等级参数
const getLevel = (level: string) => {
  // 收集等级的参数
  hostype.value = level
  // 再次发请求
  getHospitalInfo();
}

// 子组件的自定义事件：获取儿子给父亲传递过来的地区参数
const getRegion = (item: string) => {
  // 收集等级的参数
  districtCode.value = item
  // 再次发请求
  getHospitalInfo();
}
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: wrap;

  .item {
    width: 48%;
    margin: 10px 0;
  }
}

.page {
  margin-bottom: 10px;
}
</style>