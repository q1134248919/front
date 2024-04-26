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
import { board1, boarByStation, boarByAgeData } from "@/api/board";

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
      boarByAgeData().then((res) => {
        //提取月份数据

        const dom = this.$refs.bord3;
        const mychart = this.$echarts.init(dom);
        //绘制图表
        const option = {
          title: {
            text: "年龄分布图",
          },
          legend: {
            top: "bottom",
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          series: [
            {
              name: "Nightingale Chart",
              type: "pie",
              radius: [50, 250],
              center: ["50%", "50%"],
              roseType: "area",
              itemStyle: {
                borderRadius: 8,
              },
              data: res.data,
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
