<template>
  <div style="border: 1px solid gainsboro;background: #fffff8;padding: 10px;">
    <!-- <h2>交费登记</h2> -->
    <div style="float: left;">
      <el-button @click="addPayment()">新增交费</el-button>
      <!-- <el-button>作废</el-button> -->
      <el-button>打印</el-button>
      <el-button>导出</el-button>
    </div>
    <div style="margin-top: 50px;background-color: #F0F7FF;">
      <el-form ref="elForm" :model="searchVo" :rules="rules">
        <el-row>
          <el-col :span="5">
            <el-form-item label="老人姓名" prop="old_name">
              <el-input size="mini" style="width: 150px;" v-model="searchVo.old_name"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="交费时间">
              <el-date-picker v-model="searchVo.time" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span="5">
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">查询</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-table border :data="tableDate">
        <el-table-column label="老人姓名">
          <template slot-scope="scope">
            {{scope.row.old.oldName}}
          </template>
        </el-table-column>
        <el-table-column label="床位号">
          <template slot-scope="scope">
            {{scope.row.bed.bed}}
          </template>
        </el-table-column>
        <el-table-column label="交费金额(元)" prop="amount">

        </el-table-column>
        <el-table-column label="交费时间" prop="amount_time"></el-table-column>
        <el-table-column label="交费人" prop="payer"></el-table-column>
        <el-table-column label="支付方式">
          <template slot-scope="scope">
            {{scope.row.style === 0 ? "现金":"其他"}}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="登记人" prop="registrant"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
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
  export default {
    data() {
      return {
        searchVo:{
          old_name:'',
          time:''
        },
        totalSize: 0, //总记录数
        limit: 5, //每页记录数
        page: 1, //当前页
        tableDate: [],
        rules:{}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(page = 1) {
        this.page = page;
        axios.get("/cost/getPayment/" + this.page + "/" + this.limit)
          .then(res => {
            console.log(res)
            this.tableDate = res.data.data.payments
            this.totalSize = res.data.data.total
          }).catch(err => {})
      },
      submitForm(){
        axios.post("cost/getPaymentBySearch/"+1+"/"+this.limit,this.searchVo)
          .then(res => {
            console.log(res)
            this.tableDate = res.data.data.payments
            this.totalSize = res.data.data.total
          }).catch(err => {})
      },
      resetForm() {
        this.$refs['elForm'].resetFields()
        this.getList()
      },
      addPayment(){
        this.$router.push({
          path: '/addprestore'
        });
      }
    }
  }
</script>

<style>
</style>
