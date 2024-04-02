<template>
    <div class="detail">
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
        <!-- 展示医院的logo与路线 -->
        <div class="logo">
            <div class="left">
                <img :src="`data:image/jpeg;base64,` + hospitalStore.hospitalInfo.hospital?.logoData" alt="">
            </div>
            <div class="right">
                <div class="icon">
                    <svg t="1711365513894" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="6019" width="16" height="16">
                        <path
                            d="M504.448 519.552m-151.189333 0a151.189333 151.189333 0 1 0 302.378666 0 151.189333 151.189333 0 1 0-302.378666 0Z"
                            fill="#7f7f7f" p-id="6020"></path>
                        <path
                            d="M504.448 124.714667c-218.069333 0-394.858667 176.768-394.858667 394.837333s176.789333 394.858667 394.858667 394.858667 394.837333-176.789333 394.837333-394.858667S722.517333 124.714667 504.448 124.714667z m0 64c182.72 0 330.837333 148.117333 330.837333 330.837333s-148.117333 330.858667-330.837333 330.858667S173.589333 702.272 173.589333 519.552c0-182.72 148.138667-330.837333 330.858667-330.837333z"
                            fill="#7f7f7f" p-id="6021"></path>
                        <path
                            d="M519.552 10.666667a32 32 0 0 1 32 32v98.922666a32 32 0 1 1-64 0V42.666667a32 32 0 0 1 32-32zM519.552 850.410667a32 32 0 0 1 32 32V981.333333a32 32 0 0 1-64 0v-98.922666a32 32 0 0 1 32-32z"
                            fill="#7f7f7f" p-id="6022"></path>
                        <path
                            d="M10.666667 519.552a32 32 0 0 1 32-32h98.922666a32 32 0 1 1 0 64H42.666667a32 32 0 0 1-32-32zM850.410667 519.552a32 32 0 0 1 32-32H981.333333a32 32 0 0 1 0 64h-98.922666a32 32 0 0 1-32-32z"
                            fill="#7f7f7f" p-id="6023"></path>
                    </svg>
                </div>
                <div>
                    <p>具体地址:{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}</p>
                    <p>规划路线:{{ hospitalStore.hospitalInfo.hospital?.route }}</p>
                </div>
            </div>
        </div>
        <!-- 医院介绍 -->
        <div class="footer">
            <h1>医院介绍</h1>
            <p>{{ hospitalStore.hospitalInfo.hospital?.intro }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入医院详情仓库的数据
import useDetailStore from '../../../store/modules/hospitalDetail'
let hospitalStore = useDetailStore();
</script>

<style scoped lang="scss">
.detail {
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

    .logo {
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
            display: flex;
            color: #7f7f7f;
            line-height: 1.75;
            margin-left: 20px;

            .icon {
                margin-top: 2px;
                margin-right: 5px;

            }
        }

    }

    .footer {
        margin-top: 20px;
        color: #7f7f7f;
        line-height: 1.75;
        margin-top: 10px;
    }
}
</style>