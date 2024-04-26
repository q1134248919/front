<template>
  <div class="dashboard-editor-container">
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
import { board1, boarByStation, boarByPrediction } from "@/api/board";

export default {
  name: "board3",
  components: {},
  data() {
    return {
      dataBoard3: [],
    };
  },
  methods: {
    initBoard3() {
      boarByPrediction().then((res) => {
        const data = res.data;
        console.log(data, "data");
        const nameList = data.map((item) => {
          return `${item.name} `;
        });
        const valList = data.map((item) => {
          if (item.preFlag) {
            return {
              value: item.value,
              itemStyle: {
                color: "#a90000",
              },
            };
          }
          return item.value;
        });

        const dom = this.$refs.bord3;
        const mychart = this.$echarts.init(dom);
        //绘制图表
        const option = {
          title: {
            text: "数据预测",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            formatter: function (params) {
              var tar = params[0];
              const val = "（预测值）";
              const sign = tar.data.itemStyle ? val : "";
              return `${tar.name}:${tar.value}${sign}`;
            },
          },
          xAxis: {
            type: "category",
            data: nameList,
          },

          yAxis: {
            type: "value",
          },
          series: [
            {
              data: valList,
              type: "bar",
            },
          ],
        };
        mychart.setOption(option);
      });
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
  height: 800px;
  width: 100%;
}
</style>
