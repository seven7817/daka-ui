<template>
  <div class="content-con">
    <div class="mine-menu-con">
      <div class="mine-menu">
        <ul class="mine-menu-ul">
          <li class="dingwei" :class="{'active':'1'===select}" @click="choose('1')">
            <router-link to="mineInfo">我的个人资料</router-link>
          </li>
          <li :class="{'active':'2'===select}" @click="choose('2')">
            <router-link to="mineDaka">我的打卡记录</router-link>
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
      console.log(index);
      this.select = index;
      sessionStorage.setItem('selectMineMenuItem',index)
    }
  },
  created(){
     if(sessionStorage.getItem('selectMineMenuItem')){
      this.select = sessionStorage.getItem('selectMineMenuItem')
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
  width: 120px;
  text-align: center;
}
div.content-con div.mine-menu ul li a {
  display: inline-block;
  color: #000;
  width: 100%;
  height: 100%;
}
div.content-con div.mine-menu ul li a:hover {
  color: #10ae58;
}
div.content-con div.mine-menu ul.mine-menu-ul li.dingwei{
  margin-left: 203px;
}
div.content-con div.mine-menu ul.mine-menu-ul li.active,
div.content-con div.mine-menu ul.mine-menu-ul li.active a {
  background-color: #10ae58;
  color: #ffffff;
}
.mine-menu-con {
  width: 100%px;
  height: 51px;
  border: 1px solid black;
}
.mine-menu-con .mine-menu {
  width: 1190px;
  height: 51px;
  margin: 0 auto;
  border: 1px solid black;
}
.content-con .mine-menu-con .mine-menu .mine-menu-ul {
  width: 100%px;
  height: 51px;
  border: 1px solid black;
}
.content-con .right-content-con{
  width: 100%;
  height: 100%-51px;
}
/* .content-con .mine-menu-con  .mine-menu .mine-menu-ul .menu-con {
  width: 1190px;
  height: 51px;
  margin: 0 auto;
  border: 1px solid black;
} */
</style>

