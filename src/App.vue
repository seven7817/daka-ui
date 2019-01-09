<template>
  <div id="app">
    <div class="header">
      <Header ></Header>
    </div>
    <div class="content">
      <Content ></Content>
    </div>
    <div class="foot">by sun</div>
  </div>
</template>
<script>
import Header from './components/Header'
import Content from './components/Content'
// import sunzheng from './components/sunzheng'
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
  border: 1px solid black;
}
.foot {
  width: 100%;
  height: 100px;
  border: 1px solid black;
}
</style>
