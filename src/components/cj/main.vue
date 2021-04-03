<template>
  <div>
      <v-menu></v-menu>
      <el-card style="width: 85%;float: right;">
      <router-view></router-view>
      </el-card>
  </div>
</template>

<script>
 import vmenu from './menu.vue'
 export default{
   components:{
      'v-menu':vmenu
   },
 }
</script>

<style>
</style>
