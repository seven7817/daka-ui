<template>
  <div class="register-content">
    <div class="account-wra">
      <div class="account-logo"></div>
      <div class="account-inp">
        <input
          type="text"
          placeholder="请输入邮箱"
          v-model="Email"
          @keyup="showDelete1()"
          @blur.prevent="checkEmail()"
        >
      </div>
      <div class="account-delete" v-if="show1" @click="deleteEmail()"></div>
    </div>
    <div class="tips1">{{tips1}}</div>
    <div class="message">
      <div class="text-delete">
        <input type="text" placeholder="请输入邮箱验证码" v-model="code" @keyup="showDelete2()">
        <div class="message-delete" v-if="show2" @click="deleteCode()"></div>
      </div>
      <div class="get-message" @click="binding && getVerificationCode()">{{tips3}}</div>
    </div>
    <div class="password-wra">
      <div class="password-logo"></div>
      <div class="password-inp">
        <input
          type="password"
          placeholder="请输入密码"
          v-model="password"
          @keyup="showDelete3(),checkPassword()"
        >
      </div>
      <div class="password-delete" v-if="show3" @click="deletePassword()"></div>
    </div>
    <div class="tips2">{{tips2}}</div>
    <div class="submit-wra" @click="register()">注 册</div>
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex';
export default {
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      // 让发送验证码只能60s发送一次
      binding:true,
      //可否注册
      bindingRegister:true,
      Email: "",
      code: "",
      password: "",
      tips1: "",
      tips2: "",
      tips3:"获取验证码",
      totalTime:"60",
    };
  },
  methods: {
    ...mapActions(["setSelect3"]),
    showDelete1() {
      if (this.Email != "") {
        this.show1 = true;
      } else {
        this.show1 = false;
      }
    },
    showDelete2() {
      if (this.code != "") {
        this.show2 = true;
      } else {
        this.show2 = false;
      }
    },
    showDelete3() {
      if (this.password != "") {
        this.show3 = true;
      } else {
        this.show3 = false;
      }
    },
    checkEmail() {
      var test = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (test.test(this.Email)) {
        this.tips1 = "";
        return true;
      } else {
        this.tips1 = "× 邮箱格式错误";
        return false;
      }
    },
    checkPassword() {
      if ((this.password.length > 18) | (this.password.length < 6)) {
        this.tips2 = "× 密码长度不对";
      } else {
        this.tips2 = "";
      }
    },
    deleteEmail() {
      this.Email = ""
    },
    deletePassword() {
      this.password = ""
    },
    deleteCode(){
        this.code=''
    },
    getVerificationCode(){
      // 取消该按钮的绑定
      if(this.Email!=''){
        this.binding = false,
        this.tips3 = '重新发送('+this.totalTime + 's)';
        let clock = window.setInterval(() => {
          this.totalTime -- 
          this.tips3 = '重新发送('+this.totalTime + 's)'
          if (this.totalTime <0){
            window.clearInterval(clock)
            this.tips3 = '重新发送'
            this.totalTime = 60
            this.binding = true;
          }
        },1000)
        this.$axios.post('/apis/daka/getEmail/',
         {
            Email:this.Email,
            operation:0,  //表示注册时候的验证码
         }
        ).then(response =>{
        console.log(response.data[0].code)
        console.log(response.data[0])
        alert(response.data[0].msg)
        })
      }else{
        alert('请输入邮箱')
      }
    },
    register(){
      this.bindingRegister = this.tips1 ==''&&this.tips2==''&&this.code!=''&&this.Email!=''&&this.password!=''
      console.log(this.bindingRegister)
      if(this.bindingRegister==true){
        this.bindingRegister = false
        this.$axios.post('/apis/daka/register/',
         {
            Email:this.Email,
            code:this.code,
            password:this.password
         }
        ).then(response =>{
          if(response.data[0].code==0){
            alert('注册成功!')
            //挑战到登录页面
            this.setSelect3('1')
          }
          else{
            console.log(response.data[0])
            alert(response.data[0].msg)
          }
            this.bindingRegister = true
        })
      }
    }
  }
};
</script>

<style>
.register-content {
  margin-top: 80px;
  border: 1px solid #ffffff;
  width: 100%;
}
.register-content .account-wra,
.register-content .password-wra,
.register-content .submit-wra {
  width: 358px;
  height: 44px;
  border: 1px solid #c5cddb;
  margin: 5px 0;
}
.register-content .message {
  width: 358px;
  height: 44px;
  margin: 5px 0;
}
.register-content .account-wra .account-logo {
  width: 20px;
  height: 44px;
  background: url("//nos.netease.com/edu-image/7A13709D12D506BA8CC110D88FFA1E68.png");
  background-position: 0 0px;
  float: left;
  margin-left: 10px;
}
.register-content .account-wra .account-inp {
  float: left;
}
.register-content .account-wra .account-inp input {
  margin-left: 15px;
  width: 260px;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  border: none;
  outline: none;
}
.register-content .account-wra .account-delete {
  margin-top: 10px;
  margin-left: 22px;
  width: 20px;
  height: 20px;
  background: url("../../assets/关闭.png");
  background-size: 100%;
  float: left;
  cursor: pointer;
}
.register-content .message .text-delete {
  float: left;
  margin-right: 0px;
  width: 228px;
  height: 44px;
  border: 1px solid #c5cddb;
}
.register-content .message input {
  width: 200px;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  float: left;
  border: none;
  outline: none;
  text-indent: 1em;
}
.register-content .message .message-delete {
  margin-top: 12px;
  width: 20px;
  height: 20px;
  background: url("../../assets/关闭.png");
  background-size: 100%;
  float: left;
  cursor: pointer;
}
.register-content .message .get-message {
  width: 118px;
  height: 44px;
  border: 1px solid #49af4f;
  color: #49af4f;
  float: right;
  margin-right: -2px;
  text-align: center;
  line-height: 44px;
  cursor: pointer;
}
.register-content .password-wra .password-logo {
  width: 20px;
  height: 44px;
  background: url("//nos.netease.com/edu-image/7A13709D12D506BA8CC110D88FFA1E68.png");
  background-position: 0 -35px;
  margin-left: 10px;
  float: left;
}
.register-content .password-wra .password-inp {
  float: left;
}
.register-content .password-wra .password-inp input {
  margin-left: 15px;
  width: 260px;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  border: none;
  outline: none;
}
.register-content .password-wra .password-delete {
  margin-top: 10px;
  margin-left: 22px;
  width: 20px;
  height: 20px;
  background: url("../../assets/关闭.png");
  background-size: 100%;
  float: left;
  cursor: pointer;
}
.register-content .submit-wra {
  background: #49af4f;
  line-height: 44px;
  text-align: center;
  color: #fff;
  cursor: pointer;

  font-size: 18px;
}
.register-content .tips1,
.register-content .tips2 {
  width: 358px;
  height: 22px;
  border: 1px solid #ffffff;
  color: red;
  text-indent: 2em;
  font-size: 15px;
}
</style>
