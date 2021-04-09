<template>
  <div style="width: 800px; background-color: #fafafa; margin: 50px auto; padding: 10px 30px;">
    <h2>餐饮床位选择</h2>
    <br>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="选择套餐" prop="ddId" style=" width: 300px; ">
            <el-select v-model="ruleForm.ddId" @change="chooseMenu()" class="inputWidth">
              <el-option v-for="(item,index) in recipe" :label="item.reName" :key="item.reName" :value="item.reId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="套餐费用" prop="packageFee" style=" width: 300px; ">
            <el-input v-model="ruleForm.packageFee" :disabled="true" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="套餐详情" style=" width: 300px; ">
            <el-input v-model="menudetails" :readonly="true" style="width: 600px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="床位类型" prop="bedType" style=" width: 300px; ">
            <el-select v-model="ruleForm.bedType" class="inputWidth">
              <el-option value="双人间"></el-option>
              <el-option value="三人间"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="是否包房" prop="gender" style=" width: 300px; ">
            <div style="background-color: #fff;">
              <el-radio-group v-model="ruleForm.isroom">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="床位费用" prop="cost" style=" width: 300px; ">
            <el-input v-model="ruleForm.cost" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="床位" prop="bed" style=" width: 300px; ">
            <el-input v-model="ruleForm.bed" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <div style="margin-left: -100px;">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="ret()">返回</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
    data() {
      return {
        menudetails:'',
        recipe:[],
        ruleForm: {
          bedId:null,
          resId:null,
          oldId:0,  //老人id
          bedType: '',  //床位类型
          isroom: 2,   //是否包房
          bed: '',    //床位编号
          cost: '',   //床位费用
          remarks: '',  //床位备注
          ddId:null,  //套餐编号
          packageFee:null //套餐费用
        },
        rules: {
          bedType: [
            { required: true, message: '请选择床位类型', trigger: 'blur' },
          ],
          ddId: [
            { required: true, message: '请选择饮食套餐', trigger: 'blur' }
          ],
          cost: [
            { required: true, message: '请输入床位费用', trigger: 'blur' },
            {pattern:/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,message:'费用格式不正确'}
          ],
          bed: [
            { required: true, message: '请输入床位', trigger: 'blur' }
          ]

        }
      };
    },
    created:function(){
      this.getInit();
      this.getRecipe(); //获取餐饮套餐


    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {

          if (valid) {
            this.ruleForm.oldId = localStorage.getItem('oldId') ;

            if(this.ruleForm.isroom == 1){
              this.ruleForm.isroom = true;
            }else{
              this.ruleForm.isroom = false;
            }
            console.log(this.ruleForm);

            if(this.ruleForm.bedId == null){
              // 提交餐饮床位信息
              axios.post("/bedAndRes/addBedAndRes",this.ruleForm).then((rsm) => {
                alert(res.message);
                sessionStorage.setItem("bedId",this.data.data[0]);
                sessionStorage.setItem("resId",this.data.data[1]);
                if(this.ruleForm.isroom == true){
                  this.ruleForm.isroom = 1;
                }else{
                  this.ruleForm.isroom = 2;
                }

              }).watch((err) =>{
                alert("保存失败");
              })
            }else{

              alert("修改功能正在完善中")

              // 修改餐饮床位信息
              // this.ruleForm.bedId = sessionStorage.getItem("bedId");
              // this.ruleForm.resId = sessionStorage.getItem("resId");

              // axios.post("/bedAndRes/upBedAndRes",this.ruleForm).then((rsm) => {
              //   if(this.ruleForm.isroom == true){
              //     this.ruleForm.isroom = 1;
              //   }else{
              //     this.ruleForm.isroom = 2;
              //   }
              //   alert("修改成功");
              // }).watch((err) =>{
              //   alert("修改失败");
              // })
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      ret(){
        this.$parent.returnOccupation();
      },


      //查询所有套餐信息
      getRecipe(){

        axios.post('recipe/getRecipe',{}).then((res)=>{
          this.recipe=res.data.data.list;

        }).watch((err)=>{
          console.log("获取套餐失败")
        })
      },

      chooseMenu(){

        Object.keys(this.recipe).forEach((key) =>{
          //根据选中的套餐id，获取套餐费用和套餐详情
          if(this.recipe[key].reId == this.ruleForm.ddId){
            this.menudetails = this.recipe[key].reNote;
            this.ruleForm.packageFee =this.recipe[key].reMonth;
          }

        })
      },

      getInit(){
        //如果老人id存在，则获取老人的健康信息
        if(localStorage.getItem("oldId")){
          // 获取健康信息
          axios.get("/bedAndRes/getBedAndResByOldId?oldId="+localStorage.getItem("oldId")).then((res) => {
            if(res.data.data != null){
              this.ruleForm = res.data.data;

            if(this.ruleForm.isroom == true){
              this.ruleForm.isroom = 1;
            }else{
              this.ruleForm.isroom = 2;
            }
          }
            console.log(this.recipe);
          }).catch((err) =>{
            alert("获取失败");
          })



          Object.keys(this.recipe).forEach((key) =>{
            //根据选中的套餐id，获取套餐费用和套餐详情
            if(this.recipe[key].reId == this.ruleForm.ddId){
              this.menudetails = this.recipe[key].reNote;
              this.ruleForm.packageFee =this.recipe[key].reMonth;
            }
          })
        }else if(localStorage.getItem("oldId") == null){
          alert("请先创建基本信息并保存")
          this.$router.push('/oldinfo');
        }
      }

    },

    watch:{
      ruleForm:function(val){
        this.getRecipe();
        this.chooseMenu();
      }
    }
  }
</script>

<style>
</style>
