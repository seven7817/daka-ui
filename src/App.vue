<template>
  <div id="app">
    <div class="header">
      <Header></Header>
    </div>
    <div class="content"></div>
    <div class="foot">by sun</div>
  </div>
</template>
<script>
import Header from './components/Header'
// import sunzheng from './components/sunzheng'
export default {
  name: "App",
  components: {
    Header
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
.header {
  width: 100%;
  height: 142px;
  border: 1px solid black;
}

.content {
  width: 100%;
  height: 500px;
  border: 1px solid black;
}
.foot {
  width: 100%;
  height: 100px;
  border: 1px solid black;
}


</style>
