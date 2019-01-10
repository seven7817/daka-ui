<template>
  <div class="header-con">
    <div class="nav">
      <div class="nav-con">
        <router-link to="/main">
          <span>打卡系统</span>
        </router-link>
        <ul>
          <li>
            <a href="#" @click="test()">我的打卡</a>
          </li>
          <li>
            <router-link to="/messageMenu">消息</router-link>
          </li>
          <!-- 方法名必须给() -->
          <li @click="setLoginFlag(),setSelect3('1')" v-if="!showIsLogin">
            <router-link to>登录</router-link>
          </li>
          <li @click="setLoginFlag(),setSelect3('2')" v-if="!showIsLogin">
            <router-link to>注册</router-link>
          </li>
          <li v-if="showIsLogin" @click="showMineMenu()">
            <router-link to="/mineMenu">{{showEmail}}</router-link>
          </li>
          <li v-if="showIsLogin" @click="logout()">
            <router-link to="">注销</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- 引号的方法后面不能加空号 -->
    <loginBox
      v-show="showLoginFlag"
    ></loginBox>

    <!-- <ul class="top_bar">
      <li
        class="top_cell"
        v-for="cell in 5"
        :class="{ 'active': cell === selected }"
        @click="choose(cell)"
      >{{cell}}</li>
    </ul>-->
  </div>
</template>
<script>
import loginRouter from "./LoginRegisterRouters/LoginRouter";
import registerRouter from "./LoginRegisterRouters/RegisterRouter";
import findbackPassword from "./LoginRegisterRouters/FindbackPassword";
import loginBox from "./LoginBox";

import {mapState,mapGetters,mapActions} from 'vuex';

export default {
  components: {
    loginRouter,
    registerRouter,
    findbackPassword,
    loginBox
  },
  data() {
    return {
      selected: null,
      seesionIsLogin:false
    };
  },
  computed: {
    ...mapGetters(["showLoginFlag",'showEmail']),
    
    showIsLogin(){
      if(sessionStorage.getItem('seesionIsLogin')){
        this.$store.dispatch('setIsLogin',JSON.parse(sessionStorage.getItem('seesionIsLogin')))
        this.$store.dispatch('setEmail',sessionStorage.getItem('seesionEmail'))
      }
        return this.$store.getters.showIsLogin
    }
  },
  methods: {
    ...mapActions(["setLoginFlag",'setSelect3','setIsLogin']),
    choose: function(index) {
      this.selected = index;
    },
    logout() {
      sessionStorage.clear();
      this.setIsLogin(false);
      // console.log(this.isLogin);
      // this.$router.push("register");
    },
    showMineMenu() {
      sessionStorage.setItem("selectMineMenuItem", "1");
      sessionStorage.setItem("selectBaseInfo", "1");
    },
    foo(x, y, z) {
      console.log(x, y, z);
    },
    test() {
      let arr = [1, 2, 3];
      this.foo(...arr);
    }
  },
  // created(){
  //   this.seesionIsLogin=sessionStorage.getItem('seesionIsLogin')
  // }
};
</script>
<style>
/* ul.top_bar li.active {
  background-color: #000;
} */

.header-con .nav {
  width: 100%;
  height: 90px;
  /* border: 1px solid black; */
}
.header-con .nav .nav-con {
  width: 1190px;
  height: 90px;
  margin: 0 auto;
  /* border: 1px solid black; */
  color: #ffffff;
  font-weight: 300px;
}
.header-con .nav .nav-con a span {
  color: #ffffff;
  display: inline-block;
  height: 92px;
  width: 80px;
  line-height: 92px;
  font-weight: 900;
  padding-left: 50px;
}
.header-con .nav .nav-con ul {
  float: right;
}
.header-con .nav .nav-con ul li {
  float: left;
}
.header-con .nav .nav-con ul li a {
  height: 92px;
  line-height: 92px;
  margin: 0 20px;
  font-size: 15px;
  color: #ffffff;
}
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
