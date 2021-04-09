<template>
  <div style="margin-top: 40px">
    <h3 style="float: left; margin-top: -45px">药品缴存记录</h3>

    <!--  搜索框  -->
    <div style="float: left;">
      <!--      姓名:<el-select v-model="DepositeForm.recOld.oldId" placeholder="请选择老人" value-key="oldId">-->
      <!--        <el-option v-for="recOld in oldList" :key="recOld.oldId" :label="recOld.oldName" :value="recOld.oldId">-->
      <!--        </el-option>-->
      <!--          </el-select>-->
      缴药方式:<el-input v-model="depositeMode" style="width: 200px;" placeholder="请输入内容"></el-input>
      <!--      状态:<el-input v-model="input2" style="width: 200px;" placeholder="请输入内容"></el-input>-->
      <el-button type="primary" icon="el-icon-search" @click="initData(currPage,pageSize)">搜索</el-button>
    </div><br><br>
    <!--  操作按钮集  -->
    <div style="margin-top: -40px;">
      <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    </div>
    <!--  主页面显示表格   -->
    <div style="margin-top: 20px">
      <el-table :data="tableData" style="width: 100%" height="360">

        <!--        <el-table-column-->
        <!--          type="selection"-->
        <!--          fixed prop="deposite_id"-->
        <!--          label="ID"-->
        <!--          width="80"-->
        <!--          align="center">-->
        <!--        </el-table-column>-->

        <el-table-column fixed prop="old_name" label="姓名" width="150" align="center">
        </el-table-column>
        <el-table-column prop="deposite_time" label="缴药时间" width="120" align="center">
        </el-table-column>
        <el-table-column prop="deposite_mode" label="缴药方式" width="120" align="center">
        </el-table-column>
        <el-table-column prop="drug_name" label="药名" width="" align="center">
        </el-table-column>
        <el-table-column prop="deposite_num" label="数量" width="120" align="center">
        </el-table-column>
        <el-table-column prop="drug_size" label="用药单位" width="120" align="center">
        </el-table-column>
        <el-table-column prop="deposite_zt" label="状态" width="120" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.deposite_zt=='0'">
              退缴
            </template>
            <template v-if="scope.row.deposite_zt=='1'">
              缴存
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="drug_size" label="退缴" width="120" align="center">
          <span slot-scope="scope">
            <el-button @click="update(scope.row)" type="primary" v-if="scope.row.deposite_zt=='1'">退缴</el-button>
          </span>
        </el-table-column>

        <!--        <el-table-column-->
        <!--          prop="  "-->
        <!--          label="登记人"-->
        <!--          width="120">-->
        <!--        </el-table-column>-->
      </el-table>
    </div>
    <!--  表格分页  -->
    <div class="pager" style="margin-top: 13px">
      <el-pagination background @size-change="handleSizeChange" @current-change="pageChange"
        :current-page.sync="currPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
      </el-pagination>
    </div>
    <!--  新增按钮表单  -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%" :before-close="handleClose"
      @close="clearCategory()">
      <el-form label-width="100px" style="height: 500px" class="demo-ruleForm">
        <div style="float: left;">
          老人姓名:<el-select v-model="DepositeForm.recOld.oldId" placeholder="请选择老人" value-key="oldId">
            <el-option v-for="recOld in oldList" :key="recOld.oldId" :label="recOld.oldName" :value="recOld.oldId">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: -41px">
          <el-select v-model="DepositeForm.depositeMode" placeholder="请选择缴费方式">
            <el-option v-for="item in houseType1" :key="item.id " :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <!--    抽屉按钮    -->
        <el-form-item style="margin-left: 600px;margin-top: -40px">
          <el-button @click="drawer = true,drugC()" style="float: left;" type="primary">新增药品
          </el-button>
        </el-form-item>
        <!--    表单表格    -->
        <el-form-item>
          <el-table :data="tableData1" width="100%" style="margin-left: -10%; margin-top: 30px" height="270" ref="hhh">
            <!--            <el-table-column-->
            <!--              type="selection"-->
            <!--              fixed prop="drugId"-->
            <!--              label="ID"-->
            <!--              width="80"-->
            <!--              align="center">-->
            <!--            </el-table-column>-->

            <el-table-column fixed prop="drugCode" label="药品简码" width="150" align="center">
            </el-table-column>
            <el-table-column prop="drugName" label="药品名称" width="120" align="center">
            </el-table-column>
            <el-table-column prop="categories.categoryName" label="类别" width="120" align="center">
            </el-table-column>
            <el-table-column prop="drugSize" label="最小规格" width="120" align="center">
            </el-table-column>
            <el-table-column prop="drugType" label="类型" width="" align="center">
            </el-table-column>
            <el-table-column prop="drugVender" label="生产厂家" width="120" align="center">
            </el-table-column>
            <el-table-column prop="depositeNum" label="数量">
              <span slot-scope="scope">
                <input type="text" style="width:60px;text-align: center" oninput="value=value.replace(/[^\d]/g, '')"
                  v-model="scope.row.deposite_num">
              </span>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click="sccp(scope.$index)" type="text" size="small">移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveOffer()">保 存</el-button>
        <el-button type="primary" @click="clearCategory(),dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--  药品抽屉抽屉  -->
    <el-drawer title="药品" :visible.sync="drawer" :direction="direction" :before-close="handleClos1"
      size="60%">
      <!--   抽屉下拉框   -->
      <el-form :model="DepositeForm" ref="rooForm">
        <el-form-item label="药品类别" prop="name" style="float: left">
          <el-select @change="drugC" v-model="drugForm.category.categoryId" placeholder="请选择活动区域"
            value-key="categoryId">
            <el-option v-for="item in drugcList" :key="item.label" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!--   抽屉药品表格   -->
      <el-table :data="tableData3" style="width: 100%" height="270" ref="proRef">
        <el-table-column type="selection" fixed prop="drugId" label="ID" width="80" align="center">
        </el-table-column>

        <el-table-column fixed prop="drugCode" label="药品简码" width="150" align="center">
        </el-table-column>

        <el-table-column prop="drugName" label="药品名称" width="120" align="center">
        </el-table-column>

        <el-table-column prop="categories.categoryName" label="类别" width="120" align="center">
        </el-table-column>

        <el-table-column prop="drugSize" label="最小规格" width="120" align="center">
        </el-table-column>

        <el-table-column prop="drugType" label="类型" width="" align="center">
        </el-table-column>

        <el-table-column prop="drugVender" label="生产厂家" width="120" align="center">
        </el-table-column>

      </el-table>

      <el-button @click="qrxz()">保 存</el-button>
      <!--      <el-button type="primary" @click="dialogVisible = false">取 消</el-button>-->
    </el-drawer>



  </div>
</template>

<script>
  export default {
    name: 'deposite',
    data() {
      return {
        //主页表格存贮显示
        tableData: [],
        tableData1: [],


        //抽屉药品类别
        tableData3: [],
        saveisok: true,


        //

        //老人
        oldList: [],

        //类别
        cateList: [],

        //主页分页
        totalSize: 0, //总记录数
        pageSize: 5, //页大小
        currPage: 1, //当前页码

        depositeMode: '',
        // input: '',
        // input1: '',
        // input2:'',

        //抽屉
        drawer: false,
        direction: 'rtl',

        //表单回显
        DepositeForm: {
          depositeId: '',
          depositeMode: '',
          depositeNum: '',
          depositeZt: '',
          depositeWarning: '',
          depositeTime: '',
          recOld: {
            oldId: '',
            oldName: ''
          },
          drugList: {
            drugId: '',
            drugName: '',
            drugSize: '',
            category: {
              categoryId: '',
              categoryName: ''
            }
          }


        },

        //药品回显
        drugForm: {
          drugId: '',
          drugCode: '',
          drugName: '',
          drugSize: '',
          drugType: '',
          drugVender: '',
          category: {
            categoryId: '1',
            categoryName: '',
          },
          // categoryId:'',
        },

        drugcList: [{
            value: '1',
            label: '甲类'
          },
          {
            value: '2',
            label: '中药'
          },
          {
            value: '3',
            label: '西药'
          },

        ],


        //表单
        dialogVisible: false,
        //缴费选择
        houseType1: [{
            id: "院方代缴",
            name: "院方代缴",

          },
          {
            id: "本人缴存",
            name: "本人缴存",

          },
          {
            id: "家属代缴",
            name: "家属代缴",

          },
        ],



      }
    },

    //方法存放
    methods: {
      //表格分页
      initData(page, size) { //当前页码，页大小
        this.$axios.get('http://localhost:8089/deposite-List', {
            params: {
              pageNum: page,
              size: size,
              depositeMode: this.depositeMode
            }
          })
          .then((v) => {
            this.tableData = v.data.rows;
            this.totalSize = v.data.total;
            console.log(v.data.rows)
          }).catch()
      },
      pageChange(p) {
        this.initData(p, this.pageSize);
      },

      handleSizeChange(size) {
        this.initData(this.currPage, size);
      },
      //表格分页结束

      //修改状态
      update(row) {
        console.log(row)
        this.$axios.get('http://localhost:8089/update', {
            params: {
              Id: row.deposite_id
            }
          })
          .then((v) => {
            this.initData(this.currPage, this.pageSize)
          }).catch()
      },


      //按钮表单关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          }).catch(_ => {});
      },


      //抽屉表格查询
      drugC() {
        console.log(this.drugForm.category.categoryId)
        this.$axios.get('http://localhost:8089/drcList', {
          params: {
            categoryId: this.drugForm.category.categoryId
          }
        }).then((v) => {
          this.tableData3 = v.data;
        }).catch()
      },

      //抽屉表格选取
      qrxz() {
        console.log(this.tableData3)
        this.$alert('是否确定添加药品', '添加药品', {
          confirmButtonText: '确定',
          callback: action => {
            //获取当前选中的行
            this.$refs.proRef.selection.forEach(p => {
              //查询当前选中的行在表单中是否存在
              this.tableData1.forEach(t => {
                if (p.drugId == t.drugId) {
                  //如果存在，则不添加进去
                  this.saveisok = false;
                }
              })
              if (this.saveisok == true) {
                //如果不存在，则进行添加商品
                this.tableData1.push(p)
                // let price = parseFloat(this.offForm.oSalary)
                // this.offForm.oSalary +=parseFloat(p.productcb.cPrice)
                // this.offForm.oSalary = price
              } else {
                this.saveisok = true;
              }

            })
            this.$message({
              type: 'info',
              message: `确定成功: ${action}`
            });
          }
        });
      },

      //移除
      sccp(index) {
        this.tableData1.splice(index, 1)
        // this.jisuanPirce()
      },
      //新增
      // saveOffer() {
      //   this.DepositeForm.drugList = this.tableData1
      //   // this.DepositeForm.offerdetails=this.tableData1
      //   console.log("新增")
      //   console.log(this.DepositeForm)
      //   this.$axios.post('http://localhost:8089/save-deposite', this.DepositeForm)
      //     .then((v) => {
      //       this.initData(this.currPage, this.pageSize)
      //       this.clearCategory()
      //     }).catch()

      // },

      //新增
      saveOffer(){
         this.DepositeForm.drugList=this.tableData1
         let isok=true
         console.log(this.DepositeForm.drugList)
         this.DepositeForm.drugList.forEach(d=>{
         if (d.deposite_num==0 || d.deposite_num == null){
                  isok=false
                  
                }
           })

           if (isok==true){
                console.log("新增")
                console.log(this.DepositeForm)
                this.$axios.post('http://localhost:8089/save-deposite',this.DepositeForm)
                  .then((v) => {
                    this.initData(this.currPage,this.pageSize)
                    this.clearCategory()
                      this.dialogVisible = false
           }).catch()
         }else{
                alert("请填写正确的数量")
          }
              // this.DepositeForm.offerdetails=this.tableData1
        },

      //校验




      //抽屉
      handleClos1(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

      //清空表单
      clearCategory() {
        this.DepositeForm = {
          depositeId: '',
          depositeMode: '',
          depositeNum: '',
          depositeZt: '',
          depositeWarning: '',
          depositeTime: '',
          recOld: {
            oldId: '',
            oldName: ''
          },
          drugList: {
            drugId: '',
            drugName: '',
            drugSize: '',
            category: {
              categoryId: '',
              categoryName: ''
            }
          }
        }
        this.tableData1 = []
      },



      //methods方法结束
    },

    created() {
      //主页面显示
      this.initData(this.currPage, this.pageSize)
      //查询老人表
      this.$axios.get('http://localhost:8089/recold')
        .then((v) => {
          this.oldList = v.data;
        }).catch()
      //查询类别表
      this.$axios.get('http://localhost:8089/category-list')
        .then((v) => {
          this.cateList = v.data;
        }).catch()
    }

  }
</script>




<style>
</style>
