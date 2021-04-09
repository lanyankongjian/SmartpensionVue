<template>
  <div>
    <div style="background: #fffff8;height: 100%;width: 100%;margin: 0 auto;overflow: auto;">
      <div style="padding: 10px;">
        <div style="overflow: hidden;text-align: left;margin: 0;border: 0;width: 890px;">
          <div style="overflow: hidden;position: relative;
                    width: 888px;background-color: #ffffff;
                    color: #000000;font-size: 12px;border-color: #95B8E7;border-width: 1px;
                    border-style: solid;">
            <div style="padding: 5px;
                    height: auto;border-color: #dddddd;
                    background: #F4F4F4;
                    border-width: 0 0 1px 0;
                    border-style: solid;">
              <div style="float: left;">
                <el-button class="l-btn">导出</el-button>
                <el-button class="l-btn">打印</el-button>
              </div>
              <div style="margin-top: 30px;">
                <el-form :model="searchVo" :rules="rules" ref="elForm">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="老人姓名" prop="old_name">
                        <el-input size="mini" style="width: 150px;" v-model="searchVo.old_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="身份证" prop="identitycard">
                        <el-input size="mini" style="width: 150px;" v-model="searchVo.identitycard"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item size="large">
                        <el-button type="primary" @click="submitForm">查询</el-button>
                        <el-button @click="resetForm">重置</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div style="width: 888px;
                        height: auto;position: relative;overflow: hidden;">
              <el-table :data="tableDate" show-summary :summary-method="getSummaries">
                <el-table-column
                      type="index" width="80">
                    </el-table-column>
                <el-table-column label="老人姓名" width="100">
                  <template slot-scope="scope">
                    {{scope.row.old.oldName}}
                  </template>
                </el-table-column>
                <el-table-column label="身份证号码" width="180">
                  <template slot-scope="scope">
                    {{scope.row.old.identitycard}}
                  </template>
                </el-table-column>
                <el-table-column label="押金总和(元)" prop="margin" width="150">
                  <template slot-scope="scope">
                    {{scope.row.margin}}
                  </template>
                </el-table-column>
                <el-table-column label="状态" width="160">
                  <template slot-scope="scope">
                    {{scope.row.state == 0 ? '未入住':'入住'}}
                  </template>
                </el-table-column>
                <el-table-column width="218" label="操作">
                  <template slot-scope="scope">
                    <el-button @click="getDeposit(scope.row.id)">押金详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <div class="block" style="text-align: left;background-color: #dddddd;">
                <!-- <el-pagination :page-sizes="[5, 10, 15, 25]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
                  :total="25">
                </el-pagination> -->
                <el-pagination @current-change="getList" :current-page="page" :page-size="limit" layout="total, prev, pager, next,jumper"
                  :total="totalSize">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!--老人押金详情弹框-->
      <el-dialog append-to-body title="押金详情" :visible.sync="dialogTableVisible">
        <el-table :data="depositTableDate">
          <el-table-column label="押金名称">
            <template slot-scope="scope">
              {{scope.row.deposit_name}}
            </template>
          </el-table-column>
          <el-table-column label="押金金额">
            <template slot-scope="scope">
              {{scope.row.margin}}
            </template>
          </el-table-column>
          <el-table-column label="登记时间">
            <template slot-scope="scope">
              {{scope.row.get_time}}
            </template>
          </el-table-column>
          <el-table-column label="退还时间">
             <template slot-scope="scope">
              {{scope.row.return_time}}
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{scope.row.state == 0 ? "未交":"已交"}}
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    data() {
      return {
        tableDate: [],
        totalSize: 0, //总记录数
        limit: 5, //每页记录数
        page: 1, //当前页
        param: {},
        depositTableDate:[],
        depositDate:{
          deposit_name: ''
        },
        dialogTableVisible: false,
        searchVo: {
          old_name: '',
          identitycard: ''
        },
        rules:{
          identitycard: [{
              required: false,
              message: '请输入身份证ID',
              trigger: 'blur'
            },
            {
              pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
              message: '你的身份证格式不正确'
            }
          ]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(page = 1) {
        this.page = page;
        axios.get("cost/deposits/" + this.page + "/" + this.limit)
          .then(res => {
            console.log(res)
            this.tableDate = res.data.data.deposits
            this.totalSize = res.data.data.total
          }).catch(err => {})
      },
      getSummaries(param) {
        const {
          columns,
          data
        } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计'
          } else if (index === 3) {
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
            } else {
              sums[index] = 'N/A'
            }
          } else {
            sums[index] = ''
          }
        })
        return sums
      },
      getDeposit(id){
        console.log(id)
        axios.get("cost/getDepositById/"+id)
        .then(res => {
          console.log(res)
          this.depositDate = res.data.data.deposit
          this.depositTableDate.push(this.depositDate)
          this.dialogTableVisible = true;
          console.log(this.depositDate)
        }).catch(err => {})
        this.depositTableDate = [];
      },
      submitForm(page = 1){
        this.page = parseInt(page);
        axios.post("cost/getDepositBySearch/"+1+"/"+this.limit,this.searchVo)
          .then(res => {
            console.log(res)
            this.tableDate = res.data.data.deposits
            this.totalSize = res.data.data.total
          }).catch(err => {})
      },
      resetForm() {
        this.$refs['elForm'].resetFields()
        this.getList()
      }
    }
  }
</script>

<style scope>
  .l-btn {
    text-decoration: none;
    display: inline-block;
    overflow: hidden;
    margin: 0;
    padding: 0;
    cursor: pointer;
    outline: none;
    text-align: center;
    vertical-align: middle;
    line-height: normal;
    border-radius: 5px 5px 5px 5px;
    background: linear-gradient(to bottom, #ffffff 0, #eeeeee 100%);
    background-repeat: repeat-x;
    border: 1px solid #bbb;
    font-size: 14px;
  }

  .el-table .el-table__header-wrapper tr th {
    margin: 0;
    padding: 0 4px;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
    height: 18px;
    line-height: 18px;
    font-size: 16px;
    background-color: rgb(245, 245, 245);
  }

  .el-table .el-table__row {
    margin: 0;
    padding: 0 4px;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
    height: 18px;
    line-height: 18px;
    font-size: 14px;
    background-color: rgb(255, 255, 255);
  }

  .el-table td,
  .el-table th.is-leaf {
    border: 1px dotted rgb(245, 245, 245);
  }

  .el-table td,
  .el-table th {
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
  }
</style>
