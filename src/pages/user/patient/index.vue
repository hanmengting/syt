<template>
    <!-- 就诊人管理 -->
    <el-card style="width: 100%;" v-if="scene == 1">
        <!-- 添加就诊人信息头部 -->
        <template #header>
            <div class="card-header">
                <span>就诊人管理</span>
                <el-button type="success" :icon="User" @click="addUser">添加就诊人</el-button>
            </div>
        </template>
        <!-- 就诊人信息展示 -->
        <div class="patient">
            <Visitor v-for="(item, index) in allPatient" :key="item.id" :user="item" :index="index" class="item"
                @changeScene="changeScene" @removeUser="removeUser"/>
        </div>
    </el-card>
    <!-- 添加就诊人信息或修改就诊人信息 -->
    <el-card style="width: 100%;" v-if="scene == 0">
        <template #header>
            <div class="card-header">
                <span>添加就诊人</span>
            </div>
        </template>
        <el-divider content-position="left">就诊人信息</el-divider>
        <el-form style="width: 60%;margin: 10px auto;" :model="userParams" :rules="rules" ref="forms">
            <el-form-item label="用户姓名" prop="name">
                <el-input placeholder="请输入用户姓名" v-model="userParams.name"></el-input>
            </el-form-item>
            <el-form-item label="证件类型" prop="certificatesType">
                <el-select placeholder="请选择证件类型" v-model="userParams.certificatesType">
                    <el-option v-for="item in CertificationArr" :key="item.id" :label="item.name"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="certificatesNo">
                <el-input placeholder="请输入证件号码" v-model="userParams.certificatesNo"></el-input>
            </el-form-item>
            <el-form-item label="用户性别" prop="sex">
                <el-radio-group v-model="userParams.sex">
                    <el-radio :value="1">男</el-radio>
                    <el-radio :value="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthdate">
                <el-date-picker v-model="userParams.birthdate" value-format="YYYY-MM-DD HH:mm:ss" type="datetime"
                    placeholder="请选择用户出生日期" />
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input placeholder="请输入用户手机号码" v-model="userParams.phone"></el-input>
            </el-form-item>
        </el-form>

        <el-divider content-position="left">建档信息（完善后部分议医院首次就诊不排队建档）</el-divider>
        <el-form style="width: 60%;margin: 10px auto;" :model="userParams" :rules="rules" ref="form">
            <el-form-item label="婚姻状况" prop="isMarry">
                <el-radio-group v-model="userParams.isMarry">
                    <el-radio :value="1">未婚</el-radio>
                    <el-radio :value="0">已婚</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="自费/医保" prop="isInsure">
                <el-radio-group v-model="userParams.isInsure">
                    <el-radio :value="1">自费</el-radio>
                    <el-radio :value="0">医保</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="当前住址" prop="addressSelected">
                <el-cascader :props="props" v-model="userParams.addressSelected" />
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input placeholder="请输入用户详细地址" v-model="userParams.address"></el-input>
            </el-form-item>
        </el-form>

        <el-divider content-position="left">联系人信息（选填）</el-divider>
        <el-form style="width: 60%;margin: 10px auto;" label-width="80">
            <el-form-item label="用户姓名">
                <el-input placeholder="请输入联系人姓名" v-model="userParams.contactsName"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
                <el-select placeholder="请选择证件类型" v-model="userParams.contactsCertificatesType">
                    <el-option v-for="item in CertificationArr" :key="item.id" :label="item.name"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码">
                <el-input placeholder="请输入证件号码" v-model="userParams.contactsCertificatesNo"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input placeholder="请输入联系人手机号码" v-model="userParams.contactsPhone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="reset">重写</el-button>
            </el-form-item>
        </el-form>

    </el-card>
</template>

<script setup lang="ts">
import { ElMessage, type CascaderProps } from 'element-plus'
import { User } from '@element-plus/icons-vue';
import { reqGetUser } from "@/api/hospital/index";
import { reqAddOrUpdateUser, reqCity, reqCertificationType } from "@/api/user/index";
import { UserArr, UserResponseData } from "@/api/hospital/type";
import { CertationTypeResponseData, CertationArr, AddOrUpdateUser } from "@/api/user/type";
import { onMounted, ref, reactive,watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
let $route = useRoute();
let $router = useRouter();
// 存储所有就诊人信息
let allPatient = ref<UserArr>([])
//定义一个响应式数据决定卡片身体部分的展示内容 添加就诊人0    就诊人管理1
let scene = ref<number>(1)
// 存储证件类型
let CertificationArr = ref<CertationArr>()
// 收集新增就诊人信息

let userParams = reactive<AddOrUpdateUser>({
    name: '',
    certificatesType: '',
    certificatesNo: '',
    sex: 0,
    birthdate: '',
    phone: '',
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: '',
    contactsName: '',
    contactsCertificatesType: '',
    contactsCertificatesNo: '',
    contactsPhone: ''
})
// 获取form组件
let form=ref()
let forms=ref()
onMounted(() => {
    // 获取所有就诊人信息
    getAllPatient()
    // 获取就诊人证件类型
    getCertificationType()
    // 判断：当前路由组件是否从挂号组件而来，如果是从挂号组件而来则路径上携带了query参数type=add
    if ($route.query.type == 'add') {
        scene.value = 0
    }
    if ($route.query.type == 'edit') {
        scene.value = 0
    }
});
// 获取所有就诊人信息
const getAllPatient = async () => {
    let result: UserResponseData = await reqGetUser()
    if (result.code == 200) {
        allPatient.value = result.data
    }


}
// 点击添加就诊人，展示添加信息
const addUser = () => {
    // 清空上一次的数据
    reset();
    scene.value = 0
}
// 清空上一次数据
const reset = () => {
    Object.assign(userParams, {
        id:null,
        name: '',
        certificatesType: '',
        certificatesNo: '',
        sex: 0,
        birthdate: '',
        phone: '',
        isMarry: 0,
        isInsure: 0,
        addressSelected: [],
        address: '',
        contactsName: '',
        contactsCertificatesType: '',
        contactsCertificatesNo: '',
        contactsPhone: ''
    })
}
// 就诊人子组件自定义事件
const changeScene = (user:AddOrUpdateUser) => {
    scene.value = 0
    Object.assign(userParams,user)
}
// 确定删除就诊人后重新刷新页面
const removeUser=()=>{
    getAllPatient()
}
// 获取就诊人证件类型的接口
const getCertificationType = async () => {
    let result: CertationTypeResponseData = await reqCertificationType()
    if (result.code == 200) {
        CertificationArr.value = result.data
    }
}
//级联选择器数据（用户地址的选择）
const props: CascaderProps = {
    lazy: true, //懒加载数据 需要时才发请求
    //加载级联选择器数据方法
    async lazyLoad(node: any, resolve: any) {
        let result: any = await reqCity(node.data.id || "86");
        //整理数据 showData是所有城市的lable和value的值的集合
        let showData = result.data.map((item: any) => {
            return {
                id: item.id,
                label: item.name,
                value: item.value,
                leaf: !item.hasChildren,
            };
        });
        //注入组件需要展示的数据
        resolve(showData);
    },
};
// 提交按钮的方法的回调
const submit = async () => {
    //进行全部的表单校验
    // 如果全部校验校验成功，则返回一个成功的promise
    // 如果有一个表单校验失败，则返回一个失败的promise，并且后续代码不再执行
    // await forms.value.validate();
    // await form.value.validate();
     // 使用 Promise.all 同时进行多个表单的校验
     await Promise.all([forms.value.validate(), form.value.validate()]);
    // 新增就诊人或修改就诊人信息
    try {
        // 新增就诊人或修改就诊人信息成功
        await reqAddOrUpdateUser(userParams)
        ElMessage({
            type: 'success',
            message: userParams.id ? '修改数据成功' : '添加成功'
        });
        // 判断路径上是否携带了query参数type=add，若有返回预约挂号组件，如没有切换场景为就诊人管理页面1
        if ($route.query.type) {
            $router.back()
        } else {
            scene.value = 1;
        }
        // 再次获取全部就诊人信息
        getAllPatient()
        console.log(userParams.addressSelected);
        
    } catch (error) {
        ElMessage({
            type: 'error',
            message: userParams.id ? '修改数据失败' : '添加失败'
        })
    }

}
// 监听所有就诊人的信息
watch(()=>allPatient.value,()=>{
    if($route.query.type=="edit"){
        let user=allPatient.value.find((item:any)=>{
            return item.id==$route.query.id
        })
        Object.assign(userParams,user)
    }
})


// 自定义姓名的校验规则
const validatorName = (_rule: any, value: any, callBack: any) => {
    // rule:即为当前校验字段的校验规则对象
    // value:即为你要校验的文本内容
    const reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/;
    if (reg.test(value)) {
        callBack()
    } else {
        callBack(new Error('请输入正确的名字格式'))
    }
}
// 自定义证件类型的校验
const validatorType = (_rule: any, value: any, callBack: any) => {
    if (value == '10' || value == '20') {
        callBack()
    } else {
        callBack(new Error('请选择证件类型'))
    }
}
// 自定义证件号码的校验
const validatorNo = (_rule: any, value: any, callBack: any) => {
    let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    let _IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
    let hkb=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    // 校验身份证：
    if (_IDRe18.test(value) || _IDre15.test(value)||hkb.test(value)) {
        callBack()
    } else {
        callBack(new Error('请输入正确的证件号码'))
    }
}
// 自定义性别的校验 isMarry
const validatorSex=(_rule: any, value: any, callBack: any)=>{
    if (value == '1' || value == '0') {
        callBack()
    } else {
        callBack(new Error('请选择用户性别'))
    }
}
// 自定义生日校验
const validatorBirth=(_rule: any, value: any, callBack: any)=>{
    // console.log(value);
    let result=/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
    if(result.test(value)){
        callBack()
    }else{
        callBack(new Error('请选择用户生日'))
    }
    
}
// 自定义手机号校验
const validatorPhone=(_rule: any, value: any, callBack: any)=>{
    let result=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if(result.test(value)){
        callBack()
    }else{
        callBack(new Error('请输入正确的手机号码格式'))
    }
}
// 自定义婚姻状况的校验 isMarry
const validatorMarry=(_rule: any, value: any, callBack: any)=>{
    console.log(value);
    
    if (value == '1' || value == '0') {
        callBack()
    } else {
        callBack(new Error('请选择婚姻状况'))
    }
}
// 自定义自费或医保的校验 
const validatorInsure=(_rule: any, value: any, callBack: any)=>{
    if (value == '1' || value == '0') {
        callBack()
    } else {
        callBack(new Error('请选择自费或者医保'))
    }
}
// 自定义当前住址的校验
const validatorAddressSelect=(_rule: any, value: any, callBack: any)=>{
    if(value.length){
        callBack()
    }else{
        callBack(new Error('请填写用户地址'))
    }
    
    
}
//表单校验
const rules={
    name:[{
        required:true,
        validator: validatorName
    }],
    certificatesType: [{
        required: true,
        validator: validatorType
    }],
    certificatesNo:[{
        required: true,
        validator: validatorNo
    }],
    sex:[{
        required:true,
        validator: validatorSex
    }],
    birthdate:[{
        required:true,
        validator: validatorBirth
    }],
    phone:[{
        required:true,
        validator: validatorPhone
    }],
    isMarry:[{
        required:true,
        validator: validatorMarry
    }],
    isInsure:[{
        required:true,
        validator: validatorInsure
    }],
    addressSelected:[{
        required:true,
        validator: validatorAddressSelect
    }],
    address:[{
        required:true,
        validator: validatorAddressSelect
    }]
} 
</script>

<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.patient {
    display: flex;
    flex-wrap: wrap;

    .item {
        width: 31%;
        margin: 10px;
    }
}
</style>