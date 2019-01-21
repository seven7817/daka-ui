<template>
  <div class="bottom-con">
    <div class="left-nav-con">
      <ul>
        <li :class="{'active':'1'===select}" @click="choose('1')">
          <router-link to="/mineMenu/mineDaka/finishing">正在完成</router-link>
        </li>
        <li :class="{'active':'3'===select}" @click="choose('3')">
          <router-link to="/mineMenu/mineDaka/dakaHistory">历史记录</router-link>
        </li>
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
  },
  
};
</script>
<style scoped>
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

