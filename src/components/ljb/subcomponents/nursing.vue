<template>
  <div style="width: 800px; background-color: #fafafa; margin: 50px auto; padding: 10px 30px;">
    <h2>护理任务设置</h2>
    <br>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">


      <el-row>
        <el-col :span="12">
          <el-form-item label="护理级别" prop="nursingLevel" style=" width: 300px; ">
            <el-select v-model="ruleForm.nursingLevel" @change="chooseLevel()" class="inputWidth">
              <el-option value="自理"></el-option>
              <el-option value="半自理"></el-option>
              <el-option value="普通级别"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="护理级别费用" prop="nursingLevelCost" style=" width: 300px; ">
            <el-input v-model="ruleForm.nursingLevelCost" :disabled="true" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="私人定制费用" prop="customizedCost" style=" width: 300px; ">
            <el-input v-model="ruleForm.customizedCost" @change="changeNursingCost()" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="护理总费用" prop="allNursingCost" style=" width: 300px; ">
            <el-input v-model="ruleForm.allNursingCost" :disabled="true" type="text" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      <el-col>
        <el-form-item label="护理说明" prop="levelExplain" style=" width: 700px; ">
          <el-input :value="ruleForm.levelExplain" style=" width: 600px; " ></el-input>
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
        ruleForm: {
          nursingId:null,
          oldId: 0,     //老人id
          nursingLevel: '',   //护理级别
          levelExplain: '',  //级别说明
          nursingLevelCost: null, //护理级别费用
          allNursingCost: null,  //护理总费用
          customizedCost:null, //私人定制费用
        },
        rules: {
          nursingLevel: [
            { required: false, message: '请选择护理级别', trigger: 'change' }
          ]
        }
      };
    },
    created(){
      this.getInit();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {

          if (valid) {

            this.ruleForm.oldId =  localStorage.getItem('oldId');

            // 判断护理id是否存在，不存在则创建，反之修改
            if(this.ruleForm.nursingId == null){

              //提交护理任务信息
              axios.post('/nursing/addNursing',this.ruleForm).then((rsm) => {
                 alert(rsm.message);
                // 把护理id保存到session
                sessionStorage.setItem("nursingId")


              }).watch((err) =>{
                alert("保存失败");
              })

            }else{
              //提交护理任务信息
              axios.post('/nursing/upNursing',this.ruleForm).then((rsm) => {
                alert(rsm.message);
                // 把护理id保存到session
                sessionStorage.setItem("nursingId")


              }).watch((err) =>{
                alert("保存失败");
              })
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

      // 根据护理级别显示对应内容
      chooseLevel(){
        if(this.ruleForm.nursingLevel == "自理"){
          this.ruleForm.levelExplain = '身体状况尚可，思维清晰，社会心理正常，行动自如、生活完全能够自理的长者';
          this.ruleForm.nursingLevelCost = 1000;
        }else if(this.ruleForm.nursingLevel == "半自理"){
          this.ruleForm.levelExplain = '1、思维清晰，大小便自控，身体活动稍有不便，尚可行动；2、慢性病患者；';
          this.ruleForm.nursingLevelCost = 2080;
        }else{
          this.ruleForm.levelExplain = '无法个人单独行动，需要照顾其衣食住行';
          this.ruleForm.nursingLevelCost = 8000;
        }
        this.ruleForm.allNursingCost = Number(this.ruleForm.nursingLevelCost) + Number(this.ruleForm.customizedCost);
      },

      changeNursingCost(){
        this.ruleForm.allNursingCost = Number(this.ruleForm.nursingLevelCost) + Number(this.ruleForm.customizedCost);
      },

      getInit(){
        //如果老人id存在，则获取老人的健康信息
        if(localStorage.getItem("oldId")){
          // 获取健康信息
          axios.get("/nursing/getNursingByOldId?oldId="+localStorage.getItem("oldId")).then((res) => {
            if(res.data.data[0] != null){
               this.ruleForm = res.data.data[0];
            }

            // this.changeNursingCost();
            console.log(this.ruleForm);
          }).watch((err) =>{
            alert("获取失败");
          })
        }else if(localStorage.getItem("oldId") == null){
          alert("请先创建基本信息并保存")
          this.$router.push('/oldinfo');
        }
      }

    }
  }
</script>

<style>
</style>
