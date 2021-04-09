<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>退住管理</el-breadcrumb-item>
      <el-breadcrumb-item>查询测试</el-breadcrumb-item>
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
        <el-table-column prop="oldName" label="老人姓名" width="80px"></el-table-column>
        <el-table-column prop="identitycard" label="身份证号" width="180px"></el-table-column>
        <el-table-column prop="joinTime" label="入院时间" width="130px"></el-table-column>
        <el-table-column prop="endtime" label="结算时间" width="130px"></el-table-column>
        <el-table-column prop="outof" label="退住形式" width="80px"></el-table-column>
        <el-table-column prop="cause" label="出院原因" width="160px"></el-table-column>
        <el-table-column prop="dengjiren" label="登记人" width="80px"></el-table-column>
        <el-table-column prop="endtime" label="登记时间" width="100px"></el-table-column>
        <el-table-column label="操作" width="120px">

          <template slot-scope="scope">
            <el-button @click="chakan(scope.row)" type="primary">查看档案</el-button>
            <el-dialog :visible.sync="dialogFormVisible" width="80%" style="margin-top: -6%;text-align: left;"
              @close="closedilog">
              <el-form :rules="rules" ref="ruleForm" :model="chakans" label-width="120px">
                <el-divider>基本信息</el-divider>
                <el-card>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="phyHospital" label="老人姓名">
                        <el-input v-model="chakans.oldName" clearable disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="phyHospital" label="体检医院">
                        <el-input v-model="chakans.phyHospital" clearable disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="phyTime" label="体检时间">
                        <el-input v-model="chakans.phyTime" clearable disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="regTime" label="登记时间">
                        <el-input value-format="yyyy-MM-dd" v-model="chakans.regTime" clearable disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="registrantId" label="登记人ID">
                        <el-input v-model="chakans.oldId" clearable disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="registrant" label="登记人">
                        <el-input v-model="chakans.registrant" clearable disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item prop="phyExamination" label="体检结果">
                    <el-input type="textarea" v-model="chakans.phyExamination" disabled></el-input>
                  </el-form-item>
                </el-card>
                <el-divider>基本特征</el-divider>
                <el-card>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="height" label="身高">
                        <el-input v-model="chakans.weight" disabled clearable style="width: 85%;"></el-input>cm
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="weight" label="体重">
                        <el-input v-model="chakans.weight" disabled clearable style="width: 85%;"></el-input>kg
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item prop="temperature" label="体温">
                    <el-input v-model="chakans.temperature" disabled clearable style="width: 36.8%;"></el-input>°C
                  </el-form-item>
                </el-card>
                <el-divider>家属信息</el-divider>
                <el-card>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="height" label="家属姓名">
                        <el-input v-model="chakans.familyname" disabled clearable style="width: 85%;"></el-input>cm
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="weight" label="电话号码">
                        <el-input v-model="chakans.phone" disabled clearable style="width: 85%;"></el-input>kg
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="weight" label="身份证号">
                        <el-input v-model="chakans.identitycard" disabled clearable style="width: 85%;"></el-input>kg
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="weight" label="性别">
                        <el-input v-model="chakans.gender" disabled clearable style="width: 85%;"></el-input>kg
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="weight" label="与老人关系">
                        <el-input v-model="chakans.relationship" disabled clearable style="width: 85%;"></el-input>kg
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="temperature" label="家庭地址">
                        <el-input v-model="chakans.address" disabled clearable style="width: 36.8%;"></el-input>°C
                      </el-form-item>
                    </el-col>
                  </el-row>


                </el-card>
                <el-divider>血压-血氧信息</el-divider>
                <el-card>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="highPressure" label="高压">
                        <el-input v-model="chakans.highPressure" disabled clearable style="width: 85%;"></el-input>mmHg
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="lowPressure" label="低压">
                        <el-input v-model="chakans.lowPressure" disabled clearable style="width: 85%;"></el-input>mmHg
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="pulse" label="脉搏">
                        <el-input v-model="chakans.pulse" clearable disabled style="width: 85%;"></el-input>次/分
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="bloodOxygen" label="血氧饱和度">
                        <el-input v-model="chakans.bloodOxygen" disabled clearable style="width: 85%;"></el-input>%
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
                <el-divider>血糖信息</el-divider>
                <el-card>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="fastingBlood" label="空腹血糖">
                        <el-input v-model="chakans.fastingBlood" disabled clearable style="width: 85%;"></el-input>
                        mmol/L
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="postprandialBlood" label="餐后血糖">
                        <el-input v-model="chakans.postprandialBlood" disabled clearable style="width: 85%;"></el-input>
                        mmol/L
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
                <el-divider>血脂信息</el-divider>
                <el-card>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="totalCholesterol" label="总胆固醇">
                        <el-input v-model="chakans.totalCholesterol" disabled clearable style="width: 85%;"></el-input>
                        mmol/L
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="hdl" label="高密度脂蛋白胆固醇">
                        <el-input v-model="chakans.hdl" clearable disabled style="width: 85%;"></el-input>mmol/L
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="triglyceride" label="甘油三酯">
                        <el-input v-model="chakans.triglyceride" disabled clearable style="width: 85%;"></el-input>
                        mmol/L
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="ldl" label="低密度脂蛋白胆固醇">
                        <el-input v-model="chakans.ldl" clearable disabled style="width: 85%;"></el-input>mmol/L
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item prop="uricAcid" label="尿酸">
                    <el-input v-model="chakans.uricAcid" disabled clearable style="width: 36.8%;"></el-input>mmol/L
                  </el-form-item>
                </el-card>
                <el-divider>心电信息</el-divider>
                <el-card>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="qrsInterval" label="qrs间期">
                        <el-input v-model="chakans.qrsInterval" disabled clearable style="width: 85%;"></el-input>ms
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="gpComments" label="全科医生批注">
                        <el-input type="textarea" disabled v-model="chakans.gpComments" clearable style="width: 85%;">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="rrInterval" label="rr间期">
                        <el-input v-model="chakans.rrInterval" disabled clearable style="width: 85%;"></el-input>s
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="tdaResults" label="医生分析结果">
                        <el-input type="textarea" disabled v-model="chakans.tdaResults" clearable style="width: 85%;">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item prop="heartRate" label="心率">
                    <el-input v-model="chakans.heartRate" disabled clearable style="width: 36.8%;"></el-input>次/分
                  </el-form-item>
                </el-card>
              </el-form>
              <br><br>
              <div style="margin-left: 50%;">
                <el-button type="success" :loading="sub" @click="submit">关闭</el-button>
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
        dialogFormVisible: false,
        form: {
          oldName: '',
          identitycard: '',
          outtime: ''
        },

        chakans: {},
        total: 0,
        pageNum: 1,
        currentPage: 1,
        pagesize: 5,
        formLabelWidth: '120px',
        oldname: '',
        tableData: [],
      }
    },
    methods: {
      chakan(ccc) {
        this.dialogFormVisible = true
        console.log(ccc);
        axios.get('http://localhost:8089/Controller/selectOldDananVo', {
          params: {
            oldid: ccc.oldid
          }
        }).then(v => {
          // v => 向上获取data 对象
          this.chakans = v.data;
          console.log(this.chakans)
        });
      },
      submit() {
        this.dialogFormVisible = false
      },
      /*分页*/
      handleSizeChange(size) {
        this.pagesize = size
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      init() {
        axios.get('http://localhost:8089/Controller/selectDengji', {}).then(v => {
          // v => 向上获取data 对象
          console.log(v.data);
          this.tableData = v.data;
          this.total = this.tableData.length
        });
      },
      shuaxin() {
        this.init()
      },
      oldNamae() {
        let param = {
          oldname: this.oldname,
        }
        axios.get("http://localhost:8089/Controller/selectDengjiName", {
            params: param
          })
          .then(r => {
            console.log(r.data)
            this.tableData = r.data;

          })
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
