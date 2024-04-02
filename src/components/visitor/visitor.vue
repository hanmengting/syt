<template>
    <div class="visitor">
        <div class="top">
            <div class="left">
                <span class="free">{{ user.isInsure == 1 ? '医保' : '自费' }}</span>
                <span>{{ user.name }}</span>
            </div>
            <div>
                <el-button type="primary" :icon="Edit" circle @click="handler" />
                <el-button type="danger" :icon="Delete" circle v-if="$route.path == '/user/patient'" @click="open" />
            </div>

        </div>
        <div class="bottom">
            <p>证件类型：{{ user.param.certificatesTypeString }}</p>
            <p>证件号码：{{ user.certificatesNo }}</p>
            <p>用户性别：{{ user.sex == 0 ? '女生' : '男生' }}</p>
            <p>出生日期：{{ user.birthdate }}</p>
            <p>手机号码：{{ user.phone }}</p>
            <p>婚姻状况：{{ user.isMarry == 0 ? '未婚' : '已婚' }}</p>
            <p>当前住址：{{ user.param.cityString }}</p>
            <p>详细地址：{{ user.param.fullAddress }}</p>
            <!-- 红色的已经选择的盒子 -->
            <div class="confirm" v-if="index == currentIndex">已选择</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { reqDeleteUser } from "@/api/user/index";
let $route = useRoute()
let $router = useRouter()
// 接收父组件传递过来的就诊人信息进行展示
let props = defineProps(['user', 'index', 'currentIndex'])
let $emit = defineEmits(['changeScene','removeUser'])
// 相应就诊人组件修改按钮的回调
const handler = () => {
  //要么是就诊人管理模块点击修改按钮
  //要么预约挂号点击修改按钮
  if ($route.path == "/user/patient") {
    $emit("changeScene", props.user);
  } else {
    //路由跳转携带参数
    $router.push({ path: "/user/patient", query: { type: "edit", id: props.user.id } });
  }
};
// 删除某个用户
const removeUser=async ()=>{
    await reqDeleteUser(props.user.id)
    $emit("removeUser")
}
// 点击删除按钮弹出是否确认删除框
const open = () => {
  ElMessageBox.confirm(
    `确定删除${props.user.name}吗?`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      }),
      removeUser()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败',
      })
    })
}
</script>

<style lang="scss" scoped>
.visitor {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

    .top {
        height: 70px;
        background-color: #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        font-size: 15px;

        .left {
            .free {
                background-color: #67c23a;
                margin-right: 10px;
                padding: 3px;
                border-radius: 10px;
                color: white;
            }
        }
    }

    .bottom {
        padding: 15px;
        position: relative;

        p {
            line-height: 35px;
        }

        .confirm {
            position: absolute;
            width: 230px;
            height: 230px;
            color: red;
            border-radius: 50%;
            border: 1px dashed red;
            text-align: center;
            line-height: 230px;
            left: 25px;
            top: 50px;
            font-size: 35px;
            opacity: 0.45;
            transform: rotate(30deg);
        }
    }
}
</style>