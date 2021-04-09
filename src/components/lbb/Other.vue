<template>
  <div style="background: #fffff8;">
    <div style="width: 50%;margin: 0px auto;border: 1px solid #C0C4CC;background-color: #F0F7FF;">
      <h2>消费登记</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="老人名称" prop="old_name">
          <!-- <el-input size="mini" style="width: 150px;margin-left: -350px;" v-model="ruleForm.old_name"></el-input> -->
          <el-select v-model="ruleForm.old_name" style="width: 150px;margin-left:-68%">
            <el-option v-for="(item, index) in oldOptions" :key="index" :label="item.oldName" :value="item.oldName"
              :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别名称" prop="category_name">
          <!-- <el-input size="mini" style="width: 150px;margin-left: -350px;" width="150px" v-model="ruleForm.category_name"></el-input> -->
          <el-select v-model="ruleForm.category_name" @change="getAmount()" style="width: 150px;margin-left:-68%">
            <el-option v-for="(item, index) in cateOptions" :key="index" :label="item.category_name" :value="item.category_name"
              :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消费金额" prop="money">
          <el-input size="mini" style="width: 150px;margin-left:-68%" width="150px" v-model="ruleForm.money"></el-input>
        </el-form-item>
        <el-form-item label="消费时间" prop="money_time">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.money_time" style="width: 250px;margin-left:-48%"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    data() {
      return {
        oldOptions:[],
        cateOptions:[],
        ruleForm: {
          old_name: '',
          category_name: '',
          money: '',
          money_time: '',
          remark: '',
          resource:''
        },
        rules: {
          old_name: [{
              required: true,
              message: '老人名称为必填项',
              trigger: 'blur'
            }, //必填项验证
            {
              min: 2,
              max: 6,
              message: '长度在 2 到 6 个字符',
              trigger: 'blur'
            }, //长度验证
            {
              pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
              message: '姓名不支持特殊字符',
              trigger: 'blur'
            }
          ],
          category_name: [{
            required: true,
            message: '请输入类别名称',
            trigger: 'change'
          }],
          money: [{
              required: true,
              message: "请输入金额",
              trigger: "change"
            },
            {
              pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/,
              message: "请输入合法的金额数字，最多两位小数",
              trigger: "change"
            }
          ],
          money_time: [{
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }]
        }
      };
    },
    created() {
      this.getOld()
      this.getCate()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm("是否确定登记?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
            }).then(() => {
            axios.post("http://localhost:8089/cost/addOther", this.ruleForm)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "消费登记成功!",
                });
                this.$router.push({
                  path: '/stream'
                });
              }).catch(err => {
                this.$message({
                  type: "error",
                  message: "消费登记失败!",
                });
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //获取老人信息
      getOld() {
        axios.get("rec/old")
          .then(res => {
            console.log(res)
            this.oldOptions = res.data.data.olds
          }).catch(err => {})
      },
      //获取类别信息
      getCate(){
        axios.get("cost/getCategory/1/6")
          .then(res => {
            console.log(res)
            this.cateOptions = res.data.data.categorys
          }).catch(err => {})
      },
      getAmount(){
        axios.post("cost/getAmountByName",this.ruleForm)
          .then(res => {
            console.log(res)
            this.ruleForm.money = res.data.data.amount
          }).catch(err => {})
          this.ruleForm.money = ''
      }
    }
  }
</script>

<style>

</style>
