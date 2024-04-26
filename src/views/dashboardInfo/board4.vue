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
import "echarts/extension/bmap/bmap";

import { boarByAreaDatah } from "@/api/board";
export default {
  name: "board4",
  components: {},
  data() {
    return {
      dataBoard3: [],
    };
  },
  methods: {
    initBoard3() {
      boarByAreaDatah().then((res) => {
        const dom = this.$refs.bord3;
        const mychart = this.$echarts.init(dom);

        const { listData, areaData } = res.data;
        const geoCoordMap = areaData;
        const convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            console.log(data, geoCoordMap, "123");
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
              });
            }
          }
          return res;
        };
        //绘制图表
        const option = {
          title: {
            text: " 城市数量地图 ",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          bmap: {
            key: "fCH9aFvAsQ2AUsNidZyFJLVNsd0TiyGr",
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: true,
            mapStyle: {
              styleJson: [
                {
                  featureType: "water",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1",
                  },
                },
                {
                  featureType: "land",
                  elementType: "all",
                  stylers: {
                    color: "#f3f3f3",
                  },
                },
                {
                  featureType: "railway",
                  elementType: "all",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "highway",
                  elementType: "all",
                  stylers: {
                    color: "#fdfdfd",
                  },
                },
                {
                  featureType: "highway",
                  elementType: "labels",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "arterial",
                  elementType: "geometry",
                  stylers: {
                    color: "#fefefe",
                  },
                },
                {
                  featureType: "arterial",
                  elementType: "geometry.fill",
                  stylers: {
                    color: "#fefefe",
                  },
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "green",
                  elementType: "all",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "subway",
                  elementType: "all",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "manmade",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1",
                  },
                },
                {
                  featureType: "local",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1",
                  },
                },
                {
                  featureType: "arterial",
                  elementType: "labels",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "boundary",
                  elementType: "all",
                  stylers: {
                    color: "#fefefe",
                  },
                },
                {
                  featureType: "building",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1",
                  },
                },
                {
                  featureType: "label",
                  elementType: "labels.text.fill",
                  stylers: {
                    color: "#999999",
                  },
                },
              ],
            },
          },
          series: [
            {
              name: "订单数量",
              type: "scatter",
              coordinateSystem: "bmap",
              data: convertData(listData).map((item) => {
                const { name, value } = item;
                const [first, second, t] = value;
                return {
                  name,
                  value: [first, second.split("|")[0], t],
                };
              }),
              symbolSize: function (val) {
                return val[2] / 10;
              },
              encode: {
                value: 2,
              },
              label: {
                formatter: "{b}",
                position: "right",
                show: false,
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            {
              name: "Top 5",
              type: "effectScatter",
              coordinateSystem: "bmap",
              data: convertData(
                listData
                  .sort(function (a, b) {
                    return b.value - a.value;
                  })
                  .slice(0, 6)
              ),
              symbolSize: function (val) {
                return val[2] / 10;
              },
              // encode: {
              //   value: 2,
              // },
              showEffectOn: "render",
              rippleEffect: {
                brushType: "stroke",
              },
              label: {
                formatter: "{b}",
                position: "right",
                show: true,
              },
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
              emphasis: {
                scale: true,
              },
              zlevel: 1,
            },
          ],
        };
        mychart.setOption(option);
      });
    },
    loadBMap(ak) {
      return new Promise(function (resolve, reject) {
        if (typeof BMap !== "undefined") {
          resolve(BMap);
          return true;
        }
        window.onBMapCallback = function () {
          resolve(BMap);
        };
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "http://api.map.baidu.com/api?v=2.0&ak=" +
          ak +
          "&__ec_v__=20190126&callback=onBMapCallback";
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
  },
  mounted() {
    this.loadBMap("fCH9aFvAsQ2AUsNidZyFJLVNsd0TiyGr").then(() => {
      this.initBoard3();
    });
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
