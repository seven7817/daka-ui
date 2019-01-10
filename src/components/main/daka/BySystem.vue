<template>
  <div class="main-cont-left"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    bbb() {
      return sessionStorage.getItem("aaa");
    }
  },
  methods: {
    aaa() {
      sessionStorage.setItem("aaa", "bbbb");
    }
  }
};
</script>
<style>
.main-cont-left {
  float: left;
  height: 100%;
  width: 890px;
  border: 1px solid #000;
}
</style>


