<template>
  <div>
    <h2 style="float: left;">体检登记</h2><br><br><br>
    <div style="float: left;">
      <el-button icon="el-icon-s-help" type="warning" @click="zuhe">组合查询</el-button>
      <el-button icon="el-icon-refresh" type="success" @click="init">刷新</el-button>
      <el-button icon="el-icon-plus" type="primary" @click="add">新增</el-button><br><br>
    </div>
    <el-table :header-cell-style="{'text-align':'center','background':'#DAE2EF','color':'gray',}"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" border>
      <el-table-column prop="recOld.oldName" label="老人姓名" width="90">
      </el-table-column>
      <el-table-column prop="phyHospital" label="体检医院">
      </el-table-column>
      <el-table-column prop="phyTime" sortable label="体检时间">
      </el-table-column>
      <el-table-column prop="phyExamination" label="体检结果">
      </el-table-column>
      <el-table-column prop="registrant" label="登记人">
      </el-table-column>
      <el-table-column prop="regTime" sortable label="登记时间">
      </el-table-column>
      <el-table-column label="操作" width="75">
        <template slot-scope="scope">
          <i class="el-icon-view" title="查看详情" style="cursor: pointer;" @click="shitu(scope.row)"></i>
          <i class="el-icon-edit" title="修改" style="cursor: pointer;" @click="edit(scope.row)"></i>
          <i class="el-icon-delete" title="删除" style="cursor: pointer;" @click="del(scope.row.regId)"></i>
        </template>
      </el-table-column>
    </el-table><br>
    <el-pagination style="margin-left: 40%;" background @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[1, 2, 5, 10]"
      :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog :visible.sync="addvisible" :title="title" width="80%" style="margin-top: -6%;text-align: left;"
      @close="closedilog">
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="120px">
        <el-divider>基本信息</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="erOldName" label="老人姓名">
                <el-select v-model="form.erOldName" style="width: 100%;">
                  <el-option v-for="i in name" :key="i.oldId" :label="i.oldName" :value="i.oldId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="phyHospital" label="体检医院">
                <el-input v-model="form.phyHospital" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="phyTime" label="体检时间">
                <el-date-picker style="width: 100%;" v-model="form.phyTime" type="datetime" placeholder="选择日期时间"
                  align="right" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="regTime" label="登记时间">
                <el-date-picker style="width: 100%;" v-model="form.regTime" type="datetime" placeholder="选择日期时间"
                  align="right" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="registrantId" label="登记人ID">
                <el-input v-model="form.registrantId" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="registrant" label="登记人">
                <el-input v-model="form.registrant" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="phyExamination" label="体检结果">
            <el-input type="textarea" v-model="form.phyExamination"></el-input>
          </el-form-item>
        </el-card>
        <el-divider>基本特征</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="height" label="身高">
                <el-input v-model="form.height" clearable style="width: 85%;"></el-input>cm
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="weight" label="体重">
                <el-input v-model="form.weight" clearable style="width: 85%;"></el-input>kg
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="temperature" label="体温">
            <el-input v-model="form.temperature" clearable style="width: 36.8%;"></el-input>°C
          </el-form-item>
        </el-card>
        <el-divider>血压-血氧信息</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="highPressure" label="高压">
                <el-input v-model="form.highPressure" clearable style="width: 85%;"></el-input>mmHg
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="lowPressure" label="低压">
                <el-input v-model="form.lowPressure" clearable style="width: 85%;"></el-input>mmHg
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="pulse" label="脉搏">
                <el-input v-model="form.pulse" clearable style="width: 85%;"></el-input>次/分
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="bloodOxygen" label="血氧饱和度">
                <el-input v-model="form.bloodOxygen" clearable style="width: 85%;"></el-input>%
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-divider>血糖信息</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="fastingBlood" label="空腹血糖">
                <el-input v-model="form.fastingBlood" clearable style="width: 85%;"></el-input>mmol/L
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="postprandialBlood" label="餐后血糖">
                <el-input v-model="form.postprandialBlood" clearable style="width: 85%;"></el-input>mmol/L
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-divider>血脂信息</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="totalCholesterol" label="总胆固醇">
                <el-input v-model="form.totalCholesterol" clearable style="width: 85%;"></el-input>mmol/L
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="hdl" label="高密度脂蛋白胆固醇">
                <el-input v-model="form.hdl" clearable style="width: 85%;"></el-input>mmol/L
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="triglyceride" label="甘油三酯">
                <el-input v-model="form.triglyceride" clearable style="width: 85%;"></el-input>mmol/L
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="ldl" label="低密度脂蛋白胆固醇">
                <el-input v-model="form.ldl" clearable style="width: 85%;"></el-input>mmol/L
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="uricAcid" label="尿酸">
            <el-input v-model="form.uricAcid" clearable style="width: 36.8%;"></el-input>mmol/L
          </el-form-item>
        </el-card>
        <el-divider>心电信息</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="qrsInterval" label="qrs间期">
                <el-input v-model="form.qrsInterval" clearable style="width: 85%;"></el-input>ms
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="gpComments" label="全科医生批注">
                <el-input type="textarea" v-model="form.gpComments" clearable style="width: 85%;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="rrInterval" label="rr间期">
                <el-input v-model="form.rrInterval" clearable style="width: 85%;"></el-input>s
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="tdaResults" label="医生分析结果">
                <el-input type="textarea" v-model="form.tdaResults" clearable style="width: 85%;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="heartRate" label="心率">
            <el-input v-model="form.heartRate" clearable style="width: 36.8%;"></el-input>次/分
          </el-form-item>
        </el-card>
      </el-form>
      <br><br>
      <div style="margin-left: 80%;">
        <el-button type="warning" @click="quxiao('ruleForm')">取消</el-button>
        <el-button type="success" :loading="sub" @click="submit('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
    <el-drawer title="组合查询" :visible.sync="drawer" size="40%" style="text-align: left;">
      <el-form :model="selectform" ref="selectref" label-width="100px">
        <el-form-item prop="erOldName" label="老人姓名">
          <el-select v-model="selectform.erOldName" style="width: 100%;" clearable>
            <el-option v-for="i in name" :key="i.oldId" :label="i.oldName" :value="i.oldId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="phyHospital" label="体检医院">
          <el-input v-model="selectform.phyHospital" clearable></el-input>
        </el-form-item>
        <el-form-item prop="phyExamination" label="体检结果">
          <el-input v-model="selectform.phyExamination" clearable></el-input>
        </el-form-item>
        <el-form-item prop="registrantId" label="登记人ID">
          <el-input v-model="selectform.registrantId" clearable></el-input>
        </el-form-item>
        <el-form-item prop="registrant" label="登记人">
          <el-input v-model="selectform.registrant" clearable></el-input>
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
              <el-form-item label="体检医院:">
                <a style="color: blue;">{{xiangqing.phyHospital}}</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="体检时间:">
                <a style="color: blue;">{{xiangqing.phyTime}}</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="体检结果:">
                <a style="color: blue;">{{xiangqing.phyExamination}}</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="登记人:">
                <a style="color: blue;">{{xiangqing.registrant}}</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登记时间:">
                <a style="color: blue;">{{xiangqing.regTime}}</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="登记人ID:">
                <a style="color: blue;">{{xiangqing.registrantId}}</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="修改时间:">
                <a style="color: blue;">{{xiangqing.updateTime}}</a>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-divider>基本特征</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="height" label="身高:">
                <a style="color: blue;">{{xiangqing.height}}</a>cm
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="weight" label="体重:">
                <a style="color: blue;">{{xiangqing.weight}}</a>kg
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="temperature" label="体温:">
            <a style="color: blue;">{{xiangqing.temperature}}</a>°C
          </el-form-item>
        </el-card>
        <el-divider>血压-血氧信息</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="highPressure" label="高压:">
                <a style="color: blue;">{{xiangqing.highPressure}}</a>mmHg
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="lowPressure" label="低压:">
                <a style="color: blue;">{{xiangqing.lowPressure}}</a>mmHg
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="pulse" label="脉搏:">
                <a style="color: blue;">{{xiangqing.pulse}}</a>次/分
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="bloodOxygen" label="血氧饱和度:">
                <a style="color: blue;">{{xiangqing.bloodOxygen}}</a>%
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-divider>血糖信息</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="fastingBlood" label="空腹血糖:">
                <a style="color: blue;">{{xiangqing.fastingBlood}}</a>mmol/L
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="postprandialBlood" label="餐后血糖:">
                <a style="color: blue;">{{xiangqing.postprandialBlood}}</a>mmol/L
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-divider>血脂信息</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="totalCholesterol" label="总胆固醇:">
                <a style="color: blue;">{{xiangqing.totalCholesterol}}</a>mmol/L
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="hdl" label="高密度脂蛋白胆固醇:">
                <a style="color: blue;">{{xiangqing.hdl}}</a>mmol/L
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="triglyceride" label="甘油三酯:">
                <a style="color: blue;">{{xiangqing.triglyceride}}</a>mmol/L
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="ldl" label="低密度脂蛋白胆固醇:">
                <a style="color: blue;">{{xiangqing.ldl}}</a>mmol/L
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="uricAcid" label="尿酸:">
            <a style="color: blue;">{{xiangqing.uricAcid}}</a>mmol/L
          </el-form-item>
        </el-card>
        <el-divider>心电信息</el-divider>
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="qrsInterval" label="qrs间期:">
                <a style="color: blue;">{{xiangqing.qrsInterval}}</a>ms
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="gpComments" label="全科医生批注:">
                <a style="color: blue;">{{xiangqing.gpComments}}</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="rrInterval" label="rr间期:">
                <a style="color: blue;">{{xiangqing.rrInterval}}</a>s
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="tdaResults" label="医生分析结果:">
                <a style="color: blue;">{{xiangqing.tdaResults}}</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="heartRate" label="心率:">
            <a style="color: blue;">{{xiangqing.heartRate}}</a>次/分
          </el-form-item>
        </el-card>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      var checktemperature = (rule, value, callback) => {
        const xiaoshu = /^([0-9]{1,}[.][0-9]*)$/
        const zhengshu = /^([0-9]{1,})$/
        if (value != null && value != '' && !xiaoshu.test(value) && !zhengshu.test(value)) {
          return callback(new Error('请输入正确体温！'));
        } else if (value != null && value != '' && value < 35) {
          return callback(new Error('体温低于人体正常体温！'));
        } else if (value != null && value != '' && value > 42) {
          return callback(new Error('体温高于人体正常体温！'));
        } else {
          return callback();
        }
      };
      var checkNumber = (rule, value, callback) => {
        const zhengshu = /^([0-9]{1,})$/
        if (value != null && value != '' && !zhengshu.test(value)) {
          return callback(new Error('请输入整数！'))
        } else {
          return callback();
        }
      };
      var checkshu = (rule, value, callback) => {
        const xiaoshu = /^([0-9]{1,}[.][0-9]*)$/
        const zhengshu = /^([0-9]{1,})$/
        if (value != null && value != '' && !xiaoshu.test(value) && !zhengshu.test(value)) {
          return callback('请输入数字！')
        } else {
          return callback();
        }
      }
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
          temperature: [{
            validator: checktemperature,
            trigger: 'change'
          }, ],
          erOldName: [{
            required: true,
            message: '请选择老人姓名',
            trigger: 'change'
          }],
          phyTime: [{
            required: true,
            message: '请选择体检时间',
            trigger: 'change'
          }],
          regTime: [{
            required: true,
            message: '请选择登记时间',
            trigger: 'change'
          }],
          phyHospital: [{
            required: true,
            message: '输入体检医院',
            trigger: 'change'
          }],
          registrant: [{
            required: true,
            message: '输入登记人',
            trigger: 'change'
          }],
          phyExamination: [{
            required: true,
            message: '输入体检结果',
            trigger: 'change'
          }],
          registrantId: [{
            validator: checkNumber,
            trigger: 'change'
          }],
          height: [{
            validator: checkshu,
            trigger: 'change'
          }],
          weight: [{
            validator: checkshu,
            trigger: 'change'
          }],
          pulse: [{
            validator: checkNumber,
            trigger: 'change'
          }],
          heartRate: [{
            validator: checkNumber,
            trigger: 'change'
          }],
          highPressure: [{
            validator: checkNumber,
            trigger: 'change'
          }],
          lowPressure: [{
            validator: checkNumber,
            trigger: 'change'
          }],
          bloodOxygen: [{
            validator: checkshu,
            trigger: 'change'
          }],
          fastingBlood: [{
            validator: checkshu,
            trigger: 'change'
          }],
          postprandialBlood: [{
            validator: checkshu,
            trigger: 'change'
          }],
          totalCholesterol: [{
            validator: checkshu,
            trigger: 'change'
          }],
          hdl: [{
            validator: checkshu,
            trigger: 'change'
          }],
          triglyceride: [{
            validator: checkshu,
            trigger: 'change'
          }],
          ldl: [{
            validator: checkshu,
            trigger: 'change'
          }],
          uricAcid: [{
            validator: checkshu,
            trigger: 'change'
          }],
          qrsInterval: [{
            validator: checkNumber,
            trigger: 'change'
          }],
          rrInterval: [{
            validator: checkshu,
            trigger: 'change'
          }],
        },
        sub: false,
        id: ''
      }
    },
    methods: {
      init() {
        this.$axios.post("ExpectedRegistration/selectAll").then(v => {
          if (v.status == 200) {
            this.tableData = v.data
            this.total = this.tableData.length
          }
        })
      },
      select() {
        this.$axios.post("ExpectedRegistration/selectAll", this.selectform).then(v => {
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
        this.title = '体检登记'
        this.$axios.get("ExpectedRegistration/selectName").then(v => {
          this.name = v.data
        })
        this.id = 0
        this.addvisible = true
      },
      zuhe() {
        this.drawer = true
        this.$axios.get("ExpectedRegistration/selectName").then(v => {
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
      del(regId) {
        this.$confirm('此操作将永久删除体检登记, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("ExpectedRegistration/delete", this.qs.stringify({
            regId: regId
          })).then(v => {
            if (v.status == 200) {
              this.init()
              this.$message.success("删除成功！");
            }
          }).catch(v => {
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
        this.title = "修改体检登记"
        this.id = 1
        this.$axios.get("ExpectedRegistration/selectName").then(v => {
          this.name = v.data
        })
        this.addvisible = true
      },
      submit(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.sub = true
            if (this.id == 0) {
              this.$axios.post("ExpectedRegistration/insert", this.form).then(v => {
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
                this.$axios.post("ExpectedRegistration/update", this.form).then(v => {
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
