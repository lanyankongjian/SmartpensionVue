<template>

  <div>
    <h1>食物管理</h1>
    <div class="qwe">
      <el-select v-model="value" clearable placeholder="请选择" >
        <el-option v-for="item in options" :key="item.fcId" :label="item.fcName" :value="item.fcId" @click.native="getdeptsthree(item.fcId)">
        </el-option>
      </el-select>

      <el-input v-model="input.name" placeholder="请输入内容" style="width: 220px;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="getdepts()">搜索</el-button>
      <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
      <el-button type="primary" @click="getdeptss()">重置</el-button>
    </div>
    <el-dialog title="添加食物信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="食物名称" prop="fdName">
          <el-input v-model="ruleForm.fdName"></el-input>
        </el-form-item>

          <el-form-item
            label="食物价格"
            prop="fdPrice"
            :rules="[
              { required: true,message: '价格不能为空'},
              { type: 'number', min:0, message: '价格必须为正数值'}
            ]"
          >
            <el-input type="number" v-model.number="ruleForm.fdPrice" autocomplete="off"></el-input>
          </el-form-item>


        <el-form-item label="辣味级别" prop="fdDegree">
          <el-select v-model="ruleForm.fdDegree" placeholder="请选择辣度" style="float: left;">
            <el-option label="无辣" value="无辣"></el-option>
            <el-option label="微辣" value="微辣"></el-option>
            <el-option label="中辣" value="中辣"></el-option>
            <el-option label="重辣" value="重辣"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食物种类" prop="fcId">
          <el-select v-model="ruleForm.fcId" clearable placeholder="请选择" style="float: left;">
            <el-option v-for="item in options" :key="item.fcId" :label="item.fcName" :value="item.fcId" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食物口感" prop="fdFlavor">
          <el-input v-model="ruleForm.fdFlavor"></el-input>
        </el-form-item>


        <el-form-item label="食材说明" prop="fdFtatd">
          <el-input type="textarea" v-model="ruleForm.fdFtatd"></el-input>
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

    <el-dialog title="修改食物信息" :visible.sync="dialogFormVisibletwo">
      <el-form :model="ruleForm1" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="食物名称" prop="fdName">
          <el-input v-model="ruleForm1.fdName"></el-input>
        </el-form-item>

          <el-form-item
            label="食物价格"
            prop="fdPrice"
            :rules="[
              { required: true,message: '价格不能为空'},
              { type: 'number', min:0, message: '价格必须为正数值'}
            ]"
          >
            <el-input type="number" v-model.number="ruleForm1.fdPrice" autocomplete="off"></el-input>
          </el-form-item>


        <el-form-item label="辣味级别" prop="fdDegree">
          <el-select v-model="ruleForm1.fdDegree" placeholder="请选择辣度" style="float: left;">
            <el-option label="无辣" value="无辣"></el-option>
            <el-option label="微辣" value="微辣"></el-option>
            <el-option label="中辣" value="中辣"></el-option>
            <el-option label="重辣" value="重辣"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食物种类" prop="fcId">
          <el-select v-model="ruleForm1.fcId" clearable placeholder="请选择" style="float: left;">
            <el-option v-for="item in options" :key="item.fcId" :label="item.fcName" :value="item.fcId" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食物口感" prop="fdFlavor">
          <el-input v-model="ruleForm1.fdFlavor"></el-input>
        </el-form-item>




        <el-form-item label="食材说明" prop="fdFtatd">
          <el-input type="textarea" v-model="ruleForm1.fdFtatd"></el-input>
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
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 90%">
      <el-table-column prop="fbmFootCategory.fcName" label="所属" width="120">
      </el-table-column>
      <el-table-column fixed prop="fdName" label="食物名称" width="150">
      </el-table-column>
      <el-table-column prop="fdPrice" label="单价/元" width="120">
      </el-table-column>
      <el-table-column prop="fdFlavor" label="口感" width="120">
      </el-table-column>
      <el-table-column prop="fdFtatd" label="食材说明" width="350">
      </el-table-column>

      <el-table-column prop="fdDegree" label="辣味" width="120">
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
        this.id=row.fdId
        console.log(row)
        this.open()
      },
       open() {
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                    this.$axios.post('food/deleteFood', this.qs.stringify({id:this.id})).then(r => {
                         this.getdeptss();
                         this.$message.success("删除成功！")
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
          this.$axios.post('food/getDetails',this.input1).then(r => {
              this.tableData = r.data.data.list
              this.total=this.tableData.length
          })
        },
      //新增食物
      addfood(){
        this.$axios.post('food/addFood',this.ruleForm).then(r => {
          console.log(this.ruleForm)
               if (r.data.code === 200) {
                      this.$message({
                        type: 'success',
                        message: '添加成功!'
                      });
                      this.getdeptss()
                      this.show = false,
                      this.dialogFormVisible=false
                    }

        })
      },
      //修改食物
      updatefood(){
        this.$axios.post('food/updateFood',this.ruleForm1).then(r => {
          console.log(this.ruleForm1)
               if (r.data.code === 200) {
                      this.$message({
                        type: 'success',
                        message: '修改成功!'
                      });
                      this.getdeptss()
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
          this.$axios.post('food/getDetails',this.input).then(r => {
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
      this.getdeptstwo();
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
          fdName: [{
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
