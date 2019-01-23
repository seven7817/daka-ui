<template>
  <div class="content-con">
    <div class="mine-menu-con">
      <div class="mine-menu">
        <ul class="mine-menu-ul">
          <li class="dingwei" :class="{'active':'1'===select}" @click="choose('1');showBaseInfo()">
            <router-link to="/mineMenu/mineInfo">我的个人资料</router-link>
          </li>
          <li :class="{'active':'2'===select}" @click="choose('2');clearSelectMineMenu()">
            <router-link to="/mineMenu/mineDaka">我的打卡</router-link>
          </li>
          <li :class="{'active':'3'===select}" @click="choose('3')">
            <router-link to>我的钱包</router-link>
          </li>
          <li :class="{'active':'4'===select}" @click="choose('4')">
            <router-link to>我的好友</router-link>
          </li>
        </ul>
      </div>
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
      // console.log(index);
      this.select = index;
      sessionStorage.setItem("selectMineMenuItem", index);
    },
    showBaseInfo() {
      sessionStorage.setItem("selectBaseInfo", "1");
    },
    clearSelectMineMenu(){
      if (sessionStorage.getItem("selectMineMenuItem")) {
        sessionStorage.removeItem("selectMineMenuItem");
      }
    }
  },
  created() {
    if (sessionStorage.getItem("selectMineMenuItem")) {
      this.select = sessionStorage.getItem("selectMineMenuItem");
    }
  },
  //监听路由的变化，变的时候刷新页面，以实现，点击“我的个人资料”，子路由自动跳转到“我的基本信息” selectBaseInfo 是上一级(Header.vue)设置的
  watch: {
    $route(parem) {
      // console.info(parem);
      //下面根据parem里不同的值做相应的处理
      if (sessionStorage.getItem("selectMineMenuItem")) {
        // console.log("selected bb " + sessionStorage.getItem("selectBaseInfo"));
        this.select = "1";
        // sessionStorage.setItem("selectBaseInfo", "1");
        sessionStorage.removeItem("selectMineMenuItem");
      }
    }
  }
};
</script>

<style>
div.mine-menu ul li {
  float: left;
  font-size: 15px;
  font-weight: bold;
  height: 53px;
  line-height: 53px;
  /* width: 120px; */
  text-align: center;
}
div.content-con div.mine-menu ul li a {
  display: inline-block;
  color: #000;
  /* width: 100%; */
  height: 100%;
  padding-left: 27px;
  padding-right: 27px;
}
div.content-con div.mine-menu ul li a:hover {
  color: #10ae58;
}
div.content-con div.mine-menu ul.mine-menu-ul li.dingwei {
  margin-left: 203px;
}
div.content-con div.mine-menu ul.mine-menu-ul li.active,
div.content-con div.mine-menu ul.mine-menu-ul li.active a {
  background-color: #10ae58;
  color: #ffffff;
}
.mine-menu-con {
  width: 100%;
  height: 51px;
  /* border: 1px solid black; */
}
.mine-menu-con .mine-menu {
  width: 1190px;
  height: 51px;
  margin: 0 auto;
  /* border: 1px solid black; */
  background-color: #ffffff;

  /* box-shadow: 0 0 5px 5px #000; */
}
.content-con .mine-menu-con .mine-menu .mine-menu-ul {
  /* width: 100%px; */
  height: 51px;
  /* border: 1px solid black; */
}
.content-con .right-content-con {
  width: 100%;
  height: 90%;
}
</style>

