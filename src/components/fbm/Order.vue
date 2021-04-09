<template>

  <div>
    <h1>食谱管理</h1>
    <div class="qwe">
      <el-input v-model="input.name" placeholder="请输入内容" style="width: 220px;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="getdepts()">搜索</el-button>
      <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
      <el-button type="primary" @click="getdeptss()">重置</el-button>
    </div>
    <el-dialog title="添加食谱信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="食谱名称" prop="reName">
          <el-input v-model="ruleForm.reName"></el-input>
        </el-form-item>

          <el-form-item
            label="每月/价格"
            prop="reMonth"
            :rules="[
              { required: true,message: '价格不能为空'},
              { type: 'number', min:0, message: '价格必须为正数值'}
            ]"
          >
            <el-input type="number" v-model.number="ruleForm.reMonth" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item
            label="每日/价格"
            prop="reDay"
            :rules="[
              { required: true,message: '价格不能为空'},
              { type: 'number', min:0, message: '价格必须为正数值'}
            ]"
          >
            <el-input type="number" v-model.number="ruleForm.reDay" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="备注餐次" prop="reNote">
          <el-input type="textarea" v-model="ruleForm.reNote"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
       </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div> -->
    </el-dialog>

    <el-dialog title="修改食谱信息" :visible.sync="dialogFormVisibletwo">
      <el-form :model="ruleForm1" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="食谱名称" prop="reName">
          <el-input v-model="ruleForm1.reName"></el-input>
        </el-form-item>

          <el-form-item
            label="每月/价格"
            prop="reMonth"
            :rules="[
              { required: true,message: '价格不能为空'},
              { type: 'number', min:0, message: '价格必须为正数值'}
            ]"
          >
            <el-input type="number" v-model.number="ruleForm1.reMonth" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item
            label="每日/价格"
            prop="reDay"
            :rules="[
              { required: true,message: '价格不能为空'},
              { type: 'number', min:0, message: '价格必须为正数值'}
            ]"
          >
            <el-input type="number" v-model.number="ruleForm1.reDay" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="备注餐次" prop="reNote">
          <el-input type="textarea" v-model="ruleForm1.reNote"></el-input>
        </el-form-item>

<!--        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
      <el-button @click="resetFormtwo('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="submitFormtwo('ruleForm')">确 定</el-button>
       </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div> -->
    </el-dialog>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width:70%">
      <el-table-column fixed prop="reName" label="食谱名称" width="150">
      </el-table-column>
      <el-table-column prop="reNote" label="备注餐次" width="350">
      </el-table-column>
      <el-table-column prop="reMonth" label="每月/元" width="120">
      </el-table-column>
      <el-table-column prop="reDay" label="每天/元" width="150">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="chis(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="qias(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    methods: {
      chis(row){
        this.ruleForm1=row
        this.dialogFormVisibletwo=true
        console.log(row)
      },
      qias(row){
        this.id=row.reId
        console.log(row)
        this.open()
      },
      open() {
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {

                   this.$axios.post('recipe/deleteRecipe', this.qs.stringify({id:this.id})).then(r => {
                        this.$message.success("删除成功！")
                        this.getdepts();
                      })

             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消删除'
               });
             });
           },

      getdeptss() {
          this.input1={}
          this.$axios.post('recipe/getRecipe',this.input1).then(r => {
              this.tableData = r.data.data.list
              this.total=this.tableData.length
          })
        },
      //新增食谱
      addfood(){
        this.$axios.post('recipe/addRecipe',this.ruleForm).then(r => {
          console.log(this.ruleForm)
               if (r.data.code === 200) {
                      this.$message({
                        type: 'success',
                        message: '添加成功!'
                      });
                      this.show = false,
                      this.dialogFormVisible=false
                      this.getdeptss()
                    }
        })
      },
      //修改食谱
      updatefood(){
        this.$axios.post('recipe/updateRecipe',this.ruleForm1).then(r => {
          console.log(this.ruleForm1)
               if (r.data.code === 200) {
                      this.$message({
                        type: 'success',
                        message: '修改成功!'
                      });
                      this.show = false,
                      this.dialogFormVisibletwo=false
                    }
        })
      },
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.addfood();
          } else {
            return false;
          }
        });
      },
      submitFormtwo(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.updatefood();
          } else {
            return false;
          }
        });
      },
      //模糊查询食物
      getdepts() {
          this.$axios.post('recipe/getRecipe',this.input).then(r => {
              this.tableData = r.data.data.list
              this.total=this.tableData.length
          })
        },
        //分类id查询
        getdeptsthree(id) {
          let i={
             id:id
          }
            this.$axios.post('food/getDetails',i).then(r => {
                this.tableData = r.data.data.list
                this.total=this.tableData.length
            })
          },
        //查询出分类
        getdeptstwo() {
            this.$axios.post('foot/getFoot',this.input).then(r => {
                this.options = r.data.data.list
            })
          },
      handleClick1(row) {
        console.log(row);
      },
      handleClick() {
        alert('button click');
      },
      handleSizeChange(size) {
        this.pagesize = size
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible=false
      },
      resetFormtwo(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisibletwo=false
      }
    },
    created() {
      this.getdepts();

    },
    data() {
      return {

        ruleForm1: {
          fdName: '',
          fdId:'',
          fcId:'',
          fdPrice:'',
          fdFtatd:'',
          fdPadoo:'',
          fdDegree:'',
          fdFlavor:'',
        },
         dialogFormVisibletwo: false,
         total: 0,
                pageNum: 1,
                currentPage: 1,
                pagesize: 5,
        tableData: [],
        options: [],
        value: '',
        input: '',
        input:{},
        input1:'',
        dialogFormVisible: false,
        ruleForm: {
          name: '',
          name1: '',
          region: '',

          resource: '',
          desc: '',
          fdName:'',
          fcId:'',
          fdFtatd:'',
          fdPadoo:'',
          fdDegree:'',
          fdPrice:'',
          fdFlavor:'',
        },
        rules: {
          reName: [{
              required: true,
              message: '请输入至少一个字符',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 25,
              message: '长度在 1 到 25字符',
              trigger: 'blur'
            }
          ],
          fdDegree: [{
            required: true,
            message: '请选择一项',
            trigger: 'change'
          }],
          fcId: [{
            required: true,
            message: '请选择一项',
            trigger: 'change'
          }],
          name1: [{
              required: true,
              message: '请输入至少一个字符',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 100,
              message: '长度在 1 到 100个字符',
              trigger: 'blur'
            }
          ],
          date1: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          date2: [{
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }],
          fdPadoo: [{
            type: 'array',
            required: true,
            message: '请至少选择一个',
            trigger: 'change'
          }],
          resource: [{
            required: true,
            message: '请选择活动资源',
            trigger: 'change'
          }],
          // desc: [{
          //   required: true,
          //   message: '请填写食材说明',
          //   trigger: 'blur'
          // }]
        },
        formLabelWidth: '120px',

      }
    }
  }
</script>
<style>
  .qwe {
    float: left;
    margin-top: 40px;
  }
  .block{
    float: left;
  }
</style>
