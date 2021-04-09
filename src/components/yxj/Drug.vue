<template>
	<div style="margin-top: 40px">
    <h3 style="float: left; margin-top: -45px">药品字典</h3>
    <!--  搜索框  -->
    <div style="float: left;">
    药品编码:<el-input v-model="drugCode" style="width: 200px;" placeholder="请输入内容"></el-input>
    药品名称:<el-input v-model="drugName" style="width: 200px;" placeholder="请输入内容"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="initData(currPage,pageSize)">搜索</el-button>
    </div>

    <!--  操作按钮集  -->
    <div style="float: right;margin-left: -50px">
    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    <el-button type="primary" @click="updateDrug()">修改</el-button>
    <el-button type="primary" @click="deleteDrug()">删除</el-button>
    </div><br><br>


    <!--  主页面显示表格   -->
    <div style="margin-top: 20px">
    <el-table
      :data="tableData"
      style="width: 100%"
      height="270"
      ref="gsb"
      >

      <el-table-column
        type="selection"
        fixed prop="drugId"
        label="ID"
        width="80"
        align="center">
      </el-table-column>

      <el-table-column
        fixed
        prop="drugCode"
        label="药品简码"
        width="150"
        align="center">
      </el-table-column>

      <el-table-column
        prop="drugName"
        label="药品名称"
        width="120"
        align="center">
      </el-table-column>

      <el-table-column
        prop="categories.categoryName"
        label="类别"
        width="120"
        align="center">
      </el-table-column>

      <el-table-column
        prop="drugSize"
        label="最小规格"
        width="120"
        align="center">
      </el-table-column>

      <el-table-column
        prop="drugType"
        label="类型"
        width=""
        align="center">
      </el-table-column>

      <el-table-column
        prop="drugVender"
        label="生产厂家"
        width="120"
        align="center">
      </el-table-column>

    </el-table>
    </div>

    <!--  表格分页  -->
    <div class="pager" style="margin-top: 13px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="pageChange"
        :current-page.sync="currPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>


    <!--  新增按钮表单  -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose" @close="clearDrug()" ref="drugForm">
      <el-form :model="drugForm" :rules="rules"  ref="drugForm" label-width="100px" class="demo-ruleForm" >

        <el-form-item label="药品名称" prop="drugName">
          <el-input v-model="drugForm.drugName"></el-input>
        </el-form-item>

        <el-form-item label="药品简码" prop="drugCode">
          <el-input v-model="drugForm.drugCode"></el-input>
        </el-form-item>

        <el-form-item label="生产厂家" prop="drugVender">
          <el-input v-model="drugForm.drugVender"></el-input>
        </el-form-item>

        <el-form-item label="类别" prop="categoryId">
          <el-select v-model="drugForm.categoryId" placeholder="请选择类别" value-key="categoryId">
          <el-option v-for="category in cateList" :key="category.categoryId" :label="category.categoryName" :value="category.categoryId">
          </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="最小规格" prop="drugSize">
          <el-select v-model="drugForm.drugSize" placeholder="请选择规格" value-key="id">
            <el-option  v-for="item in houseType1" :key="item.id " :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="剂型" prop="drugType">
          <el-select v-model="drugForm.drugType" placeholder="请选择剂型" value-key="id">
            <el-option  v-for="item in houseType2" :key="item.id " :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="submitForm('drugForm')">保 存</el-button>
    <el-button type="primary" @click="clearDrug(),dialogVisible = false">取 消</el-button>
  </span>
    </el-dialog>


	</div>
</template>

<script>
	export default {
    name: 'drug',
    data() {
      return {
        //主页表格存贮显示
        tableData: [],
        //主页分页
        totalSize: 0, //总记录数
        pageSize: 5, //页大小
        currPage: 1, //当前页码

        drugCode: '',
        drugName: '',
        rules:{
          drugName: [
            { required: true, message: '请输入药品名称', trigger: 'blur' },
          ],
          drugCode: [
            { required: true, message: '请输入药品简码', trigger: 'blur' },
          ],
          drugVender: [
            { required: true, message: '请输入生产厂家', trigger: 'blur' },
          ],
          categoryId: [
            { required: true, message: '请选择类别', trigger: 'blur' },
          ],
          drugSize: [
            { required: true, message: '请选择规格', trigger: 'blur' },
          ],
          drugType: [
            { required: true, message: '请选择剂型', trigger: 'blur' },
          ],
        },
        //表单回显
        drugForm: {
          drugId:'',
          drugCode:'',
          drugName:'',
          drugSize:'',
          drugType:'',
          drugVender:'',
          // category:{
          //   categoryId:'',
          //   categoryName:'',
          // }
          categoryId:'',
        },
        cateList:[],

        //表单
        dialogVisible: false,

        //表单最小规格下拉框
        houseType1:[
          {
            id: "袋",
            name:"袋",

          },
          {
            id: "粒",
            name:"粒",

          },
          {
            id: "片",
            name:"片",

          },
          {
            id: "瓶",
            name:"瓶",

          },{
            id: "支",
            name:"支",

          },
        ],


        //表单剂型下拉框
        houseType2:[
          {
            id: "胶囊",
            name:"胶囊",

          },
          {
            id: "颗粒",
            name:"颗粒",

          },
          {
            id: "片剂",
            name:"片剂",

          },
          {
            id: "针剂",
            name:"针剂",

          },
        ],

        //删除





      }
    },

    methods: {
      //表格分页
      initData(page,size) { //当前页码，页大小
        this.$axios.get('http://localhost:8089/drug-list',{params: { pageNum: page, size: size, drugCode:this.drugCode, drugName:this.drugName}})
          .then((v) => {
            this.tableData = v.data.rows;
            this.totalSize = v.data.total;
            // console.log(v.data)
          }).catch()
      },
      pageChange(p) {
        this.initData(p,this.pageSize);
      },

      handleSizeChange(size){
        this.initData(this.currPage,size,this.pageSize);
      },
      //表格分页结束


      //新增药品数据
      saveDrug(){
        this.$axios.post('http://localhost:8089/saveDrug',this.drugForm)
          .then((a)=>{
            this.initData(this.currPage,this.pageSize)
            this.clearDrug()
            this.dialogVisible = false
        }).catch()
      },

      //模糊查询
      // DrugMh(){
      //   this.search.drugCode
      // },

      //修改药品信息
      updateDrug(){
        if (this.$refs.gsb.selection.length==0){
          this.$message.error("请选中后再修改")
        }else {
        this.dialogVisible = true,
          this.$refs.gsb.selection.forEach(gsb=>{
            this.drugForm = {
              drugId:gsb.drugId,
              drugCode:gsb.drugCode,
              drugName:gsb.drugName,
              drugSize:gsb.drugSize,
              drugType:gsb.drugType,
              drugVender:gsb.drugVender,
              categoryId:gsb.categories.categoryId,
            }
          })

        }

      },//修改产品结束



      //校验
      submitForm(drugForm) {
        this.$refs[drugForm].validate((valid) => {
          if (valid) {
            this.saveDrug()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


      //删除药品信息
      // 获取数据,这里只简单展示数据，最好可以把当前页面，每页显示数据，搜索等参数传值到后台，因为删除会影响分页和数据
      deleteDrug() {
        this.$axios.post('http://localhost:8089/deleteDrug',this.$refs.gsb.selection).then((res) => {
          this.initData(this.currPage,this.pageSize)
        }).catch(function(error){
          console.log(error);
        })
      },
      //删除结束



      //清空表单
      clearDrug() {
        this.drugForm = {
          drugId:'',
          drugCode:'',
          drugName:'',
          drugSize:'',
          drugType:'',
          drugVender:'',
          Category:{
            categoryId:'',
            categoryName:'',
          }
        }
      },


      //按钮表单关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          }).catch(_ => {
        });
      },


    //methods方法结束
    },


    created() {
      this.initData(this.currPage,this.pageSize)
      this.$axios.get('http://localhost:8089/category')
        .then((v) => {
          this.cateList = v.data;
        }).catch()


    }

  }
</script>

<style>
</style>
