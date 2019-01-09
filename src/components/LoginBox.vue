<template>
  <div>
    <div class="login-frame">
      <div class="login-wra">
        <div class="login-top">
          <ul>
            <li :class="{active:select3=='1'}" @click="select3='1'">
              <div>账号登录</div>
            </li>
            <li :class="{active:select3=='2'}" @click="select3='2'">
              <div>账号注册</div>
            </li>
          </ul>
          <div class="close">
            <span @click="close()"></span>
          </div>
        </div>
        <loginRouter v-if="select3=='1'" @loginSuccess='loginSuccess1'></loginRouter>
        <registerRouter v-if="select3=='2'"  @jumpTologin='jumpTologin()'></registerRouter>
        <findbackPassword v-if="select3=='3'"></findbackPassword>
        <div class="login-bottom">
          <a href="#" style="font-size:12px;color:#999" @click="select3='3'">忘记密码</a>
          <a href="#" style="font-size:12px;color:#999" @click="select3='1'">登录</a>
        </div>
      </div>
    </div>
    <div class="marsk" @click="close()"></div>
  </div>
</template>
<script>
import loginRouter from "./LoginRegisterRouters/LoginRouter";
import registerRouter from "./LoginRegisterRouters/RegisterRouter";
import findbackPassword from "./LoginRegisterRouters/FindbackPassword";

export default {
  components: {
    loginRouter,
    registerRouter,
    findbackPassword
  },
  data() {
    return {
      select3: 0,
      loginFlag: true
    };
  },
  props: ['select1'],
  watch: {
    select1() {
      this.select3= this.select1
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    jumpTologin(){
        this.select3 = '1'
    },
    loginSuccess1(data){
        this.$emit("loginSuccess1",data)
    }
  }
};
</script>
<style>
.login-frame {
  width: 440px;
  height: 400px;
  border: 1px solid black;
  z-index: 10;
  position: fixed;
  left: 50%;
  margin-left: -220px;
  top: 50%;
  margin-top: -220px;
  background-color: #ffffff;
}
.login-frame .login-wra {
  position: absolute;
  width: 360px;
  height: 360px;
  top: 50%;
  margin-top: -180px;
  left: 50%;
  margin-left: -180px;
}
.login-frame .login-wra .login-bottom {
  position: absolute;
  bottom: 0px;
  left: 1px;
}
.login-frame .login-wra .login-top li {
  float: left;
  margin: 28px 40px;
  font-size: 20px;
  border-bottom: 2px solid #ffffff;
}
.login-frame .login-wra .login-top li.active {
  border-bottom: 3px solid #49af4f;
}
.login-frame .login-wra .login-top li div {
  color: #000;
  cursor: pointer;
}
.login-frame .login-wra .login-top .close {
  position: absolute;
  right: 0;
  top: 0;
}
.login-frame .login-wra .login-top .close span {
  display: inline-block;
  background: url("../assets/关闭.png");
  width: 20px;
  height: 20px;
  background-size: 20px;
  cursor: pointer;
}
.marsk {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.7;
  z-index: 9;
}
</style>

