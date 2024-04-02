<template>
    <div class="wrap">
        <!-- 顶部结构 -->
        <div class="top">
            <div class="hosname">{{ workData.baseMap?.hosname }}</div>
            <em>|</em>
            <div>{{ workData.baseMap?.bigname }}</div>
            <em>.</em>
            <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
        </div>
        <!-- 中间展示日期的结构 -->
        <div class="center">
            <h1>{{ workData.baseMap?.workDateString }}</h1>
            <div class="container">
                <div class="item" :class="{ active: item.status == -1 || item.availableNumber == -1 }"
                    v-for="item in workData.bookingScheduleList" :key="item" @click="changeTime(item)">
                    <div class="up">
                        {{ item.workDate }}-{{ item.dayOfWeek }}
                    </div>
                    <div class="down">
                        <div v-if="item.status == -1">无号</div>
                        <div v-else-if="item.status == 0">
                            {{ item.availableNumber == -1 ? '约满了' : `有号(${item.availableNumber})` }}
                        </div>
                        <div v-else-if="item.status == 1">即将放号</div>
                    </div>
                </div>
            </div>
            <el-pagination layout="prev, pager, next" :total="workData.total" v-model:current-page="pageNo"
                @current-change="fetchWorkData" />
        </div>
        <!-- 底部展示医生的结构 -->
        <div class="bottom">
            <!-- 展示即将放号的时间 -->
            <div class="will" v-if="workTime.status==1">
                <span>2023年6月3日8:30放号</span>
            </div>
            <!-- 展示医生的结构，上午、下午 -->
            <div class="doctor" v-else>
                <!-- 上午 -->
                <div class="moring">
                    <div class="tip">
                        <svg t="1711624894478" class="icon" viewBox="0 0 1044 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="5339" width="32" height="32">
                            <path
                                d="M512.607508 807.384615c-163.446154 0-295.384615-131.938462-295.384616-295.384615s131.938462-295.384615 295.384616-295.384615 295.384615 131.938462 295.384615 295.384615-131.938462 295.384615-295.384615 295.384615z m0-78.76923c120.123077 0 216.615385-96.492308 216.615384-216.615385s-96.492308-216.615385-216.615384-216.615385-216.615385 96.492308-216.615385 216.615385 96.492308 216.615385 216.615385 216.615385z"
                                fill="#20A0FF" p-id="5340"></path>
                            <path
                                d="M514.576738 0c21.661538 0 39.384615 17.723077 39.384616 39.384615v78.769231c0 21.661538-17.723077 39.384615-39.384616 39.384616s-39.384615-17.723077-39.384615-39.384616V39.384615c0-21.661538 17.723077-39.384615 39.384615-39.384615z m336.738462 122.092308c15.753846 13.784615 19.692308 39.384615 3.938462 55.138461l-51.2 61.046154c-13.784615 15.753846-39.384615 19.692308-55.138462 3.938462-15.753846-13.784615-19.692308-39.384615-3.938462-55.138462l51.2-61.046154c13.784615-15.753846 37.415385-17.723077 55.138462-3.938461z m177.230769 309.16923c3.938462 21.661538-9.846154 41.353846-31.507692 45.292308l-76.8 13.784616c-21.661538 3.938462-41.353846-9.846154-45.292308-31.507693-3.938462-21.661538 9.846154-41.353846 31.507693-45.292307l76.8-13.784616c21.661538-3.938462 41.353846 9.846154 45.292307 31.507692z m-61.046154 350.523077c-11.815385 19.692308-35.446154 25.6-53.16923 13.784616l-68.923077-39.384616c-19.692308-11.815385-25.6-35.446154-13.784616-53.16923s35.446154-25.6 53.169231-13.784616l68.923077 39.384616c17.723077 11.815385 23.630769 35.446154 13.784615 53.16923zM693.776738 1012.184615c-19.692308 7.876923-43.323077-3.938462-51.2-23.630769l-27.56923-74.830769c-7.876923-19.692308 3.938462-43.323077 23.630769-51.2 19.692308-7.876923 43.323077 3.938462 51.2 23.630769l27.569231 74.830769c7.876923 21.661538-3.938462 43.323077-23.63077 51.2z m-356.430769 0c-19.692308-7.876923-31.507692-29.538462-23.630769-51.2l27.569231-74.830769c7.876923-19.692308 29.538462-31.507692 51.2-23.630769 19.692308 7.876923 31.507692 29.538462 23.630769 51.2l-27.569231 74.830769c-7.876923 19.692308-31.507692 31.507692-51.2 23.630769zM63.622892 781.784615c-11.815385-19.692308-3.938462-43.323077 13.784616-53.16923l68.923077-39.384616c19.692308-11.815385 43.323077-3.938462 53.16923 13.784616s3.938462 43.323077-13.784615 53.16923l-68.923077 39.384616c-17.723077 11.815385-43.323077 5.907692-53.169231-13.784616zM0.607508 431.261538c3.938462-21.661538 23.630769-35.446154 45.292307-31.507692l76.8 13.784616c21.661538 3.938462 35.446154 23.630769 31.507693 45.292307-3.938462 21.661538-23.630769 35.446154-45.292308 31.507693l-76.8-13.784616C12.422892 472.615385-3.330954 452.923077 0.607508 431.261538zM179.807508 122.092308c15.753846-13.784615 41.353846-11.815385 55.138461 3.938461l51.2 61.046154c13.784615 15.753846 11.815385 41.353846-3.938461 55.138462-15.753846 13.784615-41.353846 11.815385-55.138462-3.938462L175.869046 177.230769c-15.753846-15.753846-13.784615-41.353846 3.938462-55.138461z"
                                fill="#9AD4FF" p-id="5341"></path>
                        </svg>
                        <span>上午号源</span>
                    </div>
                    <!-- 每一个医生的信息 -->
                    <div class="doc_info" v-for="doctor in moringArr" :key="doctor.id">
                        <!-- 展示医生的名字和技能 -->
                        <div class="left">
                            <div class="info">
                                <span>{{doctor.title}}</span>
                                <span>|</span>
                                <span>{{doctor.docname}}</span>
                            </div>
                            <div class="skill">{{ doctor.skill }}</div>
                        </div>
                        <!-- 展示挂号的费用 -->
                        <div class="right">
                            <div class="money">
                                <span>￥{{ doctor.amount }}</span>
                                <el-button type="primary" @click="goDoctor(doctor)">{{ doctor.availableNumber }}</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 下午 -->
                <div class="after">
                    <div class="tip">
                        <svg t="1711625071279" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="16370" width="32" height="32">
                            <path
                                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                                fill="#1296db" p-id="16371"></path>
                        </svg>
                        <span>下午号源</span>
                    </div>
                    <!-- 每一个医生的信息 -->
                    <div class="doc_info" v-for="doctor in afterArr" :key="doctor.id">
                        <!-- 展示医生的名字和技能 -->
                        <div class="left">
                            <div class="info">
                                <span>{{doctor.title}}</span>
                                <span>|</span>
                                <span>{{doctor.docname}}</span>
                            </div>
                            <div class="skill">{{ doctor.skill }}</div>
                        </div>
                        <!-- 展示挂号的费用 -->
                        <div class="right">
                            <div class="money">
                                <span>￥{{ doctor.amount }}</span>
                                <el-button type="primary" @click="goDoctor(doctor)">{{ doctor.availableNumber }}</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { reqHospitalWork, reqHospitalDoctor } from "@/api/hospital/index";
import { ref } from "vue";
import { useRoute,useRouter } from "vue-router";
import type { HospitalWorkData, DoctorResponseData, DocArr, Doctor } from "@/api/hospital/type"
let $route = useRoute();
let $router=useRouter();
// 默认当前第一页
let pageNo = ref<number>(1)
// 每页展示几条数据(默认为6)
let limit = ref<number>(6)
// 存储医院科室挂号的数据
let workData = ref<any>({})
// 组件挂在完毕发一次请求
// 存储排班时间
let workTime: any = ref({})
// 存储排班医生的数据
let docArr = ref<DocArr>([])
onMounted(() => {
    fetchWorkData();
});
// 获取挂号数据
const fetchWorkData = async () => {
    let result: HospitalWorkData = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string);
    // console.log(result);
    if (result.code == 200) {
        workData.value = result.data;
        // 存储第一天日期的数据
        workTime.value = workData.value.bookingScheduleList[0];
        // 获取一次医生的数据
        getDoctorWorkData();
    }

}
// 获取某一天医生排班的数据
const getDoctorWorkData = async () => {
    // 获取排班医生的数据
    let result: DoctorResponseData = await reqHospitalDoctor($route.query.hoscode as string, $route.query.depcode as string, workTime.value.workDate)
    if (result.code == 200) {
        docArr.value = result.data
    }

}

// 点击顶部某一天时触发回调
const changeTime = (item: any) => {
    // console.log(item);
    // 存储用户选择那一天的数据
    workTime.value = item;
    // 再发一次医生排班的请求
    getDoctorWorkData()

}
// 计算出上午排班的医生数据
let moringArr = computed(() => {

    return docArr.value.filter((doc: Doctor) => {
        return doc.workTime == 0
    })
})
// 计算出下午排班的医生数据
let afterArr = computed(() => {

    return docArr.value.filter((doc: Doctor) => {
        return doc.workTime == 1
    })
})
// 点击转跳到对应医生的挂号页面
const goDoctor=(doctor:Doctor)=>{
    // console.log(doctor);
    // console.log($route.query);
    
    // 编程式导航进行路由跳转并携带医生的id
    $router.push({path:'/hospital/register_doctor',query:{docId:doctor.id}})
    
}
</script>

<style lang="scss" scoped>
.wrap {
    color: #7f7f7f;

    .top {
        display: flex;
        // color: #7f7f7f;

        em {
            margin: 0 10px;
            height: 10px;
            line-height: 10px;
        }
    }

    .center {
        margin-top: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .container {
            display: flex;
            width: 100%;
            margin: 30px 0;

            .item {
                flex: 1;
                border: 1px solid skyblue;
                margin: 0 5px;
                transition: transform 0.3s;
                &.active {
                    border: 1px solid #ccc;

                    .up {
                        background-color: #ccc;
                    }
                }
                

                .up {
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    background-color: rgb(197, 216, 249, .5);
                }

                .down {
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    background-color: white;
                }
            }
            .item:hover{
                cursor: pointer;
                transform: scale(1.05);
            }
        }
    }

    .bottom {
        .will {
            text-align: center;
            margin-top: 50px;
        }

        .tip {
            display: flex;
            align-items: center;

            span {
                font-weight: 900;
            }
        }

        .moring,
        .after {
            .doc_info {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                border-bottom: 1px solid #7f7f7f;
                font-size: 15px;

                .left {
                    .info {
                        color: #55a6fe;
                        margin-bottom: 10px;

                        span {
                            margin: 0 5px;
                        }
                    }

                    .skill {
                        margin: 10px 5px;
                    }
                }

                .right {
                    .money {
                        display: flex;
                        width: 140px;
                        justify-content: space-between;
                        align-items: center;
                    }
                }
            }
        }

    }
}
</style>