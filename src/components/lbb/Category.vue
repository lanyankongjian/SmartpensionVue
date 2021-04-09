<template>
  <div>
    <h1>费用类别</h1>
    <div style="float: left;">
      <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      <el-button type="primary">修改</el-button>
    </div>
    <div style="margin-top: 40px;">
      <el-form ref="elForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="名称" prop="category_name">
              <el-input size="mini" style="width: 150px;" v-model="searchVo.category_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="性质" prop="cost_text">
              <el-input size="mini" style="width: 150px;" v-model="searchVo.cost_text"></el-input>
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
    <div>
      <el-table :data="tableDate" border>
        <el-table-column label="名称" prop="category_name"></el-table-column>
        <el-table-column label="费用性质" prop="cost_text"></el-table-column>
        <el-table-column label="收费标准" prop="fees"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="getCategoryById(scope.row.id)">修改</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
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
    <!--新增弹框-->
    <div>
      <el-dialog title="新增费用类别" append-to-body :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="formRule">
          <el-form-item label="名称" prop="category_name">
            <el-input size="mini" style="width: 150px;" v-model="form.category_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="费用性质" prop="cost_text">
            <el-input size="mini" style="width: 150px;" v-model="form.cost_text" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收费标准" prop="fees">
            <el-input size="mini" style="width: 150px;" v-model="form.fees" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input size="mini" v-model="form.remark" type="textarea" placeholder="请输入备注" :autosize="{minRows: 4, maxRows: 4}"
              :style="{width: '50%'}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--修改弹框-->
    <div>
      <el-dialog title="修改费用类别" append-to-body :visible.sync="dialogFormVisible2">
        <el-form :model="form2" :rules="formRule">
          <el-form-item label="名称" prop="category_name">
            <el-input size="mini" style="width: 150px;" v-model="form2.category_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="费用性质" prop="cost_text">
            <el-input size="mini" style="width: 150px;" v-model="form2.cost_text" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收费标准" prop="fees">
            <el-input size="mini" style="width: 150px;" v-model="form2.fees" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input size="mini" v-model="form2.remark" type="textarea" placeholder="请输入备注" :autosize="{minRows: 4, maxRows: 4}"
              :style="{width: '50%'}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateCategory()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    data() {
      return {
        searchVo: {
          old_name: '',
          phone: ''
        },
        totalSize: 0, //总记录数
        limit: 5, //每页记录数
        page: 1, //当前页
        tableDate: [],
        form: {},
        dialogFormVisible: false,
        form2: {},
        dialogFormVisible2: false,
        formRule: {
          category_name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          fees: [{
              required: true,
              message: "请输入收费标准",
              trigger: "change"
            },
            {
              pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/,
              message: "请输入合法的金额数字，最多两位小数",
              trigger: "change"
            }
          ],
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(page = 1) {
        this.page = page;
        axios.get("/cost/getCategory/" + this.page + "/" + this.limit)
          .then(res => {
            console.log(res)
            this.tableDate = res.data.data.categorys
            this.totalSize = res.data.data.total
          }).catch(err => {})
      },
      submitForm(page = 1) {
        console.log(this.searchVo)
        this.page = page;
        axios.post("cost/getCategoryBySearch/" + 1 + "/" + this.limit, this.searchVo)
          .then(res => {
            this.tableDate = res.data.data.categorys
            this.totalSize = res.data.data.total
            this.$message({
              type: "success",
              message: "查询成功!",
            });
            console.log(res)
          }).catch(err => {
            this.$message({
              type: "error",
              message: "查询失败!",
            });
          });
      },
      resetForm() {
        this.$refs['elForm'].resetFields()
        this.getList()
      },
      addCategory() {
        this.$confirm("是否确定添加?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          axios.post("cost/addCategory", this.form)
            .then(res => {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.getList()
              this.dialogFormVisible = false;
            }).catch(err => {
              this.$message({
                type: "error",
                message: "添加失败!",
              });
            })
        });
      },
      getCategoryById(id) {
        console.log(id)
        axios.get("cost/getCateById/" + parseInt(id))
          .then(res => {
            this.dialogFormVisible2 = true
            this.form2 = res.data.data.category
            console.log(res)
          }).catch(err => {

          })
      },
      updateCategory() {
        this.$confirm("是否确定修改?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          axios.post("cost/updateCategory", this.form2)
            .then(res => {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.dialogFormVisible2 = false;
              this.getList()
            }).catch(err => {
              this.$message({
                type: "error",
                message: "修改失败!",
              });
            })
        });
      }
    }
  }
</script>

<style>
</style>
