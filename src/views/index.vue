<template>
  <div class="app-container home">
    <el-row>
      <el-col :span="12"> <B1 /></el-col>
      <el-col :span="12"> <B5 /></el-col>
      <el-col :span="12"> <B6 /></el-col>
      <el-col :span="12"> <B7 /></el-col>
      <el-col :span="24"> <B4 /></el-col>
    </el-row>
  </div>
</template>

<script>
import B1 from "../views/dashboardInfo/board1.vue";
import B4 from "../views/dashboardInfo/board4.vue";
import B5 from "../views/dashboardInfo/board5.vue";
import B6 from "../views/dashboardInfo/board6.vue";
import B7 from "../views/dashboardInfo/board7.vue";

export default {
  components: {
    B1,
    B5,
    B4,
    B6,
    B7,
  },
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.8.7",
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>
