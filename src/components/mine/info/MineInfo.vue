<template>
  <div class="bottom-con">
    <div class="left-nav-con">
      <ul>
        <li :class="{'active':'1'===select}" @click="choose('1')">
          <router-link to="/mineMenu/mineInfo/baseInfo">我的基本信息</router-link>
        </li>
        <!-- <li :class="{'active':'2'===select}" @click="choose('2')">
          <router-link to="mineInfo">修改基本信息</router-link>
        </li>-->
        <li :class="{'active':'3'===select}" @click="choose('3');clearSelectBaseInfo()">
          <router-link to="/mineMenu/mineInfo/modifyPassword">修改密码</router-link>
        </li>
        <!-- <li :class="{'active':'4'===select}" @click="choose('4')">
          <router-link to="mineInfo">绑定邮箱</router-link>
        </li>-->
      </ul>
    </div>
    <div class="right-content-con">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      select: null
    };
  },
  methods: {
    choose(index) {
      console.log(index);
      this.select = index;
      sessionStorage.setItem("selectMineInfoItem", index);
    },
    clearSelectBaseInfo() {
      if (sessionStorage.getItem("selectBaseInfo")) {
        sessionStorage.removeItem("selectBaseInfo");
        // alert(sessionStorage.getItem("selectBaseInfo"))
      }
    }
  },
  mounted() {
    if (sessionStorage.getItem("selectBaseInfo")) {
      // console.log("selected bb " + sessionStorage.getItem("selectBaseInfo"));
      this.select = sessionStorage.getItem("selectBaseInfo");
      sessionStorage.removeItem("selectBaseInfo");
    } else {
      if (sessionStorage.getItem("selectMineInfoItem")) {
        // console.log("ceshi " + sessionStorage.getItem("selectMineInfoItem"));
        this.select = sessionStorage.getItem("selectMineInfoItem");
      }
    }
  },
  // 监听路由的变化，变的时候刷新页面，以实现，点击“我的个人资料”，子路由自动跳转到“我的基本信息” selectBaseInfo 是上一级(MineMenu)设置的
  watch: {
    $route(parem) {
      // console.info(parem);
      //下面根据parem里不同的值做相应的处理
      if (sessionStorage.getItem("selectBaseInfo")) {
        // console.log("selected bb " + sessionStorage.getItem("selectBaseInfo"));
        //alert(sessionStorage.getItem("selectBaseInfo"))
        this.select = sessionStorage.getItem("selectBaseInfo");
        sessionStorage.removeItem("selectBaseInfo");
      }
    }
  }
};
</script>
<style>
.bottom-con {
  width: 1190px;
  height: 100%;
  margin: 0 auto;
  /* border: 1px solid black; */
  position: relative;
  background-color: #ffffff;
}
.bottom-con .left-nav-con {
  /* border: 1px solid black; */
  position: absolute;
  left: 0;
  /* background-color: #000; */
  /* opacity: 0.7; */
}
.bottom-con .left-nav-con ul li {
  border: 1px solid #ddd;
  line-height: 47px;
  text-align: center;
  
}
.bottom-con .left-nav-con ul li a {
  width: 203px;
  height: 47px;
  display: inline-block;
  color: black;
  font-weight: bold;
}
.bottom-con .left-nav-con ul li a:hover {
  color: #10ae58;
}
.bottom-con .left-nav-con ul li.active,
.bottom-con .left-nav-con ul li.active a {
  background-color: #10ae58;
  color: #ffffff;
}
.bottom-con .right-content-con {
  width: 980px;
  height: 100%;
  /* border: 1px solid black; */
  position: absolute;
  right: 0px;
}
</style>

