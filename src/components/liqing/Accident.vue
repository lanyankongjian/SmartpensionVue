<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>老人管理</el-breadcrumb-item>
      <el-breadcrumb-item>事故记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <!--高级查询-->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form :inline="true" label-position="left" ref="record" :model="record" label-width="80px"
            class="advanced">
            <el-form-item label="老人姓名:" class="from">
              <el-input v-model="oldnames" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="床位号：" label-width="88px" class="from">
              <el-input v-model="beds" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="当班护工:" class="from">
              <el-input v-model="nunames" style="width: 150px"></el-input>
            </el-form-item>
          </el-form>
        </el-col>

      </el-row>

      <el-row class="an">
        <el-col :span="24" style="text-align: right">
          <el-button @click="isAdQuery=true,selectAllrecord()">查询</el-button>
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
            <el-table-column prop="arId" label="编号">
            </el-table-column>
            <el-table-column prop="old.oldName" label="老人姓名">
            </el-table-column>
            <el-table-column prop="bed.bed" label="床位号">
            </el-table-column>
            <el-table-column prop="nurse.nuName" label="值班护工">
            </el-table-column>
            <el-table-column prop="arTime" show-overflow-tooltip width="80" label="发生时间">
            </el-table-column>
            <el-table-column prop="type.atName" label="意外类型">
            </el-table-column>
            <el-table-column prop="user.userName" label="负责人">
            </el-table-column>
            <el-table-column prop="arCause" label="意外原因">
            </el-table-column>
            <el-table-column prop="arDescribe" label="意外描述">
            </el-table-column>
          </el-table>
        </template>
      </el-drawer>
      <!--表格-->
      <template>
        <el-table :data="tableData" @selection-change="deleteDatas" style="width: 100%" border max-height="250">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="old.oldName" label="老人姓名" fixed width="100px">
          </el-table-column>
          <el-table-column prop="bed.bed" label="床位号" width="100px">
          </el-table-column>
          <el-table-column prop="nurse.nuName" label="值班护工" width="100px">
          </el-table-column>
          <el-table-column prop="arTime" show-overflow-tooltip label="发生时间" width="160px">
          </el-table-column>
          <el-table-column prop="type.atName" label="意外类型" width="100px">
          </el-table-column>
          <el-table-column prop="user.userName" label="负责人" width="100px">
          </el-table-column>
          <el-table-column prop="arCause" show-overflow-tooltip label="意外原因" width="80px">
          </el-table-column>
          <el-table-column prop="arDescribe" show-overflow-tooltip label="意外描述" width="180px">
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">

              <el-tooltip class="item" effect="dark" content="编辑" placement="top">

                <el-button type="warning" @click="readupdate(scope.row)" icon="el-icon-edit" circle></el-button>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除" placement="top" style="margin-left:10px">
                <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red"
                  :title="'确定要删除吗？'" @confirm="deleterecord(scope.row)">
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
          {{isAdd?'新增意外记录':'修改意外记录'}}
        </span>
        <div style="color: darkgray;margin-left: 0px;margin-top: -10px">
          --------------------------------------------------------------------------------------------------------------------------------------------------------------
        </div>
        <el-form ref="record" :rules="rules" :model="record" label-width="120px">

          <el-form-item label="老人姓名：" prop="old" label-width="120px" style="margin-left:40px;margin-top:10px">
            <el-select v-model="record.old" value-key="oldId" @change="findbed" clearable placeholder="请选择"
              style="margin-left:-435px;">
              <el-option v-for="item in olds" :key="item.oldId" :label="item.oldName" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="床位号：" label-width="120px" style="margin-left: 395px;margin-top: -60px;width: 340px">
            <el-input v-model="record.bed.bed" disabled></el-input>
          </el-form-item>
          <template>
            <!-- style="width: 300px;margin-left: 50px;margin-top:-50px;"-->
            <div class="block" style="margin-left:70px;margin-top: 0px;width: 300px">
              <span class="demonstration">发生时间：</span>
              <el-date-picker v-model="record.arTime" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </template>
          <el-form-item label="值班护工：" prop="nurse" label-width="120px"
            style="margin-left: 395px;margin-top: -45px;width: 340px">
            <el-select v-model="record.nurse" value-key="nuId" clearable placeholder="请选择">
              <el-option v-for="item in nursess" :key="item.nuId" :label="item.nuName" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事故类型：" prop="type" label-width="120px" style="margin-left: 35px">
            <el-select v-model="record.type" value-key="atId" @change="findlevel" clearable placeholder="请选择"
              style="margin-left:-395px;">
              <el-option v-for="item in typess" :key="item.atId" :label="item.atName" :value="item">
              </el-option>
            </el-select>
            <router-link to="/actype">
              <el-button size="mini" icon="el-icon-edit"></el-button>
            </router-link>
          </el-form-item>
          <el-form-item label="事故等级：" label-width="120px" style="margin-left: 395px;margin-top: -60px;width: 340px">
            <el-input v-model="record.type.atLevel" disabled></el-input>
          </el-form-item>
          <el-form-item label="负责人：" label-width="130px" style="margin-left: 25px">
            <el-input v-model="userNames" style="width: 250px;margin-left:-405px;" disabled></el-input>
          </el-form-item>

          <el-form-item label="事故原因：" style="margin-top: 20px;margin-left: 30px">
            <el-input type="textarea" v-model="record.arCause" style="width: 640px;margin-left: -25px"></el-input>
          </el-form-item>
          <el-form-item label="事故描述：" style="margin-top: 20px;margin-left: 30px">
            <el-input type="textarea" v-model="record.arDescribe" style="width: 640px;margin-left: -25px"></el-input>
          </el-form-item>
          <!--  <el-form-item label="事故照片：" style="margin-top: 20px;margin-left: 30px" >
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              style="margin-left: -150px"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary" style="margin-left: -150px">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
-->

          <el-form-item style="margin-top: 10px;margin-left: -100px">
            <el-button type="primary" @click="submitForm('record')">确定</el-button>
            <el-button @click="formVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>

  </div>

</template>

<script>
  export default {
    name: "Accident",
    data() {
      return {
        rules: {
          old: [{
            required: true,
            message: '请选择老人姓名',
            trigger: 'change'
          }],
          nurse: [{
            required: true,
            message: '请选择值班护工',
            trigger: 'change'
          }],
          type: [{
            required: true,
            message: '请选择意外类型',
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
        //接收已选中的数据
        deleteValues: [],
        userNames: '',
        //高级查询
        //老人姓名
        oldnames: '',
        //床位号
        beds: '',
        //当班护工
        nunames: '',

        //老人
        olds: [],
        //事故类型
        typess: [],
        //护工
        nursess: [],
        //弹窗
        formVisible: false,

        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],

        tableData: [],
        record: {
          user: {},
          nurse: {},
          type: {},
          bed: {},
          old: {}
        },
        loginname: {},

      }
    },
    methods: {
      //删除历史
      history() {
        this.$axios.get("record/history")
          .then(r => {
            this.tableData1 = r.data;
            console.log(r.data)
          })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addcord()
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
          datas.push(this.deleteValues[i].arId);
        }
        //把数组用，分割为一个字符串参数传到后端
        this.$axios.post("record/logicDeletes", this.qs.stringify({
            paramStr: datas.join(",")
          }))
          .then(r => {
            if (r.data > 0) {
              this.selectAllrecord()
              //删除历史
              this.history()
              this.$message.success("批量删除成功！");
            } else {
              this.$message.warning("批量删除失败！");
            }
          })
      },
      //删除、
      deleterecord(row) {
        row.arState = 1;
        this.$axios.post("record/update", row)
          .then(r => {
            if (r.data > 0) {
              this.selectAllrecord()
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
      readinsert() {
        this.formVisible = true
        this.isAdd = true;
        this.userNames = this.loginname.userName;
        this.record = {
          user: {},
          nurse: {},
          type: {},
          bed: {},
          old: {},
          arTime: new Date()
        }
      },
      //准备修改
      readupdate(rows) {
        this.findbed(rows.old);
        this.formVisible = true
        this.isAdd = false;
        this.record = {
          ...rows
        }
        this.userNames = this.record.user.userName
      },
      //新增和修改
      addcord() {
        let url = this.isAdd ? "record/insert" : "record/update";
        this.record.user.userId = this.loginname.userId;
        this.record.arTime = this.$Dateformat(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.$axios.post(url, this.record)
          .then(r => {
            if (r.data > 0) {
              this.selectAllrecord()
              this.formVisible = false;
              this.$message.success(this.isAdd ? '新增成功！' : '修改成功！');
            } else {
              this.$message.warning(this.isAdd ? '新增失败！' : '修改失败！');
            }
          })
      },
      //查询所有
      selectAllrecord() {
        if (!this.isAdQuery) {
          this.$axios("record/all", {
              params: {
                pageNo: this.currentPage,
                pageSize: this.pageSize
              }
            })
            .then(r => {
              this.tableData = r.data.list
              this.total = r.data.total;
              this.adCount = 0;
            })
        } else {
          //高级查询
          if (this.oldnames.length < 1 && this.beds.length < 1 && this.nunames.length < 1) {
            this.isAdQuery = false;
            this.currentPage = 1;
            this.selectAllrecord();
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
          if (this.beds.length) param.bed = this.beds;
          if (this.nunames.length) param.nuName = this.nunames;
          console.log("高级查询参数：", param);
          this.$axios.get("record/adQuery", {
              params: param
            })
            .then(r => {
              this.tableData = r.data.list;
              this.total = r.data.total;
              console.log("响应数据：", r.data);
            })
        }


      },
      clear() {
        this.oldnames = '';
        this.beds = '';
        this.nunames = '';
        //查询所有
        this.selectAllrecord()
        this.$message.warning("已清除，并为您查询所有");
      },
      //查询所有老人
      selectAllold() {
        this.$axios("record/allold")
          .then(r => {
            this.olds = r.data
          })
      },
      //根据老人id获取床位号
      findbed(currentValue) {
        this.$axios("record/findbed?oldId=" + currentValue.oldId)
          .then(r => {
            this.record.bed = r.data
          })
      },
      //查询所有护工
      selectnurse() {
        this.$axios("record/allnurse")
          .then(r => {
            this.nursess = r.data
          })
      },
      //查询所有意外类型
      selectAlltype() {
        this.$axios("record/alltype")
          .then(r => {
            this.typess = r.data
          })
      },
      //根据类型id查询事故等级
      findlevel(currentValue) {
        this.$axios("record/findlevel?atId=" + currentValue.atId)
          .then(r => {
            this.record.type = r.data
          })
      },
      /*分页*/
      handleSizeChange(size) {
        this.pageSize = size;
        this.selectAllrecord()
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.selectAllrecord()
      },
    },
    created() {
      //查询所有
      this.selectAllrecord()
      //删除历史
      this.history()
      //查询所有老人
      this.selectAllold()
      //查询所有护工
      this.selectnurse()
      //查询所有意外类型
      this.selectAlltype()
      //查询session对象中的值
      /* this.loginname = eval("("+window.sessionStorage.getItem("token")+")")*/
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
