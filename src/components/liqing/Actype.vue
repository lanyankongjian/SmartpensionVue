<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>老人管理</el-breadcrumb-item>
      <el-breadcrumb-item>事故类型管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <!--高级查询-->
      <el-row :gutter="20">


      </el-row>

      <el-row class="an">
        <el-col :span="24" style="text-align: right">
          <el-button @click="drawer = true" class="but" type="info" plain style="color: #2c3e50"><i
              class="el-icon-delete-solid"></i>删除历史</el-button>
          <el-button @click="readyaddtype" class="but" type="info" plain style="color: #2c3e50"><i
              class="el-icon-circle-plus-outline"></i>添加</el-button>

        </el-col>
      </el-row>
      <el-drawer title="删除历史" :visible.sync="drawer" :direction="direction" size="50%">
        <template>
          <el-table :data="tableData1" @selection-change="deleteDatas" style="width: 100%" border>
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column prop="atName" label="类型名称">
            </el-table-column>
            <el-table-column prop="atLevel" label="事故等级">
            </el-table-column>
            <el-table-column prop="nurse.nuName" label="联系人">
            </el-table-column>
            <el-table-column prop="nurse.nuPhone" label="联系人电话">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">

                <el-tooltip class="item" effect="dark" content="恢复" placement="top" style="margin-left: 10px">
                  <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red"
                    :title="'确定要恢复吗？'" @confirm="regaintype(scope.row)">
                    <el-button slot="reference" type="primary" icon="el-icon-refresh-right" circle></el-button>
                  </el-popconfirm>

                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-row>
          <el-button icon="el-icon-delete" @click="batchRegain" size="small" style="margin-top: 10px;float: left">
          </el-button>
        </el-row>

      </el-drawer>
      <!--表格-->
      <template>
        <el-table :data="tableData" @selection-change="deleteDatas" style="width: 100%" border>
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="atName" label="类型名称" width="180">
          </el-table-column>
          <el-table-column prop="atLevel" label="事故等级" width="180">
          </el-table-column>
          <el-table-column prop="nurse.nuName" label="联系人">
          </el-table-column>
          <el-table-column prop="nurse.nuPhone" label="联系人电话">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">

              <el-tooltip class="item" effect="dark" content="编辑" placement="top">

                <el-button type="warning" @click="readyupdatetype(scope.row)" icon="el-icon-edit" circle></el-button>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除" placement="top" style="margin-left: 10px">
                <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red"
                  :title="'确定要删除吗？'" @confirm="deletetype(scope.row)">
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
          {{isAdd?'新增意外类型':'修改意外类型'}}
        </span>
        <div style="color: darkgray;margin-left: 0px;margin-top: -10px">
          --------------------------------------------------------------------------------------------------------------------------------------------------------------
        </div>
        <el-form ref="actype" :rules="rules" :model="actype" label-width="120px">
          <el-form-item label="类型名称：" prop="atName" label-width="120px"
            style="margin-left:40px;margin-top:10px;width: 340px">
            <el-input v-model="actype.atName" style="margin-left: -20px"></el-input>
          </el-form-item>
          <el-form-item label="事故等级：" label-width="120px" prop="atLevel"
            style="margin-left: 435px;margin-top: -60px;width: 340px">
            <el-select v-model="actype.atLevel" value-key="value" clearable placeholder="请选择" style="margin-left:-0px;">
              <el-option v v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="联系人：" prop="nurse" label-width="120px" style="margin-left:40px;margin-top:10px">
            <el-select v-model="actype.nurse" value-key="nuId" @change="findphone" clearable placeholder="请选择"
              style="margin-left:-435px;">
              <el-option v-for="item in nurses" :key="item.nuId" :label="item.nuName" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话：" label-width="120px" style="margin-left: 435px;margin-top: -60px;width: 340px">
            <el-input v-model="actype.nurse.nuPhone" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型描述：" style="margin-top: 20px;margin-left: 30px">
            <el-input type="textarea" v-model="actype.atDescribed" style="width: 640px;margin-left: -25px"></el-input>
          </el-form-item>
          <el-form-item label="处理预案：" style="margin-top: 20px;margin-left: 30px">
            <el-input type="textarea" v-model="actype.atDeal" style="width: 640px;margin-left: -25px"></el-input>
          </el-form-item>



          <el-form-item style="margin-top: 10px;margin-left: -100px">
            <el-button type="primary" @click="submitForm('actype')">确定</el-button>
            <el-button @click="formVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>

  </div>

</template>

<script>
  export default {
    name: "Actype",
    data() {
      return {
        rules: {
          atName: [{
              required: true,
              message: '请输入意外类型',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          atLevel: [{
            required: true,
            message: '请选择事故等级',
            trigger: 'change'
          }],
          nurse: [{
            required: true,
            message: '请选择联系人',
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
        //接收已选中的数据
        deleteValues: [],
        value1: [],
        nurses: [],
        options: [{
          value: '一般',
          label: '一般'
        }, {
          value: '较大',
          label: '较大'
        }, {
          value: '重大',
          label: '重大'
        }, {
          value: '特别重大',
          label: '特别重大'
        }],
        //弹窗
        formVisible: false,
        tableData: [],
        actype: {
          nurse: {}
        }

      }
    },
    methods: {

      //恢复类型
      regaintype(actype) {
        actype.atState = 0;
        this.$axios.post("actype/update", actype)
          .then(r => {
            if (r.data > 0) {
              this.selectAlltype()
              //删除历史
              this.history()
              this.formVisible = false;
              this.$message.success('恢复成功！');
            } else {
              this.$message.warning('恢复失败！');
            }
          })
      },
      //删除历史
      history() {
        this.$axios.get("actype/history")
          .then(r => {
            this.tableData1 = r.data;
          })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addtype();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
          datas.push(this.deleteValues[i].atId);
        }
        //把数组用，分割为一个字符串参数传到后端
        this.$axios.post("actype/logicDeletes", this.qs.stringify({
            paramStr: datas.join(",")
          }))
          .then(r => {
            if (r.data > 0) {
              this.selectAlltype()
              //删除历史
              this.history()
              this.$message.success("批量删除成功！");
            } else {
              this.$message.warning("批量删除失败！");
            }
          })
      },
      //批量恢复
      batchRegain() {
        if (!this.deleteValues.length) {
          this.$message.warning("请选择要恢复的数据！");
          return;
        }
        let datas = [];
        for (let i = 0; i < this.deleteValues.length; i++) {
          datas.push(this.deleteValues[i].atId);
        }
        this.$axios.post("actype/logicRegain", this.qs.stringify({
            paramStr: datas.join(",")
          }))
          .then(r => {
            if (r.data > 0) {
              this.selectAlltype()
              this.history()
              this.$message.success("批量恢复成功！");
            } else {
              this.$message.warning("批量恢复失败！");
            }
          })
      },
      //删除
      deletetype(actype) {
        actype.atState = 1;
        this.$axios.post("actype/update", actype)
          .then(r => {
            if (r.data > 0) {
              this.selectAlltype()
              //删除历史
              this.history()
              this.formVisible = false;
              this.$message.success('删除成功！');
            } else {
              this.$message.warning('删除失败！');
            }
          })
      },
      //准备新增
      readyaddtype() {
        this.formVisible = true
        this.isAdd = true;
        this.actype = {
          nurse: {}
        }
      },
      //准备修改
      readyupdatetype(rows) {
        this.findphone(rows.nurse);
        this.formVisible = true
        this.isAdd = false;
        this.actype = {
          ...rows
        }
      },
      //新增和修改
      addtype() {
        let url = this.isAdd ? "actype/insert" : "actype/update";
        console.log(this.actype)
        this.$axios.post(url, this.actype)
          .then(r => {
            if (r.data > 0) {
              this.selectAlltype()
              this.formVisible = false;
              this.$message.success(this.isAdd ? '新增成功！' : '修改成功！');
            } else {
              if (this.isAdd) {
                if (r.data == 0)
                  this.$message.warning('新增失败！该类型已存在');
                else if (r.data < 0) {
                  this.selectAlltype();
                  this.formVisible = false;
                  this.$message.warning('新增失败！该类型已被删除，已帮您恢复该类型');
                }

                return;
              }
              this.$message.warning(this.isAdd ? '新增失败！' : '修改失败！');
            }
          })
      },
      //查询所有
      selectAlltype() {
        this.$axios.get("actype/all", {
            params: {
              pageNo: this.currentPage,
              pageSize: this.pageSize
            }
          })
          .then(r => {
            this.tableData = r.data.list;
            this.total = r.data.total;
          })
      },
      //查询所有联系人
      selectAllnurse() {
        this.$axios.get("actype/allnurse")
          .then(r => {
            this.nurses = r.data
          })
      },
      //根据护工id查询电话
      findphone(currentValue) {
        this.$axios.get("actype/findphone?nuId=" + currentValue.nuId)
          .then(r => {
            this.actype.nurses = r.data
          })
      },
      /*分页*/
      handleSizeChange(size) {
        this.pageSize = size;
        this.selectAlltype()
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.selectAlltype()
      },
    },
    created() {
      //查询所有
      this.selectAlltype();
      //删除历史
      this.history()
      //查询所有联系人
      this.selectAllnurse()
    }
  }
</script>

<style scoped>
  .an {
    margin-top: 0px;
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
