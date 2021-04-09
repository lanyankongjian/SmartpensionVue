<template>
  <div style="width: 800px; background-color: #fafafa; margin: 50px auto; padding: 10px 30px;">
    <h2>基础信息登记</h2>
    <br>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="oldName" style=" width: 300px;">
            <el-input v-model="ruleForm.oldName" class="inputWidth"></el-input>
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
          <el-form-item label="生日" prop="birthday" style=" width: 300px; ">
            <el-input v-model="ruleForm.birthday" :disabled="true" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone" style=" width: 300px; ">
            <el-input v-model="ruleForm.phone" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="gender" style=" width: 300px; ">
            <el-input v-model="ruleForm.gender" :disabled="true" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="家庭地址" prop="address" style=" width: 300px; ">
            <el-input v-model="ruleForm.address" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="经办人" prop="handle" style=" width: 300px; ">
            <el-input v-model="ruleForm.handle" class="inputWidth"></el-input>
          </el-form-item>
        </el-col>


        <el-col :span="12">
          <el-form-item label="入住时间" prop="joinTime" style=" width: 300px; ">
            <el-date-picker
                  v-model="ruleForm.joinTime"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>



        <el-form-item label="合同签订时间" prop="contractTime" style=" width: 300px; ">
          <el-date-picker
                v-model="ruleForm.contractTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                placeholder="选择时间"
                value-format="yyyy-MM-dd">
              </el-date-picker>
        </el-form-item>


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
          oldName: '',
          birthday:'',
          identitycard: '',
          gender: '',
          phone: '',
          address: '',
          contractTime:'',
          joinTime: '',
          handle: ''
        },
        rules: {
          oldName: [
            { required: true, message: '请输入老人姓名', trigger: 'blur' },
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
            { required: true, message: '请填写家庭地址', trigger: 'blur' }
          ],
          contractTime: [
            { required: true, message: '请选择合同签订时间', trigger: 'change' }
          ],
          joinTime: [
            { required: true, message: '请填写选择入住时间', trigger: 'blur' }
          ],
          handle: [
            { required: false, message: '请填写经办人姓名', trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      this.getInit();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {

          if (valid) {
            //判断本地是否存有老人id，有则进行保存
            if(!localStorage.getItem("oldId")){
              // 提交老人信息
              axios.post("/old/addOld",this.ruleForm).then((rsm) => {
                alert(rsm.message);

                // 获取后端返回的老人id
                var oldId = rsm.data.data;

                //通过localStorage保存到本地中,命名为oldId
                 localStorage.setItem('oldId', oldId);

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

      // 根据身份证号获得性别和生日
      changebirthday(){
        if(this.ruleForm.identitycard != null){
          //去空格
          this.ruleForm.identitycard = this.ruleForm.identitycard.trim();
          // 根据正则获取生日
          this.ruleForm.birthday = this.ruleForm.identitycard.substr(10,4).replace(/(\d{2})(\d{2})/g,'$1月 $2日');
          // 截取子字符串后，进行三目运算
          this.ruleForm.gender = (this.ruleForm.identitycard.substr(this.ruleForm.identitycard.length-2,1)%2==1?'男':'女');
        }
      },

      getInit(){
        //如果老人id存在，则获取老人的健康信息
        if(localStorage.getItem("oldId")){
          // 获取健康信息
          axios.get("/old/getOldByOldId?oldId="+localStorage.getItem("oldId")).then((res) => {
            if(res.data.data !=null){
                 this.ruleForm = res.data.data;
            }
          }).watch((err) =>{
            alert("获取失败");
          })
        }
      }
    }
  }
</script>

<style>
.inputWidth{
  width: 200px;
}
</style>
