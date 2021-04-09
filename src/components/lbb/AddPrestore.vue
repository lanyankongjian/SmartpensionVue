<template>
  <div style="background-color: #fffff8;">
    <el-row :gutter="18" style="width: 800px;margin: 0px auto;background-color: #F0F7FF;">
      <h2>预存款充值</h2>
      <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px" label-position="left">
        <el-col :span="9">
          <el-form-item label="老人姓名" prop="old_name" style="margin-top: 20px;">
            <el-select @change="getAmount()" v-model="formData.old_name" placeholder="请选择老人姓名" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in oldOptions" :key="index" :label="item.oldName" :value="item.oldName"
                :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="床位号" prop="bed" style="margin-top: 20px;">
            <el-input v-model="formData.bed" placeholder="请输入床位号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="预存款余额:	" prop="amount">
            <el-input :disabled="true" v-model="formData.amount" clearable :style="{width: '100%'}" style="margin-right: 100%;">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="日期选择" prop="charging_time">
            <el-date-picker type="datetime" v-model="formData.charging_time" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
              :style="{width: '100%'}" :picker-options="expireTimeOption" placeholder="请选择日期选择" clearable></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="预存金额:	" prop="money">
            <el-input v-model="formData.money" clearable :style="{width: '100%'}" style="margin-right: 100%;">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="支付方式" prop="payment">
            <el-radio-group v-model="formData.payment" size="medium">
              <el-radio label="现金"></el-radio>
              <el-radio label="支付宝"></el-radio>
              <el-radio label="微信"></el-radio>
              <el-radio label="银联"></el-radio>
              <el-radio label="银行刷卡"></el-radio>
              <el-radio label="银行扫码"></el-radio>
              <el-radio label="其他"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="交费人" prop="payer">
            <el-input v-model="formData.payer" placeholder="请输入交费人" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="收费员" prop="tollman">
            <el-input v-model="formData.tollman" placeholder="请输入收费员" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注" :autosize="{minRows: 4, maxRows: 4}"
              :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
  import axios from "axios"
  export default {
    components: {},
    props: [],
    data() {
      return {
        expireTimeOption: {
          disabledDate(date) {
            return date.getTime() <= Date.now()- 24 * 60 * 60 * 1000;
          }
        },
        formData: {
          old_name: '',
          bed: '',
          amount: '',
          charging_time: '',
          payment: '',
          payer: '',
          tollman: '',
          remark: '',
          money: ''
        },
        rules: {
          old_name: [{
            required: true,
            message: '请下拉选择老人',
            trigger: 'change'
          }],
          bed: [{
            required: false,
            message: '请输入床位编号',
            trigger: 'blur'
          }],
          charging_time: [{
            required: true,
            message: '请选择日期',
            trigger: 'blur'
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
          payment: [{
            required: true,
            message: '请选择支付方式',
            trigger: 'change'
          }],
          tollman: [{
            required: true,
            message: '请输入登记人',
            trigger: 'blur'
          }],
          payer: [{
            required: true,
            message: '请输入交费人',
            trigger: 'blur'
          }],
          remark: [{
            required: true,
            message: '请输入备注',
            trigger: 'blur'
          }],
        },
        oldOptions: [],
      }
    },
    computed: {},
    watch: {},
    created() {
      this.getOld()
    },
    mounted() {},
    methods: {
      submitForm() {
        this.$refs['elForm'].validate(valid => {
          if (valid) {
            this.$confirm("是否确定充值?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
            }).then(() => {
              console.log(this.formData)
              axios.post("cost/addDetailStorage",this.formData)
                .then(res => {
                  this.$message({
                    type: "success",
                    message: "预存款充值成功!",
                  });
                  this.$router.push({
                    path: '/prestore'
                  });
                }).catch(err => {
                  this.$message({
                    type: "error",
                    message: "预存款充值失败!",
                  });
                });
            });
          } else {
            return false;
          }
        })
      },
      resetForm() {
        this.$refs['elForm'].resetFields()
      },
      //获取老人信息
      getOld() {
        axios.get("rec/old")
          .then(res => {
            console.log(res)
            this.oldOptions = res.data.data.olds
          }).catch(err => {})
      },
      getAmount(){
        axios.post("cost/getOldAmountById",this.formData)
          .then(res => {
            console.log(res)
            this.formData.amount = res.data.data.amount
            this.formData.bed = res.data.data.bed
          }).catch(err => {})
          this.formData.amount = ''
          this.formData.bed = ''
      }
    }
  }
</script>
<style>
</style>
