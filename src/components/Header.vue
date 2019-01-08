<template>
  <div class="header-con">
    <div class="nav">
      <div class="nav-con">
        <router-link to="/main">
          <span>打卡系统</span>
        </router-link>
        <ul>
          <li>
            <a href="#">我的打卡</a>
          </li>
          <li>
            <router-link to="/messageMenu">消息</router-link>
          </li>
          <li @click="loginFlag=!loginFlag,select3='1'" v-if="!isLogin">
            <router-link to="">登录</router-link>
          </li>
          <li @click="loginFlag=!loginFlag,select3='2'" v-if="!isLogin">
            <router-link to="">注册</router-link>
          </li>
          <li v-if="isLogin" @click="showMineMenu()">
            <router-link to="/mineMenu">{{Email}}</router-link>
          </li>
          <li v-if="isLogin" @click="logout()">
            <router-link to="/login">注销</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="menu">
      <div class="menu-con">
        <router-view></router-view>
      </div>
    </div>-->
    <div class="login-frame" v-if="loginFlag" >
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
            <span @click="loginFlag=!loginFlag"></span>
          </div>
        </div>
        <loginRouter v-if="select3=='1'"></loginRouter>
        <registerRouter v-if="select3=='2'"></registerRouter>
        <findbackPassword v-if="select3=='3'" ></findbackPassword>
        <div class="login-bottom">
          <a href="#" style="font-size:12px;color:#999" @click="select3='3'">忘记密码</a> 
          <a href="#" style="font-size:12px;color:#999" @click="select3='1'">登录</a>
        </div>
      </div>
    </div>
    <div class="marsk" v-if="loginFlag" @click="loginFlag=!loginFlag"></div>
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
import loginRouter from './LoginRegisterRouters/LoginRouter'
import registerRouter from './LoginRegisterRouters/RegisterRouter'
import findbackPassword from './LoginRegisterRouters/FindbackPassword'
export default {
  components: {
    loginRouter,
    registerRouter,
    findbackPassword
  },
  data() {
    return {
      selected: null,
      // 当点击首页面的登录，需要的状态
      loginFlag: false,
      // 当进入登录框，判断是选择登录还是注册的状态
      select3: 0,
      Email: "null",
      isLogin: false,
      selectFind:false,
    };
  },
  methods: {
    choose: function(index) {
      this.selected = index;
    },
    // 这是子组件调用的方法  登录成功的时候
    hiddenLoginFrame(Email) {
      this.loginFlag = !this.loginFlag;
      sessionStorage.setItem("isLogin", true);
      sessionStorage.setItem("Email", Email);
      // alert('asdfasdfs')
      this.Email = Email;
      this.isLogin = !this.isLogin;
    },
    logout() {
      sessionStorage.clear();
      this.isLogin = false;
      console.log(this.isLogin);
      this.$router.push("register");
    },
    showMineMenu() {
      sessionStorage.setItem("selectMineMenuItem", '1');
      sessionStorage.setItem("selectBaseInfo", '1');
                                 
    }
  },
  created() {
    if (sessionStorage.getItem("isLogin")) {
      this.isLogin = sessionStorage.getItem("isLogin");
      this.Email = sessionStorage.getItem("Email");
    }
  }
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
.login-frame .login-wra .login-bottom{
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
