<template>
  <div style="border: 1px solid #E4E4E4;background-color: #F0F7FF;">
    <div>
      <!-- <h2>欠费管理</h2> -->
    </div>
    <div>
      <el-form ref="elForm" :model="formData">
        <el-row>
          <el-col :span="5">
            <el-form-item label="老人姓名" prop="old_name">
              <el-input size="mini" style="width: 120px;margin-left: -90px;" width="150px" v-model="formData.old_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="老人身份证号" prop="identitycard">
              <el-input size="mini" style="width: 120px;margin-left: -90px;" width="150px" v-model="formData.identitycard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="床位号" prop="bed">
              <el-input size="mini" style="width: 120px;margin-left: -90px;" width="150px" v-model="formData.bed"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="欠费金额大于等于" prop="money">
              <el-input size="mini" style="width: 60px;margin-left: -90px;" width="150px" v-model="formData.money"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="3">
            <el-form-item label="是否欠费" prop="money">
              <el-input size="mini" style="width: 60px;" width="150px" v-model="formData.money"></el-input>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="8">
            <el-form-item label="入住时间" prop="money">
              <el-date-picker v-model="formData.time" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-button>查询</el-button>
            <el-button>重置</el-button>
            <el-button @click="toPay()">交费</el-button>
            <el-button>导出</el-button>
            <el-button>打印</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData">
        <el-table-column label="老人姓名">
          <template slot-scope="scope">
            {{scope.row.old.oldName}}
          </template>
        </el-table-column>
        <el-table-column label="身份证号">
          <template slot-scope="scope">
            {{scope.row.old.identitycard}}
          </template>
        </el-table-column>
        <el-table-column label="入住日期">
          <template slot-scope="scope">
            {{scope.row.old.joinTime}}
          </template>
        </el-table-column>
        <el-table-column label="床位号">
          <template slot-scope="scope">
            {{scope.row.bed.bed}}
          </template>
        </el-table-column>
        <el-table-column label="合计欠费金额"></el-table-column>
        <el-table-column label="月收入住费"></el-table-column>
        <el-table-column label="其他月收费"></el-table-column>
        <el-table-column label="日常其他收费"></el-table-column>
        <el-table-column label="特殊服务费用"></el-table-column>
        <el-table-column label="阶段性收费"></el-table-column>
        <el-table-column label="预存余额"></el-table-column>
        <el-table-column label="是否欠费"></el-table-column>
      </el-table>
    </div>
    <div>
      <div class="block" style="text-align: left;">
        <!-- <el-pagination :page-sizes="[5, 10, 15, 25]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
          :total="25">
        </el-pagination> -->
        <el-pagination @current-change="getList" :current-page="page" :page-size="limit" layout="total, prev, pager, next,jumper"
          :total="totalSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  export default{
    data(){
      return{
        formData:{
          old_name:''
        },
        totalSize: 0, //总记录数
        limit: 5, //每页记录数
        page: 1, //当前页
        tableData:[]
      }
    },
    created(){
      this.getList()
    },
    methods:{
      getList(page = 1){
        this.page = page;
        axios.get("cost/getAllArr/"+this.page+"/"+this.limit)
        .then(res => {
          console.log(res)
          this.tableData = res.data.data.arrs
          this.totalSize = res.data.data.total
        }).catch(err => {

        })
      }
    }
  }
</script>

<style>
</style>
