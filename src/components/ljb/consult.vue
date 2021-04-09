<template>
  <div>
    <el-container>
      <el-main class="consult_elmain">

        <!-- 咨询登记信息操作 -->
        <el-row style="text-align: left;margin-bottom: 10px;">
          <el-button type="primary" plain @click="drawer = true,addButton =true" size="small" round>新增</el-button>
          <el-button type="primary" plain @click="removeAsks" size="small" round>删除</el-button>
          <el-button type="primary" plain size="small" round>转入住</el-button>
        </el-row>

        <!-- 多条件模糊查询 -->
        <el-row style="text-align: left;">
          咨询人姓名：<el-input v-model="taskname" style="width: 100px;" clearable size="mini"></el-input>
          老人姓名：<el-input style="width: 100px;" v-model="toldname" clearable size="mini"></el-input>
          状态：
          <el-select size="mini" style="width: 100px;" v-model="temp_status">
            <el-option value="全部"></el-option>
            <el-option value="入住"></el-option>
            <el-option value="咨询"></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-search" @click.native="vague_select" plain size="mini">查询</el-button>

        </el-row>

        <!-- 表格信息 -->
        <el-row>
          <el-table :data="tableData" ref="asktable" tooltip-effect="dark" style="width: 100%" border>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="recAsks[0].askName" label="咨询人姓名" width="90">
            </el-table-column>
            <el-table-column prop="recAsks[0].askDate" label="咨询日期" width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="recAsks[0].phone" label="联系电话" width="98" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="oldaskName" label="老人姓名" width="90" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="identtitycard" label="老人身份证" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="recAsks[0].askWay" label="咨询方式" width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="70" show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="status= 1">咨询</div>
                <div v-else="status= 2">入住</div>
              </template>
            </el-table-column>
            <el-table-column prop="recAsks[0].receiver" label="接待人" width="70" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="recAsks[0].askCentent" label="咨询内容" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
              <template slot-scope="sco">
                <el-button @click="upAskAndOldAsk(sco.row)" size="mini">编辑</el-button>
                <el-button size="mini" type="danger" @click="delAsk(sco.row.askId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-row>

        <!-- 分页 -->
        <el-row style="text-align:right">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-row>
      </el-main>
    </el-container>

    <el-drawer title="我是标题" :visible.sync="drawer"  :with-header="false" size="50%">
      <div style="text-align: left; margin-top: 50px; margin-left: 20px;">
        <h3>老人信息</h3>
        <hr>
        <el-form style="margin-top: 20px;">
          <el-form-item>
            <el-col :span="12">
              <span class="zdcolor">老人姓名：</span>
              <el-input v-model="askOld.oldaskName" style="width: 200px;"></el-input>
            </el-col>
            <el-col :span="12">
              <span>身份证号：</span>
              <el-input @blur="checkID" v-model="askOld.identtitycard" style="width: 200px;"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="12">
              <span>性别：</span>
              <el-select style="width: 100px;" v-model="askOld.gender">
                <el-option value="男"></el-option>
                <el-option value="女"></el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              <span>年龄：</span>
              <el-input v-model="askOld.age" style="width: 100px;"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <span>自理情况：</span>
            <el-select style="width: 100px;" v-model="askOld.selfcare">
              <el-option value="自理"></el-option>
              <el-option value="介助"></el-option>
              <el-option value="介护"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>家庭住址：</span>
            <el-input v-model="askOld.address" style="width: 500px;"></el-input>
          </el-form-item>
        </el-form>
      </div>



      <div style="text-align: left; margin-top: 50px; margin-left: 20px;">
        <h3>咨询人信息</h3>
        <hr>
        <el-form style="margin-top: 20px;">
          <el-form-item>
            <el-col :span="12">
              <span class="zdcolor">咨询人姓名：</span>
              <el-input v-model="ask.askName" style="width: 180px;"></el-input>
            </el-col>
            <el-col :span="12">
              <span>与老人关系：</span>
              <el-select style="width: 100px;" v-model="ask.relationship">
                <el-option value="父子"></el-option>
                <el-option value="父女"></el-option>
                <el-option value="母子"></el-option>
                <el-option value="母女"></el-option>
                <el-option value="其他"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="12">
              <span>咨询日期：</span>
              <el-date-picker v-model="ask.askDate" type="date" style="width: 190px;" placeholder="选择咨询日期">
              </el-date-picker>
            </el-col>
            <el-col :span="12">
              <span class="zdcolor">咨询方式：</span>
              <el-select style="width: 190px;" v-model="ask.askWay">
                <el-option value="电话"></el-option>
                <el-option value="上门"></el-option>
                <el-option value="其他"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="12">
              <span>咨询类型：</span>
              <el-select style="width: 190px;" v-model="ask.askType">
                <el-option value="入院咨询"></el-option>
                <el-option value="其他"></el-option>
                <el-option value="费用咨询"></el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              <span class="zdcolor">联系电话：</span>
              <el-input v-model="ask.phone" @blur="checkPhone()" style="width: 200px;"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <span>接待人：</span>
            <el-input v-model="ask.receiver" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item>
            <span>咨询内容：</span>
            <el-input v-model="ask.askCentent" style="width: 500px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="addButton" type="primary" @click="onSubmit">立即创建</el-button>
            <el-button v-else type="primary" @click="confirm_updata">确认修改</el-button>
            <el-button @click="onClose">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>


  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        addButton: true,
        drawer: false,
        input: '',
        taskname: '',
        toldname: '',
        status: 0,
        tableData: [],
        temp_status: '全部',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        askOld: {
          oldaskName: '',
          identtitycard: '',
          age: null,
          gender: '',
          selfcare: '',
          address: '',
          status: 1,
          recAsks: []
        },
        ask: {
          askName: '',
          relationship: '',
          askDate: '',
          phone: '',
          askWay: '',
          askType: '',
          receiver: '',
          askCentent: '',
        }


      }
    },
    created() {
      this.getAllAsk();
    },
    methods: {

      // 获取所有咨询人和老人信息-------------------------------------------
      getAllAsk() {
        //因为this.tableData是数组，所以每次获取前都要清空
        this.tableData = [];

        axios.get('/oldask/getAskAndOld?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize).then((res) => {
          for (var t of res.data.data) {
            this.tableData.push(t);
          }
          this.total = res.data.total;
        }).catch((err) => {
          alert(err.message);
        })

      },

      //获取提交咨询人和老人信息----------------------------------------------
      onSubmit() {
        if (this.askOld.oldaskName == '' || this.ask.askName == '' || this.ask.askWay == '' || this.ask.phone == '') {
          alert("红色字段为必填选项")
        } else {
          this.askOld.recAsks.push(this.ask);
          axios.post('/oldask/addAskAndAskOld', this.askOld).then((res) => {
            alert(res.message);
          }).catch((err) => {
            alert(err.message)
          });
        }
      },

      clearData() {
        Object.keys(this.askOld).forEach(key => (this.askOld[key] = ''));
        this.askOld.recAsks = [];
        Object.keys(this.ask).forEach(key => (this.ask[key] = ''));
        this.getAllAsk();
      },

      // 检查老人的身份证号是否正确------------------------------------------------------
      checkID() {
        const idNumberReg =
          /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/

        this.askOld.identtitycard = this.askOld.identtitycard.trim();
        if (!idNumberReg.test(this.askOld.identtitycard)) {
          this.askOld.identtitycard = '';
          this.askOld.age = null;
          this.askOld.gender = '';
          alert('您的身份证号码格式错误!');
        } else {
          this.getGender();
          this.getAge();
        }
      },

      // 检查手机号是否正确------------------------------------------------------
      checkPhone() {

        const idNumberReg = /^[1][3,4,5,7,8][0-9]{9}$/

        this.ask.phone = this.ask.phone.trim();
        if (!idNumberReg.test(this.ask.phone)) {
          alert('您的手机号格式错误!');
        }

      },

      //根据身份证号获取性别--------------------------------------------
      getGender() {
        let str = this.askOld.identtitycard.split("");
        let sgender = str[str.length - 2];
        if (sgender % 2 == 1) {
          this.askOld.gender = "男";
        }
      },

      //根据身份证号获取年龄----------------------------------------
      getAge() {
        let sage = this.askOld.identtitycard.substr(6, 4);
        let currentYear = new Date().getFullYear();
        this.askOld.age = currentYear - sage;

      },

      //根据输入的条件进行模糊查询-------------------------------------
      vague_select() {
        //因为this.tableData是数组，所以每次获取前都要清空
        this.tableData = [];

        // 判断老人的状态，并状态转换为数字
        if (this.temp_status == "入住") {
          this.status = 2;
        } else if (this.temp_status == "咨询") {
          this.status = 1;
        } else {
          this.status = '';
        }

        var urlstr = "/oldask/vagueselect?status=" + this.status + "&taskname=" + this.taskname + "&toldname=" + this
          .toldname + "&currentPage=" + this.currentPage + "&pageSize=" + this.pageSize;
        axios.get(urlstr).then((msg) => {
          for (var t of msg.data.data) {
            this.tableData.push(t);
          }
          console.log(this.tableData)
        })
      },

      //关闭页面----------------------------------------
      onClose() {
        Object.keys(this.askOld).forEach(key => (this.askOld[key] = ''));
        this.askOld.recAsks = [];
        Object.keys(this.ask).forEach(key => (this.ask[key] = ''));
        this.drawer = !this.drawer;
      },

      //删除信息-----------------------------------------
      delAsk(id) {
        axios.get("/ask/delAsk?id=" + id).then((msg) => {
          alert(msg.message)
        }).watch((err) => {
          alert("删除失败" + err.message);
        })
      },

      //删除多个咨询信息----------------------------------------
      removeAsks() {
        // 用于存放要删除的咨询者id
        var askIds = '';

        // 根据ref获取选中行的数据
        var column = this.$refs.asktable.selection;

        // 遍历选中行的数据，获取当中的咨询者id
        for (let temp of column) {
          askIds += temp.recAsks[0].askId + ",";
        }

        console.log(askIds);
        //将选中数据的id传送到后端
        axios.get("/ask/removeAsks?ids=" + askIds).then((res) => {
          alert(res.message);
        }).watch((msg) => {
          alert("删除失败" + msg.message);
        })
      },

      //编辑选中的信息------------------------------------------
      upAskAndOldAsk(info) {

        //隐藏创建按钮，显示修改按钮
        this.addButton = false;

        //打开新增页面
        this.drawer = true;

        //有值的对象，给有相同名字的但没有值的对象复制，赋值给相同名字的属性
        //info给咨询老人的对象赋值
        Object.keys(info).forEach((key) => {
          this.askOld[key] = info[key]
        })
        console.log(this.askOld)

        // 给ask对象赋值
        Object.keys(info.recAsks[0]).forEach((key) => {
          this.ask[key] = info.recAsks[0][key]
        })

      },

      //确认修改数据------------------------------------------------
      confirm_updata() {
        if (this.askOld.oldaskName == '' || this.ask.askName == '' || this.ask.askWay == '' || this.ask.phone == '') {
          alert("红色字段为必填选项")
        } else {
          //清空recAsks数组
          this.askOld.recAsks = []
          // 填入获取的咨询人信息
          this.askOld.recAsks.push(this.ask);
          axios.post('/oldask/upAskAndAskOld', this.askOld).then((res) => {
            alert(res.message);
          }).catch((err) => {
            alert(err.message)
          });
        }
      },

      //修改当前页面步长
      handleSizeChange(val) {
        this.pageSize = val; //每页条数
        this.getAllAsk();
      },

      handleCurrentChange(val) {
        this.currentPage = val; //当前页数
        this.getAllAsk();
      }
    }
  }
</script>

<style>
  .consult_elmain {
    background-color: #f1f1f1;
  }

  .zdcolor {
    color: red;
  }
  .el-drawer__body {
  	overflow: auto;
  }
</style>
