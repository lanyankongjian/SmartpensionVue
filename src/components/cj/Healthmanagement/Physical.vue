<template>
  <div>
    <h2 style="float: left;">体检登记</h2>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column prop="date" label="老人姓名" width="180">
      </el-table-column>
      <el-table-column prop="name" label="床位号" width="180">
      </el-table-column>
      <el-table-column prop="address" label="体检医院">
      </el-table-column>
      <el-table-column prop="address" label="体检时间">
      </el-table-column>
      <el-table-column prop="address" label="体检结果">
      </el-table-column>
      <el-table-column prop="address" label="登记人">
      </el-table-column>
      <el-table-column prop="address" label="登记时间">
      </el-table-column>
      <el-table-column prop="address" label="操作">
      </el-table-column>
    </el-table>
    <el-pagination style="margin-left: 40%;" class="pagination" background @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 5, 10]"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
        data() {
          return {
            tableData: [],
            total: 0,
            pageNum: 1,
            currentPage: 1,
            pagesize: 5,
          }
        },
        methods:{
          /*分页*/
          handleSizeChange(size) {
            this.pagesize = size
          },
          handleCurrentChange(currentPage) {
            this.currentPage = currentPage
          },
        },
        created(){

        }
      }
</script>

<style>
</style>
