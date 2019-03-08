<template>
  <div class="content-con"  >
          <!-- 显示细节的导航栏 -->
        <router-view ></router-view>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  }
}
</script>


<style>
/* .content-con .menu {
  width: 100%px;
  height: 51px;
  border: 1px solid black;
}
.content-con .menu .menu-con {
  width: 1190px;
  height: 51px;
  margin: 0 auto;
  border: 1px solid black;
} */
.content-con{
    width: 100%;
    height: 100%;
    border: 1px solid red;
    background-color: #eee; 
    /* background-image: url('');
    background-size: 100% 100% */
}



</style>
