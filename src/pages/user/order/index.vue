<template>
    <div>
        <!-- 展示订单详情 -->
        <div v-if="$route.query.orderId">
            <OrderDetail />
        </div>
        <!-- 展示所有订单 -->
        <div v-else>
            <AllOrder />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
// 引入子组件
import AllOrder from './allOrder/index.vue'
import OrderDetail from './orderDetail/index.vue'
let $route=useRoute();
</script>

<style lang="scss" scoped>
    
</style>