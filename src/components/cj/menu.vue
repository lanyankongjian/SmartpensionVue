<template>
  <div>
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      background-color="#545c64" text-color="#fff" :router="true" active-text-color="#ffd04b" style="width: 15%;position: fixed;height: 1000px;">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>接待管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">咨询登记</el-menu-item>
          <el-menu-item index="1-2">入住登记</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>老人管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">外出登记</el-menu-item>
          <el-menu-item index="1-2">探视来访</el-menu-item>
          <el-submenu index="1-4">
                 <template slot="title">事故管理</template>
                 <el-menu-item index="1-4-1">事故类型管理</el-menu-item>
                 <el-menu-item index="1-4-1">事故记录</el-menu-item>
           </el-submenu>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>健康管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="physical">体检登记</el-menu-item>
          <el-menu-item index="1-2">入住登记</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>评估管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">咨询登记</el-menu-item>
          <el-menu-item index="1-2">入住登记</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>药品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">咨询登记</el-menu-item>
          <el-menu-item index="1-2">入住登记</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>餐饮管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">咨询登记</el-menu-item>
          <el-menu-item index="1-2">入住登记</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>费用管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">咨询登记</el-menu-item>
          <el-menu-item index="1-2">入住登记</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>退住管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">咨询登记</el-menu-item>
          <el-menu-item index="1-2">入住登记</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
</script>

<style>
</style>
