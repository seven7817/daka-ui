<template>
  <div class="con" v-if="show4"> 
    <div class="login-top">
      <ul>
        <li>找回密码</li>
      </ul>
    </div>
    <div class="find-content">
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
            placeholder="请输入新的密码"
            v-model="password"
            @keyup="showDelete3(),checkPassword()"
          >
        </div>
        <div class="password-delete" v-if="show3" @click="deletePassword()"></div>
      </div>
      <div class="tips2">{{tips2}}</div>
      <div class="submit-wra" @click="register()">确 定</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        
      show1: false,
      show2: false,
      show3: false,
      show4:true,
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
        if(this.Email!=''){

            // 取消该按钮的绑定
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
                operation:1,  //表示是获取找回密码的验证码
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
            alert('修改成功!')
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
.con {
  width: 360px;
  height: 330px;
  z-index: 100;
  background-color: #ffffff;
  position: fixed;
}
.con .login-top ul li.return {
  float: right;
  margin-right: 0;
}
.con .find-content {
  margin-top: 80px;
  border: 1px solid #ffffff;
  width: 100%;
}
.con .find-content .account-wra,
.con .find-content .password-wra,
.con .find-content .submit-wra {
  width: 358px;
  height: 44px;
  border: 1px solid #c5cddb;
  margin: 5px 0;
}
.con .find-content .message {
  width: 358px;
  height: 44px;
  margin: 5px 0;
}
.con .find-content .account-wra .account-logo {
  width: 20px;
  height: 44px;
  background: url("//nos.netease.com/edu-image/7A13709D12D506BA8CC110D88FFA1E68.png");
  background-position: 0 0px;
  float: left;
  margin-left: 10px;
}
.con .find-content .account-wra .account-inp {
  float: left;
}
.con .find-content .account-wra .account-inp input {
  margin-left: 15px;
  width: 260px;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  border: none;
  outline: none;
}
.con .find-content .account-wra .account-delete {
  margin-top: 10px;
  margin-left: 22px;
  width: 20px;
  height: 20px;
  background: url("../../assets/关闭.png");
  background-size: 100%;
  float: left;
  cursor: pointer;
}
.con .find-content .message .text-delete {
  float: left;
  margin-right: 0px;
  width: 228px;
  height: 44px;
  border: 1px solid #c5cddb;
}
.con .find-content .message input {
  width: 200px;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  float: left;
  border: none;
  outline: none;
  text-indent: 1em;
}
.con .find-content .message .message-delete {
  margin-top: 12px;
  width: 20px;
  height: 20px;
  background: url("../../assets/关闭.png");
  background-size: 100%;
  float: left;
  cursor: pointer;
}
.con .find-content .message .get-message {
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
.con .find-content .password-wra .password-logo {
  width: 20px;
  height: 44px;
  background: url("//nos.netease.com/edu-image/7A13709D12D506BA8CC110D88FFA1E68.png");
  background-position: 0 -35px;
  margin-left: 10px;
  float: left;
}
.con .find-content .password-wra .password-inp {
  float: left;
}
.con .find-content .password-wra .password-inp input {
  margin-left: 15px;
  width: 260px;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  border: none;
  outline: none;
}
.con .find-content .password-wra .password-delete {
  margin-top: 10px;
  margin-left: 22px;
  width: 20px;
  height: 20px;
  background: url("../../assets/关闭.png");
  background-size: 100%;
  float: left;
  cursor: pointer;
}
.con .find-content .submit-wra {
  background: #49af4f;
  line-height: 44px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 0px;
  font-size: 18px;
}
.con .find-content .tips1,
.con .find-content .tips2 {
  width: 358px;
  height: 22px;
  border: 1px solid #ffffff;
  color: red;
  text-indent: 2em;
  font-size: 15px;
}
</style>

