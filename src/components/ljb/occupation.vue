<template>
  <el-container>
    <el-main class="occupation_elmain">

      <!-- 入住登记信息操作 -->
      <el-row style="text-align: left;margin-bottom: 10px;">
        <el-button type="primary" plain  size="small" @click="addOldInfo" round>新增</el-button>
        <el-button type="primary" plain  size="small" round >删除</el-button>
      </el-row>

      <!-- 多条件模糊查询 -->
      <el-row style="text-align: left;">
          老人名称：<el-input v-model="oldName" style="width: 100px;" clearable size="mini"></el-input>
          身份证号：<el-input style="width: 100px;" v-model="oldIdCard" clearable size="mini"></el-input>
          性别：
          <el-select size="mini" style="width: 100px;" v-model="gender" >
              <el-option value="全部"></el-option>
              <el-option value="男"></el-option>
              <el-option value="女"></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-search" plain @click="vagueQuery" size="mini">查询</el-button>

      </el-row>

      <!-- 表格信息 -->
      <el-row >
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            border
            >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="oldName"
              label="老人姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别"
              width="120">
            </el-table-column>
            <el-table-column
              prop="identitycard"
              label="身份证号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="contractTime"
              label="登记时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="status"
              label="入住状态"
              show-overflow-tooltip>
              <template slot-scope="live_status">
                <div v-if="status= 1">入住</div>
                <div v-else="status= 2">咨询</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="joinTime"
              label="入住开始时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="address"
              label="家庭地址"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作"
              show-overflow-tooltip>
              <template slot-scope="option">
                      <el-button
                        @click="upOld(option.row)"
                        size="mini">编辑</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="delAsk(option.row.oldId)"
                        >删除</el-button>
                    </template>
            </el-table-column>
          </el-table>

      </el-row>

      <!-- 分页 -->
      <el-row style="text-align:right">
        <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
        </el-pagination>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios'
  export default{
    data(){
      return{
        gender:'全部',
        oldName:'',
        oldIdCard:'',
        tableData:[],
        total:0,
        pageSize:10,
        currentPage:1,



      }
    },
    created() {
      this.getAllOld();
    },
    methods:{
      addOldInfo(){
        localStorage.removeItem("oldId")
        console.log(localStorage.getItem("oldId"));
        this.$router.push({path: '/addOld'})
      },
      // 获取所有老人信息-------------------------------------------
      getAllOld(){
        //因为this.tableData是数组，所以每次获取前都要清空
        this.tableData =[];

        axios.get('/old/getAllOld?currentPage='+this.currentPage+'&pageSize='+this.pageSize).then((res)=>{
          for(var t of res.data.data){
            this.tableData.push(t);
          }
          this.total = res.data.total;
        }).catch((err) => {
          alert(err.message);
        })

      },

      // 模糊查询
      vagueQuery(){
        //因为this.tableData是数组，所以每次获取前都要清空
        this.tableData =[];

        axios.post("/old/fazzySearchByOld",
          {
              "gender":this.gender,
              "oldName":this.oldName,
              "identitycard":this.oldIdCard,
              "pageSize":this.pageSize,
              "currentPage":this.currentPage
          }
        ).then((res)=>{
          for(var t of res.data.data){
            this.tableData.push(t);
          }
          this.total = res.data.total;
        }).catch((err) => {
          alert(err.message);
        })

      },

      //修改步长
      handleSizeChange(val){
        this.pageSize = val; //每页条数
        this.getAllOld();
      },
      //修改当前页
      handleCurrentChange(val) {
        this.currentPage = val; //当前页数
        this.getAllOld();
      },
      //修改老人信息
      upOld(rowdata){
        localStorage.setItem("oldId",rowdata.oldId);
        this.$router.push({path: '/addOld'})
      }
    }
  }
</script>

<style>
  .occupation_elmain{
    background-color: #f1f1f1;
  }
</style>
