<template>
  <div>
    <div class="login-frame">
      <div class="login-wra">
        <div class="login-top">
          <ul>
            <li :class="{active:showSelect3=='1'}" @click="setSelect3('1')">
              <div>账号登录</div>
            </li>
            <li :class="{active:showSelect3=='2'}" @click="setSelect3('2')">
              <div>账号注册</div>
            </li>
          </ul>
          <div class="close">
            <span @click="setLoginFlag()" ></span>
          </div>
        </div>
        <loginRouter v-if="showSelect3=='1'" ></loginRouter>
        <registerRouter v-if="showSelect3=='2'"  ></registerRouter>
        <findbackPassword v-if="showSelect3=='3'"></findbackPassword>
        <div class="login-bottom">
          <a href="#" style="font-size:12px;color:#999" @click="setSelect3('3')">忘记密码</a>
          <a href="#" style="font-size:12px;color:#999" @click="setSelect3('1')">登录</a>
        </div>
      </div>
    </div>
    <div class="marsk" @click="setLoginFlag()"></div>
  </div>
</template>
<script>
import loginRouter from "./LoginRegisterRouters/LoginRouter";
import registerRouter from "./LoginRegisterRouters/RegisterRouter";
import findbackPassword from "./LoginRegisterRouters/FindbackPassword";
import {mapState,mapGetters,mapActions} from 'vuex';
export default {
  components: {
    loginRouter,
    registerRouter,
    findbackPassword
  },
  data() {
    return {
      // select3: 1,
      loginFlag: true
    };
  },
  
  computed:{
    ...mapGetters(["showSelect3"])
  },
  methods: {
    ...mapActions(["setLoginFlag",'setSelect3']),
    jumpTologin(){
        this.setSelect3('1')
    },
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

