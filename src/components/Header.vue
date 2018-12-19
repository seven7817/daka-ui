<template>
  <div class="header-con">
    <div class="nav">
      <div class="nav-con">
        <a href="#">
          <span>打卡系统</span>
        </a>
        <ul>
          <li>
            <a href="#">我的打卡</a>
          </li>
          <li>
            <a href="#">消息</a>
          </li>
          <li  @click="loginFlag=!loginFlag">
            <router-link  to='login'>登录</router-link>
          </li>
          <li>
            <a href="#" >注册</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="menu">
      <div class="menu-con"></div>
    </div>
    <div class="login-frame" v-if="loginFlag">
      <div class="login-wra">
        <div class="login-top">
          <ul>
            <li :class="{active:selectLogin}" @click="selectLogin=true">
              <router-link  to='login' >账号登录</router-link>
            </li>
            <li :class="{active:!selectLogin}" @click="selectLogin=false">
              <router-link to='register'>账号注册</router-link>
            </li>
          </ul>
          <div >
            <span @click="loginFlag=!loginFlag"></span>
          </div>
        </div>
        <router-view ></router-view>
      </div>
    </div>
    <div class="marsk" v-if="loginFlag"></div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      // 当点击首页面的登录，需要的状态
      loginFlag: false,
      // 当进入登录框，判断是选择登录还是注册的状态
      selectLogin:true,
    }
  },
  
};
</script>
<style>
.header-con .nav {
  width: 100%;
  height: 90px;
  border: 1px solid black;
}
.header-con .nav .nav-con {
  width: 1190px;
  height: 90px;
  margin: 0 auto;
  border: 1px solid black;
}
.header-con .nav .nav-con a span {
  color: black;
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
  color: black;
}
.header-con .menu {
  width: 100%px;
  height: 51px;
  border: 1px solid black;
}
.header-con .menu .menu-con {
  width: 1190px;
  height: 51px;
  margin: 0 auto;
  border: 1px solid black;
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
.login-frame .login-wra{
  position: absolute;
  width:360px;
  height: 360px;
  top: 50%;
  margin-top: -180px;
  left: 50%;
  margin-left: -180px;
}
.login-frame .login-wra .login-top li{
  float: left;
  margin: 28px 40px;
  font-size: 20px;
  border-bottom: 2px solid #ffffff;
}
.login-frame .login-wra .login-top li.active{
  border-bottom: 3px solid #49AF4F;
}
.login-frame .login-wra .login-top li a{
  color: #000;
}
/* .login-frame .login-wra .login-top li a:hover{
  border-bottom: 3px solid #49AF4F;
} */
.login-frame .login-wra .login-top div{
  position: absolute;
  right: 0;
  top: 0;
}
.login-frame .login-wra .login-top div span{
  display: inline-block;
  background: url('../assets/关闭.png');
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
