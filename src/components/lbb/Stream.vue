<template>
  <div style="background: #fffff8;border: 1px solid gainsboro;">
    <div style="padding: 10px; background-color: #F0F7FF;">
      <h2 style="text-align: left;">费用流水</h2>
      <div style="padding: 5px; height: auto;">
        <div style="margin-top: 10px;text-align: left;">
          <!-- 老人姓名：<el-input size="mini" style="width: 150px;"></el-input>
          类别名称：<el-input size="mini" style="width: 150px;"></el-input>
          交费时间：<el-input size="mini" style="width: 150px;"></el-input>
          <el-button>查询</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="primary">打印</el-button> -->
          <el-form ref="elForm" :model="searchVo">
            <el-row>
              <el-col :span="5">
                <el-form-item label="老人姓名" prop="old_name">
                  <el-input size="mini" style="width: 150px;" v-model="searchVo.old_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="类别名称" prop="category_name">
                  <el-input size="mini" style="width: 150px;" v-model="searchVo.category_name"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="9">
                <el-form-item label="交费时间">
                  <el-date-picker v-model="searchVo.maney_time" type="daterange" format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm" @change="dateChangebirthday1" range-separator="至" start-placeholder="开始日期"
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
      </div>
      <!--预存表格-->
      <el-table :data="tableData" ref="table" show-summary :summary-method="getSummaries" style="width: 100%">
        <el-table-column label="老人姓名" width="180">
          <template slot-scope="scope">
            {{scope.row.old.oldName}}
          </template>
        </el-table-column>
        <el-table-column label="床位号" width="180">
          <template slot-scope="scope">
            {{scope.row.bed.bed}}
          </template>
        </el-table-column>
        <el-table-column label="类别名称">
          <template slot-scope="scope">
            {{scope.row.category.category_name}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="收费员">
          <template slot-scope="scope">
            {{scope.row.tollman}}
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="money">
          <template slot-scope="scope">
            {{scope.row.money}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="费用时间">
          <template slot-scope="scope">
            {{scope.row.maney_time}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="费用说明">
          <template slot-scope="scope">
            {{scope.row.maney_text}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="备注">
          <template slot-scope="scope">
            {{scope.row.remark}}
          </template>
        </el-table-column>
      </el-table>
      <!--老人预存详情弹框-->
      <!-- <el-dialog append-to-body title="预存详情" :visible.sync="dialogTableVisible">
        <el-table :data="detaileDate">
          <el-table-column prop="amount" label="预存金额" width="180">
          </el-table-column>
          <el-table-column prop="charging_time" label="收费时间">
          </el-table-column>
          <el-table-column prop="tollman" label="收费员">
          </el-table-column>
          <el-table-column prop="payment" label="交费方式">
          </el-table-column>
          <el-table-column prop="dexplain" label="说明">
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
        </el-table>
      </el-dialog> -->
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
        tableData: [], //预存表格
        detaileDate: [], //预存详情
        totalSize: 0, //总记录数
        limit: 5, //每页记录数
        page: 1, //当前页
        dialogTableVisible: false, //老人预存详情弹框
        param: {},
        searchVo: {
          old_name: '',
          category_name: '',
          maney_time: '',
          startTime:'',
          endTime:''
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      /*得到预存管理信息*/
      getList(page = 1) {
        this.page = page;
        axios.get("cost/getStream/" + this.page + "/" + this.limit)
          .then(res => {
            console.log(res)
            this.tableData = res.data.data.streams
            this.totalSize = res.data.data.total
          }).catch(err => {

          });
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
          } else if (index === 4) {
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
      submitForm(page = 1) {
        this.page = parseInt(page);
        console.log(this.searchVo)
        axios.post("cost/getStreamBySearch/" + 1 + "/" + this.limit, this.searchVo)
          .then(res => {
            this.tableData = res.data.data.streams
            this.totalSize = res.data.data.total
          }).catch(err => {})
      },
      resetForm() {
        this.$refs['elForm'].resetFields()
        this.getList()
      },
      dateChangebirthday1(val) {
       this.startTime = val[0];
       this.endTime = val[1];
       console.log(this.startTime);
     }
    }
  }
</script>

<style>
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
    font-size: 16px;
  }

  .el-table .el-table__header-wrapper tr th {
    margin: 0;
    padding: 0 4px;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
    height: 18px;
    line-height: 18px;
    font-size: 12px;
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
    font-size: 12px;
    background-color: rgb(255, 255, 255);
  }

  /* 设置表格每行的高度： */
  .el-table__header tr,
  .el-table__header th {
    height: 18px;
    padding: 0;
  }

  .el-table__body tr,
  .el-table__body td {
    height: 18px;
    padding: 0;
  }

  .icon-search {
    background: url(../../assets/search.png) no-repeat center center;
  }

  .el-table td,
  .el-table th.is-leaf {
    border: 1px dotted rgb(245, 245, 245);
  }
</style>
