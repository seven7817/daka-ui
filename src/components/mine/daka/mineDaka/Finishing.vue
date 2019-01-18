<template>
  <div class="right-content-center">
     <div class="left-con"><pageHelper></pageHelper></div>
    <div class="right-con">
      
    </div>
  </div>
</template>
<script>
import pageHelper   from '@/components/pageHelper'
export default {
  components:{
    pageHelper
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};
</script>

<style scoped>
.right-content-center {
  width: 880px;
  height: 450px;
  border: 1px solid #ddd;
  margin: 10px auto;
  position: relative;
}
.right-content-center .left-con{
  float: left;
  width: 600px;
  height: 450px;
  border: 1px solid #ddd;
  /* cursor: not-allowed */
}
.right-content-center .right-con{
  overflow: scroll;
  overflow-x:hidden;
  float: right;
  width: 275px;
  height: 450px;
  border: 1px solid #ddd;
}
</style>
