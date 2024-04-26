<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col :span="12">
        <div>
          <div id="bord2" ref="bord2"></div>
        </div>
      </el-col>
      <el-col></el-col>
    </el-row>
  </div>
</template>

<script>
import { board1, boarByStation, boarByStationAndMonth } from "@/api/board";

export default {
  name: "board2",
  components: {},
  data() {
    return {
      dataBoard2: [],
    };
  },
  methods: {
    initBoard2() {
      boarByStation().then((res) => {
        this.dataBoard2 = res.data.map((obj) => ({
          value: obj.amount,
          name: obj.station_code,
        }));
        this.dataBoard2.sort((a, b) => b.value - a.value);
        if (this.dataBoard2.length > 10) {
          const top10 = this.dataBoard2.slice(0, 10);
          const remaingAmount = this.dataBoard2
            .slice(10)
            .reduce((total, item) => total + item.value, 0);
          const otherObject = {
            value: remaingAmount,
            name: "其他",
          };
          top10.push(otherObject);
          this.dataBoard2 = top10;
        }

        const dom = this.$refs.bord2;
        const mychart = this.$echarts.init(dom);
        //绘制图表
        const option = {
          title: {
            text: "站点收入分析",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: this.dataBoard2,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        mychart.setOption(option);
      });
    },
  },
  mounted() {
    this.initBoard2();
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
