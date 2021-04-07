<template>
  <div>
    <el-card style="width: 40%;margin: 0 auto;margin-top:10%;">
    <h2>登录界面</h2><br>
     用户名：<el-input v-model="userName" style="width: 60%;" clearable></el-input><br><br>
     密&nbsp;&nbsp;&nbsp;码：<el-input type="password" v-model="userPass" style="width: 60%;" clearable></el-input><br><br>
     <el-button type="danger" @click="userName='',userPass=''">重置</el-button>
     <el-button :loading="loading" type="success" @click="submit">确定</el-button>
    </el-card>
  </div>
</template>

<script>
  export default {
      data() {
        return {
         userName:'',
         userPass:'',
         loading:false
        }
      },
      methods:{
        submit(){
          if(this.userName==null||this.userName==''||this.userPass==null||this.userPass==''){
            this.$message.warning("请输入用户名和密码！")
          }else{
            this.loading=true
            this.$axios.post("user/Login",this.qs.stringify({userName:this.userName,userPass:this.userPass})).then(v=>{
                if(v.status==200){
                  this.loading=false
                  if(v.data==null||v.data==undefined||v.data==''){
                    this.$message.error("用户名或密码错误！")
                  }else if(v.data!=null&&v.data!=undefined&&v.data!=''){
                    sessionStorage.setItem("token",JSON.stringify(v.data))
                    this.userName=''
                    this.userPass=''
                    this.$router.replace("/HelloWorld")
                    this.$message.success("登录成功！")
                  }else{
                    this.$message.error("登录出错，超出判断！")
                  }
                }else{
                  this.$message.error("登录错误！")
                }
            })
          }
        }
      },
      mounted(){
        sessionStorage.clear()
      }
    }
</script>

<style>
</style>
