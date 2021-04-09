<template>
  <div style="width: 800px; background-color: #fafafa; margin: 50px auto; padding: 10px 30px;">
    <h2>健康信息登记</h2>
    <br>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="自理情况" prop="selfcare" style=" width: 300px;">
            <el-select v-model="ruleForm.selfcare" class="inputWidth">
              <el-option value="自理"></el-option>
              <el-option value="介助"></el-option>
              <el-option value="介护"></el-option>
              <el-option value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="视力" prop="vision"style=" width: 300px; ">
            <el-select v-model="ruleForm.vision" class="inputWidth">
              <el-option value="正常"></el-option>
              <el-option value="有损"></el-option>
              <el-option value="失明"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="听力" prop="hearing" style=" width: 300px; ">
            <el-select v-model="ruleForm.hearing" class="inputWidth">
              <el-option value="正常"></el-option>
              <el-option value="轻度听力衰竭"></el-option>
              <el-option value="重度听力衰竭"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="主治医院" prop="hospital" style=" width: 300px; ">
            <el-input v-model="ruleForm.hospital" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="主治医师" prop="doctor" style=" width: 300px; ">
            <el-input v-model="ruleForm.doctor" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="医院电话" prop="doctorPhone" style=" width: 300px; ">
            <el-input v-model="ruleForm.doctorPhone" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="过敏药物" prop="allergy" style=" width: 300px; ">
              <el-input type="text" v-model="ruleForm.allergy" style="width: 600px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="病史" prop="medicalHistory" style=" width: 300px; ">
              <el-input type="text" v-model="ruleForm.medicalHistory" style="width: 600px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="主要疾病" style=" width: 300px; ">
            <div style="width: 600px;background-color: #fff;border: 2px solid #e8e8e8;">
              <el-checkbox-group v-model="checkList">
                  <el-checkbox label="高血糖"></el-checkbox>
                  <el-checkbox label="高血压"></el-checkbox>
                  <el-checkbox label="心脏病"></el-checkbox>
                  <el-checkbox label="脑血栓"></el-checkbox>
                  <el-checkbox label="冠心病"></el-checkbox>
                  <el-checkbox label="关节炎"></el-checkbox>
                  <el-checkbox label="风湿病"></el-checkbox>
                  <el-checkbox label="其他"></el-checkbox>
                </el-checkbox-group>
            </div>
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
        checkList:[],
        ruleForm: {
          hiId:null,
          oldId:0,
          selfcare:'',
          vision: '',
          hospital:'',
          doctor: '',
          doctorPhone: '',
          allergy: '',
          medicalHistory:'',
          mainDiseases:[]
        },
        rules: {
          familyname: [
            { required: true, message: '请选择自理情况', trigger: 'blur' }
          ]
        }
      };
    },
    created(){
      this.getHealthByOldId();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {

          if (valid) {
            if(this.ruleForm.hiId == null){
              this.ruleForm.oldId =  localStorage.getItem('oldId');

              console.log(this.ruleForm)

              this.ruleForm.mainDiseases = this.checkList.toString();

              // 提交健康信息
              axios.post("/health/addHealth",this.ruleForm).then((rsm) => {
                alert(rsm.message);

              }).watch((err) =>{
                alert("保存失败");
              })
            }else{
              alert("修改功能完善中")
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


      getHealthByOldId(){
        //如果老人id存在，则获取老人的健康信息
        if(localStorage.getItem("oldId")){
          // 获取健康信息
          axios.get("/health/getHealthByOldId?oldId="+localStorage.getItem("oldId")).then((res) => {
            if(res.data.data != null){
              this.ruleForm = res.data.data;

             this.checkList = this.ruleForm.mainDiseases.split(',');
             }
          }).catch((err) =>{
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
  .diseaseOption{
    margin:0 10px;
  }
</style>
