<template>
  <div style="width: 800px; background-color: #fafafa; margin: 50px auto; padding: 10px 30px;">
    <h2>家属信息登记</h2>
    <br>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="家属姓名" prop="familyname" style=" width: 300px;">
            <el-input v-model="ruleForm.familyname" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="身份证号" prop="identitycard"style=" width: 300px; ">
            <el-input v-model="ruleForm.identitycard" @blur="changebirthday()" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="与老人关系" prop="relationship" style=" width: 300px; ">
            <el-select v-model="ruleForm.relationship" class="inputWidth">
              <el-option value="父子"></el-option>
              <el-option value="父女"></el-option>
              <el-option value="母子"></el-option>
              <el-option value="母女"></el-option>
              <el-option value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="性别" prop="gender" style=" width: 300px; ">
            <el-input v-model="ruleForm.gender" :disabled="true" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone" style=" width: 300px; ">
            <el-input v-model="ruleForm.phone" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="联系地址" prop="address" style=" width: 300px; ">
            <el-input v-model="ruleForm.address" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="是否监护人" prop="guardian" style=" width: 300px; ">
              <el-radio-group v-model="ruleForm.guardian">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
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
          familyId:null,
          oldId:0,
          familyname: '',
          identitycard: '',
          gender: '',
          phone: '',
          address: '',
          guardian:1
        },
        rules: {
          familyname: [
            { required: true, message: '请输入家属姓名', trigger: 'blur' },
            {  max: 20, message: '长度20个字符内', trigger: 'blur' }
          ],
          identitycard: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            {pattern:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '你的身份证格式不正确' }
          ],
          gender: [
            { required: false, message: '请选择性别', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,message:'你的手机号格式不正确'}
          ],
          address: [
            { required: true, message: '请填写联系地址', trigger: 'blur' }
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
            if(this.ruleForm.familyId == null ){
              this.ruleForm.oldId = localStorage.getItem('oldId') ;

              // 提交老人信息
              axios.post("/family/addFamily",this.ruleForm).then((rsm) => {
                alert(rsm.message);
              }).watch((err) =>{
                alert("保存失败");
              })
            }else{
              alert("修改功能完善中");
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

      // 根据身份证号获得性别
      changebirthday(){
        if(this.ruleForm.identitycard != null){
          // 截取子字符串后，进行三目运算
          this.ruleForm.gender = (this.ruleForm.identitycard.substr(this.ruleForm.identitycard.length-2,1)%2==1?'男':'女');
        }
      },

      getInit(){
        //如果老人id存在，则获取老人的家属信息
        if(localStorage.getItem("oldId")){
          // 获取健康信息
          axios.get("/family/getFamilyByOldId?oldId="+localStorage.getItem("oldId")).then((res) => {
            if(res.data.data[0] != null){
              this.ruleForm = res.data.data[0];
            }

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
