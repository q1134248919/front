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
import { board1, boarByStation, boarByOccupation } from "@/api/board";

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
      boarByOccupation().then((res) => {
        //提取月份数据

        const dom = this.$refs.bord3;
        const mychart = this.$echarts.init(dom);
        console.log(res, res.data);
        const { sexData, occupationData, data } = res.data;
        const first = [];
        const second = [];
        occupationData.map((item) => {
          data.map((v) => {
            if (sexData[0] == v.sex && item == v.occupation) {
              first.push(v.con);
            }
            if (sexData[1] == v.sex && item == v.occupation) {
              second.push(v.con);
            }
          });
        });
        //绘制图表
        const option = {
          title: {
            text: "职业分布",
            subtext: "男女柱状图",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: sexData,
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              // prettier-ignore
              data: occupationData,
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: sexData[0],
              type: "bar",
              data: first,
              markPoint: {
                data: [
                  { type: "max", name: "Max" },
                  { type: "min", name: "Min" },
                ],
              },
              markLine: {
                data: [{ type: "average", name: "Avg" }],
              },
            },
            {
              name: sexData[1],
              type: "bar",
              data: second,
              markPoint: {
                data: [
                  { type: "max", name: "Max" },
                  { type: "min", name: "Min" },
                ],
              },
              markLine: {
                data: [{ type: "average", name: "Avg" }],
              },
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
