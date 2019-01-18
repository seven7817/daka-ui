<template>
  <div class="main-con">
    <div class="main-nav-con">
      <div class="main-nav">
        <ul class="main-nav-ul">
          <li class="dingwei" :class="{'active':'1'===select}" @click="choose('1')">
            <router-link to="/main/byMyself">自主监督</router-link>
          </li>
          <li :class="{'active':'2'===select}" @click="choose('2'),test()">
            <router-link to="/main/bySystem">平台监督</router-link>
          </li>
          <li :class="{'active':'3'===select}" @click="choose('3')">
            <router-link to>指代监督</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-cont-con">
      <div class="main-cont">
        <router-view></router-view>
        <applyDaka v-if="showApplyDakaFlag"></applyDaka>
        <div class="main-cont-right">
          <div class="userInfo-con"></div>
          <div class="apply-daka-con">
            <div class="apply-daka" v-on:click="applyDaka()">申请打卡</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import applyDaka from "./daka/ApplyDaka";
export default {
  components: {
    applyDaka
  },
  data() {
    return {
      select: null
    };
  },
  computed: {
    ...mapGetters(["showApplyDakaFlag"])
  },
  methods: {
    ...mapActions(["setLoginFlag", "setSelect3", "setApplyDakaFlag"]),
    choose(index) {
      // console.log(index);
      this.select = index;
      sessionStorage.setItem("selectMineMenuItem", index);
      sessionStorage.setItem("selectBaseInfo", "1");
    },
    applyDaka() {
      if (sessionStorage.getItem("seesionIsLogin") != "true") {
        // alert(sessionStorage.getItem("seesionIsLogin"))
        this.setLoginFlag();
        this.setSelect3("1");
      } else {
        this.setApplyDakaFlag();
      }
    },
    test(){
      var date = new Date()
      console.log(date.getTime())
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
  position: relative;
}
.main-con .main-cont-con .main-cont {
  width: 1190px;
  height: 100%;
  margin: 0 auto;
  background-color: #ffffff;
}

.main-con .main-cont-right {
  float: right;
  height: 100%;
  width: 290px;
  border: 1px solid #000;
}
.main-con .main-cont-right .userInfo-con {
  width: 100%;
  height: 60%;
  border: 1px solid black;
}
.main-con .main-cont-right .apply-daka-con {
  width: 100%;
  height: 40%;
  border: 1px solid black;
  position: relative;
}
.main-con .main-cont-right .apply-daka-con .apply-daka {
  margin: auto;
  height: 25px;
  width: 100px;
  border: 1px solid #ddd;
  font-weight: bold;
  text-align: center;
  line-height: 25px;
  background-color: #28a745;
  color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  margin-top: -12.5px;
  left: 50%;
  margin-left: -50px;
  cursor: pointer;
}
</style>

