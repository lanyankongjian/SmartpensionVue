<template>
  <div style="width: 800px; background-color: #fafafa; margin: 50px auto; padding: 10px 30px;">
    <h2>合计缴费</h2>
    <el-form label-width="80px" :model="formLabelAlign">
      <el-row>
        <el-col :span="12">
          <el-form-item label="床位费" class="formItem">
            <el-input v-model="formLabelAlign.name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="护理费" class="formItem">
            <el-input v-model="formLabelAlign.region" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="餐饮费" class="formItem">
        <el-input v-model="formLabelAlign.type" :disabled="true"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="应交费用" class="formItem">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="减免费用" class="formItem">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="折后费用" class="formItem">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实交费用" class="formItem">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="交费方式" class="formItem">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="备注" class="formItem">
        <el-input v-model="formLabelAlign.type" style="width: 600px;"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
    data() {
      return {
        formLabelAlign: {
                  name: '',
                  region: '',
                  type: ''
                }

      };
    },
    created(){

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {

          if (valid) {
            this.ruleForm.oldId = 8/* localStorage.getItem('oldId') */;

            // 提交老人信息
            axios.post("/family/addFamily",this.ruleForm).then((rsm) => {
              alert("保存成功");

            }).watch((err) =>{
              alert("保存失败");
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      ret(){
        this.$parent.returnOccupation();
      },

      // 根据身份证号获得性别
      changebirthday(){
        if(this.ruleForm.identitycard != null){
          // 截取子字符串后，进行三目运算
          this.ruleForm.gender = (this.ruleForm.identitycard.substr(this.ruleForm.identitycard.length-2,1)%2==1?'男':'女');
        }
      }
    }
  }
</script>

<style>
  .formItem{
    width: 300px;
  }
</style>
