<template>
    <div class="register">
        <div class="top">
            <div class="title">{{ hospitalStore.hospitalInfo.hospital?.hosname }}</div>
            <div class="level">
                <svg t="1711350346349" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4273" width="16" height="16">
                    <path
                        d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                        p-id="4274" fill="#1296db"></path>
                </svg>
                <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <!-- 展示内容区 -->
        <div class="content">
            <div class="left">
                <img :src="`data:image/jpeg;base64,` + hospitalStore.hospitalInfo.hospital?.logoData" alt="">
            </div>
            <div class="right">
                <div class="rule">
                    挂号规则
                </div>
                <p class="time">
                    预约周期:10天 &nbsp;&nbsp;
                    放号时间:{{ hospitalStore.hospitalInfo.bookingRule?.releaseTime }}&nbsp;&nbsp;
                    停挂时间:{{ hospitalStore.hospitalInfo.bookingRule?.stopTime }}
                </p>
                <p class="adress">
                    具体位置:{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}
                </p>
                <p class="route">
                    具体路线:{{ hospitalStore.hospitalInfo.hospital?.route }}
                </p>
                <p class="releasetime">
                    退号时间:就诊前一工作日{{ hospitalStore.hospitalInfo.bookingRule?.quitTime }}前取消
                </p>
                <p class="rule">医院挂号规则</p>
                <p class="ruleInfo" v-for="(item, index) in hospitalStore.hospitalInfo.bookingRule?.rule" :key="index">
                    {{ item }}
                </p>
            </div>
        </div>
        <!-- 展示医院科室数据 -->
        <div class="department">
            <div class="leftNav">
                <ul>
                    <li @click="changeIndex(index)" v-for="(department,index) in hospitalStore.departmentArr" :key="department.depcode" :class="{active:index==currentIndex}">{{ department.depname }}</li>
                </ul>
            </div>
            <div class="departmentInfo">
                <!-- 用一个div代表大科室与小科室 -->
                <div class="showDepartment" v-for="department in hospitalStore.departmentArr" :key="department.depcode">
                    <h1 class="cur">{{ department.depname }}</h1>
                    <!-- 每一个大科室下的小科室 -->
                    <ul>
                        <li v-for="item in department.children" :key="item.depcode" @click="showLogin(item)">{{ item.depname }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import useUserStore from '../../../store/modules/user';
// 引入医院详情仓库的数据
import useDetailStore from '../../../store/modules/hospitalDetail'
import { ref } from "vue";
import { useRoute,useRouter } from 'vue-router';
// 获取路由器
let $router=useRouter();
// 获取路由对象
let $route=useRoute();
let hospitalStore = useDetailStore();
// let userStore=useUserStore();
// 控制科室高亮的响应式数据
let currentIndex=ref<number>(0)
// 左侧大科室点击事件
const changeIndex=(index:number)=>{
    currentIndex.value=index;
    // 点击导航获取右侧大的科室h1标题
    let allCur = document.querySelectorAll('.cur');
    // console.log(allCur);
    // 滚动到对应科室位置
    allCur[currentIndex.value].scrollIntoView({
        behavior:'smooth',//过渡动画效果
        block:'start'//滚动位置，默认起始位置
    });
    
}
// 点击小科室回调
// item:用户选中的科室的数据
const showLogin=(item:any)=>{
    // userStore.visiable=true
    // 点击某一个医院科室按钮,进入相应医院的预约挂号详情页面
    // 跳转到挂号详情页面
    $router.push({path:'/hospital/register_order',query:{hoscode:$route.query.hoscode,depcode:item.depcode}})
    
    
}
</script>

<style scoped lang="scss">
.register {
    .top {
        display: flex;
        align-items: center;

        .title {
            font-size: 25px;
        }

        .level {
            // display: flex;
            color: #7f7f7f;
            margin-left: 15px;
            height: 40px;
            text-align: center;
            line-height: 40px;

            span {
                margin-left: 5px;
            }
        }
    }

    .content {
        margin-top: 20px;
        display: flex;

        .left {
            width: 80px;

            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
        }

        .right {
            .rule {
                margin: 10px 0;
            }

            margin-left: 20px;
            flex:1;

            .time,
            .adress,
            .route,
            .releasetime,
            .ruleInfo {
                // margin-top: 10px;
                color: #7f7f7f;
                line-height: 1.75;
            }
        }
    }
    .department{
        width: 100%;
        height: 500px;
        display: flex;
        margin-top: 20px;
        .leftNav{
            width: 80px;
            height: 100%;
            ul{
                width: 100%;
                height: 100%;
                background-color: rgb(248, 248, 248);
                display: flex;
                flex-direction: column;
                li{
                    flex: 1;
                    text-align: center;
                    font-size: 14px;
                    color: #7f7f7f;
                    line-height: 40px;
                    cursor: pointer;
                    &.active{
                        border-left: 1px solid red;
                        color: red;
                        background-color: white;
                    }
                }
            }
        }
        .departmentInfo{
            flex:1;
            margin-left: 10px;
            height: 100%;
            overflow: auto;
            // 让滚动条消失
            &::-webkit-scrollbar{
                display: none;
            }
            .showDepartment{
                h1{
                    background-color: rgb(248, 248, 248);
                    color: #7f7f7f;
                    font-size: 14px;
                    line-height: 30px;
                    // text-align: center;
                }
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        cursor: pointer;
                        width: 33%;
                        line-height: 40px;
                        color: #7f7f7f;
                        font-size: 14px;
                    }
                }
            }
        }
        
    }
}
</style>