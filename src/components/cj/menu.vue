<template>
  <div class="menu">
    <el-menu default-active="2" class="el-menu-vertical-demo"
      background-color="#545c64" :unique-opened="true"  text-color="#fff" :router="true" active-text-color="#ffd04b" >
      <el-menu-item index="/HelloWorld" style="text-align: center;">
      				<i class="el-icon-s-home"></i>
      				首页
      	</el-menu-item>
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
          <el-menu-item index="register">外出登记</el-menu-item>
          <el-menu-item index="visit">探视来访</el-menu-item>
          <el-submenu index="1-4">
                 <template slot="title">事故管理</template>
                 <el-menu-item index="actype">事故类型管理</el-menu-item>
                 <el-menu-item index="accident">事故记录</el-menu-item>
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
          <el-menu-item index="medical">就医登记</el-menu-item>
          <el-menu-item index="assessment">评估登记</el-menu-item>
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
  .menu {
  	display: block;
  	position: fixed;
  	/* 起到固定菜单栏作用 */
  	z-index: 1;
  	top: 0;
  	bottom: 0;
  	left: 0;
    width: 14.8%;
  	max-height: 100%;
  	overflow-y: auto;
  }
  ::-webkit-scrollbar {
  	display: none;/* 隐藏滚动条 */
  }
  .el-menu {
  	/* border-right: 0; */
    min-width: 100%;
  	border-right: 1;
  	height: 100%;
  	text-align: left;
  	/*el-menu有表框，border-right: 0;去掉就没有最右边的表框了*/
  }
</style>
