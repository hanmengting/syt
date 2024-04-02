<template>
    <div class="region">
        <div class="content">
            <div class="left">地区：</div>
            <ul class="hospital">
                <li :class="{active:regionFlag==''}" @click="changeRegion('')">全部</li>
                <li v-for="item in regionArr" :class="{active:regionFlag==item.value}" :key="item.value" @click="changeRegion(item.value)">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqHospitalLevelAndRegion } from "../../../api/home/index";
import { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from "../../../api/home/type";
let regionArr = ref<HospitalLevelAndRegionArr>([])
let regionFlag=ref<string>('')
onMounted(() => {
    getRegion()
});
const getRegion = async () => {
    let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin')
    // console.log(result);
    if (result.code == 200) {
        regionArr.value = result.data
    }

}
const changeRegion=(item:string)=>{
    regionFlag.value=item
    // 给父组件传递区域的参数
    $emit('getRegion',item)
}
let $emit=defineEmits(['getRegion'])
</script>

<style scoped lang="scss">
.region {
    color: #7f7f7f;
    margin-top: 10px;

    .content {
        display: flex;

        .left {
            white-space: nowrap;
            margin-top: 5px;
        }

        .hospital {
            display: flex;
            flex-wrap: wrap;

            li {
                margin: 5px 10px;

                &.active {
                    color: #55a6fe;
                }
            }

            li:hover {
                color: #55a6fe;
                cursor: pointer;
            }
        }
    }
}
</style>