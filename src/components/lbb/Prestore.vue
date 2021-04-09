<template>
  <div style="background: #fffff8;border: 1px solid gainsboro;">
    <div style="padding: 10px; background-color: #F0F7FF;">
      <h2 style="text-align: left;">预存管理</h2>
      <div style="padding: 5px; height: auto;margin-top: 10px;">
        <div style="float: left;">
          <el-button @click="addprestore()" type="primary">入住账号预存款充值</el-button>
          <el-button type="primary">一卡通充值</el-button>
          <el-button type="primary" @click="exportExcel">导出</el-button>
          <el-button type="primary" v-print="'#printTest'">打印</el-button>
        </div>
        <div style="margin-top: 40px;text-align: left;">
          <el-form :model="searchVo" :rules="rules" ref="elForm">
            <el-row>
              <el-col :span="5">
                <el-form-item label="老人姓名" prop="old_name">
                  <el-input size="mini" style="width: 150px;" v-model="searchVo.old_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号" prop="phone">
                  <el-input size="mini" style="width: 150px;" v-model="searchVo.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
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
      <!--预存表格-->
      <div id="printTest">
        <p>
          <el-table id="out-table" border :data="tableData" ref="table" show-summary :summary-method="getSummaries" style="width: 100%">
            <el-table-column label="老人姓名" width="180">
              <template slot-scope="scope">
                {{scope.row.old.oldName == null ? '':scope.row.old.oldName}}
              </template>
            </el-table-column>
            <el-table-column label="手机号" width="180">
              <template slot-scope="scope">
                {{scope.row.old.phone}}
              </template>
            </el-table-column>
            <el-table-column label="身份证号">
              <template slot-scope="scope">
                {{scope.row.old.identitycard}}
              </template>
            </el-table-column>
            <el-table-column prop="address" label="床位号">
              <template slot-scope="scope">
                {{scope.row.bed.bed == null ? "暂无床位":scope.row.bed.bed}}
              </template>
            </el-table-column>
            <el-table-column label="账户预存款" prop="amount">
              <template slot-scope="scope">
                {{scope.row.detailStorage.amount}}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span class="icon-search" style="background-image: url(../../assets/search.png);"></span>
                <el-button @click="getdetailStorage(scope.row.old.oldId)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </p>
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
      <!--老人预存详情弹框-->
      <el-dialog append-to-body title="预存详情" :visible.sync="dialogTableVisible">
        <el-table :data="detaileDate">
          <el-table-column prop="amount" label="预存金额">
          </el-table-column>
          <el-table-column prop="charging_time" label="收费时间">
          </el-table-column>
          <el-table-column prop="tollman" label="收费员">
          </el-table-column>
          <el-table-column label="交费方式">
            <template slot-scope="scope">
              {{scope.row.payment == 1?'现金':'微信'}}
            </template>
          </el-table-column>
          <el-table-column prop="dexplain" label="说明">
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  //引入安装的依赖
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
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
          identitycard: '',
          phone: ''
        },
        rules: {
          phone: [{
              required: false,
              message: '请输入手机号码',
              trigger: 'blur'
            },
            {
              validator: function(rule, value, callback) {
                if (/^1[34578]\d{9}$/.test(value) == false) {
                  callback(new Error("请输入正确的手机号"));
                } else {
                  callback();
                }
              },
              trigger: 'blur'
            }
          ],
          identitycard: [{
              required: false,
              message: '请输入身份证ID',
              trigger: 'blur'
            },
            {
              pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
              message: '你的身份证格式不正确'
            }
          ],
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
        axios.get("cost/prestores/" + this.page + "/" + this.limit)
          .then(res => {
            console.log(res)
            this.tableData = res.data.data.prestores
            this.totalSize = res.data.data.total
          }).catch(err => {

          });
      },
      getdetailStorage(id) {
        console.log(id)
        axios.get("cost/getDetailStorageByOldId/" + id)
          .then(res => {
            console.log(res)
            this.detaileDate = res.data.data.detailStorage
          }).catch(err => {

          });
        this.dialogTableVisible = true;
      },
      addprestore() {
        this.$router.push({
          path: '/addprestore'
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
        this.page = page;
        axios.post("cost/getPrestoresBySearch/" + 1 + "/" + this.limit, this.searchVo)
          .then(res => {
            this.$message({
              type: "success",
              message: "查询成功!",
            });
            console.log(res)
            this.tableData = res.data.data.prestores
            this.totalSize = res.data.data.total
          }).catch(err => {
            this.$message({
              type: "error",
              message: "查询失败!",
            });
          });
        /* this.$refs['elForm'].validate(valid => {
          if (valid) {
            axios.post("cost/getPrestoresBySearch/" + 1 + "/" + this.limit, this.searchVo)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "查询成功!",
                });
                this.tableData = res.data.data.prestores
                this.totalSize = res.data.data.total
              }).catch(err => {
                this.$message({
                  type: "error",
                  message: "查询失败!",
                });
              });
          } else {
            return false;
          }
          // TODO 提交表单
        }) */
      },
      resetForm() {
        this.$refs['elForm'].resetFields()
        this.getList()
      },
      exportExcel() {
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        var wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          FileSaver.saveAs(new Blob([wbout], {
            type: 'application/octet-stream'
          }), 'sheetjs.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
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
    height: 38px;
    line-height: 38px;
    font-size: 12px;
    background-color: rgb(245, 245, 245);
  }

  .el-table .el-table__row {
    margin: 0;
    padding: 0 4px;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
    height: 28px;
    line-height: 28px;
    font-size: 16px;
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
