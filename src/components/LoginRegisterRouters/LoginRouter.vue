<template>
  <div class="login-content">
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
    <div class="password-wra">
      <div class="password-logo"></div>
      <div class="password-inp">
        <input
          type="password"
          placeholder="请输入密码(6-18位)"
          v-model="password"
          @keyup="checkPassword(),showDelete2()"
          @keyup.enter="login()"
        >
      </div>
      <div class="password-delete" v-if="show2" @click="deletePassword()" ></div>
    </div>
    <div class="tips2">{{tips2}}</div>
    <div class="submit-wra" @click="login()">登 录</div>
    
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex';
export default {
  data() {
    return {
      // 显示第一个叉
      show1: false,
      // 显示第二个叉
      show2: false,
      Email: "",
      // 第一个错误提示
      tips1: "",
      //第二个错误提示
      tips2: "",
      password: "",
      admit: false
    };
  },
  methods: {
    ...mapActions(["setLoginFlag",'setIsLogin','setEmail']),
    showDelete1() {
      if (this.Email != "") {
        this.show1 = true;
      } else {
        this.show1 = false;
      }
    },
    showDelete2() {
      if (this.password != "") {
        this.show2 = true;
      } else {
        this.show2 = false;
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
      this.Email = "";
    },
    deletePassword() {
      this.password = "";
    },
    login() {
      // 取消该按钮的绑定
      this.admit = this.tips1 == "" && this.tips2 == ""&&this.Email!=''&&this.password!='';
      console.log(this.admit);
      if (this.admit == true) {
        this.admit = false;
        this.$axios
          .post("/apis/daka/login", {
            Email: this.Email,
            password: this.password
          })
          .then(response => {
            if (response.data[0].code == 0) {
                console.log(response.data[0]);
                alert("登录成功!");
                console.log(this.Email)
                //设置登录状态
                sessionStorage.setItem('seesionIsLogin',true)   
                sessionStorage.setItem('seesionEmail',this.Email)   
                this.setIsLogin(true)
                this.setEmail(this.Email)
                // 关闭登录框
                this.setLoginFlag();
                console.log('12')
            } else {
              console.log(response.data[0]);
              alert(response.data[0].msg);
            }
            this.admit = true;
          });
      }
    },
    
  }
};
</script>

<style>
.login-content {
  margin-top: 80px;
  border: 1px solid #ffffff;
  width: 100%;
}
.login-content .account-wra,
.login-content .password-wra,
.login-content .submit-wra {
  width: 358px;
  height: 44px;
  border: 1px solid #c5cddb;
  margin: 5px 0;
}
.login-content .account-wra .account-logo {
  width: 20px;
  height: 44px;
  background: url("//nos.netease.com/edu-image/7A13709D12D506BA8CC110D88FFA1E68.png");
  background-position: 0 0px;
  float: left;
  margin-left: 10px;
}
.login-content .account-wra .account-inp {
  float: left;
}
.login-content .account-wra .account-inp input {
  margin-left: 15px;
  width: 260px;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  border: none;
  outline: none;
}
.login-content .account-wra .account-delete {
  margin-top: 10px;
  margin-left: 22px;
  width: 20px;
  height: 20px;
  background: url("../../assets/关闭.png");
  background-size: 100%;
  float: left;
  cursor: pointer;
}

.login-content .password-wra .password-logo {
  width: 20px;
  height: 44px;
  background: url("//nos.netease.com/edu-image/7A13709D12D506BA8CC110D88FFA1E68.png");
  background-position: 0 -35px;
  margin-left: 10px;
  float: left;
}
.login-content .password-wra .password-inp {
  float: left;
}
.login-content .password-wra .password-inp input {
  margin-left: 15px;
  width: 260px;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  border: none;
  outline: none;
}
.login-content .password-wra .password-delete {
  margin-top: 10px;
  margin-left: 22px;
  width: 20px;
  height: 20px;
  background: url("../../assets/关闭.png");
  background-size: 100%;
  float: left;
  cursor: pointer;
}
.login-content .submit-wra {
  background: #49af4f;
  line-height: 44px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
}

.login-content .tips1,
.login-content .tips2 {
  width: 358px;
  height: 22px;
  margin-bottom: 30px;
  border: 1px solid #ffffff;
  color: red;
  text-indent: 2em;
  font-size: 15px;
}
</style>
