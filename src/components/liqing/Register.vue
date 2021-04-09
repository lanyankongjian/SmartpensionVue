<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>老人管理</el-breadcrumb-item>
      <el-breadcrumb-item>外出登记</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <!--高级查询-->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form :inline="true" label-position="left" label-width="80px" class="advanced">
            <el-form-item label="老人姓名:" class="from">
              <el-input v-model="oldnames" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="记录类型：" label-width="88px" class="from">
              <el-select v-model="retype" value-key="value" style="width:150px" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <template>
              <div class="block" style="float: left">
                <span class="demonstration" style="margin-left: 10px">外出时间：</span>
                <el-date-picker v-model="value1" type="daterange" style="width:250px;" range-separator="至"
                  start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </template>
          </el-form>
        </el-col>

      </el-row>

      <el-row class="an">
        <el-col :span="24" style="text-align: right">
          <el-button @click="isAdQuery=true,selectrigisterAll()">查询</el-button>
          <el-button @click="clear()">清空</el-button>
          <el-button @click="drawer = true" class="but" type="info" plain style="color: #2c3e50"><i
              class="el-icon-delete-solid"></i>删除历史</el-button>
          <el-button @click="readyaddrigister" class="but" type="info" plain style="color: #2c3e50"><i
              class="el-icon-circle-plus-outline"></i>添加</el-button>

        </el-col>
      </el-row>
      <el-drawer title="删除历史" :visible.sync="drawer" :direction="direction" size="50%">
        <template>
          <el-table :data="tableData1" style="width: 100%" border max-height="250">
            <el-table-column prop="orId" label="编号">
            </el-table-column>
            <el-table-column prop="old.oldName" label="老人姓名">
            </el-table-column>
            <el-table-column prop="family.familyname" label="陪同人员姓名">
            </el-table-column>
            <el-table-column prop="family.phone" label="陪同人员电话">
            </el-table-column>
            <el-table-column prop="orTime" label="外出时间">
            </el-table-column>
            <el-table-column prop="orPlantime" label="计划返回时间">
            </el-table-column>
            <el-table-column prop="orPretime" label="实际返回时间">
            </el-table-column>
            <el-table-column prop="orDaynum" label="外出天数">
            </el-table-column>
            <el-table-column prop="orBack" label="是否返回">
              <template slot-scope="scope">
                <p v-if="scope.row.orBack=='0'">
                  未返回
                </p>
                <p v-if="scope.row.orBack=='1'">
                  已返回
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="user.userName" label="办理人">
            </el-table-column>
          </el-table>
        </template>
      </el-drawer>

      <!--表格-->
      <template>
        <el-table :data="tableData" style="width: 100%" @selection-change="deleteDatas" border max-height="250">
          <el-table-column type="selection" :selectable="checkboxT">
          </el-table-column>
          <el-table-column prop="old.oldName" label="老人姓名" fixed width="100px">
          </el-table-column>
          <el-table-column prop="family.familyname" label="陪同人员姓名" width="110px">
          </el-table-column>
          <el-table-column prop="family.phone" label="陪同人员电话" width="110px">
          </el-table-column>
          <el-table-column prop="orTime" label="外出时间" width="160px">
          </el-table-column>
          <el-table-column prop="orPlantime" label="计划返回时间" width="160px">
          </el-table-column>
          <el-table-column prop="orPretime" label="实际返回时间" width="160px">
          </el-table-column>
          <el-table-column prop="orDaynum" label="外出天数" width="80px">
          </el-table-column>
          <el-table-column prop="orBack" label="是否返回" width="100px">
            <template slot-scope="scope">
              <p v-if="scope.row.orBack=='0'">
                未返回
              </p>
              <p v-if="scope.row.orBack=='1'">
                已返回
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="user.userName" label="办理人" width="100px">
          </el-table-column>
          <el-table-column label="操作" width="230px">
            <template slot-scope="scope">

              <span v-if="scope.row.orBack==0">
                <el-tooltip class="item" effect="dark" content="延期" placement="top" style="margin-right:0px">

                  <el-button type="primary" icon="el-icon-s-help" circle @click="postpone(scope.row)">
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="登记返回" placement="top">
                  <el-button @click="readlity(scope.row)" type="info" icon="el-icon-document" circle>
                  </el-button>
                </el-tooltip>
              </span>
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">

                <el-button type="warning" @click="readyupdaterigister(scope.row)" icon="el-icon-edit" circle>
                </el-button>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除" placement="top" style="margin-left: 10px">
                <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red"
                  :title="'确定要删除吗？'" @confirm="deleterigister(scope.row)">
                  <el-button slot="reference" type="danger" icon="el-icon-delete" circle></el-button>
                </el-popconfirm>

              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-row>
        <el-button icon="el-icon-delete" size="small" @click="batchDelete" style="margin-top: 10px;float: left">
        </el-button>
      </el-row>
      <!--分页-->

      <div class="block" style="margin-top: 0px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      <el-dialog width="60%" :visible.sync="formVisible">
        <span slot="title" style="font-size: 16px;float: left">
          <i class="el-icon-office-building"></i>
          {{isAdd?'新增外出登记':'修改外出登记'}}
        </span>
        <div style="color: darkgray;margin-left: 0px;margin-top: -10px">
          --------------------------------------------------------------------------------------------------------------------------------------------------------------
        </div>
        <el-form ref="register" :model="register" :rules="rules" label-width="120px">

          <el-form-item label="老人姓名：" prop="old" label-width="120px" style="margin-left:40px;margin-top:10px">
            <el-select v-model="register.old" value-key="oldId" @change="findfamily" clearable placeholder="请选择"
              style="margin-left:-435px;">
              <el-option v-for="item in sss" :key="item.oldId" :label="item.oldName" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外出登记人：" label-width="120px" style="margin-left: 435px;margin-top: -60px;width: 340px">
            <el-input v-model="userNames" disabled></el-input>
          </el-form-item>
          <el-form-item label="陪同人员姓名：" prop="family" label-width="130px" style="margin-left: 35px">
            <el-select v-model="register.family" value-key="familyId" @change="familyinfo" clearable placeholder="请选择"
              style="margin-left:-435px;">
              <el-option v-for="item in familys" :key="item.familyId" :label="item.familyname" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="陪同人员电话：" label-width="120px" style="margin-left: 435px;margin-top: -60px;width: 340px">
            <el-input v-model="register.family.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="陪同人员身份证：" label-width="130px" style="margin-left: 26px">
            <el-input v-model="register.family.identitycard" style="width: 350px;margin-left:-315px;" disabled>
            </el-input>
          </el-form-item>
          <el-form-item label="陪同人员地址：" style="margin-left: 35px">
            <el-input v-model="register.family.address" style="width: 620px;margin-left: -40px" disabled></el-input>
          </el-form-item>
          <template>
            <!-- style="width: 300px;margin-left: 50px;margin-top:-50px;"-->
            <div class="block">
              <span class="demonstration">外出时间：</span>
              <el-date-picker v-model="register.orTime" type="datetime" :disabled="isAdd?false:true"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </template>
          <template>
            <!--style="margin-left: 340px;margin-top:-50px;width: 400px;"-->
            <div class="block" style="width: 340px">
              <span class="demonstration">计划返回时间：</span>
              <el-date-picker v-model="plantime" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </template><br>

          <el-form-item label="外出原因：">
            <el-input type="textarea" v-model="register.orCause" style="width: 500px;"></el-input>
          </el-form-item>

          <el-form-item style="margin-top: 10px;margin-left: -100px">
            <el-button type="primary" @click="addrigister">确定</el-button>
            <el-button @click="formVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog width="35%" :visible.sync="formVisibles">
        <el-form ref="register" :model="register" label-width="120px">
          <template>
            <div class="block">
              <span class="demonstration" style="margin-left: -60px">原计划返回时间：</span>
              <el-date-picker v-model="register.orPlantime" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <div class="block" style="margin-top: 10px">
              <span class="demonstration" style="margin-left: -20px">延期时间：</span>
              <el-date-picker v-model="puttime" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </template>
          <el-form-item style="margin-top: 10px;margin-left: -100px">
            <el-button type="primary" @click="postpones">确定</el-button>
            <el-button @click="formVisibles = false">取消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>

      <el-dialog width="35%" :visible.sync="formVisibless">
        <el-form ref="register" :model="register" label-width="120px">
          <el-form-item label="返回登记人：" label-width="120px" style="margin-left: 60px;margin-top: 0px;width: 340px">
            <el-input v-model="userNames" disabled></el-input>
          </el-form-item>
          <template>
            <div class="block" style="margin-top: 10px">
              <span class="demonstration" style="margin-left: -20px">实际返回时间：</span>
              <el-date-picker v-model="register.orPretime" type="datetime" disabled placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </template>
          <el-form-item style="margin-top: 10px;margin-left: -100px">
            <el-button type="primary" @click="reality()">确定</el-button>
            <el-button @click="formVisibless = false">取消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>

      <el-dialog width="55%" :visible.sync="formVisiblesss">
        <div>
          <p style="color:red;font-size: 20px;float: left">以下老人超过计划时间未归，请尽快处理</p>
          <el-table :data="tableData2" border
            :header-cell-style="{'text-align':'center','background':'#DAE2EF','color':'gray'}"
            :cell-style="{'text-align':'center'}" style="width: 100%;text-align: center">
            <el-table-column prop="old.oldName" label="老人姓名">
            </el-table-column>
            <el-table-column prop="family.familyname" label="陪同人员姓名">
            </el-table-column>
            <el-table-column prop="family.phone" label="陪同人员电话">
            </el-table-column>
            <el-table-column prop="orTime" label="外出时间" width="160">
            </el-table-column>
            <el-table-column prop="orPlantime" label="计划返回时间" width="160">
            </el-table-column>
            <el-table-column prop="orBack" label="是否返回">
              <template slot-scope="scope">
                <p v-if="scope.row.orBack=='0'">
                  未返回
                </p>
                <p v-if="scope.row.orBack=='1'">
                  已返回
                </p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>

    </el-card>
  </div>

</template>

<script>

  export default {
    name: "register",
    data() {
      return {
        rules: {
          old: [{
            required: true,
            message: '请选择老人姓名',
            trigger: 'change'
          }],
          family: [{
            required: true,
            message: '请选择陪同人员姓名',
            trigger: 'change'
          }],
        },

        total: 0, //总记录数
        pageSize: 5, //页大小
        currentPage: 1, //当前页码
        isAdd: true, //是否新增

        drawer: false,
        direction: 'ttb',
        tableData1: [],
        tableData2: [],
        //天数
        diffDate: 0,

        //是否高级查询
        isAdQuery: false,
        plantime: '',
        //老人
        olds: [],
        sss: [],
        //家属
        familys: [],
        //接收已选中的数据
        deleteValues: [],

        //延期时间
        puttime: '',
        options: [{
          value: 0,
          label: '已返回'
        }, {
          value: 1,
          label: '未返回'
        }],
        //高级查询
        oldnames: '',
        retype: '',
        //高级查询时间时间
        value1: [],
        //弹窗
        formVisible: false,
        formVisibles: false,
        formVisibless: false,
        formVisiblesss: true,
        tableData: [],
        register: {
          old: {},
          family: {},
          bed: {},
          user: {}
        },
        loginname: {},
        userNames: '',


      }
    },
    methods: {
      //查询超出时间未归的老人
      overtimes() {
        this.$axios.get("register/overtimes")
          .then(r => {
            if (r.data.length > 0) {
              this.tableData2 = r.data;
            } else {
              this.formVisiblesss = false;
            }

          })
      },

      //删除历史
      history() {
        this.$axios.get("register/history")
          .then(r => {
            this.tableData1 = r.data;
          })
      },

      //禁用复选框
      checkboxT(row) {
        if (row.orBack == 0) {
          return false;
        } else {
          return true;
        }
      },
      //准备返回登记
      readlity(row) {
        this.userNames = this.loginname.userName;
        let date1 = new Date();
        let date2 = new Date(row.orTime)
        date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        let diff = date1.getTime() - date2.getTime(); //目标时间减去当前时间
        this.diffDate = diff / (24 * 60 * 60 * 1000); //计算当前时间与结束时间之间相差天数
        this.formVisibless = true
        this.register = {...row}
        this.register.orPretime = new Date();
      },
      //登记返回
      reality() {
        this.register.orBackid = this.loginname.userId;
        this.register.orPretime = this.$Dateformat(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.register.orDaynum = this.diffDate;
        this.register.orBack = 1;
        this.$axios.post("register/update", this.register)
          .then(r => {
            if (r.data > 0) {
              this.selectrigisterAll();
              this.$message.success("登记返回成功！");
            } else {
              this.$message.warning("登记返回失败！");
            }
          })
      },

      //准备新增
      readyaddrigister() {
        this.formVisible = true
        this.isAdd = true;
        this.register = {
          old: {},
          family: {},
          bed: {},
          user: {},
          orTime: new Date()
        }
        this.userNames = this.loginname.userName;
        this.plantime = '';
      },
      //准备修改
      readyupdaterigister(rows) {
        console.log(rows)
        this.findfamily(rows.old);
        this.formVisible = true
        this.isAdd = false;
        this.userNames = this.register.user.userName
        this.register = {
          ...rows
        }
        this.plantime = this.register.orPlantime
      },

      //新增和修改
      addrigister() {
        let url = this.isAdd ? "register/insert" : "register/update";
        this.register.user.userId = this.loginname.userId;
        this.register.orTime = this.$Dateformat(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.register.orPlantime = this.$Dateformat(this.plantime, 'yyyy-MM-dd HH:mm:ss');
        console.log(this.register)
        this.$axios.post(url, this.register)
          .then(r => {
            if (r.data > 0) {
              this.selectrigisterAll()
              this.formVisible = false;
              this.$message.success(this.isAdd ? '新增成功！' : '修改成功！');
            } else {
              this.$message.warning(this.isAdd ? '新增失败！' : '修改失败！');
            }
          })
      },

      //删除
      deleterigister(register) {
        if (register.orBack == 0) {
          this.$message({
            type: 'info',
            message: '选中的老人未返回！不可删除',
          });
        } else {
          this.$axios.post("register/delete?orId=" + register.orId)
            .then(r => {
              if (r.data > 0) {
                this.selectrigisterAll();
                this.$message.success("删除成功！");
              } else {
                this.$message.success("删除失败！");
              }
            })
        }
      },
      //查询所有
      selectrigisterAll() {
        if (!this.isAdQuery) {
          this.$axios.get("register/all", {
              params: {
                pageNo: this.currentPage,
                pageSize: this.pageSize
              }
            })
            .then(r => {
              this.tableData = r.data.list;
              this.total = r.data.total;
              this.adCount = 0;
            })
        } else {
          //高级查询
          if (this.oldnames.length < 1 && this.retype == "" && this.value1.length < 1) {
            this.isAdQuery = false;
            this.currentPage = 1;
            this.selectrigisterAll();
            this.$message.warning("请至少输入一个条件！(已为您查询所有)");
            return;
          }

          this.adCount++;

          this.currentPage = (this.adCount > 1) ? this.currentPage : 1;
          let param = {
            pageNo: this.currentPage,
            pageSize: this.pageSize
          };

          if (this.oldnames.length) param.oldName = this.oldnames;
          if (this.retype != null && this.retype > 0) param.orBack = this.retype;
          if (this.value1.length > 1) {
            param.startDate = this.$Dateformat(this.value1[0], 'yyyy-MM-dd');
            param.endDate = this.$Dateformat(this.value1[1], 'yyyy-MM-dd');
          }
          console.log("高级查询参数：", param);
          this.$axios.get("register/adQuery", {
              params: param
            })
            .then(r => {
              this.tableData = r.data.list;
              this.total = r.data.total;
              console.log("响应数据：", r.data);
            })
        }
      },
      //清空
      clear() {
        this.oldnames = '',
          this.retype = '',
          this.value1 = '',
          this.selectrigisterAll()
        this.$message.warning("已清除，并为您查询所有");
      },

      //准备延期
      postpone(rows) {
        this.formVisibles = true
        this.register = {
          ...rows
        }
      },
      //延期
      postpones() {
        this.register.orPlantime = this.$Dateformat(this.puttime, 'yyyy-MM-dd HH:mm:ss');
        this.$axios.post("register/update", this.register)
          .then(r => {
            if (r.data > 0) {
              //查询所有
              this.selectrigisterAll()
              this.formVisibles = false;
              this.$message.success('延迟时间成功！');
            } else {
              this.$message.warning('延迟时间失败！');
            }
          })

      },
      //接收已选中的值
      deleteDatas(vals) {
        this.deleteValues = vals;
      },

      //批量删除
      batchDelete() {
        if (!this.deleteValues.length) {
          this.$message.warning("请选择要删除的数据！");
          return;
        }
        //定义一个空数组接收要删除的id
        let datas = [];
        //遍历数组 将要删除的id存进参数
        for (let i = 0; i < this.deleteValues.length; i++) {
          datas.push(this.deleteValues[i].orId);
        }
        //把数组用，分割为一个字符串参数传到后端
        this.$axios.post("register/logicDeletes", this.qs.stringify({
            paramStr: datas.join(",")
          }))
          .then(r => {
            if (r.data > 0) {
              this.selectrigisterAll()
              this.$message.success("批量删除成功！");
            } else {
              this.$message.warning("批量删除失败！");
            }
          })
      },

      //查询所有老人
      selectallold() {
        this.$axios.get("register/allold")
          .then(r => {
            this.olds = r.data;
            /*alert(r.data[0].address)
              console.log(r.data)
            console.log(r.data)*/
            r.data.forEach(s => {
              // alert(s.register.orBack)
              if (s.register == null || s.register.orBack == 1) {
                this.sss.push(s)
              }
            })
            //console.log(this.olds)
          })
      },




      //根据老人id来查询家属信息
      findfamily(currentValue) {
        this.$axios.get("register/findfamily?oldId=" + currentValue.oldId)
          .then(v => {
            this.familys = v.data;
          })
        this.$axios.get("register/findbed?oldId=" + currentValue.oldId)
          .then(v => {
            this.register.bed = v.data;
          })
      },
      //根据家属id来查询信息
      familyinfo(currentValue) {
        this.$axios.get("register/familyinfo?familyId=" + currentValue.familyId)
          .then(v => {
            this.register.family = v.data
          })
      },


      OutTime() {

        let date = new Date();

        this.tableData.forEach(v => {
          console.log(v)
        })

      },



      /*分页*/
      handleSizeChange(size) {
        this.pageSize = size;
        this.selectrigisterAll()
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.selectrigisterAll()
      },
    },

    created() {
      //查询超出时间未归的老人
      this.overtimes()
      //查询所有
      this.selectrigisterAll()
      //删除历史
      this.history()
      //查询所有老人
      this.selectallold()
      this.OutTime()
      //查询session对象中的值
      /* this.loginname = eval("("+window.sessionStorage.getItem("token")+")")*/
      this.loginname = JSON.parse(sessionStorage.getItem("token"))
      this.OutTime()
    }
  }
</script>

<style scoped>
  .an {
    margin-top: -30px;
    margin-bottom: 15px;
  }

  .advanced {
    width: 900px;
    margin-top: 15px;
  }

  .from {
    float: left;
    margin-left: 10px
  }
</style>
