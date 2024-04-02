<template>
    <!-- 实名认证结果组件的结构 -->
    <el-card class="box-card">
        <!-- 卡片头部 -->
        <template #header>
            <div class="card-header">
                <span>实名信息</span>
            </div>
        </template>
        <!-- 实名认证结构的提示部分 -->
        <div class="tip" style="color: #7f7f7f">
            <el-icon>
                <InfoFilled />
            </el-icon>
            <p>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证</p>
        </div>
        <!-- 卡片主要内容：认证成功的结构 未认证的结构 -->
        <!-- 认证成功的结构 -->
        <div class="success" v-if="userInfo?.authStatus == 1">
            <el-descriptions class="margin-top" :column="1" border>
                <el-descriptions-item label-align="center" width="40">
                    <template #label>
                        <div class="cell-item">
                            用户姓名
                        </div>
                    </template>
                    {{ userInfo.name }}
                </el-descriptions-item>
                <el-descriptions-item label-align="center" width="40">
                    <template #label>
                        <div class="cell-item">
                            证件类型
                        </div>
                    </template>
                    {{ userInfo.certificatesType == '10' ? "身份证" : "户口本" }}
                </el-descriptions-item>
                <el-descriptions-item label-align="center" width="40">
                    <template #label>
                        <div class="cell-item">
                            证件号码
                        </div>
                    </template>
                    {{ userInfo.certificatesNo }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <!-- 未认证的结构 -->
        <div class="failing" v-if="userInfo?.authStatus == 0">
            <el-form style="width: 50%;margin: 20px auto" label-width="80" :model="params" :rules="rules" ref="form">
                <el-form-item label="用户姓名" prop="name">
                    <el-input placeholder="请输入用户姓名" v-model="params.name"></el-input>
                </el-form-item>
                <el-form-item label="证件类型" prop="certificatesType">
                    <el-select placeholder="请选择证件类型" v-model="params.certificatesType">
                        <el-option :label="item.name" :value="item.value" v-for="(item, index) in certationArr"
                            :key="index" />
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="certificatesNo">
                    <el-input placeholder="请输入证件号码" v-model="params.certificatesNo"></el-input>
                </el-form-item>
                <el-form-item label="上传证件" prop="certificatesUrl">
                    <!-- action:upload组件向服务器提交图片路径
                         limit:照片墙限制图片的个数
                         on-exceed:超出约束的钩子
                         on-success:图片上传成功的钩子
                    -->
                    <el-upload list-type="picture-card" :limit="1" :on-success="successhandle" :on-exceed="exceedhandle"
                        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" ref="upload"
                        action="/api/oss/file/fileUpload?fileHost=userAuah">
                        <img style="width: 100%;height: 100%;" src="../../../assets/images/auth_example.png" alt="">
                    </el-upload>
                    <el-dialog v-model="dialogVisible">
                        <img w-full v-if="params.certificatesUrl" style="width: 100%;height: 100%;"
                            :src="params.certificatesUrl" alt="Preview Image" />
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="default" @click="submit">提交</el-button>
                    <el-button size="default" @click="reset">重写</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { InfoFilled } from "@element-plus/icons-vue";
import { reqUserInfo, reqCertificationType, reqUserCertation } from "@/api/user/index";
import { UserInfoResponseData, UserInfo, CertationTypeResponseData, CertationArr, UserParams } from "@/api/user/type";
import { onMounted, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
// 存储用户信息
let userInfo = ref<UserInfo>()
let certationArr = ref<CertationArr>([])
// 收集用户表单认证的数据
let params = reactive<UserParams>({
    certificatesNo: '',
    certificatesType: '',
    certificatesUrl: '',
    name: ''
})
// 控制图片放大的显示与隐藏
let dialogVisible = ref(false)
let upload = ref()
// 获取form组件
let form=ref()
onMounted(() => {
    // 获取用户信息
    getUserInfo();
    getCertationType();
});
// 获取用户信息方法
const getUserInfo = async () => {
    let result: UserInfoResponseData = await reqUserInfo()
    // console.log(result);
    if (result.code == 200) {
        userInfo.value = result.data
    }
}
// 获取证件类型的回调
const getCertationType = async () => {
    let result: CertationTypeResponseData = await reqCertificationType()
    if (result.code == 200) {
        certationArr.value = result.data
    }
}
// 超出数量的钩子
const exceedhandle = () => {
    ElMessage({
        type: 'error',
        message: '最多只能上传一张图片'
    })
}
// 图片上传成功后保存图片路径
const successhandle = (response: any) => {
    // 图片上传成功后，需要删除图片校验的提示信息
    form.value.clearValidate('certificatesUrl')
    // 收集上传成功的图片的地址
    // response；上传图片请求服务器返回的数据
    // uploadFile：上传文件对象的数据
    // uploadFiles:上传文件对象的数据的集合
    params.certificatesUrl = response.data
}
// 照片墙预览的钩子
const handlePictureCardPreview = () => {
    // 点击预览的钩子时，对话框显示
    dialogVisible.value = true
}
// 照片墙删除图片的钩子
const handleRemove = () => {
    params.certificatesUrl = ''
}
// 重写按钮的回调
const reset = () => {
    // 清除文件上传列表（清空上传图片）
    // console.log(upload.value);
    upload.value.clearFiles()
    // 清空数据
    Object.assign(params, {
        certificatesNo: '',
        certificatesType: '',
        certificatesUrl: '',
        name: ''
    })
}
// 提交按钮
const submit = async () => {
    //进行全部的表单校验
    // 如果全部校验校验成功，则返回一个成功的promise
    // 如果有一个表单校验失败，则返回一个失败的promise，并且后续代码不再执行
    await form.value.validate();
    try {
        await reqUserCertation(params)
        ElMessage({
            type: 'success',
            message: '认证成功'
        })
        // 认证成功以后再次获取用户信息
        getUserInfo()
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '认证失败'
        })
    }
}

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
// 证件照图片的校验
const validatorUrl=(_rule: any, value: any, callBack: any)=>{
    // 是否上传图片，value是图片的地址
    if(value.length){
        callBack()
    }else{
        callBack(new Error('请上传证件照图片'))
    }
}
// 表单校验
const rules = {
    // 用户姓名校验
    // required:true当前字段必须校验
    // validatorName是一个方法
    name: [{
        required: true,
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
    certificatesUrl:[{
        required: true,
        validator: validatorUrl
    }]
}
</script>

<style lang="scss" scoped>
.box-card {
    .tip {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        font-size: 14px
    }
}
</style>