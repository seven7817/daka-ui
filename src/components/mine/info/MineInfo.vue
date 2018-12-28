<template>
  <div class="bottom-con">
    <div class="left-nav-con">
      <ul>
        <li :class="{'active':'1'===select}" @click="choose('1')">
          <router-link to="baseInfo">我的基本信息</router-link>
        </li>
        <!-- <li :class="{'active':'2'===select}" @click="choose('2')">
          <router-link to="mineInfo">修改基本信息</router-link>
        </li> -->
        <li :class="{'active':'3'===select}" @click="choose('3')">
          <router-link to="mineInfo">修改密码</router-link>
        </li>
        <!-- <li :class="{'active':'4'===select}" @click="choose('4')">
          <router-link to="mineInfo">绑定邮箱</router-link>
        </li> -->
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
    }
  },
  created() {
    if (sessionStorage.getItem("selectMineInfoItem")) {
        console.log('ceshi'+sessionStorage.getItem("selectMineInfoItem"))
      this.select = sessionStorage.getItem("selectMineInfoItem");
    }
  }
};
</script>
<style>
.bottom-con {
  width: 1190px;
  height: 100%;
  margin: 0 auto;
  border: 1px solid black;
  position: relative;
}
.bottom-con .left-nav-con {
  border: 1px solid black;
  position: absolute;
  left: 0;
}
.bottom-con .left-nav-con ul li {
  width: 203px;
  height: 47px;
  border: 1px solid black;
  line-height: 47px;
  text-align: center;
}
.bottom-con .left-nav-con ul li a {
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
  border: 1px solid black;
  position: absolute;
  right: 0px;
}
</style>

