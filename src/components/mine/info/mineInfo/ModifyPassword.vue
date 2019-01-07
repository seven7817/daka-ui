<template>
  <div class="modify-psd-con">
    <div class="tip">邮箱验证修改密码</div>
    <div class="code">
      <div class="code-inp">
        <input type="text" placeholder="请输入验证码" v-model="code"></input>
      </div>
      <div class="code-get" @click="binding && getVerificationCode()">{{tips1}}</div>
    </div>
    <div class="pwd1">
      <input type="password" placeholder="请输入新的密码" v-model="pwd1" @blur="checkPsdLength()"></input>
    </div>
    <div class="tips3">{{tips3}}</div>
    <div class="pwd2">
      <input type="password" placeholder="请再次输入密码" v-model="pwd2" @blur="checkPsdEqual()"></input>
    </div>
    <div class="tips2">
      {{tips2}}
    </div>
    <div class="submit" @click="modifyPsd()">提 交</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      binding: true,
      tips1: "获取验证码",
      totalTime: "30",
      tips2:'',
      pwd1:'',
      pwd2:'',
      tips3:'',
      code:'',
      clock:null,
    };
  },
  methods: {
    checkPsdLength(){
      if(this.pwd1.length<6){
        this.tips3='密码长度必须大于6位'
      }else{
        this.tips3=''
      }
    },
    modifyPsd(){
      if(this.tips2==''&&this.tips3==''){
       this.$axios
        .post("/apis/daka/modifyPassword", {
          Email: sessionStorage.getItem("Email"),
          password:this.pwd1,
          code:this.code,
        })
        .then(response => {
          console.log(response.data[0].code);
          console.log(response.data[0]);
          alert(response.data[0].msg);
          this.code='',
          this.pwd1='',
          this.pwd2='',
          window.clearInterval(this.clock);
          this.tips1='获取验证码'
        });
      }else{
        alert('密码个人有错，请重新确认密码')
      }
      
    },
    checkPsdEqual(){
        if(this.pwd1!=this.pwd2){
          this.tips2='密码不一致'
        }else{
          this.tips2=''
        }
        
    },
    getVerificationCode() {
      console.log("getVerificationCode" + sessionStorage.getItem("Email"));

      // 取消该按钮的绑定
      this.binding = false;
      this.tips1 = "重新发送(" + this.totalTime + "s)";
      this.clock = window.setInterval(() => {
        this.totalTime--;
        this.tips1 = "重新发送(" + this.totalTime + "s)";
        if (this.totalTime < 0) {
          window.clearInterval(this.clock);
          this.tips1 = "重新发送";
          this.totalTime = 30;
          this.binding = true;
        }
      }, 1000);
      this.$axios
        .post("/apis/daka/getEmail/", {
          Email: sessionStorage.getItem("Email"),
          operation: 2 //表示修改密码的验证码
        })
        .then(response => {
          // console.log(response.data[0].code);
          // console.log(response.data[0]);
          // alert(response.data[0].msg);
        });
    }
  }
};
</script>

<style>
.modify-psd-con {
  width: 442px;
  height: 402px;
  margin: 40px auto;
  border: 1px solid red;
}
.modify-psd-con .tip {
  font-size: 20px;
  font-weight: bold;
  margin: 30px;
}
.modify-psd-con .code {
  width: 358px;
  height: 44px;
  margin: 40px auto;
}
.modify-psd-con .pwd1{
  width: 358px;
  height: 44px;
  border: 1px solid #c5cddb;
  margin: 0px auto;
}
.modify-psd-con .pwd2{
  width: 358px;
  height: 44px;
  border: 1px solid #c5cddb;
  margin: 0px auto;
  margin-top: 28px;
}
.modify-psd-con .tips3,
.modify-psd-con .tips2{
  width: 358px;
  height: 12px;
  color: red;
  font-size: 12px;
  margin: 0 auto;
}
.modify-psd-con .submit{
  border: 1px solid #c5cddb;
  width: 358px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #49af4f;
  color: #ffffff;
  cursor: pointer;
  font-size: 20px;
  margin: 23px auto;
}
.modify-psd-con .code .code-inp {
  border: 1px solid #c5cddb;
  float: left;
  width: 230px;
  height: 44px;
}
.modify-psd-con .code .code-inp input {
  /* text-decoration: none; */
  width: 200px;
  height: 44px;
  border: none;
  outline: none;
  font-size: 20px;
}
.modify-psd-con .code .code-get {
  border: 1px solid #49af4f;
  color: #49af4f;
  width: 120px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  float: right;
  cursor: pointer;
}
.modify-psd-con .pwd1 input,
.modify-psd-con .pwd2 input {
  width: 358px;
  height: 44px;
  font-size: 20px;
  line-height: 44px;
  border: none;
  outline: none;
}
</style>
