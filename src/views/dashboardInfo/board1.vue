<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col>
        <div>
          <div
            style="
              align-content: center;
              text-align: center;
              width: 100%;
              padding-top: 10px;
            "
          >
            每月数据增长
          </div>
          <div id="bord1" ref="bord1"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { board1, boarByStation, boarByStationAndMonth } from "@/api/board";

export default {
  name: "board1",
  components: {},
  data() {
    return {
      dataBoard1: [],
    };
  },
  methods: {
    initBoard1() {
      board1().then((res) => {
        this.dataBoard1 = res.data;
        var amounts = this.dataBoard1.map((obj) => obj.amount).reverse();
        var months = this.dataBoard1.map((obj) => obj.month).reverse();
        const dom = this.$refs.bord1;
        const mychart = this.$echarts.init(dom);
        //绘制图表
        const option = {
          xAxis: {
            type: "category",
            data: months,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: amounts,
              type: "line",
              smooth: true,
            },
          ],
        };
        mychart.setOption(option);
      });
    },
  },
  mounted() {
    this.initBoard1();
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
  height: 800px;
  width: 100%;
}
</style>
