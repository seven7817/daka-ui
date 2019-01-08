<template>
  <div class="main-con" @bbb="bbb()">
    <div class="main-nav-con">
      <div class="main-nav">
        <ul class="main-nav-ul">
          <li class="dingwei" :class="{'active':'1'===select}" @click="choose('1')">
            <router-link to="/main/byMyself">自主监督</router-link>
          </li>
          <li :class="{'active':'2'===select}" @click="choose('2')">
            <router-link to="/main/bySystem">平台监督</router-link>
          </li>
          <li :class="{'active':'3'===select}" @click="choose('3')">
            <router-link to>指代监督</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-cont-con" @bbb="bbb()">
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
      sessionStorage.setItem("selectBaseInfo", "1");
    },
    bbb() {
      alert("fasdfasdfabbbbbbbbbbbbbbbbbb");
    }
  },
  created() {
    if (sessionStorage.getItem("selectMineMenuItem")) {
      this.select = sessionStorage.getItem("selectMineMenuItem");
    }
  }

};
</script>
<style>
.main-con {
  width: 100%;
  height: 100%;
}
.main-nav-con {
  width: 100%px;
  height: 51px;
  border: 1px solid black;
}
.main-nav-con .main-nav {
  width: 1190px;
  height: 51px;
  margin: 0 auto;
  border: 1px solid black;
  background-color: #ffffff;
}
.main-con .main-nav-con .main-nav .main-nav-ul-ul {
  /* width: 100%px; */
  height: 51px;
  border: 1px solid black;
}
div.main-con div.main-nav ul.main-nav-ul li.active,
div.main-con div.main-nav ul.main-nav-ul li.active a {
  background-color: #10ae58;
  color: #ffffff;
}
div.main-nav ul li {
  float: left;
  font-size: 15px;
  font-weight: bold;
  height: 53px;
  line-height: 53px;
  /* width: 120px; */
  text-align: center;
  padding-left: 27px;
  padding-right: 27px;
}
div.main-con div.main-nav ul li a {
  display: inline-block;
  color: #000;
  /* width: 100%; */
  height: 100%;
}
div.main-con div.main-nav ul li a:hover {
  color: #10ae58;
}
div.main-con div.main-nav ul.main-nav-ul li.dingwei {
  margin-left: 203px;
}
.main-con .main-cont-con {
  width: 100%;
  height: 90%;
  border: 1px solid black;
}
</style>

