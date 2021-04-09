<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>退住管理</el-breadcrumb-item>
			<el-breadcrumb-item>登记</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-row :gutter="20">
				<el-col :span="6">
					<el-input v-model="oldname" placeholder="请输入姓名">
						<el-button slot="append" icon="el-icon-search" @click="oldNamae(oldname)"></el-button>
					</el-input>
				</el-col>
				<el-button style="float: left;" type="primary" icon="el-icon-refresh-left" @click="shuaxin"></el-button>
			</el-row>
			<!-- 用户列表区域 -->
			<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%">
				<el-table-column prop="oldName" label="老人姓名" width="280px"></el-table-column>
				<el-table-column prop="identitycard" label="身份证号" width="350px"></el-table-column>
				<el-table-column prop="endtime" label="结算时间" width="200px"></el-table-column>
				<el-table-column prop="status" label="结算状态" width="150px">
					<template slot-scope="scope">
						              <p v-if="scope.row.status=='1'">
						                未登记
										<!-- 删除 -->
						              </p>
						              <p v-if="scope.row.status=='3'">
						                已登记、出院
						              </p>
						            </template>
					</el-table-column>
				</el-table-column>
				<el-table-column label="操作" width="160">
					<template slot-scope="scope">
						<el-button type="success" @click="dengjis(scope.row)">登记</el-button>
						<el-dialog title="出院登记" :visible.sync="dialogFormVisible">
							<el-form :inline="true" :model="dengji" label-position="left">
								<el-form-item label="老人姓名">
									<el-input v-model="dengji.oldName" autocomplete="off" disabled>
									</el-input>
								</el-form-item>
								<el-form-item label="身份证号" style="margin-left: 100px;">
									<el-input disabled style="width: 220px;" v-model="dengji.identitycard" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="结算日期">
									<el-input disabled style="width: 210px;" v-model="dengji.endtime" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="出院形式" style="margin-left: 100px;">
									<el-select v-model="dengji.outof" placeholder="请选择出院形式">
										<el-option label="出院" value="出院"></el-option>
										<el-option label="转院" value="转院"></el-option>
										<el-option label="死亡" value="死亡"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="退住日期">
									<div class="block">
										<el-date-picker style="width: 210px;" value-format="yyyy-MM-dd" v-model="dengji.outtime" align="right" type="date"
										 placeholder="选择日期" :picker-options="pickerOptions1">
										</el-date-picker>
									</div>
								</el-form-item>
								<el-form-item label="出院登记人" style="margin-left: 100px;">
									<el-input style="width: 220px;" v-model="dengji.dengjiren" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="出院原因">
									<el-input style="width: 620px;" v-model="dengji.cause" autocomplete="off"></el-input>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="dialogFormVisible = false">取 消</el-button>
								<el-button type="primary" @click="smit">确 定</el-button>
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
				dengji: {
					oldName: '',
					oldid:'',
					identitycard: '',
					endtime: '',
					outof: '', //出院形式
					outtime: '', //退住日期
					dengjiren: '', //登记人
					cause: '', //出院原因
					joinTime:'',
				},
				dialogFormVisible: false,
				form: {
					oldName: '',
					identitycard: '',
					outtime: ''
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
			init() {
				axios.get('http://localhost:8089/Controller/selectStaybackSet', {}).then(v => {
					// v => 向上获取data 对象
					// console.log(v.data);
					this.tableData = v.data;
          this.total=this.tableData.length
				});
			},
      /*分页*/
      handleSizeChange(size) {
        this.pagesize = size
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
			shuaxin() {
				this.init()
			},
			oldNamae() {
				let param = {
					setname: this.oldname,
				}
				axios.get("http://localhost:8089/Controller/selectStaybackName", {
						params: param
					})
					.then(r => {
						this.tableData = r.data;
            this.total=this.tableData.length
					})
			},
			dengjis(ddd) {
				this.dialogFormVisible = true
				this.dengji.oldName = ddd.oldName;
				this.dengji.oldid = ddd.oldId;
				this.dengji.identitycard = ddd.identitycard;
				this.dengji.endtime = ddd.endtime;
				this.dengji.outof = ddd.outof;
				this.dengji.outtime = ddd.outtime;
				this.dengji.dengjiren = ddd.dengjiren;
				this.dengji.cause = ddd.cause;
				this.dengji.joinTime = ddd.joinTime;
			},
			smit(aaa) {
				this.dialogFormVisible = false
				this.$get('http://localhost:8089/Controller/insertStaybackDengji', this.dengji).then(r => {
					console.log(r.data)
				})
				//修改状态请求
				axios.get('http://localhost:8089/Controller/updetaStaybackSet', {
					params:{oldName:this.dengji.oldName}
				}).then(v => {
					// v => 向上获取data 对象
					console.log(v.data);
					this.init()
				});
				this.$notify({
				          title: '成功',
				          message: '老人出院登记成功',
				          type: 'success'
				        });
			},
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
