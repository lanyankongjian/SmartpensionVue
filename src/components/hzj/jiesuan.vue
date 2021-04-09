<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>退住管理</el-breadcrumb-item>
			<el-breadcrumb-item>结算</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-row :gutter="20">
				<el-col :span="6">
					<el-input v-model="oldname" placeholder="请输入姓名">
						<el-button slot="append" icon="el-icon-search" @click="oldNamae"></el-button>
					</el-input>
				</el-col>
				<el-button style="float: left;" type="primary" icon="el-icon-refresh-left" @click="shuaxin"></el-button>
			</el-row>
			<!-- 用户列表区域 -->
			<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%">
				<el-table-column prop="oldName" label="老人姓名" width="100px"></el-table-column>
				<el-table-column prop="gender" label="性别" width="150px"></el-table-column>
				<el-table-column prop="identitycard" label="身份证号" width="250px"></el-table-column>
				<el-table-column prop="address" label="家庭地址" width="200px"></el-table-column>
				<el-table-column prop="joinTime" label="入院时间" width="160px"></el-table-column>
				<el-table-column prop="status" label="状态" width="140px">
					<template slot-scope="scope">
					              <p v-if="scope.row.status=='0'">
					                已结算
									<!-- 删除 -->
					              </p>
					              <p v-if="scope.row.status=='1'">
					                未结算
					              </p>
					            </template>
				</el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button type="success" @click="jiesuan(scope.row)">结算</el-button>
						<el-dialog title="出院前结算" :visible.sync="dialogFormVisible" >
							<el-form :inline="true" :model="jeisuans" label-position="left" >
								<el-form-item label="老人姓名">
									<el-input v-model="jeisuans.oldName" autocomplete="off" disabled>
									</el-input>
								</el-form-item>
								<el-form-item label="身份证号" style="margin-left: 110px;">
									<el-input disabled style="width: 220px;" v-model="jeisuans.identitycard" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="费用金额" >
									<el-input v-model="jeisuans.money" autocomplete="off" style="width: 210px;"disabled></el-input>
								</el-form-item>
								<el-form-item label="应缴费用" style="margin-left: 100px;">
									<el-input style="width: 220px;" v-model="jeisuans.money" autocomplete="off"disabled></el-input>
								</el-form-item>
								<el-form-item label="入院时间" >
									<el-input style="width: 210px;" v-model="jeisuans.joinTime" autocomplete="off"disabled></el-input>
								</el-form-item>
								<el-form-item label="结算日期" style="margin-left: 100px;" >
									<div class="block">
										<el-date-picker style="width: 210px;" value-format="yyyy-MM-dd" v-model="jeisuans.endtime" align="right" type="date" placeholder="选择日期"
										 :picker-options="pickerOptions1">
										</el-date-picker>
									</div>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="dialogFormVisible = false">取 消</el-button>
								<el-button type="primary" @click="simit()">确 定</el-button>
							</div>
						</el-dialog>
					</template>
				</el-table-column>
			</el-table>
      <el-pagination style="margin-left: 40%;" background @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
		</el-card>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	export default {
		data() {
			return {

				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				pickerOptions2: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				value1: '',
				value2: '',
				dialogFormVisible: false,
				form: {
					oldName: '',
					identitycard: '',
					outtime: ''
				},
				jeisuans:{
					oldId: '',
					oldName:'',
					identitycard:'',
					address:'',
					money: '',
					joinTime:'',
					endtime:'',
					status:'',
				},
				formLabelWidth: '120px',
				oldname: '',
				tableData: [],
        total: 0,
        pageNum: 1,
        currentPage: 1,
        pagesize: 5,
			}
		},
		methods: {

			simit() {
				this.dialogFormVisible = false
				this.$get('http://localhost:8089/Controller/insertStaybackSet',this.jeisuans).then(r=>{
					console.log(r.data)
				})
				console.log("获取数据")
				console.log(this.jeisuans)
				console.log("-----------")
				this.$notify({
				          title: '成功',
				          message: '老人住院费用结算成功',
				          type: 'success'
				        });
				//修改状态请求
				axios.get('http://localhost:8089/Controller/updateStatus', {
					params:{oldid:this.jeisuans.oldId}
				}).then(v => {
					// v => 向上获取data 对象
					console.log(v.data);
					this.init()
				});
			},
      /*分页*/
      handleSizeChange(size) {
        this.pagesize = size
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
			jiesuan(aaa){
				this.dialogFormVisible = true
				this.jeisuans.oldId = aaa.oldId;
				this.jeisuans.oldName = aaa.oldName;
				this.jeisuans.identitycard = aaa.identitycard;
				this.jeisuans.joinTime = aaa.joinTime;
				this.jeisuans.address = aaa.address;
				this.jeisuans.endtime = aaa.endtime;
				this.jeisuans.status = aaa.status;
				axios.get('http://localhost:8089/Controller/selectCostSteam', {
					params:{oldid:this.jeisuans.oldId}
				}).then(v => {
					// v => 向上获取data 对象
					// console.log(v.data);
					this.jeisuans.money = v.data[0].money;
				});
			},
			init() {
				axios.get('http://localhost:8089/Controller/selectRecOld', {}).then(v => {
					// v => 向上获取data 对象
					// console.log(v.data);
					this.tableData = v.data;
          this.total = this.tableData.length
				});
			},
			shuaxin() {
				this.init()
			},
			oldNamae() {
				let param = {
					OldName: this.oldname,
				}
				axios.get("http://localhost:8089/Controller/selectOldName", {
						params: param
					})
					.then(r => {
						this.tableData = r.data;
            this.total = this.tableData.length
					})
			},
			a(a){
				console.log(a)
			}
		},
		created: function() {
			this.init()
		},
	}
</script>

<style>
	.wrap {
		width: 100%;
		height: 100%;
	}

	.el-pagination {
		margin-top: 15px;
	}

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>
