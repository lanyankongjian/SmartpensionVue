<template>

  <div>
    <h1>食物类别管理</h1>
    <div class="iop">
      <el-input v-model="input.name" placeholder="请输入内容" style="width: 220px;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="getdepts()">搜索</el-button>
      <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
      <el-button type="primary" @click="getdeptss()">重置</el-button>
    </div>
    <div class="opp">
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 50%">
        <el-table-column fixed prop="fcName" label="食物类别名称" width="150">
        </el-table-column>
        <el-table-column prop="fcDescribe" label="食物类别描述" width="300">
        </el-table-column>


        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="chis(scope.row)" type="text" size="small">修改</el-button>
            <el-button type="text" size="small" @click="qias(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加类别" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="类别名称" :label-width="formLabelWidth" prop="fcName">
          <el-input v-model="form.fcName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别描述" :label-width="formLabelWidth" prop="fcDescribe">
          <el-input v-model="form.fcDescribe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

   <!-- 修改 -->
    <el-dialog title="修改类别" :visible.sync="dialogFormVisibletwo">
      <el-form :model="form1" :rules="rules" ref="ruleForm">
        <el-form-item label="类别名称" :label-width="formLabelWidth" prop="fcName">
          <el-input v-model="form1.fcName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别描述" :label-width="formLabelWidth" prop="fcDescribe">
          <el-input v-model="form1.fcDescribe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetFormtwo('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitFormtwo('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>




    <div class="block">

       <el-pagination style="margin-left: 40%;" background @size-change="handleSizeChange"
           @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[1, 2, 5, 10]"
           :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
         </el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        rules: {
          fcName: [{
              required: true,
              message: '请输入至少一个字符',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 15,
              message: '长度在 1 到 15个字符',
              trigger: 'blur'
            }
          ],
        },
        input: '',
        form: {
          fcName: '',
          fcDescribe: '',

        },
        form1: {
          fcName: '',
          fcDescribe: '',
          fcId:'',
        },
        input: {
         page: '0',
         limit:'5',
        },
        input1: '',
        dialogFormVisible: false,
        dialogFormVisibletwo: false,
        formLabelWidth: '120px',
        tableData: [],
         total: 0,
                pageNum: 1,
                currentPage: 1,
                pagesize: 5,

      }
    },
    methods: {
      qias(row){
        this.id=row.fcId
        console.log(row)
        this.open()
      },
       open() {
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                console.log(this.id)
                    this.$axios.post('foot/delectFoot', this.qs.stringify({id:this.id})).then(r => {
                        if(r.status==200){
                          this.$message.warning(r.data.message)
                          this.getdeptss()
                        }
                       }).catch(v=>{
                         this.$message.error("删除错误！")
                       })

              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            },
      resetForm(formName) {
         this.dialogFormVisible=false;
        this.$refs[formName].resetFields();

      },
      resetFormtwo(formName) {
         this.dialogFormVisibletwo=false;
        this.$refs[formName].resetFields();

      },
      chis(row){
        this.form1=row
        this.dialogFormVisibletwo=true
        console.log(row)

      },
        /*分页*/
            handleSizeChange(size) {
              this.pagesize = size
            },
            handleCurrentChange(currentPage) {
              this.currentPage = currentPage
            },

      //模糊查询食物种类
      getdepts() {

        this.$axios.post('foot/getFoot',this.input).then(r => {
          this.tableData = r.data.data.list
           this.total=this.tableData.length
        })
      },
      //重置查询
      getdeptss() {
        this.input1 = {}
        this.$axios.post('foot/getFoot', this.input1).then(r => {
          this.tableData = r.data.data.list
          this.total=this.tableData.length
        })
      },
      //新增食物种类
      addfood() {
        this.$axios.post('foot/addFoot', this.form).then(r => {
          if (r.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.getdeptss()
            this.show = false,
            this.dialogFormVisible = false   
          }
        })
      },
      //修改食物种类
      updafood() {
        this.$axios.post('foot/updateFoot', this.form1).then(r => {
          if (r.data.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.show = false,
              this.dialogFormVisibletwo = false
          }
        })
      },
      //调用新增
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.addfood();
          } else {
            return false;
          }
        });
      },
      //调用修改
      submitFormtwo(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.updafood();
          } else {
            return false;
          }
        });
      },

      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
    },
    created() {
      this.getdepts();
    }
  }
</script>

<style>
  .iop {
    float: left;
    margin-top: 50px;
  }

  .block {
    float: left;
  }

  .opp {
    margin-top: 100px;
  }
</style>
