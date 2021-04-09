<template>
  <div>

  <el-container>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/oldinfo' }">基本信息登记</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/family' }">家属信息登记</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/health' }">健康信息登记</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/nursing' }">护理任务设置</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/bed' }">餐饮床位选择</el-breadcrumb-item>
      <!-- <el-breadcrumb-item :to="{ path: '/totalcost' }">入院缴费</el-breadcrumb-item> -->
    </el-breadcrumb>
  </el-container>
    <router-view></router-view>
  </div>
</template>

<script>
export default{
  data(){
    return{}
  },
  methods:{
    returnOccupation(){
      this.$router.push('/occupation');
      localStorage.removeItem("oldId");
      sessionStorage.removeItem("bedId");
      sessionStorage.removeItem("resId");
    }
  }
}
</script>

<style>
</style>
