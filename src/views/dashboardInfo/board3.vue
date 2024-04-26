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
import { board1, boarByStation, boarByStationAndMonth } from "@/api/board";

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
      boarByStationAndMonth().then((res) => {
        console.log(res);

        const data = res.data;
        //提取月份数据
        const months = new Set();
        data.forEach((item) => {
          months.add(item.month);
        });
        //处理数据
        const constructArray = (data) => {
          const map = new Map();
          data.forEach((item) => {
            const { month, amount, station_code } = item;
            if (!map.has(station_code)) {
              map.set(station_code, []);
            }
            map.get(station_code).push({ month, amount });
          });

          const resultArray = [];
          map.forEach((value, key) => {
            value.sort((a, b) => a.month.localeCompare(b.month)); // 按照月份从小到大排序
            resultArray.push({
              name: key,
              data: value.map((item) => item.amount),
              symbolSize: 20,
              type: "line",
              smooth: true,
              emphasis: {
                focus: "series",
              },
              endLabel: {
                show: true,
                formatter: "{a}",
                distance: 20,
              },
              lineStyle: {
                width: 4,
              },
            });
          });

          return resultArray;
        };

        const stationArray = constructArray(data);
        const dom = this.$refs.bord3;
        const mychart = this.$echarts.init(dom);
        //绘制图表
        const option = {
          title: {
            text: "站点月统计",
          },
          tooltip: {
            trigger: "item",
          },
          grid: {
            left: 30,
            right: 110,
            bottom: 30,
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            splitLine: {
              show: true,
            },
            axisLabel: {
              margin: 30,
              fontSize: 16,
            },
            boundaryGap: false,
            data: Array.from(months),
          },
          yAxis: {
            scale: false,
            type: "log",
            alignTicks: true,
            axisLabel: {
              margin: 8,
              fontSize: 12,
              formatter: "#{value}",
            },
            nameLocation: "start",
            interval: 1,
            // minInterval: 100,
            // maxInterval: 1000000,
            // splitNumber: 1000000
          },
          series: stationArray,
        };
        console.log(stationArray);
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
