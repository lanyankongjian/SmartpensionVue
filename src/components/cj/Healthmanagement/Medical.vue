<template>
  <div>
    <h2 style="float: left;">就医登记</h2><br><br><br>
    <div style="float: left;">
      <el-button icon="el-icon-s-help" type="warning" @click="zuhe">组合查询</el-button>
      <el-button icon="el-icon-refresh" type="success" @click="init">刷新</el-button>
      <el-button icon="el-icon-plus" type="primary" @click="add">新增</el-button><br><br>
    </div>
    <el-table :header-cell-style="{'text-align':'center','background':'#DAE2EF','color':'gray',}"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" border>
      <el-table-column prop="recOld.oldName" label="老人姓名" width="90">
      </el-table-column>
      <el-table-column prop="medicalTime" sortable label="就医时间">
      </el-table-column>
      <el-table-column prop="placeOfMedical" sortable label="就医地点">
      </el-table-column>
      <el-table-column prop="physician" label="医师">
      </el-table-column>
      <el-table-column prop="diagnosisResults" label="诊断结果">
      </el-table-column>
      <el-table-column prop="updateTime" sortable label="修改时间">
      </el-table-column>
      <el-table-column label="操作" width="75">
        <template slot-scope="scope">
          <i class="el-icon-view" title="查看详情" style="cursor: pointer;" @click="shitu(scope.row)"></i>
          <i class="el-icon-edit" title="修改" style="cursor: pointer;" @click="edit(scope.row)"></i>
          <i class="el-icon-delete" title="删除" style="cursor: pointer;" @click="del(scope.row.mrId)"></i>
        </template>
      </el-table-column>
    </el-table><br>
    <el-pagination style="margin-left: 40%;" background @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[1, 2, 5, 10]"
      :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog :visible.sync="addvisible" :title="title" width="60%" style="margin-top: -6%;text-align: left;"
      @close="closedilog">
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="120px">
        <el-divider>基本信息</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="mrOldName" label="老人姓名">
                <el-select v-model="form.mrOldName" style="width: 100%;">
                  <el-option v-for="i in name" :key="i.oldId" :label="i.oldName" :value="i.oldId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="physician" label="医师">
                <el-input v-model="form.physician" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="medicalTime" label="就医时间">
                <el-date-picker style="width: 100%;" v-model="form.medicalTime" type="datetime" placeholder="选择日期时间"
                  align="right" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="placeOfMedical" label="就医地点">
                <el-input v-model="form.placeOfMedical" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="diagnosisResults" label="诊断结果">
            <el-input type="textarea" v-model="form.diagnosisResults" clearable></el-input>
          </el-form-item>
          <el-form-item prop="medicalAdvice" label="医嘱">
            <el-input type="textarea" v-model="form.medicalAdvice" clearable></el-input>
          </el-form-item>
        </el-card>
      </el-form>
      <br><br>
      <div style="margin-left: 66%;">
        <el-button type="warning" @click="quxiao('ruleForm')">取消</el-button>
        <el-button type="success" :loading="sub" @click="submit('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
    <el-drawer title="组合查询" :visible.sync="drawer" size="40%" style="text-align: left;">
      <el-form :model="selectform" ref="selectref" label-width="100px">
        <el-form-item prop="mrOldName" label="老人姓名">
          <el-select v-model="selectform.mrOldName" style="width: 100%;" clearable>
            <el-option v-for="i in name" :key="i.oldId" :label="i.oldName" :value="i.oldId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="placeOfMedical" label="就医地点">
          <el-input v-model="selectform.placeOfMedical" clearable></el-input>
        </el-form-item>
        <el-form-item prop="physician" label="医师">
          <el-input v-model="selectform.physician" clearable></el-input>
        </el-form-item>
        <el-form-item prop="diagnosisResults" label="诊断结果">
          <el-input v-model="selectform.diagnosisResults" clearable></el-input>
        </el-form-item>
      </el-form>
      <div style="float: right;">
        <el-button type="success" @click="select">查询</el-button>
      </div>
    </el-drawer>
    <el-dialog title="查看详情" width="50%" :visible.sync="shitulog" style="margin-top: -6%;">
      <el-form :model="xiangqing" label-width="150px" style="text-align: left;">
        <el-divider>基本信息</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item label="老人姓名:">
                <a style="color: blue;">{{xiangqing.recOld.oldName}}</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="就医时间:">
                <a style="color: blue;">{{xiangqing.medicalTime}}</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="医师:">
                <a style="color: blue;">{{xiangqing.physician}}</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="就医地点:">
                <a style="color: blue;">{{xiangqing.placeOfMedical}}</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="诊断结果:">
                <a style="color: blue;">{{xiangqing.diagnosisResults}}</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="医嘱:">
                <a style="color: blue;">{{xiangqing.medicalAdvice}}</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="修改时间:">
            <a style="color: blue;">{{xiangqing.updateTime}}</a>
          </el-form-item>
        </el-card>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {
          disabledDate: (time) => {
            if (time.getTime() > new Date().getTime()) {
              return true;
            }
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
          }, ],
        },
        tableData: [],
        total: 0,
        pageNum: 1,
        currentPage: 1,
        pagesize: 5,
        addvisible: false,
        form: {},
        selectform: {},
        xiangqing: {
          recOld: {}
        },
        title: '',
        shitulog: false,
        name: [],
        drawer: false,
        rules: {
          mrOldName: [{
            required: true,
            message: '请选择老人姓名',
            trigger: 'change'
          }],
          medicalTime: [{
            required: true,
            message: '请选择就医时间',
            trigger: 'change'
          }],
          placeOfMedical: [{
            required: true,
            message: '请输入就医地点',
            trigger: 'change'
          }],
          diagnosisResults: [{
            required: true,
            message: '请输入就医结果',
            trigger: 'change'
          }],
          physician: [{
            required: true,
            message: '请输入医师',
            trigger: 'change'
          }],
        },
        sub: false,
        id: ''
      }
    },
    methods: {
      init() {
        this.$axios.post("MedicalRegistration/selectAll").then(v => {
          if (v.status == 200) {
            this.tableData = v.data
            this.total = this.tableData.length
          }
        })
      },
      select() {
        this.$axios.post("MedicalRegistration/selectAll", this.selectform).then(v => {
          if (v.status == 200) {
            this.tableData = v.data
            this.total = this.tableData.length
            this.drawer = false
            this.selectform = {}
          }
        })
      },
      /*分页*/
      handleSizeChange(size) {
        this.pagesize = size
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      add() {
        this.title = '就医登记'
        this.$axios.get("MedicalRegistration/selectName").then(v => {
          this.name = v.data
        })
        this.id = 0
        this.addvisible = true
      },
      zuhe() {
        this.drawer = true
        this.$axios.get("MedicalRegistration/selectName").then(v => {
          this.name = v.data
        })
      },
      shitu(row) {
        this.xiangqing = row
        this.shitulog = true
      },
      closedilog() {
        this.form = {}
      },
      quxiao(ruleForm) {
        this.addvisible = false
        this.$refs['ruleForm'].resetFields()
      },
      del(mrId) {
        this.$confirm('此操作将永久删除体检登记, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("MedicalRegistration/delete", this.qs.stringify({
            mrId: mrId
          })).then(v => {
            if (v.status == 200) {
              this.init()
              this.$message.success("删除成功！");
            }
          }).catch(v=>{
            this.$message.error("删除错误！")
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      edit(row) {
        this.form = row
        this.title="修改就医登记"
        this.id = 1
        this.$axios.get("MedicalRegistration/selectName").then(v => {
          this.name = v.data
        })
        this.addvisible = true
      },
      submit(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.sub = true
            if (this.id == 0) {
              this.$axios.post("MedicalRegistration/insert", this.form).then(v => {
                if (v.status == 200) {
                  this.init()
                  this.addvisible = false
                  this.sub = false
                  this.$refs['ruleForm'].resetFields()
                  this.$message.success("体检登记成功！")
                } else {
                  this.$message.error("体检登记失败！")
                  this.sub = false
                  this.$refs['ruleForm'].resetFields()
                }
              })
            }
            if (this.id == 1) {
              this.$confirm('请再次确认修改', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$axios.post("MedicalRegistration/update", this.form).then(v => {
                  if (v.status == 200) {
                    this.init()
                    this.$message.success("修改成功！")
                    this.sub = false
                    this.addvisible = false
                  } else {
                    this.$message.error("修改失败！")
                  }
                }).catch(v => {
                  this.$message.error("出现错误！")
                  this.sub = false
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消修改'
                });
              });
            }
          } else {
            this.$message.warning("请检验值的正确性！")
          }
        })
      }
    },
    created() {
      this.init()
    }
  }
</script>

<style>
</style>
