<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>老人管理</el-breadcrumb-item>
      <el-breadcrumb-item>探视来访</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <!--高级查询-->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form :inline="true" label-position="left" ref="visit" :model="visit" label-width="80px" class="advanced">
            <el-form-item label="来访人:" class="from">
              <el-input v-model="cnames" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="老人姓名：" label-width="88px" class="from">
              <el-input v-model="oldnames" style="width: 150px"></el-input>
            </el-form-item>
            <template>
              <div class="block" style="float: left">
                <span class="demonstration" style="margin-left: 10px">探视日期：</span>
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
          <el-button @click="isAdQuery=true,selectAllvisit()">查询</el-button>
          <el-button @click="clear()">清空</el-button>
          <el-button @click="drawer = true" class="but" type="info" plain style="color: #2c3e50"><i
              class="el-icon-delete-solid"></i>删除历史</el-button>
          <el-button @click="readinsert" class="but" type="info" plain style="color: #2c3e50"><i
              class="el-icon-circle-plus-outline"></i>添加</el-button>

        </el-col>
      </el-row>
      <el-drawer title="删除历史" :visible.sync="drawer" :direction="direction" size="50%">
        <template>
          <el-table :data="tableData1" style="width: 100%" border max-height="250">
            <el-table-column prop="vId" label="编号id">
            </el-table-column>
            <el-table-column prop="vCname" label="探访人姓名">
            </el-table-column>
            <el-table-column prop="old.oldName" label="老人姓名">
            </el-table-column>
            <el-table-column prop="vCphone" label="探访人电话">
            </el-table-column>
            <el-table-column prop="vRelation" label="与老人关系">
            </el-table-column>
            <el-table-column prop="vCause" label="来访缘由">
            </el-table-column>
            <el-table-column prop="vCtime" label="来访时间">
            </el-table-column>
            <el-table-column prop="vLeave" label="是否离开">
              <template slot-scope="scope">
                <p v-if="scope.row.vLeave=='0'">
                  未离开
                </p>
                <p v-if="scope.row.vLeave=='1'">
                  已离开
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="vGtime" label="离开时间">
            </el-table-column>
            <el-table-column prop="user.userName" label="登记人">
            </el-table-column>
            <el-table-column prop="vRemark" label="备注">
            </el-table-column>
          </el-table>
        </template>
      </el-drawer>
      <!--表格-->
      <template>
        <el-table :data="tableData" @selection-change="deleteDatas" style="width: 100%" border>
          <el-table-column type="selection" :selectable="checkboxT">
          </el-table-column>
          <el-table-column prop="vCname" show-overflow-tooltip label="探访人姓名" fixed width="80">
          </el-table-column>
          <el-table-column prop="old.oldName" show-overflow-tooltip label="老人姓名" width="80">
          </el-table-column>
          <el-table-column prop="vCphone" show-overflow-tooltip label="探访人电话" width="96">
          </el-table-column>
          <el-table-column prop="vRelation" show-overflow-tooltip label="与老人关系" width="60">
          </el-table-column>
          <el-table-column prop="vCause" show-overflow-tooltip label="来访缘由" width="120">
          </el-table-column>
          <el-table-column prop="vCtime" show-overflow-tooltip label="来访时间" width="100">
          </el-table-column>
          <el-table-column prop="vLeave" show-overflow-tooltip label="是否离开" width="80">
            <template slot-scope="scope">
              <p v-if="scope.row.vLeave=='0'">
                未离开
              </p>
              <p v-if="scope.row.vLeave=='1'">
                已离开
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="vGtime" show-overflow-tooltip label="离开时间" width="100">
          </el-table-column>
          <el-table-column prop="user.userName" show-overflow-tooltip label="登记人" width="60">
          </el-table-column>
          <el-table-column prop="vRemark" show-overflow-tooltip label="备注" width="100">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">

              <span v-if="scope.row.vLeave==0">
                <el-tooltip class="item" effect="dark" content="登记离开" placement="top" style="margin-right:5px">
                  <el-button @click="leave(scope.row)" type="primary" icon="el-icon-s-help" circle>
                  </el-button>
                </el-tooltip>
              </span>
              <el-tooltip class="item" effect="dark" content="编辑" placement="top" style="margin-right:5px">

                <el-button type="warning" @click="readupdate(scope.row)" icon="el-icon-edit" circle></el-button>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除" placement="top" style="margin-left: 5px">
                <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red"
                  :title="'确定要删除吗？'" @confirm="deletevisit(scope.row)">
                  <el-button slot="reference" type="danger" icon="el-icon-delete" circle></el-button>
                </el-popconfirm>

              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-row>
        <el-button icon="el-icon-delete" @click="batchDelete" size="small" style="margin-top: 10px;float: left">
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
          {{isAdd?'新增探视来访':'修改探视来访'}}
        </span>
        <div style="color: darkgray;margin-left: 0px;margin-top: -10px">
          --------------------------------------------------------------------------------------------------------------------------------------------------------------
        </div>
        <el-form ref="visit" :model="visit" :rules="rules" label-width="120px">
          <el-form-item label="探视人姓名：" prop="vCname" label-width="130px" style="margin-left: 35px">
            <el-input v-model="visit.vCname" style="width: 215px;margin-left:-445px;"></el-input>
          </el-form-item>
          <el-form-item label="老人姓名：" prop="old" label-width="120px"
            style="margin-left: 405px;margin-top: -60px;width: 340px">
            <el-select v-model="visit.old" value-key="oldId" clearable placeholder="请选择">
              <el-option v-for="item in olds" :key="item.oldId" :label="item.oldName" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话：" prop="vCphone" label-width="120px" style="margin-left: 35px">
            <el-input v-model="visit.vCphone" style="width: 215px;margin-left:-445px;"></el-input>
          </el-form-item>
          <el-form-item label="与老人关系：" prop="vRelation" label-width="120px"
            style="margin-left: 405px;margin-top: -60px;width: 340px">
            <el-select v-model="visit.vRelation" value-key="value" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>



          <template>
            <!-- style="width: 300px;margin-left: 50px;margin-top:-50px;"-->
            <div class="block" style="margin-left:70px;margin-top: 0px;width: 300px">
              <span class="demonstration">外出时间：</span>
              <el-date-picker v-model="visit.vCtime" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </template>
          <el-form-item label="外出登记人：" label-width="120px" style="margin-left: 405px;margin-top: -40px;">
            <el-input v-model="userNames" style="width: 230px;margin-left: -60px;" disabled></el-input>
          </el-form-item>

          <el-form-item label="外出原因：" style="margin-top: 20px;margin-left: 30px">
            <el-input type="textarea" v-model="visit.vCause" style="width: 640px;margin-left: -25px"></el-input>
          </el-form-item>
          <el-form-item label="备注：" style="margin-top: 20px;margin-left: 30px">
            <el-input type="textarea" v-model="visit.vRemark" style="width: 640px;margin-left: -25px"></el-input>
          </el-form-item>

          <el-form-item style="margin-top: 10px;margin-left: -100px">
            <el-button type="primary" @click="addvisit">确定</el-button>
            <el-button @click="formVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>

  </div>

</template>

<script>
  export default {
    name: "Visit",
    data() {
      return {
        rules: {
          vCname: [{
            required: true,
            message: '请输入探视人姓名',
            trigger: 'blur'
          }, ],
          old: [{
            required: true,
            message: '请选择老人姓名',
            trigger: 'change'
          }],
          vCphone: [{
              required: true,
              message: '请输入探视人电话',
              trigger: 'blur'
            },
            {
              validator: function(rule, value, callback) {
                if (/^1[34578]\d{9}$/.test(value) == false) {
                  callback(new Error("手机号格式错误"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ],
          vRelation: [{
            required: true,
            message: '请选择与老人的关系',
            trigger: 'change'
          }]
        },

        total: 0, //总记录数
        pageSize: 5, //页大小
        currentPage: 1, //当前页码
        isAdd: true, //是否新增
        drawer: false,
        direction: 'ttb',
        tableData1: [],
        userNames: '',
        //高级查询
        cnames: '',
        oldnames: '',
        value1: [],
        timess: new Date(),
        //老人 下拉框
        olds: [],
        //接收已选中的数据
        deleteValues: [],
        options: [{
          value: '本人',
          label: '本人'
        }, {
          value: '父女',
          label: '父女'
        }, {
          value: '父子',
          label: '父子'
        }, {
          value: '母女',
          label: '母女'
        }, {
          value: '母子',
          label: '母子'
        }, {
          value: '其他',
          label: '其他'
        }],
        //弹窗
        formVisible: false,
        tableData: [],
        visit: {
          old: {},
          user: {}
        },
        loginname: {},

      }
    },
    methods: {
      //删除历史
      history() {
        this.$axios.get("visit/history")
          .then(r => {
            this.tableData1 = r.data;
          })
      },
      //禁用复选框
      checkboxT(row) {
        if (row.vLeave == 0) {
          return false;
        } else {
          return true;
        }
      },
      /*  submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.addvisit
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },*/
      //登记离开
      leave(row) {
        if (row.vLeave == 1) {
          console.log(row)
          this.$message({
            type: 'info',
            message: '探视人已离开！不可重复登记',
          });
        } else {
          row.vLeave = 1;
          row.vGtime = this.$Dateformat(this.timess, 'yyyy-MM-dd HH:mm:ss');
          this.$axios.post("visit/update", row)
            .then(r => {
              if (r.data > 0) {
                this.selectAllvisit()
                this.formVisible = false;
                this.$message.success('已登记离开！');
              } else {
                this.$message.warning('登记离开失败！');
              }
            })
        }
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
          datas.push(this.deleteValues[i].vId);
        }
        //把数组用，分割为一个字符串参数传到后端
        this.$axios.post("visit/logicDeletes", this.qs.stringify({
            paramStr: datas.join(",")
          }))
          .then(r => {
            if (r.data > 0) {
              this.selectAllvisit()
              this.$message.success("批量删除成功！");
            } else {
              this.$message.warning("批量删除失败！");
            }
          })
      },
      //删除
      deletevisit(row) {
        if (row.vLeave == 0) {
          this.$message({
            type: 'info',
            message: '探视人未离开！不可删除',
          });
        } else {
          row.vState = 1;
          this.$axios.post("visit/update", row)
            .then(r => {
              if (r.data > 0) {
                this.selectAllvisit()
                this.formVisible = false;
                this.$message.success('删除成功！');
              } else {
                this.$message.warning('删除失败！');
              }
            })
        }
      },
      //准备新增
      readinsert() {
        this.formVisible = true
        this.isAdd = true;
        this.userNames = this.loginname.userName
        this.visit = {
          old: {},
          user: {},
          vCtime: new Date()
        }
      },
      //准备修改
      readupdate(rows) {
        this.formVisible = true
        this.isAdd = false;
        this.visit = {
          ...rows
        }
        this.userNames = this.visit.user.userName
      },
      //新增和修改
      addvisit() {
        let url = this.isAdd ? "visit/insert" : "visit/update";
        this.visit.user.userId = this.loginname.userId;
        this.visit.vCtime = this.$Dateformat(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.$axios.post(url, this.visit)
          .then(r => {
            if (r.data > 0) {
              this.selectAllvisit()
              this.formVisible = false;
              this.$message.success(this.isAdd ? '新增成功！' : '修改成功！');
            } else {
              this.$message.warning(this.isAdd ? '新增失败！' : '修改失败！');
            }
          })
      },
      //查询所有
      selectAllvisit() {
        if (!this.isAdQuery) {
          this.$axios.get("visit/all", {
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
          if (this.cnames.length < 1 && this.oldnames.length < 1 && this.value1.length < 1) {
            this.isAdQuery = false;
            this.currentPage = 1;
            this.selectAllvisit();
            this.$message.warning("请至少输入一个条件！(已为您查询所有)");
            return;
          }

          this.adCount++;

          this.currentPage = (this.adCount > 1) ? this.currentPage : 1;
          let param = {
            pageNo: this.currentPage,
            pageSize: this.pageSize
          };

          if (this.cnames.length) param.vCname = this.cnames;
          if (this.oldnames.length) param.oldName = this.oldnames;
          if (this.value1.length > 1) {
            param.startDate = this.$Dateformat(this.value1[0], 'yyyy-MM-dd');
            param.endDate = this.$Dateformat(this.value1[1], 'yyyy-MM-dd');
          }
          console.log("高级查询参数：", param);
          this.$axios.get("visit/adQuery", {
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
        this.cnames = '';
        this.oldnames = '';
        this.value1 = '';
        this.selectAllvisit();
        this.$message.warning("已清除，并为您查询所有");
      },
      //查询所有老人
      selectAllold() {
        this.$axios("visit/allold")
          .then(r => {
            this.olds = r.data
          })
      },
      /*分页*/
      handleSizeChange(size) {
        this.pageSize = size;
        this.selectAllvisit()
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.selectAllvisit()
      },
    },
    created() {
      //查询所有
      this.selectAllvisit()
      //删除历史
      this.history()
      //查询所有老人
      this.selectAllold()
      //查询session对象中的值
      this.loginname = JSON.parse(sessionStorage.getItem("token"))
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
