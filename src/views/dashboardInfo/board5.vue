<template>
  <div class="dashboard-editor-container">
    请输入年份（默认今年）<el-input class="input" v-model="cycle01" />
    <el-button type="primary" plain size="mini" @click="handleAdd"
      >确定</el-button
    >
    <el-row>
      <el-col>
        <div>
          <div id="bord3" ref="bord3"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { board1, boarByStation, boarByYearData } from "@/api/board";

export default {
  name: "board3",
  components: {},
  data() {
    return {
      dataBoard3: [],
      cycle01: "",
    };
  },
  methods: {
    initBoard3(year) {
      boarByYearData({ year: year || new Date().getFullYear() }).then((res) => {
        console.log(res);
        const nameList = res.data.map((item) => item.name);
        const valList = res.data.map((item) => item.value);

        const dom = this.$refs.bord3;
        const mychart = this.$echarts.init(dom);
        const option = {
          title: {
            text: "年份每月数量柱状图",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: nameList,
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "Direct",
              type: "bar",
              barWidth: "60%",
              data: valList,
            },
          ],
        };

        mychart.setOption(option);
      });
    },
    handleAdd() {
      this.initBoard3(this.cycle01);
    },
  },
  mounted() {
    this.initBoard3();
  },
};
</script>

<style lang="scss" scoped>
#bord1 {
  margin-left: 20px;
  height: 400px;
  width: 100%;
}
#bord2 {
  margin-left: 20px;
  height: 500px;
  width: 100%;
}
#bord3 {
  margin-left: 20px;
  height: 500px;
  width: 100%;
}
.input {
  width: 200px;
  margin-right: 10px;
}
</style>
