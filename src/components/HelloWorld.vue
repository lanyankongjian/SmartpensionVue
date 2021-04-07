<template>
  <div class="hello">
    <h2 style="float: left;">欢迎使用智慧养老系统！</h2>
    <i style="float: right;cursor: pointer;font-size: 20px;" title="退出" class="el-icon-switch-button" @click="tuichu"></i>
    <div style="padding-top: 6%;">
      <a style="font-size: 20px;float: left;"><i class="el-icon-s-operation"></i>待办事项</a><br><br>
      <el-row>
        <el-col :span="6">
          <el-card>
            <a style="color: red;">{{jiankang}}</a><br>
            入住办理：健康评估
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <a style="color: red;">{{chuangwei}}</a><br>
            入住办理：床位登记
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <a style="color: red;">{{ruyuan}}</a><br>
            入住办理：入院缴费
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <a style="color: red;">{{zhuan}}</a><br>
            试住转入住
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-card>
            <a style="color: red;">{{qianfei}}</a><br>
            欠费名单
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <a style="color: red;">{{yongyao}}</a><br>
            用药登记
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <a style="color: red;">{{shengyu}}</a><br>
            剩余药品预警
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <a style="color: red;">{{kucun}}</a><br>
            库存预警
          </el-card>
        </el-col>
      </el-row>
    </div><br><br>
    <div>
      <a style="font-size: 20px;float: left;"><i class="el-icon-user-solid"></i>今日动态&nbsp;&nbsp;{{data}}</a><br><br>
        <el-row>
          <el-col :span="8">
             <a style="font-size: 20px;">今日咨询：</a> <a style="color: blue;font-size: 28px;">{{jzixun}}</a>&nbsp;&nbsp;人
          </el-col>
          <el-col :span="8">
              <a style="font-size: 20px;">今日预约：</a><a style="color: blue;font-size: 28px;">{{jyuyue}}</a>&nbsp;&nbsp;人
          </el-col>
          <el-col :span="8">
              <a style="font-size: 20px;">今日试住：</a> <a style="color: blue;font-size: 28px;">{{jshizhu}}</a>&nbsp;&nbsp;人
          </el-col>
        </el-row><br>
        <el-row>
          <el-col :span="8">
              <a style="font-size: 20px;">今日入住：</a> <a style="color: blue;font-size: 28px;">{{jruzhu}}</a>&nbsp;&nbsp;人
          </el-col>
          <el-col :span="8">
              <a style="font-size: 20px;">今日外出：</a> <a style="color: blue;font-size: 28px;">{{jwaichu}}</a>&nbsp;&nbsp;人
          </el-col>
          <el-col :span="8">
               <a style="font-size: 20px;">今日探视：</a><a style="color: blue;font-size: 28px;">{{jtanshi}}</a>&nbsp;&nbsp;人
          </el-col>
        </el-row>
    </div><br><br>
    <div>
      <a style="font-size: 20px;float: left;"><i class="el-icon-s-data">院内统计</i></a><br><br>
        <el-row>
          <el-col :span="8">
             <a style="font-size: 20px;">在住老人: </a> <a style="color: blue;font-size: 28px;">{{fzaizhu}}</a>&nbsp;&nbsp;人
          </el-col>
          <el-col :span="8">
              <a style="font-size: 20px;">试住老人: </a><a style="color: blue;font-size: 28px;">{{fshizhu}}</a>&nbsp;&nbsp;人
          </el-col>
          <el-col :span="8">
              <a style="font-size: 20px;">院内床位: </a> <a style="color: blue;font-size: 28px;">{{fchuangwei}}</a>&nbsp;&nbsp;张
          </el-col>
        </el-row><br>
        <el-row>
          <el-col :span="8">
              <a style="font-size: 20px;">已预订: </a> <a style="color: blue;font-size: 28px;">{{fyuding}}</a>&nbsp;&nbsp;张
          </el-col>
          <el-col :span="8">
              <a style="font-size: 20px;">空闲: </a> <a style="color: blue;font-size: 28px;">{{fkongxian}}</a>&nbsp;&nbsp;张
          </el-col>
          <el-col :span="8">
              <a style="font-size: 20px;">入住率: </a> <a style="color: blue;font-size: 28px;">{{fruzhulv}}</a>&nbsp;&nbsp;%
          </el-col>
        </el-row><br>
        <el-row>
          <el-col :span="8">
              <a style="font-size: 20px;">院内房间: </a> <a style="color: blue;font-size: 28px;">{{ffangjian}}</a>&nbsp;&nbsp;间
          </el-col>
          <el-col :span="8">
              <a style="font-size: 20px;">员工人数: </a> <a style="color: blue;font-size: 28px;">{{fkongxian}}</a>&nbsp;&nbsp;人
          </el-col>
          <el-col :span="8">
             <a style="font-size: 20px;">护工人数: </a>  <a style="color: blue;font-size: 28px;">{{fhugong}}</a>&nbsp;&nbsp;人
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        jiankang: '',
        chuangwei: '',
        ruyuan: '',
        zhuan: '',
        qianfei: '',
        yongyao: '',
        shengyu: '',
        kucun: '',
        data: '',
        jzixun:0,
        jyuyue:0,
        jshizhu:0,
        jruzhu:0,
        jwaichu:0,
        jtanshi:0,
        fzaizhu:0,
        fshizhu:0,
        fchuangwei:0,
        fyuding:0,
        fkongxian:0,
        fruzhulv:0,
        ffangjian:0,
        fkongxian:0,
        fhugong:0
      }
    },
    methods: {
      tuichu() {
        this.$confirm('您确定要退出系统吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.clear()
          this.$router.replace("/")
          this.$message.success("退出成功！")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      },
      init() {
        this.$axios.get("user/oldNum").then(v => {
          this.fzaizhu = v.data.zaizhu
        })
        this.$axios.get("user/ruZhu").then(v=>{
          this.jruzhu=v.data.ruzhu
        })
        this.$axios.get("user/tanShi").then(v=>{
          this.jtanshi=v.data.tanshi
        })
        this.$axios.get("user/waiChu").then(v=>{
          this.jwaichu=v.data.waichu
        })
      },
      initData() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        let wk = date.getDay()
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        let week = weeks[wk]
        this.data = year + seperator1 + month + seperator1 + strDate+'              '+week;
      }
    },
    created() {
      this.init()
      this.initData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-card:hover {
    cursor: pointer;
    background-color: skyblue;
  }
</style>
