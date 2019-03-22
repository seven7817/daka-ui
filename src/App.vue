<template>
  <div id="app">
    <div class="header">
      <Header ></Header>
    </div>
    <div class="content">
      <Content ></Content>
    </div>
    <div class="block">

    </div>
    <div class="foot">
      <div class="foot-con">
        by sun
      </div>
    </div>
  </div>
</template>
<script>
import Header from './components/Header'
import Content from './components/Content'
export default {
  name: "App",
  components: {
    Header,
    Content
  },
};
</script>

<style>
* {
  /* 去掉body样式 */
  margin: 0;
  padding: 0;
  /* ul去掉小黑点 */
  list-style: none;
  /* 去掉a标签样式 */
  text-decoration: none;
}
#app{
  height: 100%;
  width: 100%;
}
.header {
  width: 100%;
  height: 92px;
  /* border: 1px solid black; */
  background-image: linear-gradient(-90deg,#00d87d,#00db9d);
}

.content {
  width: 100%;
  height: 530px;
  /* border: 1px solid black; */
}
.block{
  width: 100%;
  height: calc(100% - 722px) ;
}
.foot {
  
  width: 100%;
  height: 100px;
  /* border: 1px solid black; */
  background-image: linear-gradient(-90deg,#00d87d,#00db9d);
  /* min-height: 100px; */
  
}
.foot-con{
  width: 1190px;
  height: 100%;
  margin: 0 auto;
  /* border: 1px solid black; */
  color: #ffffff;
  font-weight: 300px;
  background-image: linear-gradient(-90deg,#00d87d,#00db9d);
  text-align: center;
  line-height: 100px;
}
</style>
